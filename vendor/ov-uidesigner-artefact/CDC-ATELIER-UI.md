# Atelier d'interface `@@@ui` — modèle et règles

Cahier des charges du mode `@@@ui` : dans une session Claude Code locale, Pierre tape `@@@ui` pour revoir l'interface d'une application avec Claude dans un **atelier interactif** publié en artifact. Ce document fixe le modèle de l'atelier et les règles que la session suit, du premier relevé au cahier des charges final.

Ce dépôt (`artefact-template-uidesigner`) porte le modèle : le **moteur** commun à tous les ateliers (`moteur/`), les **outils** (`outils/` : assemblage, registre, tests, audit), le **gabarit d'interface** (`gabarit-ui/`) et un **atelier d'exemple** (`exemple/`). Une application garde dans son propre dépôt une copie de ce modèle (`vendor/uidesigner/`) et n'écrit que ce qui lui est propre : cartes, vues, données d'exemple, rendu (§ 10). Premier atelier construit ainsi : Régie (dépôt `ov-regie-refactorUI`), qui sert de grand exemple.

---

## 1. Déclenchement et entrées

- `@@@ui` dans une session Claude Code ouverte dans le projet de l'application.
- La session rassemble avant de construire l'atelier :
  1. l'**inventaire des états graphiques** de l'application (un document du type `etats-graphiques.md` : chaque élément, sa fonction, son fichier source, ses états avec leurs couleurs et mesures) ; s'il n'existe pas, elle le rédige d'abord en lisant le code ;
  2. les **captures** que Pierre envoie ; chacune est enregistrée dans `sources/captures/NN-description.ext`, numérotée dans l'ordre d'envoi, et indexée dans `sources/captures/INDEX.md` avec le message de Pierre qui l'accompagnait ;
  3. le **gabarit d'interface** (`gabarit-ui/GABARIT.md`, `COMPOSANTS.md`, `jetons.json`) : l'atelier part de ses choix, il ne les rediscute que si l'application l'exige ;
  4. les règles générales de Pierre (thème dotlib, polices, langue : GABARIT § 2).
- Tant que Pierre envoie des captures en annonçant une suite (« ne fais rien, la suite arrive »), la session les enregistre et attend son signal.

## 2. Dépôt de travail

Un dépôt git dédié (par exemple `<app>-refactorUI`), qui contient au moins :

| Chemin | Contenu |
|---|---|
| `atelier/<app>.html` | L'atelier (une seule page, sans dépendance externe, ouvrable hors ligne), **assemblé** par `npm run construire` ; ne pas l'éditer à la main. |
| `atelier/source/` | Ce qui est propre à l'application : `<app>.js` (cartes, vues, points, rendu, gestes), `<app>.css` (aperçu), fragments HTML des contrôles au-dessus de l'aperçu, `tete.html` (polices). |
| `atelier.config.json` | Où sont le moteur, les sources, la page, la base exportée ; options des tests et de l'audit (§ 10.3). |
| `vendor/uidesigner/` | Copie du modèle (moteur, outils, gabarit, ce document) et `VERSION` (commit copié) ; mise à jour par `npm run maj-moteur`. |
| `atelier/donnees/fil/`, `atelier/donnees/valides/` | Export de la base de l'atelier (un JSON par document, l'identifiant est le nom du fichier). |
| `atelier/valides-fige.json` | Choix validés, générés. |
| `atelier/REFERENCE.md`, `references/` | Mode référence et images de référence (§ 9). |
| `cdc/decisions.md` | Journal des décisions, tenu au fil de l'eau. |
| `cdc/registre-des-choix.md` | Registre de chaque carte et de tous ses échanges, généré. |
| `cdc/<app>/` | Cahier des charges final. |
| `sources/` | Inventaire, captures, documents de Pierre. |
| `CONTEXTE.md`, `REPRISE.md`, `README.md` | Ce que Pierre a expliqué ; comment reprendre ; plan du dépôt. |
| `outils/` | Ce qui est propre à l'application : `references.js` (liste des états à capturer), `tests/test.js` (tests de ses interactions), `jetons.js` si le gabarit évolue, `maj-moteur.sh`. |
| `package.json` | `npm run construire`, `npm test`, `npm run audit`, `npm run registre`, `npm run references`, `npm run maj-moteur`. |

Commits signés de l'identité exigée par le dépôt, poussés à chaque étape significative.

## 3. Page de l'atelier

### 3.1 Disposition

- **En-tête** : titre, palette (menu des 11 palettes dotlib), thème clair ou sombre, préréglages « Tout comme aujourd'hui » et « Tout proposé ».
- **Cartes** (colonne de gauche ou liste) : une par axe de décision (§ 4).
- **Aperçu** : la fenêtre de l'application, dessinée en HTML aux couleurs des jetons, dans l'état choisi par les cartes.
  - Barre au-dessus : sélecteur de vues (une par écran ou état à montrer), bascule **Avant / Après** (touche A), options de simulation (filtre actif, colonne repliée, animations…), bouton **plein écran**.
  - Plein écran : l'aperçu seul, avec une barre discrète en haut (vues, Avant/Après, thème, palette, navigation des points ouverts, sortie) ; Échap pour sortir.
  - **Navigation des points ouverts** (plein écran) : « ‹ 3/26 · Titre de la carte › », et les touches [ et ] ; elle parcourt les cartes non validées, points à valider d'abord (§ 4.4), et pour chacune ouvre sa première vue et encadre l'élément (§ 4.5). Fond orange pâle pour la distinguer des autres contrôles.
  - L'aperçu est **interactif** : les éléments dont le comportement est en jeu réagissent comme dans l'application (clic, survol, raccourcis, replis, bulles).
- **Fil de discussion** : zone de hauteur fixe qui défile (jamais une page qui s'allonge), sous l'aperçu ou à côté ; champ de saisie avec ⌘↵ ; un message peut être rattaché à une carte (« Commenter ce point ») ; le brouillon est gardé dans le navigateur.

### 3.2 Base de l'atelier

L'artifact déclare la capacité `db`. Deux collections :

| Collection | Document | Champs |
|---|---|---|
| `fil` | un message | `at` (ISO 8601, heure réelle), `auteur` (`pierre` ou `claude`), `axe` (clé de carte ou absent), `texte`, `choix` (pour Pierre : l'état de toutes les cartes au moment du message), `reglage` (pour Claude : réglages proposés, appliqués d'un clic par « Appliquer ces réglages à l'aperçu »), `theme` |
| `valides` | une carte validée (identifiant = clé de la carte) | `choix` (valeur figée), `at` |

## 4. Cartes

### 4.1 Modèle

```
{ k: 'clé', t: 'Titre', why: 'Ce que montre la carte : l'état actuel, puis la proposition, en phrases courtes',
  o: [['valeur', 'Libellé'], …], now: 'valeur actuelle', prop: 'valeur proposée' }
```

- `WHERE[k]` : vues de l'aperçu où l'axe se voit (`vue` ou `vue:onglet`). Le bouton « → Vue » de la carte parcourt ces vues.
- Les options sont exclusives. La première est l'état actuel (« … (actuel) »).
- Une carte = **un choix tranché** : la proposition est une seule option, pas une liste à trier. Des éléments qui suivent la même règle sont regroupés dans une seule carte.

### 4.2 États d'une carte

| État | Condition | Rendu |
|---|---|---|
| nouveau | aucun message de Pierre sur l'axe | trait d'accent à gauche, « nouveau » |
| à revoir | Claude a répondu après le dernier message de Pierre | trait gris, « à revoir · réponse de Claude » |
| vu | Pierre a commenté après la dernière réponse | normal |
| validé | document dans `valides` | repliée (titre seul), descend en bas de la liste, « Rouvrir » |

Les états se calculent sur les heures `at` : une heure fausse (future) fausse les états. **Toujours l'heure réelle** (`date -u`).

### 4.3 Validation

- « Valider » fige la carte sur l'option affichée (`valides`, et une copie dans le navigateur). « Rouvrir » la libère.
- Une carte figée **impose sa valeur** à l'aperçu ; les préréglages et les réglages proposés dans le fil ne la changent pas.
- La session ne modifie jamais une valeur validée. Si une validation semble être une erreur de clic (par exemple « Comme aujourd'hui » sur une carte dont Pierre a approuvé la proposition), elle le signale dans le fil et à Pierre, et ne corrige que sur sa demande explicite.

### 4.4 Points à valider

- Ce que la session tranche seule pendant la rédaction (§ 7) devient des **cartes « Point à valider »** : même comportement que les autres cartes (Valider, Commenter ce point), options « Proposé » / « Aujourd’hui » (mêmes mots que les autres cartes : on choisit, puis on valide ; un désaccord passe par « Commenter ce point »), bouton « → Voir ».
- Aspect distinct : bordure en tirets orange, fond légèrement hachuré, mention « POINT À VALIDER » en tête, bouton « → Voir » orange. Elles se placent en tête de la liste.
- Modèle : `{ k: 'pvN', pv: N, t: 'Point N · Titre', why: 'La décision, en une ou deux phrases', o: [['oui','Proposé'], ['non','Aujourd’hui']], now: 'non', prop: 'oui' }`. Les préréglages ne les touchent pas. La carte s'ouvre sur « Proposé » (sinon un « Valider » trop rapide fige « Aujourd'hui »).
- Table `PTS` : pour chaque point, la vue, l'état à montrer, l'élément à encadrer et une indication courte. Si la maquette ne montre pas encore la situation, la session ajoute l'illustration (état d'exemple posé sur la vue), seulement quand le point est affiché.
- « → Voir » : ouvre la vue, encadre l'élément (§ 4.5) et fait défiler la colonne de l'aperçu jusqu'à l'élément s'il est hors champ. Pas de bandeau au-dessus de l'aperçu : la carte dit déjà de quoi il s'agit.
- **Les options de la carte pilotent l'illustration, un seul état** : « Proposé » montre la décision ; « Aujourd’hui » montre la même UI refaite, où seul l'élément du point reprend son état d'aujourd'hui. Cliquer une option ouvre le point dans cet état ; la touche A bascule l'option tant que la carte n'est pas validée. La colonne garde son défilement d'une option à l'autre. Un point de comportement (raccourci, délai, action d'un menu) n'a rien de visible à basculer. L'Avant / Après général (toutes les cartes à leur état actuel) est un autre réglage : le choisir quitte le point ouvert.
- Point validé : replié comme une carte validée (filet simple, sans hachures ni mention « POINT À VALIDER »), en bas de la liste.
- Point clos : quand Pierre juge un point insuffisant pour décider, la session le remplace par une ou plusieurs cartes ordinaires ; le point reste replié avec « clos · remplacé par « carte » » (`clos` dans le modèle) et sort de la navigation des points ouverts.
- Lien direct : `<atelier>#point=N` ouvre l'atelier sur le point N. Le fichier des points à valider du dépôt donne ce lien pour chaque point.

### 4.6 Contrat de l'état et des cartes (règles fermées)

Ce qui n'est pas dans ce contrat n'est pas permis. `npm test` en vérifie la partie statique, `npm run audit` la partie dynamique ; un échec bloque la publication.

1. **Un seul état par réglage.** Une option, une case ou un mode a **une** clé dans l'état de la page. Toute commande qui le montre ou le change lit et écrit cette clé ; aucune copie locale, aucune deuxième commande qui pilote la même chose par un autre chemin (c'est ce qui a cassé « Proposé / Aujourd'hui » des points).
2. **Une carte est lue en clair.** Le rendu lit `c.<clé>` (jamais par une table de noms construite à part) ; une carte jamais lue est une erreur de test.
3. **Une carte déclare sa vue.** `WHERE[<clé>]` existe ; sa première vue montre l'effet ; ses vues existent dans `VUES` (et les onglets de fiche dans la liste des onglets). Une carte rangée dans un onglet (Sélecteurs, Panneaux, Redémarrage…) déclare aussi cet onglet (`ONGLET`).
4. **Chaque option change l'aperçu**, dans la vue de la carte (audit). Un effet qui ne se voit qu'en interaction a un **état de démonstration** que le choix pose (renommage en cours, bulle ouverte, menu ouvert).
5. **Options propres** : `now` et `prop` font partie des options ; pas d'option en double ; deux cartes n'ont jamais la même clé.
6. **Points à valider** : une entrée `PTS` par carte et inversement ; un point déclaré visuel (`PTAV`) a son Avant ; ses options pilotent l'illustration ; aucun autre contrôle.
7. **Commandes hors cartes** (cases au-dessus de l'aperçu, sous-navigation, touches) : chacune a sa clé d'état (règle 1) et l'audit l'actionne ; une commande nouvelle s'ajoute à la liste d'actions de l'audit dans le même changement.
8. **Rien d'aléatoire** : un clic ne remet jamais en douce une autre commande à zéro ; si une action change un autre réglage (ouvrir un point remet l'Avant / Après général sur « Après »), l'interface le montre aussitôt (boutons à jour).
9. **Porte de publication** : `npm test`, puis `npm run audit` sur deux graines ; tout passe, ou rien n'est publié.

### 4.5 Encadré de l'élément

- Toute carte connaît l'élément de l'aperçu qu'elle concerne (`HL[clé]` : un sélecteur, éventuellement filtré par un texte ; vide = toute la fenêtre).
- « → Vue » d'une carte, « → Voir » d'un point et la navigation du plein écran encadrent cet élément : contour en tirets d'accent de 2 px qui **clignote trois fois puis s'efface** (2,4 s). Animations coupées : contour fixe.
- La carte garde sa navigation entre les vues où l'élément apparaît (« → Vue » passe à la suivante, avec « 2/3 »).

## 5. Boucle de travail

À chaque « update » de Pierre (ou à son retour) :

1. **Lire** : `ArtifactData query` sur `fil`, `auteur == pierre`, `at >` dernier message lu ; et `valides` modifiées depuis.
2. **Comprendre chaque remarque**, y compris les captures envoyées dans la conversation (enregistrées et indexées, § 1).
3. **Modifier l'atelier** dans `atelier/source/` (jamais la page assemblée), puis `npm run construire` : options, aperçu, interactions. Une proposition ne contient pas de phrase d'explication dans l'interface montrée (GABARIT § 1, principe 6) ; la carte et le fil expliquent, l'aperçu montre.
4. **Tester** : `npm test` (§ 8), puis contrôle visuel des vues touchées (navigateur sans écran, captures d'écran lues).
5. **Répondre dans le fil**, une réponse par axe, avec `reglage` si un clic doit appliquer la proposition ; heure réelle.
6. **Exporter** la base dans `atelier/donnees/`, lancer `npm run registre` (registre, choix figés, copie `VALIDES_FIGES` dans la source, réassemblage de la page).
7. **Journal** : inscrire dans `cdc/decisions.md` les décisions prises et ce qui reste ouvert.
8. **Publier** l'atelier (même artifact, même lien), **committer, pousser**.
9. **Répondre à Pierre** dans la conversation : ce qu'il doit regarder, en peu de mots.

Règles de conduite :

- Un choix tranché par axe ; regrouper ce qui suit la même règle.
- Questions à Pierre seulement si la réponse change le travail ; sinon trancher et le dire.
- Ne pas prendre une suggestion pour une exigence littérale, ni une remarque pour une validation.
- Ce qui n'a pas été revu dans l'atelier n'est pas validé : s'il faut le décider pour rédiger, le lister dans un fichier « points à valider ».
- Pierre peut s'absenter : la session continue sur ce qui est décidé, sans valider à sa place.

## 6. Comportements de l'aperçu à reproduire

- Toutes les vues dans les 11 palettes, en clair et en sombre.
- Avant / Après : « Avant » montre l'état actuel de toutes les cartes.
- Infobulles, bulles de détail, copie au clic, sélection de texte, renommage, replis animés : comme le gabarit les définit, si l'application les a.
- Données d'exemple tirées des captures (noms réels, situations réelles), pour que Pierre reconnaisse son application.

## 7. Fin de la phase atelier

Quand toutes les cartes sont validées :

1. Les vues encore non revues (écrans de l'inventaire jamais montrés) sont listées ; Pierre décide de les revoir maintenant ou dans un addendum.
2. La session rédige le **cahier des charges** de l'application (`cdc/<app>/`) :
   - linéaire, sans historique de décision ni connaissance préalable autre que les documents du dépôt et les choix de Pierre ;
   - titres de section aux noms d'éléments de l'inventaire ;
   - pour chaque élément : l'état cible, ce qui est à retirer, les captures d'origine (« capture NN ») et les images de référence ;
   - table de correspondance des termes du gabarit vers ceux de l'application, en tête ;
   - réglages ajoutés, modifiés et retirés en JSON ;
   - procédure de réception (§ 9) ;
   - points tranchés pendant la rédaction dans un fichier séparé, à valider, avec un lien `#point=N` par point ; ces points deviennent des cartes « Point à valider » dans l'atelier (§ 4.4).
3. Si l'atelier a fait évoluer des choix génériques, mettre à jour le gabarit (`gabarit-ui/`) et le dire à Pierre.

## 8. Tests de l'atelier

`npm test` (jsdom) lance `vendor/uidesigner/outils/tester.js` (tests génériques ci-dessous), puis les tests propres à l'application ; il vérifie au minimum :

- la page publiée est l'assemblage exact des sources ;
- le contrat des cartes (§ 4.6) ;
- chaque vue s'affiche sans erreur, dans toutes les palettes et les deux apparences ;
- chaque carte validée est figée sur sa valeur, y compris après les préréglages ;
- la copie embarquée des choix validés correspond à `valides-fige.json` ;
- les interactions de l'aperçu (un test par comportement ajouté) ;
- chaque point à valider ouvre sa vue et trouve son élément à encadrer.

Un test est ajouté à chaque nouvelle interaction de l'aperçu.

### 8.1 Audit dans un navigateur

`npm run audit` (Playwright et Chromium, `vendor/uidesigner/outils/audit.js`) rouvre toutes les cartes sur l'appareil, puis :

- **options sans effet** : pour chaque carte, chaque option doit changer l'aperçu (contenu, classes ou styles de la fenêtre) dans la vue de la carte. Une option sans effet est un bug : rendu jamais écrit, mauvaise première vue dans `WHERE`, ou état qui ne se voit qu'en interaction (alors, choisir l'option montre cet état : renommage en cours, bulle ouverte…). Les points sans élément visible sont exclus ;
- **actions au hasard** (graine fixe, 600 par défaut) : options, « → Vue », vues, sous-navigation, Avant / Après général, touches A et Échap, thème, palette, clics dans l'aperçu ; après chacune : aucune erreur JavaScript ; une option marquée par carte ouverte, un bouton marqué par groupe ; aucune carte figée sans « validé » ; ni « undefined », ni « NaN », ni « [object Object] » affichés ; sous-navigation présente seulement dans les vues qui en ont ; point ouvert seulement s'il a sa carte.

L'audit passe avant chaque publication de l'atelier, et sur deux graines au moins avant de le déclarer terminé.
- **Un seul état par réglage** : une option, une bascule ou un mode n'a qu'une source dans l'état de la page ; deux commandes qui montrent la même chose lisent et écrivent le même état (sinon l'une paraît cassée).

## 9. Maquette de référence

Une fois validé, l'atelier devient la maquette de référence de l'implémentation :

- **mode référence** : `atelier/<app>.html#ref&vue=…&theme=…&palette=…` (et paramètres d'état) n'affiche que la fenêtre de l'application, à taille fixe, dans l'état validé, sans la base ni le stockage du navigateur ;
- **images de référence** : `npm run references` produit une image par état (1280 × 800, clair et sombre, plus quelques palettes) et leur index ;
- `atelier/REFERENCE.md` explique à la session qui implémente comment s'en servir : capturer l'application dans le même état, comparer côte à côte (structure, jetons, typographie, états, textes), soumettre tout écart à Pierre.

## 10. Moteur et dépôt du modèle

### 10.1 Ce que porte le moteur

`moteur/atelier.js` tient tout ce qui ne dépend pas de l'application : l'état de la page, les cartes (création, options, Valider, Rouvrir, « Commenter ce point », « → Vue »), les points à valider (ouverture, encadré, touche A, `#point=N`), l'encadré des cartes, l'Avant / Après général, le thème, le sélecteur de vues, le plein écran et la navigation des points ouverts, le fil de discussion et les validations (base de l'artifact), le mode référence. `moteur/atelier.css` habille la page ; `moteur/squelette.html` en donne la structure (identifiants fixes : `controls`, `stage`, `subnav`, `ba-seg`, `theme-seg`, `v-seg`, `scroller`, `win`, `legend`, fil…).

L'application écrit :

```js
(function(){
const AXES=[ …cartes… \n];                       // forme imposée (les outils la lisent)
const A=Atelier.creer({ cle:'<app>-atelier-v1', cartes:AXES, themes:[['clair','Clair'],['sombre','Sombre']], etat:{…} });
const st=A.st;                                     // état partagé : st.c (choix), st.v2 (vue), st.view (avant/apres), st.theme, st.pt…
const VUES=[…]; const WHERE={…}; const HL={…}; const PTS=[…]]; const PTAV=new Set([…]);
const VALIDES_FIGES=/*valides*/{}/*fin*/;           // rempli par npm run registre
function dessiner(){ …écrit #win à partir de st et de c.<clé>… }
function render(){ A.render(); }                   // à appeler après un geste dans l'aperçu
A.lancer({ vues:VUES, vuesCarte:WHERE, encadrer:HL, points:PTS, pointsAvant:PTAV, valides:VALIDES_FIGES, rendu:dessiner, … });
})();
```

### 10.2 Accroches de `lancer`

| Clé | Rôle |
|---|---|
| `vues`, `vuesCarte`, `encadrer`, `points`, `pointsAvant`, `valides`, `rendu` | données et rendu (obligatoires, sauf points) |
| `vueDefaut` | vue d'ouverture (par défaut la première) |
| `onglets`, `vuesAOnglets`, `ongletsDefaut`, `nomsOnglets` | cartes rangées dans un onglet d'une vue (`{ clé: [clé d'état, valeur] }`) |
| `vueCourante()`, `allerVue(id)`, `nomsVues` | vues composées « vue:onglet » (par exemple une fiche et ses onglets) |
| `surCarte(k)` | état de démonstration posé quand on choisit une option (règle 4 du contrat) |
| `surVoir(k)`, `surChoixVue(v)` | gestes au passage d'une vue à l'autre |
| `surPoint(n, o, avant)`, `apresPoint(n, o, avant)`, `surMarquage(n, win)` | ouverture d'un point : avant, après, au moment d'encadrer |
| `touche(e, saisie, pleinEcran)` | touches propres à l'application ; rendre `true` si la touche est prise |
| `ref(p)` | paramètres du mode référence propres à l'application |
| `liste`, `listePreservee`, `zoneDefaut` | liste qui défile pour amener l'élément encadré ; liste dont le défilement est gardé d'une option à l'autre ; zone encadrée à défaut |

Une entrée de `PTS` : `[n, titre, vue, options, sélecteur à encadrer, indication]`, où options vaut `{ set: {…état…}, setAvant: {…}, avant: 'vue de l’Avant' }`.

### 10.3 `atelier.config.json`

```json
{ "application": "<App>", "page": "atelier/<app>.html", "moteur": "vendor/uidesigner/moteur",
  "source": { "titre": "…", "intro": "…", "nomVues": "Vue de <App>", "tete": "…", "css": ["…"], "js": ["…"],
              "outilsTheme": "…", "outils": "…", "outilsFsTheme": "…" },
  "donnees": "atelier/donnees", "registre": "cdc/registre-des-choix.md", "fige": "atelier/valides-fige.json",
  "tests": { "ongletsVue": { "<vue>": ["<onglet>", …] }, "listes": ["#palette"] },
  "audit": { "vuesSousNav": ["…"], "sousNav": "#subnav [data-…]", "listes": ["#palette"] } }
```

### 10.4 Faire évoluer le modèle

- Une amélioration générique (moteur, outils, gabarit, ce document) se fait **ici**, avec l'atelier d'exemple à jour et `npm test` et `npm run audit` verts ; chaque application la reprend par `npm run maj-moteur` (copie et `VERSION`), puis repasse ses tests et son audit.
- Une application ne modifie jamais sa copie `vendor/uidesigner/` : un besoin nouveau devient une accroche du moteur.
- Nouvel atelier : copier `exemple/` dans le dépôt de l'application (`atelier/source/`, `atelier.config.json`), copier le modèle dans `vendor/uidesigner/`, puis remplacer les cartes, les vues et le rendu.

