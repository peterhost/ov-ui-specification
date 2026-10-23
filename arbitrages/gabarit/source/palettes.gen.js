// Génère source/palettes.js à partir de jetons.json de la spécification (jetons à plat, par palette et apparence).
// Usage, depuis arbitrages/gabarit : node source/palettes.gen.js
const fs = require('fs'), path = require('path');
const j = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../jetons.json'), 'utf8'));
const out = {};
for (const [nom, p] of Object.entries(j.palettes)) {
  out[nom] = {};
  for (const ap of ['clair', 'sombre']) {
    const t = p[ap];
    out[nom][ap] = Object.assign({
      base: t.fonds.base, mantle: t.fonds.mantle, crust: t.fonds.crust, champ: t.fonds.champ, separateur: t.fonds.separateur,
      segmentActif: t.fonds.segmentActif, voile: t.fonds.voile, texte: t.texte.principal, secondaire: t.texte.secondaire,
      accent: t.accent.accent, surAccent: t.accent.surAccent, selection: t.accent.selection, teinte: t.accent.teinte,
      vert: t.statuts.vert, jaune: t.statuts.jaune, orange: t.statuts.orange, rouge: t.statuts.rouge,
    }, Object.fromEntries(Object.entries(t.groupes).map(([k, v]) => ['g_' + k, v])),
       Object.fromEntries(Object.entries(t.terminal.ansi).filter(([k]) => k !== 'couleursVives').map(([k, v]) => ['ansi_' + k, v])));
  }
}
fs.writeFileSync(path.join(__dirname, 'palettes.js'), '/* Jetons de la spécification (jetons.json), à plat. Généré par palettes.gen.js. */\nconst JETONS=' + JSON.stringify(out) + ';\n');
console.log('palettes : ' + Object.keys(out).join(', '));
