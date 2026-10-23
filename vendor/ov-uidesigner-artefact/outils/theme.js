// Thème d'UI d'un atelier @@@ui (CDC-ATELIER-UI § 1.1) : la spécification d'interface que l'atelier applique.
// Un thème est un dépôt qui contient au moins GABARIT.md, COMPOSANTS.md et jetons.json (palettes → clair/sombre).
// atelier.config.json le nomme : « theme »: { « nom »: <nom dans themes.json>, « copie »: <dossier de la copie,
// relatif au fichier de configuration> }. Sans « copie », seul le nom est vérifié.
const fs = require('fs');
const path = require('path');

const FICHIERS = ['GABARIT.md', 'COMPOSANTS.md', 'jetons.json'];
const catalogue = () => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'themes.json'), 'utf8'));

// Renvoie la liste des écarts au contrat du thème (vide si tout va bien).
function verifier(cfg) {
  const t = cfg.theme, e = [];
  if (!t) return ['atelier.config.json : clé « theme » absente (nom du thème d\'UI, § 1.1)'];
  if (typeof t.nom !== 'string' || !t.nom) return ['theme.nom absent'];
  if (!catalogue().some(x => x.nom === t.nom)) e.push(`thème « ${t.nom} » absent de themes.json`);
  if (t.copie) {
    const dir = path.resolve(cfg.racine, t.copie);
    FICHIERS.forEach(f => { if (!fs.existsSync(path.join(dir, f))) e.push(`thème ${t.nom} : ${f} introuvable dans ${t.copie}`); });
    try {
      const j = JSON.parse(fs.readFileSync(path.join(dir, 'jetons.json'), 'utf8'));
      const p = j.palettes && Object.values(j.palettes);
      if (!p || !p.length || !p.every(x => x.clair && x.sombre)) e.push(`thème ${t.nom} : jetons.json sans palettes clair/sombre`);
    } catch (_) { /* fichier absent : déjà signalé */ }
  }
  return e;
}

module.exports = { verifier, catalogue, FICHIERS };
