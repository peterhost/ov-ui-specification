/* Moteur de l'atelier @@@ui (voir CDC-ATELIER-UI.md).
   Il porte tout ce qui ne dépend pas de l'application : état de la page, cartes, points à valider,
   encadré, Avant / Après, thème, vues, plein écran et navigation des points ouverts, fil de discussion
   et validations (base de l'artifact), mode référence, lien #point=N.
   La page de l'application fournit ses données (cartes, vues, points) et son rendu.

   Utilisation :
     const A = Atelier.creer({ cle, cartes, themes, etat });   // état prêt, rien n'est affiché
     const st = A.st;                                         // l'état, partagé avec le rendu
     …définitions de l'application (données, rendu, gestes)…
     A.lancer({ vues, vuesCarte, encadrer, points, pointsAvant, valides, rendu, … });

   Clés d'état tenues par le moteur : st.c (choix des cartes), st.frz (cartes validées), st.view
   ('avant' | 'apres', Avant / Après général), st.v2 (vue affichée), st.theme, st.pt (point ouvert),
   st.cur (carte courante), st.hl (carte à encadrer), st.cmt (états des cartes d'après le fil). */
window.Atelier = (function () {
  'use strict';
  const $ = id => document.getElementById(id);

  function creer(cfg) {
    const AXES = cfg.cartes, LS = cfg.cle;
    const TH = cfg.themes || [['clair', 'Clair'], ['sombre', 'Sombre']];
    let sombre = false; try { sombre = matchMedia('(prefers-color-scheme: dark)').matches; } catch (e) {}
    const st = Object.assign({ theme: sombre ? TH[1][0] : TH[0][0], c: {}, notes: {}, view: 'apres', frz: {} }, cfg.etat || {});
    AXES.forEach(a => st.c[a.k] = a.pv ? a.prop : a.now);
    try { const s = JSON.parse(localStorage.getItem(LS) || 'null'); if (s) { Object.assign(st.c, s.c || {}); st.notes = s.notes || {}; if (s.theme && TH.some(t => t[0] === s.theme)) st.theme = s.theme; } } catch (e) {}
    AXES.forEach(a => { if (!a.o.some(o => o[0] === st.c[a.k])) st.c[a.k] = a.now; });
    function persist() { try { localStorage.setItem(LS, JSON.stringify({ c: st.c, notes: st.notes, theme: st.theme })); } catch (e) {} }

    let K = null, ctl, sc, db = null, tag = null, status, gl, list, tagBox, tagTxt;
    const fige = k => st.frz && st.frz[k] !== undefined;

    /* ---------- vues ---------- */
    const vueCourante = () => K.vueCourante ? K.vueCourante() : st.v2;
    const allerVue = id => { if (K.allerVue) K.allerVue(id); else st.v2 = id; };
    function ongletCarte(k) { const o = (K.onglets || {})[k]; if (o && (K.vuesAOnglets || []).includes(st.v2)) st[o[0]] = o[1]; }
    /* Choisir une option montre la carte : sa vue si l'aperçu est ailleurs, et son onglet. */
    function montrerCarte(k) {
      if (K.surCarte) K.surCarte(k);
      const W = K.vuesCarte[k] || [], cur = vueCourante();
      if (W.length && !W.includes(cur) && !W.includes(st.v2)) allerVue(W[0]);
      ongletCarte(k); if (W.length) syncV();
    }
    function nomsVues() { const VN = {}; K.vues.forEach(([v, l]) => VN[v] = l); return Object.assign(VN, K.nomsVues || {}); }
    function syncV() {
      const VN = nomsVues(), cur = vueCourante();
      AXES.forEach(a => {
        if (a.pv) { a.el.cyc.textContent = '→ Voir'; return; }
        const vs = K.vuesCarte[a.k] || [K.vueDefaut]; let i = vs.indexOf(cur); if (i < 0) i = vs.indexOf(st.v2);
        const nx = vs[(i + 1) % vs.length];
        a.el.cyc.textContent = (i < 0 ? 'Voir' : '→') + ' ' + VN[nx] + (vs.length > 1 ? '  ' + (i < 0 ? '' : (i + 1) + '/' + vs.length) : '');
        a.el.cyc.title = 'Vues qui montrent cet élément : ' + vs.map(v => VN[v]).join(', ');
        const o = (K.onglets || {})[a.k], ongOk = !o || (st[o[0]] || (K.ongletsDefaut || {})[o[0]]) === o[1];
        a.el.cyc.disabled = (vs.length === 1 && i === 0 && ongOk);
        if (vs.length === 1 && i === 0 && !ongOk) a.el.cyc.textContent = 'Voir ' + (((K.nomsOnglets || []).find(x => x[0] === o[1])) || [, ''])[1];
      });
      ['v-seg', 'fs-v'].forEach(id => document.querySelectorAll('#' + id + ' button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === st.v2))));
      render();
    }
    function sync() {
      AXES.forEach(a => {
        const fz = fige(a.k) || !!a.clos; if (fz && !a.clos) st.c[a.k] = st.frz[a.k];
        a.el.card.classList.toggle('clos', !!a.clos); a.el.frz.style.display = a.clos ? 'none' : '';
        a.el.seg.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === st.c[a.k])));
        a.el.card.classList.toggle('frozen', fz); a.el.frz.textContent = fz ? 'Rouvrir' : 'Valider';
        a.el.frz.title = fz ? 'Rouvrir cette section' : 'Figer ce choix comme définitif';
        const cm = st.cmt && st.cmt[a.k]; const stt = fz ? '' : (cm ? (cm.claude > cm.pierre ? 'revoir' : 'vu') : 'neuf'); a.el.card.dataset.st = stt;
        a.el.now.textContent = a.clos ? a.clos : fz ? 'validé : ' + ((a.o.find(o => o[0] === st.c[a.k]) || [])[1] || '') : (stt === 'neuf' ? 'nouveau' : stt === 'revoir' ? 'à revoir · réponse de Claude' : 'déjà vu · commenté');
      });
      AXES.filter(a => !a.el.card.classList.contains('frozen')).concat(AXES.filter(a => a.el.card.classList.contains('frozen'))).forEach(a => ctl.appendChild(a.el.card));
      ['theme-seg', 'fs-th'].forEach(id => document.querySelectorAll('#' + id + ' button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === st.theme))));
      ['ba-seg', 'fs-ba'].forEach(id => document.querySelectorAll('#' + id + ' button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === st.view))));
      render();
    }
    function render() {
      K.rendu();
      fsLab();
      if (st.pt && st.ptNew) { st.ptNew = false; setTimeout(ptMarquer, 0); }
      if (st.hl) { const k = st.hl; st.hl = null; setTimeout(() => hlMarquer(k), 0); }
    }

    /* ---------- encadré ---------- */
    /* Défile le plus proche ancêtre qui défile, pour amener l'élément en vue. */
    function amener(f, w) {
      const L = f && K.liste && f.closest(K.liste);
      if (L) { L.scrollTop = Math.max(0, f.getBoundingClientRect().top - L.getBoundingClientRect().top + L.scrollTop - L.clientHeight / 3); return; }
      if (!f) return; let a = f.parentElement;
      while (a && a !== w && !(a.scrollHeight > a.clientHeight + 4 && /auto|scroll/.test(getComputedStyle(a).overflowY))) a = a.parentElement;
      if (a && a !== w) { const d = f.getBoundingClientRect().top - a.getBoundingClientRect().top; if (d < 0 || d > a.clientHeight - 40) a.scrollTop = Math.max(0, a.scrollTop + d - a.clientHeight / 4); }
    }
    /* Élément d'une carte (« sélecteur|texte » ; vide = toute la fenêtre) : contour qui clignote trois fois. */
    function hlMarquer(k) {
      const w = $('win'), q = (K.encadrer || {})[k];
      const els = q ? [...w.querySelectorAll(q.split('|')[0])].filter(e => !q.split('|')[1] || e.textContent.includes(q.split('|')[1])).slice(0, 6) : [];
      (els.length ? els : [w.querySelector(K.zoneDefaut) || w]).forEach(e => { e.classList.remove('ptx'); void e.offsetWidth; e.classList.add('ptx'); });
      const f = els[0]; const L = f && K.liste && f.closest(K.liste); if (L) amener(f, w);
    }

    /* ---------- points à valider ---------- */
    const PTS = () => K.points || [], PTAV = () => K.pointsAvant || new Set();
    /* Un seul état : le choix de la carte du point (Proposé = oui, Aujourd'hui = non) décide de l'illustration. */
    function ptvOf(n) { return PTAV().has(n) && st.c['pv' + n] === 'non' ? 'avant' : 'apres'; }
    function ptOld(n) { return st.pt === n && ptvOf(n) === 'avant'; }
    function ptMarquer() {
      const P = PTS().find(x => x[0] === st.pt); document.body.dataset.pt = P ? P[0] : '';
      if (!P || !P[4]) return; const w = $('win');
      if (K.surMarquage) K.surMarquage(P[0], w);
      const [q, txt] = P[4].split('|'); w.querySelectorAll(q).forEach((e, i) => { if (txt ? e.textContent.includes(txt) : i < 6) e.classList.add('ptx'); });
      const L0 = K.listePreservee && w.querySelector(K.listePreservee);
      if (st.ptScroll != null && L0) { L0.scrollTop = st.ptScroll; st.ptScroll = null; return; } st.ptScroll = null;
      amener(w.querySelector('.ptx'), w);
    }
    /* Touche A sur un point : bascule le choix de sa carte, si elle n'est pas validée. */
    function ptVue(v) { const n = st.pt, a = AXES.find(x => x.k === 'pv' + n); if (!a || !PTAV().has(n) || fige(a.k)) return; st.c[a.k] = v === 'avant' ? 'non' : 'oui'; persist(); ptAller(n, true); }
    /* Ouvre un point : sa vue (celle de son Avant si la carte est sur Aujourd'hui), l'élément encadré.
       calme : depuis la carte même, sans faire défiler la liste des cartes. */
    function ptAller(n, calme) {
      const P = PTS().find(x => x[0] === n); if (!P) return;
      if (calme && st.pt === n) { const L = K.listePreservee && document.querySelector('#win ' + K.listePreservee); st.ptScroll = L ? L.scrollTop : null; }
      st.cur = 'pv' + n; st.pt = n; st.ptNew = true; st.view = 'apres';
      const o = P[3] || {}, av = ptvOf(n) === 'avant';
      if (K.surPoint) K.surPoint(n, o, av);
      if (o.set) Object.assign(st, o.set); if (av && o.setAvant) Object.assign(st, o.setAvant);
      st.v2 = av && o.avant ? o.avant : P[2]; sync(); syncV();
      if (K.apresPoint) K.apresPoint(n, o, av);
      if (calme) return;
      const C = $('controls'), cd = document.querySelector('.axis[data-k="pv' + n + '"]');
      if (C && cd && C.scrollHeight > C.clientHeight) C.scrollTop = cd.offsetTop - C.offsetTop - 12;
      const sg = $('stage'); if (sg && sg.scrollIntoView) sg.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /* ---------- points ouverts, plein écran ---------- */
    function ouverts() { return AXES.filter(a => !a.clos && !fige(a.k)); }
    function allerCarte(a) {
      if (!a) return; st.cur = a.k;
      if (a.pv) ptAller(a.pv);
      else { st.pt = null; st.hl = a.k; allerVue((K.vuesCarte[a.k] || [K.vueDefaut])[0]); if (K.surVoir) K.surVoir(a.k); syncV(); }
      fsLab();
    }
    function fsPas(d) { const L = ouverts(); if (!L.length) return; let i = L.findIndex(a => a.k === st.cur); i = i < 0 ? (d > 0 ? 0 : L.length - 1) : (i + d + L.length) % L.length; allerCarte(L[i]); }
    function fsLab() { const el = $('fs-lab'); if (!el) return; const L = ouverts(); const i = L.findIndex(a => a.k === st.cur); el.textContent = L.length ? (i < 0 ? L.length + ' points ouverts' : (i + 1) + '/' + L.length + ' · ' + L[i].t) : 'Tout est validé'; el.title = el.textContent; }
    const fsOuvert = () => sc.classList.contains('fs');
    function fsOpen() { sc.classList.add('fs'); try { const r = sc.requestFullscreen && sc.requestFullscreen(); if (r && r.catch) r.catch(() => {}); } catch (e) {} $('fs-close').focus(); }
    function fsClose() { sc.classList.remove('fs'); try { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); } catch (e) {} }

    /* ---------- cartes ---------- */
    function construireCartes() {
      AXES.forEach(a => {
        const card = document.createElement('section'); card.className = 'axis' + (a.pv ? ' pv' : ''); card.dataset.k = a.k;
        const h = document.createElement('h2'); h.textContent = a.t;
        const now = document.createElement('span'); now.className = 'now'; h.appendChild(now);
        const frz = document.createElement('button'); frz.type = 'button'; frz.className = 'frz'; frz.addEventListener('click', () => toggleFrz(a.k)); h.appendChild(frz);
        const p = document.createElement('p'); p.className = 'why'; p.textContent = a.why;
        const seg = document.createElement('div'); seg.className = 'seg'; seg.setAttribute('role', 'group'); seg.setAttribute('aria-label', a.t);
        a.o.forEach(([v, l]) => {
          const b = document.createElement('button'); b.type = 'button'; b.textContent = l; b.dataset.v = v;
          b.addEventListener('click', () => { st.c[a.k] = v; if (a.pv) { persist(); ptAller(a.pv, true); return; } st.pt = null; montrerCarte(a.k); persist(); sync(); });
          seg.appendChild(b);
        });
        const ask = document.createElement('button'); ask.type = 'button'; ask.className = 'ask'; ask.textContent = 'Commenter ce point';
        ask.addEventListener('click', () => setTag(a.k));
        const cyc = document.createElement('button'); cyc.type = 'button'; cyc.className = 'cyc';
        cyc.addEventListener('click', () => {
          if (a.pv) { ptAller(a.pv); return; }
          st.pt = null; st.hl = a.k; st.cur = a.k; if (K.surVoir) K.surVoir(a.k);
          const vs = K.vuesCarte[a.k] || [K.vueDefaut]; const cur = vueCourante();
          let i = vs.indexOf(cur); if (i < 0) i = vs.indexOf(st.v2);
          allerVue(vs[(i + 1) % vs.length]); ongletCarte(a.k); syncV(); cyc.blur();
        });
        const foot = document.createElement('div'); foot.className = 'foot'; foot.append(ask, cyc);
        card.append(h, p, seg, foot); ctl.appendChild(card); a.el = { seg, now, cyc, frz, card };
      });
    }

    /* ---------- validations ---------- */
    function saveFrzLocal() { try { localStorage.setItem(LS + '-frz', JSON.stringify(st.frz)); } catch (e) {} }
    async function toggleFrz(k) {
      if (fige(k)) { delete st.frz[k]; saveFrzLocal(); sync(); if (db) { try { await db.collection('valides').doc(k).delete(); } catch (e) {} } }
      else { st.frz[k] = st.c[k]; saveFrzLocal(); sync(); if (db) { try { await db.collection('valides').doc(k).set({ choix: st.c[k], at: new Date().toISOString() }); } catch (e) { status.textContent = 'Validation gardée sur cet appareil seulement.'; } } }
    }

    /* ---------- fil de discussion (collection « fil ») ---------- */
    function setTag(k) { tag = k; try { localStorage.setItem(LS + '-tag', k); } catch (e) {} const a = AXES.find(x => x.k === k); tagTxt.textContent = 'À propos de : ' + a.t; tagBox.hidden = false; gl.focus(); }
    function fmt(iso) { try { return new Date(iso).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } }
    function paint(docs) {
      list.textContent = '';
      if (!docs.length) { const e = document.createElement('p'); e.className = 'th-empty'; e.textContent = 'Aucun message.'; list.appendChild(e); return; }
      docs.forEach(d => {
        const m = document.createElement('div'); m.className = 'msg ' + (d.auteur === 'claude' ? 'cl' : 'me');
        const who = document.createElement('div'); who.className = 'who';
        const n = document.createElement('span'); n.textContent = d.auteur === 'claude' ? 'Claude' : 'l’utilisateur';
        const t = document.createElement('span'); t.textContent = fmt(d.at); who.append(n, t); m.appendChild(who);
        const ax = AXES.find(x => x.k === d.axe);
        if (ax) { const s = document.createElement('span'); s.className = 'ax'; s.textContent = ax.t; m.appendChild(s); m.appendChild(document.createElement('br')); }
        m.appendChild(document.createTextNode(String(d.texte || '')));
        if (d.auteur === 'claude' && d.reglage && typeof d.reglage === 'object') {
          const b = document.createElement('button'); b.type = 'button'; b.className = 'apply'; b.textContent = 'Appliquer ces réglages à l’aperçu';
          b.addEventListener('click', () => { Object.entries(d.reglage).forEach(([k, v]) => { const a = AXES.find(x => x.k === k); if (a && a.o.some(o => o[0] === v)) st.c[k] = v; }); persist(); sync(); });
          m.appendChild(b);
        }
        list.appendChild(m);
      });
      list.scrollTop = list.scrollHeight;
    }
    function fil() {
      status = $('status'); gl = $('global'); list = $('thlist'); tagBox = $('thtag'); tagTxt = $('thtagtxt');
      $('thtagx').addEventListener('click', () => { tag = null; tagBox.hidden = true; try { localStorage.removeItem(LS + '-tag'); } catch (e) {} });
      try { const t = localStorage.getItem(LS + '-tag'); if (t && AXES.some(x => x.k === t)) { tag = t; tagTxt.textContent = 'À propos de : ' + AXES.find(x => x.k === t).t; tagBox.hidden = false; } } catch (e) {}
      setTimeout(() => { if (gl.value.trim()) { status.className = 'status'; status.textContent = 'Brouillon non envoyé, retrouvé ci-dessous.'; } }, 0);
      try { gl.value = localStorage.getItem(LS + '-g') || ''; } catch (e) {}
      gl.addEventListener('input', () => { try { localStorage.setItem(LS + '-g', gl.value); } catch (e) {} });
      gl.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); $('thform').requestSubmit(); } });
      paint([]);
      $('thform').addEventListener('submit', async e => {
        e.preventDefault();
        const txt = gl.value.trim(); if (!txt) return;
        if (!db) { status.className = 'status'; status.textContent = 'Fil indisponible ici : passer par la conversation.'; return; }
        const choix = {}; AXES.forEach(a => { choix[a.k] = st.c[a.k]; });
        status.className = 'status'; status.textContent = 'Envoi…';
        try {
          await db.collection('fil').add({ at: new Date().toISOString(), auteur: 'pierre', texte: txt, axe: tag || null, theme: st.theme, choix });
          gl.value = ''; try { localStorage.removeItem(LS + '-g'); } catch (_) {}
          tag = null; tagBox.hidden = true; try { localStorage.removeItem(LS + '-tag'); } catch (_) {}
          status.className = 'status ok'; status.textContent = 'Envoyé.';
        } catch (err) { status.textContent = 'Échec de l’envoi (' + (err && err.code || 'erreur') + '). Réessaie.'; }
      });
    }
    async function base(REF) {
      if (REF) return;
      try { db = await (window.claude && window.claude.use && window.claude.use('db')); } catch (e) { db = null; }
      if (!db) { status.textContent = 'Fil indisponible dans cette vue.'; return; }
      try { db.collection('valides').onSnapshot(snap => { const f = {}; snap.docs.forEach(d => { const v = d.data(); if (v && v.choix !== undefined) f[d.id] = v.choix; }); st.frz = f; saveFrzLocal(); sync(); }, () => {}); } catch (e) {}
      try {
        db.collection('fil').orderBy('at').onSnapshot(snap => {
          const ds = snap.docs.map(x => x.data()); const cm = {};
          ds.forEach(d => { const ks = d.axe ? [d.axe] : (d.reglage && d.auteur === 'claude' ? Object.keys(d.reglage) : []); ks.forEach(k => { cm[k] = cm[k] || { pierre: '', claude: '' }; const who = d.auteur === 'claude' ? 'claude' : 'pierre'; if ((d.at || '') > cm[k][who]) cm[k][who] = d.at || ''; }); });
          Object.keys(cm).forEach(k => { if (!cm[k].pierre) delete cm[k]; }); st.cmt = cm; sync(); paint(ds);
        }, () => { status.textContent = 'Lecture du fil impossible.'; });
      } catch (e) { status.textContent = 'Lecture du fil impossible.'; }
    }

    /* ---------- mode référence ---------- */
    /* #ref&vue=…&theme=…&… n'affiche que la fenêtre de l'application, dans l'état validé (valides embarqués,
       sans la base ni le stockage du navigateur). Les paramètres propres à l'application passent par K.ref(p). */
    const lireRef = () => { const h = location.hash.replace(/^#/, ''); if (!/^ref(&|$)/.test(h)) return null; const p = {}; h.split('&').slice(1).forEach(kv => { const i = kv.indexOf('='); const k = decodeURIComponent(i < 0 ? kv : kv.slice(0, i)); p[k] = i < 0 ? '1' : decodeURIComponent(kv.slice(i + 1)); }); return p; };
    function applyRef(p) {
      document.body.classList.add('ref');
      AXES.forEach(a => { st.c[a.k] = fige(a.k) ? st.frz[a.k] : a.prop; });
      st.view = 'apres'; st.theme = p.theme === 'sombre' ? TH[1][0] : TH[0][0];
      if (K.ref) K.ref(p);
      const w = $('win'); w.style.setProperty('--refw', (+p.l || 1280) + 'px'); w.style.setProperty('--refh', (+p.h || 800) + 'px');
      st.v2 = p.vue || K.vueDefaut; sync(); syncV();
    }

    /* ---------- lancement ---------- */
    function lancer(k) {
      K = Object.assign({ vueDefaut: (k.vues && k.vues[0] && k.vues[0][0]), zoneDefaut: '.w-body' }, k);
      ctl = $('controls'); sc = $('scroller');
      construireCartes();
      ['theme-seg', 'fs-th'].forEach(id => { const box = $(id); if (!box) return; TH.forEach(([v, l]) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = l; b.dataset.v = v; b.addEventListener('click', () => { st.theme = v; persist(); sync(); }); box.appendChild(b); }); });
      $('p-now').addEventListener('click', () => { AXES.forEach(a => { if (!fige(a.k) && !a.pv) st.c[a.k] = a.now; }); persist(); sync(); });
      $('p-prop').addEventListener('click', () => { AXES.forEach(a => { if (!fige(a.k) && !a.pv) st.c[a.k] = a.prop; }); persist(); sync(); });
      st.view = 'apres'; st.v2 = st.v2 || K.vueDefaut;
      ['v-seg', 'fs-v'].forEach(id => { const box = $(id); K.vues.forEach(([v, l]) => { const b = document.createElement('button'); b.type = 'button'; b.dataset.v = v; b.textContent = l; b.addEventListener('click', () => { st.pt = null; if (K.surChoixVue) K.surChoixVue(v); st.v2 = v; syncV(); }); box.appendChild(b); }); });
      const go = n => ptAller(n);
      { const m = location.hash.match(/^#point=(\d+)/); if (m) setTimeout(() => go(+m[1]), 50); }
      addEventListener('hashchange', () => { const m2 = location.hash.match(/^#point=(\d+)/); if (m2) go(+m2[1]); });
      if (K.avantLancement) K.avantLancement();
      syncV();
      ['ba-seg', 'fs-ba'].forEach(id => document.querySelectorAll('#' + id + ' button').forEach(b => b.addEventListener('click', () => { st.view = b.dataset.v; st.pt = null; sync(); })));
      $('fs-open').addEventListener('click', () => { fsOpen(); fsLab(); });
      $('fs-prev').addEventListener('click', () => fsPas(-1));
      $('fs-next').addEventListener('click', () => fsPas(1));
      $('fs-close').addEventListener('click', fsClose);
      document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement) sc.classList.remove('fs'); });
      document.addEventListener('keydown', e => {
        const typing = /^(TEXTAREA|INPUT|SELECT)$/.test((e.target && e.target.tagName) || '');
        if (K.touche && K.touche(e, typing, fsOuvert())) return;
        if (e.key === 'Escape' && fsOuvert()) fsClose();
        else if (!typing && fsOuvert() && (e.key === ']' || e.key === '[')) fsPas(e.key === ']' ? 1 : -1);
        else if (!typing && (e.key === 'a' || e.key === 'A') && !e.metaKey && !e.ctrlKey) { if (st.pt) ptVue(ptvOf(st.pt) === 'avant' ? 'apres' : 'avant'); else { st.view = st.view === 'avant' ? 'apres' : 'avant'; sync(); } }
      });
      sync();
      fil();
      const REF = lireRef();
      st.frz = Object.assign({}, K.valides || {});
      if (!REF) try { const l = localStorage.getItem(LS + '-frz'); if (l) st.frz = JSON.parse(l); } catch (e) {}
      if (REF) { applyRef(REF); addEventListener('hashchange', () => location.reload()); }
      else sync();
      base(REF);
    }

    return { st, AXES, persist, sync, syncV, render, montrerCarte, ptvOf, ptOld, ptAller, ptVue, hlMarquer, setTag, fsLab, fsPas, ouverts, fsOuvert, fsClose, vueCourante, allerVue, lancer };
  }
  return { creer };
})();
