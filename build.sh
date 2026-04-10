#!/bin/bash
set -e

echo "=========================================="
echo "  BUILD CLAW v1.1.9 NO CONTAINER"
echo "=========================================="
echo ""

echo "1) Limpando build antigo..."
rm -rf dist out clawrafaelia-suggestions-1.1.9.vsix 2>/dev/null
sleep 2

echo "2) Compilando em Podman..."
podman run --rm -v $(pwd):/app -w /app node:20-alpine npm ci
podman run --rm -v $(pwd):/app -w /app node:20-alpine npm run compile
podman run --rm -v $(pwd):/app -w /app node:20-alpine npm exec vsce -- package -o clawrafaelia-suggestions-1.1.9.vsix

echo ""
echo "=========================================="
echo "  ✅ BUILD COMPLETO!"
echo "=========================================="
echo ""
ls -lh clawrafaelia-suggestions-1.1.9.vsix
