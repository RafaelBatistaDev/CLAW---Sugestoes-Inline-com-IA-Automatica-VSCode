# 🧠 CLAW - Sugestões Inline com IA Automática

**Sugestões inteligentes de código em tempo real. Detecta automaticamente sua IA: Gemini, OpenAI, Claude, LocalAI ou Ollama.**

<div align="center">

[![Version](https://img.shields.io/badge/version-1.2.0-blue?style=flat-square)](#)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](/LICENSE)
[![Language](https://img.shields.io/badge/language-TypeScript-blue?style=flat-square)](#)
[![VSCode](https://img.shields.io/badge/vscode-%5E1.85.0-0078d4?style=flat-square)](#)
[![Author](https://img.shields.io/badge/author-Rafael%20Batista-black?style=flat-square)](https://github.com/RafaelBatistaDev)

</div>

---

## ✨ Features Principais

- 🤖 **Auto-Detecta IA** — Gemini, OpenAI, Claude, LocalAI ou Ollama
- ⚡ **Sugestões Inline** — Aparecem enquanto você digita, substituem sugestões nativas (Tab para aceitar)
- 🔄 **Fallback Inteligente** — Alterna entre IAs automaticamente se uma falhar
- 💾 **Cache Semântico** — Reuusa sugestões inteligentemente (ZERO API calls em cache hit)
- 📡 **Funciona 100% Offline** — LocalAI/Ollama privado, sem limite de requests
- 🚀 **Performance** — <100ms latência com cache, 1-2s com API
- 💬 **Multi-Linguagem** — Python, TypeScript, JavaScript, C#, Rust, Go, Java, Ruby, PHP, C++, C
- ⚙️ **Zero Config** — Auto-detecta do `.env` ou `agent.py`
- 🎯 **Substitui Completions Nativas** — Quando ativada, desativa IntelliSense padrão
- 🔘 **Toggle Fácil** — Click no botão CLAW na status bar ou `Ctrl+Alt+C`

---

## 🚀 IAs Suportadas

| IA | Auto-Detecta | Custo | Latência | Recomendado |
|---|---|---|---|---|
| **Google Gemini** | ✅ | $0.0002/token | 1-1.5s | Melhor custo-benefício |
| **OpenAI GPT-4** | ✅ | $0.0005/token | 1-2s | Mais poderoso |
| **Anthropic Claude** | ✅ | $0.0003/token | 1-2s | Equilibrado |
| **LocalAI / Ollama** | ✅ | **GRÁTIS** | 150-400ms | Melhor privacidade |
| **Padrões + Templates** | ✅ | **GRÁTIS** | <100ms | Fallback local |

---

## 📦 Instalação

### Via VS Code Marketplace (Recomendado)

1. Abra VS Code
2. Vá em Extensions (Ctrl+Shift+X ou Cmd+Shift+X)
3. Procure por **"CLAW"**
4. Clique em **Install**
5. Extensão aparecerá como "✨ CLAW: ON" na status bar

### Manual (Desenvolvimento)

```bash
git clone git@github.com:RafaelBatistaDev/CLAW---Sugestoes-Inline-com-IA-Automatica-VSCode.git
cd CLAW---Sugestoes-Inline-com-IA-Automatica-VSCode
npm install
npm run build:auto
code --install-extension clawrafaelia-suggestions-1.2.0.vsix
```

---

## 🖥️ Compatibilidade com Sistemas Operacionais

### ✅ Windows 10/11
- **Suporte**: ✅ Totalmente compatível
- **Python**: Requer Python 3.9+ (Microsoft Store ou python.org)
- **Comando**: Usa `python` automaticamente
- **agent.py**: `C:\Users\{usuario}\bin\agent.py` ou `%USERPROFILE%\.local\bin\agent.py`

### ✅ macOS (Intel/Apple Silicon)
- **Suporte**: ✅ Totalmente compatível
- **Python**: Requer Python 3.9+ (Homebrew: `brew install python3`)
- **Comando**: Usa `python3` automaticamente
- **agent.py**: `~/.local/bin/agent.py` ou `~/bin/agent.py`

### ✅ Linux (Ubuntu, Fedora, Debian, etc)
- **Suporte**: ✅ Totalmente compatível
- **Python**: Python 3 geralmente pré-instalado
- **Comando**: Usa `python3` automaticamente
- **agent.py**: `~/.local/bin/agent.py` ou `~/.claw/agent.py`

**Novo em v1.2.0**: Detecção automática de SO para usar o comando Python correto! 🎉

---

## 🎮 Como Usar

### Ativar/Desativar

**Opção 1: Botão Status Bar**

- Localize `✨ CLAW: ON` (verde) na barra de status (canto inferior direito)
- Clique para toggle (muda para `🔴 CLAW: OFF` quando desativado)

**Opção 2: Atalho Teclado**

- Pressione `Ctrl+Alt+C` para toggle instant

**Opção 3: Command Palette**

- Pressione `Ctrl+Shift+P`
- Digite `CLAW: Ativar/Desativar Sugestões`
- Enter

### Usar Sugestões

1. **Abrir Arquivo** — Bra um arquivo de código (Python, JS, TS, etc.)
2. **Começar a Digitar** — Escreva seu código normalmente
3. **Sugestão Aparece** — Após ~500ms, sugestão cinzenta aparece
4. **Aceitar** — Pressione `Tab` ou clique
5. **Rejeitar** — Pressione `Esc`

**Exemplo:**

```python
# Você digita:
def calculate_

# CLAW sugere:
def calculate_average(numbers):
    return sum(numbers) / len(numbers)

# Tab para aceitar, Esc para rejeitar
```

---

## ⚙️ Configuração

### Opção 1: Via Variáveis de Ambiente (Recomendado)

Crie `~/.env` ou `~/.config/.env`:

```bash
# Google Gemini
GEMINI_API_KEY=sua_chave_aqui

# OpenAI
OPENAI_API_KEY=sk-...

# Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-...

# LocalAI / Ollama
LOCALAI_URL=http://localhost:8080
OLLAMA_URL=http://localhost:11434
```

### Opção 2: Via Settings VS Code

Abra Settings (Ctrl+,) e procure por "CLAW":

```json
{
  "clawrafaelia.enabled": true,           // Ativar/desativar
  "clawrafaelia.debounceMs": 500,         // Delay antes de sugerir
  "clawrafaelia.maxTokens": 150,          // Max tokens por sugestão
  "clawrafaelia.enableLocalAI": true,     // Usar LocalAI/Ollama
  "clawrafaelia.logLevel": "info"         // off|error|warn|info|debug
}
```

### Opção 3: Via agent.py (Gemini)

```bash
# Coloque agent.py na raiz do projeto
python agent.py --api-key sua_chave_gemini
```

### Opção 4: Offline (LocalAI/Ollama)

```bash
# Instale Ollama: https://ollama.ai
# Execute:
ollama run mistral  # ou outro modelo

# CLAW detectará automaticamente em localhost:11434
```

---

## 📋 Comandos Disponíveis

### Comandos Disponíveis

| Comando | Função |
|---------|--------|
| `CLAW: Ativar/Desativar` | Ativa ou desativa sugestões |
| `CLAW: Limpar Cache` | Limpa cache de sugestões |

---

## 🛠️ Desenvolvimento

### Build

```bash
npm install
npm run build      # Build produção
npm run dev        # Build com watch mode
```

### Testes

```bash
npm test
npm run lint
```

### Debug

1. Abra este folder no VS Code
2. Pressione `F5` para iniciar debug
3. Uma nova janela VS Code abrirá com a extensão loaded

---

## 📁 Estrutura

```
src/
├── extension.ts              # Entry point
├── inlineCompletionProvider.ts  # Provider de sugestões
├── aiSelector.ts             # Selector de IAs
├── aiProbe.ts                # Proba IAs disponíveis
├── smartFallback.ts          # Fallback inteligente
├── tokenCache.ts             # Cache local
├── pathResolver.ts           # Resolvedor de paths
├── agentManager.ts           # Gerenciador de agent.py
└── logger.ts                 # Logging

package.json        # Dependências
tsconfig.json       # Config TypeScript
webpack.config.js   # Build config
```

---

## 🐛 Troubleshooting

### "Sugestões não aparecem"

**Solução:**

1. Verificar se extensão está ON: veja status bar (✨ CLAW: ON)
2. Verificar se IA está configurada
3. Abrir Output: `View → Output → CLAW`
4. Limpar cache: Command → `CLAW: Limpar Cache`

### "Erro: API key inválida"

**Solução:**

1. Verificar `.env` ou variáveis ambiente
2. Testar chave: `echo $GEMINI_API_KEY`
3. Reloadar VS Code: `Ctrl+Shift+P` → `Reload Window`

### "LocalAI/Ollama não conecta"

**Solução:**

1. Verificar se está rodando: `curl http://localhost:11434`
2. Se não, instalar: `curl https://ollama.ai/install.sh | sh`
3. Executar: `ollama run mistral`
4. Reloadar: `Ctrl+Shift+P` → `Reload Window`

### "Extensão não ativa ao iniciar"

**Solução:**

1. Ver erro: `View → Output → CLAW`
2. Verificar TypeScript compile: `npm run lint`
3. Reinstalar: `npm install`
4. Rebuild: `npm run build:auto`

---

## 📊 Performance

| Métrica | Valor | Notas |
|---------|-------|-------|
| **Load Time** | ~300ms | Na ativação |
| **Suggestion Latency (API)** | 1-2s | Gemini/OpenAI |
| **Suggestion Latency (Cache)** | <100ms | Hit rate ~60% |
| **Suggestion Latency (LocalAI)** | 150-400ms | Offline, sem limite |
| **Memory Usage** | ~50-150MB | Com cache |
| **CPU (Idle)** | <1% | Esperando input |
| **CPU (Suggesting)** | 5-15% | Durante processamento |

---

## 🔒 Privacidade & Segurança

✅ **Modo 100% Privado**

- Use LocalAI ou Ollama localmente
- Nenhum dado é enviado para internet
- Código executado na sua máquina

✅ **Sem Telemetria**

- CLAW não coleta dados de uso
- Sem tracking, sem analytics
- Open source: verifique o código

✅ **API Keys Seguras**

- Armazenadas em `~/.env` (não commitado)
- Nunca expose em logs
- Git ignore configurado

⚠️ **API Online**

- Se usar Gemini/OpenAI/Claude
- Sugestões são enviadas para servidores deles
- Revisar política de privacidade deles

---

## 📄 Licença

MIT License © 2026 Rafael Batista

Você é livre para:

- ✅ Usar comercialmente
- ✅ Modificar código
- ✅ Distribuir
- ✅ Usar privadamente

Veja [LICENSE](/LICENSE) para detalhes completos.

---

## 👤 Autor

**Rafael Batista**

- GitHub: [@RafaelBatistaDev](https://github.com/RafaelBatistaDev)
- Email: <rafael@clawrafaelia.dev>

---

## 🤝 Contribuindo

Contribuições são bem-vindas! 🙏

Seja reportando bugs, sugerindo melhorias, escrevendo documentação ou enviando código, sua ajuda é importante!

👉 **[Leia o Guia Completo de Contribuição](CONTRIBUTING.md)** para:
- Setup local
- Padrões de código
- Processo de pull request
- Dúvidas frequentes

Versão rápida:
```bash
git clone <seu-fork>
cd CLAW---Sugestoes-Inline-com-IA-Automatica-VSCode
npm install && make build-local
# Faça suas mudanças
git push e abra um PR!
```

---

## ⭐ Apoiar

Se gostou do projeto:

- ⭐ Dê uma estrela
- 🐛 Reporte bugs
- 💡 Sugira features
- 📢 Compartilhe com amigos

---

<div align="center">

**Feito com ❤️ por Rafael Batista**

[⬆️ Voltar ao Topo](#-claw---sugestões-inline-com-ia-automática)

</div>
