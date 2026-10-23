# Catalogue des composants

Complète `GABARIT.md` (à lire d'abord ; noté « G § n »). Pour chaque composant : son rôle quand il n'est pas évident, où le voir dans la maquette de référence (`atelier/regie-lisibilite.html`, sélecteur de vues au-dessus de l'aperçu, préréglage « Tout proposé » ; « point n » = point à valider n, choisi au-dessus de l'aperçu), anatomie, mesures, états, comportement. Les exemples tirés de Régie sont notés « (Régie : …) ».

Conventions, valables pour tout le catalogue (valeurs conseillées là où la maquette de Régie en emploie plusieurs, G § 14) :

- Jetons de couleur : G § 3.1. Opacités, teintes et blanc posé sur une couleur : G § 3.5. Ombres et voiles : G § 3.7. Jeton `teinte` : la couleur de la marque à 14 % en clair, 18 % en sombre, seule teinte de fond sous un texte coloré ; jeton `voile` : noir à 32 % en clair, 50 % en sombre.
- Quatre ombres, chacune suivie du filet `0 0 0 1px separateur` (sauf la fiche) : **flottant** `0 10px 30px rgba(0,0,0,.28)` ; **mini** `0 6px 18px rgba(0,0,0,.25)` ; **modale** `0 18px 50px rgba(0,0,0,.35)` ; **fiche** `-12px 0 32px rgba(0,0,0,.22)`. Relief d'un contrôle actif : `0 1px 2px rgba(0,0,0,.15)` ; bouton d'interrupteur : `0 1px 2px rgba(0,0,0,.25)`.
- `voile` sous une fenêtre modale, sur toute la fenêtre, barre de titre comprise.
- Rayons : 9 pour une bulle ou un menu (7 pour le mini-menu de sélection) ; 10 pour un panneau non modal ; 12 pour une fenêtre modale.
- Graisse appuyée : 600, jamais 700. Titres : 16 px (fiche, panneau, fenêtre modale), 14 px (vue, bulle, carte d'état). Petites capitales : majuscules, espacement 0,05 em. Interligne des textes : 1,45 (terminal : 1,6).
- Désactivé : opacité 0,45 de tout le contrôle ; la raison est dans sa bulle.
- Points : 8 px pour un état, 6 px pour un indicateur posé sur une icône. Jamais de point pour un groupe : un groupe se marque par un trait de 2 × 12 px, rayon 1 (2 × 16 px en tête de fiche ou de vue d'entité).
- Survol d'une ligne : fond `champ`, rayon 6 pour une ligne de 26 px, 5 pour une ligne plus basse, 4 pour une case.
- Barres : 6 px pour une mesure, 4 px pour une micro-jauge ou un curseur, 2 px pour le temps.
- Champ : 28 px, rayon 7 ; fond `champ` pour filtrer ou chercher, fond `base` et filet `separateur` pour saisir (§ 7.9).
- Corps d'un panneau, d'une carte ou d'une fenêtre modale : 12 px.

Sommaire :

1. Colonne : titre de zone et sous-zone, segments, filtre et jeton, en-tête de groupe, ligne de sous-groupe, ligne d'élément, pastille d'état, marques, micro-jauge, en-tête d'entité, rail, poignée
2. Fenêtre : barre d'outils, onglets du centre, bandeau de type, statusline, bandeau d'alerte, état vide, message d'action, carte d'état de la surface
3. Flottants : infobulle, bulle de détail, bulle « Copié », mini-menu de sélection, menu déroulant, bulle de journal, bulle de confirmation, bulle de barre d'outils, bulle de tâches, menu ⋯ et « Ouvrir avec… »
4. Fiche : en-tête, onglets, sections, règles, faits clés, clauses, liens par famille, hooks, listes de cibles, choix de paire, interrupteurs, dépliants, onglet Session, état d'installation, propriétés en lignes légères, états d'une section
5. Mesures : tuile, barre d'utilisation et de temps, bande de répartition, barre de budget, tableau dense, section repliée, anneau de sonde, capsule d'attribut, synthèse « En clair », graphiques
6. Carte : en-tête, boîte, liens, étiquettes de coût
7. Divers : étapes, réglages, renommage, barre des menus, fenêtre qui descend du bord, feuille de diagnostic, liste à cocher, boutons, contrôles de formulaire
8. Panneaux : sélecteur flou, sélecteur liste et aperçu, bande de médias, demande en attente, fenêtre modale et voile, formulaire, alerte à étapes, fenêtre de composition, journal d'objets, liste des raccourcis, panneau de procédure lourde
9. Vue d'entité : en-tête, onglets, tableau de bord, états

---

## 1. Colonne

Fond `mantle`, filet droit 1 px `separateur`. Liste : marge 2 × 8 × 8 px, barre de défilement masquée.

### 1.1 Titre de zone

Vue : Sessions.

- Hauteur 26 px, marge 0 12 px, écart 8 px. Titre en petites capitales, 11 px, 600, espacement 0,05 em.
- Zone active (celle qui a le focus) : titre en `texte` ; inactive : `secondaire`. Pas de fond, pas de filet.
- Un clic sur le titre replie ou déplie la zone ; chevron en `secondaire` devant le titre (› repliée, ⌄ dépliée).
- Résumé à droite (`margin-left: auto`), 11 px, 400, `secondaire`, sans capitales (Régie : « 3 royaumes », « 34 vivantes », « 1 chantier allumé »).

**Sous-zone** (Régie : « Locales 27 », « Distantes 2 », « En attente »)

- Sous-titre 11 px `secondaire`, marge 6 × 4 × 2 px, compte à droite ; chevron ; repliable. Dans la vue « À traiter », 6 px au-dessus de chaque sous-zone.

### 1.2 Segments

Vue : Sessions (À traiter · Actives · Toutes), fiche Session (Automatique · Fixe), Moniteur (Rapide · Normal · Lent), Nouvelle session, Réglages.

- Conteneur : fond `champ`, rayon 7, marge intérieure 2 px, écart 2 px ; dans la colonne, marge 6 × 12 px.
- Segment : 11,5 px, `secondaire`, rayon 5, marge 2 × 9 px ; dans la colonne, largeur égale et marge 2 × 0.
- Segment actif : fond `segmentActif` (`base` en clair, `separateur` en sombre), texte 600 `texte`, relief `0 1px 2px rgba(0,0,0,.15)`.
- Mêmes mesures partout (colonne, fiche, fenêtres modales, réglages) : pas de segments plus grands dans une fenêtre.
- Un segment peut porter un compteur à la suite, même style (« À traiter 5 »).

### 1.3 Champ de filtre et jeton

Vue : Sessions (cocher « Simuler un filtre »).

- Champ : hauteur 28 px, rayon 7, fond `champ`, bordure 1 px transparente, marge 8 × 10 × 4 px, marge intérieure 0 × 8 px, écart 6 px ; icône ⌕ et texte indicatif « Filtrer ( / ) » en `secondaire`, 12 px.
- Accès : `/` ou ⌘F y place le curseur ; Échap vide le filtre et rend le focus.
- Filtre actif : la bordure du champ passe en `accent`, et le filtre devient un jeton dans le champ : fond `accent`, texte `surAccent` 600, rayon 6, marge 1 × 6 × 1 × 8 px, écart 6 px. Contenu : le texte filtré · le compte `N/M` (trouvés sur total) · ✕ qui l'enlève. La bulle du jeton dit le compte en mots (« 27 sur 34 »).
- Rien d'autre ne change dans la colonne (pas de teinte, pas de bandeau) ; les zones et sections repliées se déplient pendant le filtre.

### 1.4 En-tête de groupe

Vue : Sessions, Carte (zone Projets), Réglages › Royaumes.

- Ligne : trait de groupe (2 × 12 px, rayon 1, couleur du groupe) · écart 7 px · nom du groupe en 11 px 600 `secondaire`. Marge intérieure 2 × 4 × 2 px.
- Marge : 10 px au-dessus, 4 px au-dessous. Pas de boîte, pas de fond, pas de pointillés entre sous-groupes.
- Zone qui liste les groupes eux-mêmes (Régie : zone Projets de la vue Carte) : chevron devant, nom en 600 `texte`, nombre de sous-groupes à droite en `secondaire`. Le groupe montré au centre prend la sélection (fond `selection` + trait d'accent de 2 px). Ses sous-groupes suivent la grammaire de § 1.5 ; aucun ne porte de marque colorée quand il est actif (icône d'activité seulement).

### 1.5 Ligne de sous-groupe

Vue : Sessions (ligne de projet « overview 6/16 »).

- Hauteur 20 px, retrait 22 px, marge haute 2 px, écart 6 px, 11 px `secondaire`.
- Nom à gauche (tronqué par …), compteur `N/M` (N en 600 `texte`, chiffres tabulaires).
- Sous-groupes imbriqués : retrait et coude d'arborescence en `secondaire`.
- Icône d'activité devant le nom (dans une zone qui liste les sous-groupes) : `texte` si au moins un élément vit, `secondaire` à 50 % sinon.
- Actions au survol, à droite, 16 px de large chacune, glyphe 12 px `secondaire`, fondu 0,12 s : ⌖ (voir sur la carte), + (nouvel élément). 🔒 au survol pour un sous-groupe que l'application ne pilote pas, la raison en bulle. Le survol donne un fond `champ`, rayon 5.
- Clic droit : menu des actions rares (§ 3.10).

### 1.6 Ligne d'élément

Vue : Sessions ; points 6, 7, 13, 29.

- Hauteur 26 px, rayon 6, marge 0 6 px 0 4 px, 13 px.
- Ordre des emplacements : pastille (16 px) · mode (12 px, glyphe 9 px) · nom (marge 4 px, tronqué) · marques · espace · métadonnée à droite (11 px, `secondaire`, chiffres tabulaires, 38 px au moins, marge gauche 8 px, alignée à droite).
- Mode : seulement les exceptions, jamais dans les onglets. Glyphe en teinte froide pour un mode sûr, en `rouge` pour le mode qui retire une protection, « ? » en `secondaire` pour un mode inconnu (Régie : ⏸ plan en `teal`, ✎ édition en `lavender`, ⛨ sans permission en `rouge` ; rien pour le mode habituel).
- Métadonnée : micro-jauge + valeur (CPU), ou état écrit (« vivant », « éteint », « il y a 4 j »).
- États :
  - repos : rien ;
  - survol : fond `champ` ;
  - sélection : fond `selection` + trait d'accent 2 px à gauche (`inset 2px 0 0 accent`) ;
  - sélection estompée (l'élément reste choisi, le centre montre autre chose) : `selection` à moitié, sans trait ;
  - éteint : nom en `secondaire` ;
  - terminé : nom en `secondaire`, date relative à droite ; seconde ligne de description en `secondaire`, en italique si l'application l'a déduite ;
  - nouveau : halo, fond `selection` qui pulse de 15 à 100 %, 0,7 s par aller, pendant 20 s ou jusqu'au premier clic ; sans contour ni lueur ; figé par « Réduire les animations » ;
  - en attente de saisie (demande en attente, § 8.4) : trait de 2 px de la nuance de la demande (`cyan`) à gauche (`inset 2px 0 0`), 🔒 après le nom, marge 6 px ; la ligne dont le panneau a le clavier prend en plus la sélection. Pas de halo, pas de liseré ;
  - distant : marque d'élément distant (§ 1.8) ; dans la ligne, le trait pointillé est vertical, sur le bord gauche, sur toute la hauteur ; quand la ligne est sélectionnée, le trait d'accent plein le remplace (« ⇄ » reste) ;
  - sur une machine injoignable : état écrit « injoignable » en `secondaire` ;
  - hors de son conteneur (Régie : hors tmux) : mention en `accent` dans la ligne, bouton « Rapatrier » (⇥ `accent`) au survol ;
  - très chargé (au-dessus de 50 % CPU) : la ligne vibre de ±0,6 px, 0,18 s, par pas (`steps(2)`) (G § 6).
- Ligne enfant (instance rattachée à un élément parent ; Régie : rôle d'un projet délégué) : décalée de 14 px sous le parent, dont la ligne porte « délégué » en `secondaire` à droite ; même anatomie que la ligne d'élément ; préfixe du parent en `secondaire` devant le nom (« parent. ») ; ⚠ `orange` si l'instance porte une alerte, le texte en bulle ; état écrit à droite.
- La ligne entière est cliquable ; clic lent sur le nom de la ligne sélectionnée : renommer (§ 7.3).

### 1.7 Pastille d'état

Vue : Sessions, Forge, onglets du centre.

- Point de 8 px, rayon 4. Anneau de 10 px, trait 2 px, couleur du halo, décalé de −1 px, qui grandit de ×1 à ×2 et passe d'une opacité de 0,9 à 0, `ease-out`, en boucle.
- États (couleurs : `jetons.json`, clé `pastilles`) :

| État | Couleur | Halo | Cycle | Forme |
|---|---|---|---|---|
| Fin de tour récente | `vert` | `vert` | 2,2 s | point |
| Fin de tour ancienne | `vert` | aucun | fixe | point, opacité qui baisse par paliers avec l'âge |
| Question | `jaune` | `orange` | 1,1 s | point |
| Autorisation demandée | `orange` | `orange` | 1,1 s | **losange** (carré tourné de 45°, rayon 1,5 px, échelle 0,9 ; anneau rayon 2) |
| Erreur (API perdue) | `rouge` | `orange` | 0,55 s | point |
| Au travail | aucune | aucun | fixe | emplacement vide |

- Âge de la fin de tour (réglages de la colonne) : anneau pendant 1 h ; point plein pendant 2 j ; puis trois paliers d'opacité, 80 %, 60 % et 40 %, de 2 j chacun.
- Le nom de la ligne ne pulse pas : seul l'anneau bouge. « Réduire les animations » coupe l'anneau et garde le point.
- Infobulle « fiche » (G § 9.3) : bulle ordinaire (§ 3.1 : rayon 9, 280 px au plus, marge 6 × 10 px, interligne 1,45, ombre flottant). Contenu : pastille et titre en 600, écart 7 px (« Demande une autorisation ») ; l'élément et la raison en `secondaire`, 2 px au-dessous (« ov-farm · Bash : `rm -rf build/` ») ; ancienneté en 10,5 px `secondaire`, 4 px au-dessous (« depuis 3 min ») ; puis l'action possible.

### 1.8 Marques

Vue : Sessions ; points 12, 13 ; Distante.

Un attribut d'élément a une seule marque, la même partout où l'élément apparaît (colonne, onglets, en-tête de la surface, fiche, carte, tableaux, sélecteurs, panneaux). La règle qui va avec l'attribut est écrite dans la bulle de la marque, nulle part ailleurs.

- Élément maître : glyphe ◎ en `accent`, 12 px, marge 6 px. Pas de pastille ni de capsule.
- Élément maître en anomalie (il ne porte plus le nom sous lequel il a été désigné) : ◎ en `orange` qui pulse (opacité 1 → 0,25, 1,1 s par aller, `ease-in-out` ; fixe si les animations sont coupées), suivi de ⚠ `orange`, 11 px, marge 4 px. La bulle dit sous quel nom il a été désigné et quoi faire.
- Doublon (deux éléments du même nom) : « ⚠ ×2 » en `orange`, 10,5 px, 600, marge 6 px. Pas de rayures.
- Version en retard : « ⬆ » en `orange`, 11 px, marge 5 px, sans numéro ; les versions sont dans la bulle. Sur l'élément maître, « ⬆ » en `rouge` (une marque qui touche l'élément maître monte d'un palier).
- Élément distant (il tourne sur une autre machine) : son trait de 2 px devient **pointillé** (3 px plein, 3 px vide) en `teal`, et « ⇄ » suit le nom en exposant, `teal`, 10 px, 600, marge 2 px. Bulle du ⇄ : « Distant, sur <machine> · <ce que l'application s'interdit> ». Pas de bandeau, pas de phrase ailleurs.
- 🔒 après le nom : l'élément attend une saisie (avec le trait de la nuance de la demande, § 1.6), ou n'est pas piloté par l'application (au survol de son sous-groupe, raison en bulle).
- Statut de projet (prod, dev, prototype) : aucune marque.

### 1.9 Micro-jauge

Vue : Sessions (CPU), Moniteur (CPU), Forge (rôles).

- 26 × 4 px, rayon 2, fond `champ`, marge droite 5 px ; remplissage proportionnel à la valeur : `secondaire` sous 50 %, `jaune` de 50 à 70 %, `orange` de 70 à 90 %, `rouge` au-delà.
- Dans un tableau dense (§ 5.5) et une vue d'entité (§ 9), le remplissage reste `secondaire` : la valeur hors norme se lit au chiffre.
- Suivie de la valeur en 11 px (« 0,1 % »). Ne colore jamais le fond de la ligne.

### 1.10 En-tête d'entité (entité, machine distante)

Vue : Sessions (zone Forge, sous-zone Distantes), Forge.

- Même grammaire que l'en-tête de groupe : hauteur 24 px, retrait 4 px, écart 8 px ; trait de 2 × 12 px (ou icône d'ordinateur pour une machine : 13 × 11 px, trait 1,2 px, `secondaire`, `rouge` si la machine est en refus) · nom exact en 12 px 600 · `N/M` · espace · **état écrit** à droite en 11 px `secondaire`.
- Nom en `texte` si l'entité est active ou joignable, en `secondaire` si elle est éteinte.
- États écrits : « allumé » précédé d'un point `vert` de 8 px, « éteint », « extinction dans 11 s » en `orange`, « attend le repos (…) » en `orange`, « joignable », « jeton révoqué » ou autre refus en `rouge`.
- Entité en refus : seuls son état écrit et son icône (ou son trait) prennent la couleur ; jamais de contour autour de ses lignes.
- Action (⏻ éteindre, ⊗ annuler l'extinction, ⟳ actualiser, ⚿ réparer) au survol seulement, séparée du compteur, à droite de l'état.

### 1.11 Rail

Vue : Sessions (icône de colonne ◧ ou « Replier la colonne »).

- 48 px, fond `mantle`, filet droit `separateur`, éléments centrés, écart 12 px, marge 10 px en haut et en bas.
- De haut en bas : ⌕ (filtre) ; un filet de 22 px, 1 px `separateur` ; les éléments à traiter : icône 30 × 24 px, rayon 6, avec leur pastille au centre et le trait de leur groupe couché (12 × 2 px, rayon 1) au bas de l'icône ; un filet ; une icône par zone avec son compte (éléments vivants, entités allumées) ; en bas, « + » (nouvel élément).
- Compteur : 9 px `secondaire`, en bas à droite de l'icône, décalé de 2 px à droite et 4 px vers le bas.
- Infobulle sur chaque élément (nom et état).
- Repli et dépli animés : la largeur passe de 290 à 48 px (ou l'inverse) en 0,22 s.

### 1.12 Poignée

- 5 px de large, curseur de redimensionnement, posée à cheval sur le filet (marge gauche −3 px) ; au milieu un trait de 1 × 28 px `secondaire` à 50 %.
- Entre deux zones empilées : poignée couchée, trait de 28 × 1 px `secondaire` à 50 %, curseur ↕.

---

## 2. Fenêtre

### 2.1 Barre d'outils

Vue : Sessions, Moniteur, Forge ; points 5, 19, 20.

- Barre de titre de 38 px, fond `crust`, filet bas `separateur`, 12 px `secondaire`, marge 0 × 12 px, écart 10 px. Ombre de la fenêtre : celle du système.
- Feux de macOS : natifs, couleurs du système hors jetons (dans la maquette : 11 × 11 px, écart 7 px, 6 px avant la première capsule).
- Puis capsules : colonne (◧) · vues (Terminal, Carte, Moniteur ; l'active en surbrillance) · espace · alertes et services · mesure · outils (recherche, ⓘ).
- Capsule : fond `champ`, rayon 9, marge 2 × 4 px, écart 2 px, marge gauche 6 px.
- Icône : 26 × 22 px, rayon 6, glyphe de 15 px dessiné au trait de 1,4 px, bouts et jointures ronds, `secondaire` ; active : fond `base`, `texte`, relief `0 1px 2px rgba(0,0,0,.15)`. Infobulle : nom et raccourci (« Replier la colonne (⌘0) »).
- Badge : 13 × 13 px au moins, rayon 7, 9 px 600, interligne 13 px, marge 0 × 3 px, décalé de 2 px vers le haut et la droite ; texte blanc (G § 3.5). Fond `accent` pour un simple compte d'activité (tâches en cours) ; `orange` ou `rouge` pour un problème, le plus grave l'emporte. Ne clignote jamais.
- Point : 6 px, rayon 3, à 2 px du bas et 3 px de la droite de l'icône ; `orange` sans nombre pour un problème mineur. Une icône d'alerte qui n'a rien à signaler disparaît de la barre.
- Icône de service : une icône qui dit ce que fait le service, sans son nom écrit ; point de 6 px : `secondaire` arrêté ou en démarrage, `vert` en service, `orange` en service avec une erreur, `rouge` en panne. Infobulle « <service> · <état> » puis le détail. Un clic ouvre la page du service dans les réglages.
- Mesure (quota) : anneau de 15 px (cercle de rayon 6, trait 2 px, piste `separateur`, arc de la valeur à bout rond) suivi de la valeur en 11,5 px, 600, chiffres tabulaires. Normal : arc `secondaire`, valeur `texte`. Puis arc et valeur en `jaune`, `orange`, `rouge` selon les paliers. Relevé ancien : `secondaire`, « (ancien) » en bulle ; aucun relevé : anneau vide, « inconnu » en bulle (G § 3.6). Un clic ouvre la bulle de la mesure (§ 3.8).
- Sans barre de titre (fenêtre qui descend du bord, § 7.5) : mêmes capsules sur une rangée de 30 px, transparente, marge 0 × 8 px.

### 2.2 Onglets du centre

Vue : Sessions.

- Barre de 34 px, fond `crust`, onglets alignés en bas, écart 2 px, marge 0 8 px.
- Onglet : 28 px, rayon 8 8 0 0, marge 0 12 px, 12 px, écart 6 px. Pastille d'état + nom (et les marques d'attribut, § 1.8). Inactif : fond `crust`, `secondaire`. Actif : fond `base`, `texte`, 600.
- Élément terminé : nom en italique `secondaire`.
- Trop d'onglets : la barre défile, avec un fondu de 24 px sur les bords ; largeur minimale d'onglet ; Ctrl+Tab passe au suivant.
- À droite (centré verticalement, 11 px, `secondaire`, chiffres tabulaires, écart 6 px) : actions en icônes (glyphes de 13 px au trait de 1,4 px, marge 3 px ; Régie : ↻ Relancer, ⇲ /compact), filet de 1 × 12 px `separateur`, « A− 12 A+ ». Chaque élément a un fond `champ` au survol, rayon 4, marge 1 × 4 px.
- Actions de la surface : grisées quand l'élément ne peut rien recevoir, la raison en bulle ; une action devenue nécessaire prend la couleur du statut (↻ en `rouge`), sans halo ; une action coûteuse se confirme en bulle sous son icône (§ 3.7). Une marque à gauche des actions peut signaler une mise à jour (« ⬆ » `orange`) ou une action programmée (« ⏲ » `secondaire`) (G § 7.4).

### 2.3 Bandeau de type

Vue : Sessions à liseré ; Forge (onglet d'un rôle, « Taper »).

- Pour un élément d'un type particulier qui doit se voir en permanence (Régie : maîtresse, écriture, lecture seule, homonyme, démonstration) : un bandeau d'une ligne sous la barre d'onglets, marge 4 × 14 px, 11,5 px.
- Fond : `teinte` de la couleur du type. Texte : le mot du type en 600 dans sa couleur, « · », puis ce que le type implique, en `texte` (« Lecture seule · Régie observe, rien n'est envoyé »).
- Couleur du type : `orange` si le type appelle la vigilance (écriture, doublon, démonstration) ; `accent` pour l'élément maître (`jaune` reste à la question) ; `slate` pour un type passif (lecture seule).
- Types cumulés : les mots se suivent dans le même bandeau (« ◎ maître · lecture seule · … »).
- Un élément distant n'a pas de bandeau : sa marque suffit (§ 1.8).
- Un panneau secondaire (Régie : partage de démonstration) porte le même bandeau, avec ✕ à droite.
- Pas de cadre coloré autour de la surface, pas de fond teinté sur le contenu.

**Lecture seule par défaut, écriture sur demande**

- Une surface que l'application observe sans la piloter s'ouvre en lecture seule, avec un bandeau neutre : marge 6 × 16 px, 11,5 px `secondaire`, filet bas `separateur`, écart 8 px ; icône en `secondaire` ; « Lecture seule : <app> observe <élément> », le nom de l'élément en 600 `texte` ; à droite, boutons « Taper » et « Ouvrir… » (§ 7.8).
- « Taper » passe en écriture : le bandeau devient « ⌨ » `orange` · « Écriture » en 600 `texte` · « saisie envoyée à <élément> », et le bouton « Revenir en lecture seule » ; le bandeau de type « écriture » s'ajoute.

### 2.4 Statusline

Vue : Sessions, Forge. Voir G § 7.8.

- 11,5 px chasse fixe, marge 6 × 14 × 8 px, filet haut `separateur`, écart 4 × 6 px.
- Pastille : marge 1 × 7 px, rayon 3, 400, fond `champ`. Pastille d'élément : trait de 2 px du groupe en tête.
- Pastille d'alerte : fond `teinte` de sa couleur, texte en `texte` : élément maître (`jaune`), entité ouverte (`rouge`), dépôt sale « ± 3 » (`orange`, affiché seulement s'il est sale), quota critique « 7 j 99 % » (`rouge`, valeur en 600).
- Séparateurs, texte secondaire et glyphe du mode (« ▸▸ ») en `secondaire`. Ligne d'un élément composite : rôles en texte `secondaire`, rôle courant en 600.

**Surface à chasse fixe** (au-dessus de la statusline) : marge 12 × 18 px, interligne 1,6 ; les messages de l'utilisateur sur fond `champ`, rayon 6, marge intérieure 6 × 8 px, débordant de 8 px sur les côtés. Cible de dépôt survolée : anneau `accent` de 2 px à l'intérieur (G § 9.10).

### 2.5 Bandeau d'alerte

Vue : Sessions (réseau local coupé), Distante (jeton refusé), Tâches.

- Une ligne : icône colorée du statut (⚠, ⌁, ✕) · texte en 11,5 px `secondaire` · action en `accent` (« Détail et relance »). Écart 7 px.
- Pas de fond, pas de rayon, pas de contour ; marge 2 × 10 × 6 px, marge intérieure 4 × 2 px. Jamais de fond ou de contour rouge ou orange.
- Le texte dit le fait, puis sa conséquence après « · » (« Service absent · 4 éléments éteints »).
- Bandeau d'information (pas d'alerte) : même forme, icône en `secondaire`.
- Encadré de réparation (plus long) : marge 10 × 14 px, marge intérieure 10 × 12 px, rayon 8, fond `champ`, 12 px ; titre en 600 précédé de l'icône du statut (« ⊘ » `rouge`) ; motif et date en `secondaire`, marge 3 × 0 × 8 px ; boutons de réparation en `fbtn` (§ 7.8), écart 6 px ; après l'action, une ligne de résultat (`vert` si réussi, `orange` sinon). Dans une bulle : marge intérieure 8 × 10 px.

### 2.6 État vide

Vue : Forge (chantier éteint).

- Pour une vue entière sans contenu. Centré, colonne, écart 10 px, marge 20 px, texte `secondaire` : titre 14 px 600 `texte` (« Chantier éteint »), une ligne `secondaire` au plus, bouton(s) d'action ; l'action principale en bouton principal (§ 7.8).
- Le bouton n'apparaît que si l'action est possible ; sinon, une ligne de renvoi en `secondaire` (« <app> ne lance rien ici »). Pas de phrase d'aide.
- Une liste vide n'est pas un état vide : un texte court en `secondaire` à la place des lignes (« Aucun élément », « Rien en cours »).

### 2.7 Message d'action

Vue : non dessiné dans la maquette.

- En bas à droite du centre, aligné à droite, une seule ligne : le dernier message, 11,5 px `secondaire`. Il reste 4 s, puis s'efface (fondu 0,2 s) ; un nouveau message remplace le précédent. L'échec reste marqué sur l'entité en cause (G § 9.12). Résultat d'une action de fond, au passé, en quelques mots (« Ordre déposé ») ; échec : ⚠ `orange` puis le fait (« ⚠ Envoi impossible »).
- Pas pour une copie (bulle « Copié », § 3.3), pas pour un succès ordinaire.

### 2.8 Carte d'état de la surface

Vue : Sessions, points 9 et 31 ; Distante, point 34.

Quand la surface principale ne peut pas montrer l'élément : hors de son conteneur, terminé, introuvable, refusé, aucun élément vivant.

- Carte neutre à la place de la surface, posée en haut à gauche : marge 18 px, marge intérieure 14 × 16 px, rayon 10, fond `mantle`, filet `separateur`, sans ombre, 560 px au plus, colonne, écart 8 px, 12 px.
- Ligne de titre : le nom en 14 px 600 avec ses marques, puis l'état en mot en `accent` (Régie : « hors tmux ») ; le diagnostic en `secondaire` (refus : précédé de 🔒) ; l'identifiant en chasse fixe 11 px `secondaire` ; la commande équivalente en `secondaire`.
- Boutons `fbtn`, l'action principale pleine en `accent` (« Reprendre », « Réessayer » ; Régie : « Rapatrier dans tmux… »).
- Aucun élément vivant : « Aucun <élément> vivant » en 14 px 600 et « <sous-groupe> · N passés » en `secondaire` sur la même ligne ; liste des éléments passés, lignes de 2 px de marge à filet haut : nom, ◎ `accent`, date relative en `secondaire` à droite, « Reprendre » en lien `accent` ; au pied, l'action de création avec son raccourci (« Nouvel élément ⌘D », bouton principal), ou « Ouvrir… » et le renvoi, ou la ligne de renvoi en `secondaire`.
- Jamais de grande icône système ni de bouton plein seul au centre.

---

## 3. Flottants

Tous : au thème, jamais en contraste inversé ; fond `mantle`, texte `texte`, ombre flottant + filet. Rayon 9 pour une bulle ou un menu, 10 pour un panneau.

### 3.1 Infobulle

Vue : partout (survoler un titre de section, une barre, une sonde, une icône).

- Rayon 9, marge 6 × 10 px, 11,5 px, interligne 1,45, 280 px au plus.
- Délai 350 ms par défaut (réglable, G § 6) ; apparition 0,12 s, `ease-out`, fondu et glissement de 2 px.
- Centrée, 6 px sous l'élément ; au-dessus s'il reste moins de 40 px sous lui ; à 6 px au moins des bords de la fenêtre.
- Disparaît à la sortie du survol ou au clic. Jamais l'infobulle du système (sauf réglage contraire de l'utilisateur, G § 9.3).

### 3.2 Bulle de détail

Vue : Moniteur (clic sur une case du tableau).

- Rayon 9, marge 9 × 11 px, 250 px, 11,5 px, interligne 1,45. Posée sous la case cliquée, alignée sur sa colonne.
- Titre en 600 (« Tokens · 5 h »), puis lignes en `secondaire` (valeur détaillée, seuils, source).
- Formats de copie (si la valeur en a plusieurs) : rangée de petits boutons, 6 px au-dessus, écart 4 px ; fond `champ`, rayon 5, 11 px, marge 1 × 8 px ; survol `selection` ; le bouton cliqué devient « Copié » (fond `texte`, texte `base`, 600).
- Se ferme au clic ailleurs ou par Échap.
- Case copiable : marge 0 × 2 px ; survol fond `champ`, rayon 4 ; case dont la bulle est ouverte : contour 1,5 px `accent`, décalé de 1 px, rayon 4. Valeur composée (une part secondaire au survol) : soulignement pointillé `separateur`.

### 3.3 Bulle « Copié »

Vue : Moniteur (clic sur une case).

- Au-dessus de la case, centrée, 3 px d'écart : « Copié », 10,5 px, 600, marge 1 × 7 px, rayon 5, fond `texte`, texte `base`.
- 0,9 s en tout, `ease-out` : apparaît en glissant de 2 px (visible à 12 % de la durée), reste, s'efface à partir de 70 %.

### 3.4 Mini-menu de sélection

Vue : Fiche › Mandat, point 11 (sélectionner du texte dans une fiche, un journal).

- 28 px au-dessus du début de la sélection, 120 ms après elle. Rayon 7, marge 2 px, écart 1 px, 11 px, ombre mini + filet.
- Boutons : marge 2 × 8 px, rayon 5, survol `selection`. Copier · Citer dans la session · Chercher.
- « Citer » insère le texte, précédé de « > », là où l'on tape dans la surface principale ; « Chercher » le met dans le filtre de la colonne.
- Ne vole pas le focus (la sélection reste). Disparaît à la désélection ; après une action, affiche « Copié » ou « Cité » 0,7 s.

### 3.5 Menu déroulant

Vue : Fiche (« ▢ Dossiers ⌄ »).

- Rayon 9, marge 5 px, 200 px au moins, 12 px, ombre flottant + filet.
- En-tête de section : 10,5 px `secondaire`, marge 3 × 10 × 1 px (« Projet », « Session »). Élément : marge 4 × 10 px, rayon 5, écart 8 px, survol `selection`, raccourci à droite en `secondaire`. Filet 1 px `separateur` entre sections, marge 4 × 6 px.
- Élément impossible : grisé (opacité 0,45), la raison en bulle.
- Contenu type : « Projet › Ouvrir dans le Finder ⌥⌘R · Copier le chemin » ; « Session › Ouvrir dans le Finder · Copier le chemin ». Le chemin complet en infobulle de l'élément.

### 3.6 Bulle de journal

Vue : Moniteur (« ≡ Journal du sondage », en bas à droite).

- Ouverte par un texte gris (pas un lien bleu) : marge 0 × 6 px, rayon 5 ; survol fond `champ` et texte `texte`.
- Rayon 10, marge 10 × 12 px, 520 px au plus, 11,5 px, posée au-dessus de son déclencheur.
- En-tête : titre en 600, nombre de lignes en `secondaire`, ✕ `secondaire` à droite ; écart 8 px, 6 px au-dessous.
- Liste défilante de 170 px au plus, chasse fixe 11 px, colonnes heure (62 px) · source (62 px) · message, écart 8 px ; heure et source en `secondaire` ; message en `texte`, `orange` (seuil) ou `rouge` (délai dépassé, échec).

### 3.7 Bulle de confirmation

Vue : Panneaux › Journal des ordres, point 27 ; Sessions, point 8.

- Pour une action coûteuse ou destructrice (G § 9.11). Sous son déclencheur, mêmes fond, rayon, marge et ombre que l'infobulle (§ 3.1), mais cliquable.
- Une question courte (« Révoquer cet ordre ? »), en `orange` s'il y a un risque (tâches de fond) ; puis, marge 6 px, « Annuler » et l'action en lien 600 : `rouge` si elle détruit (« Révoquer »), `accent` sinon (« Relancer »).
- Échap ou un clic ailleurs annule.

### 3.8 Bulle de barre d'outils

Vue : ⚠ Contexte, ⟳ Tâches, Quota, Conso.

- S'ouvre au clic sur une icône de la barre d'outils, posée sous elle, à 44 px du haut de la fenêtre. Panneau non modal : rayon 10, marge 12 × 14 px, 12 px, 420 à 640 px selon le contenu (62 % de la fenêtre au plus), défilant, en-tête collé en haut.
- En-tête : titre 14 px 600 ; sous lui ou à sa suite, les paramètres en 11 px `secondaire` séparés par « · » (« plafond 9 500 · limite 10 000 · pire cas ») ; à droite, l'état écrit (coloré seulement s'il est anormal ; état bloquant : capsule, § 5.1), ou l'heure du relevé en 11 px `secondaire` puis « Actualiser » en lien `accent` (« relevé 01:08 · Actualiser » ; pendant le relevé, « actualisation… » en `secondaire`).
- Sections : titre en 600, 12 px, 10 à 12 px au-dessus.
- Lignes en anomalie en tête. Légende d'une ligne en bas, seulement si les signes ne peuvent pas être nommés sur place (§ 5.4).
- Contenus : barre de budget (§ 5.4), tuiles, synthèse et graphiques (§ 5.1, 5.9, 5.10), liste classée (§ 5.10), tâches (§ 3.9).

### 3.9 Bulle de tâches

Vue : ⟳ Tâches.

- Bulle de barre d'outils (§ 3.8), 500 px. Sections en petites capitales 10,5 px 600 `secondaire`, 10 px au-dessus : « À réparer », « En cours », « Prévu », « Fait récemment ».
- Une ligne par tâche, 12 px : icône, texte (l'objet en 600), détail en `secondaire` ; une tâche en souffrance : icône `orange` ; tâche faite : ✓, heure, texte en `secondaire`.
- Au survol d'une ligne : ses actions à droite (« Renvoyer », « Copier », « Abandonner » en `rouge`).
- « À réparer » peut contenir un encadré de réparation (§ 2.5). Section vide : « Rien en cours », « Rien depuis le lancement ».

### 3.10 Menu ⋯ et « Ouvrir avec… »

Vue : Forge (en-tête) ; Redémarrage (clic droit sur une ligne de la colonne).

- « ⋯ » : les actions rares d'un sous-groupe ou d'une entité ; bouton `fbtn` à droite de l'en-tête d'une vue, et clic droit sur la ligne dans la colonne. Style du menu déroulant (§ 3.5), 250 px ; raccourci à droite, écart 16 px ; une action lourde après un filet, finie par « … » (« Redémarrer à neuf… »).
- « Ouvrir avec… ⌄ » : la liste des applications installées capables d'ouvrir l'objet (Régie : Terminal, iTerm2, Warp, Ghostty), même style. Absent si l'objet ne s'ouvre pas ailleurs ; grisé si l'ouverture est refusée, la raison en bulle.

---

## 4. Fiche

Vue : Fiche projet (onglets Aperçu, Mandat, Liens, Câblage, Session).

Fiche posée : 460 px, 52 % de la largeur au plus, fond `mantle`, filet gauche 1 px `separateur`, ombre fiche.

### 4.1 En-tête

- Marge 10 × 16 × 2 px, écart 10 px. Trait du groupe 2 × 16 px, rayon 1 · nom 16 px 600 · groupe en `secondaire` (13 px) · espace · boutons.
- Bouton de fiche : bouton `fbtn` (§ 7.8 : 12 px, marge 3 × 9 px, rayon 7, fond `champ`), icône + libellé : « ⇥ Réduire », « ▥ Ancrer », « ▢ Dossiers ⌄ », « ✕ ». Infobulle sur chacun.
- Réduite : bande de 34 px sur le bord droit, fond `mantle`, colonne, 8 px en haut, écart 10 px : « ‹ » (13 px), trait du groupe 2 × 16 px, nom écrit à la verticale en 600, puis les onglets à la verticale en 11 px `secondaire`. Un clic ou ⌘K la déplie.
- Ancrée : la fiche devient une colonne à droite du centre (le centre se rétrécit) et ne se ferme plus à Échap.
- Ouverture (glissement depuis la droite), fermeture (✕, Échap : glissement vers la droite), réduction et dépli (largeur) : 0,22 s, courbe `cubic-bezier(.2,.8,.2,1)`, sauf si les animations de l'interface sont coupées (G § 6).
- Sans élément sélectionné, ⓘ et ⌘K sont grisés, la raison en bulle (« Aucun <sous-groupe> sélectionné ») ; la fiche ne s'ouvre pas.
- Description : 12 px, interligne 1,45, marge 2 × 16 × 8 px. Ligne de métadonnées dessous : 11 px `secondaire`, 2 px au-dessus.

### 4.2 Onglets de fiche

- Filet bas `separateur`, marge 0 12 px, écart 2 px.
- Onglet : 12 px `secondaire`, marge 6 × 10 px, écart 6 px, soulignement 2 px transparent ; actif : `texte`, 600, soulignement `accent`.
- Compteur en pastille grise après le libellé : 10 px, 500, `secondaire`, fond `champ`, rayon 8, marge 0 6 px, hauteur de ligne 15 px, chiffres tabulaires (« Mandat ㉑ », « Câblage ⑥ »).
- Onglet d'un élément (vue d'entité) : pastille d'état de 8 px avant le libellé.

### 4.3 Section

- Corps : marge 10 × 16 px, sections empilées avec 14 px d'écart, 12 px.
- Titre de section : petites capitales 10,5 px 600 `secondaire`, espacement 0,05 em, marge basse 4 px, écart 8 px. Action à droite du titre en `accent`, 400, sans capitales (« Tout lire », « Pourquoi ? », « Directives », « Masquer ») ; un compte ou un résumé à cette place est en `secondaire`.

### 4.4 Règles imposées

Vue : Fiche › Aperçu.

- Une règle = icône ⚠ en `orange` · titre court en 600 · une ligne de résumé en `secondaire`. Ligne : écart 8 px, marge 3 × 0, interligne 1,45.
- « Tout lire » remplace chaque résumé par le texte complet, en `texte` ; devient « Replier ».
- Le titre et le résumé sont des champs du modèle (`titre`, `resume`) ; à défaut, le titre est le début de la règle jusqu'aux deux-points, le résumé sa première phrase. Le texte complet n'est jamais modifié.
- Renvois hors périmètre : ↪ en `secondaire` · sujet · « → destination » en `secondaire`.

### 4.5 Faits clés

Vue : Fiche › Aperçu.

- Liste de définitions en grille : libellé 110 px en `secondaire`, valeur en `texte` ; écart 6 × 10 px.
- Une action éventuelle à la fin de la valeur en `accent` (« Retirer »).

### 4.6 Clauses

Vue : Fiche › Mandat.

- En tête : champ de filtre (« ⌕ Filtrer les 21 clauses ») et segments par nature avec leur compte (Toutes 21 · Bloquantes 6 · Injectées 11 · Rappels 4).
- Une clause : grille numéro (30 px, `secondaire`) · titre en 600 + conséquence en `secondaire` sur une ligne tronquée · nature en 10,5 px `secondaire` à droite ; écart 2 × 10 px. Filet haut `separateur`, marge 5 px.
- Clic : la clause se déplie (conséquence sur plusieurs lignes). Sous la clause, les reprises et amendements en 11 px (`accent` ; `rouge` pour une reprise qui contredit).

### 4.7 Liens par famille

Vue : Fiche › Liens.

- Les liens sont rangés par famille, dans cet ordre, chaque famille précédée de son échantillon de trait (22 × 6 px, trait 1,8 px) :

| Famille | Couleur | Trait |
|---|---|---|
| chaîne, pilote | `accent` | plein |
| dépend de, utilise | `texte` | plein |
| consulte | `secondaire` | tirets 5 4 |
| évalue | `secondaire` | pointillés 1,5 3 |
| partage | `secondaire` | tiret-point 8 3 1,5 3 |

- Titre de famille : 11 px, 600, `texte`, petites capitales, espacement 0,05 em, écart 8 px, 3 px au-dessous. Familles séparées de 6 px de plus.
- Lien : retrait de 30 px sous le titre, écart 8 px, marge 3 × 0 ; sens en flèche `secondaire` dans une colonne de 12 px (→ sortant, ← entrant, ↔ mutuel) · nom en 500 `texte` · verbe et objet en `secondaire` (« dépend de · OverviewCore : manifeste »).
- Au survol : fond `champ`, rayon 5, ⌖ en `accent` en bout de ligne ; un clic ouvre la carte centrée sur ce lien.
- Aucun lien : « Aucun lien » en `secondaire`. Objet absent du registre de référence : § 4.16.
- Mêmes familles et mêmes traits que sur la carte (§ 6.2).

### 4.8 Hooks

Vue : Fiche › Câblage.

- Lecture seule. Rangés par événement, dans l'ordre du cycle de Claude Code : SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, Stop, SubagentStop, PreCompact, Notification, SessionEnd. Un événement sans fichier n'apparaît pas.
- Grille : nom de l'événement (118 px, chasse fixe 11 px, `secondaire`) · fichiers, un par ligne : point `vert` (câblé et présent ; `rouge` s'il manque) · nom de fichier en chasse fixe. Écart 0 × 10 px, marge 2 px.
- Lus dans les `settings.json` du projet.

### 4.9 Liste de cibles

Vue : Fiche › Câblage (scripts injectés).

- Une ligne : nom en chasse fixe · « · » description en `secondaire` · à droite le compte en `accent` : « tous ⌄ » ou « 27 / 31 ⌄ ».
- Clic : la liste se déplie sous la description, 4 px au-dessous, noms en ligne (11,5 px, écart 2 × 10 px), les exclus barrés en `secondaire` ; ⌄ devient ⌃.

### 4.10 Choix de paire

Vue : Fiche › Session.

- Trois cartes de même largeur, écart 6 px : bordure 1 px `separateur`, rayon 8, marge 6 × 8 px. Petit libellé 10,5 px `secondaire` (« Bas », « Base · utilisée », « Haut ») puis la valeur (« opus · medium »).
- La valeur retenue en `texte`, les deux voisines en `secondaire`.
- Carte choisie : bordure et anneau intérieur de 1 px en `accent`. Clic : choisit.

### 4.11 Interrupteurs

Vue : Fiche › Session, Réglages.

- 28 × 16 px, rayon 8, fond `separateur` ; bouton blanc (G § 3.5) de 12 px, à 2 px du bord, relief `0 1px 2px rgba(0,0,0,.25)` ; actif : fond `accent`, bouton à droite. Bascule sans transition.
- Ligne : interrupteur · libellé en 600 · une ligne d'aide courte en `secondaire` (« Le résultat d'abord, sans préambule. »). Écart 10 px, marge 5 px.
- Un contrôle qui dépend d'un autre est grisé tant que le premier est coupé ; un contrôle interdit par le contexte est grisé, titre en `secondaire`, la raison en bulle.

### 4.12 Dépliant d'explication

Vue : Fiche › Session (« Pourquoi ? », « Directives »).

- S'ouvre sous le titre de section : filet gauche de 2 px `separateur`, retrait 10 px, lignes empilées avec 3 px d'écart, marge basse 8 px.
- Lignes : sujet en 600 puis texte ; dernière ligne de source en `secondaire` (« Échantillon : 40 dernières sessions · 212 prompts »). Texte d'une directive en chasse fixe 11 px.

### 4.13 Onglet Session (modèle d'organisation)

Vue : Fiche › Session.

- Trois sections : **Modèle et effort** (choix de paire, segments Automatique · Fixe, interrupteurs, « Ré-auditer ») ; **Ton** (directives de débit et de façon de s'exprimer, en interrupteurs, « Directives » déplie leur texte) ; **Session maîtresse** (◎ nom · identifiant · état · depuis, ligne d'usage en `secondaire`, boutons « Changer ⌄ » et « Retirer »).
- États de l'élément maître : vivant, ◎ et le nom, rien de plus ; endormi, ☾ `secondaire` ; nom changé, ⚠ `orange` et la commande qui le corrige en chasse fixe 11 px, fond `champ`, rayon 5, marge 1 × 6 px, clic = copie ; aucun, « — » et « Désigner » en lien `accent` pour chaque candidat ; erreur, une ligne `rouge`.

### 4.14 État d'installation

Vue : Fiche › Câblage, point 32.

- Une ligne par composant installé dans l'élément : signe dans une colonne de 16 px, nom, puis l'état en mots : ● `vert` « actif » ; ● `orange` « installé, à redémarrer » ; ○ `secondaire` « absent » ; ⊘ `secondaire` « sans objet ici » (la raison en mot, Régie : « propre à la Forge »).
- Pas de texte coloré par sorte.

### 4.15 Propriétés en lignes légères

Vue : Fiche › Câblage, point 32 (section « Ressources »).

- Une ligne par propriété, écart 8 px, marge 3 × 0 : signe éventuel dans une colonne de 16 px, le mot en `secondaire` (« mutualisé », « externe », « expert »), puis la valeur. Une variable ou un chemin en chasse fixe. Pas de grille, pas de filet.

### 4.16 États d'une section de fiche

Vue : planches de l'annexe C (Aucun projet sélectionné, Session maîtresse, Liens).

- Rien : « Pas de <chose> » ou « Aucun <chose> » en `secondaire` ; une valeur absente : « — ».
- Illisible : ⚠ `orange`, la raison en bulle. Erreur d'une action : une ligne `rouge`.
- En cours : « <Chose> en cours… » en `secondaire`.
- Objet référencé mais absent du registre de référence : nom en `secondaire` suivi de « hors <registre> » (10 px `secondaire`), non cliquable.
- Objet en veille : ☾ `secondaire`.
- Rien de désigné : « — » et « Désigner » en lien `accent` pour chaque candidat.

---

## 5. Mesures

### 5.1 Tuile

Vue : Moniteur (rangée du haut), Quota.

- Grille de tuiles égales (Moniteur : 5 colonnes), écart 16 px. Tuile : libellé 11 px `secondaire` · valeur 17 px 600 · visualisation éventuelle · ligne secondaire 11 px (« réinit. dans 2 h 31 », « plein · reset jeu. 13 h », « … · estimé »).
- La valeur est en `texte` tant qu'elle est normale ; au-delà du seuil, `orange` ou `rouge` à 85 %. Pas de fond de tuile.
- Seule exception colorée : l'état bloquant de la mesure, écrit dans une capsule teintée à côté du titre de la bulle : « Bloqué », 11 px, texte de la couleur en 600 sur sa `teinte`, marge 1 × 8 px, rayon 9.
- Dans une bulle de mesure (§ 3.8) : mêmes tuiles, 4 colonnes, écart 16 px.

### 5.2 Barre d'utilisation et de temps

Vue : Moniteur (5 heures, 7 jours, 7 jours · Fable).

- Barre d'utilisé : 6 px, rayon 3, fond `champ`, remplissage `texte` (statut si anormal). Infobulle « utilisé N % ».
- Dessous, à 3 px : petite horloge (9 px, trait 1,2 px `secondaire`), écart 4 px, puis ligne de temps de 2 px, remplissage `secondaire` jusqu'au temps écoulé. Infobulle « temps écoulé N % ».
- Les mots « utilisé » et « temps écoulé » ne sont pas écrits sous les barres.

### 5.3 Bande de répartition

Vue : Moniteur (« Qui consomme · 5 h »).

- Une seule bande pleine largeur, 22 px, rayon 6, parts séparées de 2 px, largeur proportionnelle.
- Chaque part prend la couleur du groupe de son élément (85 % d'opacité ; un deuxième élément du même groupe à 55 %) ; « autres (N) » en `separateur`.
- Libellé dans la part si elle est assez large (Régie : au-delà de 80k tokens) : « essai.dispatcher · 276k », 10,5 px, texte `base`, marge 0 × 6 px ; sinon sous la bande en 11 px `secondaire`, 5 px au-dessous, écart 12 px.
- Chaque part : infobulle (nom, valeur), clic = copie du nom. La portée de la mesure (« tokens des sessions de ce Mac sur 5 h ») est dans l'infobulle du titre.

### 5.4 Barre de budget

Vue : ⚠ Contexte.

- Grille : nom (130 px) · niveau (92 px) · une barre par moment de mesure (deux colonnes égales) · action (44 px) ; écart 6 × 10 px, 11,5 px ; en-tête de colonnes en `secondaire`.
- Une ligne par élément : nom en `accent` · niveau écrit (point `rouge` + « coupé », ou « reporté » en `secondaire`) · barres · action.
- Barre (6 px, rayon 3, fond `champ`, échelle commune) : émis en `texte` plein ; reporté hachuré `secondaire` (2 px sur 4) ; coupé en `rouge` (1,5 % de largeur au moins) ; plafond en trait vertical de 1,5 px `orange`. Infobulle : brut, émis, coupés. Barre et valeur de bout : écart 6 px.
- Une valeur qui dépasse l'échelle s'écrit au bout de la barre : « → 39 901 » en 10 px `rouge`.
- Éléments en dépassement en tête. Légende d'une ligne sous le tableau, 10 px au-dessus, écart 14 px, 11 px `secondaire` : échantillons de 12 × 5 px (émis, reporté, coupé) et de 2 × 9 px (plafond), suivis d'un mot.
- « Voir » (en `accent`, seulement sur les lignes en dépassement) devient « Masquer » et déplie sous la ligne la composition : retrait 140 px, marge 6 × 0 × 6 × 10 px, filet gauche 2 px `separateur` ; grille reste · 64 px · 64 px, écart 2 × 10 px ; en tête le moment et le total en `secondaire`, « Ouvrir le texte » en `accent` à droite ; puis un bloc par ligne (nom · taille en chasse fixe alignée à droite · état en couleur : émis `texte`, reporté `secondaire`, coupé `rouge`).

### 5.5 Tableau dense

Vue : Moniteur (« Sessions vivantes »), Forge (rôles).

- En-tête de colonnes 10,5 px 400 `secondaire` sans filet ; lignes de 11,5 px, marge 4 px, écart 8 px, filet haut `separateur`, chiffres tabulaires. Mêmes mesures pour tout tableau (Moniteur, rôles d'une entité, réglages).
- Première colonne : trait du groupe (2 × 12 px), écart 7 px · nom · nom du conteneur en `secondaire`. Dans une vue d'entité : pastille et nom en 600.
- Valeurs en `secondaire` ou `texte` ; couleur seulement hors norme (journal ≥ 8 Mo `orange`, ≥ 15 Mo `rouge`, en 600 ; version en retard « ⬆ 304 » `orange` ; tokens ≥ 100k en 600). Valeur absente : « — ».
- Les seuils de couleur et de gras se règlent dans la page de réglages de la vue ; leurs valeurs sont dans la bulle de la case.
- Chaque case est copiable (G § 9.1) et ouvre sa bulle de détail par colonne : contenu propre à la colonne (journal : part vive, part morte, seuils, lignes ; version : version de l'élément et du binaire ; tokens : sortie, entrée, cache…). Une valeur composée garde sa part secondaire au survol (journal : « vif · mort 31 Mo »).
- Tableau de réglages (Régie : rythmes par sonde) : même grammaire, en-tête 10,5 px 400 `secondaire`, marge 3 × 6 px ; cases marge 4 × 6 px, filet haut ; la valeur en cours en 600.

### 5.6 Section repliée

Vue : Moniteur (« › Historique 214 »).

- Titre de section cliquable avec chevron et compte en 400. Repliée par défaut.
- Dépliée : lignes de 2 px de marge, grille trait du groupe (2 px) · nom (copiable, 1,2 part) · conteneur en `secondaire` (1 part) · action au survol (70 px ; « Reprendre », `accent`) · date à droite en `secondaire` (100 px), écart 8 px. Survol : fond `champ`, rayon 5.

### 5.7 Anneau de sonde

Vue : Moniteur (pied : fichiers, ssh, agents, conso).

- Anneau de 13 px (trait 2 px, fond `separateur`, arc `secondaire` = part écoulée avant le prochain relevé) suivi du nom en 11 px `secondaire`, écart 5 px. Sondes séparées de 14 px.
- Infobulle : « fichiers : prochain relevé dans 2 s (toutes les 5 s) ».
- À droite : segments Rapide · Normal · Lent, puis « Réglages… » en `accent`.

### 5.8 Capsule d'attribut

Vue : Carte (boîte d'overview, « scripts »).

- Pour un attribut à risque qu'on doit voir sans l'apprendre : capsule en haut à droite de l'objet, 15 px de haut, rayon 7,5, fond `teinte` de la couleur du statut ; un glyphe dessiné au trait de 1,1 px puis un mot, 10 px, 600, de la couleur du statut (Régie : seringue et « scripts » en `orange`).
- La bulle dit où, combien, et où lire le détail (« dans tous les projets · 6 scripts · détail : fiche › Câblage »).

### 5.9 Synthèse « En clair »

Vue : Quota, point 26.

- Sous les tuiles d'une mesure : titre « En clair » en 600, 12 px au-dessus, sans encadré ni ⓘ.
- Deux phrases au plus, en `texte`, interligne 1,45, 4 px sous le titre, chiffres clés en 600 (« **99 %** de la semaine utilisés, **70 %** attendus à cette heure. Au rythme des 6 dernières heures, plein **mardi 17 h**, avant le reset de jeudi 13 h. »).
- Puis les motifs, sur une ligne en `secondaire`, 4 px au-dessous, séparés par « · ».

### 5.10 Graphiques

Vue : Quota (« La semaine en cours », « Les 48 dernières heures », « Les semaines passées »), point 24 ; Moniteur (modèles) ; Conso.

Règles (G § 7.12) : une seule teinte, `accent` ; seules les valeurs anormales prennent leur couleur ; le détail d'un point est dans sa bulle ; chaque repère est nommé sur sa propre ligne, donc pas de légende. Titre de graphique : 600, 12 px, 10 à 12 px au-dessus ; graphique 4 à 8 px dessous, pleine largeur.

- **Grille et axes** : lignes horizontales de 0,6 px `separateur` ; ligne du plafond (100 %) 0,8 px `secondaire` à 60 %. Valeurs de la grille à droite, 6 px après la zone de tracé, 9 px `secondaire`. Graduations de l'abscisse en 9 px `secondaire`, 14 px sous la zone ; l'échéance écrite en bout d'axe, alignée à droite (« reset jeu. 13 h »). Zone de tracé : 480 px sur 520.
- **Courbe dans le temps** : zone de 120 px de haut ; grilles à 0, 50 et 100 % ; attendu en tirets 3 3, 1 px `secondaire` à 70 %, droite de 0 au plafond à l'échéance (valeur en bulle) ; réel en `accent` 2 px, jointures et bouts ronds, sur un aplat `accent` à 10 % ; point courant de 7 px `accent` cerclé de 2 px `base`, sa valeur en 10 px 600 `texte`, 8 px à droite.
- **Barres par heure** : zone de 110 px ; une barre par heure, écart 3 px, rayon 1,5 ; `secondaire` à 35 % sous la référence, `orange` à 50 % au-dessus ; ligne de référence 1 px en tirets 3 3 `secondaire`, moyenne glissante 1 px en tirets 2 3 `secondaire` ; chacune nommée sur sa ligne, 4 px au-dessus, 9,5 px `secondaire`, détourée de 3 px de `base` (« autorisé 0,79 pt/h » à gauche, « moyenne 6 h 1,83 pt/h » à droite) ; une graduation toutes les 6 h ; la valeur de chaque barre en bulle (« mar. 17 h · 1,0 pt/h »).
- **Barres par période** : zone de 70 px ; une barre étroite par période (son pic), 18 px de marge de chaque côté du pas, rayon 3 ; `secondaire` à 35 % ; `orange` à 60 % au-delà du premier seuil (85 %), `rouge` à 60 % au-delà du second (99,5 %) ; la période en cours en `accent` à 55 %, étiquetée « en cours » ; plafond en ligne de 0,8 px `secondaire` à 60 % ; étiquettes centrées sous chaque barre, 9 px `secondaire` ; le pic en bulle (« semaine du 6 oct. · pic 93 % »).
- **Bande fine de répartition** (deux ou trois catégories) : 6 px, rayon 3, marge 6 × 0 ; la catégorie coûteuse en `orange`, les autres en `texte` ; légende en ligne dessous (« opus 5.5 · 91 % ● fable 5.1 · 9 % »).
- **Liste classée** (Régie : sessions qui consomment le plus) : une ligne par objet, grille reste · 40 px, écart 2 × 8 px, 6 px entre lignes ; nom en 600 puis détail en 11 px `secondaire` ; part en chiffres tabulaires à droite ; dessous, barre de 4 px, rayon 2, fond `champ`, remplissage `texte` (« autres » : `secondaire`).

---

## 6. Carte

Vue : Carte ; point 33.

- **En-tête** : marge 10 × 14 px, écart 10 px, filet bas `separateur`. Titre 14 px 600 (nom du groupe ou « Tous les groupes ») · « N <sous-groupes> » en `secondaire` · recherche à droite : champ de 28 px, rayon 7, fond `champ`, 12 px `secondaire`, 150 px au moins ; sa liste est un menu (§ 3.5) dont les lignes portent le trait du groupe.
- Actions de disposition (« Regrouper », « Réinitialiser ») en lien `accent` ; grisées pendant le calcul ou quand elles n'ont rien à faire ; confirmation en ligne, bouton destructif en `rouge`.
- Un élément cherché ou désigné ailleurs s'allume : anneau `accent` qui s'allume puis s'efface en 2,1 s (mise en exergue, G § 6).

### 6.1 Boîte

- 170 × 58 px, fond `mantle` neutre, rayon 8, filet 1 px `separateur`. Trait du groupe (2 × 12 px, rayon 1) devant le nom en 12 px 600. Ligne secondaire en 10,5 px `secondaire` ; compteur `N/M` sous le nom (N en 600 `texte`).
- Qualificatif éventuel en mot `secondaire` de 10 px à droite du nom (« mutualisé », « externe »). Attribut à risque : capsule d'attribut (§ 5.8) en haut à droite.
- Taille fixe à l'écran : la carte défile, elle ne s'agrandit pas en plein écran.
- Sélection : anneau d'accent de 2 px.

### 6.2 Liens

- Trois couleurs sobres par grande famille et un style de trait par type (même table que § 4.7). Trait de 1,5 px à 75 % d'opacité ; 2,2 px et pleine opacité pour les liens de la boîte choisie. Flèche de 7 × 7 px au bout sortant ; « partage » fléché aux deux bouts.
- Légende d'une ligne au bas de la carte : marge 6 × 14 px, écart 4 × 12 px, filet haut `separateur`, 10,5 px `secondaire` ; échantillon de trait (22 × 6 px, trait 1,8 px) + nom de famille ; puis l'échelle de coût (§ 6.3). Vue de tous les groupes : les groupes en traits.

### 6.3 Étiquettes de coût

- Sous le nom : texte 10,5 px `secondaire` « opus · medium » suivi d'une jauge de 5 barres de 3 px de large, au pas de 5 px, de 4 à 8,8 px de haut, rayon 1, qui dit le coût relatif modèle × effort : barres remplies en `texte`, vides en `separateur`.
- Au niveau le plus coûteux seulement : barres remplies et texte en `orange`, texte en 600. Pas de capsules colorées.

---

## 7. Divers

### 7.1 Étapes

Vue : Forge (copie locale, chaîne des rôles) ; Panneaux › Alerte tmux, point 38 ; Redémarrage.

- Nœuds de 17 px, rayon 9, bordure 1,5 px `separateur`, chiffre ou ✓ en 9,5 px ; reliés par un trait de 1 px `separateur`, 10 px au moins ; écart 6 px.
- Fait : bordure et texte `vert`, ✓. En cours : bordure et texte `accent`, libellé en 600 `texte`. À venir : `secondaire`. Échec : ✗ et bordure `rouge`.
- Liste verticale (procédure) : mêmes nœuds de 17 px, en colonne, écart 7 px ; l'étape en cours porte une roue `accent` à la place du chiffre.
- Une étape peut porter son état écrit à la suite : durée (« Arrêt · 8 s »), dépassement en `orange` (« délai écoulé », la raison en bulle), progression (« Reprise 2 sur 3 »).
- **Barre de tranches** (avancement d'une campagne) : segments égaux de 6 px, rayon 2, écart 3 px, marge 4 × 0 : `texte` (accepté), `secondaire` (en attente), `rouge` (refusé), `separateur` (à venir). Dessous, une ligne `secondaire` : « tranche 2 sur 2 · **3** acceptés · 2 en attente · 1 refusé » (le refus en `rouge`).

### 7.2 Réglages

Vue : Réglages ; points 1, 15, 16, 22, 25, 36, 39.

- Fenêtre propre (règles : G § 7.6) : 700 px de large, rayon 12, ombre native de macOS, fond `base`, sans voile. Titre de la page en tête, centré, 12 px 600, marge 8 px, fond `mantle`.
- **Barre latérale** : 150 px, marge 8 × 6 px, écart 1 px, fond `mantle`, filet droit `separateur`. En tête, champ de recherche (28 px, fond `champ`), 6 px au-dessous. Groupes en petites capitales 10 px 600 `secondaire`, espacement 0,05 em, marge 12 × 8 × 3 px. Sous chaque groupe, ses pages **en retrait** de 10 px, chacune précédée de son icône dans une colonne de 18 px, marge 6 px ; entrée 12 px, marge 4 × 8 px, rayon 6 ; active : fond `selection`, `texte`, 600. Jamais titres et pages au même bord gauche.
- Ordre des groupes : « Application » (Général, Clavier, fenêtre qui descend du bord…), puis les groupes du domaine, « Plugins » en dernier.
- **Corps** : marge 10 × 14 px, écart 6 px, 12 px. Titre de section : petites capitales 10,5 px 600 `secondaire`, 12 px au-dessus.
- **Ligne de réglage** : écart 10 px, marge 6 × 0, filet bas `separateur` (aucun sur la dernière) ; libellé · aide d'une ligne en 11 px `secondaire`, 1 px dessous (facultative) · ⓘ facultatif, 11 px `secondaire`, marge 4 px, précision en bulle · contrôle à droite (§ 7.9).
- Pas de boîte grise autour de l'aide.
- Un réglage maître désactivé grise toute sa section ; un contrôle sans effet (fonction coupée) est grisé, la raison en bulle ; un réglage que l'application ne sait pas encore appliquer est masqué.
- « Défaut » en lien `accent` à côté d'une valeur changée à la main.
- Message d'état (autorisation macOS à donner, erreur) : une ligne, icône `orange` ou `rouge`.
- Un réglage qui ne prend effet qu'au prochain démarrage le dit dans sa bulle. Une erreur liée à une entité s'affiche dans la page de l'entité (§ 7.6), pas sous le réglage qui l'a provoquée.
- **Page Groupes** (Régie : Royaumes) : une ligne par groupe, marge 5 × 8 px, rayon 6, fond `champ`, écart 8 px : trait du groupe (2 × 12 px), nom, « hors <registre> » en 10,5 px `secondaire` s'il est absent du registre de référence (menu grisé), menu de couleur à droite : nom français suivi du nom stocké en `secondaire` (« Lavande (purple) ⌃⌄ »). Ligne ouverte : contour 2 px `accent` décalé de −2 px. Dernière ligne « + Nouveau groupe · proposée : Bleu » : bordure 1 px pointillée `separateur`, fond transparent, + et « proposée : » en `secondaire`, trait de la couleur proposée, son nom en `texte` ; la raison de la proposition en bulle.
- **Aperçus clair et sombre** (page Groupes, sous la liste) : titre de section « Aperçu » ; deux cartes côte à côte, écart 8 px, chacune rayon 8, marge 6 × 8 px, fond `mantle` et filet `separateur` du thème qu'elle montre (clair à gauche, sombre à droite), quelle que soit l'apparence en service. Dans chaque carte : titre de zone en petites capitales 10 px `secondaire` (« PROJETS »), « clair » ou « sombre » à droite en 400 ; une ligne de 18 px par groupe (trait 2 × 12 px de sa couleur résolue dans ce thème, nom en 11 px `texte`). Mise à jour à chaque changement de couleur.
- **Menu de couleur** : menu (§ 3.5), 250 px. En-tête : nom de la palette en service, 10,5 px `secondaire`. Une ligne par couleur de groupe : paire de pastilles de 12 × 12 px (clair | sombre), coins arrondis à 5 px, filet `separateur` ; nom français ; nom stocké en 10,5 px `secondaire` à droite ; la couleur choisie sur fond `selection` avec ✓ `accent`. Après un filet, « Réservées aux statuts » (10,5 px `secondaire`) : vert, jaune, orange, rouge, grisées (opacité 0,45), non sélectionnables, leur usage en bulle.
- **Page Clavier** : le clavier dessiné (§ 8.10) ; interrupteur « Liste des raccourcis » (aide « 1 s ») ; puis une ligne par raccourci, rangées en Voir et insérer · Agir · Fenêtre, chacune avec sa touche (§ 7.9) et, en aide, l'autre accès (« aussi double Maj ») ; le raccourci d'une fonction désactivée est grisé, la raison en bulle.
- **Page Plugins › <nom>** : « installé · 1.4 » en `secondaire` et « Désinstaller » (non installé : « Installer… ») ; interrupteur « Activer ». Sans plugin installé, la section reste visible : « Aucun plugin installé ».

### 7.3 Renommage

Vue : Sessions (« creation », ou clic lent sur un nom).

- Le nom reste à sa place ; contour 2 px `accent` décalé de 1 px, rayon 3, fond `base`, marge 0 2 px ; texte sélectionné en fond `selection`.
- Clic lent : second clic entre 0,4 et 2 s après le premier.
- Pas de ligne d'aide ; erreur éventuelle dessous en 10,5 px `rouge`.

### 7.4 Barre des menus

Vue : Barre des menus.

- Icône monochrome de la couleur de la barre : glyphe de 14 × 12 px au trait de 1,3 px ; nombre d'éléments à traiter à côté, 11 px 600 ; anneau de jauge de 14 px, trait 2 px, piste de la couleur de la barre à 35 %, arc de la couleur de la barre, qui ne prend la couleur du statut qu'en alerte.
- Menu natif de macOS (matériau, flou, rayon et ombre du système ; la maquette le simule : 330 px, 12 px). En-têtes de section 10,5 px 600 à 60 % d'opacité, marge 4 × 8 × 2 px ; éléments 12 px, marge 4 × 8 px, rayon 5, écart 8 px ; filets de 1 px à 25 %, marge 4 × 8 px.
- Contenu, de haut en bas : les éléments qui attendent l'utilisateur (Régie : « En attente » ; une ligne par élément : pastille, nom, raison en `secondaire`) ; la mesure principale (barres de 6 px, rayon 3, et ligne d'état) ; la répartition (trois premiers) ; l'alerte éventuelle ; puis « Ouvrir <app> », les modes utiles avec leur raccourci, la fenêtre qui descend du bord (F12), « Réglages… », « Quitter ».

### 7.5 Fenêtre qui descend du bord

Vue : Visor. Règles et matériau : G § 7.9.

- Coins bas arrondis de 10 px ; ombre modale + filet.
- Poignée basse de 10 px avec un trait de 36 × 3 px, rayon 2, `secondaire` à 60 %.
- En tête, les capsules de la barre d'outils sur une rangée de 30 px, transparente, marge 0 × 8 px (§ 2.1).
- Halo du texte de la surface, quand il est activé : `0 0 5px`, couleur `base` à 70 %.

### 7.6 Feuille de diagnostic

Vue : Réglages › Pont2 (« Diagnostiquer… »), point 39.

- **Liste des entités** (page de réglages de leur service, G § 9.13) : une ligne de réglage par entité : icône d'ordinateur (13 × 11 px, trait 1,2 px, `secondaire`, marge 6 px), nom, « vu il y a 3 min » en aide ; à droite, écart 10 px, l'état écrit (coloré seulement s'il y a un refus, la raison en bulle) et « Diagnostiquer… » (`accent` s'il y a un refus, `secondaire` sinon). Dernière ligne : « + Ajouter une machine… » en `accent`.
- **Feuille** : feuille de macOS, une par entité, attachée en haut de la fenêtre des réglages, sans voile ; 440 px, rayon 12, ombre modale + filet, fond `mantle`, marge 14 × 16 px, 12 px.
- En-tête : nom en 16 px 600, puis « diagnostic · 15:06 » en `secondaire`, écart 8 px, 8 px au-dessous.
- Une ligne par vérification : grille 16 px · 150 px · reste, écart 6 px, marge 5 × 0, filet haut `separateur`. Réussie : ✓ `secondaire`, la valeur en `secondaire` (« 12 ms », « 600 »). En échec : ✕ `rouge` ou ! `orange`, la raison dans la même couleur, et dessous l'action qui répare en lien `accent` (« Corriger les droits par ssh »).
- Pied à droite, 10 px au-dessus, écart 8 px : « Relancer le diagnostic » (`fbtn`), « Fermer » (bouton principal).
- Elle remplace les encadrés de réparation partout où le refus ne concerne pas un élément précis.

### 7.7 Liste à cocher

Vue : Panneaux › Reprendre.

- Dans une fenêtre modale (§ 8.5). Une ligne par objet, marge 3 × 0, écart 8 px : case (§ 7.9) · « parent/ » en `secondaire` puis le nom. Cases cochées par défaut.
- Pied : « Tout décocher » en lien `accent` à gauche ; « Plus tard » ; le bouton principal porte le compte (« Reprendre (4) ») et se grise à 0.

### 7.8 Boutons

Vue : Fiche (en-tête), Panneaux, Redémarrage, Réglages.

- **Bouton** (`fbtn`) : 12 px, marge 3 × 9 px, rayon 7, fond `champ`, texte `texte` ; icône + libellé, ou libellé seul ; écart 8 px entre boutons. Seul modèle de bouton : en-tête de fiche, pied de fenêtre, encadré, carte d'état, ligne de réglage. Jamais de bouton plus haut ni plus arrondi.
- **Principal** : même bouton, fond `accent`, texte `surAccent` ; un seul par fenêtre ou carte, à droite ; grisé tant que l'action est impossible, la raison en bulle.
- **Désactivé** : opacité 0,45 de tout le bouton (principal compris), la raison en bulle.
- **Lien d'action** : texte `accent`, sans fond ni bordure (« Reprendre », « Actualiser », « Désigner », « Tout décocher »).
- **Destructif** : texte `rouge`, sur un bouton ou en lien (« Révoquer… », « Abandonner ») ; toujours confirmé (§ 3.7).
- **Forcer** : texte `rouge`, et seulement après qu'une première tentative a été lancée (« Arrêt forcé »).
- **Menu** : « ⌄ » à la fin d'un bouton qui ouvre un menu d'actions (« ▢ Dossiers ⌄ », « Ouvrir avec… ⌄ ») ; « ⌃⌄ » pour un menu local qui choisit une valeur (§ 7.9).
- Un libellé qui ouvre une fenêtre ou demande une confirmation finit par « … » (« Révoquer… », « Diagnostiquer… »).
- Pied d'une fenêtre : filet haut `separateur`, 12 px au-dessus, écart 8 px ; à gauche la commande équivalente (chasse fixe 11 px `secondaire`, clic = copie) ou l'âge de la demande ; puis « Annuler » (ou « Refuser », « Plus tard ») et l'action principale à droite. Dans une procédure, « Annuler » reste à gauche jusqu'à l'étape finale.

### 7.9 Contrôles de formulaire

Vue : Réglages, Panneaux, Nouvelle session. Boutons : § 7.8 ; interrupteur : § 4.11 ; segments : § 1.2.

- **Champ de saisie** : 28 px, rayon 7, fond `base`, filet `0 0 0 1px separateur`, marge intérieure 0 × 10 px, écart 8 px, 12 px ; exemple en `secondaire` dans le champ (« ex. refonte-ui »). Focus : anneau 2 px `accent`. Erreur : anneau 1,5 px `rouge` et message 11 px `rouge` sous le champ, après une tentative seulement ; avertissement : message 11 px `orange`.
- **Champ de recherche** (filtrer, chercher, choisir dans une liste) : 28 px, rayon 7, fond `champ`, icône en `secondaire` (§ 1.3).
- **Zone de texte** : même champ, 96 px de haut, texte aligné en haut, 8 px de marge haute.
- **Case à cocher** : 13 × 13 px, rayon 3, bordure 1,5 px `secondaire` ; cochée : ☑ en `accent` ; libellé à droite, écart 8 px. Décochée par défaut quand le choix ne doit pas être imposé.
- **Curseur** : piste de 110 × 4 px, rayon 2, `separateur`, remplissage `accent`, sans bouton ; valeur à droite dans une colonne de 44 px, alignée à droite, `secondaire` (« 0,35 s », « 290 px »).
- **Menu local** (choisir une valeur) : bouton `fbtn` avec la valeur et « ⌃⌄ » (« dotlib (catppuccin) ⌃⌄ », « 2 h ⌃⌄ »). Une police se montre dans sa propre fonte.
- **Touche de raccourci** : bouton `fbtn` en chasse fixe, 54 px au moins, texte centré (« ⌘P », « ⇧⌘R ») ; pendant l'enregistrement : « Combinaison attendue… (⎋ annule) ».
- **Champ de chemin** : champ de saisie en chasse fixe 11,5 px. Chemin local : le chemin en `secondaire` et « Choisir… » (`fbtn`). Chemin valable sur des machines distantes : champ texte sans « Choisir… », précédé dans le champ d'une icône d'ordinateur de 14 × 12 px au trait de 1,2 px.

---

## 8. Panneaux

Règles communes : G § 7.10. Au thème (fond `mantle`, ombre flottant + filet, rayon 10 pour un panneau non modal ; ombre modale et rayon 12 pour une fenêtre modale) ; pas de consigne écrite, les touches sont dans la bulle de l'en-tête ; sélection dans une liste = trait d'accent de 2 px + `selection` ; marques d'élément identiques à la colonne ; une liste qui défile n'écrit pas « N de plus en dessous ». Feuille de diagnostic : § 7.6.

Ligne de liste d'un panneau : 26 px, marge 0 × 8 × 0 × 4 px, rayon 6, écart 8 px ; emplacement de pastille de 16 px ; choisie : `selection` + `inset 2px 0 0 accent` ; survol : `champ`.

### 8.1 Sélecteur flou

Vue : Sélecteurs › ⌘P projet/session (étapes Projets et Sessions), point 35.

- Ouverture : son raccourci, ou une frappe dans la surface (double Maj). Il ne fait qu'une chose : insérer un nom dans la surface principale.
- Panneau de 440 px (étape des sous-groupes) ou 420 px (étape des éléments), centré, 60 à 90 px sous le haut de la fenêtre, marge 6 px, 12 px, 76 % de la hauteur au plus, défilant.
- Champ de recherche en tête (§ 7.9), marge 4 × 4 × 6 px : icône ▭ `secondaire`, la saisie en chasse fixe, ou le texte indicatif en `secondaire` (« projet/session »).
- Deux étapes : les sous-groupes, puis les éléments du sous-groupe tapé (« parent/ »).
- Ligne de sous-groupe : trait du groupe (2 × 12 px) · nom en 600 · nom d'affichage en `secondaire`, tronqué · nombre d'éléments vivants à droite, 11 px `secondaire`, chiffres tabulaires (bulle « N <éléments> vivants »).
- Ligne d'élément : pastille de la colonne (au travail : emplacement vide) · « parent/ » en `secondaire` puis le nom · marques (◎ `accent`, « ⚠ ×2 · id » `orange` 10,5 px 600, ⇄ de l'élément distant) · date relative à droite, 11 px `secondaire`.
- Élément distant : « @machine » en `secondaire` ; machine injoignable : « hors ligne » en `orange`, 10,5 px, la raison et le dernier contact en bulle ; ↵ insère quand même.
- Liste vide : « Aucun <objet> ne correspond » en `secondaire`.

### 8.2 Sélecteur liste et aperçu

Vue : Sélecteurs › ⌘L @@@.

- Pour choisir parmi des objets dont la définition entière compte.
- Panneau de 640 px, centré, à 70 px du haut, sans marge, grille 220 px · reste.
- À gauche (marge 6 px, filet droit `separateur`) : champ de recherche, puis une ligne par objet : préfixe en `secondaire` 400 et nom en chasse fixe 600.
- À droite, pour la ligne choisie (marge 14 × 16 px, écart 8 px) : nom en 16 px chasse fixe 600 ; catégorie en petites capitales 10,5 px 600 `secondaire` ; définition complète, interligne 1,45.
- Pied, en bas à droite de l'aperçu, 11 px `secondaire` : ses deux touches (« ↵ insérer · ⇥ compléter »). Seule exception à l'absence de consigne écrite.

### 8.3 Bande de médias

Vue : Sélecteurs › ⌘I captures (cocher « Aperçu (Espace) »).

- Une rangée de vignettes sur toute la largeur de la surface principale (12 px des bords), juste au-dessus de la ligne où l'on tape ; le contenu de la surface reste visible au-dessus. Panneau non modal, 12 px.
- En-tête : marge 10 × 12 × 6 px, écart 8 px : titre en 600 (« Captures »), nombre en `secondaire`, ✕ `secondaire` à droite. Les touches sont dans la bulle de l'en-tête (« ↵ insérer · ⌘ ou ⇧ clic : plusieurs · Espace : aperçu · ⌫ ⌫ : corbeille · Échap : fermer »).
- Rangée : écart 10 px, marge 0 × 12 × 12 px, défilement horizontal.
- Vignette : 132 px de large, proportion 16/10, rayon 6, filet `separateur` ; heure dessous, 3 px, 10,5 px `secondaire`, chiffres tabulaires (« Hier 23:58 » pour un autre jour). Courante (clavier) : filet `secondaire`. Choisie : anneau 2 px `accent`. Déjà utilisée dans cet élément : ✓ en bas à gauche (4 × 3 px du coin), 10 px 600 blanc avec une ombre de texte (G § 3.5, § 3.7). Sélection multiple : numéro d'ordre en haut à droite, pastille de 15 px, rayon 8, 9,5 px 600, `surAccent` sur `accent`. Suppression armée : anneau 2 px `rouge` et ⌫ en haut à droite, 10 px 600 blanc sur `rouge`, rayon 4, marge 0 × 4 px.
- Clavier et souris : G § 9.7 (↵, ⌘-clic et ⇧-clic, Espace, ⌫ ⌫) ; glisser une vignette sur la surface fait comme ↵ (G § 9.10).
- Aperçu (Espace) : en grand, juste au-dessus de la bande, dans la surface, sans voile, à la forme de l'image : rayon 8, ombre modale + filet ; dessous, l'heure en 12 px `texte` sur fond `mantle`, rayon 6, marge 1 × 8 px. ← → passe à la voisine ; Espace ou Échap ferme.

### 8.4 Demande en attente

Vue : Panneaux › sudo (1, 2, 3 ou 5 demandes) ; Sessions, point 7.

- Une demande de saisie (secret, accord) venue d'un élément.
- Panneau de 420 px, 128 px de haut au moins, marge 12 × 14 px, ancré en haut au centre de la surface principale ; ombre flottant et anneau `accent` de 2 px (à la place du filet).
- En-tête (écart 8 px) : trait de 2 × 12 px de la nuance de la demande · 🔒 · « <type> · parent/élément » en 600 ; à droite, s'il y a une pile, « ‹ 1/3 › » en 11 px `secondaire`, chiffres tabulaires (bulle : « ⌃⇥ demande suivante · 2 en attente »).
- Ce qui est demandé, en chasse fixe 11 px `secondaire`, sur une ligne tronquée (complet en bulle), marge 6 × 0 × 8 px.
- Champ de saisie (§ 7.9) avec l'anneau `accent`, 10 px au-dessous.
- Pied : à gauche, l'âge de la demande (« il y a 5 s »), 11 px `secondaire` ; à droite « Refuser » (`fbtn`) et « Valider » (principal).
- Nuance de la demande : `cyan`, la même sur le panneau et sur la ligne de l'élément dans la colonne (§ 1.6).
- **Pile** : plusieurs demandes, une pile, jamais des panneaux côte à côte. La plus récente devant, avec l'anneau `accent`. Derrière, deux bords au plus, quel que soit le nombre : même largeur, décalés de 9 px vers le haut, réduits de 4 % et moins opaques de 18 % chacun, ombre mini + filet. ⌃⇥ passe à la suivante ; « Valider » ou « Refuser » fait avancer la suivante ; un raccourci ramène la pile au premier plan (Régie : ⌘S).

### 8.5 Fenêtre modale et voile

Vue : Nouvelle session ; Panneaux › Nouveau projet, Reprendre.

- `voile` sur toute la fenêtre, barre de titre comprise (noir à 32 % en clair, 50 % en sombre). Un clic sur le voile ferme une fenêtre de création ; il ne ferme ni une alerte ni une procédure.
- Carte : 540 px, centrée, à 56 px du haut, rayon 12, fond `mantle`, ombre modale + filet, marge 18 × 20 px, colonne, écart 12 px, 12 px.
- Titre en 16 px 600 ; à sa suite, en `secondaire`, ce qu'elle concerne (trait du groupe + nom du sous-groupe).
- Corps : formulaire (§ 8.6), segments (§ 1.2), liste à cocher (§ 7.7).
- Un encart d'information reste neutre, avec la marque de ce qu'il concerne (◎).
- Un choix incompatible avec l'état actuel est grisé, la raison en bulle ; une option qui fixe la valeur d'un champ grise ce champ et y montre la valeur imposée.
- Pied (§ 7.8) : commande équivalente en chasse fixe 11 px `secondaire` à gauche ; « Annuler » ; action principale, grisée tant qu'elle est impossible, la raison en bulle.
- Réussite d'une action de fond : la fenêtre se ferme seule après 1,2 s, le résultat passe dans le message d'action (§ 2.7).

### 8.6 Formulaire

Vue : Panneaux › Nouveau projet ; Nouvelle session ; Panneaux › Ordre.

- Champ de texte pleine largeur : libellé au-dessus, 12 px 600 `texte`, en casse normale (jamais en capitales), puis le champ (§ 7.9), écart 4 px.
- Contrôle court (menu, segments, interrupteur) : libellé à gauche dans une colonne fixe (90 px dans une fenêtre modale), contrôle à droite, écart 8 × 10 px.
- Un exemple dans le champ ; la précision derrière ⓘ `secondaire` après le libellé ; « facultatif » en mot 400 `secondaire` après le libellé.
- Sous le champ, seulement un avertissement (`orange`) ou une erreur (`rouge`), 11 px, après une tentative. Jamais d'aide écrite, jamais de message de réussite.
- Une donnée que l'interface n'affiche pas n'a pas de champ.

### 8.7 Alerte à étapes

Vue : Panneaux › Alerte tmux, point 38.

- Une alerte qui propose une réparation en plusieurs temps. Fenêtre modale (§ 8.5) ; le clic sur le voile ne la ferme pas.
- Titre : le fait, en une phrase, 16 px 600 ; dessous en `secondaire`, l'origine (« Démarré par <app> · pid 5275 »), sans capsule.
- Les étapes (§ 7.1, « Arrêt → Relance → Reprise »), puis chaque élément concerné : grille reste · 60 px, écart 8 px, marge 4 × 0, filet haut `separateur` ; nom en chasse fixe, sa conséquence dessous en 11 px (`rouge` s'il perd quelque chose ; « occupé » en `secondaire` s'il retarde) ; à droite, à qui il appartient, en `secondaire`. Pas de légende de couleurs.
- Action bloquée par une autre activité : une ligne ⛨ `orange` qui dit laquelle ; boutons grisés, la raison en bulle.
- Pendant l'action : chaque étape porte son état ; « Plus tard » grisé ; l'action forcée (`rouge`) n'apparaît qu'après le lancement.
- « Plus tard » ferme l'alerte ; le bandeau de la colonne prend le relais.

### 8.8 Fenêtre de composition

Vue : Panneaux › Ordre, point 28.

- Rédiger, signer ou envoyer un objet. Fenêtre propre de 560 px, au thème, rayon 12, ombre modale : feux natifs sur une rangée de 26 px (seule la fermeture est active), puis le corps, marge 6 × 18 × 16 px, colonne, écart 10 px, 12 px.
- En-tête : glyphe de l'action (18 px, son sens en bulle) · titre 16 px 600 · à droite, segments « Nouvel <objet> · Journal ».
- Lignes libellé + contrôle : grille 56 px · reste, écart 8 × 10 px, libellés en `secondaire`. Origine : menu local. Destination : le sélecteur flou (§ 8.1) intégré dans un cadre (rayon 8, filet `separateur`, fond `base`, marge 4 px), au niveau des sous-groupes ou des éléments (un clic sur le champ change de niveau). Mode : segments, ⓘ (l'aide du mode en bulle), échéance en menu local à droite.
- Texte : zone de texte (§ 7.9).
- Pied à droite : « Annuler », action principale (« Signer avec Touch ID »), grisée tant qu'il manque un choix, la raison en bulle. Pas de message avant une tentative.
- Prérequis manquant (clé, accès) : une ligne sous l'en-tête, fond `champ`, rayon 8, marge 6 × 10 px, écart 8 px : icône `rouge`, le manque en 600, le bouton qui le répare (« Recréer la clé »).
- Moyen indisponible (Touch ID) : le bouton passe à la méthode de repli (« Signer avec le mot de passe ») et reste utilisable ; il n'est grisé que si rien n'est possible.
- Réussite : la fenêtre se ferme après 1,2 s, le résultat dans le message d'action (§ 2.7).

### 8.9 Journal d'objets

Vue : Panneaux › Journal des ordres, points 21 et 27.

- Dans la fenêtre de composition (onglet Journal). En tête : « 12 <objets> » en 12 px `secondaire` ; à droite, l'heure de la lecture en `secondaire` puis « Actualiser » en lien `accent`.
- Une ligne par objet : marge 6 × 0, filet haut `separateur` (sauf la première), alignée sur la ligne de base, écart 10 px : chevron `secondaire` (10 px ; › replié, ⌄ déplié) · titre en `texte`, tronqué · « origine → destination » en 11 px `secondaire`, qui se raccourcit d'abord (40 % de la ligne au plus) · état écrit à droite. Les deux textes complets sont dans la bulle.
- État écrit coloré seulement s'il demande attention : valide en `vert`, révoqué en `orange`, refusé en `rouge` ; consommé, expiré en `secondaire`.
- Clic : la ligne se déplie, retrait 20 px : grille de métadonnées 62 px · reste, 11,5 px (libellé `secondaire`, valeur ; identifiant en chasse fixe), marge 4 × 0 × 6 px ; le texte complet en chasse fixe 11 px, fond `champ`, rayon 6, marge 6 × 8 px ; une action destructrice (« Révoquer… ») en lien `rouge` à droite, confirmée en bulle (§ 3.7). Un seul objet déplié à la fois.
- Pas de lignes à deux étages, pas de capsules d'état.

### 8.10 Liste des raccourcis et clavier dessiné

Vue : Réglages › Clavier, point 1 ; G § 9.7.

- ⌘ maintenu 1 s, seul : un panneau au centre de la fenêtre, sans voile ; relâcher ⌘ le ferme.
- Panneau : 660 px (94 % au plus), marge 14 × 18 × 16 px, rayon 10, ombre flottant + filet.
- Clavier dessiné (AZERTY, centré, marge 8 × 0 × 4 px) : trois rangées, chacune décalée de 14 px de plus que la précédente ; touches de 44 × 32 px, rayon 5, écart 3 px, 11 px, interligne 1,1. Touche de l'application : fond `teinte` d'`accent`, lettre en `accent` 600, son rôle dessous en 8,5 px 500. Touche libre : fond `champ`, opacité 0,9. Touche laissée à macOS : fond `champ`, lettre en `secondaire`, opacité 0,45.
- Dessous, 10 px au-dessus : trois colonnes (Voir et insérer · Agir · Fenêtre), écart 4 × 22 px. Titre de colonne en petites capitales 10,5 px 600 `secondaire`, marge 4 × 0 × 6 px. Ligne : marge 3 × 0, écart 8 px ; l'action, puis la touche à droite : chasse fixe 11 px, marge 1 × 7 px, rayon 5, fond `champ`, sans ⌘ (déjà tenu).
- Réglages › Clavier dessine le même clavier, avec les mêmes valeurs.

### 8.11 Panneau de procédure lourde

Vue : Redémarrage (Préparation, Audit, Relecture, Accusé, Fin). Règles : G § 7.11.

- **Préparation** : fenêtre modale (§ 8.5). Titre « <Action> · <objet> » ; section « <Éléments> remplacés » : une ligne par élément, marge 3 × 0, filet bas, écart 8 px : nom et marques (⇄, ◎) · état (`orange` si occupé : « au travail » ; sinon `secondaire`) · taille à droite dans une colonne de 150 px, `secondaire` (« vif 18 Mo · mort 240 Mo »). Puis « Lus : » et les dossiers en chasse fixe, 11,5 px `secondaire`. Puis les options : champ du nouveau nom, case à cocher décochée (« Élément maître »), interrupteur de relecture. Pied : commande équivalente, « Annuler », action principale (Régie : « Lancer l'audit »). Un refus s'écrit en `rouge` sous le titre, avec sa raison.
- **Gel** : du lancement à la fin, `voile` sur toute la fenêtre, barre de titre comprise ; le panneau au centre.
- **Panneau** : 760 × 520 px (94 % de la largeur et 92 % de la hauteur au plus), rayon 12, fond `mantle`, ombre modale + filet, 12 px. En-tête : marge 14 × 18 × 10 px, filet bas, écart 10 px ; « <Action> · <objet> » en 16 px 600, « depuis 15:04 » en `secondaire`. Corps : grille 170 px · reste, écart 14 px, marge 12 × 18 px. Pied : marge 10 × 18 px, filet haut, écart 8 px.
- À gauche, les étapes en colonne (§ 7.1). À droite, le journal en direct.
- **Journal** : 11,5 px ; une section par étape : chevron, titre en 600 et nombre d'actions en `secondaire` 400, marge 3 × 0 ; l'étape en cours dépliée, les autres repliées. Une ligne par action, retrait 16 px, marge 2 × 0, écart 8 px, interligne 1,45 : l'heure en chasse fixe 10,5 px `secondaire`, puis « <sous-étape> » en 600 · une phrase ; chemins en chasse fixe ; nombres en clair. L'action en cours en `accent`, précédée d'une roue (« ◌ … en cours… »).
- **Relecture** : grille 150 px · reste, écart 12 px. À gauche, la liste des fichiers en lignes de panneau (nom en chasse fixe 11 px, nombre de lignes ou compte en 11 px `secondaire` à droite ; celui qui pose des questions en `orange`). À droite, l'aperçu défilant du fichier choisi : chasse fixe 11 px, interligne 1,45, fond `champ`, rayon 8, marge 10 × 12 px. Pied : « Annuler » à gauche ; « Ouvrir dans le Finder », « Continuer » (principal) à droite.
- **Verdict** : centré, écart 8 px : ✓ `vert` 28 px (≈ `orange` partiel, ✗ `rouge` refusé), « <Objet> valide » en 16 px 600, le score en `secondaire` ; le détail des vérifications dans la bulle du verdict. Pied : « Annuler » à gauche ; « Renvoyer les corrections », « Terminer » (principal).
- **Fin** : « <Fait> à 15:22 » en 16 px 600 ; une ligne de bilan en `secondaire` (« 3 éléments remplacés · 316 Mo libérés · durée 18 min ») ; le journal. Pied : « Ouvrir le journal », « Copier » à gauche ; « OK » (principal) à droite.

---

## 9. Vue d'entité

Vue : Forge (onglets Tableau de bord, un par rôle, cible ; bascule allumé · éteint), points 30 et 37.

La vue du centre pour une entité qui regroupe plusieurs éléments.

- **En-tête** (anatomie de l'en-tête de fiche, § 4.1) : trait du groupe 2 × 16 px · nom en 16 px 600 (`secondaire` si l'entité est éteinte) · état écrit en `secondaire` (« ● allumé · lu à 23:32 », point `vert` ; point `rouge` si la dernière lecture a échoué ; « contrat 1.3 > <app> » en `orange`, bulle « mettre <app> à jour » ; G § 3.6) · à droite, boutons « Ouvrir avec… ⌄ » (§ 3.10), l'action principale (« ⏻ Éteindre »), « ⋯ ».
- Description d'une ligne (§ 4.1) ; ligne de métadonnées `secondaire` : les emplacements (« cible <chemin> · copie de <chemin> · conteneur <nom> »), puis les liens vers les éléments liés (« racine ↗ <nom> » en `accent`, un par élément). Pas de barre de navigation au-dessus : la colonne navigue.
- **Onglets** (§ 4.2) : « Tableau de bord », un par élément (pastille de 8 px ; ⚠ `orange` après le nom si alerte), puis les surfaces annexes (« cible »). Onglet d'un élément : sa surface, en lecture seule par défaut (§ 2.3).
- **Tableau de bord** (corps de fiche, § 4.3 ; sections en petites capitales, résumé ou action à droite du titre) :
  - étapes (§ 7.1) avec un résumé chiffré (« à rapatrier 3 · rapatriés 0 · appliqués 0 ») ;
  - progression : barre de tranches (§ 7.1) et sa ligne `secondaire`, action « Page de décision… » ;
  - tableau des éléments (§ 5.5 : pastille et nom en 600, état `secondaire`, travail en cours tronqué, micro-jauge `secondaire`) ; couleur seulement hors norme ; l'ordre de la chaîne en `secondaire` à droite du titre ;
  - « À regarder » et son compte : alertes regroupées par motif (« 20 éléments réécrits » = une ligne) ; ⚠ `rouge` ou `orange`, le motif en 600, l'action en `accent` à droite (« Voir les 20 ⌄ », « Autoriser… ») ;
  - « Archives N ⌄ », repliée en bas ;
  - « Dernière action » avec « Journal ⌄ » : ✓ `vert`, la commande en chasse fixe et son effet, l'heure à droite en `secondaire`.
- Lecture : « lecture… » en `secondaire` à la place de l'heure ; erreur : « lecture impossible » en `rouge`, la raison en bulle.
- **Entité éteinte** : état vide (§ 2.6) : « <Entité> est éteinte », une ligne `secondaire`, « ⏻ Allumer » (principal) et « Reprendre sans s'attacher », puis la dernière action en 11 px. Élément sans conteneur : « <Élément> n'a pas de conteneur », « Reprendre <élément> » (principal) et « ⏻ Allumer <l'entité> ».
- Tuiles et capsules : chiffres seuls, couleur si anormal.
