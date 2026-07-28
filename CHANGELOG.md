# Changelog

Todas as mudanças notáveis neste projeto serão documentadas aqui.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-07-28

### Adicionado
- ✨ Suporte a leitura de arquivo `.env` (em `~/.env` ou `~/.config/.env`) para configurar API keys sem VS Code settings
- 📝 Utilitário compartilhado `utils.ts` com fetchWithTimeout, getAPIKey e readConfigValue (código mais DRY)
- 🛡️ Sanitização de logs para evitar vazamento de API keys em mensagens de erro
- 📋 CHANGELOG.md para documentação de versões
- 📊 Comando `lint:fix` no package.json

### Melhorado
- 🔧 **aiProbe.ts**: Substituídos paths hardcoded de usuário (`OneDrive/ClawRafaelIA/...`) pelo `PathResolver` portável
- 🎯 **aiSelector.ts**: Removido `require()` dentro de funções — agora usa imports ESModule no topo; tipagem aprimorada com interfaces dedicadas
- ⚡ **agentManager.ts**: Substituído `require()` por imports no topo; tipagem corrigida do `spawn()`
- 🏷️ **smartFallback.ts**: `source` agora reflete corretamente qual provedor de IA respondeu (gemini/openai/claude/localai); corrigido template literal `'ClassName'` para string literal
- 💾 **tokenCache.ts**: Save no disco agora é assíncrono (usando `fs.writeFile` com `await`) com debounce de 2s; LRU eviction corrigido (menor hits primeiro)
- ⚙️ **package.json**: Version bump para 1.3.0; adicionada categoria "Machine Learning"; novos keywords (anthropic, llm, intellisense, productivity); validação `minimum`/`maximum` em configurações numéricas
- 🚫 **.vscodeignore**: Incluído README.md e CHANGELOG.md no VSIX; adicionado `.npmrc` e `.eslintrc.json` à lista de exclusão
- 📐 **.eslintrc.json**: Novas regras (prefer-const, no-var, eqeqeq, curly); config `SwitchCase: 1` para indentação

### Corrigido
- 🐛 `fetchWithTimeout` duplicado entre aiProbe.ts e aiSelector.ts — agora centralizado em utils.ts
- 🐛 `require('child_process')` sendo chamado a cada execução em vez de uma vez no topo

## [1.2.0] - 2026-07-15

### Adicionado
- 🌍 Detecção automática de SO para comando Python correto (Windows/Mac/Linux)
- 🖥️ Suporte a C#, Rust, Go no InlineCompletionProvider
- 🔘 Status bar com toggle visual (verde/ativo, cinza/inativo)
- ⌨️ Atalho de teclado `Ctrl+Alt+C` para toggle

### Melhorado
- ⚡ Debounce de 500ms para evitar chamadas desnecessárias à API
- 💾 Cache semântico com similaridade Jaccard (75%+)
- 🔄 Circuit breaker com reset automático após 5 minutos
- 🎯 Fallback automático entre IAs disponíveis

### Corrigido
- 🔒 API keys nunca expostas em logs
- 🧹 Cache corrompido não quebra a extensão

## [1.1.0] - 2026-06-20

### Adicionado
- 🚀 Suporte a 4 provedores de IA: Gemini, OpenAI, Claude, LocalAI/Ollama
- 🔍 AIProbe para detecção automática de IAs disponíveis
- 🧠 SmartFallback com 3 camadas: IA → Pattern Matching → Template
- 📦 Cache local com persistência em disco
- ⚙️ 6 configurações customizáveis no VS Code
- 📜 Sistema de logging com níveis (off, error, warn, info, debug)
- 🐍 Gerenciamento de agent.py via subprocess

## [1.0.0] - 2026-05-15

### Adicionado
- 🎉 Primeira versão da extensão CLAW
- ✨ InlineCompletionItemProvider para sugestões em tempo real
- 🤖 Integração básica com Google Gemini (via agent.py)
- 📁 PathResolver para localização portável de agent.py
