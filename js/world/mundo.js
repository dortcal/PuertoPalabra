/* Puerto Palabra · Mundo abierto: cámara, vehículo, tráfico, peatones, objetivos y efectos. */
window.PP = window.PP || {};
(function () {
  "use strict";
  const U = PP.U, C = PP.Ciudad, T = C.T;
  const M = {
    activo: false, cv: null, g: null, mini: null, mg: null, ancho: 0, alto: 0, dpr: 1, escala: 1,
    cam: { x: 0, y: 0, sacudida: 0 }, tiempo: 0, hora: 0.03,
    jugador: null, coches: [], peatones: [], particulas: [], marcas: [],
    marcadores: [], destinos: [], fichas: [], doradas: [], borron: null,
    ruta: null, rutaObjetivo: null, autopiloto: false, restauracion: { puerto: 0, onda: 0, literario: 0, taller: 0 },
    cb: {}, avisoCerca: null, modoAtraccion: false
  };

  // ---------------- Dibujo de vehículos y personajes ----------------
  const D = {};
  D.redondeado = function (g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };
  D.vehiculo = function (g, tipo, color, x, y, ang, esc, extra) {
    g.save(); g.translate(x, y); g.rotate(ang); g.scale(esc || 1, esc || 1);
    g.fillStyle = "rgba(0,0,0,0.3)"; g.beginPath(); g.ellipse(4, 5, tipo === "guagua" ? 50 : tipo === "buggy" ? 26 : 22, tipo === "guagua" ? 18 : 15, 0, 0, 7); g.fill();
    if (tipo === "moto" || tipo === "scooter") {
      g.fillStyle = "#1b1b1f"; g.fillRect(-20, -4, 10, 8); g.fillRect(12, -3.5, 10, 7);
      g.fillStyle = color; D.redondeado(g, -16, -7, 30, 14, 6); g.fill();
      g.fillStyle = "rgba(255,255,255,0.35)"; D.redondeado(g, -12, -5, 14, 4, 2); g.fill();
      g.strokeStyle = "#ddd"; g.lineWidth = 2.5; g.beginPath(); g.moveTo(12, -10); g.lineTo(12, 10); g.stroke();
      // reportero/a con casco
      g.fillStyle = extra && extra.ropa || "#2b2d42"; g.beginPath(); g.ellipse(-2, 0, 8, 10, 0, 0, 7); g.fill();
      g.fillStyle = extra && extra.casco || "#ffd23f"; g.beginPath(); g.arc(2, 0, 7, 0, 7); g.fill();
      g.fillStyle = "#1d3557"; g.fillRect(5, -4, 3, 8);
      if (tipo === "scooter") { g.fillStyle = "#fff"; g.fillRect(-18, -9, 8, 18); }
    } else if (tipo === "buggy") {
      g.fillStyle = "#1b1b1f"; [[-16, -14], [-16, 10], [12, -14], [12, 10]].forEach(([a, b]) => g.fillRect(a, b, 10, 5));
      g.fillStyle = color; D.redondeado(g, -20, -11, 42, 22, 7); g.fill();
      g.fillStyle = "#333"; g.fillRect(-6, -9, 16, 18);
      g.fillStyle = extra && extra.casco || "#ffd23f"; g.beginPath(); g.arc(0, 0, 6.5, 0, 7); g.fill();
      g.strokeStyle = "#ddd"; g.lineWidth = 2; g.strokeRect(-12, -11, 28, 22);
    } else if (tipo === "guagua") {
      g.fillStyle = color; D.redondeado(g, -46, -15, 92, 30, 5); g.fill();
      g.fillStyle = "#cde8ff"; g.fillRect(36, -12, 7, 24);
      g.fillStyle = "rgba(255,255,255,0.7)"; for (let k = -38; k < 30; k += 12) g.fillRect(k, -13, 8, 4), g.fillRect(k, 9, 8, 4);
      g.fillStyle = "rgba(0,0,0,0.2)"; g.fillRect(-46, -2, 92, 4);
      g.fillStyle = "#fff"; g.font = "bold 10px sans-serif"; g.textAlign = "center"; g.fillText("GUAGUA", -6, 4);
    } else { // coche de tráfico
      const largo = extra && extra.largo || 1;
      g.fillStyle = "#151515"; [[-15 * largo, -12], [-15 * largo, 8], [10 * largo, -12], [10 * largo, 8]].forEach(([a, b]) => g.fillRect(a, b, 8, 4));
      g.fillStyle = color; D.redondeado(g, -20 * largo, -10, 40 * largo, 20, 6); g.fill();
      g.fillStyle = "rgba(160,210,255,0.85)"; D.redondeado(g, 3 * largo, -8, 9, 16, 3); g.fill(); D.redondeado(g, -15 * largo, -7, 6, 14, 2); g.fill();
      g.fillStyle = "rgba(255,255,255,0.18)"; D.redondeado(g, -8 * largo, -7, 12, 14, 3); g.fill();
      if (extra && extra.taxi) { g.fillStyle = "#3a9d5d"; g.fillRect(-4, -4, 8, 8); }
      if (extra && extra.borron) {
        g.fillStyle = "#14101f"; g.beginPath(); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2, r = k % 2 ? 6 : 10; g.lineTo(-4 + Math.cos(a) * r, Math.sin(a) * r); } g.fill();
        g.fillStyle = "#b388ff"; g.font = "bold 7px sans-serif"; g.textAlign = "center"; g.fillText("B", -4, 3);
      }
      g.fillStyle = "#fff6c0"; g.fillRect(19 * largo, -8, 2, 4); g.fillRect(19 * largo, 4, 2, 4);
    }
    g.restore();
  };
  D.peaton = function (g, p, t) {
    const bob = Math.sin(t * 9 + p.fase) * (p.mov ? 2 : 0);
    g.save(); g.translate(p.x, p.y); g.rotate(p.ang);
    g.fillStyle = "rgba(0,0,0,0.25)"; g.beginPath(); g.ellipse(2, 3, 8, 6, 0, 0, 7); g.fill();
    g.fillStyle = "#333"; g.fillRect(-3 + bob, -5, 4, 3); g.fillRect(-3 - bob, 2, 4, 3);
    g.fillStyle = p.ropa; g.beginPath(); g.ellipse(0, 0, 5, 8, 0, 0, 7); g.fill();
    g.fillStyle = p.piel; g.beginPath(); g.arc(1, 0, 4.5, 0, 7); g.fill();
    g.fillStyle = p.pelo; g.beginPath(); g.arc(0, 0, 4.6, Math.PI * 0.5, Math.PI * 1.5); g.fill();
    g.restore();
  };
  PP.Dibujo = D;

  // ---------------- Inicialización ----------------
  M.init = function (cv, mini) {
    M.cv = cv; M.g = cv.getContext("2d"); M.mini = mini; M.mg = mini.getContext("2d");
    window.addEventListener("resize", M.ajustar); M.ajustar();
    const salida = C.lugares.colegio;
    M.jugador = { x: salida.x, y: salida.y, ang: -Math.PI / 2, v: 0, vmax: 300, giro: 0, turbo: 0, choqueT: 0 };
    crearTrafico(); crearPeatones(); crearDoradas();
    // Pre-dibuja la ciudad poco a poco en los ratos libres para evitar tirones al explorar
    const pend = []; for (let cy = 0; cy < Math.ceil(C.H / 12); cy++) for (let cx = 0; cx < Math.ceil(C.W / 12); cx++) pend.push([cx, cy]);
    const ocioso = window.requestIdleCallback || ((f) => setTimeout(() => f({ timeRemaining: () => 8 }), 60));
    const paso = (d) => { while (pend.length && d.timeRemaining() > 4) { const [a, b] = pend.shift(); C.chunk(a, b); } if (pend.length) ocioso(paso); };
    ocioso(paso);
    requestAnimationFrame(bucle);
  };
  M.ajustar = function () {
    const r = M.cv.getBoundingClientRect();
    M.dpr = Math.min(2, window.devicePixelRatio || 1);
    M.ancho = Math.max(320, r.width); M.alto = Math.max(240, r.height);
    M.cv.width = Math.round(M.ancho * M.dpr); M.cv.height = Math.round(M.alto * M.dpr);
    M.escala = U.clamp(Math.min(M.ancho / 980, M.alto / 640), 0.55, 1.2);
    if (M.mini && M.mini.clientWidth) { M.mini.width = Math.round(M.mini.clientWidth * M.dpr); M.mini.height = Math.round(M.mini.clientHeight * M.dpr); }
  };

  const ROPA = ["#e63946", "#457b9d", "#2a9d8f", "#f4a261", "#8338ec", "#ffbe0b", "#3a86ff", "#fb5607", "#06d6a0", "#ef476f"];
  const PIEL = ["#f1c27d", "#e0ac69", "#c68642", "#8d5524", "#ffdbac", "#a1665e"];
  const PELO = ["#2b1d14", "#4a3020", "#d9b26f", "#1c1c1c", "#8a4b2a", "#b0b0b0"];

  function carriles() {
    // devuelve celdas de calle útiles para colocar coches con su dirección según el carril
    const out = [];
    C.YS.forEach((Y) => { for (let x = 2; x < C.W - 2; x++) { if (C.XS.some((X) => x === X || x === X + 1)) continue; if (C.at(x, Y) === 1) out.push({ tx: x, ty: Y, dir: [-1, 0] }); if (C.at(x, Y + 1) === 1) out.push({ tx: x, ty: Y + 1, dir: [1, 0] }); } });
    C.XS.forEach((X) => { for (let y = 2; y < 42; y++) { if (C.YS.some((Y) => y === Y || y === Y + 1)) continue; if (C.at(X, y) === 1) out.push({ tx: X, ty: y, dir: [0, 1] }); if (C.at(X + 1, y) === 1) out.push({ tx: X + 1, ty: y, dir: [0, -1] }); } });
    return out;
  }
  function crearTrafico() {
    const cs = U.shuffle(carriles()), colores = ["#e63946", "#f1faee", "#457b9d", "#2a2a2a", "#ffb703", "#8ecae6", "#6a994e", "#bc4749"];
    for (let k = 0; k < 24 && k < cs.length; k++) {
      const c = cs[k], tipo = k % 7 === 0 ? "guagua" : "coche";
      M.coches.push({ x: c.tx * T + T / 2, y: c.ty * T + T / 2, dx: c.dir[0], dy: c.dir[1], v: U.rand(85, 135), tipo,
        color: tipo === "guagua" ? (k % 2 ? "#f2c14e" : "#3fa34d") : (k % 5 === 0 ? "#ffffff" : colores[k % colores.length]), taxi: tipo === "coche" && k % 5 === 0, ultimaInter: null, espera: 0 });
    }
  }
  function crearPeatones() {
    const libres = [];
    for (let y = 0; y < C.H; y++) for (let x = 0; x < C.W; x++) if (C.peatonal(C.at(x, y))) libres.push([x, y]);
    for (let k = 0; k < 46; k++) {
      const [x, y] = U.pick(libres);
      M.peatones.push({ x: x * T + T / 2, y: y * T + T / 2, tx: x, ty: y, ang: 0, ropa: U.pick(ROPA), piel: U.pick(PIEL), pelo: U.pick(PELO), fase: Math.random() * 6, mov: true, objetivo: null });
    }
  }
  function crearDoradas() {
    const rnd = U.seeded(777), calles = [];
    for (let y = 0; y < C.H; y++) for (let x = 0; x < C.W; x++) if (C.at(x, y) === 1 || C.at(x, y) === 7 || C.at(x, y) === 5) calles.push([x, y]);
    M._posDoradas = [];
    const usados = [];
    for (let k = 0; k < PP.PALABRAS_DORADAS.length; k++) {
      let p, n = 0;
      do { p = calles[Math.floor(rnd() * calles.length)]; n++; } while (n < 50 && usados.some((q) => Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]) < 9));
      usados.push(p); M._posDoradas.push({ x: p[0] * T + T / 2, y: p[1] * T + T / 2, i: k });
    }
  }
  M.prepararDoradas = function (recogidas) { M.doradas = M._posDoradas.filter((d) => !recogidas.includes(d.i)); };

  // ---------------- API para misiones ----------------
  M.colocarJugador = function (lugar) { const l = C.lugares[lugar]; if (!l) return; M.jugador.x = l.x; M.jugador.y = l.y; M.jugador.v = 0; M.cam.x = l.x; M.cam.y = l.y; M.orientarLibre(); };
  /** Gira la moto hacia el tramo de calle más despejado, para no arrancar mirando a una pared */
  M.orientarLibre = function () {
    const j = M.jugador; let mejor = j.ang, mejorD = -1;
    for (let k = 0; k < 16; k++) {
      const a = -Math.PI / 2 + k * Math.PI / 8; let d = 0;
      while (d < 480 && !solido(j.x + Math.cos(a) * (d + 14), j.y + Math.sin(a) * (d + 14))) d += 8;
      if (d > mejorD + 1) { mejorD = d; mejor = a; }
    }
    j.ang = mejor;
  };
  M.fijarMarcadores = function (lista) { M.marcadores = lista; };
  M.fijarDestinos = function (lista, alLlegar) { M.destinos = lista; M.cb.destino = alLlegar; };
  M.limpiarObjetivos = function () { M.destinos = []; M.fichas = []; M.borron = null; M.cb.destino = M.cb.ficha = M.cb.foto = null; M.gps(null); };

  M.soltarFichas = function (barrio, items, alRecoger) {
    const calles = U.shuffle(C.callesDeBarrio(barrio)), j = M.jugador, usados = [];
    M.fichas = [];
    for (const it of items) {
      let pos = null;
      for (const c of calles) {
        const x = c[0] * T + T / 2, y = c[1] * T + T / 2;
        if (U.dist(x, y, j.x, j.y) < 260) continue;
        if (usados.some((u) => U.dist(u[0], u[1], x, y) < 230)) continue;
        if (U.dist(x, y, j.x, j.y) > 1900) continue;
        pos = [x, y]; break;
      }
      if (!pos) { const c = U.pick(calles); pos = [c[0] * T + T / 2, c[1] * T + T / 2]; }
      usados.push(pos);
      M.fichas.push(Object.assign({ x: pos[0], y: pos[1], fase: Math.random() * 6, vivo: true }, it));
    }
    M.cb.ficha = alRecoger;
  };

  M.iniciarPersecucion = function (alFoto, alFin) {
    const j = M.jugador; let best = null;
    const cs = carriles();
    for (const c of U.shuffle(cs)) { const x = c.tx * T + T / 2, y = c.ty * T + T / 2, d = U.dist(x, y, j.x, j.y); if (d > 380 && d < 700) { best = c; break; } }
    best = best || cs[0];
    M.borron = { x: best.tx * T + T / 2, y: best.ty * T + T / 2, dx: best.dir[0], dy: best.dir[1], v: 200, fotos: 0, huida: 0, ultimaInter: null, cooldown: 0 };
    M.cb.foto = alFoto; M.cb.finPersecucion = alFin;
    PP.Audio.musica("persecucion");
  };

  M.gps = function (destino) {
    M.rutaObjetivo = destino; M.ruta = null; M._rutaT = 0;
    if (!destino) M.autopiloto = false;
  };

  // ---------------- Bucle ----------------
  let ultimo = 0;
  function bucle(t) {
    requestAnimationFrame(bucle);
    const dt = Math.min(0.05, (t - (ultimo || t)) / 1000); ultimo = t;
    if (!M.activo && !M.modoAtraccion) return;
    M.tiempo += dt;
    actualizar(dt);
    dibujar();
  }

  function solido(x, y) { const t = C.at(Math.floor(x / T), Math.floor(y / T)); return !C.conducible(t); }
  function colisiona(x, y, r) {
    for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; if (solido(x + Math.cos(a) * r, y + Math.sin(a) * r)) return true; }
    return solido(x, y);
  }

  function actualizar(dt) {
    const j = M.jugador, I = PP.Input, aj = PP.ajustes;
    M.hora = (M.hora + dt / 360) % 1; // un día completo cada 6 minutos
    if (M.modoAtraccion) {
      const t = M.tiempo * 0.04; M.cam.x = 37 * T + Math.cos(t) * 900; M.cam.y = 26 * T + Math.sin(t * 1.3) * 500;
      actualizarTrafico(dt); actualizarPeatones(dt); return;
    }
    // ----- control del vehículo -----
    const enTierra = C.at(Math.floor(j.x / T), Math.floor(j.y / T)) === 5;
    const vmax = (j.turbo > 0 ? j.vmax * 1.35 : j.vmax) * (enTierra ? 0.6 : 1);
    let acel = 0, giro = 0;
    const controla = !PP.juego || PP.juego.modo === "mundo";
    let dir = controla ? I.direccion() : { x: 0, y: 0 };
    if (M.autopiloto && M.ruta && M.ruta.length) {
      const wp = M.ruta[0]; const dx = wp.x - j.x, dy = wp.y - j.y; const d = Math.hypot(dx, dy) || 1;
      dir = { x: dx / d, y: dy / d };
      if (Math.hypot(dir.x, dir.y) > 0 && (I.teclas.arriba || I.teclas.abajo || I.teclas.izq || I.teclas.der || I.joy.activo)) { M.autopiloto = false; }
    }
    const usaDireccional = aj.control === "sencillo" || M.autopiloto;
    if (usaDireccional) {
      const mag = Math.min(1, Math.hypot(dir.x, dir.y));
      if (mag > 0.15) {
        const objetivo = Math.atan2(dir.y, dir.x), dif = U.angDiff(j.ang, objetivo);
        giro = U.clamp(dif * 4, -1, 1);
        // primero gira (también parado) y después acelera: más fácil para el alumnado pequeño
        acel = Math.abs(dif) > 0.9 ? (j.v > 120 ? -0.5 : 0.2 * mag) : mag * (M.autopiloto ? 0.75 : 1);
      }
    } else if (controla) {
      // Control clásico: arriba acelera, abajo frena y luego marcha atrás, izquierda/derecha giran
      let av = (I.teclas.arriba ? 1 : 0) - (I.teclas.abajo ? 1 : 0), gx = (I.teclas.der ? 1 : 0) - (I.teclas.izq ? 1 : 0);
      if (I.joy.activo) { av = Math.abs(I.joy.y) > 0.15 ? -I.joy.y : 0; gx = Math.abs(I.joy.x) > 0.15 ? I.joy.x : 0; }
      acel = av; giro = gx;
    }
    if (acel > 0) j.v += acel * 420 * dt; else if (acel < 0) j.v += acel * 600 * dt; else j.v *= Math.pow(0.25, dt);
    j.v = U.clamp(j.v, -170, vmax);
    const factorGiro = usaDireccional ? Math.max(0.8, U.clamp(Math.abs(j.v) / 120, 0, 1)) : U.clamp(Math.abs(j.v) / 120, 0.45, 1);
    j.ang += giro * 3.1 * dt * factorGiro;
    if (Math.abs(giro) > 0.7 && Math.abs(j.v) > 230 && !U.prefiereMenosMovimiento()) M.marcas.push({ x: j.x - Math.cos(j.ang) * 14, y: j.y - Math.sin(j.ang) * 14, a: 1 });
    if (M.marcas.length > 220) M.marcas.shift();
    j.turbo = Math.max(0, j.turbo - dt);
    const R = 13;
    // separa suavemente la moto de bordillos y paredes para que pueda deslizarse por la calle
    for (const [ex, ey] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) if (solido(j.x + ex * R, j.y + ey * R)) { j.x -= ex * 2; j.y -= ey * 2; }
    const ix = Math.cos(j.ang) * j.v * dt, iy = Math.sin(j.ang) * j.v * dt;
    let mx = 0, my = 0;
    if (!colisiona(j.x + ix, j.y, R)) { j.x += ix; mx = ix; }
    if (!colisiona(j.x, j.y + iy, R)) { j.y += iy; my = iy; }
    const intento = Math.hypot(ix, iy), movido = Math.hypot(mx, my);
    if (intento > 0.5 && movido < intento * 0.5) { if (Math.abs(j.v) > 150 && j.choqueT <= 0) { PP.Audio.sfx("choque"); M.cam.sacudida = 6; j.choqueT = 0.5; humo(j.x, j.y, 6, "#bbb"); } j.v *= 0.55; }
    j.choqueT -= dt;
    if (I.tomar("pito")) PP.Audio.sfx("pito");
    if (I.tomar("turbo") && j.turbo <= 0) { j.turbo = 1.2; PP.Audio.sfx("turbo"); }
    // humo del tubo de escape
    if (Math.abs(j.v) > 60 && Math.random() < 0.3 && !U.prefiereMenosMovimiento()) humo(j.x - Math.cos(j.ang) * 20, j.y - Math.sin(j.ang) * 20, 1, "rgba(220,220,220,0.6)");
    PP.Audio.motor(Math.abs(j.v) / 400, true);

    // ----- cámara -----
    const ade = 0.35;
    const objX = j.x + Math.cos(j.ang) * j.v * ade, objY = j.y + Math.sin(j.ang) * j.v * ade;
    const s = 1 - Math.pow(0.02, dt);
    M.cam.x += (objX - M.cam.x) * s; M.cam.y += (objY - M.cam.y) * s;
    M.cam.sacudida *= Math.pow(0.02, dt);

    actualizarTrafico(dt); actualizarPeatones(dt); if (controla) actualizarObjetivos(dt); actualizarParticulas(dt); actualizarRuta(dt);
  }

  function enCruce(tx, ty) { return C.XS.some((X) => tx === X || tx === X + 1) && C.YS.some((Y) => ty === Y || ty === Y + 1); }
  function carrilPara(dx, dy, tx, ty) {
    const X = C.XS.find((q) => tx === q || tx === q + 1), Y = C.YS.find((q) => ty === q || ty === q + 1);
    if (dx === 1) return { eje: "y", v: Y + 1 }; if (dx === -1) return { eje: "y", v: Y };
    if (dy === 1) return { eje: "x", v: X }; return { eje: "x", v: X + 1 };
  }
  function moverPorCarriles(c, dt, elegirDir) {
    const tx = Math.floor(c.x / T), ty = Math.floor(c.y / T);
    const cxT = tx * T + T / 2, cyT = ty * T + T / 2;
    const paso = c.v * dt;
    const alCentro = (c.dx !== 0 ? (cxT - c.x) * c.dx : (cyT - c.y) * c.dy);
    if (alCentro >= 0 && alCentro < paso) {
      // estamos pasando por el centro de una tesela
      if (enCruce(tx, ty)) {
        const idC = C.XS.find((q) => tx === q || tx === q + 1) + "," + C.YS.find((q) => ty === q || ty === q + 1);
        if (c.ultimaInter !== idC) {
          c.ultimaInter = idC;
          const opciones = [[c.dx, c.dy], [-c.dy, c.dx], [c.dy, -c.dx]].filter(([dx, dy]) => {
            const l = carrilPara(dx, dy, tx, ty);
            const px = l.eje === "x" ? l.v : tx + dx * 2, py = l.eje === "y" ? l.v : ty + dy * 2;
            return C.at(px + dx, py + dy) === 1 || C.at(px + dx * 2, py + dy * 2) === 1;
          });
          c.plan = elegirDir ? elegirDir(c, opciones) : U.pick(opciones.length ? opciones : [[c.dx, c.dy]]);
        }
        if (c.plan && (c.plan[0] !== c.dx || c.plan[1] !== c.dy)) {
          const l = carrilPara(c.plan[0], c.plan[1], tx, ty);
          if ((l.eje === "x" && tx === l.v) || (l.eje === "y" && ty === l.v)) { c.x = cxT; c.y = cyT; c.dx = c.plan[0]; c.dy = c.plan[1]; c.plan = null; return; }
        }
      } else {
        // fin de calle: media vuelta al carril contrario
        if (C.at(tx + c.dx, ty + c.dy) !== 1) {
          const ndx = -c.dx, ndy = -c.dy;
          let ox = 0, oy = 0;
          if (c.dx === 1) oy = -1; else if (c.dx === -1) oy = 1; else if (c.dy === 1) ox = 1; else ox = -1;
          if (C.at(tx + ox, ty + oy) === 1) { c.x = (tx + ox) * T + T / 2; c.y = (ty + oy) * T + T / 2; }
          c.dx = ndx; c.dy = ndy; return;
        }
      }
    }
    c.x += c.dx * paso; c.y += c.dy * paso;
    if (c.dx !== 0) c.y += (cyT - c.y) * Math.min(1, dt * 8); else c.x += (cxT - c.x) * Math.min(1, dt * 8);
  }

  function actualizarTrafico(dt) {
    const j = M.jugador;
    for (const c of M.coches) {
      let frenar = false;
      const ax = c.x + c.dx * 46, ay = c.y + c.dy * 46;
      if (!M.modoAtraccion && U.dist(ax, ay, j.x, j.y) < 40) frenar = true;
      for (const o of M.coches) { if (o !== c && U.dist(ax, ay, o.x, o.y) < 34) { frenar = true; break; } }
      for (const p of M.peatones) { if (U.dist(ax, ay, p.x, p.y) < 18) { frenar = true; break; } }
      const vObj = frenar ? 0 : (c.tipo === "guagua" ? 95 : 125);
      c.vAct = U.lerp(c.vAct || 0, vObj, Math.min(1, dt * (frenar ? 8 : 1.5)));
      const vReal = c.v; c.v = c.vAct; if (c.v > 1) moverPorCarriles(c, dt); c.v = vReal;
      const lim = c.tipo === "guagua" ? 40 : 30, dj = U.dist(c.x, c.y, j.x, j.y);
      if (!M.modoAtraccion && dj < lim) {
        // empuje suave: hacia fuera y hacia un lado, para poder esquivar el coche sin quedarse atascado
        const a = Math.atan2(j.y - c.y, j.x - c.x), lado = ((j.x - c.x) * -c.dy + (j.y - c.y) * c.dx) >= 0 ? 1 : -1;
        const nx = j.x + Math.cos(a) * (lim - dj + 1) - c.dy * lado * 3, ny = j.y + Math.sin(a) * (lim - dj + 1) + c.dx * lado * 3;
        if (!colisiona(nx, ny, 12)) { j.x = nx; j.y = ny; }
        if (Math.abs(j.v) > 160 && j.choqueT <= 0) { PP.Audio.sfx("choque"); M.cam.sacudida = 5; j.choqueT = 0.6; j.v *= 0.5; if (Math.random() < 0.5) PP.Audio.sfx("pito"); }
        else j.v *= 0.96;
      }
    }
  }

  function actualizarPeatones(dt) {
    for (const p of M.peatones) {
      if (!p.objetivo) {
        const vec = [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dx, dy]) => C.peatonal(C.at(p.tx + dx, p.ty + dy)));
        if (vec.length) { const [dx, dy] = (p.ult && Math.random() < 0.75 && vec.some((v) => v[0] === p.ult[0] && v[1] === p.ult[1])) ? p.ult : U.pick(vec); p.ult = [dx, dy]; p.tx += dx; p.ty += dy; p.objetivo = { x: p.tx * T + T / 2 + U.rand(-12, 12), y: p.ty * T + T / 2 + U.rand(-12, 12) }; }
        else p.mov = false;
      } else {
        const dx = p.objetivo.x - p.x, dy = p.objetivo.y - p.y, d = Math.hypot(dx, dy);
        if (d < 2) { p.objetivo = null; continue; }
        p.ang = Math.atan2(dy, dx); p.x += dx / d * 32 * dt; p.y += dy / d * 32 * dt; p.mov = true;
      }
    }
  }

  function actualizarObjetivos(dt) {
    const j = M.jugador, I = PP.Input;
    // marcadores de misión
    let cerca = null;
    for (const m of M.marcadores) if (U.dist(m.x, m.y, j.x, j.y) < 52) { cerca = m; break; }
    if (cerca !== M.avisoCerca) { M.avisoCerca = cerca; if (M.cb.aviso) M.cb.aviso(cerca); }
    if (cerca && I.tomar("accion") && M.cb.marcador) { M.cb.marcador(cerca); return; }
    // destinos (ir a un lugar)
    for (const d of M.destinos) {
      if (U.dist(d.x, d.y, j.x, j.y) < 56 && Math.abs(j.v) < 260) {
        if (!d._dentro) { d._dentro = true; if (M.cb.destino) M.cb.destino(d); return; }
      } else d._dentro = false;
    }
    // fichas (palabras o páginas)
    for (const f of M.fichas) {
      if (!f.vivo) continue;
      if (U.dist(f.x, f.y, j.x, j.y) < 38) {
        f.vivo = false;
        chispas(f.x, f.y, f.ok === false ? "#ff6b6b" : "#ffe066", 18);
        if (M.cb.ficha) M.cb.ficha(f);
      }
    }
    // palabras doradas
    for (const d of M.doradas) {
      if (!d.vivo && d.vivo !== undefined) continue;
      if (U.dist(d.x, d.y, j.x, j.y) < 36) { d.vivo = false; chispas(d.x, d.y, "#ffd700", 26); if (M.cb.dorada) M.cb.dorada(d.i); }
    }
    M.doradas = M.doradas.filter((d) => d.vivo !== false);
    // persecución
    const b = M.borron;
    if (b) {
      const dJ = U.dist(b.x, b.y, j.x, j.y);
      const base = j.vmax * (dJ > 1100 ? 0.45 : dJ > 700 ? 0.7 : 0.86);
      b.v = U.lerp(b.v, b.huida > 0 ? j.vmax * 1.05 : base, Math.min(1, dt * 2));
      b.huida -= dt; b.cooldown -= dt;
      moverPorCarriles(b, dt, (c, ops) => {
        if (!ops.length) return [c.dx, c.dy];
        let mejor = ops[0], md = -1;
        for (const o of ops) { const px = c.x + o[0] * 300, py = c.y + o[1] * 300; const d = U.dist(px, py, j.x, j.y) + Math.random() * 260; if (d > md) { md = d; mejor = o; } }
        return mejor;
      });
      if (Math.random() < 0.35) humo(b.x - b.dx * 26, b.y - b.dy * 26, 1, "rgba(120,80,200,0.45)");
      M.borron.cerca = dJ < 170;
      if (dJ < 170 && I.tomar("accion") && b.cooldown <= 0) {
        b.fotos++; b.cooldown = 0.8; b.huida = 2.2; PP.Audio.sfx("foto"); M.flash = 1; chispas(b.x, b.y, "#ffffff", 30);
        if (M.cb.foto) M.cb.foto(b.fotos);
        if (b.fotos >= 3) { const fin = M.cb.finPersecucion; M.borron = null; if (fin) fin(); }
      }
    }
    I.pulsado.accion = false; // una pulsación fuera de alcance no se «guarda» para después
  }

  function actualizarRuta(dt) {
    if (!M.rutaObjetivo) return;
    M._rutaT -= dt;
    const j = M.jugador;
    if (!M.ruta || M._rutaT <= 0) {
      const o = typeof M.rutaObjetivo === "function" ? M.rutaObjetivo() : M.rutaObjetivo;
      if (!o) { M.ruta = null; return; }
      M.ruta = C.ruta(Math.floor(j.x / T), Math.floor(j.y / T), Math.floor(o.x / T), Math.floor(o.y / T)); M._rutaT = 1.2;
    }
    if (M.ruta) while (M.ruta.length && U.dist(M.ruta[0].x, M.ruta[0].y, j.x, j.y) < 34) M.ruta.shift();
    if (M.ruta && !M.ruta.length && M.autopiloto) { M.autopiloto = false; j.v *= 0.4; }
  }

  // ---------------- Partículas ----------------
  function humo(x, y, n, color) { for (let k = 0; k < n; k++) M.particulas.push({ x, y, vx: U.rand(-15, 15), vy: U.rand(-15, 15), vida: 0, max: U.rand(0.6, 1.1), color, tam: U.rand(4, 8), tipo: "humo" }); }
  function chispas(x, y, color, n) { if (U.prefiereMenosMovimiento()) n = Math.ceil(n / 3); for (let k = 0; k < n; k++) { const a = Math.random() * 7, v = U.rand(80, 260); M.particulas.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, vida: 0, max: U.rand(0.4, 0.9), color, tam: U.rand(2, 5), tipo: "chispa" }); } }
  M.chispas = chispas;
  M.confeti = function () { const j = M.jugador; const cols = ["#ff5d73", "#ffd23f", "#3bceac", "#7b6cf6", "#ffffff"]; for (let k = 0; k < (U.prefiereMenosMovimiento() ? 20 : 90); k++) { const a = Math.random() * 7, v = U.rand(100, 420); M.particulas.push({ x: j.x, y: j.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, vida: 0, max: U.rand(0.8, 1.6), color: U.pick(cols), tam: U.rand(3, 6), tipo: "confeti", rot: Math.random() * 6 }); } };
  function actualizarParticulas(dt) {
    for (const p of M.particulas) { p.vida += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= Math.pow(0.1, dt); p.vy *= Math.pow(0.1, dt); if (p.tipo === "humo") p.tam += dt * 10; if (p.rot !== undefined) p.rot += dt * 8; }
    M.particulas = M.particulas.filter((p) => p.vida < p.max);
    for (const m of M.marcas) m.a -= dt * 0.25; M.marcas = M.marcas.filter((m) => m.a > 0);
  }

  // ---------------- Dibujo ----------------
  function oscuridad() { const h = M.hora; const n = 0.5 - 0.5 * Math.cos(h * Math.PI * 2); return U.clamp((n - 0.55) * 1.4, 0, 0.5); } // 0 de día ... 0.5 de noche
  M.oscuridad = oscuridad;

  function dibujar() {
    const g = M.g, s = M.escala * M.dpr, W = M.ancho, H = M.alto;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.fillStyle = "#2a6f93"; g.fillRect(0, 0, M.cv.width, M.cv.height);
    const sx = (Math.random() - 0.5) * M.cam.sacudida, sy = (Math.random() - 0.5) * M.cam.sacudida;
    const camX = M.cam.x + sx, camY = M.cam.y + sy;
    g.setTransform(s, 0, 0, s, M.cv.width / 2 - camX * s, M.cv.height / 2 - camY * s);
    const vw = W / M.escala, vh = H / M.escala;
    const x0 = camX - vw / 2, y0 = camY - vh / 2, x1 = camX + vw / 2, y1 = camY + vh / 2;
    // chunks
    const CP = C.CHPX;
    for (let cy = Math.max(0, Math.floor(y0 / CP)); cy <= Math.min(Math.ceil(C.H * T / CP) - 1, Math.floor(y1 / CP)); cy++)
      for (let cx = Math.max(0, Math.floor(x0 / CP)); cx <= Math.min(Math.ceil(C.W * T / CP) - 1, Math.floor(x1 / CP)); cx++)
        g.drawImage(C.chunk(cx, cy), cx * CP, cy * CP);
    // agua animada
    if (y1 > C.COSTA * T) {
      g.strokeStyle = "rgba(255,255,255,0.22)"; g.lineWidth = 2;
      for (let y = Math.max((C.COSTA + 2) * T, Math.floor(y0 / 40) * 40); y < y1; y += 40) {
        g.beginPath();
        for (let x = Math.floor(x0 / 30) * 30; x < x1; x += 30) { const yy = y + Math.sin(x * 0.02 + M.tiempo * 1.5 + y) * 4; if (C.at(Math.floor(x / T), Math.floor(yy / T)) !== 4) { g.moveTo(x + 30, yy); continue; } g.lineTo(x, yy); }
        g.stroke();
      }
    }
    // marcas de frenada
    for (const m of M.marcas) { g.fillStyle = "rgba(20,20,20," + (m.a * 0.35) + ")"; g.fillRect(m.x - 3, m.y - 3, 6, 6); }
    // barrios «borrados» por la banda: desaturación según el progreso
    if (!PP.ajustes.altoContraste && !M.modoAtraccion) {
      for (const k in C.rectBarrio) {
        const rest = M.restauracion[k] || 0; if (rest >= 1) continue;
        const r = C.rectBarrio[k];
        g.globalCompositeOperation = "saturation"; g.fillStyle = "hsla(0,0%,50%," + (0.62 * (1 - rest)).toFixed(3) + ")";
        g.fillRect(r[0] * T, r[1] * T, r[2] * T, r[3] * T); g.globalCompositeOperation = "source-over";
      }
    }
    // destinos y marcadores en el suelo
    const t = M.tiempo;
    for (const m of M.marcadores) dibujarMarcador(g, m, t);
    for (const d of M.destinos) dibujarDestino(g, d, t);
    // ruta GPS
    if (M.ruta && M.ruta.length) {
      g.save(); g.strokeStyle = "rgba(186,104,255,0.75)"; g.lineWidth = 10; g.lineCap = "round"; g.lineJoin = "round"; g.setLineDash([2, 18]); g.lineDashOffset = -t * 40;
      g.beginPath(); g.moveTo(M.jugador.x, M.jugador.y); M.ruta.forEach((p) => g.lineTo(p.x, p.y)); g.stroke(); g.restore();
    }
    // peatones
    for (const p of M.peatones) if (p.x > x0 - 20 && p.x < x1 + 20 && p.y > y0 - 20 && p.y < y1 + 20) D.peaton(g, p, t);
    // coches
    for (const c of M.coches) if (c.x > x0 - 60 && c.x < x1 + 60 && c.y > y0 - 60 && c.y < y1 + 60) D.vehiculo(g, c.tipo, c.color, c.x, c.y, Math.atan2(c.dy, c.dx), 1, { taxi: c.taxi, largo: 1 });
    // furgoneta del Borrón
    if (M.borron) { const b = M.borron; D.vehiculo(g, "coche", "#3d2b63", b.x, b.y, Math.atan2(b.dy, b.dx), 1.25, { borron: true, largo: 1.3 }); if (b.cerca) { g.strokeStyle = "rgba(255,255,255," + (0.5 + 0.5 * Math.sin(t * 10)) + ")"; g.lineWidth = 3; g.beginPath(); g.arc(b.x, b.y, 44, 0, 7); g.stroke(); } }
    // fichas (palabras/páginas)
    for (const f of M.fichas) if (f.vivo) dibujarFicha(g, f, t);
    for (const d of M.doradas) dibujarDorada(g, d, t);
    // jugador
    const j = M.jugador, pr = PP.Store ? PP.Store.progreso() : { vehiculo: "moto", color: "#ff4f7b" };
    if (!M.modoAtraccion) D.vehiculo(g, pr.vehiculo, pr.color, j.x, j.y, j.ang, 1, { casco: "#ffd23f" });
    // partículas
    for (const p of M.particulas) {
      const a = 1 - p.vida / p.max; g.globalAlpha = Math.max(0, a); g.fillStyle = p.color;
      if (p.tipo === "confeti") { g.save(); g.translate(p.x, p.y); g.rotate(p.rot); g.fillRect(-p.tam, -p.tam / 2, p.tam * 2, p.tam); g.restore(); }
      else { g.beginPath(); g.arc(p.x, p.y, p.tam, 0, 7); g.fill(); }
    }
    g.globalAlpha = 1;
    // noche y luces
    const osc = oscuridad();
    if (osc > 0.01) {
      g.fillStyle = "rgba(14,22,60," + osc + ")"; g.fillRect(x0 - 50, y0 - 50, vw + 100, vh + 100);
      if (osc > 0.12) {
        g.globalCompositeOperation = "lighter";
        const fuerza = (osc - 0.12) / 0.38;
        for (const l of C.luces) {
          if (l.x < x0 - l.r || l.x > x1 + l.r || l.y < y0 - l.r || l.y > y1 + l.r) continue;
          const gr = g.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r); gr.addColorStop(0, "rgba(" + l.c + "," + (0.35 * fuerza) + ")"); gr.addColorStop(1, "rgba(" + l.c + ",0)");
          g.fillStyle = gr; g.fillRect(l.x - l.r, l.y - l.r, l.r * 2, l.r * 2);
          if (l.faro) { const a = t * 1.2; g.fillStyle = "rgba(255,240,190," + (0.18 * fuerza) + ")"; g.beginPath(); g.moveTo(l.x, l.y); g.arc(l.x, l.y, 900, a, a + 0.25); g.fill(); }
        }
        // faros del jugador
        if (!M.modoAtraccion) { g.fillStyle = "rgba(255,245,200," + (0.22 * fuerza) + ")"; g.beginPath(); g.moveTo(j.x, j.y); g.arc(j.x, j.y, 220, j.ang - 0.35, j.ang + 0.35); g.fill(); }
        g.globalCompositeOperation = "source-over";
      }
    }
    // fogonazo de la foto
    if (M.flash > 0) { g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = "rgba(255,255,255," + M.flash + ")"; g.fillRect(0, 0, M.cv.width, M.cv.height); M.flash = Math.max(0, M.flash - 0.06); }
    // indicador de borde para la persecución
    if (M.borron) flechaBorde(M.borron.x, M.borron.y, "#b388ff", camX, camY, vw, vh, s);
    dibujarMinimapa();
  }

  function flechaBorde(x, y, color, camX, camY, vw, vh, s) {
    const dx = x - camX, dy = y - camY;
    if (Math.abs(dx) < vw / 2 - 30 && Math.abs(dy) < vh / 2 - 30) return;
    const g = M.g, a = Math.atan2(dy, dx);
    const k = Math.min((vw / 2 - 40) / Math.abs(Math.cos(a) || 1e-6), (vh / 2 - 40) / Math.abs(Math.sin(a) || 1e-6));
    const px = camX + Math.cos(a) * k, py = camY + Math.sin(a) * k;
    g.save(); g.translate(px, py); g.rotate(a); g.fillStyle = color; g.strokeStyle = "#fff"; g.lineWidth = 3;
    g.beginPath(); g.moveTo(22, 0); g.lineTo(-12, -14); g.lineTo(-6, 0); g.lineTo(-12, 14); g.closePath(); g.fill(); g.stroke(); g.restore();
  }

  function dibujarMarcador(g, m, t) {
    const pulso = U.prefiereMenosMovimiento() ? 0.5 : 0.5 + 0.5 * Math.sin(t * 3 + m.x);
    g.save();
    g.fillStyle = m.hecha ? "rgba(255,255,255,0.18)" : m.color + "55"; g.beginPath(); g.arc(m.x, m.y, 30 + pulso * 6, 0, 7); g.fill();
    g.strokeStyle = m.hecha ? "#37b24d" : m.color; g.lineWidth = 4; g.beginPath(); g.arc(m.x, m.y, 26, 0, 7); g.stroke();
    const yy = m.y - 46 - pulso * 6;
    g.fillStyle = "rgba(0,0,0,0.3)"; g.beginPath(); g.ellipse(m.x, m.y + 2, 12, 5, 0, 0, 7); g.fill();
    g.translate(m.x, yy); g.rotate(Math.PI / 4);
    g.fillStyle = m.hecha ? "#e8e8e8" : m.color; g.strokeStyle = "#1b1b2f"; g.lineWidth = 3; g.fillRect(-14, -14, 28, 28); g.strokeRect(-14, -14, 28, 28);
    g.rotate(-Math.PI / 4); g.fillStyle = "#1b1b2f"; g.font = "900 15px 'Trebuchet MS', sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(m.etiqueta, 0, 1);
    g.restore();
    if (m.hecha) {
      // insignia verde con ✔ junto al rombo y estrellas encima: se ve de lejos que la misión está completada
      const bx = m.x + 20, by = yy - 18;
      g.save(); g.fillStyle = "#37b24d"; g.strokeStyle = "#ffffff"; g.lineWidth = 3; g.beginPath(); g.arc(bx, by, 11, 0, 7); g.fill(); g.stroke();
      g.strokeStyle = "#ffffff"; g.lineWidth = 3.2; g.lineCap = "round"; g.lineJoin = "round"; g.beginPath(); g.moveTo(bx - 5, by + 0.5); g.lineTo(bx - 1.5, by + 4); g.lineTo(bx + 5.5, by - 4); g.stroke();
      if (m.estrellas) { g.fillStyle = "#ffd23f"; g.strokeStyle = "#1b1b2f"; g.lineWidth = 3; g.font = "bold 15px sans-serif"; g.textAlign = "center"; g.textBaseline = "alphabetic"; const t = "★".repeat(m.estrellas); g.strokeText(t, m.x, yy - 24); g.fillText(t, m.x, yy - 24); }
      g.restore();
    }
  }
  function dibujarDestino(g, d, t) {
    const p = 0.5 + 0.5 * Math.sin(t * 4);
    g.save(); g.strokeStyle = "#ffe066"; g.lineWidth = 5; g.setLineDash([10, 8]); g.lineDashOffset = -t * 30;
    g.beginPath(); g.arc(d.x, d.y, 40 + p * 4, 0, 7); g.stroke(); g.setLineDash([]);
    g.fillStyle = "rgba(255,224,102,0.18)"; g.beginPath(); g.arc(d.x, d.y, 40, 0, 7); g.fill();
    // poste con nombre
    const etiqueta = d.etiqueta || "?"; g.font = "800 16px 'Trebuchet MS', sans-serif";
    const w = g.measureText(etiqueta).width + 22;
    g.fillStyle = "#1b1b2f"; D.redondeado(g, d.x - w / 2, d.y - 84, w, 30, 8); g.fill();
    g.fillStyle = "#ffe066"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(etiqueta, d.x, d.y - 69);
    g.fillStyle = "#1b1b2f"; g.fillRect(d.x - 2, d.y - 54, 4, 20);
    g.restore();
  }
  function dibujarFicha(g, f, t) {
    const bob = U.prefiereMenosMovimiento() ? 0 : Math.sin(t * 3 + f.fase) * 5;
    g.save(); g.translate(f.x, f.y);
    g.fillStyle = "rgba(0,0,0,0.3)"; g.beginPath(); g.ellipse(0, 10, 26, 8, 0, 0, 7); g.fill();
    if (f.pagina) {
      g.translate(0, -18 + bob); g.rotate(Math.sin(t * 2 + f.fase) * 0.25);
      g.fillStyle = "#fffaf0"; g.fillRect(-16, -20, 32, 40); g.strokeStyle = "#c48cff"; g.lineWidth = 3; g.strokeRect(-16, -20, 32, 40);
      g.fillStyle = "#b9a8d9"; for (let k = -12; k < 16; k += 6) g.fillRect(-11, k, 22, 2);
    } else {
      g.font = "800 18px 'Trebuchet MS', sans-serif"; const w = Math.max(54, g.measureText(f.t).width + 26);
      g.translate(0, -16 + bob);
      g.fillStyle = "#fff"; D.redondeado(g, -w / 2, -18, w, 36, 10); g.fill();
      g.strokeStyle = f.color || "#7b6cf6"; g.lineWidth = 4; D.redondeado(g, -w / 2, -18, w, 36, 10); g.stroke();
      g.fillStyle = "#1b1b2f"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(f.t, 0, 1);
    }
    g.restore();
  }
  function dibujarDorada(g, d, t) {
    const esc = U.prefiereMenosMovimiento() ? 1 : Math.abs(Math.cos(t * 2.5 + d.i));
    g.save(); g.translate(d.x, d.y - 10);
    g.fillStyle = "rgba(255,215,0,0.25)"; g.beginPath(); g.arc(0, 0, 26, 0, 7); g.fill();
    g.scale(Math.max(0.15, esc), 1);
    g.fillStyle = "#ffcf33"; g.strokeStyle = "#a87b00"; g.lineWidth = 3; g.beginPath(); g.arc(0, 0, 16, 0, 7); g.fill(); g.stroke();
    g.fillStyle = "#8a6400"; g.font = "900 18px serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("Ñ", 0, 1);
    g.restore();
  }

  function dibujarMinimapa() {
    const g = M.mg, cv = M.mini; if (!cv || !cv.width) return;
    const base = C.minimapa(), k = 3;
    const w = cv.width, h = cv.height, zoom = 1.6 * (w / 190);
    const j = M.jugador;
    g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = "#1a4f6b"; g.fillRect(0, 0, w, h);
    const px = j.x / T * k, py = j.y / T * k;
    g.setTransform(zoom, 0, 0, zoom, w / 2 - px * zoom, h / 2 - py * zoom);
    g.drawImage(base, 0, 0);
    // barrios borrados (grisáceo)
    for (const b in C.rectBarrio) { const rest = M.restauracion[b] || 0; if (rest >= 1) continue; const r = C.rectBarrio[b]; g.fillStyle = "rgba(60,60,70," + (0.35 * (1 - rest)) + ")"; g.fillRect(r[0] * k, r[1] * k, r[2] * k, r[3] * k); }
    if (M.ruta && M.ruta.length) { g.strokeStyle = "#c77dff"; g.lineWidth = 2.4; g.beginPath(); g.moveTo(px, py); M.ruta.forEach((p) => g.lineTo(p.x / T * k, p.y / T * k)); g.stroke(); }
    for (const m of M.marcadores) { g.fillStyle = m.hecha ? "#37b24d" : m.color; g.strokeStyle = "#111"; g.lineWidth = 1; g.beginPath(); g.arc(m.x / T * k, m.y / T * k, 4.5, 0, 7); g.fill(); g.stroke(); }
    for (const d of M.destinos) { g.fillStyle = "#ffe066"; g.beginPath(); g.arc(d.x / T * k, d.y / T * k, 5, 0, 7); g.fill(); g.strokeStyle = "#111"; g.stroke(); }
    for (const f of M.fichas) if (f.vivo) { g.fillStyle = f.pagina ? "#c48cff" : "#fff"; g.fillRect(f.x / T * k - 2, f.y / T * k - 2, 4, 4); }
    if (M.borron) { g.fillStyle = "#b388ff"; g.beginPath(); g.arc(M.borron.x / T * k, M.borron.y / T * k, 5, 0, 7); g.fill(); }
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.save(); g.translate(w / 2, h / 2); g.rotate(j.ang); g.scale(w / 190, w / 190); g.fillStyle = "#fff"; g.strokeStyle = "#e63946"; g.lineWidth = 2;
    g.beginPath(); g.moveTo(8, 0); g.lineTo(-6, -6); g.lineTo(-3, 0); g.lineTo(-6, 6); g.closePath(); g.fill(); g.stroke(); g.restore();
  }

  // Mapa grande (para el móvil del juego)
  M.dibujarMapaGrande = function (cv) {
    const g = cv.getContext("2d"), base = C.minimapa();
    const k = Math.min(cv.width / base.width, cv.height / base.height);
    g.fillStyle = "#123"; g.fillRect(0, 0, cv.width, cv.height);
    const ox = (cv.width - base.width * k) / 2, oy = (cv.height - base.height * k) / 2;
    g.imageSmoothingEnabled = false; g.drawImage(base, ox, oy, base.width * k, base.height * k);
    const tk = 3 * k;
    const f = cv.width / 720;
    const rotulo = (txt, x, y, tam, color) => { g.font = "800 " + Math.round(tam * f) + "px 'Trebuchet MS', sans-serif"; g.lineWidth = 4 * f; g.strokeStyle = "rgba(10,14,30,0.85)"; g.strokeText(txt, x, y); g.fillStyle = color; g.fillText(txt, x, y); };
    g.textAlign = "left"; g.textBaseline = "alphabetic";
    for (const b in C.rectBarrio) { const r = C.rectBarrio[b]; g.strokeStyle = PP.BARRIOS[b].color; g.lineWidth = 3 * f; g.strokeRect(ox + r[0] * tk, oy + r[1] * tk, r[2] * tk, r[3] * tk); }
    const usados = new Set(PP.MISIONES.map((m) => m.lugar));
    for (const kk in C.lugares) { if (!usados.has(kk)) continue; const l = C.lugares[kk]; g.fillStyle = "#fff"; g.beginPath(); g.arc(ox + l.x / T * tk, oy + l.y / T * tk, 3 * f, 0, 7); g.fill(); rotulo(l.nombre, ox + l.x / T * tk + 7 * f, oy + l.y / T * tk - 6 * f, 10, "#fff"); }
    for (const b in C.rectBarrio) { const r = C.rectBarrio[b]; rotulo(PP.BARRIOS[b].nombre + " (" + PP.BARRIOS[b].bloque + ")", ox + r[0] * tk + 8 * f, oy + r[1] * tk + 20 * f, 14, PP.BARRIOS[b].color); }
    for (const m of M.marcadores) { g.fillStyle = m.hecha ? "#37b24d" : m.color; g.beginPath(); g.arc(ox + m.x / T * tk, oy + m.y / T * tk, 6, 0, 7); g.fill(); g.strokeStyle = "#111"; g.lineWidth = 1.5; g.stroke(); }
    const j = M.jugador; g.fillStyle = "#ff4f7b"; g.beginPath(); g.arc(ox + j.x / T * tk, oy + j.y / T * tk, 6, 0, 7); g.fill(); g.strokeStyle = "#fff"; g.lineWidth = 2; g.stroke();
  };

  PP.Mundo = M;
})();
