# 🧠 CLAW - Sugestões Inline com IA Automática

**Sugestões inteligentes de código em tempo real. Detecta automaticamente sua IA: Gemini, OpenAI, Claude, LocalAI ou Ollama.**

<div align="center">

[![Version](https://img.shields.io/badge/version-1.1.8-blue?style=flat-square)](#)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](/LICENSE)
[![Language](https://img.shields.io/badge/language-TypeScript-blue?style=flat-square)](#)
[![VSCode](https://img.shields.io/badge/vscode-%5E1.85.0-0078d4?style=flat-square)](#)
[![Author](https://img.shields.io/badge/author-Rafael%20Batista-black?style=flat-square)](https://github.com/RafaelBatistaDev)

</div>

---

## ✨ Features Principais

- 🤖 **Auto-Detecta IA** — Gemini, OpenAI, Claude, LocalAI ou Ollama
- ⚡ **Sugestões Inline** — Aparecem enquanto você digita (Tab para aceitar)
- 🔄 **Fallback Inteligente** — Alterna entre IAs automaticamente
- 💾 **Cache Semântico** — Reuusa sugestões (ZERO API calls)
- 📡 **Funciona Offline** — LocalAI/Ollama 100% privado
- 🚀 **Performance** — <100ms latência com cache
- 💬 **Multi-Linguagem** — Python, TypeScript, C#, Rust, Go, Java, etc.
- ⚙️ **Zero Config** — Auto-detecta do `.env` ou `agent.py`

---

## 🚀 IAs Suportadas

| IA | Auto-Detecta | Custo | Latência |
|---|---|---|---|
| **Google Gemini** | ✅ | $0.0002/token | 1-1.5s |
| **OpenAI GPT-4** | ✅ | $0.0005/token | 1-2s |
| **Anthropic Claude** | ✅ | $0.0003/token | 1-2s |
| **LocalAI / Ollama** | ✅ | **GRÁTIS** | 150-400ms |
| **Padrões + Templates** | ✅ | **GRÁTIS** | <100ms |

---

## 📦 Instalação

### Via VS Code Marketplace (Recomendado)
1. Abra VS Code
2. Vá em Extensions (Ctrl+Shift+X ou Cmd+Shift+X)
3. Procure por **"CLAW"**
4. Clique em **Install**

### Manual (Desenvolvimento)
```bash
git clone git@github.com:RafaelBatistaDev/CLAW---Sugestoes-Inline-com-IA-Automatica-VSCode.git
cd CLAW---Sugestoes-Inline-com-IA-Automatica-VSCode
npm install
npm run build
```

---

## ⚙️ Configuração

### Opção 1: Via Variáveis de Ambiente (Recomendado)

Crie `~/.env`:
```bash
# Google Gemini
GEMINI_API_KEY=sua_chave_aqui

# OpenAI
OPENAI_API_KEY=sk-...

# Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-...

# LocalAI / Ollama
LOCALAI_URL=http://localhost:8080
```

### Opção 2: Via agent.py (Gemini)
```bash
# Coloque agent.py na raiz do projeto
python agent.py --api-key sua_chave_gemini
```

### Opção 3: Offline (LocalAI/Ollama)
```bash
# Instale e execute
ollama run mistral  # ou outro modelo

# Extension detectará automaticamente em localhost:11434
```

---

## 🎮 Como Usar

1. **Comece a Digitar** — Digite seu código normalmente
2. **Sugestão Aparece** — Após ~500ms, uma sugestão cinzenta aparece
3. **Aceitar** — Pressione `Tab` para aceitar
4. **Rejeitar** — Pressione `Esc` para rejeitar

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
- Verificar se uma IA está configurada
- Verificar logs: `View → Output → CLAW`
- Limpar cache: `CLAW: Limpar Cache`

### "Erro: API key inválida"
- Verificar `.env` ou variáveis de ambiente
- Testar chave manualmente

### "LocalAI/Ollama não detectado"
- Verificar se está rodando: `curl http://localhost:11434`
- Recarregar VS Code: `Ctrl+Shift+P` → `Developer: Reload Window`

---

## 📊 Performance

- **Load Time:** ~300ms
- **Suggestion Latency:** 1-2s (API), <500ms (LocalAI/cache)
- **Memory Usage:** ~50MB
- **CPU:** <5% idle, <15% durante sugestões

---

## 🔒 Privacidade

- ✅ **Offline Mode** — LocalAI/Ollama = 100% privado
- ✅ **Sem Telemetria** — Nenhum dado coletado
- ✅ **Cache Local** — Sugestões guardadas localmente
- ⚠️ **API Keys** — Guardadas em `.env` ou variáveis

---

## 📄 Licença

MIT License © 2026 Rafael Batista  
Veja [LICENSE](/LICENSE) para detalhes completos.

---

## 👤 Autor

**Rafael Batista**
- GitHub: [@RafaelBatistaDev](https://github.com/RafaelBatistaDev)
- Email: rafael@clawrafaelia.dev

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit (`git commit -m 'Add MinhaFeature'`)
4. Push (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

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
