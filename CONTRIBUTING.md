# 🤝 Guia de Contribuição - CLAW

Obrigado por considerar contribuir para o **CLAW - Sugestões Inline com IA Automática**! Este guia irá ajudá-lo a entender nosso processo de desenvolvimento e como você pode ajudar.

## 📋 Tabela de Conteúdos

- [Como Começar](#como-começar)
- [Tipos de Contribuição](#tipos-de-contribuição)
- [Processo de Contribuição](#processo-de-contribuição)
- [Padrões de Código](#padrões-de-código)
- [Envio de Issues](#envio-de-issues)
- [Pull Requests](#pull-requests)
- [Dúvidas?](#dúvidas)

---

## 🚀 Como Começar

### Pré-requisitos

- **Node.js** >= 18.x
- **npm** >= 9.x
- **TypeScript** (instalado via npm)
- **VS Code** >= 1.85.0

### Setup Local

```bash
# 1. Fork do repositório
git clone https://github.com/RafaelBatistaDev/CLAW---Sugestoes-Inline-com-IA-Automatica-VSCode.git
cd CLAW---Sugestoes-Inline-com-IA-Automatica-VSCode

# 2. Instale as dependências
npm install

# 3. Compile o TypeScript
npm run compile

# 4. Bundle com Webpack
npm run bundle

# 5. Ou use o Makefile para simplificar
make build-local
```

---

## 🎯 Tipos de Contribuição

### 🐛 **Relatar Bugs**
Se encontrou um bug, [abra uma issue](https://github.com/RafaelBatistaDev/CLAW---Sugestoes-Inline-com-IA-Automatica-VSCode/issues) com:
- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs. atual
- Versão do VS Code e do CLAW

### ✨ **Sugerir Melhorias**
Ideias são bem-vindas! Descreva:
- Qual problema a melhoria resolve
- Como seria a solução ideal
- Possíveis casos de uso

### 📚 **Documentação**
- Melhorias no README
- Novos exemplos de uso
- Documentação de API
- Tradução (português, inglês, etc.)

### 💻 **Código**
- Correção de bugs
- Novas funcionalidades
- Refatoração e otimização
- Testes
- Suporte a novos modelos de IA

---

## 🔄 Processo de Contribuição

### 1️⃣ **Crie uma Branch**

```bash
# Atualize a main
git checkout main
git pull origin main

# Crie uma branch descritiva
git checkout -b feat/nova-funcionalidade
# ou
git checkout -b fix/corrigir-bug-xyz
# ou
git checkout -b docs/melhorar-readme
```

**Convenção de nomes:**
- `feat/` — Nova funcionalidade
- `fix/` — Correção de bug
- `docs/` — Documentação
- `refactor/` — Refatoração
- `test/` — Testes
- `perf/` — Melhoria de performance

### 2️⃣ **Faça as Alterações**

```bash
# Edite os arquivos
# Teste localmente
npm run compile
npm test  # (se houver testes)

# Verifique o linting
npm run lint
```

### 3️⃣ **Commit com Mensagens Claras**

```bash
# Use commits descritivos
git add .
git commit -m "feat: adicionar suporte para modelo XYZ"
git commit -m "fix: corrigir erro de detecção de API"
git commit -m "docs: melhorar instruções de instalação"
```

**Formato recomendado:**
```
<tipo>(<escopo>): <descrição curta>

<descrição longa opcional - explique o que e por quê>

Fecha #123
```

**Tipos válidos:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

### 4️⃣ **Atualize para Main**

```bash
git fetch origin
git rebase origin/main
```

### 5️⃣ **Push para seu Fork**

```bash
git push origin feat/nova-funcionalidade
```

### 6️⃣ **Abra um Pull Request**

- Vá para https://github.com/RafaelBatistaDev/CLAW---Sugestoes-Inline-com-IA-Automatica-VSCode
- Clique em "Compare & pull request"
- Descreva suas mudanças claramente
- Referencie issues relacionadas (#123)
- Aguarde revisão

---

## 📐 Padrões de Código

### TypeScript

```typescript
// ✅ BOM
export interface AIProvider {
  name: string;
  isAvailable(): Promise<boolean>;
  getSuggestion(context: CodeContext): Promise<string>;
}

export async function detectAI(): Promise<AIProvider | null> {
  const providers = [new GeminiProvider(), new OpenAIProvider()];

  for (const provider of providers) {
    if (await provider.isAvailable()) {
      return provider;
    }
  }

  return null;
}

// ❌ EVITE
export async function detectAI() {
  // sem types
  let p1 = new GeminiProvider();
  if (p1.available()) {
    return p1;
  }
  // ...
}
```

### Convenções

- Use **PascalCase** para classes e interfaces
- Use **camelCase** para funções e variáveis
- Adicione **JSDoc** comentários para funções públicas
- Use **const** por padrão, evite **let** quando possível
- Prefira **arrow functions** para callbacks

### Linting

```bash
npm run lint     # Verificar
npm run lint:fix # Corrigir automaticamente
```

---

## 🐞 Envio de Issues

### Antes de Reportar
- Verifique se o bug já foi reportado
- Teste a versão mais recente
- Procure na documentação

### Template de Issue

```markdown
## 📝 Descrição
[Descreva o bug claramente]

## 🔄 Passos para Reproduzir
1. Abra VS Code
2. Instale CLAW v1.2.0
3. [Suas ações...]

## ✅ Comportamento Esperado
[O que deveria acontecer]

## ❌ Comportamento Atual
[O que realmente acontece]

## 🔍 Contexto
- OS: [Windows/Linux/macOS]
- VS Code: v1.85.0+
- CLAW: v1.2.0+
- Modelo IA: [Gemini/OpenAI/Claude/Ollama]
- Logs: [cole output da Console do VS Code]
```

---

## ✅ Pull Requests

### Checklist Antes de Submeter

- [ ] Testei meu código localmente
- [ ] Rodei `npm run compile`
- [ ] Rodei `npm run lint:fix`
- [ ] Adicionei/atualizei documentação
- [ ] Meus commits têm mensagens claras
- [ ] Refencio issues relacionadas
- [ ] Não há conflitos com `main`

### Depois de Submeter

- [ ] Aguarde revisão (até 48h)
- [ ] Responda aos comentários
- [ ] Faça os ajustes solicitados
- [ ] Atualize a branch se necessário

---

## 📦 Estrutura do Projeto

```
CLAW/
├── src/                 # Código-fonte TypeScript
│   ├── extension.ts     # Entry point
│   ├── agentManager.ts  # Gerenciador de IA
│   ├── aiSelector.ts    # Auto-detecta IA
│   ├── aiProbe.ts       # Testa disponibilidade
│   └── ...
├── scripts/             # Scripts de build
├── package.json         # Dependências
├── tsconfig.json        # Config TypeScript
├── webpack.config.js    # Config bundler
├── Makefile             # Targets de build
├── README.md            # Documentação
└── LICENSE              # MIT License
```

### Arquivos Principais

- **`extension.ts`** — Inicialização e ativação
- **`agentManager.ts`** — Gerencia provedores de IA
- **`inlineCompletionProvider.ts`** — Sugestões inline
- **`smartFallback.ts`** — Fallback inteligente entre IAs

---

## 🏗️ Build

### Comandos Disponíveis

```bash
npm run compile       # Compila TypeScript → dist/
npm run bundle        # Webpack bundle
npm run lint          # ESLint check
npm run lint:fix      # ESLint auto-fix

make install          # npm install
make compile          # Compilar TS
make bundle           # Bundle Webpack
make package          # Gerar .vsix
make build-local      # Full build local
make build-all        # Clean + install + build
```

### Gerar .vsix (Extensão)

```bash
npm install -g @vscode/vsce
vsce package
```

---

## 🧪 Testes

```bash
# Executar testes (se houver)
npm test

# Coverage
npm run coverage
```

---

## 📝 Dúvidas?

- 📖 Leia o [README](README.md)
- 🐛 Procure por issues abertas
- 💬 Comente em uma issue existente
- 📧 Contate: rafael@clawrafaelia.dev
- 🌐 Discord: [link do servidor, se houver]

---

## 🙏 Créditos

Muito obrigado por contribuir! Sua ajuda é essencial para tornar o CLAW melhor.

Se sua contribuição for aceita, você será adicionado à [CONTRIBUTORS.md](CONTRIBUTORS.md) 🌟

---

## 📜 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a [MIT License](LICENSE).

---

**Happy Coding! 🚀**
