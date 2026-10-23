// Audit d'un atelier @@@ui dans un vrai navigateur (Playwright + Chromium), CDC-ATELIER-UI § 8.1 :
// 1. chaque option de chaque carte change l'aperçu (option sans effet = bug) ;
// 2. actions au hasard (graine fixe) ; après chacune, les invariants de l'atelier.
// Usage, depuis la racine du dépôt de l'application :
//   NODE_PATH=$(npm root -g) CHROMIUM=/opt/pw-browsers/chromium node <outils>/audit.js [actions] [graine] [atelier.config.json]
// Configuration (clé « audit » d'atelier.config.json) : vuesSousNav (vues qui ont une sous-navigation),
// sousNav (sélecteur de ses entrées), listes (menus <select> au-dessus de l'aperçu, par exemple la palette).
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { lireConfig } = require('./assembler.js');

const N = +(process.argv[2] || 600), GRAINE = +(process.argv[3] || 7);
const cfg = lireConfig(process.argv[4]);
const AU = Object.assign({ vuesSousNav: [], sousNav: '#subnav [data-sub]', listes: [] }, cfg.audit || {});
const PAGE = path.resolve(cfg.racine, cfg.page), URL = 'file://' + PAGE;
let g = GRAINE; const hasard = n => { g = (g * 1103515245 + 12345) % 2147483648; return g % n; };

(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
  const p = await b.newPage({ viewport: { width: 1500, height: 1000 } });
  const erreurs = [], echecs = [];
  p.on('pageerror', e => erreurs.push(e.message));
  await p.goto(URL); await p.waitForTimeout(400);
  // Toutes les cartes rouvertes (hors ligne : sur cet appareil seulement).
  await p.evaluate(() => { localStorage.clear(); });
  await p.reload(); await p.waitForTimeout(400);
  for (const k of await p.$$eval('.axis.frozen:not(.clos)', x => x.map(e => e.dataset.k))) await p.click(`.axis[data-k="${k}"] .frz`).catch(() => {});
  await p.waitForTimeout(200);

  const invariants = async etape => {
    const r = await p.evaluate(vuesSousNav => {
      const f = [];
      document.querySelectorAll('.axis').forEach(c => {
        if (c.classList.contains('frozen')) {
          if (!/^(validé|clos)/.test(c.querySelector('.now').textContent)) f.push(`${c.dataset.k} : carte figée sans « validé »`);
          return;
        }
        const on = c.querySelectorAll('.seg button[aria-pressed="true"]').length;
        if (on !== 1) f.push(`${c.dataset.k} : ${on} options marquées`);
      });
      for (const id of ['v-seg', 'ba-seg', 'theme-seg']) {
        const on = document.querySelectorAll(`#${id} button[aria-pressed="true"]`).length;
        if (on !== 1) f.push(`#${id} : ${on} boutons marqués`);
      }
      const w = document.getElementById('win');
      if (!w || !w.innerHTML.trim()) f.push('aperçu vide');
      const txt = w ? w.innerText : '';
      if (/\bundefined\b|\bNaN\b|\[object Object\]/.test(txt)) f.push('« undefined », « NaN » ou « [object Object] » affiché');
      const v = document.querySelector('#v-seg button[aria-pressed="true"]')?.dataset.v;
      const sn = document.getElementById('subnav').innerHTML.trim();
      if (vuesSousNav.includes(v) !== !!sn) f.push(`sous-navigation incohérente avec la vue ${v}`);
      const pt = document.body.dataset.pt;
      if (pt && !document.querySelector(`.axis[data-k="pv${pt}"]`)) f.push(`point ${pt} ouvert sans carte`);
      return f;
    }, AU.vuesSousNav);
    r.forEach(x => echecs.push(`${etape} : ${x}`));
  };

  // 1. Options sans effet.
  const cartes = await p.$$eval('.axis:not(.frozen)', x => x.map(e => ({ k: e.dataset.k, o: [...e.querySelectorAll('.seg button')].map(b => b.dataset.v) })));
  // Points sans Avant (rien de visible ne change) : exclus. Lu dans la page.
  const src = fs.readFileSync(PAGE, 'utf8');
  const ptav = new Set((src.match(/const PTAV=new Set\(\[([^\]]*)\]/) || [, ''])[1].split(',').map(x => 'pv' + x.trim()));
  const muettes = [];
  const empreinte = () => p.$eval('#win', w => w.className + '|' + w.getAttribute('style') + '|' + w.innerHTML.replace(/\s+/g, ' '));
  for (const c of cartes) {
    if (/^pv\d+$/.test(c.k) && !ptav.has(c.k)) continue;
    // Un premier clic amène la vue de la carte ; on compare ensuite les options dans cette vue.
    await p.click(`.axis[data-k="${c.k}"] .seg button[data-v="${c.o[0]}"]`); await p.waitForTimeout(30);
    const vus = new Set();
    for (const o of c.o) {
      await p.click(`.axis[data-k="${c.k}"] .seg button[data-v="${o}"]`);
      await p.waitForTimeout(30);
      vus.add(await empreinte());
    }
    if (c.o.length > 1 && vus.size < 2) muettes.push(c.k);
    await invariants(`options de ${c.k}`);
  }

  // 2. Actions au hasard.
  const actions = [
    async () => { const c = cartes[hasard(cartes.length)]; await p.click(`.axis[data-k="${c.k}"] .seg button[data-v="${c.o[hasard(c.o.length)]}"]`); return `option ${c.k}`; },
    async () => { const c = cartes[hasard(cartes.length)]; await p.click(`.axis[data-k="${c.k}"] .cyc`).catch(() => {}); return `vue de ${c.k}`; },
    async () => { const v = await p.$$eval('#v-seg button', x => x.map(b => b.dataset.v)); const x = v[hasard(v.length)]; await p.click(`#v-seg button[data-v="${x}"]`); return `vue ${x}`; },
    async () => { const s = await p.$$eval(AU.sousNav, x => x.length); if (!s) return 'sous-navigation absente'; await p.click(`:nth-match(${AU.sousNav}, ${1 + hasard(s)})`).catch(() => {}); return 'sous-navigation'; },
    async () => { const x = ['avant', 'apres'][hasard(2)]; await p.click(`#ba-seg button[data-v="${x}"]`); return `général ${x}`; },
    async () => { await p.keyboard.press('a'); return 'touche A'; },
    async () => { const n = await p.$$eval('#theme-seg button', x => x.length); const i = hasard(n); await p.click(`#theme-seg button >> nth=${i}`); return `thème ${i}`; },
    async () => { if (!AU.listes.length) return 'pas de liste'; const sel = AU.listes[hasard(AU.listes.length)]; const o = await p.$$eval(sel + ' option', x => x.map(e => e.value)); if (!o.length) return 'liste vide'; const x = o[hasard(o.length)]; await p.selectOption(sel, x); return `liste ${sel} = ${x}`; },
    async () => { const [lw, lh] = await p.$eval('#win', e => [e.clientWidth, e.clientHeight]); await p.click('#win', { position: { x: 20 + hasard(Math.max(1, lw - 40)), y: 20 + hasard(Math.max(1, lh - 40)) } }).catch(() => {}); return 'clic dans l’aperçu'; },
    async () => { await p.keyboard.press('Escape'); return 'Échap'; },
  ];
  for (let i = 0; i < N; i++) {
    const nom = await actions[hasard(actions.length)]();
    if (process.env.AUDIT_TRACE) console.log(i + 1, nom);
    await p.waitForTimeout(15);
    await invariants(`action ${i + 1} (${nom})`);
    if (echecs.length > 40) break;
  }
  await b.close();
  const r = [];
  if (erreurs.length) r.push('Erreurs JS :\n  ' + [...new Set(erreurs)].join('\n  '));
  if (muettes.length) r.push('Options sans effet visible : ' + muettes.join(', '));
  if (echecs.length) r.push('Invariants :\n  ' + echecs.slice(0, 40).join('\n  '));
  console.log(r.length ? r.join('\n') : `Audit : ${cartes.length} cartes, ${N} actions, aucune anomalie`);
  process.exit(r.length ? 1 : 0);
})();
