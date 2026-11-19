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
      const sig = $$(".esc-pie .btn").find((b) => /Siguiente/.test(b.textContent)); if (sig) sig.click();
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
      const sig = $$(".esc-pie .btn").find((b) => /Siguiente/.test(b.textContent)); if (sig) sig.click();
      return true;
    }
    if ($(".pergamino")) {
      const ops = $$(".pergamino .btn-opcion:not([disabled])");
      if (ops.length && !$(".verso.brilla")) for (const b of ops) { b.click(); await sleep(30); if ($(".verso.brilla")) break; }
      const sig = $$(".esc-pie .btn").find((b) => /Siguiente/.test(b.textContent)); if (sig) sig.click();
      return true;
    }
    if ($(".maquina")) {
      const ta = $(".maquina"); const modelo = ($(".modelo") || { textContent: "Ejemplo: Una frase de prueba para el Borrón." }).textContent.replace(/^Ejemplo:\s*/, "");
      ta.value = (modelo + " Además, me parece una lectura muy interesante para toda la clase y para mi familia.").trim(); ta.dispatchEvent(new Event("input")); await sleep(20);
      const pub = $$(".esc-pie .btn")[1]; pub.click(); await sleep(40);
      const cont = $$(".esc-pie .btn").find((b) => /Continuar/.test(b.textContent)); if (cont) cont.click();
      return true;
    }
    if ($(".publicado")) { const cont = $$(".esc-pie .btn").find((b) => /Continuar/.test(b.textContent)); if (cont) cont.click(); return true; }
    if ($(".estante")) {
      const perfiles = window.__biblioRef.perfiles;
      const nombre = ($(".lector-txt strong") || {}).textContent;
      const p = perfiles.find((x) => x.nombre === nombre);
      const lomos = $$(".lomo");
      if (p) { lomos[p.ok[0]].click(); await sleep(20); const r = $$(".contracubierta .btn")[0]; if (r) r.click(); await sleep(30); const sig = $$(".esc-pie .btn").find((b) => /Siguiente/.test(b.textContent)); if (sig) sig.click(); }
      else { lomos[1].click(); await sleep(20); $$(".contracubierta .btn")[0].click(); await sleep(20); const e = $$(".esc-pie .btn").find((b) => /recomendación/.test(b.textContent)); if (e) e.click(); }
      return true;
    }
    if ($(".guion") || /Crónica/.test(titulo)) { $$(".esc-pie .btn").find((b) => /Saltar/.test(b.textContent)).click(); return true; }
    // aviso genérico
    const b = $(".esc-pie .btn"); if (b) { b.click(); return true; }
    return true;
  }

  async function mundo() {
    const M = PP.Mundo;
    // destino
    if (M.destinos.length && window.__destinoRef) {
      const d = M.destinos.find((x) => x.clave === window.__destinoRef) || M.destinos[0];
      M.jugador.x = d.x; M.jugador.y = d.y; M.jugador.v = 0; await sleep(250); return true;
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
    const re = /\{([^|}]+)\|([^|}]+)\|([^}]*)\}/g; let mm; window.__erroresRef = []; while ((mm = re.exec(C.corrector.texto))) window.__erroresRef.push({ mal: mm[1], bien: mm[2] });
    M.colocarJugador(mis.lugar);
    const marc = M.marcadores.find((m) => m.id === id);
    M.cb.marcador(marc);
    const t0 = Date.now();
    while (Date.now() - t0 < 90000) {
      await sleep(70);
      if (!$("#resultado").hidden) { const r = $("#resultado .res-txt").textContent; $("#resultado .btn-primario").click(); log.push(id + " OK · " + r); return "OK " + r; }
      if (await autopista()) continue;
      if (await escena()) continue;
      await mundo();
    }
    log.push(id + " TIMEOUT"); return "TIMEOUT";
  };
})();
