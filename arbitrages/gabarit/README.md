# Arbitrage des points ouverts du gabarit

Atelier `@@@ui` des points ouverts de `GABARIT.md` (§ 15) : une carte par point, la vue du point dessine toutes ses options avec les jetons du gabarit. Publié : https://claude.ai/artifact/ML1F9tCcyfC45Lx6qktLJ5

```sh
node source/palettes.gen.js                          # après un changement de jetons.json
node ../../vendor/ov-uidesigner-artefact/outils/assembler.js atelier.config.json   # réassemble points-ouverts.html
node ../../vendor/ov-uidesigner-artefact/outils/registre.js atelier.config.json    # après export de la base (donnees/)
node ../../vendor/ov-uidesigner-artefact/outils/tester.js atelier.config.json
```

Une fois les points tranchés : reporter chaque choix dans `GABARIT.md` (et `COMPOSANTS.md` s'il y a lieu), retirer le point du § 15.
