# Gabarit d'interface

Modèle d'interface pour toutes les applications de l'utilisateur. Une session qui démarre un projet lit ce document, puis `COMPOSANTS.md`, et applique d'office ce qu'ils décrivent : aspect, comportement et fonctionnel. Elle n'en dévie que si l'utilisateur le demande explicitement pour ce projet.

Fichiers du gabarit :

| Fichier | Contenu |
|---|---|
| `GABARIT.md` (ce fichier) | Principes, règles générales, couleurs, opacités, ombres, typographie, géométrie, mouvement, structure de fenêtre, panneaux, textes, comportements transversaux, accessibilité, liste de conformité, méthode, motifs exclus, écarts connus de la maquette, points ouverts. |
| `COMPOSANTS.md` | Catalogue des composants : anatomie, mesures, états, comportement. |
| `jetons.json` | Jetons de couleur résolus pour les 11 palettes autorisées, en clair et en sombre. |

Référence visuelle : la maquette de Régie, `atelier/regie-lisibilite.html` dans le dépôt `ov-regie-refactorUI` (s'ouvre dans un navigateur, sans réseau). Chaque composant de `COMPOSANTS.md` indique la vue de la maquette où il est visible. La maquette fait foi pour tout rendu que ces deux documents ne chiffrent pas. Là où la maquette emploie plusieurs valeurs pour une même chose (rayons, ombres, voiles, graisses, tailles de titre…), la spécification en **conseille** une ; ces écarts sont listés au § 14.

Vocabulaire : le gabarit parle de **groupe** pour ce que Régie appelle un royaume (un ensemble d'éléments qui partagent une couleur d'identité), d'**élément** pour une ligne de liste (une session dans Régie), de **fiche** pour le panneau de détail d'un élément ou d'un groupe.

### Correspondance des termes : à faire pour chaque application

Le gabarit emploie des termes génériques. **Chaque application qui l'applique commence par écrire sa propre table de correspondance** (terme du gabarit → objet de son domaine), la place en tête de son cahier des charges, puis nomme ses écrans et son code avec ses propres termes. Un terme du gabarit sans équivalent dans l'application est simplement ignoré (pas de Visor, pas de barre de budget…).

Exemple : la table de Régie, l'application dont ce gabarit est tiré. Elle sert aussi à lire la maquette de référence, qui montre Régie.

| Gabarit | Régie |
|---|---|
| groupe | royaume |
| couleur de groupe | couleur de royaume (registre d'Overview `couleurs-realms.json`) |
| sous-groupe | projet |
| élément | session (Claude Code, dans tmux) |
| conteneur d'un élément | session tmux ; « hors de son conteneur » = hors tmux |
| entité (en-tête d'entité) | chantier Forge, machine distante |
| vue d'entité | tableau de bord d'un chantier Forge |
| machine | machine distante (entité à icône d'ordinateur) |
| élément distant (tourne sur une autre machine) | session distante |
| élément maître | session maîtresse (◎) |
| doublon | homonymes |
| surface principale | terminal libghostty |
| modes du centre | Terminal (⌘1), Carte (⌘2), Moniteur (⌘3) |
| fiche | fiche projet (onglets Aperçu, Mandat, Liens, Câblage, Session) |
| bandeau de type | sessions à liseré (maîtresse, écriture, lecture seule, homonyme) |
| carte d'état de la surface | cartes « hors tmux », « terminée », « Aucune session vivante », « introuvable » |
| message d'action | message d'action en bas à droite du centre |
| sonde | relevé du Moniteur (fichiers, ssh, agents, conso) |
| barre de budget | budget du contexte injecté par Overview |
| bande de répartition | « Qui consomme · 5 h » |
| capsule d'attribut | capsule « scripts » (projet qui injecte des scripts) |
| icône de service | relai |
| sélecteur flou | complétion projet/session (⌘P) |
| sélecteur liste et aperçu | sélecteur `@@@` (⌘L) |
| bande de médias | sélecteur de captures (⌘I) |
| demande en attente (panneau de saisie, pile) | mot de passe sudo (askpass) |
| fenêtre de composition | Ordre signé (⌘O) |
| journal d'objets | journal de l'Ordre |
| alerte à étapes | alerte tmux (arrêt, relance, reprise) |
| procédure lourde | redémarrage à neuf |
| feuille de diagnostic | diagnostic d'une machine (Réglages › Relai › Machines) |
| plugin | Forge (plugin optionnel) |
| registre de référence | manifeste d'Overview (« hors manifeste ») |
| dossier de travail | `~/.regie/` |
| variables de banc | `REGIE_DEMO_*`, `REGIE_ESSAI_*` |
| point d'entrée de la barre des menus | icône Régie (remplace Claudetop et Overview) |
| application qui descend du bord | Visor |
| mesure (quota) | quota 5 h et 7 j de l'abonnement Claude |

---

## 1. Principes

Ils priment sur tout le reste. Quand un cas n'est pas prévu, on le résout en les appliquant.

1. **Le contenu d'abord.** La surface de travail principale (terminal, document, carte, tableau) occupe l'essentiel de l'écran. Tout le reste se replie, se rétracte en rail ou s'ouvre sur demande. La colonne est le seul lieu de navigation entre éléments et entités : pas de seconde barre de navigation au-dessus du centre. Un lien vers un élément lié s'écrit dans l'en-tête de la vue (C § 9).
2. **Trait 2 px.** La couleur est portée par un seul signe fin : un trait de 2 px, un point, une petite icône. Jamais par un fond plein, un cadre coloré, un relief, une ombre colorée ou un paragraphe en couleur. Seules exceptions, en teinte légère (§ 3.5) : le bandeau de type (C § 2.3), la capsule d'état d'une mesure (C § 5.1), la capsule d'attribut (C § 5.8).
3. **Couleur si anormal.** Un état normal est neutre (texte, gris). La couleur n'apparaît que lorsqu'il y a quelque chose à voir : seuil dépassé, attente, erreur. Un écran où tout va bien est presque monochrome. Exceptions nommées : la couleur d'identité d'un groupe (§ 3.4), le point `vert` d'une entité allumée (C § 1.10), la catégorie coûteuse d'une bande fine de répartition (§ 7.12).
4. **Hiérarchie par la typographie et l'espace.** Taille, graisse, petites capitales et espacement organisent l'écran. Pas de boîtes imbriquées, pas de séparateurs superflus.
5. **Actions secondaires au survol.** Les boutons d'une ligne (ouvrir, ajouter, reprendre, ⌖) n'apparaissent qu'au survol de la ligne. L'action principale d'une vue reste visible.
6. **Lean & clean : pas de phrase d'explication.** Aucune légende explicative, note, mode d'emploi ou rappel de raccourci dans l'interface. Un libellé court suffit. Le détail (définition, chemin complet, unité, source d'une valeur) passe dans une bulle au survol. Le raccourci d'une commande s'écrit dans son infobulle (§ 9.3), jamais à côté d'elle. Deux exceptions, seulement elles : la synthèse « En clair » d'une mesure (C § 5.9), qui est du contenu et pas une aide ; le pied d'un sélecteur liste et aperçu, qui rappelle ses deux touches propres (« ↵ insérer · ⇥ compléter », C § 8.2).
7. **Un signe par information.** Une information n'est dite qu'une fois. On ne cumule pas couleur, forme, mot et animation pour le même état, sauf l'anneau animé des pastilles (C § 1.7) et l'anomalie d'un élément maître (C § 1.8), qui cumulent couleur et mouvement pour ne pas passer inaperçus.
8. **Une seule grammaire.** Un même type d'objet a le même rendu partout : un en-tête de groupe, de chantier ou de machine distante suit la même anatomie (trait, nom, N/M, état écrit, action au survol). Un attribut d'élément (maître, distant, doublon, en attente) a une seule marque, la même partout où l'élément apparaît : colonne, onglets, en-tête de la surface, fiche, carte, tableaux, sélecteurs, panneaux. La règle qui va avec l'attribut ne s'écrit qu'une fois, dans la bulle de sa marque.
9. **Le système d'abord.** Comportements standard de macOS chaque fois qu'ils existent (renommer comme le Finder, réglages comme les Réglages Système, barre d'outils macOS, raccourcis usuels).
10. **Choix tranchés.** Pas d'option de réglage pour un choix de design ; un réglage n'existe que pour une préférence réelle de l'utilisateur (taille de police, rythme de rafraîchissement). Une nouvelle application n'a aucun réglage de ce genre ; les deux de Régie (modes affichés ou seules exceptions ; flèche ou anneau d'une version en retard) restent propres à Régie.
11. **Impossible = grisé, raison en bulle.** Une action qu'on ne peut pas faire maintenant reste à sa place, grisée (§ 3.5) ; sa bulle dit pourquoi (« Aucun élément sélectionné »). On ne la cache pas, on n'ouvre pas une vue vide, on n'affiche pas de message d'erreur à l'avance.
12. **On ne parle que des problèmes.** Pas de message de réussite (« Nom disponible. »), pas de message d'erreur avant que l'utilisateur ait tenté quelque chose. Une erreur apparaît après la tentative, à l'endroit où elle se corrige.
13. **Lisible sans apprendre.** Un signe d'attribut rare se comprend au premier regard : glyphe et mot court (une seringue dessinée au trait suivie de « scripts »), pas une petite icône seule et ésotérique. Le reste (où, combien, pourquoi) va dans sa bulle.
14. **Ce qui ne s'affiche pas ne se demande pas.** Une donnée que l'interface ne montre pas n'a pas de champ de saisie ; elle garde dans les données sa valeur par défaut.
15. **Style neutre.** L'interface ne s'adresse à personne : ni tutoiement ni vouvoiement, ni impératif. Infinitif pour une action, nom ou participe pour un état (§ 2.3).

---

## 2. Règles générales de l'utilisateur (valables pour tous les projets)

### 2.1 Thème de couleur : dotlib

- Toutes les machines de l'utilisateur suivent un réglage maître posé par `brc theme` (dotlib), écrit dans `~/.dotlib/local/theme.conf` :
  - `DOTLIB_PALETTE` : nom de la palette ;
  - `DOTLIB_THEME` : `auto` (suit l'apparence de macOS), `clair` ou `sombre`.
- Les valeurs exactes des palettes sont dans `~/.dotlib/share/palettes.tsv` (source de vérité, lecture seule). Copie mise en forme : `sources/palettes-dotlib.md` du dépôt `ov-regie-refactorUI`.
- **Palettes autorisées, et seulement elles** : catppuccin, gruvbox, nord, solarized, tokyonight, everforest, edge, lucius, papercolor, pencil, xterm. Chacune en clair et en sombre.
- Toute application lit ce réglage et peint toute son interface avec la palette en service : fonds, textes, accent, statuts, couleurs de groupe, terminal intégré. Elle n'a **aucune couleur propre** en dehors des jetons et des couleurs fixes de § 3.1.
- Terminal intégré : fond `base`, texte `texte` ; ses 16 couleurs ANSI suivent la palette dotlib en service, jamais des couleurs ANSI fixes. dotlib ne définit pas de couleurs ANSI : elles se tirent des jetons (`jetons.json`, `terminal.ansi`) : rouge, vert, jaune, bleu, magenta, cyan = les couleurs de la palette ; noir = `separateur` ; blanc = `secondaire` ; noir vif = mélange à parts égales de `separateur` et `secondaire` ; blanc vif = `texte` ; couleurs vives = couleurs normales.
- tmux : le fond posé par l'application sur ses sessions est `mantle` de la palette en service, jamais une valeur en dur. Dans l'application qui descend du bord (§ 7.9), `window-style` et `window-active-style` passent à `bg=default`.
- Réglage de l'application (Réglages › Général › Apparence) :
  - **Palette** : menu local, « dotlib (catppuccin) » par défaut (suit `DOTLIB_PALETTE`), puis les 11 palettes pour forcer l'une d'elles ;
  - **Apparence** : Système (défaut, suit `DOTLIB_THEME`), Clair, Sombre.
- Le changement de palette ou d'apparence s'applique à chaud, sans relancer ; un bref clignotement de la surface principale (rattachement du terminal) est accepté.
- Rôles dotlib utilisés : `num`, `date`, `text`, `key`, `path`, `bad`, `note`, `ok`, `surface`, `text_on_surface`, `crust`. Rôles à ajouter à dotlib pour couvrir les fonds et les teintes manquantes : `bg`, `bg_alt`, `warn`, `accent2`, `accent3`. Tant qu'ils n'existent pas, les valeurs de repli sont celles de `jetons.json` (palette d'origine).

### 2.2 Polices

- Interface : police système de macOS (SF Pro), jamais une police décorative. IBM Plex est exclue.
- Texte à chasse fixe (terminal, journaux, chemins, code) : police patchée par `fontpatch` (famille « … Pastilles »). Défaut : **JetBrains Mono Pastilles en graisse 300 (fine)**. La liste est ouverte : le menu offre chaque famille « … Pastilles » installée par `fontpatch` sur la machine, en régulière et en fine quand la graisse existe (SF Mono : régulière et Light) ; une famille non patchée n'est pas proposée. Sans aucune police patchée : SF Mono. Tranché le 27 oct. (point 41 de la maquette).
- Taille du texte à chasse fixe : réglable de **10 à 14 pt**, défaut **12 pt** ; « A− 12 A+ » à droite de la barre d'onglets ; ⌘− et ⌘+.
- Police et taille du texte à chasse fixe se règlent dans Réglages › Général › Apparence, sous Palette et Apparence.
- En graisse fine (300) sur fond sombre, les vues de référence ne descendent pas sous 11 pt ; 10 pt reste permis par le réglage.

### 2.3 Langue et typographie

- Interface en français. Typographie française : espace insécable avant `:` `;` `!` `?` et à l'intérieur des guillemets « » ; apostrophe typographique ’ ; points de suspension … ; tiret demi-cadratin pour les intervalles (10–14).
- **Style neutre, partout.** Ni tutoiement ni vouvoiement, nulle part : interface, bulles, messages, atelier. Une action s'écrit à l'infinitif (« Choisir la session cible », « Saisir un nom »), un état par un nom ou un participe (« accord attendu », « 99 % de la semaine utilisés », « texte saisi »). Pas de « tu », « ton », « vous », « votre », ni d'impératif (« Choisis », « Choisissez »).
- Nombres à la française : `39 901`, `0,44 $`, `2,6 Mo`, `12 %` (espace insécable avant l'unité et le %). Chiffres tabulaires dans les colonnes et compteurs.
- Dates : heure seule pour aujourd'hui (`23:58`), « Hier 23:58 » pour la veille, puis `22 oct. 23:58` ; jour de la semaine pour une échéance proche (`jeu. 13 h`). Ancienneté : `il y a 5 s`, `il y a 3 min`, `vu il y a 3 min`. Heure d'un relevé ou d'une lecture : `lu à 23:32`, `relevé 01:08`. Durées : `1 h 29`, `28 min`, `11 s`.
- Un libellé d'action qui ouvre une fenêtre ou demande une confirmation finit par « … » (« Révoquer… », « Diagnostiquer… »), comme dans macOS. Un état en cours aussi, en `secondaire` (« lecture… », « actualisation… »).
- Pas d'anglais quand un mot français existe ; on garde tels quels les noms propres, les noms de commandes, de fichiers, de hooks et d'événements (`PreToolUse`, `settings.json`).

### 2.4 Couleurs réservées

- **Vert, jaune, orange, rouge** sont réservés aux statuts. Aucun groupe, aucune décoration ne les utilise.
- Exception nommée : le bandeau de type (C § 2.3) prend `orange` quand le type appelle la vigilance (écriture, doublon). L'élément maître prend `accent` : `jaune` reste à la question. Un type passif prend une teinte froide (lecture seule : `slate`).
- Les groupes prennent des teintes froides : `blue`, `cyan`, `teal`, `lavender`, `purple`, `slate` (§ 3.4).
- Une teinte froide peut aussi porter un attribut fixe d'un élément, à condition que ce soit une marque (glyphe, pointillé, trait de bord de ligne) et jamais le trait plein de 2 × 12 px réservé au groupe : élément distant `teal` (C § 1.8), mode sûr `teal` ou `lavender` (C § 1.6), demande en attente `cyan` (§ 9.5). Un élément d'un groupe de même teinte que sa marque (groupe `teal` sur un élément distant) reste lisible : la forme distingue la marque (pointillé, glyphe) du trait plein du groupe. Sur une ligne, le pointillé occupe le bord gauche ; le trait d'accent plein le remplace quand la ligne est sélectionnée, « ⇄ » reste.
- Pas de rose ni de magenta : la plupart des palettes ne les distinguent pas du violet des groupes. Quand deux statuts doivent se distinguer, on change la forme (losange), pas la teinte.

### 2.5 Barre des menus de macOS

- Une famille d'applications n'a qu'**un seul point d'entrée** dans la barre des menus : une icône monochrome qui suit la couleur de la barre, porte au plus un nombre (ce qui attend l'utilisateur) et un anneau de jauge qui ne se colore qu'en alerte. Le menu reprend l'essentiel ; tout le reste vit dans la fenêtre de l'application.
- Menu, de haut en bas : les éléments qui attendent l'utilisateur (titre en petites capitales ; une ligne par élément : pastille, nom, raison en `secondaire`) ; la mesure principale (barres et ligne d'état) ; la répartition (trois premiers) ; l'alerte éventuelle ; puis « Ouvrir <app> », les modes utiles avec leur raccourci, l'application qui descend du bord (F12). Mise en forme : § 7.7.

### 2.6 Application macOS

- Cible : application macOS en SwiftUI (AppKit quand SwiftUI ne suffit pas : NSVisualEffectView, fenêtres non opaques).
- Fenêtre principale : fenêtre native (feux, ombre et coins de macOS). Barre de titre sans titre sous macOS 15 et plus (les capsules suffisent) ; sous macOS 14, nom de l'application et sous-titre. Taille minimale : fixée par chaque application selon son contenu (Régie : 1120 × 640).
- Toutes les préférences dans `UserDefaults`, sous le préfixe de l'application (`regie.…` pour Régie).
- Toute refonte livre la liste des clés `UserDefaults` ajoutées, modifiées et retirées, avec leurs défauts (`reglages.json` à côté du cahier des charges). Une clé renommée est migrée au premier lancement ; une clé retirée est effacée.
- Données de travail de l'application (journaux, sauvegardes, dossiers temporaires) : `~/.<app>/`, dans le dossier personnel, sans espace dans le chemin. Pas `~/Library/Application Support/`, qui gêne les scripts shell.
- Une fonction lourde ou propre à un usage est un **plugin** optionnel, non installé par défaut. Ses réglages vivent dans Réglages › Plugins › <nom> (« installé · 1.4 », « Désinstaller » ; non installé : « Installer… » ; « Activer »). Absent ou désactivé, tout ce qu'il ajoute disparaît de l'interface (zones, icônes du rail, bandeaux, lignes d'alerte, vues) ; sa page de réglages reste. Sans plugin installé, la section Plugins reste visible : « Aucun plugin installé ».
- L'application accepte des variables d'environnement de banc (`<APP>_DEMO_*`, `<APP>_ESSAI_*`) qui forcent un état (alerte, refus, demande en attente) ; l'état forcé prend exactement le rendu cible, pour les captures et les tests.

---

## 3. Couleurs

### 3.1 Jetons

Tous les rendus utilisent ces jetons, jamais une valeur en dur. Valeurs pour chaque palette et chaque apparence : `jetons.json`. Le code cite les jetons par ces noms (pas `warn` pour `orange`, pas `blue` pour `accent`).

| Jeton | Rôle dotlib (sinon palette d'origine) | Usage |
|---|---|---|
| `base` | (palette : base) | Fond de la surface principale, du terminal, des cartes posées, d'un champ de saisie. |
| `mantle` | (palette : mantle) | Fond de la colonne latérale, des fiches, des bulles, des menus, des panneaux, des fenêtres modales. |
| `crust` | `crust` en sombre (palette : crust en clair) | Barre de titre, barre d'onglets, onglet inactif. |
| `champ` | sombre : `surface` ; clair : `crust` | Fond des champs de filtre, segments, capsules, survol. |
| `separateur` | `surface` | Filets de 1 px, bordures de bulles, pistes vides. |
| `texte` | `text_on_surface` | Texte principal. |
| `secondaire` | `text` | Texte secondaire, libellés, métadonnées, titres en petites capitales. |
| `accent` | `date` | Sélection, focus, actions textuelles, onglet actif, interrupteur actif, bouton principal. |
| `surAccent` | (= `base`) | Texte posé sur l'accent (jeton de filtre, bouton principal). |
| `segmentActif` | clair : `base` ; sombre : `separateur` | Fond du segment actif. |
| `selection` | `accent` à 13 % (clair) / 20 % (sombre) | Fond de la ligne sélectionnée, de l'élément choisi dans un menu ou une liste. |
| `teinte` | couleur de la marque à 14 % (clair) / 18 % (sombre) | Seule teinte de fond sous un texte coloré (§ 3.5). |
| `voile` | noir à 32 % (clair) / 50 % (sombre) | Sous une fenêtre modale (§ 3.7). |
| `vert` | `ok` | Succès, fin de tour, étape faite. |
| `jaune` | (palette : yellow) | Question en attente. |
| `orange` | `note` | Attention, autorisation en attente, seuil, plafond. |
| `rouge` | `bad` | Erreur, échec, dépassement, blocage. |

- `teinte` et `selection` se calculent à partir d'un jeton ; `jetons.json` les donne pour l'accent (`accent.teinte`, `accent.selection`), avec `fonds.segmentActif` et `fonds.voile`.
- Couleurs fixes, hors palette, et seulement elles : blanc pour le texte d'un badge posé sur un statut ou sur `accent`, pour le bouton d'un interrupteur et pour une marque posée sur une image ; noir pour les voiles et les ombres (§ 3.7) ; feux de fenêtre, ombre de fenêtre et matériau du menu de la barre des menus, fournis par macOS.

### 3.2 Usage

- Fonds : trois niveaux seulement (`base`, `mantle`, `crust`) plus `champ`. Pas de dégradé, pas de texture (sauf le Visor, § 7.9).
- Texte : deux niveaux (`texte`, `secondaire`). Un troisième niveau s'obtient par la taille ou les petites capitales, pas par une troisième couleur.
- Tout ce qui s'ouvre par-dessus (bulle, menu, panneau, sélecteur, fenêtre modale) prend les fonds de la palette : `mantle`, ombre et filet. Jamais de contraste inversé (panneau sombre sur une interface claire, ou l'inverse).
- Opacités et teintes : § 3.5. Ombres et voiles : § 3.7.
- Un nom d'élément est en couleur du texte, jamais en bleu. Le bleu (accent) signale une action ou la sélection.

### 3.3 Statuts

| Statut | Jeton | Exemples |
|---|---|---|
| Normal | aucun (texte, secondaire) | valeur dans la norme, élément au repos |
| Fait, succès | `vert` | étape faite, fin de tour, hook câblé, objet valide |
| Question en attente | `jaune` | l'élément pose une question |
| Attention | `orange` | autorisation demandée, seuil de surveillance, version en retard, plafond proche, arrêt en cours (compte à rebours), droit révoqué, identité inconnue |
| Erreur, blocage | `rouge` | perte d'API, échec, quota plein, valeur coupée, accès refusé, signature fausse |

Seuils : deux paliers par défaut (surveillance → `orange`, critique → `rouge`). Une mesure continue qui monte par degrés (charge, quota) en a un de plus, `jaune`, avant `orange`. Les seuils sont écrits dans la bulle de la mesure (« seuils 8 Mo à surveiller, 15 Mo critique ») et se règlent dans la page de réglages de la vue (§ 9.8).

### 3.4 Couleurs de groupe

- Douze noms autorisés, les mêmes dans toutes les palettes : `blue`, `indigo`, `lavender`, `purple`, `magenta`, `pink`, `brown`, `olive`, `mint`, `teal`, `cyan`, `slate`, résolus dans la palette en service (`jetons.json`, clé `groupes`, douze entrées par apparence). On stocke le **nom**, jamais la valeur. Tranché le 23 oct. (banc : `atelier/nuancier-12.html` de la maquette).
- Résolution d'un nom dans une palette : un rôle dotlib de la même famille (bleu, cyan, violet, gris) pris tel quel quand sa teinte est à 20° de la teinte cible du nom ; sinon une teinte composée en OKLCH à la teinte cible, à la clarté et au chroma médians des accents de la palette (chroma 0,06 au moins, 0,035 pour `slate`), clarté poussée jusqu'au contraste 3 sur `base` et `mantle`. Les couleurs qui ne sont pas un rôle dotlib s'écartent ensuite jusqu'à ΔE 2000 ≥ 10 entre elles et avec les statuts. Les valeurs sont écrites dans `jetons.json` ; l'application lit, ne calcule pas.
- Un nom hors de cette liste (ancien registre) se replie : `crimson` → `magenta`, `coral` → `brown`, `amber` → `olive`, `lime` → `mint` ; tout autre nom sur le plus proche des douze.
- Pas de groupe en vert, jaune, orange ou rouge.
- Nouveau groupe : la couleur proposée par défaut est celle des douze qui est la plus éloignée de celles déjà prises (distance perceptuelle dans la palette en service). But : maximiser le contraste entre groupes.
- Un groupe sans couleur : `secondaire`.
- Rendu : **trait vertical de 2 × 12 px**, rayon 1 px, devant le nom du groupe ; même trait devant chaque élément du groupe dans les tableaux, la carte, les sélecteurs, la statusline, les réglages ; **2 × 16 px** en tête de fiche et de vue d'entité. Jamais un point, jamais un trait plus épais, jamais un fond teinté ; jamais un trait horizontal, sauf dans le rail (10 × 2 px sous l'icône, faute de place, C § 1.11). Seule exception de couleur : une bande de répartition (consommation par élément) où chaque part prend la couleur de son groupe (C § 5.3).
- Réglages › Groupes : une ligne de réglage par groupe (trait de groupe, nom, menu de couleur). Le menu nomme la couleur en français suivie du nom stocké (« Lavande (purple) »), montre les douze teintes résolues dans la palette en service, clair et sombre côte à côte, sur **deux colonnes de six**, puis sur une seule ligne « Réservées aux statuts » : les quatre pastilles (vert, jaune, orange, rouge) grisées et non sélectionnables, leur usage en bulle. Le menu s'ouvre vers le haut quand la place manque dessous, jamais hors de la fenêtre (point 42, 27 oct.). Ligne « + Nouveau groupe · proposée : Bleu », la raison de la proposition en bulle. « Défaut » apparaît quand une couleur a été choisie à la main. Un groupe absent du registre de référence : « hors <registre> » en `secondaire`, menu grisé. Sous la liste, section « Aperçu » : deux aperçus en direct de la colonne (titre de zone, un groupe par ligne avec son trait), l'un en thème clair, l'autre en sombre, dans la palette en service ; ils suivent chaque changement de couleur.

### 3.5 Opacités et teintes

Opacités conseillées : une application qui s'en tient à cette liste garde le style. Elles s'appliquent à un jeton (ou au noir des voiles), jamais à une couleur en dur.

| Opacité | Jeton | Usage |
|---|---|---|
| 10 % | `accent` | aplat sous une courbe |
| 13 % / 20 % (`selection`) | `accent` | ligne sélectionnée ; élément choisi dans un menu ou une liste ; survol d'un bouton de format ou d'un élément de menu |
| `selection` à moitié | `accent` | sélection estompée (§ 9.5) |
| 14 % / 18 % (`teinte`) | couleur de la marque | fond sous un texte coloré : bandeau de type, capsule d'état, capsule d'attribut, touche de l'application sur le clavier dessiné |
| 35 % | `secondaire` | barres neutres d'un graphique |
| 45 % | contrôle entier | contrôle désactivé ou réservé : bouton, élément de menu non sélectionnable, touche réservée à macOS |
| 50 % | `secondaire` | icône inactive, trait de poignée |
| 50 % | `orange` | barre au-delà de la référence dans un graphique horaire |
| 55 % | `accent` | période en cours d'un graphique |
| 55 % | couleur de groupe | deuxième part d'un même groupe dans une bande de répartition |
| 60 % | `orange`, `rouge` | barre au-delà d'un seuil dans un graphique par période |
| 60 % | `secondaire` | plafond et grille de 100 % d'un graphique, poignée de la fenêtre qui descend du bord |
| 70 % | `secondaire` | tirets de la valeur attendue sur une courbe |
| 85 % | couleur de groupe | parts d'une bande de répartition |
| 85 % | statut | valeur anormale d'une tuile |
| 25 % | marque d'anomalie | point bas de la pulsation d'une marque d'anomalie (§ 6) |
| 70 % | `base` | halo du texte de la fenêtre qui descend du bord (§ 7.9) |
| 75 % / 100 % | couleur de famille | trait d'un lien de la carte ; 100 % s'il touche l'élément choisi (C § 6.2) |
| 90 % | `champ` | touche libre du clavier dessiné (C § 8.10) |
| 32 % / 50 % (`voile`) | noir | voile sous une fenêtre modale (clair / sombre) |

- **Désactivé** : le contrôle entier (fond, texte, icône) passe à 45 % d'opacité ; sa bulle dit pourquoi (principe 11). Pas d'autre rendu du désactivé.
- **Sourdine**, pour les graphiques, les tuiles et les capsules d'une mesure : une petite marque (texte, point, trait fin) prend la pleine couleur d'état ; une surface (barre, aplat, fond de capsule) la prend à 50–60 %, ou en `teinte` sous un texte coloré. Hors des mesures (barres de mesure, micro-jauges, fonds de capsule), la pleine couleur reste la règle.
- Opacités propres à la fenêtre qui descend du bord (verre, dégradé, fond opaque) : § 7.9.

### 3.6 États d'une donnée lue

Toute valeur qui vient d'une source (fichier, relevé, réseau) a ces états, rendus partout de la même façon.

| État | Rendu |
|---|---|
| lecture en cours | « lecture… » ou « actualisation… » en `secondaire`, à la place de l'heure ou du lien |
| lue | « lu à 23:32 » ou « relevé 01:08 » en `secondaire` |
| ancienne | l'heure en `orange` ; valeurs en `secondaire` ; « relevé ancien » en bulle |
| absente | jauge ou anneau vide ; « inconnu » en bulle ; « aucun relevé » en `secondaire` à la place des tuiles |
| illisible | ⚠ `orange` « illisible », la raison en bulle |
| erreur de lecture | « lecture impossible » en `rouge`, la raison en bulle |
| format plus récent que l'application | « format 1.3 > <app> » en `orange`, bulle « mettre <app> à jour » |
| vide | « Pas de <chose> » ou « Aucun <chose> » en `secondaire` ; valeur absente dans un tableau : « — » |

Jamais « — PÉRIMÉ », jamais de bouton à roue.

### 3.7 Ombres et voiles

Une ombre n'existe que pour ce qui flotte. Valeurs conseillées : quatre ombres, un relief, un voile.

| Nom | Valeur | Objets |
|---|---|---|
| flottant | `0 10px 30px rgba(0,0,0,.28)` + filet `0 0 0 1px separateur` | infobulle (bulle « fiche » d'une pastille comprise), bulle de détail, bulle de journal, bulles de confirmation, de barre d'outils et de tâches, menus, panneaux non modaux (sélecteurs, bande de médias, demande en attente) |
| mini | `0 6px 18px rgba(0,0,0,.25)` + filet | mini-menu de sélection, bords d'une pile de demandes |
| modale | `0 18px 50px rgba(0,0,0,.35)` + filet | fenêtres modales, panneau de procédure, aperçu d'un média, fenêtre qui descend du bord |
| fiche | `-12px 0 32px rgba(0,0,0,.22)` + filet gauche 1 px `separateur` | fiche posée |
| relief | `0 1px 2px rgba(0,0,0,.15)` | icône active de barre d'outils, segment actif ; bouton d'interrupteur : `0 1px 2px rgba(0,0,0,.25)` |

- Sans ombre : boîte de carte, carte d'état de la surface, choix de paire (filet `separateur` seul).
- Fenêtre principale et fenêtre des réglages : ombre native de macOS.
- Marque blanche posée sur une image : ombre de texte `0 0 3px rgba(0,0,0,.6)`.
- **Voile** (`voile`) : noir à 32 % en clair, 50 % en sombre, sur toute la fenêtre, sous toute fenêtre modale, et sous le panneau d'une procédure lourde. Pas de voile sous l'aperçu d'un média (posé dans la surface, au-dessus de la bande, C § 8.3), sous un panneau non modal, sous la liste des raccourcis, ni sous une feuille de macOS (diagnostic).

---

## 4. Typographie

### 4.1 Échelle

| Rôle | Taille | Graisse | Couleur | Exemple |
|---|---|---|---|---|
| Titre de panneau, de fenêtre modale, de fiche | 16 px | 600 | texte | nom du projet en tête de fiche, titre d'une fenêtre de création |
| Nom dans l'aperçu d'un sélecteur liste et aperçu | 16 px | 600 | texte | nom de l'objet choisi |
| Titre de vue, de bulle, d'état vide | 14 px | 600 | texte | « Moniteur », titre d'une bulle de barre d'outils, « Chantier éteint » |
| Valeur de tuile | 17 px | 600 | texte, ou statut si anormal | « 2 % », « 1,29 » |
| Corps | 13 px | 400 | texte | lignes de liste |
| Corps de fiche, de panneau, de fenêtre modale | 12 px | 400 | texte | clauses, champs, libellés de formulaire |
| Tableaux | 11,5 px | 400 | texte | lignes du tableau dense |
| Bulle | 11,5 px | 400 | texte | infobulle, détail |
| Secondaire | 11–11,5 px | 400 | secondaire | métadonnées, dates, compteurs |
| Titre de zone de colonne | 11 px | 600 | secondaire (texte si la zone est active) | « PROJETS », « SESSIONS » |
| Titre de famille (liste groupée) | 11 px | 600 | texte | « DÉPEND DE, UTILISE » |
| Titre de section | 10,5 px | 600 | secondaire | « SESSIONS VIVANTES » |
| En-tête de colonnes d'un tableau | 10,5 px | 400 | secondaire | « Tokens », « Journal » |
| Marque d'état courte dans une liste | 10,5 px | 400 ; 600 pour un doublon | statut | « hors ligne », « ⚠ ×2 » |
| Pastille de compteur | 10 px | 500 | secondaire sur champ | ② dans un onglet |
| Mot qualificatif après un nom | 10 px | 400 | secondaire | « mutualisé », « hors <registre> » |
| Glyphe en exposant | 10 px | 600 | teinte de la marque | « ⇄ » d'un élément distant |
| Graduations d'un graphique | 9 px | 400 | secondaire | « lun. », « 50 % » |
| Badge numérique | 9 px | 600 | blanc sur statut ou `accent` | badge d'icône de barre d'outils |

- Titres : 16 px pour un panneau, une fenêtre modale ou une fiche ; 14 px pour une vue, une bulle ou un état vide. Aucun titre en 13 ou 15 px.
- Petites capitales : majuscules, espacement **0,05 em**, partout. Réservées aux titres de zone, de section, de famille, de groupe de réglages et aux catégories d'un aperçu.
- Interligne : **1,45** dans les textes (bulles, descriptions, règles, aides) ; 1,6 dans le terminal. Lignes de liste et de tableau : hauteur fixe (§ 5.1).
- Chiffres tabulaires (`font-variant-numeric: tabular-nums`) dans les compteurs, colonnes, dates, tailles.
- Graisses de l'interface : 400, 500, 600. **600 est le seul gras ; 700 ne sert jamais.** Un gras laissé par défaut (balise de gras sans style) donne 700 : le régler à 600. La police à chasse fixe a sa propre graisse (§ 2.2).
- Le gras (600) marque le nom important d'une ligne (N de N/M, rôle courant, valeur hors norme, chiffres clés d'une phrase de synthèse, valeur du point courant d'un graphique).
- Italique : seulement pour le nom d'un élément terminé dans un onglet et pour un texte déduit par l'application (pas fourni par la source). Nulle part ailleurs.

### 4.2 Compteurs

- Format `N/M` : N en graisse 600 couleur du texte, `/M` en secondaire. Exemple « **2**/4 ». Jamais « 2 · 4 vivantes ».
- Trois écritures, chacune son sens : `N/M` pour un compte d'éléments (vivants sur total) ; « N sur M » pour une progression (« Reprise 2 sur 3 ») ; « ‹ 1/3 › » pour naviguer dans une pile. La liste de cibles écrit « 27 / 31 » (C § 4.9).
- Dans un onglet, le compteur est une pastille grise séparée du libellé (fond `champ`, rayon 8, 10 px), pour qu'il ne se lise pas comme une partie du nom.

---

## 5. Géométrie

### 5.1 Mesures

| Élément | Valeur |
|---|---|
| Ligne de liste | 26 px (ligne de sous-groupe : 20 px) |
| Barre de titre de fenêtre | 38 px |
| Rangée de capsules sans barre de titre | 30 px |
| Barre d'onglets | 34 px (onglet 28 px) |
| Colonne latérale | 290 px par défaut, réglable de 220 à 380 px ; double-clic sur la poignée : replie |
| Rail (colonne repliée) | 48 px |
| Fiche posée | 460 px, 52 % de la largeur au plus ; réduite : bande de 34 px |
| Champ de saisie, de filtre, de recherche | 28 px de haut, rayon 7 |
| Bouton (`fbtn`) | 12 px, marge 3 × 9 px, rayon 7 |
| Trait de groupe | 2 × 12 px, rayon 1 ; 2 × 16 px en tête de fiche et de vue d'entité |
| Trait de sélection | 2 px, à gauche de la ligne |
| Trait pointillé (élément distant) | 2 px, 3 px plein, 3 px vide |
| Point d'état (pastille) | 8 px ; anneau 10 px, trait 2 px |
| Point indicateur sur une icône | 6 px |
| Badge numérique | 13 px de haut, rayon 7 |
| Icône de barre d'outils | 26 × 22 px ; glyphe 15 px, trait 1,4 px, bouts et jointures ronds |
| Barre de mesure | 6 px de haut, rayon 3 |
| Micro-jauge, curseur | 4 px de haut, rayon 2 (micro-jauge 26 px de large, piste de curseur 110 px) |
| Ligne de temps | 2 px |
| Interrupteur | 28 × 16 px |
| Case à cocher | 13 × 13 px, rayon 3, bordure 1,5 px |
| Nœud d'étape | 17 px, dans les deux sens (étapes en ligne ou en colonne) |
| Bulle | 280 px de large au plus (bulle de détail 250 px, bulle de journal 520 px au plus) |
| Panneau non modal (sélecteur) | 420 à 640 px |
| Sélecteur liste et aperçu | 640 px |
| Panneau de demande en attente | 420 px, ancré en haut au centre de la surface |
| Pile de demandes | deux bords visibles au plus, décalés de 9 px vers le haut, réduits de 4 % chacun |
| Fenêtre modale | 540 px de large |
| Fenêtre de composition et son journal | 560 px |
| Panneau de procédure lourde | 760 × 520 px |
| Vignette de média | 132 px de large, 16/10, rayon 6 |
| Fondu de bord d'une barre qui défile | 24 px |

### 5.2 Rayons

| Rayon | Objets |
|---|---|
| 1 px | trait de groupe |
| 2 px | micro-jauge, curseur |
| 3 px | barre de mesure, case à cocher, pastille de statusline, champ de renommage |
| 4 px | case copiable, zone d'icône survolée dans la barre d'onglets |
| 5 px | ligne plus basse que 26 px survolée (sous-groupe, lien, historique), élément de menu, segment, petit bouton (format de copie, « Copié »), touche |
| 6 px | ligne de 26 px (colonne, sélecteur, entrée de réglages), bandeau, icône de barre d'outils, jeton de filtre, vignette |
| 7 px | champ, conteneur de segments, bouton (`fbtn`), mini-menu de sélection |
| 8 px | boîte de carte, choix de paire, onglet du centre (coins hauts), pastille de compteur, interrupteur |
| 9 px | bulles, menus, capsules (barre d'outils, capsule d'état) |
| 10 px | panneaux non modaux (sélecteurs, bande de médias, demande en attente), bulle de journal, carte d'état de la surface, coins bas de la fenêtre qui descend du bord |
| 12 px | fenêtre, fenêtres modales (création, composition, alerte, procédure, réglages) |

### 5.3 Espacements

Échelle : 2, 4, 6, 8, 10, 12, 14, 16 px (18 et 20 pour une fenêtre modale). Marges intérieures : fiche 16 px ; colonne 8 px autour de la liste (les lignes ajoutent leur propre marge), 12 px pour les titres de zone ; bulles 6 × 10 px (infobulle) ou 9 × 11 px (bulle de détail) ; panneau non modal 6 px ; fenêtre modale 18 × 20 px. Entre sections d'une fiche : 14 px. Entre familles d'une liste groupée : 6 px de plus que l'interligne.

---

## 6. Mouvement

| Mouvement | Valeur |
|---|---|
| Infobulle | délai 350 ms par défaut, réglable de 0,2 à 3 s (§ 9.3) ; apparition 0,12 s, `ease-out` (fondu + 2 px de glissement) |
| Mini-menu de sélection | apparaît 120 ms après la fin de la sélection |
| Bulle « Copié » | 0,9 s en tout, `ease-out` : visible à 12 % de la durée, s'efface à partir de 70 % |
| Actions au survol | fondu 0,12 s |
| Anneau de pastille | fin de tour 2,2 s ; question et autorisation 1,1 s ; erreur 0,55 s ; agrandissement ×1 → ×2, opacité 0,9 → 0, `ease-out`, en boucle |
| Vibration d'une ligne très chargée | au-dessus de 50 % CPU : ±0,6 px, 0,18 s, par sauts (`steps(2)`) |
| Halo d'un élément nouveau | fond `selection` qui pulse de 15 à 100 %, 0,7 s par aller, `ease-in-out`, pendant 20 s ou jusqu'au premier clic ; sans contour ni lueur |
| Mise en exergue (élément cherché ou désigné ailleurs, sur une carte ou dans une liste) | anneau `accent` qui s'allume puis s'efface en 2,1 s |
| Marque d'anomalie d'un élément maître | pulse en 1,1 s, opacité 1 → 0,25, `ease-in-out`, aller-retour |
| Repli de la colonne en rail, dépli | largeur 290 ↔ 48 px, 0,22 s, courbe `cubic-bezier(.2,.8,.2,1)` |
| Fiche : ouverture, fermeture | glissement depuis le bord droit, 0,22 s, même courbe |
| Fiche : « ⇥ Réduire », dépli | largeur 460 ↔ 34 px, 0,22 s, même courbe |
| Fenêtre d'action réussie | se ferme seule après 1,2 s ; le résultat passe dans le message d'action |
| Message d'action | reste 4 s, puis s'efface en fondu de 0,2 s ; un nouveau message remplace le précédent |
| Fenêtre qui descend du bord | apparition et disparition 0,18 s (glisser, fondu, ou les deux, au réglage) ; passage au fond opaque 0,18 s ; retour au verre 0,4 s, 3 s après la dernière activité (§ 7.9) |

- Rien d'autre ne bouge. Pas d'animation décorative, pas de rebond.
- Réglage **Réglages › Général › Animations › « Animations de l'interface »** (activé par défaut ; aide d'une ligne : « repli des volets, fiche, bulles »). Désactivé, les volets, la fiche, les bulles, « Copié » et la fenêtre qui descend du bord changent d'état instantanément.
- Les signaux (anneaux de pastille, vibration, halo d'un élément nouveau, mise en exergue, pulsation d'une marque d'anomalie) ne relèvent pas de ce réglage : ce sont des signaux, pas des transitions.
- « Réduire les animations » (macOS) coupe tout : les transitions comme avec le réglage ; les signaux se figent (la pastille, le halo et la marque restent, immobiles ; la mise en exergue devient un anneau fixe de 1,5 s).

---

## 7. Structure de fenêtre

### 7.1 Anatomie

```
┌ barre de titre 38 px : feux · [capsules de vue] ··· [capsules d'alertes] [quota] [outils] ┐
│ colonne 290 px   │ centre (surface principale)                       │ fiche (sur demande) │
│  filtre          │  barre d'onglets 34 px : onglets · ↻ ⇲ │ A− 12 A+ │                     │
│  PROJETS  3 …    │  contenu (terminal, carte, moniteur)              │                     │
│  SESSIONS 34 …   │  statusline (si terminal)                         │                     │
│                  │                                  message d'action │                     │
└──────────────────┴───────────────────────────────────────────────────┴─────────────────────┘
```

- Trois zones : colonne à gauche, centre, fiche à droite **sur demande** (pas de volet permanent).
- Le centre a plusieurs modes, choisis par une capsule de vue de la barre d'outils et par ⌘1, ⌘2, ⌘3… (Régie : Terminal, Carte, Moniteur).
- En bas à droite du centre, le message d'action (C § 2.7) : résultat ou échec de la dernière action de fond ; il s'efface après 4 s.
- Quand la surface principale ne peut pas montrer l'élément (hors de son conteneur, terminé, introuvable, refusé, aucun élément vivant), une carte d'état neutre prend sa place (C § 2.8).

### 7.2 Colonne

- Fond `mantle`, filet droit `separateur`.
- Zones titrées en petites capitales (« PROJETS », « SESSIONS », « FORGE »), avec un résumé à droite en secondaire (« 3 royaumes », « 34 vivantes »). Zone active (celle qui a le focus) : titre en `texte` ; inactive : `secondaire`. Un clic sur le titre replie ou déplie la zone (chevron `secondaire`) (C § 1.1). Sous-zones : sous-titre 11 px `secondaire`, compte à droite, repliables.
- Champ de filtre en tête : `/` ou ⌘F y place le curseur ; Échap vide le filtre et rend le focus. Un filtre actif devient un **jeton** dans le champ (fond accent, texte `surAccent`, ✕) ; le nombre de résultats est dans la bulle du jeton. La colonne ne se teinte pas, le champ ne change pas de bordure. Pendant un filtre, les sections repliées de la colonne sont dépliées.
- Segments sous le titre d'une zone pour ses vues (Régie : À traiter · Actives · Toutes). Vue par défaut à l'ouverture : celle des éléments actifs ; le choix est retenu.
- « À traiter » : liste à plat, dans l'ordre de priorité des pastilles (demande d'autorisation et question, puis erreur, puis fin de tour récente) ; le sous-groupe rappelé à droite avec le trait de son groupe ; le compte suit le libellé (« À traiter 5 »).
- Repliable : poignée de 5 px (trait de 1 × 28 px au milieu) ; glisser redimensionne (220–380 px). Trois façons de replier en **rail de 48 px**, qui garde visibles les éléments à traiter (icône, pastille, compteur) : l'icône de colonne ◧ en tête de la barre d'outils (infobulle « Replier la colonne (⌘0) » / « Déplier la colonne (⌘0) »), ⌘0, ou un double-clic sur la poignée. Le rail se déplie de la même façon ou par un clic sur ses éléments. Contenu du rail : ⌕ en tête, les éléments à traiter, une icône par zone avec son compte, « + » en bas (C § 1.11).
- Entre deux zones empilées, une poignée couchée (trait de 28 × 1 px `secondaire` à 50 %, curseur ↕).
- Pied de colonne : « + Nouveau <sous-groupe> », bouton sans bordure. Pas de menu « Rafraîchir » par zone : la colonne suit la vitesse globale des relevés (§ 9.8).
- Le repli et le dépli sont animés (§ 6).
- Symétrie avec la fiche (§ 7.5) : à gauche ◧ et ⌘0 replient la colonne en rail ; à droite ⓘ et ⌘K ouvrent et ferment la fiche, « ⇥ Réduire » la réduit en bande de 34 px. Le rail garde du contenu utile (ce qui attend l'utilisateur) ; la bande de fiche ne garde que la flèche de dépliage.

### 7.3 Barre d'outils

- Icônes regroupées en **capsules par rôle** (fond `champ`, rayon 9), dans l'ordre : vue · alertes et services · mesure (quota) · outils.
- Icône : 26 × 22 px, rayon 6, glyphe dessiné au trait (15 px, trait 1,4 px, bouts ronds), couleur secondaire ; active : fond `base`, couleur texte, relief (§ 3.7).
- Une icône ne porte un signe que s'il y a quelque chose à voir : badge numérique (13 px de haut, 9 px 600, texte blanc) en haut à droite, ou point de 6 px en bas à droite. Badge `accent` pour un simple compte d'activité (tâches en cours) ; badge de statut pour un problème (`orange`, `rouge` ; le plus grave l'emporte) ; point `orange` sans nombre pour un problème mineur. Les signes de la barre ne clignotent jamais.
- Une icône d'alerte qui n'a rien à signaler disparaît de la barre.
- Icône de service : elle dit ce que fait le service, pas son nom ; un point de 6 px porte son état (C § 2.1). Un clic ouvre la page du service dans les réglages.
- Mesure : anneau de 16 px suivi de la valeur en 11,5 px 600 ; neutre tant que la valeur est normale, puis les paliers de § 3.3 ; ancienne ou absente : § 3.6.
- Un clic sur une icône d'alerte ou de mesure ouvre sa bulle de barre d'outils (C § 3.8).
- Chaque icône a une infobulle qui porte son nom et son raccourci : « Replier la colonne (⌘0) » (§ 9.3). Barre personnalisable (Présentation › Personnaliser la barre d'outils).
- Pas de texte, pas de graphique dans la barre (le camembert de Régie est parti dans le Moniteur).

### 7.4 Barre d'onglets du centre

- Onglets : pastille d'état + nom, rien d'autre. Onglet actif : fond `base`, texte en 600. Inactif : fond `crust`, texte secondaire. Élément terminé : nom en italique `secondaire`.
- Trop d'onglets : la barre défile, avec un fondu de 24 px sur les bords ; Ctrl+Tab passe au suivant.
- À droite : actions de la surface en icônes (Régie : ↻ Relancer, ⇲ /compact), filet, puis « A− 12 A+ ».
- Les actions de la surface sont grisées quand l'élément ne peut rien recevoir, la raison en bulle. Une action coûteuse (relancer) demande confirmation dans une bulle sous son icône (§ 9.11). Une action devenue nécessaire prend la couleur du statut (↻ `rouge`), sans halo. Une marque à gauche des actions peut signaler une mise à jour (« ⬆ » `orange`, un clic ouvre la confirmation) ou une action programmée (« ⏲ » `secondaire`).

### 7.5 Fiche sur demande

- S'ouvre par ⌘K ou ⓘ (barre d'outils ou ligne) ; posée sur le centre, à droite (460 px), fermée par ✕, ⌘K, ou Échap quand le focus est dans la fiche (§ 9.7). Ouverture, fermeture et réduction animées (§ 6).
- Sans élément sélectionné, ⓘ et ⌘K sont grisés, la raison en bulle (« Aucun <sous-groupe> sélectionné ») ; la fiche ne s'ouvre pas sur une vue vide.
- En-tête : trait de groupe 2 × 16 px, nom (16 px, 600), groupe en secondaire, puis à droite : « ⇥ Réduire » (bande de 34 px sur le bord), « ▥ Ancrer » (devient une colonne permanente à droite du centre), « ▢ Dossiers ⌄ », « ✕ ».
- Description d'une ligne sous l'en-tête, puis onglets soulignés (2 px accent sous l'actif), compteurs en pastille grise.
- L'état ancrée, réduite et l'onglet ouvert sont retenus entre deux lancements.
- Détail : C § 4.

### 7.6 Réglages

- Fenêtre à part (native, rayon 12), à **barre latérale** comme les Réglages Système : recherche en haut, liste groupée à gauche (150 px, fond `mantle`, filet droit). Titres de groupe en petites capitales 10 px ; sous chacun, ses pages **en retrait**, chacune précédée de son icône dans une colonne fixe. Jamais titres et pages au même bord gauche. Une page par section.
- Ordre des groupes : « Application » d'abord (Général, Clavier, fenêtre qui descend du bord…), puis les groupes du domaine, « Plugins » en dernier (§ 2.6).
- Une ligne par réglage : libellé à gauche, contrôle à droite ; aide éventuelle en une ligne grise (11 px) sous le libellé, ou derrière ⓘ. Sections titrées en petites capitales (§ 4.1), séparées par l'espace et un filet. Jamais de paragraphe dans une boîte grise, jamais de ligne de réglage sur fond `champ`.
- Menu local : bouton (`fbtn`) suivi de « ⌃⌄ », comme le menu local de macOS. Un menu d'actions porte « ⌄ ».
- Un réglage maître désactivé grise toute sa section ; un contrôle sans effet (fonction coupée) est grisé, la raison en bulle. Un réglage que l'application ne sait pas encore appliquer est masqué.
- « Défaut » apparaît à côté d'une valeur changée à la main.
- Un message d'état (autorisation macOS à donner, erreur) tient sur une ligne, icône `orange` ou `rouge`.
- Un réglage qui ne prend effet qu'au prochain démarrage le dit dans sa bulle.
- Une erreur liée à une entité (machine, service) s'affiche dans la page de cette entité, là où elle se répare, pas sous le réglage qui l'a provoquée (§ 9.13).
- Un chemin valable sur des machines distantes est un champ texte (pas de « Choisir… » local), précédé d'une icône d'ordinateur dans le champ.
- Réglages › Clavier : le clavier AZERTY dessiné, touches de l'application en `accent` sur `teinte` ; un bouton par raccourci, qui affiche pendant l'enregistrement « Combinaison attendue… (⎋ annule) » ; le raccourci d'une fonction désactivée est grisé, la raison en bulle ; interrupteur « Liste des raccourcis » (§ 9.7).
- Détail : C § 7.2.

### 7.7 Barre des menus

- Voir § 2.5. Menu : matériau de menu de macOS (fond translucide flouté), en-têtes de section en 10,5 px secondaire, éléments de 4 × 8 px, filets à 25 % d'opacité, barres de mesure de 6 px.

### 7.8 Statusline (applications avec terminal tmux)

- Pastilles douces : fond `champ`, texte en 400, rayon 3 ; la pastille de l'élément commence par le trait de 2 px de la couleur du groupe.
- L'état du dépôt (± fichiers modifiés) n'apparaît que s'il est sale ; la branche git n'est pas affichée.
- Les marques spéciales (maîtresse, forge) sont du texte d'accent, pas des pastilles criardes ni teintées. Une valeur anormale prend sa couleur de statut en texte, en 600, sur fond `champ`.
- Sessions multi-rôles (tmux composite) : rôles en texte, rôle courant en 600.

### 7.9 Visor (application qui descend du bord de l'écran)

- Toute la fenêtre descend du bord supérieur (F12 par défaut), sur toute la largeur.
- Matériau « Profondeur » : fenêtre non opaque sur un verre flouté de macOS teinté de `mantle` à α 0,48 ; la surface principale est transparente et un dégradé de `base` monte de α 0,12 (haut) à 0,525 (55 % de la hauteur) puis 0,93 (bas) : l'ancienne sortie laisse voir le bureau, la ligne où l'on tape reste nette.
- À la frappe ou au survol, le fond devient opaque (α 0,97) en 0,18 s ; il redevient du verre en 0,4 s, 3 s après la dernière activité.
- Le flou est présent pendant toute l'animation d'apparition, pas seulement à la fin.
- Halo du texte désactivé par défaut, et masqué tant que l'application ne sait pas le rendre. Flou réglable. « Opacité du cadre » (30–100 %, défaut 85 %) agit sur le verre et l'interface, pas sur la surface principale ; son aide le dit en une ligne (« la surface reste à 97 % »).
- Pas de barre de titre ni de feux dans le Visor : les mêmes capsules de barre d'outils (§ 7.3) tiennent sur une rangée de 30 px, sur le verre, en tête de la fenêtre.
- Tout fonctionne comme dans la fenêtre normale : repli de la colonne en rail (◧, ⌘0, poignée), fiche (ⓘ, ⌘K, ⇥ Réduire, ✕), animations comprises. La fiche ouverte dans le Visor est opaque (fond `mantle`), comme une surface en cours d'usage.
- Coins bas de 10 px, ombre modale (§ 3.7), poignée basse (trait `secondaire` à 60 %).
- Le Visor descend sous la barre des menus de macOS, qui reste visible et affiche les menus de l'application tant qu'elle est active (comportement standard de macOS) ; au-dessus d'une app en plein écran, la barre des menus apparaît quand le pointeur touche le haut de l'écran. Les commandes restent accessibles par leurs raccourcis.
- Réglages › <fenêtre qui descend du bord> : interrupteur maître ; Taille et position ; Matériau ; Comportement ; Apparition (style, vitesse) ; bouton « Afficher ». Sections grisées tant que l'interrupteur est coupé.
- Mise en œuvre détaillée : sous-cahier des charges Swift du Visor de Régie.

### 7.10 Panneaux, sélecteurs et fenêtres modales

Tout ce qui s'ouvre au-dessus du contenu pour choisir, saisir ou confirmer. Catalogue : C § 8.

- Au thème : fond `mantle`, ombre et filet (§ 3.7). Rayon 10 pour un panneau non modal (sélecteur, bande de médias, demande en attente), 12 pour une fenêtre modale. Jamais de contraste inversé.
- Titre en 16 px 600 ; corps en 12 px. Largeurs : § 5.1.
- Pas de consigne écrite ni d'aide : les touches et les précisions sont dans la bulle de l'en-tête ou derrière ⓘ. Seule exception : le pied d'un sélecteur liste et aperçu (principe 6).
- Listes : lignes de 26 px ; sélection = trait d'accent 2 px + `selection`, comme la colonne ; survol `champ`. Marques d'élément identiques à la colonne (pastille, ◎, doublon, distant, en attente). Une liste qui défile n'écrit pas de compteur (« N de plus en dessous »). Liste vide : « Aucun <objet> ne correspond » en `secondaire`.
- Champs : 28 px, rayon 7 ; fond `champ` pour filtrer ou chercher, fond `base` + filet `separateur` pour saisir. Focus : anneau 2 px `accent`. Erreur : anneau 1,5 px `rouge` et message en 11 px `rouge` sous le champ.
- Formulaire : § 8, C § 8.6. Boutons : `fbtn` (C § 7.8) ; une seule action principale, pleine en `accent`, à droite ; « Annuler » à sa gauche ; commande équivalente à gauche du pied (§ 8).
- Fenêtre modale : voile (§ 3.7) sur toute la fenêtre. Un clic sur le voile ferme une modale de création ; il ne ferme ni une alerte ni une procédure. Échap ferme le flottant le plus haut.
- Une option qui fixe la valeur d'un champ grise ce champ et y montre la valeur imposée ; un choix incompatible avec l'état actuel est grisé, la raison en bulle.
- « Plus tard » ferme une alerte ; le bandeau de la colonne prend le relais.
- Plusieurs demandes du même genre : une pile, jamais des panneaux côte à côte, jamais un panneau qui sort de la fenêtre (C § 8.4).
- Le panneau qui a le clavier se reconnaît à l'anneau `accent` de son champ ; pas de liseré vif, pas de halo pulsant.
- Une action réussie ferme sa fenêtre après 1,2 s ; le résultat passe dans le message d'action (C § 2.7).

### 7.11 Procédure lourde (application gelée)

Pour une opération rare, longue et destructrice sur un sous-groupe (remplacer, migrer, nettoyer).

- Entrées : la fiche (section dédiée, dernière exécution, bouton « <Action>… »), le menu ⋯ de la ligne dans la colonne, le menu de l'application. Pas de raccourci.
- Préparation : fenêtre modale (§ 7.10) « <Action> · <objet> » ; les éléments concernés, une ligne chacun avec leur état et leur taille ; un élément occupé est signalé en `orange` (le lancement attend la fin de son activité) ; les dossiers lus en `secondaire` ; les options (case décochée par défaut quand le choix ne doit pas être imposé ; une option qui fixe un champ le grise et y montre la valeur imposée) ; un interrupteur de relecture avant le point de non-retour ; au pied, la commande équivalente, « Annuler », l'action en `accent`. Un refus s'écrit en `rouge` sous le titre, avec sa raison ; un essai interrompu propose de reprendre ou d'annuler.
- Gel : du lancement à la fin, le voile couvre toute la fenêtre (fenêtre qui descend du bord comprise), le panneau de la procédure (760 × 520 px, rayon 12, ombre modale) au centre. Tout le reste est inactif, sauf ⌘ maintenu (liste des raccourcis) et ⌘Q, qui demande confirmation et met la procédure en pause au prochain point sûr. Ce qui tourne ailleurs continue ; les envois de l'application attendent.
- Rien n'est détruit avant la dernière étape ; jusque-là, « Annuler » remet tout en place, et chaque action est journalisée.
- Le journal sur disque fait foi : après un arrêt brutal, le lancement suivant rouvre le panneau à l'étape interrompue, avec « Reprendre » et « Annuler et tout remettre en place ».
- Une attente bornée (fin d'activité, réponse) laisse ensuite le choix à l'utilisateur : attendre encore, forcer, annuler.
- Étapes en colonne avec des nœuds de 17 px (C § 7.1) : faite ✓ `vert`, en cours `accent`, à venir `secondaire`, en échec ✗ `rouge`.
- Panneau : C § 8.11.

### 7.12 Graphiques

- Une seule teinte, `accent`. Seules les valeurs anormales prennent leur couleur de statut, en sourdine (§ 3.5).
- Chaque repère (référence, moyenne, plafond, échéance) est nommé sur sa propre ligne ; pas de légende.
- Le détail d'un point ou d'une barre est dans sa bulle.
- Grilles fines (trait 0,6 px `separateur` ; 100 % un peu plus marquée, `secondaire` à 60 %) ; graduations en 9 px `secondaire` ; valeur du point courant en 600.
- Opacités : aplat 10 %, barres neutres `secondaire` 35 %, au-delà de la référence `orange` 50 %, au-delà d'un seuil 60 %, période en cours `accent` 55 % (§ 3.5).
- Exception nommée au principe 3 : dans une bande fine de répartition (deux ou trois catégories, 6 px), la catégorie coûteuse est en `orange` même sans anomalie, les autres en `texte`.
- Pas de grand aplat, pas de projection colorée, pas de plafond rouge permanent, pas de trait d'une autre teinte.
- Courbe dans le temps, barres par heure, barres par période, bande fine : C § 5.10. Barres de mesure et bande de répartition : C § 5.2, § 5.3.

---

## 8. Textes de l'interface

- Libellés courts, en mots simples, sans majuscule de titre (« Ouvrir dans le Finder », pas « Ouvrir Dans Le Finder »).
- **Aucune phrase explicative** : pas de « clic sur une case : copier et détailler », pas de « ⌘C pour recopier », pas de « couleur = royaume du projet », pas de ligne d'aide sous un champ en cours d'édition. Ce qui mérite d'être dit va dans une bulle au survol.
- Les états s'écrivent en mots, à droite de la ligne, en secondaire : « allumé », « éteint », « extinction dans 11 s », « joignable », « jeton révoqué », « vivante ».
- Un bandeau ou un état dit le fait, puis sa conséquence après « · » : « Service absent · 4 éléments éteints », « … · actions suspendues », « … · relance bloquée par <entité> ».
- Une valeur estimée porte « estimé » à la suite de sa ligne secondaire, pas une phrase.
- Un titre trop long se raccourcit ; le texte complet se lit par « Tout lire » (fiche) ou dans la bulle.
- Quand deux textes partagent une ligne, le titre garde la place ; le texte secondaire se raccourcit d'abord (40 % de la ligne au plus). Les deux textes complets sont dans la bulle.
- Titres de section : un ou deux mots (« Hooks », « Ton », « Session maîtresse », « Historique »). Un titre nomme la chose dans les mots de l'utilisateur, pas sa provenance ni le mécanisme (pas « Câblage réel (lu sur disque) »).
- Boutons : verbe à l'infinitif (« Reprendre », « Retirer », « Ré-auditer », « Ouvrir le texte ») ; « … » s'ils ouvrent une fenêtre ou une confirmation (§ 2.3).
- Bascule : le libellé dit l'action suivante (« Tout lire » / « Replier », « Voir » / « Masquer », « Pourquoi ? » / « Masquer »).
- Formulaire : une ligne par champ, libellé à gauche en casse normale (jamais en capitales), champ à droite ; un exemple dans le champ, la précision derrière ⓘ ; « facultatif » en mot `secondaire`. Sous le champ, seulement un avertissement (`orange`) ou une erreur (`rouge`), après une tentative (principe 12).
- Commande équivalente : quand une action a une commande en ligne équivalente, la fenêtre l'affiche en chasse fixe `secondaire` à gauche du pied ; un clic la copie. Une anomalie qui se corrige par une commande montre cette commande, copiable au clic.
- Identifiants, chemins, commandes et noms de fichiers : en chasse fixe. Les nombres dans une phrase : en clair (« 3 journaux lus · 312 Mo »).
- Résultat d'une action de fond : au passé, en quelques mots, dans le message d'action (C § 2.7) : « Ordre déposé », « ⚠ Envoi impossible ». Pas pour une copie (§ 9.1).
- État vide d'une vue entière : un titre en 14 px et une ligne d'action, centrés (« Chantier éteint » · « Allumer ») ; le bouton n'apparaît que si l'action est possible, sinon une ligne de renvoi en `secondaire` (C § 2.6). Surface principale sans élément à montrer : carte d'état (C § 2.8).
- Liste vide : un texte court en `secondaire` à la place des lignes (« Aucun élément », « Rien en cours », « Aucun <objet> ne correspond »). Jamais de grande icône système.
- Unités toujours écrites : `Mo`, `%`, `k` (milliers de tokens), `$`, `s`.

---

## 9. Comportements transversaux

### 9.1 Copier

- **Un clic sur une valeur la copie.** Une petite bulle « Copié » (texte `base` sur fond `texte`, 10,5 px, 600, rayon 5) apparaît au-dessus de la case et s'efface en 0,9 s. Pas de message en bas de fenêtre pour une copie (le message d'action sert aux actions de fond), pas de rappel ⌘C.
- La case survolée prend un fond `champ`, rayon 4 ; la case cliquée garde un contour d'accent de 1,5 px tant que sa bulle de détail est ouverte.
- Une valeur composée (deux parts, l'une secondaire) est soulignée d'un pointillé `separateur`.
- Curseur : la flèche (jamais le curseur « copier » de macOS).
- Quand la valeur a plusieurs formats (nom d'élément), le clic ouvre la bulle de détail, qui propose les formats en petits boutons ; un clic sur un format copie et le bouton affiche « Copié ». Régie : `projet/session`, `@machine` (`projet/session@machine`), chemin de session.
- Chemins copiés au format POSIX, prêts à coller dans un terminal (espaces échappés). Ce n'est pas écrit dans l'interface.

### 9.2 Sélectionner du texte

- Tout texte de l'interface est sélectionnable (fiches, clauses, journaux, bulles de détail).
- Une sélection fait apparaître au-dessus d'elle, 120 ms après, un **mini-menu** : Copier · Citer dans la session · Chercher (adapter le deuxième à l'application : l'action qui envoie le texte vers la surface principale). Il disparaît à la désélection, comme dans Claude sur le web.
- « Citer » insère le texte, précédé de « > », à l'endroit où l'on tape dans la surface principale ; « Chercher » le met dans le filtre de la colonne.
- Après un clic, le menu affiche le résultat (« Copié », « Cité ») 0,7 s puis disparaît.

### 9.3 Infobulles

- **Les bulles de l'application par défaut, jamais l'infobulle du système** : fond `mantle`, texte, rayon 9, ombre flottante (§ 3.7), 11,5 px, interligne 1,45, 280 px de large au plus, 6 × 10 px de marge.
- Réglages › Général › Infobulles : « Infobulles de <app> » (activé par défaut ; décoché, celles de macOS), catégories (pastilles d'état, barre d'outils, colonne, carte…), délai (0,35 s par défaut, de 0,2 à 3 s).
- Apparition 0,12 s ; centrée, 6 px sous l'élément, ou au-dessus s'il reste moins de 40 px en dessous ; jamais à moins de 6 px d'un bord de la fenêtre ; disparaît à la sortie du survol ou au clic.
- Pour les éléments non évidents seulement : icônes, pastilles, marques, titres dont l'unité ou la portée n'est pas dite, barres. Une infobulle par icône de barre d'outils, avec son nom et son raccourci.
- Infobulle d'une pastille d'état : une « fiche » de même anatomie que toute infobulle (rayon 9, 280 px, 6 × 10 px, ombre flottante) : point ou losange de l'état, titre en 600, l'élément et la raison en `secondaire`, ancienneté, puis l'action possible.
- La bulle d'une marque dit ce qu'est l'attribut et la règle qui va avec (« Distant, sur <machine> · <app> n'y envoie que ce que sa règle permet »). Cette règle n'est écrite nulle part ailleurs.

### 9.4 Renommer

- Comme le Finder : clic sur le nom d'un élément sélectionné, attente (entre 0,4 et 2 s), second clic → le nom devient éditable **à sa place**, tout le texte sélectionné, dans un champ à peine marqué (contour d'accent de 2 px, fond `base`). ↵ valide, Échap annule, clic ailleurs valide.
- Pas de ligne d'aide. Dessous, seulement l'erreur éventuelle (nom déjà pris), en rouge.

### 9.5 Survol et sélection

- Survol d'une ligne : fond `champ`, sans trait.
- Sélection : fond `selection` + trait d'accent de 2 px à gauche. On distingue toujours la ligne ouverte de la ligne survolée.
- Sélection estompée (l'élément reste choisi mais le centre montre autre chose) : `selection` à moitié, sans trait.
- Élément qui attend une saisie dans un panneau (demande en attente) : trait de 2 px de la nuance de la demande (`cyan`, une seule nuance pour toutes les demandes) sur le bord gauche de la ligne, 🔒 après le nom ; la ligne dont le panneau a le clavier prend en plus la sélection. Pas de halo pulsant, pas de liseré.
- Les actions de la ligne apparaissent au survol, en fondu 0,12 s, à droite, séparées du compteur.

### 9.6 Déplier, replier

- Sections longues repliées par défaut avec un chevron (› replié, ⌄ déplié) et leur compte (« › Historique 214 »). Une section repliée se déplie d'elle-même pendant un filtre.
- Archives et journaux d'une vue : section repliée en bas (« › Archives 4 », « Journal ⌄ »).
- Les explications longues sont derrière un lien d'accent dans le titre de section (« Pourquoi ? », « Directives », « Tout lire ») qui déplie le texte sous le titre, avec un filet gauche de 2 px `separateur`.
- Une liste de cibles se résume en compteur : « tous », ou « 27 / 31 » quand il manque des éléments ; un clic déplie la liste, les exclus barrés en secondaire.

### 9.7 Raccourcis

- **⌘ et une seule touche.** Jamais ⌥⌘ ni ⌃⌘ pour une action courante. ⇧ en plus seulement pour protéger une action coûteuse (relancer, arrêter).
- **Les deux mains, clavier AZERTY.** Main droite, près du ⌘ droit (I O P K L), pour voir et insérer : sélecteurs, fiche. Main gauche, près du ⌘ gauche (E R S D F), pour agir : créer, reprendre, filtrer. Chiffres : modes du centre et repli de la colonne.
- **Laissés à macOS :** ⌘Z ⌘A ⌘Q ⌘W ⌘H ⌘M ⌘C ⌘V ⌘X ⌘, ⌘Tab ⌘Espace. Une app qui embarque un terminal reprend ⌘K et ⌘D (effacer, partager l'écran) si elle n'en a pas l'usage.
- Une action rare et lourde n'a pas de raccourci : elle passe par un bouton ou un menu, suivi d'une fenêtre.
- Un sélecteur peut aussi s'ouvrir par une frappe dans la surface principale (double Maj, un préfixe tapé trois fois), en plus de son raccourci.
- Dans une liste ou une bande : ⌘-clic ou ⇧-clic sélectionne plusieurs objets (numéro d'ordre dans le coin) ; ↵ insère ou valide ; Espace ouvre l'aperçu, comme Coup d'œil (← → passent au voisin, Espace ou Échap ferme) ; ⌫ arme la suppression sur l'objet même (contour `rouge`, ⌫ dans le coin), un second ⌫ envoie à la corbeille (§ 9.11).
- **⌘ maintenu 1 s, seul, affiche la liste des raccourcis** : panneau au centre de la fenêtre, sans voile, clavier dessiné avec les touches de l'app en accent, trois colonnes (Voir et insérer, Agir, Fenêtre), touches sans ⌘. Relâcher ⌘ la ferme ; une autre touche, un clic ou un ⌘-clic avant 1 s l'annule. Réglages › Clavier dessine le même clavier et permet de couper la liste. Mise en œuvre : moniteur local `flagsChanged` ; minuterie de 1 s annulée par `keyDown` et `leftMouseDown` ; réglage « Liste des raccourcis » activé par défaut. Panneau : C § 8.10.
- Exemple (Régie) : ⌘P projet/session, ⌘L raccourcis @@@, ⌘I captures, ⌘K fiche, ⌘O ordre ; ⌘D nouvelle session, ⌘E nouveau projet, ⌘R reprendre, ⌘S mot de passe en attente, ⌘F filtre ; ⇧⌘R relancer.

| Raccourci | Action |
|---|---|
| ⌘1, ⌘2, ⌘3… | modes du centre |
| ⌘0 | replier ou déplier la colonne |
| ⌘K | fiche de l'élément sélectionné |
| / · ⌘F | filtre de la colonne |
| ⌘P, double Maj | sélecteur flou des éléments |
| ⌘ maintenu 1 s, seul | liste des raccourcis |
| Ctrl+Tab | onglet suivant de la surface |
| ⌃⇥ | demande suivante d'une pile |
| ⇧⌘ + touche | action coûteuse (relancer) |
| ⌘− / ⌘+ | taille du texte à chasse fixe |
| Échap | ferme le flottant le plus haut qui a le focus (aperçu, puis panneau ; bulle, menu, fiche) ; annule le renommage ; vide le filtre et rend le focus. Quand le focus est dans la surface principale (terminal), Échap lui revient toujours (vim, Claude Code). |
| F12 | Visor (s'il existe) |
| ⌘, | Réglages |

### 9.8 Rafraîchissement des données

- Chaque source de données (sonde) a son rythme propre ; un petit anneau de compte à rebours (13 px) à côté de son nom montre le temps avant le prochain relevé ; sa bulle dit « prochain relevé dans N s (toutes les M s) ».
- Trois vitesses globales : Rapide (coûteux en CPU), Normal (défaut), Lent. Toute liste qui se met à jour (colonne comprise) suit la vitesse globale ; aucune n'a son propre « Rafraîchir ».
- Réglages › <vue> : la vitesse globale, un tableau des rythmes par sonde (une colonne par vitesse) et les seuils de la vue.
- En-tête de la vue, à droite : l'heure du dernier relevé en `secondaire` puis « Actualiser » en lien d'accent (« relevé 01:08 · Actualiser »). Pendant un relevé, « Actualiser » devient « actualisation… » en `secondaire`. États d'une donnée : § 3.6.
- Le journal des relevés est accessible par un texte gris en bas à droite (« ≡ Journal du sondage ») qui ouvre une bulle défilante.

### 9.9 Persistance

- Tout ce que l'utilisateur règle ou ouvre (largeur de colonne, colonne repliée, fiche ancrée ou réduite, onglet de la fiche, sections dépliées, vue du centre, segment) est retenu entre deux lancements.

### 9.10 Glisser-déposer

- Une cible de dépôt survolée prend un anneau `accent` de 2 px à l'intérieur de son bord. Rien d'autre ne change.
- Glisser un objet d'un sélecteur ou d'une bande sur la surface principale fait la même chose que ↵.

### 9.11 Confirmer

- Une action coûteuse ou destructrice demande confirmation **dans une bulle** sous son déclencheur, pas dans une fenêtre (C § 3.7) : une question courte (« Révoquer cet ordre ? »), le texte en `orange` s'il y a un risque, puis « Annuler » et le bouton de l'action (en `rouge` s'il détruit). Échap ou un clic ailleurs annule.
- Une action destructrice s'écrit en `rouge` (bouton ou lien « Révoquer… ») ; une action forcée (« Arrêt forcé ») aussi, et n'apparaît qu'après une première tentative.
- Une suppression par le clavier s'arme d'abord sur l'objet (contour `rouge`), et se fait au second appui.
- Pendant une procédure lourde, ⌘Q demande confirmation (§ 7.11).

### 9.12 Tâches de fond et échecs

- Une action longue part en arrière-plan sans bloquer l'interface ; l'icône des tâches de la barre d'outils en tient le compte (badge `accent`, § 7.3) et sa bulle les liste (C § 3.9).
- Un échec : une ligne ⚠ `orange` dans le message d'action, et une marque sur l'entité en cause, dans la page où il se répare. Un envoi en souffrance passe l'icône en `orange` ; un refus, en `rouge`.

### 9.13 Accès refusé et diagnostic par entité

- Les refus qui touchent une entité (machine, service) se règlent dans sa page de réglages : une ligne par entité, état écrit à droite, coloré seulement s'il y a un refus, la raison en bulle ; « Diagnostiquer… » en `accent` s'il y a un refus, en `secondaire` sinon.
- « Diagnostiquer… » ouvre une feuille de macOS par entité (C § 7.6). Elle remplace les encadrés de réparation partout où le refus ne concerne pas un élément précis.
- Entité en refus : seuls son état écrit et son trait prennent la couleur ; jamais de contour autour de ses lignes.

---

## 10. Accessibilité

- Contraste : texte principal ≥ 4,5:1 sur son fond ; texte secondaire ≥ 3:1. Vérifier avec chaque palette. Palettes limites : xterm (couleurs pures, la moins lisible), pencil ; nord clair est dérivé (Snow Storm), à vérifier à part.
- Aucune information portée par la couleur seule : chaque statut a aussi une forme (point, losange, anneau), un mot (état écrit) ou une valeur.
- Deux états voisins qui attendent l'utilisateur se distinguent par la forme, pas seulement par la teinte (question : point `jaune` ; autorisation : losange `orange`).
- Un contrôle grisé garde sa bulle (la raison) et reste annoncé par VoiceOver comme indisponible.
- Navigation complète au clavier ; focus visible (contour d'accent 2 px).
- VoiceOver : libellé pour chaque icône (celui de son infobulle), état des pastilles en mots.
- « Réduire les animations » et « Augmenter le contraste » de macOS respectés.

---

## 11. Liste de conformité

À vérifier avant de livrer un écran :

- [ ] Toutes les couleurs viennent des jetons ; changer de palette dotlib repeint tout, terminal compris (couleurs ANSI de la palette).
- [ ] Clair et sombre testés avec au moins catppuccin, gruvbox, nord et xterm.
- [ ] Aucun groupe en vert, jaune, orange ou rouge ; couleur de groupe stockée par nom ; groupe rendu par un trait 2 × 12 px (2 × 16 en tête de fiche), jamais par un point.
- [ ] La couleur n'apparaît que pour un état anormal, une identité de groupe ou une exception nommée (§ 1, principes 2 et 3).
- [ ] Pas de fond coloré, de cadre coloré, de relief ni de paragraphe en couleur ; toute teinte de fond est `teinte` (14 % / 18 %).
- [ ] Aucun « tu », « vous », « ton », « votre » ni impératif dans les textes, bulles comprises (principe 15).
- [ ] Opacités prises dans § 3.5 ; ombres et voiles pris dans § 3.7 ; rayons pris dans § 5.2.
- [ ] Graisses 400, 500, 600 seulement ; aucun 700. Titres en 16 px (panneau, modale, fiche) ou 14 px (vue, bulle). Petites capitales à 0,05 em ; interligne 1,45.
- [ ] Champs de 28 px, rayon 7 ; boutons `fbtn` ; un seul bouton principal plein en `accent` ; désactivé à 45 % d'opacité.
- [ ] Aucune phrase d'explication visible ; les précisions sont dans des bulles.
- [ ] Toute action impossible est grisée, la raison en bulle ; aucune vue vide ouverte « pour rien ».
- [ ] Aucun message de réussite ; aucune erreur affichée avant une tentative.
- [ ] Toutes les infobulles sont des bulles de l'application (sauf réglage contraire de l'utilisateur).
- [ ] Panneaux, sélecteurs et modales au thème ; aucun contraste inversé ; pas de consigne écrite dans un panneau.
- [ ] Chaque attribut d'élément a la même marque partout (maître, doublon, distant, en attente).
- [ ] États d'une donnée rendus : lecture, ancienne, absente, illisible, erreur, format plus récent (§ 3.6).
- [ ] Graphiques en une teinte (`accent`), couleur seulement pour les valeurs anormales, repères nommés sur leur ligne, pas de légende.
- [ ] Listes vides en une ligne `secondaire` ; aucune grande icône système.
- [ ] Confirmations en bulle ; actions destructrices en `rouge`.
- [ ] Clic = copie avec bulle « Copié » ; sélection = mini-menu.
- [ ] Renommage comme le Finder.
- [ ] Sélection (trait + teinte) distincte du survol (gris).
- [ ] Actions secondaires au survol.
- [ ] Compteurs en N/M, chiffres tabulaires, nombres à la française.
- [ ] Sections longues repliées, explications derrière « Pourquoi ? ».
- [ ] Un seul point d'entrée dans la barre des menus.
- [ ] Police à chasse fixe patchée, taille 10–14 pt réglable, défaut 12.
- [ ] Textes en français, typographie française.
- [ ] Clavier, VoiceOver, réduction des animations.
- [ ] Liste « À ne pas faire » (§ 13) vérifiée.

---

## 12. Méthode de travail

- Avant de redessiner une application existante : inventaire de ses éléments graphiques et de leurs états (`etats-graphiques.md`), captures numérotées avec le message qui les accompagne.
- Pour chaque piste, un choix tranché ; les éléments qui suivent la même règle sont traités ensemble. Les choix se font dans un atelier `@@@ui` (cartes Aujourd'hui / Proposé, Avant / Après) ; le choix validé par l'utilisateur l'emporte sur tout texte plus ancien.
- Un élément que l'atelier n'a pas traité se tranche en appliquant ce gabarit, puis se soumet à l'utilisateur comme « point à valider ». Un sujet non décidé est listé à part et ne s'applique pas.
- Une valeur que la maquette emploie sous plusieurs formes pour la même chose se ramène à une seule, écrite dans le gabarit ; l'écart de la maquette est noté (§ 14) jusqu'à ce que l'utilisateur décide de l'aligner.
- Cahier des charges : linéaire, sans historique de décision ; titres de section = noms d'éléments de l'inventaire ; chaque section dit l'état cible, puis « À retirer » ; captures citées ; table de correspondance des termes en tête ; renvois au gabarit (« G § n », « C § n ») plutôt que répétition.
- Maquette HTML de référence avec un mode référence (`#ref&vue=…&theme=…&palette=…`), images de chaque état en 1280 × 800, clair et sombre, plus la fenêtre principale dans quatre autres palettes ; un test d'intégrité de la maquette.
- Réception : capturer l'application dans le même état et comparer côte à côte, pas pixel à pixel (structure, présence et absence des couleurs, typographie relative, états, textes mot pour mot). Un écart qui paraît nécessaire est soumis à l'utilisateur avec les deux images, jamais décidé seul.

---

## 13. À ne pas faire

Chaque motif a son remplaçant dans le gabarit.

- Couleur en dur ; valeur hors des échelles (tailles § 4.1, rayons § 5.2, opacités § 3.5, ombres et voiles § 3.7).
- Graisse 700 ; titre en 13 ou 15 px ; deux interlignes ou deux espacements de petites capitales pour le même rôle.
- Tutoiement, vouvoiement, impératif (« Choisis… », « Choisissez… ») : infinitif ou nom (§ 2.3).
- Options de design en réglages (relief, lumière, ombre portée, arrondi, teinte du fond) ; fausses colonnes d'aperçu.
- Teinter une zone entière pendant un filtre ; bandeau « Filtre « x » : N sur M » ; bordure colorée du champ de filtre → jeton dans le champ, compte en bulle.
- Fonds colorés de bandeaux, lignes, cartes et encadrés ; contours colorés ou en tirets ; liserés autour d'une surface ou d'un groupe de lignes ; fond teinté de toute la surface principale → bandeau neutre, icône colorée, bandeau de type.
- Boîte grise autour d'une explication, d'un encadré de réparation ou d'une ligne de réglage → texte sur le fond, filet.
- Boîtes de groupe en relief (fond, contour, liserés, ombre), pointillés entre sous-groupes → trait de 2 px.
- Point, pastille, trait horizontal ou bord épais pour une couleur de groupe → trait 2 × 12 px.
- Rayures pour signaler un doublon → « ⚠ ×2 ».
- Pilule ou capsule colorée pour un état permanent (élément maître), texte barré → glyphe ◎.
- Nom qui pulse ; tracé d'état animé dans les lignes et les onglets ; fond de ligne coloré par la charge → anneau de pastille, micro-jauge, vibration.
- Rond de statut décoratif (prod, dev, prototype) → rien.
- Rose, magenta → forme (losange).
- Paragraphes et textes colorés par sorte → texte neutre, icône colorée.
- Onglets chargés (mode, tracé, flèche, badge) → pastille + nom.
- Panneaux en contraste inversé ; panneaux côte à côte qui sortent de la fenêtre ; liseré vif ou halo pulsant autour du panneau qui a le clavier → panneau au thème, pile, anneau `accent`.
- Consigne de touches écrite dans un panneau ; « N de plus en dessous » ; date complète sous chaque vignette ; aperçu dans une fenêtre à côté du panneau.
- Phrase d'aide sous chaque champ ; « facultatif » en capsule ; message de réussite (« Nom disponible. ») ; message rouge à l'ouverture ; libellés de formulaire en capitales ; légende de couleurs dans une alerte ; identifiant de processus en capsule.
- Boutons en capsule ou de tailles variées ; bouton désactivé rendu par une couleur pâlie → `fbtn`, opacité 0,45.
- Confirmation d'une action courante dans une fenêtre → bulle de confirmation.
- Journal en lignes à deux étages avec capsules d'état colorées → une ligne, état écrit coloré seulement s'il demande attention.
- Grande icône système pour un état vide ; bouton plein seul au centre → carte d'état neutre ou état vide sobre.
- Encadré gris d'explication ; ⓘ devant chaque motif → « En clair » sans encadré.
- Graphiques bariolés : plafond rouge, projection orange, trait violet, grand aplat, légende → une teinte, repères nommés sur leur ligne.
- Bouton « Rafraîchir » à roue ; « — PÉRIMÉ » ; menu « Rafraîchir » par zone → « Actualiser » en lien, heure du relevé, vitesse globale.
- Message « Copié : … » en bas ; rappel ⌘C ; curseur « copier » de macOS → bulle « Copié ».
- Infobulle du système (sauf réglage contraire de l'utilisateur).
- Inspecteur permanent → fiche sur demande. Graphique dans la barre d'outils → bande de répartition dans la vue.
- Barre de navigation redondante au-dessus du centre → la colonne navigue.
- Phrase sur la règle d'un attribut dans un bandeau ou dans la surface → bulle de la marque.

---

## 14. Écarts connus de la maquette de Régie

La maquette de Régie s'écarte des valeurs de ce gabarit aux endroits listés ici. **La spécification conseille une valeur ; une nouvelle application la suit sauf raison contraire. Pour Régie, l'alignement de la maquette sur ces valeurs reste à décider par l'utilisateur.** Quand le cahier des charges de Régie écrit la valeur de la maquette (rayon 10 des fenêtres modales, voile noir à 50 % en clair, « ⇄ » en 700, nom de l'aperçu en 15 px, point de 10 px des groupes, capsule d'attribut à 16 %), le même arbitrage s'applique.

Renvois : `CSS:n` et `JS:n` désignent la ligne n de `atelier/source/regie.css` et `atelier/source/regie.js` du dépôt `ov-regie-refactorUI`, dans la configuration des cartes validées.

Couleurs, teintes et opacités :

| Objet | Maquette | Spécification | Où |
|---|---|---|---|
| Pastilles colorées de la statusline (élément maître, entité, dépôt sale, quota) | fond de la couleur à 16 % (clair) / 22 % (sombre) | fond `champ` ; marque en texte d'`accent`, valeur anormale en texte de statut (§ 7.8) | JS:847-855 |
| Glyphe ▸▸ du mode, statusline | `#F2C740` en dur | `secondaire` | JS:856 |
| Tuile « Attendu » | `#8E8E93` en dur | `secondaire` | JS:1416 |
| Capsule « scripts » (capsule d'attribut) | `orange` à 16 % | `teinte` (14 % / 18 %) | JS:987 |
| Capsule « Bloqué » (capsule d'état) | `rouge` à 14 % en sombre aussi | `teinte` (18 % en sombre) | JS:1429 |
| Touches de l'application, clavier dessiné | `accent` à 16 % | `teinte` | JS:395 |
| Touches libres ; touches de macOS | opacité 0,9 ; 0,55 | opacité 1 ; 0,45 | JS:395 |
| Couleur choisie, menu des couleurs | `accent` à 18 % | `selection` | JS:1272 |
| Couleurs réservées, menu des couleurs | opacité 0,55 | 0,45 | JS:1272-1280 |
| Bulles de la barre d'outils (tâches, pont) | fond `base`, rayon 12, ombre modale | `mantle`, rayon 10, ombre « flottant » (C § 3.8, 3.9) | JS:919-920 |
| Largeur des fenêtres modales | 460, 520, 540, 560 px selon la fenêtre | 540 px (C § 8.5) | JS:600, JS:1303 |
| Bouton principal désactivé | `accent` à 45 % ; à 40 % (fenêtre de composition) | opacité 0,45 du bouton entier | JS:603, JS:643 |
| Champ de filtre actif | bordure 1 px `accent` | aucun changement hors du jeton | JS:784 |
| Jeton de filtre | compte « 27/34 » dans le jeton | compte dans la bulle du jeton | JS:784 |
| Micro-jauge du tableau dense et des entités | remplissage toujours `secondaire` | paliers de couleur (C § 1.9) | JS:1360, JS:1026 |
| Sous-groupe vivant, colonne de la carte | ▣ en `vert` | neutre (principe 3) | JS:944 |
| Encadré de réparation | fond `champ`, rayon 8 | sans fond | JS:1144, JS:1466 |
| Ligne de Réglages › Groupes | fond `champ`, rayon 6 | ligne de réglage, sans fond | CSS:259, JS:1259 |
| Verre de la fenêtre qui descend du bord | `mantle` à 45 % (clair) / 50 % (sombre) | `mantle` à 48 % | JS:1495 |
| Dégradé de la même fenêtre | 0,5 à 55 % de la hauteur | 0,525 | JS:1501 |
| Halo du texte, même fenêtre | `0 0 5px` `base` à 70 %, actif | désactivé | JS:1501 |
| Poignée, même fenêtre | `rgba(127,127,127,.6)` | `secondaire` à 60 % | CSS:154 |

Graisses :

| Objet | Maquette | Spécification | Où |
|---|---|---|---|
| Gras sans style : mot du bandeau de type, titre de la bulle de détail, titre d'une règle imposée, titre d'une clause, libellé d'interrupteur, titre d'état vide, N de la boîte de carte, titre de la carte, titre de la bulle de contexte | 700 | 600 | JS:890, JS:1363, JS:1063, JS:1068, CSS:102 et JS:1089, CSS:160, JS:993, CSS:237-238, JS:1450 |
| Tokens ≥ 100k (tableau dense) | 700 | 600 | JS:1362 |
| Étiquette de coût au plus haut | `orange` 700 | `orange` 600 | JS:997-1000 |
| Numéro et marques des vignettes | 700 | 600 | CSS:193-197 |
| Nombre de l'icône de la barre des menus | 700 | 600 | JS:1314 |
| « ⇄ » d'un élément distant | 10 px 700 | 10 px 600 | JS:403 |
| Titre de famille de liens | 650 | 600 | CSS:88 |
| En-tête du tableau de réglages | 600 | 400 | CSS:248-250 |

Tailles, interlignes, petites capitales :

| Objet | Maquette | Spécification | Où |
|---|---|---|---|
| Titres des bulles de barre d'outils (contexte, budget, tâches, consommation) | 13 px | 14 px | JS:1450, JS:1461, JS:1469, JS:1474 |
| Titres du panneau de procédure (en-tête, verdict, fin) | 15 px | 16 px | JS:385, JS:379, JS:382 |
| Titre de la fenêtre de composition | 15 px | 16 px | JS:632 |
| Titre du diagnostic | 14 px | 16 px | JS:1228 |
| Nom dans l'aperçu du sélecteur liste et aperçu | 15 px 700 | 16 px 600 | JS:572-573 |
| Corps des fenêtres modales, libellés de champ | 12,5 px | 12 px | JS:600, JS:601 |
| Nom d'une machine (en-tête d'entité) | 11 px 400 `secondaire` | 12 px 600 `texte`, comme une autre entité | JS:775 |
| Tableau des rôles d'une entité | 12 px | 11,5 px | CSS:73-74 |
| Tuiles du quota : libellé ; ligne secondaire ; valeur | 10 px majuscules 0,03 em ; 10 px ; 14 px 700 | 11 px `secondaire` ; 11 px ; 17 px 600 (C § 5.1) | JS:1415, CSS:263, CSS:264 |
| Petites capitales : titre de zone ; famille de liens ; groupe des réglages | 0,04 em ; 0,06 em ; 0,07 em | 0,05 em | CSS:13, CSS:88, CSS:219 |
| Interligne : bulle « fiche » ; règle imposée ; bulle de détail ; aperçu du sélecteur | 1,4 ; 1,4 ; 1,5 ; 1,5 | 1,45 | CSS:226, CSS:92, CSS:211, JS:573 |

Géométrie :

| Objet | Maquette | Spécification | Où |
|---|---|---|---|
| Bulle « fiche » d'une pastille | 260 px, rayon 8, marge 7 × 10 px | 280 px, rayon 9, 6 × 10 px | CSS:226 |
| Menu contextuel d'une ligne | rayon 10 | 9 | JS:345-346 |
| « Ouvrir avec… » | rayon 8 | 9 | CSS:161-162 |
| Menu des couleurs | rayon 8, 11,5 px | rayon 9, 12 px | JS:1272-1280 |
| Fenêtres modales | rayon 10 | 12 | JS:600 |
| Fenêtre de création d'un élément | 520 px | 540 px | JS:1303 |
| Diagnostic | fenêtre modale, fond `base` | feuille de macOS, fond `mantle` | JS:1228 |
| Anneau de la mesure (barre d'outils) | 15 px | 16 px | JS:916 |
| Champs de saisie | 30 px | 28 px | CSS:185, JS:1184 |
| Recherche de la carte | environ 24 px (marge 4 × 10) | 28 px | CSS:239 |
| Boutons de la fenêtre de création | marge 5 × 14 px | `fbtn` (3 × 9 px) | JS:1306 |
| Segments de la fenêtre de création | 3 × 14 px, 12 px | 2 × 9 px, 11,5 px | JS:1300 |
| Segment de la fiche (Effort) | 2 × 12 px | 2 × 9 px | CSS:20 |
| Segment actif, colonne et fiche | sans relief | relief (§ 3.7) | CSS:19 |
| Segment actif, autres segments | `base` en sombre aussi, ombre à 12 % | `segmentActif`, relief à 15 % | CSS:147 |
| Boutons de l'encadré de réparation | capsules (11 px, 1 × 8 px, rayon 9) | `fbtn` | JS:1146, CSS:247 |
| « facultatif », fenêtre de création | capsule | mot `secondaire` | JS:1298 |
| Menu local : palette ; police | `fbtn` « ⌄ » ; texte nu « ⌃⌄ » | `fbtn` « ⌃⌄ » | JS:1177, JS:1178 |
| Point dans un onglet de fiche | 6 px | 8 px (point d'état) | CSS:62 |
| Groupe dans Réglages › Groupes | point de 10 px | trait 2 × 12 px | JS:1259 |
| Trait de groupe : boîte de carte ; colonne de la carte ; méta d'« À traiter » ; rail | 2 × 13 ; 3 × 13 ; 2 × 10 ; 10 × 2 horizontal | 2 × 12 vertical | JS:981, JS:942, JS:770, JS:815 |
| Trait de groupe, pastille d'élément de la statusline | bord de 4 px | 2 px | JS:852 |
| Barres : menu de la barre des menus ; progression segmentée ; liste « qui consomme » | 5 px ; 5 px ; 4 px | 6 px | JS:1318, JS:1029, JS:1474 |
| Survol d'une ligne d'historique | rayon 4 | 5 | CSS:87 |
| Survol d'un lien de fiche | aucun fond | fond `champ` | CSS:77 |
| Tuiles du quota | fond `champ`, rayon 8, écart 6 px | sans fond, écart 16 px (C § 5.1) | CSS:262-263 |
| Étapes en colonne (procédure) | sans nœud | nœud de 17 px | JS:366 |
| Fiche réduite | nom et onglets écrits à la verticale | flèche de dépliage seule (§ 7.2) | JS:1119 |

Ombres et voiles :

| Objet | Maquette | Spécification | Où |
|---|---|---|---|
| Bulle « fiche » d'une pastille | `0 6px 20px rgba(0,0,0,.25)` | flottant | JS:1526 |
| Menu déroulant, « Ouvrir avec… », menu des couleurs | `rgba(0,0,0,.30)` | flottant (`.28`) | CSS:224, CSS:161, JS:1272 |
| Diagnostic | `0 14px 40px rgba(0,0,0,.3)` | ombre de feuille de macOS | JS:1228 |
| Panneau de procédure | `0 20px 50px rgba(0,0,0,.35)` | modale | JS:382-385 |
| Aperçu d'une vignette | `0 18px 50px rgba(0,0,0,.4)` | modale | JS:488 |
| Bords de la pile de demandes | `0 4px 14px rgba(0,0,0,.18)` | mini | JS:594-595 |
| Fenêtre qui descend du bord | `0 18px 40px rgba(0,0,0,.35)` | modale | CSS:151 |
| Voile des fenêtres modales, en clair | noir à 50 % | 32 % | CSS:251 |
| Voile du diagnostic | 25 % | aucun (feuille de macOS) | JS:1228 |
| Voile de l'aperçu d'une vignette | 45 % | `voile` | CSS:198 |
| Voile de la liste des raccourcis | 18 % | aucun | JS:399 |

Simulations de la maquette, qui ne sont pas des écarts : feux de fenêtre (`JS:917`), ombre de la fenêtre (`moteur/atelier.css:102`), matériau du menu de la barre des menus (`JS:1315-1317`), fenêtre des réglages dessinée par-dessus la fenêtre principale avec un voile (`CSS:251-252`) ; l'application emploie les rendus natifs de macOS, et la fenêtre des réglages est une fenêtre à part, sans voile.

---

## 15. Points ouverts

Aucun. Les 22 points relevés à l'extraction de la spécification ont été tranchés par l'utilisateur le 23 oct. dans l'atelier d'arbitrage (`arbitrages/gabarit/`, registre `arbitrages/gabarit/registre-des-choix.md`) et sont reportés dans le texte. Un sujet non tranché qui apparaît s'ajoute ici, avec la position retenue et les options.
