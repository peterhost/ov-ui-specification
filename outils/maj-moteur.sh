#!/bin/sh
# Met à jour la copie du modèle d'atelier @@@ui (moteur, outils) depuis une copie locale du dépôt
# ov-uidesigner-artefact, puis réassemble l'atelier d'arbitrage et lance ses tests. Ce dépôt est lui-même
# le thème d'UI de l'atelier d'arbitrage : il n'en garde pas de copie.
# Usage, depuis la racine du dépôt : npm run maj-moteur [-- ../ov-uidesigner-artefact]
set -e
MOD="${1:-../ov-uidesigner-artefact}"
node "$MOD/outils/maj-copies.js" arbitrages/gabarit/atelier.config.json "$MOD"
npm test
