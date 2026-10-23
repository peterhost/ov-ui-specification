// Registre des choix d'un atelier @@@ui, à partir de l'export de sa base (fil, valides) :
// - <registre> : pour chaque carte, l'état (validé ou ouvert), la description, les options et tous les échanges du fil ;
// - <fige> : les choix validés (JSON) ;
// - copie de ces choix dans la source JS de l'atelier (marque /*valides*/…/*fin*/), puis réassemblage de la page.
// Usage, depuis la racine du dépôt de l'application : node <outils>/registre.js [atelier.config.json]
const fs = require('fs');
const path = require('path');
const { lireConfig, assembler } = require('./assembler.js');

const cfg = lireConfig(process.argv[2]);
const R = f => path.resolve(cfg.racine, f);
const app = cfg.application || 'l’application';
const sources = [].concat(cfg.source.js || []);
const avecAxes = sources.find(f => /const AXES=\[/.test(fs.readFileSync(R(f), 'utf8')));
if (!avecAxes) throw new Error('bloc AXES introuvable dans les sources JS');
const js = fs.readFileSync(R(avecAxes), 'utf8');
const AXES = new Function('return [' + js.match(/const AXES=\[([\s\S]*?)\n\];/)[1] + '];')();

const lire = dir => fs.existsSync(R(dir)) ? fs.readdirSync(R(dir)).filter(f => f.endsWith('.json'))
  .map(f => Object.assign({ id: f.replace(/\.json$/, '') }, JSON.parse(fs.readFileSync(R(path.join(dir, f)), 'utf8')))) : [];
const unwrap = d => (d && d.data) ? Object.assign({ id: d.id }, d.data) : d;
const valides = {};
lire(path.join(cfg.donnees, 'valides')).map(unwrap).forEach(v => { valides[v.id] = v; });
const fil = lire(path.join(cfg.donnees, 'fil')).map(unwrap).sort((a, b) => (a.at || '').localeCompare(b.at || ''));

const lab = (a, v) => (a.o.find(o => o[0] === v) || [v, v])[1];
const quand = d => (d.at || '').slice(0, 16).replace('T', ' ');
const out = [];
out.push('# Registre des choix de l\'atelier', '');
out.push(`Généré par \`registre.js\` à partir de \`${cfg.page}\` et de \`${cfg.donnees}/\`. Ne pas éditer à la main.`, '');
out.push('Validé = figé par Pierre dans l\'atelier ; c\'est l\'état de référence. Ouvert = encore en discussion.', '');
const nv = AXES.filter(a => valides[a.k]).length;
out.push(`${nv} cartes validées sur ${AXES.length}.`, '');
out.push('| Carte | Clé | État | Choix |', '|---|---|---|---|');
AXES.forEach(a => { const v = valides[a.k]; out.push(`| ${a.t} | \`${a.k}\` | ${v ? 'validé' : 'ouvert'} | ${v ? lab(a, v.choix) : 'proposé : ' + lab(a, a.prop)} |`); });
out.push('');
AXES.forEach(a => {
  const v = valides[a.k];
  out.push(`## ${a.t} (\`${a.k}\`)`, '');
  out.push(`- État : ${v ? `**validé** — ${lab(a, v.choix)} (\`${v.choix}\`), le ${quand(v)}` : `**ouvert** — proposition : ${lab(a, a.prop)} (\`${a.prop}\`)`}`);
  out.push(`- Actuel dans ${app} : ${lab(a, a.now)} (\`${a.now}\`)`);
  out.push(`- Options : ${a.o.map(o => `${o[1]} (\`${o[0]}\`)`).join(' · ')}`, '', a.why, '');
  const msgs = fil.filter(d => d.axe === a.k || (d.auteur === 'claude' && d.reglage && Object.prototype.hasOwnProperty.call(d.reglage, a.k) && !d.axe));
  if (msgs.length) {
    out.push('Échanges :', '');
    msgs.forEach(d => { out.push(`- **${d.auteur === 'claude' ? 'Claude' : 'Pierre'}**, ${quand(d)} :`); String(d.texte || '').split('\n').forEach(l => out.push('  > ' + l)); });
    out.push('');
  }
});
const general = fil.filter(d => !d.axe && !(d.auteur === 'claude' && d.reglage));
if (general.length) {
  out.push('## Messages généraux du fil', '');
  general.forEach(d => { out.push(`- **${d.auteur === 'claude' ? 'Claude' : 'Pierre'}**, ${quand(d)} :`); String(d.texte || '').split('\n').forEach(l => out.push('  > ' + l)); });
  out.push('');
}
fs.mkdirSync(path.dirname(R(cfg.registre)), { recursive: true });
fs.writeFileSync(R(cfg.registre), out.join('\n'));
const fige = Object.fromEntries(Object.keys(valides).sort().map(k => [k, valides[k].choix]));
fs.writeFileSync(R(cfg.fige), JSON.stringify(fige, null, 1) + '\n');
// Copie dans la source : l'atelier montre l'état validé même sans la base (copie git, autre navigateur).
const marque = /\/\*valides\*\/[\s\S]*?\/\*fin\*\//;
const avecMarque = sources.find(f => marque.test(fs.readFileSync(R(f), 'utf8')));
if (!avecMarque) throw new Error('marque /*valides*/…/*fin*/ introuvable dans les sources JS');
const s = fs.readFileSync(R(avecMarque), 'utf8');
fs.writeFileSync(R(avecMarque), s.replace(marque, () => '/*valides*/' + JSON.stringify(fige) + '/*fin*/'));
assembler(cfg);
console.log(`registre : ${AXES.length} cartes, ${nv} validées, ${fil.length} messages`);
