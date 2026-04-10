#!/bin/bash
set -e

ROOT=$(pwd)
echo "╔════════════════════════════════════════════════════════════════════════════════╗"
echo "║              🚀 BUILD CLAW v1.1.9 COM DISTROBOX (SEM TRAVAR)                 ║"
echo "╚════════════════════════════════════════════════════════════════════════════════╝"

echo ""
echo "1️⃣  Criando container Distrobox com Node.js 20..."
distrobox create --name claw-build-node20 --image node:20-alpine --yes 2>/dev/null || true
sleep 3

echo ""
echo "2️⃣  Limpando builds antigos..."
distrobox enter --name claw-build-node20 -- sh -c "
  cd $ROOT
  rm -rf dist out clawrafaelia-suggestions-1.1.9.vsix node_modules
  echo '✅ Limpo'
"

echo ""
echo "3️⃣  Compilando NO CONTAINER..."
distrobox enter --name claw-build-node20 -- sh -c "
  cd $ROOT
  echo '⏳ npm install...'
  npm install --legacy-peer-deps
  
  echo ''
  echo '📦 tsc compile...'
  npm run compile
  
  echo ''
  echo '📚 vsce package...'
  npm exec vsce -- package -o clawrafaelia-suggestions-1.1.9.vsix
  
  echo ''
  echo '✅ BUILD NO CONTAINER CONCLUÍDO!'
"

echo ""
echo "4️⃣  Verificando VSIX gerado..."
if [ -f "$ROOT/clawrafaelia-suggestions-1.1.9.vsix" ]; then
    echo "✅ VSIX CRIADO COM SUCESSO!"
    ls -lh "$ROOT/clawrafaelia-suggestions-1.1.9.vsix"
    echo ""
    echo "📦 Conteúdo:"
    unzip -l "$ROOT/clawrafaelia-suggestions-1.1.9.vsix" | head -20
else
    echo "❌ Erro: VSIX não foi gerado!"
    exit 1
fi

echo ""
echo "╔════════════════════════════════════════════════════════════════════════════════╗"
echo "║                    ✨ BUILD CONCLUÍDO COM SUCESSO! ✨                         ║"
echo "╚════════════════════════════════════════════════════════════════════════════════╝"
echo ""
echo "🎉 Instale com:"
echo "   code --install-extension $ROOT/clawrafaelia-suggestions-1.1.9.vsix"
echo ""
