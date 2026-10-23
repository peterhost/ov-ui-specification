// Assemble la page de l'atelier en un seul fichier HTML (publiable en artifact, ouvrable hors ligne) :
// squelette du moteur + CSS du moteur + CSS de l'application + moteur JS + JS de l'application.
// Usage, depuis la racine du dépôt de l'application : node <moteur>/../outils/assembler.js [atelier.config.json]
// La configuration (voir README.md) dit où sont le moteur, les sources de l'application et la page produite.
const fs = require('fs');
const path = require('path');

function lireConfig(f) {
  const fichier = path.resolve(f || 'atelier.config.json');
  const cfg = JSON.parse(fs.readFileSync(fichier, 'utf8'));
  cfg.racine = path.dirname(fichier);
  return cfg;
}
const lire = (cfg, f) => fs.readFileSync(path.resolve(cfg.racine, f), 'utf8');
const lireListe = (cfg, l) => (Array.isArray(l) ? l : l ? [l] : []).map(f => lire(cfg, f).replace(/\s+$/, '')).join('\n');

function assembler(cfg) {
  const m = cfg.moteur, s = cfg.source;
  const champs = {
    titrePage: s.titrePage || s.titre,
    titre: s.titre,
    intro: s.intro || '',
    nomVues: s.nomVues || 'Vue',
    tete: lireListe(cfg, s.tete),
    css: lire(cfg, path.join(m, 'atelier.css')).replace(/\s+$/, '') + '\n' + lireListe(cfg, s.css),
    outilsTheme: lireListe(cfg, s.outilsTheme),
    outils: lireListe(cfg, s.outils),
    outilsFsTheme: lireListe(cfg, s.outilsFsTheme),
    moteur: lire(cfg, path.join(m, 'atelier.js')).replace(/\s+$/, ''),
    js: lireListe(cfg, s.js),
  };
  // Remplacement en une passe, sans interpréter le contenu (le JS contient des « $ »).
  const page = lire(cfg, path.join(m, 'squelette.html')).replace(/\{\{(\w+)\}\}/g, (x, k) => {
    if (!(k in champs)) throw new Error('champ inconnu dans le squelette : ' + k);
    return champs[k];
  });
  fs.writeFileSync(path.resolve(cfg.racine, cfg.page), page);
  return page;
}

module.exports = { lireConfig, assembler };
if (require.main === module) {
  const cfg = lireConfig(process.argv[2]);
  const page = assembler(cfg);
  console.log(`assemblé : ${cfg.page} (${Math.round(page.length / 1024)} Ko)`);
}
