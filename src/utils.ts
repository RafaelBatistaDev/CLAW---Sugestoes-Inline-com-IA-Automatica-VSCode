/**
 * Utilitários compartilhados para a extensão CLAW
 *
 * Contém funções reutilizáveis para evitar duplicação entre
 * aiSelector.ts, aiProbe.ts e demais módulos.
 */

/**
 * Fetch com timeout configurável
 * Aborta automaticamente se exceder o tempo limite
 */
export async function fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeoutMs: number
): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const opts: RequestInit = {
            ...options,
            signal: controller.signal,
        };
        return await fetch(url, opts);
    } finally {
        clearTimeout(timeoutId);
    }
}

/**
 * Ler valor de configuração do arquivo ~/.claw/config/.claude.json
 * Suporta notação de ponto: "openai.apiKey"
 */
export function readConfigValue(key: string): string | undefined {
    try {
        const fs = require('fs');
        const path = require('path');
        const { homedir } = require('os');

        const configPath = path.join(homedir(), '.claw/config/.claude.json');
        if (!fs.existsSync(configPath)) {
            return undefined;
        }

        const content = fs.readFileSync(configPath, 'utf-8');
        const config = JSON.parse(content);
        return key.split('.').reduce((obj: Record<string, unknown>, k: string) => {
            if (obj && typeof obj === 'object' && k in obj) {
                return (obj as Record<string, unknown>)[k];
            }
            return undefined;
        }, config as Record<string, unknown>) as string | undefined;
    } catch {
        return undefined;
    }
}

/**
 * Obter API key de forma segura: env var → config file → null
 */
export function getAPIKey(provider: 'openai' | 'claude'): string | null {
    const envVar = provider === 'openai' ? 'OPENAI_API_KEY' : 'ANTHROPIC_API_KEY';
    const configKey = provider === 'openai' ? 'OPENAI_API_KEY' : 'ANTHROPIC_API_KEY';

    // Tentar env var primeiro
    const envKey = process.env[envVar];
    if (envKey) {
        return envKey;
    }

    // Tentar arquivo de configuração
    try {
        const configVal = readConfigValue(configKey);
        if (configVal) return configVal;

        const providerKey = `${provider}.apiKey`;
        return readConfigValue(providerKey) || null;
    } catch {
        return null;
    }
}

/**
 * Sanitizar string para logging (remove dados sensíveis como API keys)
 */
export function sanitizeForLog(message: string): string {
    // Ofuscar padrões que parecem API keys
    return message
        .replace(/(sk-[a-zA-Z0-9]{20,})/g, 'sk-***')
        .replace(/(AIza[0-9A-Za-z_-]{35})/g, 'AIza***')
        .replace(/(sk-ant-[a-zA-Z0-9]{20,})/g, 'sk-ant-***')
        .replace(/Bearer\s+\S+/gi, 'Bearer ***');
}
