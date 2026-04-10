/**
 * CLAW - Extensão VS Code com Sugestões Inline
 * Integra agent.py com InlineCompletionItemProvider
 *
 * Arquitetura:
 * 1. InlineCompletionProvider observa cursor (debounce 500ms)
 * 2. AgentManager chama agent.py via subprocess
 * 3. TokenCache economiza APIcalls com similaridade semântica
 * 4. CircuitBreaker + Fallback automático entre agentes
 *
 * Fluxo UX:
 * - Usuário para de digitar
 * - Extension envia contexto para agent.py
 * - Sugestão aparece em cinza (tentativa)
 * - Tab: aceita | Esc: rejeita
 */

import * as vscode from 'vscode';
import { InlineCompletionProvider } from './inlineCompletionProvider';
import { AgentManager } from './agentManager';
import { TokenCache } from './tokenCache';
import { Logger } from './logger';

let agentManager: AgentManager;
let tokenCache: TokenCache;
let logger: Logger;

export async function activate(context: vscode.ExtensionContext) {
    try {
        // ════════════════════════════════════════════════════════════════════════════════
        // INICIALIZAR COMPONENTES
        // ════════════════════════════════════════════════════════════════════════════════

        logger = new Logger('CLAW', getLogLevel());
        logger.info('🤖 Ativando CLAW Agent Extension...');

        // Inicializar cache
        tokenCache = new TokenCache(context.globalStorageUri.fsPath);
        logger.info(`✅ Cache inicializado: ${tokenCache.getStats()}`);

        // Inicializar gerenciador de agentes (conecta com agent.py)
        agentManager = new AgentManager(logger);
        const agentStatus = await agentManager.initialize();
        logger.info(`✅ AgentManager inicializado: ${agentStatus}`);

        // Registrar InlineCompletionProvider
        const provider = new InlineCompletionProvider(
            agentManager,
            tokenCache,
            logger,
            getDebounceMs(),
            getMaxTokens()
        );

        const selector: vscode.DocumentSelector = [
            { pattern: '**/*.py', language: 'python' },
            { pattern: '**/*.ts', language: 'typescript' },
            { pattern: '**/*.js', language: 'javascript' },
            { pattern: '**/*.tsx', language: 'typescriptreact' },
            { pattern: '**/*.jsx', language: 'javascriptreact' },
            { pattern: '**/*.cs', language: 'csharp' },
            { pattern: '**/*.rs', language: 'rust' },
            { pattern: '**/*.go', language: 'go' },
            { pattern: '**/*.rb', language: 'ruby' },
            { pattern: '**/*.php', language: 'php' },
            { pattern: '**/*.cpp', language: 'cpp' },
            { pattern: '**/*.c', language: 'c' },
            { pattern: '**/*.java', language: 'java' },
        ];

        const disposable = vscode.languages.registerInlineCompletionItemProvider(
            selector,
            provider
        );

        context.subscriptions.push(disposable);
        logger.info('✅ InlineCompletionProvider registrado');

        // ════════════════════════════════════════════════════════════════════════════════
        // CRIAR STATUS BAR COM BOTÃO DE TOGGLE
        // ════════════════════════════════════════════════════════════════════════════════

        const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);

        const updateStatusBar = () => {
            const enabled = vscode.workspace.getConfiguration('clawrafaelia').get('enabled', true);
            if (enabled) {
                statusBar.text = '$(sparkle) CLAW:Inline ON';
                statusBar.color = '#4EC9B0'; // Teal quando ativo
                statusBar.tooltip = 'CLAW:Inline está ativo (Ctrl+Alt+C para desativar | Clique para status)';
            } else {
                statusBar.text = '$(circle-slash) CLAW:Inline OFF';
                statusBar.color = '#A8A8A8'; // Cinza quando inativo
                statusBar.tooltip = 'CLAW:Inline está inativo (Ctrl+Alt+C para ativar)';
            }
        };

        statusBar.command = 'clawrafaelia.toggleSuggestions';
        updateStatusBar();
        statusBar.show();
        context.subscriptions.push(statusBar);

        // Atualizar status bar quando configuração mudar
        vscode.workspace.onDidChangeConfiguration(event => {
            if (event.affectsConfiguration('clawrafaelia.enabled')) {
                updateStatusBar();
            }
        });

        // ════════════════════════════════════════════════════════════════════════════════
        // REGISTRAR COMANDOS
        // ════════════════════════════════════════════════════════════════════════════════

        // Comando: Ativar/Desativar com visual feedback
        context.subscriptions.push(
            vscode.commands.registerCommand('clawrafaelia.toggleSuggestions', async () => {
                const currentState = vscode.workspace.getConfiguration('clawrafaelia').get('enabled', true);
                const newState = !currentState;
                await vscode.workspace.getConfiguration('clawrafaelia').update('enabled', newState, true);

                const message = newState ? '✨ CLAW Ativado!' : '🔴 CLAW Desativado';
                vscode.window.showInformationMessage(message);
                logger.info(`Toggle: ${newState ? 'ON' : 'OFF'}`);
            })
        );

        // Comando: Limpar Cache
        context.subscriptions.push(
            vscode.commands.registerCommand('clawrafaelia.clearCache', async () => {
                tokenCache.clear();
                vscode.window.showInformationMessage('🧹 Cache CLAW limpo');
                logger.info('Cache limpo pelo usuário');
            })
        );

        // Comando: Mostrar Status
        context.subscriptions.push(
            vscode.commands.registerCommand('clawrafaelia.showStatus', async () => {
                const cacheStats = tokenCache.getStats();
                const agentStats = await agentManager.getStatus();
                const message = `
CLAW Agent Status:
• Cache: ${cacheStats}
• Agents: ${agentStats}
• Log Level: ${getLogLevel()}
• Debounce: ${getDebounceMs()}ms
• Max Tokens: ${getMaxTokens()}
                `;
                vscode.window.showInformationMessage(message);
                logger.info('Status exibido');
            })
        );

        // ════════════════════════════════════════════════════════════════════════════════
        // MONITORAR MUDANÇAS DE CONFIGURAÇÃO
        // ════════════════════════════════════════════════════════════════════════════════

        vscode.workspace.onDidChangeConfiguration(event => {
            if (event.affectsConfiguration('clawrafaelia')) {
                logger.info('⚙️  Configuração atualizada');
                // Provider verifica getLogLevel() dinamicamente
            }
        });

        logger.info('✨ CLAW Agent Extension ativada com sucesso!');
        vscode.window.showInformationMessage('✨ CLAW Agent ativado! Sugere código em tempo real.');

    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        logger?.error(`Erro ao ativar extensão: ${errorMsg}`);
        vscode.window.showErrorMessage(`❌ Falha ao ativar CLAW: ${errorMsg}`);
    }
}

export function deactivate() {
    logger?.info('CLAW Agent Extension desativada');
}

// ════════════════════════════════════════════════════════════════════════════════
// HELPERS PARA LER CONFIGURAÇÕES
// ════════════════════════════════════════════════════════════════════════════════

function getLogLevel(): string {
    return vscode.workspace.getConfiguration('clawrafaelia').get('logLevel', 'info');
}

function getDebounceMs(): number {
    return vscode.workspace.getConfiguration('clawrafaelia').get('debounceMs', 500);
}

function getMaxTokens(): number {
    return vscode.workspace.getConfiguration('clawrafaelia').get('maxTokens', 150);
}
