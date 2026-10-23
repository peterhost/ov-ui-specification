// Met à jour les copies du modèle @@@ui et du thème d'UI dans le dépôt d'une application, puis réassemble l'atelier.
// Usage, depuis la racine du dépôt : node <modèle>/outils/maj-copies.js [atelier.config.json] [<modèle>] [<thème>]
//   <modèle> : copie locale de ov-uidesigner-artefact (défaut ../ov-uidesigner-artefact) ;
//   <thème>  : copie locale du dépôt du thème (défaut ../<theme.nom>).
// Le modèle va dans le dossier parent de « moteur » ; le thème dans « theme.copie », seulement si ce dossier est
// sous vendor/ (un dépôt de thème qui s'applique à lui-même n'a pas de copie). Chaque copie reçoit un VERSION.
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const [conf = 'atelier.config.json', mod = '../ov-uidesigner-artefact', themeArg] = process.argv.slice(2);
const fichierCfg = path.resolve(conf), racineCfg = path.dirname(fichierCfg);
const cfg = JSON.parse(fs.readFileSync(fichierCfg, 'utf8'));
const vendor = path.resolve('vendor');
const commit = d => { try { return execSync('git rev-parse HEAD', { cwd: d, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch (_) { return 'inconnu'; } };
const version = (depot, src) => `Copie de github.com/${depot}\ncommit : ${commit(src)}\ncopié le : ${new Date().toISOString().slice(0, 19)}Z\n`;
const remplacer = (src, dst, quoi) => {
  fs.rmSync(dst, { recursive: true, force: true }); fs.mkdirSync(dst, { recursive: true });
  quoi.forEach(f => fs.cpSync(path.join(src, f), path.join(dst, f), { recursive: true }));
};
const echec = m => { console.error(m); process.exit(1); };

if (!fs.existsSync(path.join(mod, 'moteur/atelier.js'))) echec('modèle introuvable : ' + mod);
const dstMod = path.dirname(path.resolve(racineCfg, cfg.moteur));
if (!dstMod.startsWith(vendor + path.sep)) echec('« moteur » ne pointe pas dans vendor/ : ' + cfg.moteur);
remplacer(mod, dstMod, ['moteur', 'outils', 'CDC-ATELIER-UI.md', 'themes.json']);
fs.writeFileSync(path.join(dstMod, 'VERSION'), version('peterhost/ov-uidesigner-artefact', mod));
console.log('modèle copié dans ' + path.relative('.', dstMod));

const t = cfg.theme;
if (!t || !t.nom) echec('atelier.config.json : clé « theme » absente (CDC-ATELIER-UI § 1.1)');
const dstTh = t.copie && path.resolve(racineCfg, t.copie);
if (dstTh && dstTh.startsWith(vendor + path.sep)) {
  const src = themeArg || path.join('..', t.nom);
  const { FICHIERS, catalogue } = require(path.join(dstMod, 'outils/theme.js'));
  FICHIERS.forEach(f => { if (!fs.existsSync(path.join(src, f))) echec(`thème introuvable : ${src} (${f})`); });
  remplacer(src, dstTh, FICHIERS);
  const depot = (catalogue().find(x => x.nom === t.nom) || {}).depot || t.nom;
  fs.writeFileSync(path.join(dstTh, 'VERSION'), version(depot, src));
  console.log('thème ' + t.nom + ' copié dans ' + path.relative('.', dstTh));
}
execSync(`node ${JSON.stringify(path.join(dstMod, 'outils/assembler.js'))} ${JSON.stringify(conf)}`, { stdio: 'inherit' });
