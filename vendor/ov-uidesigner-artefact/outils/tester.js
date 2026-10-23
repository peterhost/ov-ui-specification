// Tests génériques d'un atelier @@@ui (jsdom, sans navigateur), CDC-ATELIER-UI § 8 :
// - la page est l'assemblage exact des sources ; les choix validés embarqués = <fige> ;
// - contrat des cartes (§ 4.6) ; thème d'UI nommé et, s'il est copié, complet (§ 1.1) ;
// - la page se charge sans erreur ; cartes validées figées, y compris après les préréglages ;
// - chaque vue s'affiche dans chaque thème (et chaque valeur des listes déclarées) ;
// - chaque option de chaque carte s'applique sans erreur ; chaque point ouvre sa vue et encadre son élément ;
// - Avant / Après et touche A.
// Usage, depuis la racine du dépôt de l'application : node <outils>/tester.js [atelier.config.json]
// Configuration (clé « tests » d'atelier.config.json) : ongletsVue ({ vue: [onglets] } pour les vues « vue:onglet »),
// listes (sélecteurs de <select> à parcourir, par exemple la palette), pointsInteractifs (points dont l'élément
// n'apparaît que dans un vrai navigateur, par exemple un menu de sélection de texte : l'audit les couvre).
const fs = require('fs');
const path = require('path');
const os = require('os');
const { JSDOM } = require('jsdom');
const { lireConfig, assembler } = require('./assembler.js');
const contrat = require('./contrat.js');
const theme = require('./theme.js');

const cfg = lireConfig(process.argv[2]);
const T = Object.assign({ ongletsVue: {}, listes: [], pointsInteractifs: [] }, cfg.tests || {});
const R = f => path.resolve(cfg.racine, f);
const html = fs.readFileSync(R(cfg.page), 'utf8');
const echecs = []; let n = 0;
const ok = (c, m) => { n++; if (!c) echecs.push(m); };

{ const tmp = path.join(os.tmpdir(), 'atelier-assemblage-' + process.pid + '.html');
  const page = assembler(Object.assign({}, cfg, { page: path.relative(cfg.racine, tmp) })); fs.unlinkSync(tmp);
  ok(page === html, `page non réassemblée depuis les sources (lancer l'assembleur)`); }
const fige = fs.existsSync(R(cfg.fige)) ? JSON.parse(fs.readFileSync(R(cfg.fige), 'utf8')) : {};
const embarque = JSON.parse((html.match(/\/\*valides\*\/([\s\S]*?)\/\*fin\*\//) || [, 'null'])[1]);
ok(JSON.stringify(embarque) === JSON.stringify(fige), 'choix validés embarqués différents de ' + cfg.fige + ' (lancer le registre)');
contrat(html, { ongletsVue: T.ongletsVue }).forEach(e => ok(false, e));
theme.verifier(cfg).forEach(e => ok(false, e)); n += 1;
n += contrat.compter(html);

const AXES = new Function('return [' + html.match(/const AXES=\[([\s\S]*?)\n\];/)[1] + '];')();
const PTS = (m => m ? new Function('return [' + m[1] + ']]')() : [])(html.match(/const PTS=\[([\s\S]*?)\]\];/));
const dom = new JSDOM('<!doctype html><body>' + html + '</body>', {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'file://' + R(cfg.page),
  beforeParse(w) { w.matchMedia = () => ({ matches: false, addEventListener() {} }); },
});
const w = dom.window;
w.addEventListener('error', e => echecs.push('erreur JS : ' + e.message));
const attendre = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  await attendre(100);
  const d = w.document, win = () => d.getElementById('win');
  const choisi = c => (c.querySelector('[aria-pressed="true"]') || {}).dataset?.v;
  const verifierFiges = etape => {
    const els = [...d.querySelectorAll('.axis')];
    AXES.forEach(a => {
      const c = els.find(e => e.dataset.k === a.k);
      if (!c) { ok(false, `carte introuvable : ${a.k}`); return; }
      if (fige[a.k] !== undefined) { ok(c.classList.contains('frozen'), `${etape} : ${a.k} devrait être figée`); ok(choisi(c) === fige[a.k], `${etape} : ${a.k} = ${choisi(c)}, attendu ${fige[a.k]}`); }
      else if (a.clos) ok(c.classList.contains('frozen') && c.classList.contains('clos'), `${etape} : ${a.k} close devrait être repliée`);
      else ok(!c.classList.contains('frozen'), `${etape} : ${a.k} ne devrait pas être figée`);
    });
  };
  ok(Object.keys(fige).every(k => AXES.some(a => a.k === k && a.o.some(o => o[0] === fige[k]))), 'une valeur validée n\'existe plus dans les options de sa carte');
  verifierFiges('chargement');
  d.getElementById('p-now').click(); verifierFiges('Tout comme aujourd\'hui');
  d.getElementById('p-prop').click(); verifierFiges('Tout proposé');

  // Vues × thèmes × listes.
  const vues = [...d.querySelectorAll('#v-seg button')].map(b => b.dataset.v);
  ok(vues.length > 0, 'aucune vue');
  const themes = [...d.querySelectorAll('#theme-seg button')];
  ok(themes.length === 2, 'thème : deux boutons attendus');
  const combis = T.listes.length ? T.listes.flatMap(sel => { const s = d.querySelector(sel); const vals = s ? [...s.options].map(o => o.value) : []; ok(vals.length, `liste ${sel} absente`); return vals.map(v => [[sel, v]]); }) : [[]];
  for (const combi of combis) {
    combi.forEach(([sel, v]) => { const s = d.querySelector(sel); s.value = v; s.dispatchEvent(new w.Event('change')); });
    for (const tb of themes) {
      tb.click();
      for (const v of vues) {
        try { d.querySelector(`#v-seg button[data-v="${v}"]`).click(); ok(win().innerHTML.length > 0, `${combi.map(x => x[1]).join(' ')} ${tb.textContent} ${v} : vue vide`); }
        catch (e) { ok(false, `${tb.textContent} ${v} : ${e.message}`); }
      }
    }
  }
  verifierFiges('après le tour des vues');

  // Options de chaque carte ouverte.
  for (const a of AXES.filter(x => !x.pv && fige[x.k] === undefined && !x.clos)) {
    for (const [v] of a.o) {
      try { d.querySelector(`.axis[data-k="${a.k}"] .seg button[data-v="${v}"]`).click(); ok(choisi(d.querySelector(`.axis[data-k="${a.k}"] .seg`)) === v, `${a.k} : option ${v} non marquée`); }
      catch (e) { ok(false, `${a.k} = ${v} : ${e.message}`); }
    }
  }

  // Points à valider : ouvrir la vue et encadrer l'élément.
  for (const P of PTS) {
    const card = d.querySelector(`.axis[data-k="pv${P[0]}"]`);
    if (!card) { ok(false, `point ${P[0]} : carte absente`); continue; }
    card.querySelector('.cyc').click(); await attendre(5);
    ok(d.body.dataset.pt === String(P[0]), `point ${P[0]} : non ouvert`);
    if (P[4] && !T.pointsInteractifs.includes(P[0])) ok(win().querySelector('.ptx'), `point ${P[0]} : élément ${P[4]} non encadré`);
  }

  // Avant / Après et touche A.
  d.querySelector('#v-seg button').click();
  d.querySelector('#ba-seg button[data-v="avant"]').click();
  ok(d.querySelector('#ba-seg button[data-v="avant"]').getAttribute('aria-pressed') === 'true', 'Avant non marqué');
  d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'a', bubbles: true }));
  ok(d.querySelector('#ba-seg button[data-v="apres"]').getAttribute('aria-pressed') === 'true', 'touche A : Après non marqué');

  await attendre(50);
  if (echecs.length) { console.log(echecs.slice(0, 60).join('\n')); console.log(`${echecs.length} échec(s) sur ${n} vérifications`); process.exit(1); }
  console.log(`${n} vérifications, aucune erreur`);
  process.exit(0);
})();
