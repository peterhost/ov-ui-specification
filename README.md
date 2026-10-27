# ov-ui-specification

Spécification du design d'interface des applications de l'utilisateur : tout ce qu'une nouvelle application macOS suit pour avoir exactement le style graphique de la refonte de Régie.

C'est le premier **thème d'UI** du modèle d'atelier `@@@ui` (`peterhost/ov-uidesigner-artefact`, catalogue `themes.json`) : `@@@ui ov-ui-specification` le choisit. Un thème respecte un contrat fixe : `GABARIT.md`, `COMPOSANTS.md` et `jetons.json` à la racine (CDC-ATELIER-UI § 1.1).

| Fichier | Contenu |
|---|---|
| `GABARIT.md` | À lire d'abord : principes, règles générales de l'utilisateur, couleurs, opacités et teintes, ombres et voiles, typographie, géométrie, mouvement, structure de fenêtre, panneaux et fenêtres modales, graphiques, textes de l'interface, comportements, accessibilité, liste de conformité, méthode de travail, à ne pas faire, écarts connus de la maquette de Régie (§ 14), points ouverts (§ 15). |
| `COMPOSANTS.md` | Chaque composant : rôle, anatomie, mesures exactes, jetons, états, comportement, où le voir dans la maquette de Régie. |
| `jetons.json` | Couleurs de l'interface pour les 11 palettes dotlib, en clair et en sombre (fonds, textes, accent, teinte, voile, statuts, groupes, pastilles, terminal et couleurs ANSI). Généré par `outils/jetons.js` du dépôt `ov-regie-refactorUI` à partir de la maquette de Régie. |
| `arbitrages/gabarit/` | Atelier `@@@ui` d'arbitrage des points ouverts : une carte par point, toutes les options dessinées avec les jetons ; les 22 points tranchés par l'utilisateur le 23 oct. et reportés. Publié : https://claude.ai/artifact/ML1F9tCcyfC45Lx6qktLJ5 |
| `vendor/ov-uidesigner-artefact/` | Copie du modèle d'atelier `@@@ui` (moteur, outils), pour l'atelier d'arbitrage. Ne pas la modifier : `npm run maj-moteur`. |

Référence visuelle : la maquette de Régie (`atelier/regie-lisibilite.html` du dépôt `peterhost/ov-regie-refactorUI`). Modèle d'atelier : `peterhost/ov-uidesigner-artefact`.

## Utiliser la spécification dans une application

Le dépôt de l'application inscrit le thème dans `atelier.config.json` (`"theme": { "nom": "ov-ui-specification", "copie": "vendor/ov-ui-specification" }`), en garde une copie dans `vendor/ov-ui-specification/` (`GABARIT.md`, `COMPOSANTS.md`, `jetons.json`) et la met à jour depuis une copie locale de ce dépôt (`outils/maj-copies.js` du modèle). Son cahier des charges cite « G § n » (GABARIT) et « C § n » (COMPOSANTS) ; les numéros de section ne changent pas.

## Commandes

```sh
npm install
npm run palettes       # après un changement de jetons.json
npm run construire     # réassemble l'atelier d'arbitrage
npm test               # tests de l'atelier
NODE_PATH=$(npm root -g) npm run audit
npm run maj-moteur -- ../ov-uidesigner-artefact
```

Quand un point ouvert est tranché dans l'atelier : reporter le choix dans `GABARIT.md` (et `COMPOSANTS.md` s'il y a lieu), retirer le point du § 15.
