# Registre des choix de l'atelier

Généré par `registre.js` à partir de `points-ouverts.html` et de `donnees/`. Ne pas éditer à la main.

Validé = figé par Pierre dans l'atelier ; c'est l'état de référence. Ouvert = encore en discussion.

19 cartes validées sur 22.

| Carte | Clé | État | Choix |
|---|---|---|---|
| 1 · Sourdine hors des mesures | `p1` | validé | A · Mesures seulement (retenu) |
| 2 · Couleur du bandeau de l’élément maître | `p2` | ouvert | proposé : A · Maître en jaune (retenu) |
| 3 · Couleur d’une demande en attente | `p3` | validé | A · Un seul cyan (retenu) |
| 4 · Teintes de groupe portées par des marques | `p4` | validé | A · Garder (retenu) |
| 5 · Pied « ↵ insérer · ⇥ compléter » | `p5` | validé | A · Garder le pied (retenu) |
| 6 · Référence du graphique horaire | `p6` | validé | A · Tirets gris (retenu) |
| 7 · Heure du relevé et « Actualiser » | `p7` | validé | A · relevé 01:08 · Actualiser (retenu) |
| 8 · Élément sur une machine injoignable | `p8` | validé | A · Gris dans la colonne, orange dans ⌘P (retenu) |
| 9 · Annuler un arrêt programmé (⊗) | `p9` | validé | A · Au survol (retenu) |
| 10 · Pulsation d’une marque d’anomalie | `p10` | validé | A · Signal : elle pulse encore (retenu) |
| 11 · Réglages de choix de design | `p11` | validé | A · Nouvelles applications sans (retenu) |
| 12 · Réglages › Groupes : voir une couleur en clair et en sombre | `p12` | ouvert | proposé : A · Deux pastilles par teinte, dans le menu (retenu) |
| 13 · Style des textes | `p13` | validé | B · Style neutre (décidé) |
| 14 · Taille minimale et barre de titre | `p14` | ouvert | proposé : A · Règle pour toute application (retenu) |
| 15 · Progression en tranches | `p15` | validé | A · Segments séparés (retenu) |
| 16 · Catégorie coûteuse en orange | `p16` | validé | A · Exception générique (retenu) |
| 17 · Formes d’état vide | `p17` | validé | A · Centré et carte (retenu) |
| 18 · Voile de la liste des raccourcis | `p18` | validé | A · Sans voile (retenu) |
| 19 · Armement de ⌫ | `p19` | validé | A · Sans délai (retenu) |
| 20 · Composants propres à Claude Code | `p20` | validé | A · Composants génériques (retenu) |
| 21 · Message d’action | `p21` | validé | B · En bas à droite, s’efface après 4 s (retenu) |
| 22 · Couleurs ANSI du terminal | `p22` | validé | A · Tirées des jetons (retenu) |

## 1 · Sourdine hors des mesures (`p1`)

- État : **validé** — A · Mesures seulement (retenu) (`A`), le 2026-10-23 10:14
- Actuel dans Gabarit : A · Mesures seulement (retenu) (`A`)
- Options : A · Mesures seulement (retenu) (`A`) · B · Toute surface colorée (`B`)

La sourdine (surfaces colorées atténuées, petites marques en pleine couleur) vaut pour les graphiques, les tuiles et les capsules de mesure. Faut-il l’étendre aux barres de mesure, micro-jauges et fonds de capsule ailleurs ? G § 3.5.

## 2 · Couleur du bandeau de l’élément maître (`p2`)

- État : **ouvert** — proposition : A · Maître en jaune (retenu) (`A`)
- Actuel dans Gabarit : A · Maître en jaune (retenu) (`A`)
- Options : A · Maître en jaune (retenu) (`A`) · B · Maître en accent (`B`) · C · Fond neutre, mot coloré (`C`)

Vert, jaune, orange, rouge ne servent qu’aux statuts. Jaune = « une question attend une réponse » (point jaune de la pastille). Le bandeau de l’élément maître est jaune lui aussi : à côté d’une pastille jaune, il peut se lire comme une question. G § 2.4.

Échanges :

- **Pierre**, 2026-10-23 10:15 :
  > "Le jaune est réservé à « question »" : je ne comprends pas, explicite
- **Claude**, 2026-10-23 10:47 :
  > Reformulé. Vert, jaune, orange et rouge ne servent qu'aux statuts, et chacun a un sens précis : jaune = « une question attend une réponse » (le point jaune de la pastille). Or le bandeau de l'élément maître est jaune lui aussi. Le risque : à côté d'une pastille jaune, ce bandeau se lit comme « question en attente ». L'illustration montre maintenant les deux ensemble. A garde le jaune (exception nommée), B passe le bandeau maître en accent, C met tous les bandeaux sur fond neutre avec le mot seul coloré.

## 3 · Couleur d’une demande en attente (`p3`)

- État : **validé** — A · Un seul cyan (retenu) (`A`), le 2026-10-23 10:16
- Actuel dans Gabarit : A · Un seul cyan (retenu) (`A`)
- Options : A · Un seul cyan (retenu) (`A`) · B · Quatre nuances (`B`) · C · Jaune (`C`)

Trait et 🔒 d’une demande en attente (mot de passe…), dans la colonne et sur son panneau. G § 9.5.

## 4 · Teintes de groupe portées par des marques (`p4`)

- État : **validé** — A · Garder (retenu) (`A`), le 2026-10-23 10:16
- Actuel dans Gabarit : A · Garder (retenu) (`A`)
- Options : A · Garder (retenu) (`A`) · B · Teinte réservée aux marques (`B`) · C · Marques en gris (`C`)

Sarcelle pour « distant » et le mode plan, lavande pour le mode édition : un élément d’un groupe sarcelle prend la même teinte que sa marque. G § 2.4.

## 5 · Pied « ↵ insérer · ⇥ compléter » (`p5`)

- État : **validé** — A · Garder le pied (retenu) (`A`), le 2026-10-23 10:17
- Actuel dans Gabarit : A · Garder le pied (retenu) (`A`)
- Options : A · Garder le pied (retenu) (`A`) · B · Touches dans la bulle de l’en-tête (`B`)

Le sélecteur liste et aperçu (@@@) écrit ses touches en pied, contre le principe 6 (pas de rappel de touches écrit). C § 8.2.

## 6 · Référence du graphique horaire (`p6`)

- État : **validé** — A · Tirets gris (retenu) (`A`), le 2026-10-23 10:17
- Actuel dans Gabarit : A · Tirets gris (retenu) (`A`)
- Options : A · Tirets gris (retenu) (`A`) · B · Tirets accent (`B`)

Ligne du débit autorisé sur le graphique des 48 heures. G § 7.12.

## 7 · Heure du relevé et « Actualiser » (`p7`)

- État : **validé** — A · relevé 01:08 · Actualiser (retenu) (`A`), le 2026-10-23 10:17
- Actuel dans Gabarit : A · relevé 01:08 · Actualiser (retenu) (`A`)
- Options : A · relevé 01:08 · Actualiser (retenu) (`A`) · B · Actualiser · 01:08 (`B`)

Ordre des deux mots à droite de l’en-tête d’une vue de mesures. G § 9.8.

## 8 · Élément sur une machine injoignable (`p8`)

- État : **validé** — A · Gris dans la colonne, orange dans ⌘P (retenu) (`A`), le 2026-10-23 10:18
- Actuel dans Gabarit : A · Gris dans la colonne, orange dans ⌘P (retenu) (`A`)
- Options : A · Gris dans la colonne, orange dans ⌘P (retenu) (`A`) · B · « hors ligne » orange partout (`B`) · C · « injoignable » gris partout (`C`)

Dans la colonne et dans le sélecteur ⌘P (où l’on va insérer son nom). G § 9.13.

## 9 · Annuler un arrêt programmé (⊗) (`p9`)

- État : **validé** — A · Au survol (retenu) (`A`), le 2026-10-23 10:19
- Actuel dans Gabarit : A · Au survol (retenu) (`A`)
- Options : A · Au survol (retenu) (`A`) · B · Toujours visible (`B`)

En-tête d’une entité qui s’éteint dans quelques secondes. C § 1.10.

## 10 · Pulsation d’une marque d’anomalie (`p10`)

- État : **validé** — A · Signal : elle pulse encore (retenu) (`A`), le 2026-10-23 10:19
- Actuel dans Gabarit : A · Signal : elle pulse encore (retenu) (`A`)
- Options : A · Signal : elle pulse encore (retenu) (`A`) · B · Transition : elle se fige (`B`)

Quand « Animations de l’interface » est coupé, la marque qui pulse (◎ orange) continue-t-elle ? Seul « Réduire les animations » de macOS fige tout. G § 6.

## 11 · Réglages de choix de design (`p11`)

- État : **validé** — A · Nouvelles applications sans (retenu) (`A`), le 2026-10-23 10:22
- Actuel dans Gabarit : A · Nouvelles applications sans (retenu) (`A`)
- Options : A · Nouvelles applications sans (retenu) (`A`) · B · Les retirer de Régie aussi (`B`) · C · Exceptions nommées (`C`)

Régie a deux réglages qui ne règlent qu’un choix de design (modes affichés ; flèche ou anneau), contre le principe 10. G § 1.

## 12 · Réglages › Groupes : voir une couleur en clair et en sombre (`p12`)

- État : **ouvert** — proposition : A · Deux pastilles par teinte, dans le menu (retenu) (`A`)
- Actuel dans Gabarit : A · Deux pastilles par teinte, dans le menu (retenu) (`A`)
- Options : A · Deux pastilles par teinte, dans le menu (retenu) (`A`) · B · Deux aperçus de la colonne, clair et sombre (`B`)

Une couleur de groupe change entre le thème clair et le thème sombre. Pour la choisir, la voir dans les deux thèmes : où ? G § 3.4.

Échanges :

- **Pierre**, 2026-10-23 10:24 :
  > le but est d'avoir un aperçu theme clair et un aperçu theme sombre, non ? C'est un prinicpe intéressant (sauf si je n'ai rien compris) : reformule clairement
- **Claude**, 2026-10-23 10:47 :
  > Oui, c'est exactement le but : une couleur de groupe change entre clair et sombre, il faut la voir dans les deux thèmes pour la choisir, sans basculer macOS. Les deux options y répondent ; elles diffèrent par l'endroit. A : dans le menu de couleur, chaque teinte en deux pastilles (claire | sombre). B : à côté de la liste, deux aperçus en direct de la colonne, l'un en clair, l'autre en sombre, mis à jour à chaque changement. B est marqué dans les choix en cours ; à valider pour le reporter.

## 13 · Style des textes (`p13`)

- État : **validé** — B · Style neutre (décidé) (`B`), le 2026-10-23 10:47
- Actuel dans Gabarit : B · Style neutre (décidé) (`B`)
- Options : A · L’interface tutoie (`A`) · B · Style neutre (décidé) (`B`)

Ni tutoiement ni vouvoiement : infinitif pour une action, nom ou participe pour un état. Décidé par Pierre, règle générale. G § 1 (principe 15), § 2.3.

Échanges :

- **Pierre**, 2026-10-23 10:25 :
  > je ne veux de tutoiement nulle part, et cela va demander un refactor de tout ce que tu as fait. passe au style neutre. C'esr une regle générale, et importante.
- **Claude**, 2026-10-23 10:47 :
  > Noté et validé (B) : style neutre partout, règle générale. Posé dans la spécification : principe 15, G § 2.3, liste de conformité et « À ne pas faire ». Action à l'infinitif (« Choisir la session cible »), état en nom ou participe (« 99 % de la semaine utilisés »). Refonte en cours : modèle d'atelier (fil : « Aucun message. », « Pierre », « Message · choix en cours joints ») déjà fait ; spécification faite ; Régie (maquette, cahiers des charges) en cours.

## 14 · Taille minimale et barre de titre (`p14`)

- État : **ouvert** — proposition : A · Règle pour toute application (retenu) (`A`)
- Actuel dans Gabarit : A · Règle pour toute application (retenu) (`A`)
- Options : A · Règle pour toute application (retenu) (`A`) · B · Propre à Régie (`B`)

Deux détails de la fenêtre de Régie : taille minimale 1120 × 640 ; aucun titre écrit sous macOS 15 et plus, nom de l’application et sous-titre sous macOS 14. Règle pour toute application, ou détail propre à Régie ? G § 2.6.

Échanges :

- **Pierre**, 2026-10-23 10:25 :
  > je ne compredns pas, explicite
- **Claude**, 2026-10-23 10:47 :
  > Reformulé. Deux détails de la fenêtre principale de Régie : 1) taille minimale 1120 × 640 (en dessous, la fenêtre ne se réduit plus) ; 2) barre de titre : sous macOS 15 et plus, aucun titre écrit (la barre d'outils occupe la barre de titre), sous macOS 14, le nom de l'application avec un sous-titre (Régie : le nom de l'émulateur). Question : est-ce une règle de la spécification pour toute application (A : chacune fixe sa taille minimale et suit le même traitement du titre), ou un détail propre à Régie que la spécification ne règle pas (B) ?

## 15 · Progression en tranches (`p15`)

- État : **validé** — A · Segments séparés (retenu) (`A`), le 2026-10-23 10:26
- Actuel dans Gabarit : A · Segments séparés (retenu) (`A`)
- Options : A · Segments séparés (retenu) (`A`) · B · Barre continue et compte (`B`)

Barre d’une campagne (acceptés, en attente, refusés, reste), que le cahier des charges ne dessine pas. C § 7.1.

## 16 · Catégorie coûteuse en orange (`p16`)

- État : **validé** — A · Exception générique (retenu) (`A`), le 2026-10-23 10:26
- Actuel dans Gabarit : A · Exception générique (retenu) (`A`)
- Options : A · Exception générique (retenu) (`A`) · B · Neutre, sauf anomalie (`B`)

Bande fine de la consommation par modèle : la catégorie coûteuse est orange sans être une anomalie. G § 7.12.

## 17 · Formes d’état vide (`p17`)

- État : **validé** — A · Centré et carte (retenu) (`A`), le 2026-10-23 10:30
- Actuel dans Gabarit : A · Centré et carte (retenu) (`A`)
- Options : A · Centré et carte (retenu) (`A`) · B · Toujours la carte (`B`)

État vide d’une vue entière et de la surface principale. C § 2.6, § 2.8.

## 18 · Voile de la liste des raccourcis (`p18`)

- État : **validé** — A · Sans voile (retenu) (`A`), le 2026-10-23 10:30
- Actuel dans Gabarit : A · Sans voile (retenu) (`A`)
- Options : A · Sans voile (retenu) (`A`) · B · Voile à 18 % (`B`)

Liste affichée en tenant ⌘ une seconde. G § 3.7.

## 19 · Armement de ⌫ (`p19`)

- État : **validé** — A · Sans délai (retenu) (`A`), le 2026-10-23 10:31
- Actuel dans Gabarit : A · Sans délai (retenu) (`A`)
- Options : A · Sans délai (retenu) (`A`) · B · Désarmé après 1,5 s (`B`)

Un premier ⌫ arme la suppression d’une capture, le second l’envoie à la corbeille. C § 8.3.

## 20 · Composants propres à Claude Code (`p20`)

- État : **validé** — A · Composants génériques (retenu) (`A`), le 2026-10-23 10:31
- Actuel dans Gabarit : A · Composants génériques (retenu) (`A`)
- Options : A · Composants génériques (retenu) (`A`) · B · Exemples de Régie (`B`)

Le catalogue décrit des composants qui n’existent que dans une application de pilotage de Claude Code (hooks, onglet Session). COMPOSANTS.md.

## 21 · Message d’action (`p21`)

- État : **validé** — B · En bas à droite, s’efface après 4 s (retenu) (`B`), le 2026-10-23 10:31
- Actuel dans Gabarit : B · En bas à droite, s’efface après 4 s (retenu) (`B`)
- Options : A · En bas à gauche, reste (`A`) · B · En bas à droite, s’efface après 4 s (retenu) (`B`)

Résultat d’une action en arrière-plan (« Collé dans ov-farm »). La maquette ne le dessine pas. C § 2.7.

Échanges :

- **Claude**, 2026-10-23 10:47 :
  > Reporté (B) : message d'action en bas à droite du centre, aligné à droite ; il reste 4 s puis s'efface (fondu 0,2 s) ; un nouveau message remplace le précédent. G § 7.1, § 6, C § 2.7. Les 17 autres points validés sont reportés dans GABARIT.md et retirés du § 15, qui ne garde que 2, 12 et 14.

## 22 · Couleurs ANSI du terminal (`p22`)

- État : **validé** — A · Tirées des jetons (retenu) (`A`), le 2026-10-23 10:32
- Actuel dans Gabarit : A · Tirées des jetons (retenu) (`A`)
- Options : A · Tirées des jetons (retenu) (`A`) · B · Thème officiel de la palette (`B`)

dotlib ne définit pas de couleurs ANSI. G § 2.1.
