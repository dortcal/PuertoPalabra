/* Puerto Palabra · Arte de los minijuegos (dibujo vectorial original en Canvas 2D).
   Personaje reportero/a (perfil y espalda), fondos con profundidad y elementos animados.
   Todo se dibuja por código: no hay imágenes externas ni recursos de terceros. */
window.PP = window.PP || {};
(function () {
  "use strict";
  const U = PP.U;
  const menosMov = () => U.prefiereMenosMovimiento();
  const A = {};
  const TINTA = "#1b1b2f", PIEL = "#f1c27d", PELO = "#4a2e1f";

  function rr(g, x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
  A.rr = rr;
  /** Mezcla un color #rrggbb con negro (f<0) o blanco (f>0) */
  A.tono = function (hex, f) {
    const n = parseInt((hex || "#888888").replace("#", "").slice(0, 6), 16); let r = n >> 16, gg = (n >> 8) & 255, b = n & 255;
    const m = f < 0 ? 0 : 255, k = Math.abs(f);
    r = Math.round(r + (m - r) * k); gg = Math.round(gg + (m - gg) * k); b = Math.round(b + (m - b) * k);
    return "rgb(" + r + "," + gg + "," + b + ")";
  };
  A.sombra = function (g, x, y, rx, ry, a) { g.fillStyle = "rgba(0,0,0," + (a == null ? 0.25 : a) + ")"; g.beginPath(); g.ellipse(x, y, Math.max(0.5, rx), Math.max(0.5, ry), 0, 0, 7); g.fill(); };
  A.estrella = function (g, x, y, r, rot) { g.beginPath(); for (let k = 0; k < 10; k++) { const a = (rot || 0) + k * Math.PI / 5 - Math.PI / 2, q = k % 2 ? r * 0.45 : r; g.lineTo(x + Math.cos(a) * q, y + Math.sin(a) * q); } g.closePath(); };
  const colorJugador = () => { try { return (PP.Store && PP.Store.progreso().color) || "#ff4f7b"; } catch (e) { return "#ff4f7b"; } };
  A.colorJugador = colorJugador;

  // ------------------------------------------------------------------ Personaje de perfil
  /** Reportero/a de perfil para el juego de plataformas. (x,y) = pies. Altura ≈ 62.
      pose: { t: fase de carrera, corre, aire, vy, dir (1|-1), sq: aplastamiento (-0.2..0.2), feliz } */
  A.reportero = function (g, x, y, pose) {
    pose = pose || {};
    const c = colorJugador(), oscuro = A.tono(c, -0.3), t = pose.t || 0, aire = !!pose.aire, corre = !!pose.corre && !aire;
    const zz = corre ? Math.sin(t) : 0, bob = corre ? Math.abs(Math.sin(t)) * 2.5 : 0;
    g.save(); g.translate(x, y);
    if (pose.sq) g.scale(1 + pose.sq, 1 - pose.sq);
    g.scale(pose.dir || 1, 1); g.translate(0, -bob);
    g.lineJoin = "round"; g.lineCap = "round"; g.strokeStyle = TINTA; g.lineWidth = 2.4;
    const pierna = (ang, ox, atras) => {
      g.save(); g.translate(ox, -22); g.rotate(ang);
      g.fillStyle = atras ? "#22305a" : "#2f4380"; rr(g, -4.5, 0, 9, 17, 4); g.fill(); g.stroke();
      g.fillStyle = atras ? "#c92a2a" : "#e03131"; rr(g, -5, 14, 13, 7, 3.5); g.fill(); g.stroke();
      g.fillStyle = "#fff"; g.fillRect(-4, 18.5, 11, 1.6);
      g.restore();
    };
    const brazo = (ang, ox, delante) => {
      g.save(); g.translate(ox, -42); g.rotate(ang);
      g.fillStyle = delante ? c : oscuro; rr(g, -4, 0, 8, 16, 4); g.fill(); g.stroke();
      g.fillStyle = PIEL; g.beginPath(); g.arc(0, 17, 4, 0, 7); g.fill(); g.stroke();
      g.restore();
    };
    if (aire) { pierna(pose.vy < 0 ? -0.9 : -0.4, -3, true); pierna(pose.vy < 0 ? 0.5 : 0.8, 4, false); }
    else { pierna(zz * 0.7, -3, true); pierna(-zz * 0.7, 4, false); }
    brazo(aire ? -2.6 : -zz * 0.9 + 0.1, -3, false);
    // cuerpo: chaleco de reportero con bolsillos
    g.fillStyle = c; rr(g, -11, -46, 22, 26, 7); g.fill(); g.stroke();
    g.fillStyle = A.tono(c, 0.35); rr(g, -8, -44, 6, 22, 3); g.fill();
    g.fillStyle = oscuro; rr(g, 2, -33, 7, 6, 2); g.fill();
    // cámara colgada
    g.strokeStyle = TINTA; g.lineWidth = 1.4; g.beginPath(); g.moveTo(-6, -45); g.lineTo(5, -33); g.stroke(); g.lineWidth = 2.4;
    g.fillStyle = "#343a40"; rr(g, 3, -36, 11, 8, 2); g.fill(); g.stroke(); g.fillStyle = "#74c0fc"; g.beginPath(); g.arc(9, -32, 2.4, 0, 7); g.fill();
    brazo(aire ? -2.9 : zz * 0.9 + 0.1, 4, true);
    // cabeza
    g.fillStyle = PIEL; g.beginPath(); g.arc(2, -56, 11, 0, 7); g.fill(); g.stroke();
    g.fillStyle = PELO; g.beginPath(); g.arc(-3, -58, 8, Math.PI * 0.5, Math.PI * 1.3); g.fill();
    // gorra
    g.fillStyle = "#ffd23f"; g.beginPath(); g.arc(2, -59, 11.5, Math.PI, 0); g.closePath(); g.fill(); g.stroke();
    rr(g, 8, -62, 13, 4.5, 2); g.fill(); g.stroke();
    g.fillStyle = "#ff7a45"; g.beginPath(); g.arc(2, -70, 2.4, 0, 7); g.fill();
    // cara
    g.fillStyle = TINTA; g.beginPath(); g.ellipse(8, -56, 1.8, 2.4, 0, 0, 7); g.fill();
    g.fillStyle = "#ff8787"; g.globalAlpha = 0.6; g.beginPath(); g.arc(5, -51, 2.5, 0, 7); g.fill(); g.globalAlpha = 1;
    g.lineWidth = 1.8; g.beginPath(); if (pose.feliz || aire) g.arc(8, -51, 3, 0.1, Math.PI - 0.6); else g.arc(8.5, -50.5, 2.4, 0.2, 1.5); g.stroke();
    g.restore();
  };

  // ------------------------------------------------------------------ Personaje de espaldas
  /** Reportero/a de espaldas (golf, penaltis, canastas). (x,y) = pies, s = escala (altura ≈ 92·s).
      pose: { brazoI, brazoD: ángulo desde abajo (rad, hacia fuera), palo: ángulo del palo de golf, patada: 0..1, salto } */
  A.reporteroEspaldas = function (g, x, y, s, pose) {
    pose = pose || {};
    const c = colorJugador(), oscuro = A.tono(c, -0.3);
    g.save(); g.translate(x, y - (pose.salto || 0) * s); g.scale(s, s);
    g.lineJoin = "round"; g.lineCap = "round"; g.strokeStyle = TINTA; g.lineWidth = 2.6;
    A.sombra(g, 0, (pose.salto || 0), 24, 6, 0.22);
    const pk = pose.patada || 0;
    // piernas
    g.fillStyle = "#2f4380"; rr(g, -13, -34, 11, 32, 5); g.fill(); g.stroke();
    g.save(); g.translate(7, -34); g.rotate(-pk * 0.5); g.scale(1, 1 - pk * 0.25); g.fillStyle = "#2f4380"; rr(g, -5.5, 0, 11, 32, 5); g.fill(); g.stroke(); g.fillStyle = "#e03131"; rr(g, -6.5, 28, 13, 8, 4); g.fill(); g.stroke(); g.restore();
    g.fillStyle = "#e03131"; rr(g, -14.5, -6, 13, 8, 4); g.fill(); g.stroke();
    // brazos (detrás del cuerpo si apuntan abajo)
    const brazo = (sd, ang) => {
      g.save(); g.translate(sd * 15, -66); g.rotate(-sd * ang);
      g.fillStyle = oscuro; rr(g, -5, 0, 10, 26, 5); g.fill(); g.stroke();
      g.fillStyle = PIEL; g.beginPath(); g.arc(0, 28, 5.5, 0, 7); g.fill(); g.stroke();
      g.restore();
    };
    // cuerpo
    g.fillStyle = c; rr(g, -18, -72, 36, 42, 11); g.fill(); g.stroke();
    g.fillStyle = A.tono(c, -0.15); rr(g, -18, -40, 36, 10, 5); g.fill();
    g.fillStyle = "rgba(255,255,255,0.95)"; g.font = "900 10px 'Arial Black', 'Trebuchet MS', sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("EL ECO", 0, -56);
    if (pose.palo != null) {
      // manos juntas delante: palo de golf girando alrededor de los hombros
      g.save(); g.translate(0, -62); g.rotate(pose.palo);
      g.strokeStyle = "#adb5bd"; g.lineWidth = 3.4; g.beginPath(); g.moveTo(0, 14); g.lineTo(0, 74); g.stroke();
      g.fillStyle = "#495057"; g.strokeStyle = TINTA; g.lineWidth = 2; rr(g, -9, 70, 16, 8, 3); g.fill(); g.stroke();
      g.fillStyle = oscuro; g.lineWidth = 2.6; rr(g, -11, -4, 22, 22, 8); g.fill(); g.stroke();
      g.fillStyle = PIEL; g.beginPath(); g.arc(0, 18, 6, 0, 7); g.fill(); g.stroke();
      g.restore();
    } else { brazo(-1, pose.brazoI == null ? 0.25 : pose.brazoI); brazo(1, pose.brazoD == null ? 0.25 : pose.brazoD); }
    // cabeza de espaldas: pelo y gorra con cierre trasero
    g.fillStyle = PIEL; g.beginPath(); g.arc(-13, -84, 4, 0, 7); g.arc(13, -84, 4, 0, 7); g.fill(); g.stroke();
    g.fillStyle = PELO; g.beginPath(); g.arc(0, -84, 13, 0, 7); g.fill(); g.stroke();
    g.fillStyle = "#ffd23f"; g.beginPath(); g.arc(0, -88, 13.5, Math.PI * 1.02, Math.PI * 1.98); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = PELO; rr(g, -5, -82, 10, 5, 2); g.fill();
    g.fillStyle = "#ff7a45"; g.beginPath(); g.arc(0, -101, 2.6, 0, 7); g.fill();
    g.restore();
  };

  // ------------------------------------------------------------------ Elementos
  A.palmera = function (g, x, y, s, t) {
    const sway = menosMov() ? 0 : Math.sin((t || 0) * 1.3 + x * 0.01) * 0.06;
    g.save(); g.translate(x, y); g.scale(s, s);
    A.sombra(g, 6, 0, 14, 3, 0.2);
    g.strokeStyle = "#8d5a3b"; g.lineWidth = 6; g.lineCap = "round"; g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(6, -30, 2, -60); g.stroke();
    g.strokeStyle = "#6b4226"; g.lineWidth = 1.5; for (let k = 6; k < 58; k += 7) { g.beginPath(); g.moveTo(-3 + k * 0.05, -k); g.lineTo(3 + k * 0.08, -k - 2); g.stroke(); }
    g.translate(2, -60); g.rotate(sway);
    for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * 0.55; g.fillStyle = k % 2 ? "#2f9e44" : "#40c057"; g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(Math.cos(a - 0.3) * 22, Math.sin(a - 0.3) * 22 - 6, Math.cos(a) * 34, Math.sin(a) * 34 + 10); g.quadraticCurveTo(Math.cos(a + 0.3) * 18, Math.sin(a + 0.3) * 18, 0, 0); g.fill(); }
    g.fillStyle = "#6b4226"; g.beginPath(); g.arc(-3, 3, 3, 0, 7); g.arc(3, 4, 3, 0, 7); g.fill();
    g.restore();
  };
  A.tabaiba = function (g, x, y, s) {
    g.save(); g.translate(x, y); g.scale(s, s);
    A.sombra(g, 0, 0, 16, 3.5, 0.2);
    g.strokeStyle = "#a9a28a"; g.lineWidth = 3; g.lineCap = "round";
    [[-10, -14], [-3, -18], [5, -16], [11, -11]].forEach(([dx, dy]) => { g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(dx * 0.4, dy * 0.6, dx, dy); g.stroke(); });
    g.fillStyle = "#74b816"; [[-10, -16], [-3, -20], [5, -18], [11, -13]].forEach(([dx, dy]) => { g.beginPath(); g.arc(dx, dy, 6, 0, 7); g.fill(); });
    g.fillStyle = "#a9e34b"; [[-11, -18], [-4, -22], [4, -20], [10, -15]].forEach(([dx, dy]) => { g.beginPath(); g.arc(dx, dy, 2.6, 0, 7); g.fill(); });
    g.restore();
  };
  A.nubes = function (g, W, y0, t, vel, alfa) {
    g.fillStyle = "rgba(255,255,255," + (alfa || 0.9) + ")";
    for (let k = 0; k < 5; k++) {
      const x = ((k * 290 + t * (menosMov() ? 0 : vel)) % (W + 360)) - 180, y = y0 + (k % 3) * 22;
      g.beginPath(); g.ellipse(x, y, 54, 15, 0, 0, 7); g.ellipse(x + 34, y - 10, 36, 16, 0, 0, 7); g.ellipse(x - 28, y - 6, 26, 12, 0, 0, 7); g.fill();
    }
  };
  A.sol = function (g, x, y, r, t) {
    const gr = g.createRadialGradient(x, y, r * 0.3, x, y, r * 3); gr.addColorStop(0, "rgba(255,244,180,0.9)"); gr.addColorStop(1, "rgba(255,244,180,0)");
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, r * 3, 0, 7); g.fill();
    g.fillStyle = "#fff3bf"; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
  };
  /** Teide: cono con degradado y nieve en la cumbre */
  A.volcan = function (g, cx, base, ancho, alto, nieve) {
    const gr = g.createLinearGradient(cx - ancho, 0, cx + ancho, 0); gr.addColorStop(0, "#8c7b8f"); gr.addColorStop(0.5, "#6b5b73"); gr.addColorStop(1, "#4d3f56");
    g.fillStyle = gr; g.beginPath(); g.moveTo(cx - ancho, base); g.lineTo(cx - ancho * 0.12, base - alto); g.lineTo(cx + ancho * 0.1, base - alto * 1.02); g.lineTo(cx + ancho, base); g.closePath(); g.fill();
    if (nieve) {
      g.fillStyle = "#f8f9fa"; g.beginPath(); g.moveTo(cx - ancho * 0.12, base - alto); g.lineTo(cx + ancho * 0.1, base - alto * 1.02);
      g.lineTo(cx + ancho * 0.2, base - alto * 0.86); g.lineTo(cx + ancho * 0.08, base - alto * 0.9); g.lineTo(cx, base - alto * 0.83); g.lineTo(cx - ancho * 0.1, base - alto * 0.9); g.lineTo(cx - ancho * 0.24, base - alto * 0.84); g.closePath(); g.fill();
    }
  };
  /** Balón de fútbol con giro */
  A.balon = function (g, x, y, r, rot) {
    g.save(); g.translate(x, y); g.rotate(rot || 0);
    const gr = g.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.1, 0, 0, r); gr.addColorStop(0, "#fff"); gr.addColorStop(1, "#ced4da");
    g.fillStyle = gr; g.strokeStyle = TINTA; g.lineWidth = Math.max(1.2, r / 10); g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill(); g.stroke();
    g.fillStyle = TINTA; const pent = (px, py, q) => { g.beginPath(); for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * 1.2566; g.lineTo(px + Math.cos(a) * q, py + Math.sin(a) * q); } g.fill(); };
    pent(0, 0, r * 0.36); for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * 1.2566 + 0.63; g.save(); g.beginPath(); g.arc(0, 0, r, 0, 7); g.clip(); pent(Math.cos(a) * r * 0.95, Math.sin(a) * r * 0.95, r * 0.3); g.restore(); }
    g.restore();
  };
  /** Balón de baloncesto con giro */
  A.balonBasket = function (g, x, y, r, rot) {
    g.save(); g.translate(x, y); g.rotate(rot || 0);
    const gr = g.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.1, 0, 0, r); gr.addColorStop(0, "#ffa94d"); gr.addColorStop(1, "#d9480f");
    g.fillStyle = gr; g.strokeStyle = TINTA; g.lineWidth = Math.max(1.5, r / 12); g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill(); g.stroke();
    g.lineWidth = Math.max(1.2, r / 16); g.beginPath(); g.moveTo(-r, 0); g.lineTo(r, 0); g.moveTo(0, -r); g.lineTo(0, r);
    g.moveTo(-r * 0.7, -r * 0.7); g.quadraticCurveTo(-r * 0.15, 0, -r * 0.7, r * 0.7); g.moveTo(r * 0.7, -r * 0.7); g.quadraticCurveTo(r * 0.15, 0, r * 0.7, r * 0.7); g.stroke();
    g.restore();
  };
  /** Bombillas de feria */
  A.guirnalda = function (g, x0, x1, y, t, n) {
    g.strokeStyle = "#1b1b2f"; g.lineWidth = 2; g.beginPath();
    for (let k = 0; k <= n; k++) { const x = x0 + (x1 - x0) * k / n, yy = y + Math.sin(k / n * Math.PI) * 18; if (k) g.lineTo(x, yy); else g.moveTo(x, yy); } g.stroke();
    for (let k = 0; k <= n; k++) {
      const x = x0 + (x1 - x0) * k / n, yy = y + Math.sin(k / n * Math.PI) * 18 + 7, col = ["#ffd23f", "#ff5d73", "#3bceac", "#9ff0e0", "#c48cff"][k % 5];
      const on = menosMov() ? 1 : 0.55 + 0.45 * Math.sin(t * 5 + k * 1.3);
      g.globalAlpha = on * 0.35; g.fillStyle = col; g.beginPath(); g.arc(x, yy, 11, 0, 7); g.fill();
      g.globalAlpha = 0.5 + on * 0.5; g.beginPath(); g.arc(x, yy, 5, 0, 7); g.fill(); g.globalAlpha = 1;
    }
  };
  /** Foco de estadio con halo */
  A.foco = function (g, x, y, t) {
    g.fillStyle = "#495057"; g.fillRect(x - 3, y, 6, 140);
    g.fillStyle = "#343a40"; rr(g, x - 26, y - 14, 52, 22, 4); g.fill();
    for (let k = 0; k < 4; k++) { g.fillStyle = "#fff9db"; g.beginPath(); g.arc(x - 18 + k * 12, y - 3, 4.5, 0, 7); g.fill(); }
    const gr = g.createRadialGradient(x, y, 4, x, y, 120); gr.addColorStop(0, "rgba(255,249,219,0.55)"); gr.addColorStop(1, "rgba(255,249,219,0)");
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, 120, 0, 7); g.fill();
  };

  PP.MJArte = A;
})();
