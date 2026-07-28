/**
 * TokenCache - Cache inteligente de sugestões
 *
 * Estratégia ZERO API:
 * - Armazenar sugestões em cache local (JSON)
 * - Similaridade semântica para reusar sugestões parecidas
 * - Economizar 100% de API calls para contextos similares
 */

import { join } from 'path';
import {
    readFileSync,
    mkdirSync,
    existsSync,
    promises as fsPromises
} from 'fs';

interface CacheEntry {
    context: string;
    suggestion: string;
    timestamp: number;
    hits: number;
}

interface CacheStore {
    [key: string]: CacheEntry;
}

export class TokenCache {
    private cache: Map<string, CacheEntry> = new Map();
    private cacheFilePath: string;
    private maxEntries: number = 500;
    private similarityThreshold: number = 0.75; // 75% similar = reusar
    private pendingSave: boolean = false;
    private saveTimeout: ReturnType<typeof setTimeout> | null = null;

    constructor(globalStorageUri: string) {
        this.cacheFilePath = join(globalStorageUri, 'claw-suggestions-cache.json');
        this.loadFromDisk();
    }

    /**
     * Obter sugestão do cache
     * Usa similaridade semântica ao invés de match exato
     */
    get(context: string): string | null {
        // Buscar match exato primeiro (O(1))
        const exactMatch = this.cache.get(context);
        if (exactMatch) {
            exactMatch.hits++;
            return exactMatch.suggestion;
        }

        // Buscar sugestão similar via Jaccard (75%+)
        let bestMatch: CacheEntry | null = null;
        let bestScore = 0;

        for (const entry of this.cache.values()) {
            const similarity = this.calculateSimilarity(context, entry.context);
            if (similarity > this.similarityThreshold && similarity > bestScore) {
                bestScore = similarity;
                bestMatch = entry;
            }
        }

        if (bestMatch) {
            bestMatch.hits++;
            return bestMatch.suggestion;
        }

        return null;
    }

    /**
     * Armazenar sugestão em cache
     */
    set(context: string, suggestion: string): void {
        // Não cachear sugestões muito curtas ou vazias
        if (!suggestion || suggestion.trim().length < 3) {
            return;
        }

        this.cache.set(context, {
            context,
            suggestion,
            timestamp: Date.now(),
            hits: 0
        });

        // Cleanup se exceder limite
        if (this.cache.size > this.maxEntries) {
            this.pruneCache();
        }

        // Salvar no disco (deferido para evitar thrashing)
        this.scheduleSave();
    }

    /**
     * Limpar cache completamente
     */
    clear(): void {
        this.cache.clear();
        try {
            fsPromises.writeFile(this.cacheFilePath, '{}').catch(() => { /* ignorar */ });
        } catch {
            // Ignorar erro de escrita
        }
    }

    /**
     * Obter estatísticas do cache
     */
    getStats(): string {
        let totalHits = 0;
        for (const entry of this.cache.values()) {
            totalHits += entry.hits;
        }

        return `${this.cache.size} entries, ${totalHits} hits`;
    }

    /**
     * Calcular similaridade entre dois strings
     * Algoritmo: Jaccard similarity (simples mas eficaz)
     */
    private calculateSimilarity(str1: string, str2: string): number {
        // Tokenizar em palavras/tokens
        const tokens1 = new Set(str1.toLowerCase().split(/\W+/));
        const tokens2 = new Set(str2.toLowerCase().split(/\W+/));

        // Jaccard: |intersection| / |union|
        const intersection = new Set([...tokens1].filter(x => tokens2.has(x)));
        const union = new Set([...tokens1, ...tokens2]);

        return union.size > 0 ? intersection.size / union.size : 0;
    }

    /**
     * Remover entradas menos usadas quando cache está cheio
     * Estratégia: LRU + LFU (Least Recently/Frequently Used)
     */
    private pruneCache(): void {
        // Ordenar: menor hits primeiro, mais antigo primeiro
        const sorted = Array.from(this.cache.entries())
            .sort(([, a], [, b]) => {
                // Priorizar por hits (menor = mais descartável)
                if (a.hits !== b.hits) {
                    return a.hits - b.hits;
                }
                // Desempatar por timestamp (mais antigo = mais descartável)
                return a.timestamp - b.timestamp;
            });

        // Remover 20% das piores entradas
        const toRemove = Math.ceil(this.maxEntries * 0.2);
        const removeCount = Math.min(toRemove, sorted.length);

        for (let i = 0; i < removeCount; i++) {
            this.cache.delete(sorted[i][0]);
        }
    }

    /**
     * Agendar save no disco com debounce (evita múltiplas escritas)
     */
    private scheduleSave(): void {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }

        this.saveTimeout = setTimeout(() => {
            this.saveToDisk();
        }, 2000); // 2s debounce
    }

    /**
     * Carregar cache do disco
     */
    private loadFromDisk(): void {
        try {
            if (!existsSync(this.cacheFilePath)) {
                return;
            }

            const data = readFileSync(this.cacheFilePath, 'utf-8');
            const obj: CacheStore = JSON.parse(data);

            for (const [key, value] of Object.entries(obj)) {
                if (
                    value &&
                    typeof value === 'object' &&
                    'suggestion' in value &&
                    'timestamp' in value
                ) {
                    this.cache.set(key, value as CacheEntry);
                }
            }
        } catch {
            // Cache corrompido → iniciar vazio
        }
    }

    /**
     * Salvar cache no disco (assíncrono)
     */
    private async saveToDisk(): Promise<void> {
        if (this.pendingSave) {
            return;
        }

        this.pendingSave = true;

        try {
            // Garantir diretório existe
            const dir = this.cacheFilePath.substring(
                0, this.cacheFilePath.lastIndexOf('/')
            );
            mkdirSync(dir, { recursive: true });

            // Converter Map para Object
            const obj: CacheStore = {};
            for (const [key, value] of this.cache.entries()) {
                obj[key] = value;
            }

            await fsPromises.writeFile(this.cacheFilePath, JSON.stringify(obj, null, 2));
        } catch {
            // Ignorar erro de escrita
        } finally {
            this.pendingSave = false;
        }
    }
}
