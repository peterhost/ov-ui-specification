/* Atelier d'arbitrage des points ouverts du gabarit (GABARIT.md § 15).
   Une carte par point ; la vue du point montre toutes ses options côte à côte, dessinées avec les jetons
   du gabarit ; l'option choisie dans la carte est encadrée. Valider fige le choix (base de l'atelier). */
(function(){
const AXES=[
 {k:'p1',t:'1 · Sourdine hors des mesures',why:'La sourdine (surfaces colorées atténuées, petites marques en pleine couleur) vaut pour les graphiques, les tuiles et les capsules de mesure. Faut-il l’étendre aux barres de mesure, micro-jauges et fonds de capsule ailleurs ? G § 3.5.',o:[['A','A · Mesures seulement (retenu)'],['B','B · Toute surface colorée']],now:'A',prop:'A'},
 {k:'p2',t:'2 · Couleur du bandeau de l’élément maître',why:'Vert, jaune, orange, rouge ne servent qu’aux statuts. Jaune = « une question attend une réponse » (point jaune de la pastille). Le bandeau de l’élément maître est jaune lui aussi : à côté d’une pastille jaune, il peut se lire comme une question. G § 2.4.',o:[['A','A · Maître en jaune'],['B','B · Maître en accent (retenu)'],['C','C · Fond neutre, mot coloré']],now:'B',prop:'B'},
 {k:'p3',t:'3 · Couleur d’une demande en attente',why:'Trait et 🔒 d’une demande en attente (mot de passe…), dans la colonne et sur son panneau. G § 9.5.',o:[['A','A · Un seul cyan (retenu)'],['B','B · Quatre nuances'],['C','C · Jaune']],now:'A',prop:'A'},
 {k:'p4',t:'4 · Teintes de groupe portées par des marques',why:'Sarcelle pour « distant » et le mode plan, lavande pour le mode édition : un élément d’un groupe sarcelle prend la même teinte que sa marque. G § 2.4.',o:[['A','A · Garder (retenu)'],['B','B · Teinte réservée aux marques'],['C','C · Marques en gris']],now:'A',prop:'A'},
 {k:'p5',t:'5 · Pied « ↵ insérer · ⇥ compléter »',why:'Le sélecteur liste et aperçu (@@@) écrit ses touches en pied, contre le principe 6 (pas de rappel de touches écrit). C § 8.2.',o:[['A','A · Garder le pied (retenu)'],['B','B · Touches dans la bulle de l’en-tête']],now:'A',prop:'A'},
 {k:'p6',t:'6 · Référence du graphique horaire',why:'Ligne du débit autorisé sur le graphique des 48 heures. G § 7.12.',o:[['A','A · Tirets gris (retenu)'],['B','B · Tirets accent']],now:'A',prop:'A'},
 {k:'p7',t:'7 · Heure du relevé et « Actualiser »',why:'Ordre des deux mots à droite de l’en-tête d’une vue de mesures. G § 9.8.',o:[['A','A · relevé 01:08 · Actualiser (retenu)'],['B','B · Actualiser · 01:08']],now:'A',prop:'A'},
 {k:'p8',t:'8 · Élément sur une machine injoignable',why:'Dans la colonne et dans le sélecteur ⌘P (où l’on va insérer son nom). G § 9.13.',o:[['A','A · Gris dans la colonne, orange dans ⌘P (retenu)'],['B','B · « hors ligne » orange partout'],['C','C · « injoignable » gris partout']],now:'A',prop:'A'},
 {k:'p9',t:'9 · Annuler un arrêt programmé (⊗)',why:'En-tête d’une entité qui s’éteint dans quelques secondes. C § 1.10.',o:[['A','A · Au survol (retenu)'],['B','B · Toujours visible']],now:'A',prop:'A'},
 {k:'p10',t:'10 · Pulsation d’une marque d’anomalie',why:'Quand « Animations de l’interface » est coupé, la marque qui pulse (◎ orange) continue-t-elle ? Seul « Réduire les animations » de macOS fige tout. G § 6.',o:[['A','A · Signal : elle pulse encore (retenu)'],['B','B · Transition : elle se fige']],now:'A',prop:'A'},
 {k:'p11',t:'11 · Réglages de choix de design',why:'Régie a deux réglages qui ne règlent qu’un choix de design (modes affichés ; flèche ou anneau), contre le principe 10. G § 1.',o:[['A','A · Nouvelles applications sans (retenu)'],['B','B · Les retirer de Régie aussi'],['C','C · Exceptions nommées']],now:'A',prop:'A'},
 {k:'p12',t:'12 · Réglages › Groupes : voir une couleur en clair et en sombre',why:'Une couleur de groupe change entre le thème clair et le thème sombre. Pour la choisir, la voir dans les deux thèmes : où ? G § 3.4.',o:[['A','A · Deux pastilles par teinte, dans le menu'],['B','B · Deux aperçus de la colonne, clair et sombre (retenu)']],now:'B',prop:'B'},
 {k:'p13',t:'13 · Style des textes',why:'Ni tutoiement ni vouvoiement : infinitif pour une action, nom ou participe pour un état. Décidé par l’utilisateur, règle générale. G § 1 (principe 15), § 2.3.',o:[['A','A · L’interface tutoie'],['B','B · Style neutre (décidé)']],now:'B',prop:'B'},
 {k:'p14',t:'14 · Taille minimale et barre de titre',why:'Deux détails de la fenêtre de Régie : taille minimale 1120 × 640 ; aucun titre écrit sous macOS 15 et plus, nom de l’application et sous-titre sous macOS 14. Règle pour toute application, ou détail propre à Régie ? G § 2.6.',o:[['A','A · Règle pour toute application (retenu)'],['B','B · Propre à Régie']],now:'A',prop:'A'},
 {k:'p15',t:'15 · Progression en tranches',why:'Barre d’une campagne (acceptés, en attente, refusés, reste), que le cahier des charges ne dessine pas. C § 7.1.',o:[['A','A · Segments séparés (retenu)'],['B','B · Barre continue et compte']],now:'A',prop:'A'},
 {k:'p16',t:'16 · Catégorie coûteuse en orange',why:'Bande fine de la consommation par modèle : la catégorie coûteuse est orange sans être une anomalie. G § 7.12.',o:[['A','A · Exception générique (retenu)'],['B','B · Neutre, sauf anomalie']],now:'A',prop:'A'},
 {k:'p17',t:'17 · Formes d’état vide',why:'État vide d’une vue entière et de la surface principale. C § 2.6, § 2.8.',o:[['A','A · Centré et carte (retenu)'],['B','B · Toujours la carte']],now:'A',prop:'A'},
 {k:'p18',t:'18 · Voile de la liste des raccourcis',why:'Liste affichée en tenant ⌘ une seconde. G § 3.7.',o:[['A','A · Sans voile (retenu)'],['B','B · Voile à 18 %']],now:'A',prop:'A'},
 {k:'p19',t:'19 · Armement de ⌫',why:'Un premier ⌫ arme la suppression d’une capture, le second l’envoie à la corbeille. C § 8.3.',o:[['A','A · Sans délai (retenu)'],['B','B · Désarmé après 1,5 s']],now:'A',prop:'A'},
 {k:'p20',t:'20 · Composants propres à Claude Code',why:'Le catalogue décrit des composants qui n’existent que dans une application de pilotage de Claude Code (hooks, onglet Session). COMPOSANTS.md.',o:[['A','A · Composants génériques (retenu)'],['B','B · Exemples de Régie']],now:'A',prop:'A'},
 {k:'p21',t:'21 · Message d’action',why:'Résultat d’une action en arrière-plan (« Collé dans ov-farm »). La maquette ne le dessine pas. C § 2.7.',o:[['A','A · En bas à gauche, reste'],['B','B · En bas à droite, s’efface après 4 s (retenu)']],now:'B',prop:'B'},
 {k:'p22',t:'22 · Couleurs ANSI du terminal',why:'dotlib ne définit pas de couleurs ANSI. G § 2.1.',o:[['A','A · Tirées des jetons (retenu)'],['B','B · Thème officiel de la palette']],now:'A',prop:'A'}
];
/* Moteur : état, cartes, fil, validations. */
const A=Atelier.creer({cle:'gabarit-points-ouverts-v1',cartes:AXES,etat:{palette:'catppuccin'}});
const st=A.st;
const VUES=[['p1','1'],['p2','2'],['p3','3'],['p4','4'],['p5','5'],['p6','6'],['p7','7'],['p8','8'],['p9','9'],['p10','10'],['p11','11'],['p12','12'],['p13','13'],['p14','14'],['p15','15'],['p16','16'],['p17','17'],['p18','18'],['p19','19'],['p20','20'],['p21','21'],['p22','22']];
const WHERE={p1:['p1'],p2:['p2'],p3:['p3'],p4:['p4'],p5:['p5'],p6:['p6'],p7:['p7'],p8:['p8'],p9:['p9'],p10:['p10'],p11:['p11'],p12:['p12'],p13:['p13'],p14:['p14'],p15:['p15'],p16:['p16'],p17:['p17'],p18:['p18'],p19:['p19'],p20:['p20'],p21:['p21'],p22:['p22']};
const HL=Object.fromEntries(AXES.map(a=>[a.k,'.opt.choix']));
const VALIDES_FIGES=/*valides*/{"p1":"A","p10":"A","p11":"A","p12":"B","p13":"B","p14":"A","p15":"A","p16":"A","p17":"A","p18":"A","p19":"A","p2":"B","p20":"A","p21":"B","p22":"A","p3":"A","p4":"A","p5":"A","p6":"A","p7":"A","p8":"A","p9":"A"}/*fin*/;

const rgba=(hex,a)=>{const n=parseInt(hex.slice(1),16);return 'rgba('+(n>>16&255)+','+(n>>8&255)+','+(n&255)+','+a+')';};
const melange=(a,b)=>{const x=parseInt(a.slice(1),16),y=parseInt(b.slice(1),16);const c=s=>Math.round(((x>>s&255)+(y>>s&255))/2);return '#'+[16,8,0].map(s=>c(s).toString(16).padStart(2,'0')).join('');};
const esc=s=>String(s).replace(/[&<>"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));

/* Petits composants du gabarit, aux mesures de COMPOSANTS.md. */
const fen=(titre,corps,h)=>`<div class="mw"${h?` style="height:${h}px"`:''}><div class="mwt"><i></i><i></i><i></i><span>${titre||''}</span></div><div class="mwb">${corps}</div></div>`;
const trait=(col,h)=>`<b class="tr" style="background:${col};height:${h||12}px"></b>`;
const ligne=(contenu,cls,style)=>`<div class="ln ${cls||''}" style="${style||''}">${contenu}</div>`;
const cap=(txt,col,P)=>`<span class="cap" style="background:${rgba(col,P.sombre?.18:.14)};color:${col}">${txt}</span>`;
const legende=t=>`<div class="lg">${t}</div>`;

function illustrer(k,v,P){
  const sub=P.secondaire,acc=P.accent;
  switch(k){
  case 'p1':{
    const S=v==='B';
    const barres=[40,55,92,70,30,25,88,97].map((h,i)=>{const col=h>=95?P.rouge:h>=85?P.orange:P.secondaire;const op=col===P.secondaire?.35:.6;return `<i style="height:${h*.5}px;background:${col};opacity:${op}"></i>`;}).join('');
    const mj=(p,col)=>`<span class="mj"><i style="width:${p}%;background:${col};opacity:${S?.55:1}"></i></span>`;
    return fen('Mesures',`<div class="bars">${barres}</div>`+legende('graphique : sourdine dans les deux cas')+
      ligne(`<span class="pd" style="background:${P.vert}"></span><span class="nm">ov-farm</span>${mj(80,P.orange)}<span class="mt">80 %</span>`)+
      ligne(`<span class="pd" style="background:${P.vert}"></span><span class="nm">indexer</span>${mj(94,P.rouge)}<span class="mt">94 %</span>`)+
      `<div class="mbar"><i style="width:92%;background:${P.rouge};opacity:${S?.55:1}"></i></div>`+legende('micro-jauges et barre de mesure'),200);}
  case 'p2':{
    const M=v==='B'?acc:P.jaune;
    const T=[['Maître',M,'overview'],['Écriture',P.orange,'refonte-ui'],['Lecture seule',P.g_slate,'audit']];
    return fen('Régie',ligne(`<span class="pd" style="background:${P.jaune}"></span><span class="nm">indexer</span><span class="mt" style="color:${P.jaune}">question</span>`)+
      ligne(`<span class="pd" style="background:${P.vert}"></span><span class="nm">overview</span>`)+
      T.map(([m,col,n])=>`<div class="bandeau" style="background:${v==='C'?P.champ:rgba(col,P.sombre?.18:.14)}"><b style="color:${col}">${m}</b><span>overview › ${n}</span></div>`).join('')+legende('pastille jaune : question en attente'),200);}
  case 'p3':{
    const N=v==='A'?[P.g_cyan,P.g_cyan,P.g_cyan]:v==='B'?[P.g_cyan,P.g_teal,melange(P.g_cyan,P.g_blue)]:[P.jaune,P.jaune,P.jaune];
    return fen('Colonne',['creation','git-local','nas2-backup'].map((n,i)=>ligne(`<span class="pd" style="background:${P.vert}"></span><span class="nm">${n}</span><span style="margin-left:6px">🔒</span>`,'',`box-shadow:inset 2px 0 0 ${N[i]}`)).join('')+legende('trois demandes de mot de passe en attente'),170);}
  case 'p4':{
    const M=v==='A'?P.g_teal:v==='B'?melange(acc,sub):sub;
    return fen('Colonne',`<div class="gh">${trait(P.g_teal)}<span>Infra partagée</span><span class="mt">2/3</span></div>`+
      ligne(`<span class="pd" style="background:${P.vert}"></span><span class="mode" style="color:${M}">⏸</span><span class="nm">plans-nas</span>`)+
      ligne(`<span class="pd" style="background:${P.vert}"></span><span class="mode" style="color:${v==='A'?P.g_lavender:M}">✎</span><span class="nm">refonte</span>`)+
      ligne(`<span class="pd" style="background:${P.vert}"></span><span class="mode"></span><span class="nm">ovtest<sup style="color:${M};font-weight:600">⇄</sup></span>`,'',`background-image:repeating-linear-gradient(to bottom,${M} 0 3px,transparent 3px 6px);background-size:2px 100%;background-repeat:no-repeat`)+
      legende(v==='B'?'marques : teinte réservée (exemple)':'groupe sarcelle ; marques : plan, édition, distant'),190);}
  case 'p5':{
    const pied=v==='A'?`<div class="pied">↵ insérer · ⇥ compléter</div>`:'';
    const tete=`<div class="sel-h"><span>@@@</span><span style="margin-left:auto;color:${sub}" title="↵ insérer · ⇥ compléter">ⓘ</span>${v==='B'?`<span class="bul">↵ insérer · ⇥ compléter</span>`:''}</div>`;
    return `<div class="pnl">${tete}<div class="sel-g"><div>${['ui','qa','plan'].map((x,i)=>`<div class="ln${i===0?' on':''}"><span class="nm">@@@${x}</span></div>`).join('')}</div><div class="sel-a"><b>@@@ui</b><div style="color:${sub};font-size:11px">Atelier d’interface</div></div></div>${pied}</div>`;}
  case 'p6':{
    const H=[.2,0,0,.3,0,0,0,.4,0,1.5,2.4,1.9,2.2,1.4],aut=.79,M=2.5,W=240,Hh=70,bw=W/H.length,y=x=>Hh-x/M*Hh;
    const col=v==='A'?sub:acc;
    let g=`<svg viewBox="0 0 ${W+24} ${Hh+14}" width="100%">`+[0,1,2].map(i=>`<line x1="0" x2="${W}" y1="${y(i)}" y2="${y(i)}" stroke="${P.separateur}" stroke-width=".6"/><text x="${W+5}" y="${y(i)+3}" font-size="8" fill="${sub}">${i}</text>`).join('');
    H.forEach((x,i)=>{if(!x)return;const o=x>aut;g+=`<rect x="${i*bw+1.5}" y="${y(x)}" width="${bw-3}" height="${Hh-y(x)}" rx="1.5" fill="${o?P.orange:sub}" opacity="${o?.5:.35}"/>`;});
    g+=`<line x1="0" x2="${W}" y1="${y(aut)}" y2="${y(aut)}" stroke="${col}" stroke-width="1" stroke-dasharray="3 3"/><text x="4" y="${y(aut)-3}" font-size="8.5" fill="${col}" stroke="${P.base}" stroke-width="3" paint-order="stroke">autorisé 0,79 pt/h</text></svg>`;
    return fen('Les 48 dernières heures',g,150);}
  case 'p7':return fen('Quota',`<div class="vh"><b>Quota 7 jours</b><span style="margin-left:auto"></span>${v==='A'?`<span style="color:${sub}">relevé 01:08</span><span style="color:${sub}">·</span><span style="color:${acc}">Actualiser</span>`:`<span style="color:${acc}">Actualiser</span><span style="color:${sub}">·</span><span style="color:${sub}">01:08</span>`}</div>`,90);
  case 'p8':{
    const col=v==='A'?[sub,'injoignable',P.orange,'hors ligne']:v==='B'?[P.orange,'hors ligne',P.orange,'hors ligne']:[sub,'injoignable',sub,'injoignable'];
    return fen('Colonne',ligne(`<span class="pd" style="background:transparent;box-shadow:inset 0 0 0 1.5px ${sub}"></span><span class="nm">indexer<sup style="color:${P.g_teal}">⇄</sup></span><span class="mt" style="color:${col[0]}">${col[1]}</span>`),70)+
      `<div class="pnl" style="margin-top:8px"><div class="pnf">ov-regie/<span style="color:${sub}">▍</span></div>${ligne(`<span class="nm"><span style="color:${sub}">ov-regie/</span>indexer <span style="color:${sub}">@nas1</span></span><span style="font-size:10.5px;color:${col[2]};margin-left:6px">${col[3]}</span>`,'on')}</div>`;}
  case 'p9':{
    const eh=(hov,x)=>`<div class="ent${hov?' hov':''}">${trait(P.g_blue)}<b>forge</b><span class="mt">1/4</span><span style="margin-left:auto;color:${P.orange}">extinction dans 11 s</span>${x?`<span class="x">⊗</span>`:''}</div>`;
    return fen('Colonne',eh(false,v==='B')+legende('au repos')+eh(true,true)+legende('au survol'),150);}
  case 'p10':{
    const anime=v==='A';
    return fen('Colonne',ligne(`<span class="pd" style="background:${P.vert}"></span><span class="nm">coordination</span><span class="${anime?'pulse':''}" style="color:${P.orange};margin-left:6px">◎</span><span style="color:${P.orange};font-size:11px;margin-left:4px">⚠</span>`)+legende('« Animations de l’interface » coupé : '+(anime?'la marque pulse encore':'la marque est figée')),100);}
  case 'p11':{
    const lignes=`<div class="gl"><span>Modes affichés</span><span class="sgs"><span class="on">Tous</span><span>Exceptions</span></span></div><div class="gl"><span>Version en retard</span><span class="sgs"><span class="on">Flèche</span><span>Anneau</span></span></div>`;
    const pane=(t,avec,tag)=>`<div class="pane"><div class="pt">${t}</div>${avec?lignes+(tag?legende('exceptions nommées au principe 10'):''):`<div class="gl"><span>Largeur</span><span style="color:${sub}">290 px</span></div>`+legende('pas de réglage de design')}</div>`;
    return `<div class="duo col">${pane('Régie',v!=='B',v==='C')}${pane('Nouvelle application',v==='C',v==='C')}</div>`;}
  case 'p12':{
    const JC=JETONS[st.palette].clair,JS=JETONS[st.palette].sombre;
    const R=[['Infra partagée','g_purple','Violet'],['Outils','g_blue','Bleu'],['Shell','g_teal','Sarcelle']];
    const liste=R.map(([n,g,cn])=>`<div class="pr">${trait(P[g])}<span>${n}</span><span style="margin-left:auto">${cn} ⌄</span></div>`).join('');
    const menu=v==='A'?`<div class="menu">${R.map(([n,g,cn])=>`<div class="mi"><span class="paire"><i style="background:${JC[g]}"></i><i style="background:${JS[g]}"></i></span>${cn}</div>`).join('')}</div>`:'';
    const apercus=v==='B'?`<div class="duo">${[JC,JS].map(T=>`<div class="minicol" style="background:${T.mantle};color:${T.texte};box-shadow:0 0 0 1px ${T.separateur}">${R.map(([n,g])=>`<div>${trait(T[g],10)} ${n}</div>`).join('')}</div>`).join('')}</div>`:'';
    return fen('Réglages › Groupes',liste+menu+apercus+legende(v==='A'?'menu ouvert : clair | sombre':'colonne en clair | en sombre, en direct'),v==='A'?250:220);}
  case 'p13':{
    const T=v==='A'?['Choisis la session cible.','Tu as utilisé 99 % de ta semaine.','Recrée la clé d’abord.']:['Session cible à choisir.','99 % de la semaine utilisés.','Clé à recréer d’abord.'];
    return fen('Textes',T.map(t=>`<div class="tx">${t}</div>`).join('')+legende('bulles et messages'),130);}
  case 'p14':{
    const et=t=>`<div style="font-size:10px;color:${sub};padding:4px 8px 2px">${t}</div>`;
    const barre=(titre)=>`<div class="mwt"><i></i><i></i><i></i><span>${titre}</span></div>`;
    const app=(n,sous,min,regle)=>`<div class="fenmin"><div style="font-size:11px;font-weight:600;padding:6px 8px 0">${n}</div>`+
      (regle?et('macOS 15 et plus')+barre('')+et('macOS 14')+barre(n+'&nbsp;&nbsp;<span style="color:'+sub+'">'+sous+'</span>')+`<div class="dim" style="height:44px">au moins ${min}</div>`
            :`<div class="dim" style="height:96px">au choix de l’application</div>`)+`</div>`;
    return `<div class="duo">${app('Régie','Ghostty','1120 × 640',true)}${app('Notes','dossier','900 × 560',v==='A')}</div>`;}
  case 'p15':{
    const parts=[[3,P.texte],[2,sub],[1,P.rouge],[2,P.separateur]];
    const barre=v==='A'?`<div class="seg-bar">${parts.map(([n,c])=>`<i style="flex:${n};background:${c}"></i>`).join('')}</div>`:`<div class="cont-bar">${parts.map(([n,c])=>`<i style="flex:${n};background:${c}"></i>`).join('')}</div><div style="font-size:11px;color:${sub};margin-top:4px"><b style="color:${P.texte}">3</b>/8 acceptés · 1 refusé</div>`;
    return fen('Campagne',`<div class="fsec">Campagne</div>${barre}<div style="font-size:11px;color:${sub};margin-top:6px">tranche 2 sur 2</div>`,120);}
  case 'p16':{
    const parts=[[55,P.texte,.85],[30,P.texte,.55],[15,v==='A'?P.orange:sub,v==='A'?1:.85]];
    return fen('Modèles · 5 h',`<div class="mbar" style="display:flex;gap:2px;background:none">${parts.map(([w,c,o])=>`<i style="width:${w}%;background:${c};opacity:${o};position:static;border-radius:3px"></i>`).join('')}</div><div style="display:flex;gap:12px;font-size:11px;color:${sub};margin-top:5px"><span>opus 55 %</span><span>sonnet 30 %</span><span ${v==='A'?`style="color:${P.orange}"`:''}>fable 15 %</span></div>`,100);}
  case 'p17':{
    const carte=`<div class="carte-etat"><b>Aucune session vivante</b><span style="color:${sub}">reno-cabanne · 3 sessions passées</span><span class="fbtn prim">Nouvelle session</span></div>`;
    const centre=`<div class="centre-etat"><b>Aucun projet</b><span style="color:${sub}">Les projets du manifeste apparaissent ici.</span></div>`;
    return `<div class="duo">${fen('Vue entière',v==='A'?centre:carte,170)}${fen('Surface principale',carte,170)}</div>`;}
  case 'p18':return fen('Régie',`<div class="fond-app">${[1,2,3,4].map(()=>`<div class="faux"></div>`).join('')}</div>${v==='B'?`<div class="voile" style="background:rgba(0,0,0,.18)"></div>`:''}<div class="pnl racc"><div class="fsec">Voir et insérer</div><div class="kr"><span class="key">P</span>Projet/session</div><div class="kr"><span class="key">L</span>Raccourcis @@@</div><div class="kr"><span class="key">K</span>Fiche du projet</div></div>`,190);
  case 'p19':{
    const vg=i=>`<div class="vig${i===1?' arm':''}"><div class="img"></div>${i===1?`<span class="del">⌫</span>${v==='B'?`<span class="decompte"></span>`:''}`:''}<span class="h">11:4${i}</span></div>`;
    return fen('Captures',`<div class="bande">${[0,1,2].map(vg).join('')}</div>`+legende(v==='A'?'armée jusqu’au second ⌫ ou à un changement de choix':'désarmée seule après 1,5 s'),150);}
  case 'p20':{
    const gen=['4.7 Liens par famille','4.8 Hooks','4.12 Dépliant d’explication','4.13 Onglet Session'];
    return fen('COMPOSANTS.md',v==='A'?`<div class="fsec">4. Fiche</div>${gen.map(x=>`<div class="toc">${x}</div>`).join('')}`:`<div class="fsec">4. Fiche</div>${[gen[0],gen[2]].map(x=>`<div class="toc">${x}</div>`).join('')}<div class="fsec" style="margin-top:8px">Exemples de Régie</div>${[gen[1],gen[3]].map(x=>`<div class="toc" style="color:${sub}">${x}</div>`).join('')}`,170);}
  case 'p21':return fen('Régie',`<div class="term" style="height:96px">❯ ▍</div><div class="msg-act${v==='B'?' droite efface':''}">Collé dans ov-farm</div>`,150);
  case 'p22':{
    const off=st.palette==='catppuccin'?(P.sombre?{noir:'#45475A',noirVif:'#585B70',blanc:'#BAC2DE',blancVif:'#A6ADC8'}:{noir:'#5C5F77',noirVif:'#6C6F85',blanc:'#ACB0BE',blancVif:'#BCC0CC'}):null;
    const C=v==='A'||!off?{noir:P.ansi_noir,noirVif:P.ansi_noirVif,blanc:P.ansi_blanc,blancVif:P.ansi_blancVif}:off;
    const sw=(n,c)=>`<span class="sw"><i style="background:${c}"></i>${n}</span>`;
    return fen('Terminal',`<div class="term"><div><span style="color:${P.ansi_bleu}">src/</span>  <span style="color:${P.ansi_vert}">build.sh</span>  <span style="color:${C.noirVif}"># commentaire</span></div><div><span style="background:${C.noir};color:${C.blancVif};padding:0 4px">noir</span> <span style="color:${C.blanc}">blanc</span> <span style="color:${P.ansi_rouge}">erreur</span> <span style="color:${P.ansi_jaune}">attention</span></div></div><div class="sws">${sw('noir',C.noir)}${sw('noir vif',C.noirVif)}${sw('blanc',C.blanc)}${sw('blanc vif',C.blancVif)}</div>`+(v==='B'&&!off?legende('valeurs officielles : catppuccin seulement dans cette maquette'):''),170);}
  }
  return '';
}

/* Rendu : la vue d'un point montre toutes ses options ; l'option de la carte est encadrée. */
function dessiner(){
  const NOW={};AXES.forEach(a=>NOW[a.k]=a.now);
  const c=st.view==='avant'?NOW:st.c;
  const P=Object.assign({sombre:st.theme==='sombre'},JETONS[st.palette][st.theme]);
  const w=document.getElementById('win');
  Object.entries(P).forEach(([k,v])=>{if(typeof v==='string')w.style.setProperty('--w-'+k,v);});
  const k=st.v2,a=AXES.find(x=>x.k===k);
  const choix={p1:c.p1,p2:c.p2,p3:c.p3,p4:c.p4,p5:c.p5,p6:c.p6,p7:c.p7,p8:c.p8,p9:c.p9,p10:c.p10,p11:c.p11,p12:c.p12,p13:c.p13,p14:c.p14,p15:c.p15,p16:c.p16,p17:c.p17,p18:c.p18,p19:c.p19,p20:c.p20,p21:c.p21,p22:c.p22}[k];
  const fige=st.frz&&st.frz[k]!==undefined;
  w.innerHTML=`<div class="ar-h"><b>${esc(a.t)}</b><span>${esc(a.why)}</span></div><div class="ar-g n${a.o.length}">`+a.o.map(([v,l])=>`<div class="opt${v===choix?' choix':''}"><div class="opt-l">${esc(l)}${v===choix?`<span class="opt-c">${fige?'validé':'choisi'}</span>`:''}</div><div class="opt-i">${illustrer(k,v,P)}</div></div>`).join('')+`</div>`;
  document.getElementById('legend').innerHTML='<span>Jetons de la spécification (jetons.json), palette '+esc(st.palette)+'.</span>';
}
function render(){A.render();}
document.getElementById('palette').addEventListener('change',e=>{st.palette=e.target.value;try{localStorage.setItem('gabarit-points-ouverts-v1-palette',st.palette)}catch(_){}render();});
try{const p=localStorage.getItem('gabarit-points-ouverts-v1-palette');if(p&&JETONS[p]){st.palette=p;document.getElementById('palette').value=p;}}catch(_){}
A.lancer({vues:VUES,vuesCarte:WHERE,encadrer:HL,valides:VALIDES_FIGES,rendu:dessiner,vueDefaut:'p1',
  ref:p=>{st.palette=p.palette||'catppuccin';document.getElementById('palette').value=st.palette;}});
})();
