/* Arnés de pruebas: juega automáticamente cada misión interactuando con el DOM real
   (clics en botones, teclas, recogida en el mundo). No forma parte del juego publicado. */
(function () {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const vis = (e) => e && !e.hidden && e.offsetParent !== null;
  const log = [];
  window.__log = log;
  let errorRate = 0; // probabilidad de fallar a propósito el primer intento

  function correctos(opts) { return opts.filter((b) => !b.disabled); }

  async function escena() {
    // minijuegos de pantalla completa
    if ($(".mj")) {
      const fin = $(".mj-final button"); if (fin) { fin.click(); await sleep(80); return true; }
      if (PP.MJ && PP.MJ.auto) PP.MJ.auto();
      await sleep(150); return true;
    }
    const esc = $("#escena");
    if (esc.hidden) return false;
    const titulo = ($(".esc-titulo") || {}).textContent || "";
    // Diálogo
    if ($(".dialogo")) {
      const ops = $$(".dlg-opciones button:not([disabled])");
      if (ops.length) {
        // intenta en orden aleatorio hasta acertar
        for (const b of ops.sort(() => Math.random() - 0.5)) { b.click(); await sleep(60); if (b.classList.contains("correcta") || b.classList.contains("regular")) break; }
      }
      const cont = $$(".esc-pie .btn").find((b) => /Continuar/.test(b.textContent)); if (cont) cont.click();
      return true;
    }
    if ($(".caza-arena")) {
      const buenas = [].concat(...PP.juego.contenido.caza.map((c) => c.buenas));
      for (const b of $$(".caza-arena .burbuja:not([disabled])")) { if (buenas.includes(b.textContent) && !$(".caza-arena .burbuja.ok:nth-child(99)")) { b.click(); await sleep(30); } }
      const fin = $$(".esc-pie .btn").find((b) => /Hecho/.test(b.textContent)); if (fin) fin.click();
      return true;
    }
    // --- Ampliación: sílabas y tildes ---
    if ($(".tl-zona")) {
      const C = PP.juego.contenido.tildes, ok = (b) => b && !b.disabled;
      const err = Math.random() < (window.__errar || 0);
      const pal = $(".tl-palabra[data-i]");
      const palmas = $$(".tl-palmas button:not([disabled])");
      if (palmas.length && pal) { const it = C.items[+pal.dataset.i]; const b = err ? palmas.find((x) => +x.dataset.k !== it.s.length) : palmas.find((x) => +x.dataset.k === it.s.length); if (b) b.click(); else palmas[0].click(); await sleep(80); return true; }
      const fichas = $$(".tl-fichas button:not([disabled])");
      if (fichas.length) { const filled = $$(".tl-hueco.lleno").length; const it = C.items.find((x) => x.s.length === $$(".tl-hueco").length && fichas.every((f) => x.s.includes(f.textContent)) && x.s.slice(0, filled).join("") === $$(".tl-hueco.lleno").map((h) => h.textContent).join("")); const need = it ? it.s[filled] : null; const b = fichas.find((f) => f.textContent === need) || fichas[0]; b.click(); await sleep(40); return true; }
      const sil = $(".tl-silabas[data-i]:not(.resuelta)"); const sb = $$(".tl-silabas:not(.resuelta) button:not([disabled])");
      if (sil && sb.length) { const it = C.items[+sil.dataset.i]; const b = err ? sb.find((x) => +x.dataset.k !== it.t) || sb[0] : sb.find((x) => +x.dataset.k === it.t); if (ok(b)) b.click(); await sleep(60); return true; }
      const cl = $$(".tl-clases button:not([disabled])");
      if (cl.length && sil) { const it = C.items[+sil.dataset.i]; const n = it.s.length - 1 - it.t; const name = ["aguda", "llana", "esdrújula", "sobresdrújula"][Math.min(3, n)]; const b = cl.find((x) => x.dataset.c === name); if (ok(b)) b.click(); await sleep(60); return true; }
      const sn = $$(".tl-sino button[data-v]:not([disabled])");
      if (sn.length && sil) { const it = C.items[+sil.dataset.i]; const v = /[áéíóú]/i.test(it.p); const b = sn.find((x) => x.dataset.v === String(err ? !v : v)); if (ok(b)) b.click(); await sleep(60); return true; }
      const fr = $(".tl-frase[data-i]"); const fb = $$(".tl-sino button[data-k]:not([disabled])");
      if (fr && fb.length) { const it = C.diacriticas[+fr.dataset.i]; const b = fb.find((x) => +x.dataset.k === it.c); if (ok(b)) b.click(); await sleep(60); return true; }
      const p = $$(".esc-pie .btn").pop(); if (p) p.click(); await sleep(60); return true;
    }
    // --- Ampliación: cinta clasificadora ---
    if ($(".cn-cinta")) {
      const C = PP.juego.contenido.clasificador, caja = $(".cn-caja[data-i]");
      const fin = $$(".esc-pie .btn").find((b) => /Hecho/.test(b.textContent)); if (fin) { fin.click(); return true; }
      if (caja && /entra|prisa/.test(caja.className) && !/vuela|cae|oculta/.test(caja.className)) {
        const it = C.items[+caja.dataset.i]; const bins = $$(".cn-bin:not([disabled])");
        const err = Math.random() < (window.__errar || 0);
        const b = err ? bins.find((x) => x.dataset.cat !== it.c) : bins.find((x) => x.dataset.cat === it.c);
        if (b) b.click();
      }
      await sleep(150); return true;
    }
    // --- Ampliación: guion secreto ---
    if ($(".gn-papel")) {
      const q = $(".gn-q[data-q]"), C = PP.juego.contenido.guion;
      const ops = $$(".gn-preg .libreta-ops button:not([disabled])");
      if (q && ops.length) { const it = C.preguntas[+q.dataset.q]; const err = Math.random() < (window.__errar || 0); const b = err ? ops.find((x) => +x.dataset.k !== it.c) : ops.find((x) => +x.dataset.k === it.c); if (b) b.click(); await sleep(60); return true; }
      const p = $$(".esc-pie .btn").pop(); if (p) p.click(); await sleep(60); return true;
    }
    if ($(".parejas")) {
      const izq = $$(".parejas .col:first-child .carta:not([disabled])");
      if (izq.length) {
        izq[0].click(); await sleep(30);
        for (const d of $$(".parejas .col:last-child .carta:not([disabled])")) { d.click(); await sleep(30); if (izq[0].classList.contains("unida")) break; }
      } else { const b = $(".esc-pie .btn"); if (b) b.click(); }
      return true;
    }
    if ($(".radio")) { $(".btn-play").click(); await sleep(100); const s = $$(".esc-pie .btn")[0]; s.disabled = false; s.click(); return true; }
    if ($(".libreta")) {
      const ops = $$(".libreta-ops button:not([disabled])");
      if (ops.length && !$(".libreta-ops .correcta")) { for (const b of ops.sort(() => Math.random() - 0.5)) { b.click(); await sleep(40); if (b.classList.contains("correcta")) break; } }
      const sig = $$(".esc-pie .btn").find((b) => /Siguiente|Terminar/.test(b.textContent)); if (sig) sig.click();
      return true;
    }
    if ($(".telefono")) {
      const ops = $$(".post-ops button:not([disabled])");
      if (ops.length && !$(".post-ops .correcta")) { for (const b of ops) { b.click(); await sleep(30); if (b.classList.contains("correcta")) break; } }
      const chips = $$(".chips .chip:not([disabled])");
      if (chips.length && !$(".chips .correcta")) { for (const c of chips) { c.click(); await sleep(30); if (c.classList.contains("correcta")) break; } }
      const sig = $$(".esc-pie .btn").find((b) => /Siguiente|Terminar/.test(b.textContent)); if (sig) sig.click();
      return true;
    }
    if ($(".ordenar")) {
      const d = window.__ordenRef; // piezas en orden correcto
      const txt = (li) => li.querySelector(".pieza-txt").textContent;
      for (let guard = 0; guard < 40; guard++) {
        const lis = $$(".ordenar .pieza");
        const idx = lis.map((li) => d.findIndex((p) => txt(li).endsWith(p.t || p)));
        const k = idx.findIndex((v, i) => v !== i);
        if (k < 0) break;
        // mover hacia arriba la pieza que debería estar en k
        const pos = idx.indexOf(k);
        const up = lis[pos].querySelectorAll(".pieza-btns button")[0]; up.click(); await sleep(15);
      }
      const comp = $$(".esc-pie .btn").find((b) => /Comprobar/.test(b.textContent)); if (comp) { comp.click(); await sleep(60); }
      const cont = $$(".esc-pie .btn").find((b) => /Continuar/.test(b.textContent)); if (cont) cont.click();
      return true;
    }
    if ($(".libro")) { $$(".esc-pie .btn").find((b) => /preguntas/.test(b.textContent)).click(); return true; }
    if ($(".periodico")) {
      // corrige el primer error marcado con las opciones correctas; luego entrega
      const errs = window.__erroresRef || [];
      for (const e of errs) {
        const w = $$(".per-texto .palabra:not([disabled])").find((x) => x.textContent === e.mal);
        if (!w) continue; w.click(); await sleep(20);
        const b = $$(".popover .btn").find((x) => x.textContent === e.bien); if (b) b.click(); await sleep(20);
      }
      const fin = $$(".esc-pie .btn").find((b) => /terminado|Imprimir/.test(b.textContent)); if (fin) fin.click(); await sleep(40);
      const imp = $$(".esc-pie .btn").find((b) => /Imprimir/.test(b.textContent)); if (imp) imp.click();
      return true;
    }
    if ($(".taller")) {
      const it = window.__tallerRef.find((x) => $(".taller-def").textContent.includes(x.def));
      if (it && !$(".matricula.lista")) { for (const p of it.sol) { const b = $$(".taller-piezas button:not([disabled])").find((x) => x.textContent === p); b.click(); await sleep(10); } $$(".esc-pie .btn").find((b) => /Montar/.test(b.textContent)).click(); await sleep(40); }
      const sig = $$(".esc-pie .btn").find((b) => /Siguiente|Terminar/.test(b.textContent)); if (sig) sig.click();
      return true;
    }
    if ($(".pergamino")) {
      const ops = $$(".pergamino .btn-opcion:not([disabled])");
      if (ops.length && !$(".verso.brilla")) for (const b of ops) { b.click(); await sleep(30); if ($(".verso.brilla")) break; }
      const sig = $$(".esc-pie .btn").find((b) => /Siguiente|Terminar/.test(b.textContent)); if (sig) sig.click();
      return true;
    }
    if ($(".estante")) {
      const perfiles = window.__biblioRef.perfiles;
      const nombre = ($(".lector-txt strong") || {}).textContent;
      const pide = (($(".lector-txt p") || {}).textContent || "").replace(/[«»]/g, "");
      const p = perfiles.find((x) => x.nombre === nombre && x.pide === pide) || perfiles.find((x) => x.nombre === nombre);
      const lomos = $$(".lomo");
      const lomo = p && lomos.find((l) => p.ok.some((k) => l.getAttribute("aria-label") === "Libro: " + window.__biblioRef.libros[k].titulo));
      if (lomo) { lomo.click(); await sleep(20); const r = $$(".contracubierta .btn")[0]; if (r) r.click(); await sleep(30); const sig = $$(".esc-pie .btn").find((b) => /Siguiente|Terminar/.test(b.textContent)); if (sig) sig.click(); }
      return true;
    }
    // aviso genérico
    const b = $(".esc-pie .btn"); if (b) { b.click(); return true; }
    return true;
  }

  async function mundo() {
    const M = PP.Mundo;
    // destino
    if (M.destinos.length && (PP.juego._destinoOk || window.__destinoRef)) {
      const d = M.destinos.find((x) => x.clave === (PP.juego._destinoOk || window.__destinoRef)) || M.destinos[0];
      M.jugador.x = d.x; M.jugador.y = d.y; M.jugador.v = 0; await sleep(250); return true;
    }
    if (M.destinos.length && PP.juego._carreraOk) {
      const d = M.destinos.find((x) => x.clave === PP.juego._carreraOk) || M.destinos[0];
      M.jugador.x = d.x; M.jugador.y = d.y; M.jugador.v = 0; await sleep(250); return true;
    }
    if (M.fichas.some((f) => f.vivo && f.manual)) {
      const vivas = M.fichas.filter((x) => x.vivo && x.manual && !x.falso).sort((a, b) => a.k - b.k);
      const f = vivas[0]; if (f) { M.jugador.x = f.x; M.jugador.y = f.y; M.jugador.v = 0; await sleep(120); PP.Input.pulsado.accion = true; await sleep(150); return true; }
    }
    if (M.fichas.some((f) => f.vivo)) {
      const f = M.fichas.find((x) => x.vivo && x.ok !== false);
      if (f) { M.jugador.x = f.x; M.jugador.y = f.y; M.jugador.v = 0; await sleep(120); return true; }
    }
    if (M.borron) {
      M.jugador.x = M.borron.x - M.borron.dx * 60; M.jugador.y = M.borron.y - M.borron.dy * 60; M.borron.cooldown = 0;
      await sleep(40);
      document.dispatchEvent(new KeyboardEvent("keydown", { code: "Space", bubbles: true })); window.dispatchEvent(new KeyboardEvent("keydown", { code: "Space" })); window.dispatchEvent(new KeyboardEvent("keyup", { code: "Space" }));
      await sleep(900); return true;
    }
    return false;
  }

  async function autopista() {
    const ap = $(".autopista"); if (!ap) return false;
    const dbg = PP.Autopista._debug; const st = dbg.st;
    if (!st.listo) dbg.arrancar();
    st.lectura = 0;
    if (st.portico && !st.portico.resuelto) {
      const pan = st.portico.paneles.find((x) => x.op === st.portico.it.c); st.carril = pan.c;
    }
    if (st.esperando) $(".ap-ok").click();
    const fin = $(".ap-fin"); if (fin) { fin.click(); }
    st.vel = 900; // acelera la prueba
    await sleep(80);
    return true;
  }

  window.__auto = { escena, autopista, mundo };
  window.autoMision = async function (id) {
    const J = PP.juego, M = PP.Mundo;
    const mis = PP.MISIONES.find((m) => m.id === id);
    const C = J.contenido;
    window.__ordenRef = null; window.__destinoRef = null;
    // referencias de soluciones según la misión
    const refs = { O1: C.radio, O4: C.cartel };
    if (refs[id]) window.__destinoRef = refs[id].destino;
    if (id === "L1") window.__ordenRef = C.historia.piezas;
    if (id === "F") window.__ordenRef = C.noticia.piezas;
    window.__tallerRef = C.taller.items; window.__biblioRef = C.biblioteca;
    const re = /\{([^|}]+)\|([^|}]+)\|([^}]*)\}/g; let mm; window.__erroresRef = []; [C.corrector].concat(C.corrector.alternativas || []).forEach((v) => { re.lastIndex = 0; while ((mm = re.exec(v.texto))) window.__erroresRef.push({ mal: mm[1], bien: mm[2] }); });
    M.colocarJugador(mis.lugar);
    const marc = M.marcadores.find((m) => m.id === id);
    M.cb.marcador(marc);
    const t0 = Date.now();
    while (Date.now() - t0 < 90000) {
      await sleep(70);
      if (!$("#resultado").hidden) { const r = $("#resultado .res-txt").textContent; $("#resultado .btn-primario").click(); await sleep(150); const det = $(".det-caja .btn"); if (det) { (window.__dets = window.__dets || []).push(id + ": " + $(".det-caja h2").textContent); det.click(); } log.push(id + " OK · " + r); return "OK " + r; }
      if (await autopista()) continue;
      if (await escena()) continue;
      await mundo();
    }
    log.push(id + " TIMEOUT"); return "TIMEOUT";
  };
})();
