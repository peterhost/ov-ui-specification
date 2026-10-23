// Contrat des cartes d'un atelier @@@ui (CDC-ATELIER-UI § 4.6) : contrôles statiques sur la page assemblée.
// Rend la liste des manquements (vide si tout va bien).
//   const contrat = require('<outils>/contrat.js');
//   contrat(html, { ongletsVue: { fiche: ['apercu', 'mandat'] } })   // onglets permis dans les vues « vue:onglet »
// Lit les blocs `const AXES=[…\n];`, `const WHERE={…};`, `const VUES=[…];`, `const PTS=[…]];`,
// `const PTAV=new Set([…])` de la source de l'application (ces formes sont imposées).
module.exports = function contrat(html, opts = {}) {
  const f = [];
  const bloc = (re, nom) => { const m = html.match(re); if (!m) f.push(`contrat : bloc ${nom} introuvable`); return m; };
  const mA = bloc(/const AXES=\[([\s\S]*?)\n\];/, 'AXES'), mW = bloc(/const WHERE=(\{[^\n]*?\});/, 'WHERE'), mV = bloc(/const VUES=(\[[^\n]*?\]);/, 'VUES');
  if (!mA || !mW || !mV) return f;
  const AXES = new Function('return [' + mA[1] + '];')();
  const WHERE = new Function('return ' + mW[1])();
  const VUES = new Function('return ' + mV[1])().map(v => v[0]);
  const mP = html.match(/const PTS=\[([\s\S]*?)\]\];/), mT = html.match(/const PTAV=new Set\(\[([^\]]*)\]/);
  const PTS = mP ? new Function('return [' + mP[1] + ']]')() : [];
  const PTAV = new Set(mT && mT[1].trim() ? mT[1].split(',').map(Number) : []);
  const OV = opts.ongletsVue || {};
  AXES.filter(a => !a.pv).forEach(a => {
    if (!new RegExp('\\b(c|st\\.c)\\.' + a.k + '\\b').test(html)) f.push(`contrat : la carte ${a.k} n'est lue nulle part (c.${a.k})`);
    if (!(Array.isArray(WHERE[a.k]) && WHERE[a.k].length)) f.push(`contrat : la carte ${a.k} n'a pas de vue (WHERE)`);
    (WHERE[a.k] || []).forEach(w => { const [v, t] = w.split(':'); if (!(VUES.includes(v) && (!t || (OV[v] || []).includes(t)))) f.push(`contrat : vue inconnue ${w} pour ${a.k}`); });
    if (!(a.o.some(o => o[0] === a.now) && a.o.some(o => o[0] === a.prop))) f.push(`contrat : ${a.k} : now ou prop hors des options`);
    if (new Set(a.o.map(o => o[0])).size !== a.o.length) f.push(`contrat : ${a.k} : options en double`);
  });
  AXES.filter(a => a.pv).forEach(a => { if (!PTS.some(p => p[0] === a.pv)) f.push(`contrat : point ${a.pv} sans entrée PTS`); });
  PTS.forEach(p => { if (!AXES.some(a => a.pv === p[0])) f.push(`contrat : PTS ${p[0]} sans carte`); });
  PTAV.forEach(n => { if (!(new RegExp('n===' + n + '\\b').test(html) || html.includes('ptOld(' + n + ')'))) f.push(`contrat : point ${n} déclaré visuel sans Avant`); });
  if (new Set(AXES.map(a => a.k)).size !== AXES.length) f.push('contrat : deux cartes ont la même clé');
  return f;
};
// Nombre de contrôles faits (pour les compteurs des tests).
module.exports.compter = function (html) {
  const m = html.match(/const AXES=\[([\s\S]*?)\n\];/); if (!m) return 0;
  const AXES = new Function('return [' + m[1] + '];')();
  const W = (html.match(/const WHERE=(\{[^\n]*?\});/) || [, '{}'])[1]; const WHERE = new Function('return ' + W)();
  const P = html.match(/const PTS=\[([\s\S]*?)\]\];/), T = html.match(/const PTAV=new Set\(\[([^\]]*)\]/);
  const nP = P ? new Function('return [' + P[1] + ']]')().length : 0, nT = T && T[1].trim() ? T[1].split(',').length : 0;
  return AXES.filter(a => !a.pv).reduce((s, a) => s + 4 + (WHERE[a.k] || []).length, 0) + AXES.filter(a => a.pv).length + nP + nT + 1;
};
