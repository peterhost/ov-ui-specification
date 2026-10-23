#!/bin/sh
# Met à jour la copie du modèle d'atelier @@@ui (moteur, outils) depuis une copie locale du dépôt
# ov-uidesigner-artefact, puis réassemble l'atelier d'arbitrage et lance ses tests.
# Usage, depuis la racine du dépôt : npm run maj-moteur [-- ../ov-uidesigner-artefact]
set -e
SRC="${1:-../ov-uidesigner-artefact}"
[ -f "$SRC/moteur/atelier.js" ] || { echo "modèle introuvable : $SRC" >&2; exit 1; }
DST=vendor/ov-uidesigner-artefact
rm -rf "$DST" && mkdir -p "$DST"
cp -R "$SRC/moteur" "$SRC/outils" "$SRC/CDC-ATELIER-UI.md" "$DST/"
printf "Copie de github.com/peterhost/ov-uidesigner-artefact\ncommit : %s\ncopié le : %s\n" "$(git -C "$SRC" rev-parse HEAD 2>/dev/null || echo inconnu)" "$(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$DST/VERSION"
node "$DST/outils/assembler.js" arbitrages/gabarit/atelier.config.json
npm test
