#!/bin/bash
set -e

ROOT=$(pwd)

echo "╔════════════════════════════════════════════════════════════════════════════════╗"
echo "║              🚀 BUILD v1.2.0 - Multi-SO Support (Distrobox)                  ║"
echo "╚════════════════════════════════════════════════════════════════════════════════╝"

echo ""
echo "1️⃣  Criando/Iniciando container Distrobox..."
distrobox create --name claw-v1.2.0 --image node:20-alpine --yes 2>/dev/null || true
sleep 2

echo ""
echo "2️⃣  Limpando build antigo..."
distrobox enter --name claw-v1.2.0 -- sh -c "
  cd '$ROOT'
  rm -rf dist out clawrafaelia-suggestions-*.vsix node_modules
  echo '✅ Limpo'
"

echo ""
echo "3️⃣  Compilando v1.2.0 com Multi-SO support..."
distrobox enter --name claw-v1.2.0 -- sh -c "
  cd '$ROOT'
  echo '⏳ npm install...'
  npm install --legacy-peer-deps
  
  echo ''
  echo '📦 tsc compile...'
  npm run compile
  
  echo ''
  echo '📚 vsce package v1.2.0...'
  npm exec vsce -- package -o clawrafaelia-suggestions-1.2.0.vsix
  
  echo ''
  echo '✅ BUILD v1.2.0 CONCLUÍDO!'
"

echo ""
echo "4️⃣  Verificando VSIX gerado..."
if [ -f "$ROOT/clawrafaelia-suggestions-1.2.0.vsix" ]; then
    echo "✅ VSIX v1.2.0 CRIADO COM SUCESSO!"
    ls -lh "$ROOT/clawrafaelia-suggestions-1.2.0.vsix"
    echo ""
    echo "📦 Conteúdo:"
    unzip -l "$ROOT/clawrafaelia-suggestions-1.2.0.vsix" | grep -E 'extension.js|agentManager.js' | head -5
else
    echo "❌ Erro: VSIX não foi gerado!"
    exit 1
fi

echo ""
echo "╔════════════════════════════════════════════════════════════════════════════════╗"
echo "║            ✨ BUILD v1.2.0 COM SUPORTE MULTI-SO CONCLUÍDO! ✨               ║"
echo "╚════════════════════════════════════════════════════════════════════════════════╝"
echo ""
echo "🎉 Novo VSIX v1.2.0 pronto com:"
echo "   ✅ Detecção automática de SO (Windows, macOS, Linux)"
echo "   ✅ Comando Python correto por plataforma"
echo "   ✅ Documentação atualizada"
echo ""
echo "Instale com:"
echo "   code --install-extension $ROOT/clawrafaelia-suggestions-1.2.0.vsix"
echo ""
