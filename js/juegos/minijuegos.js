/* Puerto Palabra · Minijuegos de pantalla completa (Canvas 2D, sin librerías).
   - golf:        «Golf del Malpaís» (vista trasera con perspectiva) · 1.1 variedades del español
   - penaltis:    «Penaltis contra el Borrón» · 6.1 dato fiable / bulo / opinión
   - canastas:    «Canastas de palabras» (feria) · 9.1 clase de palabra en contexto
   - plataformas: «Saltarrimas» (plataformas de desplazamiento lateral) · 8.2 rima
   Regla de evaluación común: se registra SOLO la decisión de Lengua del primer intento de cada ítem.
   Fallar la potencia, la puntería o un salto nunca cuenta como error: se repite sin penalización.
   Modo tranquilo (ajuste «sin límite de tiempo»): sin medidor de potencia, enemigos lentos y sin prisa.
   PP.MJ.auto(): gancho para las pruebas automáticas (resuelve la decisión correcta del ítem actual). */
window.PP = window.PP || {};
(function () {
  "use strict";
  const U = PP.U, el = U.el;
  const MJ = { auto: null };
  const tranquilo = () => !!(PP.ajustes && PP.ajustes.sinTiempo);
  const ciclo = () => PP.juego.ciclo || Math.ceil((PP.juego.curso || 3) / 2);
  const curso = () => PP.juego.curso || 0;
  const menosMov = () => U.prefiereMenosMovimiento();
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const facil = (t) => 1 - Math.pow(1 - t, 3);

  function rr(g, x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
  function rotulo(g, t, x, y, tam, color, borde, alin) {
    g.font = "900 " + Math.round(tam) + "px 'Trebuchet MS', sans-serif"; g.textAlign = alin || "center"; g.textBaseline = "middle";
    g.lineJoin = "round"; g.lineWidth = Math.max(3, tam / 5); g.strokeStyle = borde || "rgba(10,14,30,0.9)"; g.strokeText(t, x, y); g.fillStyle = color || "#fff"; g.fillText(t, x, y);
  }
  function etiqueta(g, t, x, y, tam, fondo, borde, texto) {
    g.font = "900 " + Math.round(tam) + "px 'Trebuchet MS', sans-serif";
    const w = g.measureText(t).width + tam * 1.1, h = tam * 1.7;
    rr(g, x - w / 2, y - h / 2, w, h, h / 2.6); g.fillStyle = fondo; g.fill(); g.lineWidth = 3; g.strokeStyle = borde || "#1b1b2f"; g.stroke();
    g.fillStyle = texto || "#1b1b2f"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(t, x, y + 1);
    return { x: x - w / 2, y: y - h / 2, w, h };
  }
  /** El Borrón: mancha de tinta morada con antifaz (personaje original del juego). */
  function borron(g, x, y, r, opts) {
    opts = opts || {};
    g.save(); g.translate(x, y); if (opts.rot) g.rotate(opts.rot);
    const t = performance.now() / 1000;
    g.fillStyle = "#4b2a7b"; g.beginPath();
    for (let k = 0; k <= 16; k++) { const a = k / 16 * Math.PI * 2, rr2 = r * (1 + (menosMov() ? 0 : 0.06 * Math.sin(a * 5 + t * 4))); g.lineTo(Math.cos(a) * rr2, Math.sin(a) * rr2 * 0.95); }
    g.fill(); g.lineWidth = Math.max(2, r / 12); g.strokeStyle = "#1b1030"; g.stroke();
    g.fillStyle = "#1b1030"; rr(g, -r * 0.75, -r * 0.42, r * 1.5, r * 0.42, r * 0.2); g.fill();
    g.fillStyle = "#fff"; g.beginPath(); g.arc(-r * 0.32, -r * 0.2, r * 0.15, 0, 7); g.arc(r * 0.32, -r * 0.2, r * 0.15, 0, 7); g.fill();
    g.fillStyle = "#1b1030"; g.beginPath(); g.arc(-r * 0.29, -r * 0.18, r * 0.07, 0, 7); g.arc(r * 0.35, -r * 0.18, r * 0.07, 0, 7); g.fill();
    g.strokeStyle = "#1b1030"; g.lineWidth = Math.max(2, r / 10); g.beginPath();
    if (opts.triste) g.arc(0, r * 0.45, r * 0.25, Math.PI * 1.15, Math.PI * 1.85); else g.arc(0, r * 0.15, r * 0.3, Math.PI * 0.15, Math.PI * 0.85);
    g.stroke();
    if (opts.guantes) { g.fillStyle = "#ffd43b"; g.strokeStyle = "#1b1030"; g.lineWidth = 2; [-1, 1].forEach((s) => { g.beginPath(); g.arc(s * r * (opts.brazos || 1.15), -r * 0.1, r * 0.28, 0, 7); g.fill(); g.stroke(); }); }
    g.restore();
  }

  // -------------------------------------------------------------- Marco común
  function pantalla(op) {
    const raiz = el("div", { class: "mj mj-" + op.clase, role: "application", "aria-label": op.titulo, tabindex: "-1" });
    const cv = el("canvas", { class: "mj-canvas", "aria-hidden": "true" });
    const prog = el("span", { class: "mj-prog" }), marc = el("span", { class: "mj-marc", "aria-live": "polite" });
    const bSalir = el("button", { class: "btn-icono mj-salir", type: "button", "aria-label": "Salir del minijuego", html: U.icon("exit") });
    const enun = el("div", { class: "mj-enun", "aria-live": "polite" });
    const explic = el("div", { class: "mj-explica", "aria-live": "assertive" });
    const ayuda = el("p", { class: "mj-ayuda", text: op.ayuda || "" });
    const mandos = el("div", { class: "mj-mandos" });
    const hud = el("div", { class: "mj-hud" }, [el("div", { class: "mj-arriba" }, [el("b", { class: "mj-tit", text: op.titulo }), prog, marc, bSalir]), enun, explic]);
    raiz.append(cv, hud, ayuda, mandos);
    raiz.style.setProperty("--c", op.color || "#ff7a45");
    document.body.appendChild(raiz);
    const g = cv.getContext("2d");
    const P = { raiz, cv, g, prog, marc, enun, explic, mandos, W: 0, H: 0, dpr: 1, held: {}, pulsado: {}, fin: false, t: 0, part: [] };
    const ajustar = () => { P.dpr = Math.min(2, window.devicePixelRatio || 1); P.W = raiz.clientWidth; P.H = raiz.clientHeight; cv.width = Math.round(P.W * P.dpr); cv.height = Math.round(P.H * P.dpr); };
    ajustar(); window.addEventListener("resize", ajustar);
    const MAPA = { ArrowLeft: "izq", KeyA: "izq", ArrowRight: "der", KeyD: "der", ArrowUp: "arriba", KeyW: "arriba", ArrowDown: "abajo", KeyS: "abajo", Space: "accion", Enter: "accion" };
    const kd = (e) => {
      if (P.fin) return;
      if (/^Digit[1-9]$/.test(e.code)) { P.pulsado["n" + e.code.slice(5)] = true; e.preventDefault(); return; }
      const a = MAPA[e.code]; if (!a) return;
      if (a === "accion" && e.target && e.target.tagName === "BUTTON" && raiz.contains(e.target) && !e.target.classList.contains("mj-boton")) return; // botones del panel
      e.preventDefault(); e.stopPropagation();
      if (!P.held[a]) P.pulsado[a] = true; P.held[a] = true;
    };
    const ku = (e) => { const a = MAPA[e.code]; if (a) P.held[a] = false; };
    document.addEventListener("keydown", kd, true); document.addEventListener("keyup", ku, true);
    (op.mandos || []).forEach((m) => {
      const b = el("button", { class: "mj-boton " + (m.clase || ""), type: "button", tabindex: "-1", "aria-label": m.aria || m.id, html: m.html });
      const on = (e) => { e.preventDefault(); if (PP.Audio) PP.Audio.init(); if (!P.held[m.id]) P.pulsado[m.id] = true; P.held[m.id] = true; b.classList.add("on"); };
      const off = () => { P.held[m.id] = false; b.classList.remove("on"); };
      b.addEventListener("pointerdown", on); b.addEventListener("pointerup", off); b.addEventListener("pointerleave", off); b.addEventListener("pointercancel", off);
      mandos.appendChild(b);
    });
    cv.addEventListener("pointerdown", (e) => { if (PP.Audio) PP.Audio.init(); const r = cv.getBoundingClientRect(); if (op.alTocar) op.alTocar(e.clientX - r.left, e.clientY - r.top); });
    bSalir.addEventListener("click", () => { if (op.alSalir) op.alSalir(); });
    /** Parte inferior del HUD (en px CSS): el campo de juego empieza por debajo */
    P.top = () => hud.offsetTop + hud.offsetHeight;
    P.tomar = (a) => { if (P.pulsado[a]) { P.pulsado[a] = false; return true; } return false; };
    P.fb = (html, tipo) => { explic.innerHTML = html || ""; explic.className = "mj-explica" + (tipo ? " " + tipo : ""); if (html && ciclo() === 1 && tipo) PP.Voz.decir(explic.textContent); };
    P.chispas = (x, y, color, n) => { if (menosMov()) n = Math.ceil(n / 3); for (let k = 0; k < n; k++) { const a = Math.random() * 7, v = 80 + Math.random() * 260; P.part.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 80, vida: 0, max: 0.6 + Math.random() * 0.6, color: Array.isArray(color) ? U.pick(color) : color, tam: 2 + Math.random() * 4 }); } };
    P.particulas = (g, dt) => {
      P.part = P.part.filter((p) => (p.vida += dt) < p.max);
      for (const p of P.part) { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 420 * dt; g.globalAlpha = 1 - p.vida / p.max; g.fillStyle = p.color; g.fillRect(p.x - p.tam / 2, p.y - p.tam / 2, p.tam, p.tam); }
      g.globalAlpha = 1;
    };
    let raf = 0, ultimo = 0;
    P.bucle = (fn) => {
      const paso = (t) => {
        if (P.fin) return;
        const dt = Math.min(0.05, (t - (ultimo || t)) / 1000); ultimo = t; P.t += dt;
        g.setTransform(P.dpr, 0, 0, P.dpr, 0, 0);
        fn(dt);
        raf = requestAnimationFrame(paso);
      };
      raf = requestAnimationFrame(paso);
    };
    P.cerrar = () => {
      P.fin = true; cancelAnimationFrame(raf); MJ.auto = null;
      document.removeEventListener("keydown", kd, true); document.removeEventListener("keyup", ku, true); window.removeEventListener("resize", ajustar);
      raiz.remove();
    };
    /** Panel final dentro del minijuego */
    P.final = (titulo, html, alContinuar) => {
      MJ.auto = null;
      const caja = el("div", { class: "mj-final", role: "dialog", "aria-modal": "true", "aria-label": titulo }, [
        el("div", { class: "res-cinta", text: "¡MINIJUEGO SUPERADO!" }), el("h2", { text: titulo }), el("p", { html }),
        el("button", { class: "btn btn-primario", type: "button", html: "Continuar " + U.icon("play"), onclick: () => alContinuar() })]);
      raiz.appendChild(caja); setTimeout(() => { const b = caja.querySelector("button"); if (b) b.focus(); }, 60);
      PP.Audio.sfx("victoria");
    };
    setTimeout(() => raiz.focus(), 30);
    setTimeout(() => ayuda.classList.add("oculta"), 10000);
    PP.Audio.musica(op.musica || "persecucion");
    return P;
  }

  function registrar(ctx, crit, item, ok, mecanica, subtipo, respuesta, correcta, detalle) {
    PP.Eval.registrar({ crit, ok, mecanica, subtipo, mision: ctx.id, item, respuesta, correcta, detalle: ok ? "" : (detalle || "") });
  }

  /** Medidor de potencia que sube y baja; zona buena centrada en `obj` con margen `tol`. */
  function medidor(vel) { return { v: 0, dir: 1, activo: false, vel, act(dt) { if (!this.activo) return; this.v += this.dir * this.vel * dt; if (this.v >= 1) { this.v = 1; this.dir = -1; } if (this.v <= 0) { this.v = 0; this.dir = 1; } } }; }
  function dibujarMedidor(g, x, y, h, m, obj, tol, rotuloTxt) {
    const w = 26;
    g.fillStyle = "rgba(10,14,30,0.75)"; rr(g, x - w / 2 - 6, y - 6, w + 12, h + 34, 12); g.fill();
    const grad = g.createLinearGradient(0, y + h, 0, y); grad.addColorStop(0, "#3bceac"); grad.addColorStop(0.6, "#ffd23f"); grad.addColorStop(1, "#ff5d73");
    g.fillStyle = "#222"; g.fillRect(x - w / 2, y, w, h);
    g.fillStyle = "rgba(255,255,255,0.25)"; g.fillRect(x - w / 2, y + h * (1 - (obj + tol)), w, h * tol * 2);
    g.strokeStyle = "#fff"; g.lineWidth = 2; g.strokeRect(x - w / 2, y + h * (1 - (obj + tol)), w, h * tol * 2);
    g.fillStyle = grad; g.fillRect(x - w / 2 + 3, y + h * (1 - m.v), w - 6, h * m.v);
    g.fillStyle = "#fff"; g.fillRect(x - w / 2 - 4, y + h * (1 - m.v) - 2, w + 8, 4);
    g.font = "800 12px 'Trebuchet MS', sans-serif"; g.textAlign = "center"; g.textBaseline = "alphabetic"; g.fillStyle = "#fff"; g.fillText(rotuloTxt || "FUERZA", x, y + h + 20);
  }

  // ============================================================== CANASTAS
  function canastas(d, ctx) {
    return new Promise((res) => {
      const c = ciclo(), CAT = PP.CATEGORIAS, cats = d.categorias.slice(), n = cats.length;
      const lista = U.muestra(d.items, c === 1 ? 6 : 8, "mj-can:" + curso());
      const tolPot = tranquilo() ? 1 : c === 1 ? 0.2 : 0.15;
      let P = null;
      const st = { i: -1, it: null, sel: Math.floor(n / 2), fase: "apuntar", reg: false, probadas: new Set(), bola: null, aciertos: 0, racha: 0, mejor: 0, med: medidor(c === 1 ? 0.75 : 0.95) };
      const aros = () => cats.map((k, i) => {
        const anchoZona = Math.min(P.W * 0.94, 980) / n, x0 = (P.W - anchoZona * n) / 2;
        let x = x0 + anchoZona * (i + 0.5);
        if (!tranquilo() && c > 1 && st.i >= 3 && !menosMov()) x += Math.sin(P.t * 0.9 + i * 1.7) * anchoZona * 0.12;
        const top = P.top(), r = Math.min(46, anchoZona * 0.3);
        return { k, x, y: Math.max(top + r * 2.3, top + (P.H - top) * 0.3), r, ancho: anchoZona };
      });
      P = pantalla({ clase: "canastas", titulo: "Canastas de palabras", color: "#ff7a45", musica: "taller",
        ayuda: "Elige canasta con ◀ ▶, los números o tocándola. Lanzar: ESPACIO (una vez para la fuerza y otra para soltar).",
        mandos: [{ id: "izq", html: "◀", aria: "Canasta anterior" }, { id: "accion", html: "Lanzar", clase: "grande", aria: "Lanzar" }, { id: "der", html: "▶", aria: "Canasta siguiente" }],
        alTocar: (x, y) => { const a = aros(); const k = a.findIndex((h) => Math.abs(x - h.x) < h.ancho / 2 && y < P.H * 0.6); if (k >= 0 && st.fase === "apuntar") { st.sel = k; P.pulsado.accion = true; } else if (st.fase === "potencia") P.pulsado.accion = true; },
        alSalir: () => { P.cerrar(); res({ abandonada: true }); } });
      const marcarFrase = (it) => U.esc(it.f).replace(new RegExp("(^|[^\\p{L}])(" + it.w + ")(?=[^\\p{L}]|$)", "u"), (a, b, w) => b + "<mark>" + w + "</mark>");
      function siguiente() {
        st.i++; st.it = lista[st.i]; st.reg = false; st.probadas = new Set(); st.fase = "apuntar"; st.bola = null; P.fb("");
        if (!st.it) return terminar();
        P.prog.textContent = "Palabra " + (st.i + 1) + " de " + lista.length;
        P.enun.innerHTML = '<p class="mj-frase">' + marcarFrase(st.it) + '</p><p class="mj-sub">¿Qué clase de palabra es <b>«' + U.esc(st.it.w) + '»</b> en esta frase?</p>';
        PP.Voz.decir(st.it.f + ". ¿Qué clase de palabra es " + st.it.w + "?");
        MJ.auto = () => { if (st.fase !== "apuntar") return false; st.sel = cats.indexOf(st.it.c); lanzar(0.75); return true; };
      }
      function lanzar(v) {
        const k = cats[st.sel], ok = k === st.it.c, buena = Math.abs(v - 0.75) <= tolPot;
        if (!st.reg) { st.reg = true; registrar(ctx, ctx.crit || "9.1", "mjc-" + st.it.w + "-" + st.it.f.slice(0, 30), ok, "canastas", CAT[st.it.c].n.toLowerCase() + (st.it.doble ? " (doble cara)" : ""), CAT[k].n, CAT[st.it.c].n, "Lanzó «" + st.it.w + "» (en «" + st.it.f + "») a la canasta de " + CAT[k].n.toLowerCase()); if (!ok) { st.racha = 0; } }
        const a = aros()[st.sel];
        st.bola = { t: 0, x0: P.W / 2, y0: P.H * 0.84, hx: a.x, hy: a.y, ok, buena, corta: v < 0.75, sel: st.sel };
        st.fase = "vuelo"; st.med.activo = false; PP.Audio.sfx("whoosh");
      }
      function resultado(b) {
        if (!b.ok) {
          st.probadas.add(b.sel); PP.Audio.sfx("choque"); st.racha = 0;
          P.fb("¡Clonc! «" + U.esc(st.it.w) + "» no es " + U.esc(CAT[cats[b.sel]].n.toLowerCase()) + " aquí. Pista: un " + U.esc(CAT[st.it.c].n.toLowerCase()) + " " + U.esc(CAT[st.it.c].d) + ". Fíjate en lo que hace la palabra en la frase.", "mal");
          st.fase = "apuntar"; st.bola = null; return;
        }
        if (!b.buena) { PP.Audio.sfx("frenazo"); P.fb("¡Buena elección! Pero " + (b.corta ? "te faltó fuerza" : "te pasaste de fuerza") + ". Vuelve a lanzar: la elección ya está bien.", "info"); st.fase = "apuntar"; st.bola = null; return; }
        st.aciertos++; if (st.probadas.size === 0) { st.racha++; st.mejor = Math.max(st.mejor, st.racha); }
        PP.Audio.sfx("recoger"); P.chispas(b.hx, b.hy, ["#ffd23f", "#ff7a45", "#fff"], 30); PP.juego.sumar(10 + Math.min(st.racha, 6) * 3);
        P.fb("¡Canasta! " + U.esc(st.it.fb), "bien"); st.fase = "pausa"; setTimeout(siguiente, st.it.doble ? 2300 : 1600);
      }
      function terminar() {
        P.enun.innerHTML = ""; MJ.auto = null;
        P.final("Canastas de palabras", "Has encestado <b>" + st.aciertos + "</b> palabras. Mejor racha: <b>" + st.mejor + "</b>.<br>Recuerda: la clase de una palabra depende de lo que hace en la frase.", () => { P.cerrar(); res({ hecho: true }); });
      }
      P.bucle((dt) => {
        const g = P.g, W = P.W, H = P.H, A = aros();
        // entrada
        if (st.fase === "apuntar") {
          if (P.tomar("izq")) { st.sel = (st.sel + n - 1) % n; PP.Audio.sfx("tecla"); }
          if (P.tomar("der")) { st.sel = (st.sel + 1) % n; PP.Audio.sfx("tecla"); }
          for (let k = 1; k <= n; k++) if (P.tomar("n" + k)) { st.sel = k - 1; P.pulsado.accion = true; }
          if (P.tomar("accion")) { if (tranquilo()) lanzar(0.75); else { st.fase = "potencia"; st.med.v = 0; st.med.dir = 1; st.med.activo = true; } }
        } else if (st.fase === "potencia") { st.med.act(dt); if (P.tomar("accion")) lanzar(st.med.v); } else P.pulsado = {};
        // fondo: feria nocturna
        const cielo = g.createLinearGradient(0, 0, 0, H); cielo.addColorStop(0, "#1d1b4f"); cielo.addColorStop(1, "#6b2f6b"); g.fillStyle = cielo; g.fillRect(0, 0, W, H);
        for (let k = 0; k < 24; k++) { const x = (k + 0.5) * W / 24, y = 26 + Math.sin(k * 0.8) * 10; g.fillStyle = ["#ffd23f", "#ff5d73", "#3bceac", "#9ff0e0"][k % 4]; g.globalAlpha = menosMov() ? 0.9 : 0.6 + 0.4 * Math.sin(P.t * 4 + k); g.beginPath(); g.arc(x, y, 5, 0, 7); g.fill(); }
        g.globalAlpha = 1;
        const suelo = H * 0.7; g.fillStyle = "#8b4513"; g.fillRect(0, suelo, W, H - suelo); g.fillStyle = "#a0522d"; for (let x = 0; x < W; x += 60) g.fillRect(x, suelo, 30, H - suelo);
        const pt = P.top() + 6, pb = A.length ? A[0].y + A[0].r * 2.4 : H * 0.56; g.fillStyle = "#e8e2d0"; rr(g, W * 0.03, pt, W * 0.94, pb - pt, 14); g.fill(); g.strokeStyle = "#3d2b63"; g.lineWidth = 5; g.stroke();
        // canastas
        A.forEach((a, i) => {
          const C2 = CAT[a.k], probada = st.probadas.has(i), sel = i === st.sel && st.fase !== "pausa";
          g.fillStyle = "#fff"; g.strokeStyle = sel ? "#ffd23f" : "#1b1b2f"; g.lineWidth = sel ? 6 : 3;
          rr(g, a.x - a.r * 1.5, a.y - a.r * 2.1, a.r * 3, a.r * 1.9, 8); g.fill(); g.stroke();
          g.strokeStyle = C2.color || "#ff7a45"; g.lineWidth = 3; g.strokeRect(a.x - a.r * 0.6, a.y - a.r * 1.4, a.r * 1.2, a.r * 1.05);
          // red
          g.strokeStyle = "rgba(255,255,255,0.9)"; g.lineWidth = 1.5;
          for (let k = -3; k <= 3; k++) { g.beginPath(); g.moveTo(a.x + k * a.r / 3.2, a.y); g.lineTo(a.x + k * a.r / 5, a.y + a.r * 1.1); g.stroke(); }
          g.strokeStyle = probada ? "#888" : "#ff6a00"; g.lineWidth = 5; g.beginPath(); g.ellipse(a.x, a.y, a.r, a.r * 0.28, 0, 0, 7); g.stroke();
          const lab = (i + 1) + " · " + C2.n.toUpperCase();
          etiqueta(g, lab, a.x, a.y + a.r * 1.7, clamp(a.ancho / 11, 12, 18), probada ? "#bbb" : (C2.color || "#ffd23f"), "#1b1b2f", "#1b1b2f");
          if (sel) { g.fillStyle = "#ffd23f"; g.beginPath(); const yb = a.y - a.r * 2.5 - (menosMov() ? 0 : Math.abs(Math.sin(P.t * 5)) * 6); g.moveTo(a.x, yb + 12); g.lineTo(a.x - 12, yb - 6); g.lineTo(a.x + 12, yb - 6); g.fill(); }
        });
        // lanzador y balón
        const bx = W / 2, by = H * 0.84;
        if (st.bola) {
          const b = st.bola; b.t += dt / 0.95;
          const tt = Math.min(1, b.t), sale = !b.buena ? (b.corta ? 0.25 : -0.35) : 0;
          let x = lerp(b.x0, b.hx, tt), y = lerp(b.y0, b.hy + sale * H * (tt), tt) - H * 0.42 * 4 * tt * (1 - tt), s = lerp(1, 0.55, tt);
          if (b.t >= 1 && !b.ok) { const t2 = b.t - 1; x = b.hx + t2 * 220 * (b.sel < n / 2 ? -1 : 1); y = b.hy - 60 * Math.sin(Math.min(1, t2 * 2) * Math.PI) + t2 * t2 * 600; }
          if (b.t >= 1 && b.ok && b.buena) y = b.hy + Math.min(1, b.t - 1) * 90;
          g.fillStyle = "#ff922b"; g.strokeStyle = "#1b1b2f"; g.lineWidth = 2.5; g.beginPath(); g.arc(x, y, 30 * s, 0, 7); g.fill(); g.stroke();
          g.beginPath(); g.moveTo(x - 30 * s, y); g.lineTo(x + 30 * s, y); g.moveTo(x, y - 30 * s); g.lineTo(x, y + 30 * s); g.stroke();
          if (!b.hecho && ((b.ok && b.buena && b.t >= 1.25) || (b.t >= 1.6))) { b.hecho = true; resultado(b); }
        } else if (st.it) {
          g.fillStyle = "#ff922b"; g.strokeStyle = "#1b1b2f"; g.lineWidth = 3; g.beginPath(); g.arc(bx, by, 32, 0, 7); g.fill(); g.stroke();
          g.beginPath(); g.moveTo(bx - 32, by); g.lineTo(bx + 32, by); g.moveTo(bx, by - 32); g.lineTo(bx, by + 32); g.stroke();
          etiqueta(g, st.it.w, bx, by - 58, 20, "#fff", "#1b1b2f");
          const a = A[st.sel]; if (a && st.fase !== "pausa") { g.setLineDash([6, 10]); g.strokeStyle = "rgba(255,255,255,0.7)"; g.lineWidth = 3; g.beginPath(); g.moveTo(bx, by - 34); g.quadraticCurveTo((bx + a.x) / 2, H * 0.1, a.x, a.y); g.stroke(); g.setLineDash([]); }
        }
        if (st.fase === "potencia") dibujarMedidor(g, 60, H * 0.62, H * 0.26, st.med, 0.75, tolPot);
        P.particulas(g, dt);
        P.marc.textContent = "Canastas: " + st.aciertos + (st.racha >= 2 ? " · Racha x" + st.racha : "");
      });
      setTimeout(siguiente, 300);
    });
  }

  // ============================================================== PENALTIS
  const TIPO_TXT = { fiable: "DATO FIABLE", bulo: "BULO", opinion: "OPINIÓN" };
  const TIPO_COL = { fiable: "#3bceac", bulo: "#ff6b6b", opinion: "#ffd23f" };
  function penaltis(d, ctx) {
    return new Promise((res) => {
      const c = ciclo();
      const lista = U.muestra(d.posts, c === 3 ? 6 : 5, "mj-pen:" + curso());
      const zonas = U.shuffle(["fiable", "bulo", "opinion"]);
      const tolPot = tranquilo() ? 1 : c === 1 ? 0.24 : 0.18;
      let P = null;
      const st = { i: -1, it: null, sel: 1, fase: "apuntar", reg: false, bola: null, goles: 0, paradas: 0, portero: { x: 0, rot: 0, objetivo: 0 }, med: medidor(c === 1 ? 0.8 : 1) };
      const porteria = () => { const y = P.top() + 44, w = Math.max(240, Math.min(P.W * 0.82, 700, (P.H * 0.86 - 70 - y) / 0.36)), h = w * 0.36, x = (P.W - w) / 2; return { x, y, w, h }; };
      P = pantalla({ clase: "penaltis", titulo: "Penaltis contra el Borrón", color: "#3fd0e0", musica: "onda",
        ayuda: "Elige la zona de la portería con ◀ ▶ (o tocándola) y chuta con ESPACIO: una vez para la fuerza y otra para disparar.",
        mandos: [{ id: "izq", html: "◀", aria: "Zona a la izquierda" }, { id: "accion", html: "Chutar", clase: "grande", aria: "Chutar" }, { id: "der", html: "▶", aria: "Zona a la derecha" }],
        alTocar: (x, y) => { const p = porteria(); if (y < p.y + p.h + 30 && x > p.x && x < p.x + p.w && st.fase === "apuntar") { st.sel = clamp(Math.floor((x - p.x) / (p.w / 3)), 0, 2); P.pulsado.accion = true; } else if (st.fase === "potencia") P.pulsado.accion = true; },
        alSalir: () => { P.cerrar(); res({ abandonada: true }); } });
      function siguiente() {
        st.i++; st.it = lista[st.i]; st.reg = false; st.fase = "apuntar"; st.bola = null; st.portero = { x: 0, rot: 0, objetivo: 0 }; P.fb("");
        if (!st.it) return terminar();
        const p = st.it;
        P.prog.textContent = "Penalti " + (st.i + 1) + " de " + lista.length;
        P.enun.innerHTML = '<div class="mj-post"><div class="mj-post-cab"><span class="mj-av" style="background:' + U.esc(p.color || "#7b6cf6") + '">' + U.esc((p.autor || "?")[0]) + "</span><b>" + U.esc(p.autor || "") + "</b>" + (p.verificado ? ' <span class="mj-verif" title="Cuenta verificada">✔</span>' : "") + "<small>" + U.esc((p.usuario || "") + " · " + (p.hace || "")) + "</small></div><p>" + U.esc(p.texto) + "</p></div>";
        PP.Voz.decir(p.texto);
        MJ.auto = () => { if (st.fase !== "apuntar") return false; st.sel = zonas.indexOf(st.it.tipo); chutar(0.7); return true; };
      }
      function chutar(v) {
        const k = zonas[st.sel], ok = k === st.it.tipo, buena = Math.abs(v - 0.7) <= tolPot;
        if (!st.reg) { st.reg = true; registrar(ctx, ctx.crit || "6.1", "mjp-" + st.it.texto.slice(0, 40), ok, "penaltis", TIPO_TXT[st.it.tipo].toLowerCase(), TIPO_TXT[k], TIPO_TXT[st.it.tipo], "Clasificó como «" + TIPO_TXT[k].toLowerCase() + "» el mensaje: «" + st.it.texto + "»"); }
        const p = porteria(), zx = p.x + p.w * (st.sel + 0.5) / 3;
        st.bola = { t: 0, tx: zx + U.rand(-p.w / 14, p.w / 14), ty: p.y + p.h * (buena ? 0.45 : v < 0.7 ? 1.05 : -0.35), ok, buena, debil: v < 0.7 };
        // el portero se tira: hacia la zona elegida si la decisión es errónea (para) y hacia otra si es correcta
        const dest = !ok ? st.sel : [0, 1, 2].filter((z) => z !== st.sel)[Math.random() < 0.5 ? 0 : 1];
        st.portero.objetivo = (dest - 1);
        st.fase = "vuelo"; st.med.activo = false; PP.Audio.sfx("choque");
      }
      function resultado(b) {
        if (!b.ok) {
          st.paradas++; PP.Audio.sfx("mal");
          P.fb("¡Parada del Borrón! Este mensaje es <b>" + TIPO_TXT[st.it.tipo].toLowerCase() + "</b>: " + U.esc(st.it.fb), "mal");
          st.fase = "pausa"; setTimeout(siguiente, 3600); return;
        }
        if (!b.buena) { PP.Audio.sfx("frenazo"); P.fb("¡Bien leído! Pero " + (b.debil ? "el balón iba flojo" : "el balón se fue por encima") + ". Repite el penalti: la elección ya es correcta.", "info"); st.fase = "apuntar"; st.bola = null; st.portero = { x: 0, rot: 0, objetivo: 0 }; return; }
        st.goles++; PP.Audio.sfx("victoria"); PP.juego.sumar(25); P.chispas(b.tx, b.ty, ["#fff", "#3fd0e0", "#ffd23f"], 40);
        P.fb("¡GOOOL! Es <b>" + TIPO_TXT[st.it.tipo].toLowerCase() + "</b>: " + U.esc(st.it.fb), "bien"); st.fase = "pausa"; setTimeout(siguiente, 2600);
      }
      function terminar() {
        P.enun.innerHTML = "";
        P.final("Penaltis contra el Borrón", "Resultado: <b>Tú " + st.goles + " – " + st.paradas + " Borrón</b>.<br>Antes de creer o compartir un mensaje: ¿quién lo dice?, ¿da datos?, ¿exagera o mete prisa?", () => { P.cerrar(); res({ hecho: true }); });
      }
      P.bucle((dt) => {
        const g = P.g, W = P.W, H = P.H, p = porteria();
        if (st.fase === "apuntar") {
          if (P.tomar("izq")) { st.sel = Math.max(0, st.sel - 1); PP.Audio.sfx("tecla"); }
          if (P.tomar("der")) { st.sel = Math.min(2, st.sel + 1); PP.Audio.sfx("tecla"); }
          for (let k = 1; k <= 3; k++) if (P.tomar("n" + k)) { st.sel = k - 1; P.pulsado.accion = true; }
          if (P.tomar("accion")) { if (tranquilo()) chutar(0.7); else { st.fase = "potencia"; st.med.v = 0; st.med.dir = 1; st.med.activo = true; } }
        } else if (st.fase === "potencia") { st.med.act(dt); if (P.tomar("accion")) chutar(st.med.v); } else P.pulsado = {};
        // estadio
        g.fillStyle = "#0e2a47"; g.fillRect(0, 0, W, H);
        for (let r = 0; r < 4; r++) for (let x = 0; x < W; x += 14) { g.fillStyle = ["#ff5d73", "#ffd23f", "#3fd0e0", "#fff", "#7b6cf6"][(x / 14 + r * 3) % 5 | 0]; g.globalAlpha = 0.55; g.beginPath(); g.arc(x + (r % 2) * 7, 14 + r * 14 + (menosMov() ? 0 : Math.sin(P.t * 6 + x) * 1.5), 5, 0, 7); g.fill(); }
        g.globalAlpha = 1;
        const cesped = p.y + p.h - 4;
        for (let k = 0; k < 10; k++) { g.fillStyle = k % 2 ? "#2f9e44" : "#37b24d"; const y0 = lerp(cesped, H, Math.pow(k / 10, 1.6)), y1 = lerp(cesped, H, Math.pow((k + 1) / 10, 1.6)); g.fillRect(0, y0, W, y1 - y0 + 1); }
        g.fillStyle = "#37b24d"; g.fillRect(0, p.y - 10, W, cesped - p.y + 10);
        g.fillStyle = "#2b8a3e"; g.fillRect(0, p.y - 40, W, 30);
        // red y zonas
        g.fillStyle = "rgba(255,255,255,0.12)"; g.fillRect(p.x, p.y, p.w, p.h);
        g.strokeStyle = "rgba(255,255,255,0.35)"; g.lineWidth = 1; for (let x = p.x; x <= p.x + p.w; x += 14) { g.beginPath(); g.moveTo(x, p.y); g.lineTo(x, p.y + p.h); g.stroke(); } for (let y = p.y; y <= p.y + p.h; y += 14) { g.beginPath(); g.moveTo(p.x, y); g.lineTo(p.x + p.w, y); g.stroke(); }
        zonas.forEach((z, i) => {
          const zx = p.x + p.w * i / 3, sel = i === st.sel && st.fase !== "pausa";
          g.fillStyle = TIPO_COL[z]; g.globalAlpha = sel ? 0.42 : 0.18; g.fillRect(zx + 3, p.y + 3, p.w / 3 - 6, p.h - 6); g.globalAlpha = 1;
          if (sel) { g.strokeStyle = "#fff"; g.lineWidth = 4; g.setLineDash([10, 8]); g.lineDashOffset = -P.t * 30; g.strokeRect(zx + 4, p.y + 4, p.w / 3 - 8, p.h - 8); g.setLineDash([]); }
          etiqueta(g, (i + 1) + " · " + TIPO_TXT[z], zx + p.w / 6, p.y - 22, clamp(p.w / 34, 12, 19), TIPO_COL[z]);
        });
        g.fillStyle = "#fff"; g.fillRect(p.x - 8, p.y - 8, 8, p.h + 8); g.fillRect(p.x + p.w, p.y - 8, 8, p.h + 8); g.fillRect(p.x - 8, p.y - 8, p.w + 16, 8);
        // portero
        const pt = st.portero; if (st.fase === "vuelo" || st.fase === "pausa") { pt.x = lerp(pt.x, pt.objetivo, Math.min(1, dt * 7)); pt.rot = lerp(pt.rot, pt.objetivo * 0.9, Math.min(1, dt * 7)); } else if (!menosMov()) pt.x = Math.sin(P.t * 1.6) * 0.12;
        borron(g, p.x + p.w / 2 + pt.x * p.w / 3, p.y + p.h * 0.62, p.h * 0.32, { guantes: true, rot: pt.rot, triste: st.fase === "pausa" && st.bola && st.bola.ok });
        // balón
        const sx = W / 2, sy = H * 0.86;
        g.fillStyle = "rgba(255,255,255,0.8)"; g.beginPath(); g.ellipse(sx, sy + 26, 26, 7, 0, 0, 7); g.fill();
        let bx = sx, by = sy, bs = 1;
        if (st.bola) {
          const b = st.bola; b.t += dt / 0.6; const tt = Math.min(1, b.t);
          let tx = b.tx, ty = b.ty;
          if (!b.ok && tt >= 0.85) { tx = p.x + p.w / 2 + pt.x * p.w / 3; ty = p.y + p.h * 0.55; }
          bx = lerp(sx, tx, facil(tt)); by = lerp(sy, ty, facil(tt)) - 40 * Math.sin(tt * Math.PI); bs = lerp(1, 0.42, tt);
          if (!b.hecho && b.t >= 1.15) { b.hecho = true; resultado(b); }
        }
        g.fillStyle = "#fff"; g.strokeStyle = "#1b1b2f"; g.lineWidth = 2.5; g.beginPath(); g.arc(bx, by, 24 * bs, 0, 7); g.fill(); g.stroke();
        g.fillStyle = "#1b1b2f"; g.beginPath(); for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * 1.2566; g.lineTo(bx + Math.cos(a) * 9 * bs, by + Math.sin(a) * 9 * bs); } g.fill();
        if (st.fase === "apuntar") { const zx = p.x + p.w * (st.sel + 0.5) / 3; g.setLineDash([6, 10]); g.strokeStyle = "rgba(255,255,255,0.75)"; g.lineWidth = 3; g.beginPath(); g.moveTo(sx, sy - 26); g.lineTo(zx, p.y + p.h * 0.5); g.stroke(); g.setLineDash([]); }
        if (st.fase === "potencia") dibujarMedidor(g, 60, H * 0.56, H * 0.26, st.med, 0.7, tolPot);
        P.particulas(g, dt);
        P.marc.textContent = "Tú " + st.goles + " – " + st.paradas + " Borrón";
      });
      setTimeout(siguiente, 300);
    });
  }

  // ============================================================== GOLF
  const BANDERAS = [{ c: "#e03131", l: "A" }, { c: "#1c7ed6", l: "B" }, { c: "#f59f00", l: "C" }];
  function golf(d, ctx) {
    return new Promise((res) => {
      const c = ciclo(), pares = d.pares;
      const hoyos = U.muestra(pares, c === 1 ? 3 : 4, "mj-golf:" + curso()).map((p, i) => {
        const dir = i % 2; // 0: ¿qué significa «guagua»?  1: ¿cómo se dice «autobús» en Canarias?
        const otros = U.shuffle(pares.filter((q) => q !== p && q[dir === 0 ? 1 : 0] !== p[dir === 0 ? 1 : 0])).slice(0, 2);
        const correcta = dir === 0 ? p[1] : p[0];
        const ops = U.shuffle([correcta].concat(otros.map((q) => (dir === 0 ? q[1] : q[0]))));
        return { p, dir, correcta, ops, pregunta: dir === 0 ? "En Canarias decimos «" + p[0] + "». ¿Qué significa?" : "¿Cómo se dice «" + p[1] + "» en Canarias?" };
      });
      const DMAX = 110, tol = tranquilo() ? 999 : c === 1 ? 10 : 8, VERDE = 5.5;
      let P = null;
      const st = { i: -1, h: null, sel: 1, fase: "apuntar", reg: false, bola: { x: 0, z: 0 }, cam: { x: 0, z: -9 }, camObj: null, vuelo: null, golpes: 0, total: 0, banderas: [], descartadas: new Set(), med: medidor(c === 1 ? 0.55 : 0.7), hoyosEnUno: 0 };
      P = pantalla({ clase: "golf", titulo: "Golf del Malpaís", color: "#ffb547", musica: "puerto",
        ayuda: "Elige bandera con ◀ ▶, con los números o tocando su respuesta. Golpe: ESPACIO para empezar el swing y otra vez para fijar la fuerza.",
        mandos: [{ id: "izq", html: "◀", aria: "Bandera anterior" }, { id: "accion", html: "Golpear", clase: "grande", aria: "Golpear" }, { id: "der", html: "▶", aria: "Bandera siguiente" }],
        alTocar: () => { if (st.fase === "potencia") P.pulsado.accion = true; },
        alSalir: () => { P.cerrar(); res({ abandonada: true }); } });
      const hor = () => Math.max(P.H * 0.36, P.top() + 80);
      const F = () => (P.H * 0.86 - hor()) * 9 / 6;
      function proj(x, z, y) {
        const zz = Math.max(0.6, z - st.cam.z), s = F() / zz;
        return { x: P.W / 2 + (x - st.cam.x) * s, y: hor() + (6 - (y || 0)) * s, s };
      }
      const activas = () => [0, 1, 2].filter((k) => !st.descartadas.has(k));
      function pintarOpciones() {
        P.enun.innerHTML = "";
        P.enun.appendChild(el("p", { class: "mj-frase", text: st.h.pregunta }));
        const fila = el("div", { class: "mj-ops", role: "group", "aria-label": "Banderas" });
        st.h.ops.forEach((o, k) => fila.appendChild(el("button", { class: "btn mj-op" + (k === st.sel ? " sel" : "") + (st.descartadas.has(k) ? " fuera" : ""), type: "button", disabled: st.descartadas.has(k), html: '<span class="mj-bandera" style="background:' + BANDERAS[k].c + '">' + BANDERAS[k].l + "</span>" + U.esc(o), onclick: () => { if (st.fase === "apuntar") { st.sel = k; pintarOpciones(); } } })));
        P.enun.appendChild(fila);
      }
      function siguiente() {
        st.i++; st.h = hoyos[st.i]; st.reg = false; st.golpes = 0; st.descartadas = new Set(); st.fase = "apuntar"; st.vuelo = null; P.fb("");
        if (!st.h) return terminar();
        const xs = U.shuffle([-24, 0, 24]);
        st.banderas = [0, 1, 2].map((k) => ({ x: xs[k] + U.rand(-3, 3), z: U.rand(58, 92) }));
        st.bola = { x: 0, z: 0 }; st.cam = { x: 0, z: -9 }; st.camObj = null; st.sel = 1;
        P.prog.textContent = "Hoyo " + (st.i + 1) + " de " + hoyos.length;
        pintarOpciones(); PP.Voz.decir(st.h.pregunta + " " + st.h.ops.join(", "));
        MJ.auto = () => { if (st.fase !== "apuntar") return false; st.sel = st.h.ops.indexOf(st.h.correcta); golpear(null); return true; };
      }
      function golpear(v) {
        const b = st.banderas[st.sel], ok = st.h.ops[st.sel] === st.h.correcta;
        if (!st.reg) { st.reg = true; registrar(ctx, ctx.crit || "1.1", "mjg-" + st.h.p[0] + "-" + st.h.dir, ok, "golf", st.h.dir === 0 ? "significado de un canarismo" : "forma canaria", st.h.ops[st.sel], st.h.correcta, "Ante «" + st.h.pregunta + "» apuntó a «" + st.h.ops[st.sel] + "»"); }
        const dist = Math.hypot(b.x - st.bola.x, b.z - st.bola.z);
        const recorrido = v == null || tranquilo() ? dist : v * DMAX;
        const err = recorrido - dist, ux = (b.x - st.bola.x) / dist, uz = (b.z - st.bola.z) / dist;
        const fin = Math.abs(err) <= tol ? { x: b.x, z: b.z } : { x: st.bola.x + ux * recorrido, z: st.bola.z + uz * recorrido };
        st.vuelo = { t: 0, x0: st.bola.x, z0: st.bola.z, x1: fin.x, z1: fin.z, alto: 8 + recorrido * 0.18, dentro: Math.abs(err) <= tol, ok, err };
        st.golpes++; st.total++; st.fase = "vuelo"; st.med.activo = false; PP.Audio.sfx("golpe");
      }
      function aterriza(v) { st.bola = { x: v.x1, z: v.z1 };
        if (v.dentro && v.ok) {
          PP.Audio.sfx("victoria"); if (st.golpes === 1) st.hoyosEnUno++;
          PP.juego.sumar(st.golpes === 1 ? 40 : 25);
          const pt = proj(v.x1, v.z1); P.chispas(pt.x, pt.y, ["#ffd23f", "#fff", "#37b24d"], 36);
          P.fb((st.golpes === 1 ? "¡HOYO EN UNO! " : "¡Dentro! ") + "«" + U.esc(st.h.p[0]) + "» = «" + U.esc(st.h.p[1]) + "». " + U.esc(st.h.p[2] || ""), "bien");
          st.fase = "pausa"; MJ.auto = null; setTimeout(siguiente, 2600); return;
        }
        if (!v.ok) {
          st.descartadas.add(st.sel); PP.Audio.sfx("mal");
          P.fb("La bandera «" + U.esc(st.h.ops[st.sel]) + "» no es la respuesta. " + (st.h.dir === 0 ? "«" + U.esc(st.h.p[0]) + "» no significa eso." : "Así no se dice en Canarias.") + " Pista: " + U.esc(st.h.p[3] || st.h.p[2] || "piensa en cómo lo dicen en casa."), "mal");
          st.sel = activas().find((k) => k !== st.sel) ?? activas()[0];
        } else { PP.Audio.sfx("frenazo"); P.fb("¡Buena dirección! " + (v.err < 0 ? "Te has quedado corto." : "Te has pasado.") + " Golpea otra vez desde donde ha caído la bola.", "info"); }
        st.camObj = { x: st.bola.x, z: st.bola.z - 9 }; st.fase = "camara"; pintarOpciones();
      }
      function terminar() {
        P.enun.innerHTML = "";
        P.final("Golf del Malpaís", "Has completado " + hoyos.length + " hoyos en <b>" + st.total + "</b> golpes" + (st.hoyosEnUno ? " (¡" + st.hoyosEnUno + " hoyo" + (st.hoyosEnUno > 1 ? "s" : "") + " en uno!)" : "") + ".<br>Guagua, papa, millo… El español de Canarias comparte muchas palabras con América.", () => { P.cerrar(); res({ hecho: true }); });
      }
      P.bucle((dt) => {
        const g = P.g, W = P.W, H = P.H, HZ = hor();
        if (st.fase === "apuntar") {
          const act = activas(), idx = act.indexOf(st.sel);
          if (P.tomar("izq")) { st.sel = act[(idx + act.length - 1) % act.length]; PP.Audio.sfx("tecla"); pintarOpciones(); }
          if (P.tomar("der")) { st.sel = act[(idx + 1) % act.length]; PP.Audio.sfx("tecla"); pintarOpciones(); }
          for (let k = 1; k <= 3; k++) if (P.tomar("n" + k) && act.includes(k - 1)) { st.sel = k - 1; pintarOpciones(); }
          if (P.tomar("accion")) { if (tranquilo()) golpear(null); else { st.fase = "potencia"; st.med.v = 0; st.med.dir = 1; st.med.activo = true; } }
        } else if (st.fase === "potencia") { st.med.act(dt); if (P.tomar("accion")) golpear(st.med.v); } else P.pulsado = {};
        if (st.fase === "camara" && st.camObj) { const k = Math.min(1, dt * 3); st.cam.x = lerp(st.cam.x, st.camObj.x, k); st.cam.z = lerp(st.cam.z, st.camObj.z, k); if (Math.abs(st.cam.z - st.camObj.z) < 0.2 && Math.abs(st.cam.x - st.camObj.x) < 0.2) { st.cam = Object.assign({}, st.camObj); st.fase = "apuntar"; } }
        // cielo, mar y volcán
        const cielo = g.createLinearGradient(0, 0, 0, HZ); cielo.addColorStop(0, "#4dabf7"); cielo.addColorStop(1, "#d0ebff"); g.fillStyle = cielo; g.fillRect(0, 0, W, HZ);
        g.fillStyle = "rgba(255,255,255,0.85)"; for (let k = 0; k < 4; k++) { const x = ((k * 330 + P.t * (menosMov() ? 0 : 8)) % (W + 300)) - 150, y = 40 + k * 22; g.beginPath(); g.ellipse(x, y, 60, 16, 0, 0, 7); g.ellipse(x + 40, y - 8, 40, 14, 0, 0, 7); g.fill(); }
        const vx = W * 0.72 - st.cam.x * 2; g.fillStyle = "#6b5b73"; g.beginPath(); g.moveTo(vx - W * 0.38, HZ); g.lineTo(vx - 40, HZ - H * 0.22); g.lineTo(vx + 40, HZ - H * 0.22); g.lineTo(vx + W * 0.38, HZ); g.fill();
        g.fillStyle = "#f8f9fa"; g.beginPath(); g.moveTo(vx - 40, HZ - H * 0.22); g.lineTo(vx + 40, HZ - H * 0.22); g.lineTo(vx + 75, HZ - H * 0.16); g.lineTo(vx + 20, HZ - H * 0.18); g.lineTo(vx - 15, HZ - H * 0.155); g.lineTo(vx - 70, HZ - H * 0.165); g.fill();
        g.fillStyle = "#1971c2"; g.fillRect(0, HZ - 8, W, 10);
        // malpaís (lava negra) y calle
        g.fillStyle = "#343a40"; g.fillRect(0, HZ, W, H - HZ);
        g.fillStyle = "#495057"; for (let k = 0; k < 140; k++) { const x = (k * 97.3) % W, y = HZ + ((k * 53.7) % (H - HZ)); g.fillRect(x, y, 3 + (k % 3), 2); }
        for (let z = st.cam.z + 160; z > st.cam.z + 0.8; z -= 3) {
          const a = proj(-34, z), b = proj(34, z), a2 = proj(-34, z - 3), b2 = proj(34, z - 3);
          g.fillStyle = Math.floor(z / 9) % 2 ? "#40c057" : "#51cf66";
          g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.lineTo(b2.x, b2.y); g.lineTo(a2.x, a2.y); g.fill();
        }
        // tabaibas a los lados
        for (let z = Math.ceil((st.cam.z + 4) / 18) * 18; z < st.cam.z + 160; z += 18) [-46, 46].forEach((x) => { const q = proj(x + (z % 36 ? 4 : -4), z); if (q.s < 1.2) return; g.fillStyle = "#5c940d"; g.beginPath(); g.arc(q.x, q.y - q.s * 1.2, q.s * 1.6, 0, 7); g.arc(q.x - q.s * 1.2, q.y - q.s * 0.6, q.s * 1.1, 0, 7); g.arc(q.x + q.s * 1.2, q.y - q.s * 0.6, q.s * 1.1, 0, 7); g.fill(); });
        // greens y banderas (de lejos a cerca)
        const orden = st.banderas.length ? [0, 1, 2].sort((a, b) => st.banderas[b].z - st.banderas[a].z) : [];
        for (const k of orden) {
          const b = st.banderas[k]; if (!b) continue;
          const c0 = proj(b.x, b.z), cx = proj(b.x + VERDE, b.z), cz = proj(b.x, b.z - VERDE);
          g.fillStyle = st.descartadas.has(k) ? "#868e96" : "#8ce99a"; g.beginPath(); g.ellipse(c0.x, c0.y, Math.max(4, cx.x - c0.x), Math.max(2, cz.y - c0.y), 0, 0, 7); g.fill();
          g.fillStyle = "#1b1b2f"; g.beginPath(); g.ellipse(c0.x, c0.y, Math.max(2, c0.s * 0.6), Math.max(1, c0.s * 0.22), 0, 0, 7); g.fill();
          const top = proj(b.x, b.z, 8), caida = st.descartadas.has(k);
          g.strokeStyle = "#f8f9fa"; g.lineWidth = Math.max(2, c0.s * 0.18); g.beginPath(); g.moveTo(c0.x, c0.y); g.lineTo(caida ? c0.x + (top.y - c0.y) * 0.8 : top.x, caida ? c0.y - 4 : top.y); g.stroke();
          if (!caida) {
            const ond = menosMov() ? 0 : Math.sin(P.t * 5 + k) * 0.25, fw = Math.max(18, c0.s * 3.4), fh = Math.max(12, c0.s * 2.2);
            g.fillStyle = BANDERAS[k].c; g.beginPath(); g.moveTo(top.x, top.y); g.quadraticCurveTo(top.x + fw * 0.5, top.y + fh * (0.3 + ond), top.x + fw, top.y + fh * 0.5); g.lineTo(top.x, top.y + fh); g.fill();
            rotulo(g, BANDERAS[k].l, top.x + fw * 0.38, top.y + fh * 0.5, Math.max(11, fh * 0.75), "#fff");
            const lab = etiqueta(g, st.h ? st.h.ops[k] : "", top.x, top.y - 18, clamp(c0.s * 1.6, 13, 19), k === st.sel && st.fase !== "pausa" ? "#ffd23f" : "#fff", BANDERAS[k].c);
            if (k === st.sel && st.fase === "apuntar" && !menosMov()) { g.strokeStyle = "#ffd23f"; g.lineWidth = 2; g.strokeRect(lab.x - 3, lab.y - 3, lab.w + 6, lab.h + 6); }
          }
        }
        // línea de apuntado
        if ((st.fase === "apuntar" || st.fase === "potencia") && st.banderas[st.sel]) {
          const b = st.banderas[st.sel], a = proj(st.bola.x, st.bola.z), z = proj(b.x, b.z);
          g.setLineDash([4, 10]); g.strokeStyle = "rgba(255,255,255,0.85)"; g.lineWidth = 3; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(z.x, z.y); g.stroke(); g.setLineDash([]);
        }
        // bola
        let bp;
        if (st.vuelo) {
          const v = st.vuelo; v.t += dt / 1.4; const tt = Math.min(1, v.t);
          const x = lerp(v.x0, v.x1, tt), z = lerp(v.z0, v.z1, tt), y = 4 * v.alto * tt * (1 - tt);
          const sombra = proj(x, z); g.fillStyle = "rgba(0,0,0,0.3)"; g.beginPath(); g.ellipse(sombra.x, sombra.y, Math.max(2, sombra.s * 0.5), Math.max(1, sombra.s * 0.2), 0, 0, 7); g.fill();
          bp = proj(x, z, y);
          if (v.t >= 1 && !v.hecho) { v.hecho = true; st.vuelo = null; aterriza(v); }
        } else bp = proj(st.bola.x, st.bola.z, 0.35);
        if (!(st.fase === "pausa" && !st.vuelo)) { g.fillStyle = "#fff"; g.strokeStyle = "#1b1b2f"; g.lineWidth = 1.5; g.beginPath(); g.arc(bp.x, bp.y, clamp(bp.s * 0.45, 2.5, 12), 0, 7); g.fill(); g.stroke(); }
        // golfista (de espaldas) junto a la bola
        if (st.fase === "apuntar" || st.fase === "potencia") {
          const q0 = proj(st.bola.x - 2.4, st.bola.z - 0.2), q = q0, s = q0.s * 0.42, sw = st.fase === "potencia" ? st.med.v : 0;
          const pr = PP.Store ? PP.Store.progreso() : { color: "#ff4f7b" };
          g.fillStyle = "#1b1b2f"; g.fillRect(q.x - s * 0.5, q.y - s * 2.4, s * 0.35, s * 2.4); g.fillRect(q.x + s * 0.15, q.y - s * 2.4, s * 0.35, s * 2.4);
          g.fillStyle = pr.color || "#ff4f7b"; rr(g, q.x - s * 0.75, q.y - s * 4.6, s * 1.5, s * 2.4, s * 0.4); g.fill();
          g.fillStyle = "#ffd23f"; g.beginPath(); g.arc(q.x, q.y - s * 5.2, s * 0.7, 0, 7); g.fill();
          g.save(); g.translate(q.x + s * 0.4, q.y - s * 3.8); g.rotate(-0.3 - sw * 2.2); g.strokeStyle = "#adb5bd"; g.lineWidth = Math.max(2, s * 0.15); g.beginPath(); g.moveTo(0, 0); g.lineTo(0, s * 3.6); g.stroke(); g.restore();
        }
        if (st.fase === "potencia") {
          const b = st.banderas[st.sel], dist = Math.hypot(b.x - st.bola.x, b.z - st.bola.z);
          dibujarMedidor(g, 60, H * 0.5, H * 0.32, st.med, clamp(dist / DMAX, 0, 1), clamp(tol / DMAX, 0.02, 0.5), "SWING");
        }
        P.particulas(g, dt);
        P.marc.textContent = "Golpes: " + st.golpes + " · Total: " + st.total;
      });
      setTimeout(siguiente, 300);
    });
  }

  // ============================================================== PLATAFORMAS (Saltarrimas)
  function plataformas(d, ctx) {
    return new Promise((res) => {
      const c = ciclo();
      const versos = U.muestra(d.items, c === 1 ? 3 : 4, "mj-plat:" + curso());
      const VH = 540, SUELO = 450, SEC = 1350, X0 = 360;
      const pr = PP.Store ? PP.Store.progreso() : { color: "#ff4f7b" };
      let P = null;
      const medir = (t) => { P.g.font = "900 20px 'Trebuchet MS', sans-serif"; return P.g.measureText(t).width; };
      const N = { solidos: [], bloques: [], muros: [], enemigos: [], monedas: [], fin: 0 };
      const st = { sec: 0, reg: {}, resueltas: 0, pj: { x: 120, y: SUELO - 52, w: 30, h: 50, vx: 0, vy: 0, suelo: false, coyote: 0, buffer: 0, dir: 1, inv: 0, paso: 0 }, cam: 0, puntos: 0, terminado: false, check: 120 };
      P = pantalla({ clase: "plataformas", titulo: "Saltarrimas", color: "#c48cff", musica: "literario",
        ayuda: "Muévete con ◀ ▶ y salta con ESPACIO o ↑. Golpea desde abajo el bloque con la palabra que rima. Salta encima de los borroncitos.",
        mandos: [{ id: "izq", html: "◀", aria: "Izquierda" }, { id: "der", html: "▶", aria: "Derecha" }, { id: "accion", html: "Saltar", clase: "grande", aria: "Saltar" }],
        alSalir: () => { P.cerrar(); res({ abandonada: true }); } });
      // ---- construcción del nivel
      versos.forEach((v, s) => {
        const x0 = X0 + s * SEC;
        const hueco = c > 1 && s > 0 ? 120 : 0;
        N.solidos.push({ x: x0 - (s === 0 ? X0 + 200 : 0), y: SUELO, w: (s === 0 ? X0 + 200 : 0) + 300, h: 200, tipo: "suelo" });
        N.solidos.push({ x: x0 + 300 + hueco, y: SUELO, w: SEC - 300 - hueco, h: 200, tipo: "suelo" });
        N.solidos.push({ x: x0 + 470, y: SUELO - 115, w: 150, h: 22, tipo: "tabla" });
        for (let k = 0; k < 4; k++) N.monedas.push({ x: x0 + 490 + k * 36, y: SUELO - 160, vivo: true });
        const orden = U.shuffle(v.o.map((o, k) => k));
        let bx = x0 + 700;
        orden.forEach((k) => { const w = Math.max(116, medir(v.o[k]) + 34); N.bloques.push({ sec: s, k, txt: v.o[k], x: bx, y: SUELO - 175, w, h: 46, estado: "activo", bump: 0 }); bx += w + 40; });
        N.muros.push({ sec: s, x: x0 + SEC - 60, y: SUELO - 420, w: 44, h: 420, abierto: false, alfa: 1 });
        const ne = c === 1 ? 1 : 2;
        for (let e = 0; e < ne; e++) { const ex = x0 + 120 + e * 190; N.enemigos.push({ x: ex, y: SUELO - 30, w: 34, h: 30, vx: (tranquilo() ? 35 : 60 + c * 10) * (e % 2 ? -1 : 1), min: x0 + 40, max: x0 + 290, vivo: true }); }
      });
      N.fin = X0 + versos.length * SEC + 140;
      N.solidos.push({ x: X0 + versos.length * SEC, y: SUELO, w: 600, h: 200, tipo: "suelo" });
      const solidos = () => N.solidos.concat(N.bloques, N.muros.filter((m) => !m.abierto));
      const choca = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
      function mostrarVerso() {
        const v = versos[st.sec]; if (!v) return;
        const ult = (v.v1.split(/\s+/).pop() || "").replace(/[^\p{L}]/gu, "");
        P.prog.textContent = "Rima " + (st.sec + 1) + " de " + versos.length;
        P.enun.innerHTML = '<p class="mj-verso">' + U.esc(v.v1) + "<br>" + U.esc(v.v2).replace("___", '<span class="hueco">___</span>') + '</p><p class="mj-sub">Golpea desde abajo el bloque que rima con <b>«' + U.esc(ult) + "»</b>.</p>";
        PP.Voz.decir(v.v1 + ". " + v.v2.replace("___", "…"));
        MJ.auto = () => { const b = N.bloques.find((x) => x.sec === st.sec && x.k === versos[st.sec].c); if (!b || b.estado !== "activo") return false; golpearBloque(b); return true; };
      }
      function golpearBloque(b) {
        if (b.estado !== "activo" || b.sec !== st.sec) { b.bump = 0.2; PP.Audio.sfx("choque"); return; }
        const v = versos[b.sec], ok = b.k === v.c, ult = (v.v1.split(/\s+/).pop() || "").replace(/[^\p{L}]/gu, "");
        b.bump = 0.25;
        if (!st.reg[b.sec]) { st.reg[b.sec] = true; registrar(ctx, ctx.crit || "8.2", "mjr-" + v.v1.slice(0, 40), ok, "plataformas-rima", "rima", b.txt, v.o[v.c], "Para «" + v.v1 + " / " + v.v2 + "» eligió «" + b.txt + "»"); }
        if (ok) {
          b.estado = "bien"; PP.Audio.sfx("desbloqueo"); P.chispas((b.x + b.w / 2 - st.cam) * P.H / VH, (b.y - 10) * P.H / VH, ["#ffd23f", "#c48cff", "#fff"], 30); st.puntos += 50; PP.juego.sumar(15);
          N.bloques.filter((x) => x.sec === b.sec && x !== b).forEach((x) => { x.estado = "inerte"; });
          const m = N.muros.find((x) => x.sec === b.sec); if (m) m.abierto = true;
          P.enun.innerHTML = '<p class="mj-verso">' + U.esc(v.v1) + "<br>" + U.esc(v.v2).replace("___", "<b class=\"mj-rima\">" + U.esc(b.txt) + "</b>") + "</p>";
          P.fb("¡Rima encontrada! " + U.esc(v.fb) + " El muro de tinta se ha disuelto: ¡adelante!", "bien");
          st.resueltas++; st.sec++; st.check = X0 + (st.sec) * SEC - 220; MJ.auto = null;
          setTimeout(() => { if (!st.terminado && st.sec < versos.length) mostrarVerso(); else if (st.sec >= versos.length) { P.prog.textContent = "¡Corre hasta la meta!"; MJ.auto = () => { st.pj.x = N.fin; return true; }; } }, 2400);
        } else {
          b.estado = "mal"; PP.Audio.sfx("mal");
          P.fb("«" + U.esc(b.txt) + "» no rima con «" + U.esc(ult) + "». Escucha el final de las dos palabras: tienen que sonar igual desde la última vocal fuerte.", "mal");
        }
      }
      function terminar() {
        if (st.terminado) return; st.terminado = true; MJ.auto = null; P.enun.innerHTML = "";
        P.final("Saltarrimas", "Has encontrado <b>" + st.resueltas + "</b> rimas y conseguido <b>" + st.puntos + "</b> puntos de tinta.<br>Las palabras riman cuando suenan igual desde la última vocal acentuada: volc<b>án</b> / v<b>an</b>.", () => { P.cerrar(); res({ hecho: true }); });
      }
      P.bucle((dt) => {
        const g = P.g, W = P.W, H = P.H, esc = H / VH, VW = W / esc, pj = st.pj;
        if (!st.terminado) {
          // controles
          const dirX = (P.held.der ? 1 : 0) - (P.held.izq ? 1 : 0);
          const VMAX = c === 1 ? 210 : 240;
          if (dirX) { pj.vx += dirX * 1700 * dt; pj.dir = dirX; } else pj.vx -= Math.sign(pj.vx) * Math.min(Math.abs(pj.vx), 1500 * dt);
          pj.vx = clamp(pj.vx, -VMAX, VMAX);
          if (P.tomar("accion") || P.tomar("arriba")) pj.buffer = 0.14;
          pj.buffer -= dt; pj.coyote -= dt;
          if (pj.buffer > 0 && (pj.suelo || pj.coyote > 0)) { pj.vy = -690; pj.suelo = false; pj.coyote = 0; pj.buffer = 0; PP.Audio.sfx("salto"); }
          if (!P.held.accion && !P.held.arriba && pj.vy < -260) pj.vy = -260;
          pj.vy = Math.min(900, pj.vy + 1850 * dt);
          // eje X
          pj.x += pj.vx * dt;
          for (const s of solidos()) if (choca(pj, s)) { if (pj.vx > 0) pj.x = s.x - pj.w; else if (pj.vx < 0) pj.x = s.x + s.w; pj.vx = 0; }
          pj.x = Math.max(0, pj.x);
          // eje Y
          pj.y += pj.vy * dt; const antes = pj.suelo; pj.suelo = false;
          for (const s of solidos()) if (choca(pj, s)) {
            if (pj.vy > 0) { pj.y = s.y - pj.h; pj.vy = 0; pj.suelo = true; }
            else if (pj.vy < 0) { pj.y = s.y + s.h; pj.vy = 40; if (N.bloques.includes(s)) golpearBloque(s); }
          }
          if (antes && !pj.suelo) pj.coyote = 0.1;
          if (pj.y > VH + 120) { pj.x = st.check; pj.y = SUELO - 60; pj.vx = pj.vy = 0; P.fb("¡Uy! Te has caído. Vuelves al último punto seguro.", "info"); PP.Audio.sfx("frenazo"); }
          if (Math.abs(pj.vx) > 10 && pj.suelo) pj.paso += dt * Math.abs(pj.vx) / 20;
          pj.inv -= dt;
          // enemigos
          for (const e of N.enemigos) {
            if (!e.vivo) continue;
            e.x += e.vx * dt; if (e.x < e.min || e.x + e.w > e.max) e.vx *= -1;
            if (choca(pj, e)) {
              if (pj.vy > 50 && pj.y + pj.h - e.y < 22) { e.vivo = false; pj.vy = -430; st.puntos += 20; PP.Audio.sfx("bien"); P.chispas((e.x + e.w / 2 - st.cam) * esc, e.y * esc, ["#4b2a7b", "#c48cff"], 20); }
              else if (pj.inv <= 0) { pj.inv = 1.1; pj.vx = (pj.x < e.x ? -1 : 1) * 320; pj.vy = -300; PP.Audio.sfx("choque"); }
            }
          }
          for (const m of N.monedas) if (m.vivo && choca(pj, { x: m.x - 12, y: m.y - 12, w: 24, h: 24 })) { m.vivo = false; st.puntos += 5; PP.Audio.sfx("recoger"); }
          N.bloques.forEach((b) => { b.bump = Math.max(0, b.bump - dt); });
          N.muros.forEach((m) => { if (m.abierto) m.alfa = Math.max(0, m.alfa - dt * 1.5); });
          if (pj.x >= N.fin) terminar();
          st.cam = clamp(pj.x - VW * 0.38, 0, N.fin + 400 - VW);
        }
        // ---- dibujo
        const cam = st.cam;
        const cielo = g.createLinearGradient(0, 0, 0, H); cielo.addColorStop(0, "#74c0fc"); cielo.addColorStop(1, "#e7f5ff"); g.fillStyle = cielo; g.fillRect(0, 0, W, H);
        g.save(); g.scale(esc, esc);
        // fondo con paralaje: volcán, laurisilva y helechos
        g.fillStyle = "#9775fa"; g.globalAlpha = 0.35; g.beginPath(); const vx = 600 - (cam * 0.1) % 1600; g.moveTo(vx - 420, SUELO); g.lineTo(vx - 50, 140); g.lineTo(vx + 50, 140); g.lineTo(vx + 420, SUELO); g.fill(); g.globalAlpha = 1;
        for (let k = -1; k < VW / 160 + 2; k++) { const x = k * 160 - (cam * 0.4) % 160; g.fillStyle = "#2b8a3e"; g.beginPath(); g.arc(x, SUELO - 120, 70, 0, 7); g.arc(x + 60, SUELO - 160, 60, 0, 7); g.fill(); g.fillStyle = "#5c3d2e"; g.fillRect(x + 20, SUELO - 110, 16, 110); }
        g.translate(-cam, 0);
        for (const s of N.solidos) {
          if (s.x > cam + VW + 50 || s.x + s.w < cam - 50) continue;
          if (s.tipo === "suelo") { g.fillStyle = "#7c4a2d"; g.fillRect(s.x, s.y, s.w, s.h); g.fillStyle = "#51cf66"; g.fillRect(s.x, s.y, s.w, 14); g.fillStyle = "#37b24d"; for (let x = s.x; x < s.x + s.w; x += 24) g.fillRect(x, s.y + 12, 12, 6); }
          else { g.fillStyle = "#c08457"; rr(g, s.x, s.y, s.w, s.h, 6); g.fill(); g.strokeStyle = "#5c3d2e"; g.lineWidth = 3; g.stroke(); }
        }
        for (const m of N.monedas) if (m.vivo) { const e = menosMov() ? 1 : Math.abs(Math.cos(P.t * 3 + m.x)); g.fillStyle = "#ffd43b"; g.strokeStyle = "#e67700"; g.lineWidth = 2; g.beginPath(); g.ellipse(m.x, m.y, 11 * e + 1, 11, 0, 0, 7); g.fill(); g.stroke(); if (e > 0.5) { g.fillStyle = "#e67700"; g.font = "900 13px sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("Ñ", m.x, m.y + 1); } }
        for (const b of N.bloques) {
          const dy = -Math.sin(Math.min(1, b.bump / 0.25) * Math.PI) * 10;
          const col = b.estado === "bien" ? "#8ce99a" : b.estado === "mal" ? "#adb5bd" : b.estado === "inerte" ? "#dee2e6" : b.sec === st.sec ? "#ffd43b" : "#ffe8a3";
          g.fillStyle = col; rr(g, b.x, b.y + dy, b.w, b.h, 8); g.fill(); g.strokeStyle = "#1b1b2f"; g.lineWidth = 3; g.stroke();
          g.fillStyle = "#1b1b2f"; g.font = "900 20px 'Trebuchet MS', sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(b.txt, b.x + b.w / 2, b.y + dy + b.h / 2 + 1);
          if (b.estado === "mal") { g.strokeStyle = "#c92a2a"; g.lineWidth = 4; g.beginPath(); g.moveTo(b.x + 10, b.y + dy + 8); g.lineTo(b.x + b.w - 10, b.y + dy + b.h - 8); g.stroke(); }
        }
        for (const m of N.muros) {
          if (m.alfa <= 0) continue; g.globalAlpha = m.alfa;
          g.fillStyle = "#4b2a7b"; g.fillRect(m.x, m.y, m.w, m.h);
          g.fillStyle = "#6741d9"; for (let k = 0; k < 6; k++) { const yy = (m.y + ((P.t * 80 + k * 70) % m.h)); g.fillRect(m.x + 6 + (k % 3) * 12, yy, 6, 26); }
          rotulo(g, "?", m.x + m.w / 2, SUELO - 210, 34, "#ffd43b"); g.globalAlpha = 1;
        }
        // meta: Casa de la Poeta
        g.fillStyle = "#e5dbff"; g.fillRect(N.fin, SUELO - 150, 150, 150); g.fillStyle = "#7048e8"; g.beginPath(); g.moveTo(N.fin - 15, SUELO - 150); g.lineTo(N.fin + 75, SUELO - 220); g.lineTo(N.fin + 165, SUELO - 150); g.fill();
        g.fillStyle = "#5c3d2e"; g.fillRect(N.fin + 55, SUELO - 80, 40, 80); rotulo(g, "META", N.fin + 75, SUELO - 120, 20, "#fff");
        for (const e of N.enemigos) if (e.vivo) borron(g, e.x + e.w / 2, e.y + e.h / 2 + 2, 17, {});
        // jugador (reportero/a)
        if (!(pj.inv > 0 && Math.floor(P.t * 12) % 2)) {
          g.save(); g.translate(pj.x + pj.w / 2, pj.y); g.scale(pj.dir, 1);
          const pierna = pj.suelo ? Math.sin(pj.paso) * 8 : 6;
          g.fillStyle = "#1b1b2f"; g.fillRect(-10 + pierna * 0.4, 34, 8, 16); g.fillRect(3 - pierna * 0.4, 34, 8, 16);
          g.fillStyle = pr.color || "#ff4f7b"; rr(g, -14, 14, 28, 24, 6); g.fill(); g.strokeStyle = "#1b1b2f"; g.lineWidth = 2; g.stroke();
          g.fillStyle = "#f3c9a5"; g.beginPath(); g.arc(0, 6, 11, 0, 7); g.fill(); g.stroke();
          g.fillStyle = "#ffd23f"; g.beginPath(); g.arc(0, 2, 12, Math.PI, 0); g.fill(); g.fillRect(0, -1, 16, 4);
          g.fillStyle = "#1b1b2f"; g.fillRect(4, 4, 3, 3);
          g.restore();
        }
        g.restore();
        P.particulas(g, dt);
        P.marc.textContent = "Tinta: " + st.puntos;
      });
      setTimeout(mostrarVerso, 300);
    });
  }

  PP.Minijuegos = { golf, penaltis, canastas, plataformas };
  PP.MJ = MJ;
})();
