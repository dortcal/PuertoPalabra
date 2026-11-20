/* Puerto Palabra · Motor de audio (Web Audio API).
   Toda la música y los efectos se sintetizan en el navegador: no hay archivos externos
   ni licencias de terceros. El audio arranca tras la primera interacción del usuario. */
window.PP = window.PP || {};
(function () {
  "use strict";
  const A = { ctx: null, listo: false, pista: null, paso: 0, siguiente: 0, timer: null };
  let master, gMusica, gEfectos, ruido, motorOsc, motorFilt, motorGain, comp;

  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

  A.init = function () {
    if (A.ctx) { if (A.ctx.state === "suspended") A.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try { A.ctx = new AC(); } catch (e) { return; }
    const c = A.ctx;
    comp = c.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4;
    master = c.createGain(); gMusica = c.createGain(); gEfectos = c.createGain();
    gMusica.connect(master); gEfectos.connect(master); master.connect(comp); comp.connect(c.destination);
    // buffer de ruido reutilizable
    ruido = c.createBuffer(1, c.sampleRate * 1.5, c.sampleRate);
    const d = ruido.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    // motor del vehículo
    motorOsc = c.createOscillator(); motorOsc.type = "sawtooth"; motorOsc.frequency.value = 50;
    const o2 = c.createOscillator(); o2.type = "square"; o2.frequency.value = 25;
    motorFilt = c.createBiquadFilter(); motorFilt.type = "lowpass"; motorFilt.frequency.value = 300;
    motorGain = c.createGain(); motorGain.gain.value = 0;
    const g2 = c.createGain(); g2.gain.value = 0.4;
    motorOsc.connect(motorFilt); o2.connect(g2); g2.connect(motorFilt); motorFilt.connect(motorGain); motorGain.connect(gEfectos);
    motorOsc.start(); o2.start(); A._o2 = o2;
    A.listo = true;
    A.aplicarVolumen();
    A.timer = setInterval(programar, 25);
    if (A._pendiente) { const p = A._pendiente; A._pendiente = null; A.musica(p); }
  };

  A.aplicarVolumen = function () {
    if (!A.ctx) return;
    const s = PP.ajustes;
    const t = A.ctx.currentTime;
    master.gain.setTargetAtTime(s.silencio ? 0 : 1, t, 0.05);
    gMusica.gain.setTargetAtTime(s.volMusica * 0.5, t, 0.05);
    gEfectos.gain.setTargetAtTime(s.volEfectos, t, 0.05);
  };

  // ---------- Instrumentos ----------
  function env(g, t, at, peak, dec, sus, rel, dur) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + at);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0001, peak * sus), t + at + dec);
    g.gain.setValueAtTime(Math.max(0.0001, peak * sus), t + dur);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + rel);
  }
  function pluck(dest, t, f, dur, vol, brillo) {
    const c = A.ctx, g = c.createGain(), fl = c.createBiquadFilter();
    const o1 = c.createOscillator(), o2 = c.createOscillator();
    o1.type = "triangle"; o2.type = "sawtooth"; o1.frequency.value = f; o2.frequency.value = f * 1.003;
    const g2 = c.createGain(); g2.gain.value = 0.25;
    fl.type = "lowpass"; fl.Q.value = 2;
    fl.frequency.setValueAtTime(brillo || 3200, t); fl.frequency.exponentialRampToValueAtTime(500, t + dur * 0.9);
    o1.connect(fl); o2.connect(g2); g2.connect(fl); fl.connect(g); g.connect(dest);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o1.start(t); o2.start(t); o1.stop(t + dur + 0.05); o2.stop(t + dur + 0.05);
  }
  function bajo(dest, t, f, dur, vol, tipo) {
    const c = A.ctx, g = c.createGain(), fl = c.createBiquadFilter(), o = c.createOscillator(), s = c.createOscillator();
    o.type = tipo || "square"; s.type = "sine"; o.frequency.value = f; s.frequency.value = f;
    fl.type = "lowpass"; fl.frequency.setValueAtTime(900, t); fl.frequency.exponentialRampToValueAtTime(220, t + dur);
    const gs = c.createGain(); gs.gain.value = 0.25;
    o.connect(gs); gs.connect(fl); s.connect(fl); fl.connect(g); g.connect(dest);
    env(g, t, 0.01, vol, 0.08, 0.6, 0.05, dur);
    o.start(t); s.start(t); o.stop(t + dur + 0.1); s.stop(t + dur + 0.1);
  }
  function pad(dest, t, notas, dur, vol) {
    const c = A.ctx, g = c.createGain(), fl = c.createBiquadFilter();
    fl.type = "lowpass"; fl.frequency.value = 1100; fl.Q.value = 0.7;
    fl.connect(g); g.connect(dest);
    env(g, t, Math.min(0.5, dur * 0.3), vol, 0.2, 0.8, 0.6, dur);
    notas.forEach((m, i) => {
      [-6, 6].forEach((det) => {
        const o = c.createOscillator(); o.type = "sawtooth"; o.frequency.value = mtof(m); o.detune.value = det + i;
        o.connect(fl); o.start(t); o.stop(t + dur + 0.8);
      });
    });
  }
  function lead(dest, t, f, dur, vol) {
    const c = A.ctx, g = c.createGain(), o = c.createOscillator(), lfo = c.createOscillator(), lg = c.createGain(), fl = c.createBiquadFilter();
    o.type = "square"; o.frequency.value = f; lfo.frequency.value = 5.5; lg.gain.value = f * 0.008;
    lfo.connect(lg); lg.connect(o.frequency); fl.type = "lowpass"; fl.frequency.value = 2200;
    o.connect(fl); fl.connect(g); g.connect(dest);
    env(g, t, 0.02, vol, 0.1, 0.55, 0.12, dur);
    o.start(t); lfo.start(t); o.stop(t + dur + 0.2); lfo.stop(t + dur + 0.2);
  }
  function bombo(dest, t, vol) {
    const c = A.ctx, o = c.createOscillator(), g = c.createGain();
    o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
    o.connect(g); g.connect(dest); o.start(t); o.stop(t + 0.3);
  }
  function ruidoGolpe(dest, t, vol, tipo, frec, dur) {
    const c = A.ctx, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = ruido; f.type = tipo; f.frequency.value = frec; f.Q.value = 0.8;
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(dest); s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.02);
  }

  // ---------- Pistas musicales (generadas por patrones) ----------
  // acordes: intervalos sobre la tónica; un acorde por compás (16 semicorcheas)
  const PISTAS = {
    menu:      { bpm: 96,  raiz: 57, acordes: [[0,3,7,10],[ -4,0,3,7],[3,7,10,14],[ -2,2,5,9]], bajo: "o...o...o.o.o...", arp: [0,1,2,3,2,1,0,1], arpPaso: 2, bombo: "x.......x.......", caja: "....x.......x...", hat: "..x...x...x...x.", padV: 0.05, arpV: 0.06, lead: true },
    puerto:    { bpm: 104, raiz: 62, acordes: [[0,4,7,12],[5,9,12,17],[7,11,14,19],[0,4,7,12],[-3,0,4,9],[5,9,12,17],[7,11,14,19],[7,11,14,17]], bajo: "o.....o.o.......", arp: [0,1,2,1,3,1,2,1], arpPaso: 1, rasgueo: true, bombo: "x.......x.......", caja: "", hat: "x.xxx.xxx.xxx.xx", padV: 0.025, arpV: 0.055, lead: true },
    onda:      { bpm: 112, raiz: 52, acordes: [[0,3,7,10],[0,3,7,10],[5,9,12,15],[5,9,12,15]], bajo: "o..o..o.o.o..o..", arp: [3,2,0,2], arpPaso: 4, bombo: "x.....x...x.....", caja: "....x.......x...", hat: "x.x.x.x.x.x.x.xx", padV: 0.03, arpV: 0.05, lead: true },
    literario: { bpm: 80,  raiz: 65, acordes: [[0,4,7,11],[-3,0,4,7],[2,5,9,12],[-5,-1,2,7]], bajo: "o.......o.......", arp: [0,1,2,3,4,3,2,1], arpPaso: 2, bombo: "", caja: "", hat: "", padV: 0.045, arpV: 0.06, lead: false, octavaArp: true },
    taller:    { bpm: 118, raiz: 48, acordes: [[0,3,7,12],[-4,0,3,8],[-2,2,5,10],[-2,2,5,10]], bajo: "o.o.o.o.o.o.o.o.", arp: [0,2,1,3], arpPaso: 4, bombo: "x...x...x...x...", caja: "....x.......x..x", hat: "..x...x...x...x.", metal: "......x.......x.", padV: 0.02, arpV: 0.045, lead: false },
    persecucion:{ bpm: 140, raiz: 50, acordes: [[0,3,7,12],[-4,0,3,8],[-2,2,5,10],[-5,-1,2,7]], bajo: "oooooooooooooooo", arp: [0,1,2,3], arpPaso: 2, bombo: "x...x...x...x.x.", caja: "....x.......x...", hat: "xxxxxxxxxxxxxxxx", padV: 0.03, arpV: 0.05, lead: true },
    // --- Pistas de las emisoras de radio de la moto ---
    r_alisio:  { bpm: 76,  raiz: 60, acordes: [[0,4,7,11],[2,5,9,12],[4,7,11,14],[-3,0,4,7]], bajo: "o.....o.....o...", arp: [1,3,2,3,1,2], arpPaso: 3, bombo: "x.....x...x.....", caja: "....x.......x...", hat: "..x...x...x...x.", padV: 0.06, arpV: 0.05, lead: false },
    r_timple:  { bpm: 122, raiz: 62, acordes: [[0,4,7,12],[7,11,14,19],[0,4,7,12],[5,9,12,17]], bajo: "o.......o.o.....", arp: [0,1,2,1,3,2,1,2], arpPaso: 1, rasgueo: true, bombo: "x...x...x...x...", caja: "", hat: "..x...x...x...x.", padV: 0.02, arpV: 0.06, lead: true },
    r_rock:    { bpm: 134, raiz: 45, acordes: [[0,7,12,19],[3,10,15,22],[5,12,17,24],[7,14,19,26]], bajo: "oooooooooooooooo", arp: [0,2,1,2], arpPaso: 2, bombo: "x.x...x.x.x...x.", caja: "....x.......x...", hat: "x.x.x.x.x.x.x.x.", metal: "..............x.", padV: 0.015, arpV: 0.05, lead: true },
    r_salsa:   { bpm: 104, raiz: 55, acordes: [[0,4,7,10],[5,9,12,15],[7,11,14,17],[0,4,7,10]], bajo: "o..o..o.o..o..o.", arp: [0,2,1,3,2,1], arpPaso: 2, bombo: "x..x..x.x..x..x.", caja: "..x...x...x...x.", hat: "xxxxxxxxxxxxxxxx", metal: "x..x..x...x.x...", padV: 0.025, arpV: 0.055, lead: true },
    r_clasica: { bpm: 66,  raiz: 62, acordes: [[0,4,7,12],[-3,0,4,9],[-5,-1,2,7],[0,4,7,12]], bajo: "o...............", arp: [0,1,2,3,4,3,2,1], arpPaso: 2, bombo: "", caja: "", hat: "", padV: 0.06, arpV: 0.06, lead: false, octavaArp: true },
    r_palabra: { bpm: 92,  raiz: 58, acordes: [[0,3,7,10],[5,8,12,15],[3,7,10,14],[7,10,14,17]], bajo: "o.......o.o.....", arp: [0,2,1,2], arpPaso: 4, bombo: "x.......x.......", caja: "", hat: "..x...x...x...x.", padV: 0.035, arpV: 0.04, lead: false },
    mision:    { bpm: 88,  raiz: 60, acordes: [[0,4,7,11],[-3,0,4,7],[-7,-3,0,4],[-5,-1,2,5]], bajo: "o.......o...o...", arp: [0,2,1,3], arpPaso: 4, bombo: "", caja: "", hat: "....x.......x...", padV: 0.04, arpV: 0.04, lead: false }
  };
  const PAT = (s, i) => s && s.length ? s[i % s.length] : ".";

  function programar() {
    if (!A.ctx || !A.pista) return;
    const p = PISTAS[A.pista]; if (!p) return;
    const dt = 60 / p.bpm / 4;
    while (A.siguiente < A.ctx.currentTime + 0.12) {
      tocarPaso(p, A.paso, A.siguiente, dt);
      A.paso++; A.siguiente += dt;
    }
  }
  function tocarPaso(p, i, t, dt) {
    const d = gMusica, comp = i % 16, compas = Math.floor(i / 16);
    const ac = p.acordes[compas % p.acordes.length].map((x) => x + p.raiz);
    if (comp === 0 && p.padV) pad(d, t, ac.map((m) => m), dt * 15, p.padV);
    if (PAT(p.bajo, comp) === "o") bajo(d, t, mtof(ac[0] - 12), dt * 1.8, 0.16);
    if (p.arpPaso && comp % p.arpPaso === 0) {
      const k = p.arp[(comp / p.arpPaso) % p.arp.length];
      let m = ac[k % ac.length] + (k >= ac.length ? 12 : 0) + (p.octavaArp ? 12 : 12);
      pluck(d, t, mtof(m), dt * (p.arpPaso + 2), p.arpV, p.rasgueo ? 2600 : 3400);
      if (p.rasgueo && (comp === 4 || comp === 12)) ac.forEach((n, j) => pluck(d, t + j * 0.012, mtof(n + 12), dt * 3, p.arpV * 0.6, 2200));
    }
    if (PAT(p.bombo, comp) === "x") bombo(d, t, 0.5);
    if (PAT(p.caja, comp) === "x") ruidoGolpe(d, t, 0.22, "bandpass", 1800, 0.14);
    if (PAT(p.hat, comp) === "x") ruidoGolpe(d, t, comp % 4 === 2 ? 0.09 : 0.05, "highpass", 7000, 0.05);
    if (PAT(p.metal, comp) === "x") ruidoGolpe(d, t, 0.1, "bandpass", 4200, 0.2);
    if (p.lead && compas % 4 >= 2) {
      // melodía sencilla y determinista sobre notas del acorde
      const sem = (compas * 7 + comp * 13) % 11;
      if (comp % 4 === 0 && sem < 6) lead(d, t, mtof(ac[(sem + compas) % ac.length] + 24), dt * (sem < 3 ? 3 : 1.6), 0.035);
    }
  }

  // ---------- Emisoras de radio (la música de la moto mientras se conduce) ----------
  // "auto" = la música cambia según el barrio. El resto fijan un estilo; "off" apaga la música.
  A.RADIOS = [
    { id: "auto",    nombre: "Radio Onda Volcán", frec: "98.4",  estilo: "La música cambia según el barrio", pista: null },
    { id: "alisio",  nombre: "Alisio FM",         frec: "92.7",  estilo: "Chill y tranquila",               pista: "r_alisio" },
    { id: "timple",  nombre: "Timple y Brisa",    frec: "101.3", estilo: "Folclore canario con rasgueo",    pista: "r_timple" },
    { id: "rock",    nombre: "Roque Rock",        frec: "105.5", estilo: "Rock con mucha energía",          pista: "r_rock" },
    { id: "salsa",   nombre: "Salsa del Atlántico", frec: "96.1", estilo: "Ritmos latinos para bailar",     pista: "r_salsa" },
    { id: "clasica", nombre: "Radio Teide Clásica", frec: "88.9", estilo: "Música suave de cuerdas",        pista: "r_clasica" },
    { id: "palabra", nombre: "Radio Palabra",     frec: "99.9",  estilo: "¿Sabías que…? Curiosidades de la lengua", pista: "r_palabra" },
    { id: "off",     nombre: "Radio apagada",     frec: "",      estilo: "Solo el motor y la ciudad",       pista: null }
  ];
  A.radioActual = function () { return A.RADIOS.find((r) => r.id === PP.ajustes.emisora) || A.RADIOS[0]; };

  A.musica = function (nombre) {
    if (!A.ctx) { A._pendiente = nombre; return; }
    if (A.pista === nombre) return;
    A.pista = nombre; A.paso = 0; A.siguiente = A.ctx.currentTime + 0.1;
    // pequeño fundido
    const t = A.ctx.currentTime; gMusica.gain.cancelScheduledValues(t);
    gMusica.gain.setValueAtTime(0.0001, t); gMusica.gain.linearRampToValueAtTime(PP.ajustes.volMusica * 0.5, t + 1.2);
  };
  A.pararMusica = function () { A.pista = null; };

  // ---------- Motor ----------
  A.motor = function (v01, activo) {
    if (!A.ctx) return;
    const t = A.ctx.currentTime;
    motorGain.gain.setTargetAtTime(activo ? 0.035 + v01 * 0.05 : 0, t, 0.08);
    motorOsc.frequency.setTargetAtTime(45 + v01 * 95, t, 0.1);
    A._o2.frequency.setTargetAtTime(22 + v01 * 48, t, 0.1);
    motorFilt.frequency.setTargetAtTime(240 + v01 * 900, t, 0.1);
  };

  // ---------- Efectos ----------
  A.sfx = function (n) {
    if (!A.ctx || PP.ajustes.silencio) return;
    const c = A.ctx, t = c.currentTime + 0.005, d = gEfectos, v = 1 + (Math.random() - 0.5) * 0.06;
    switch (n) {
      case "clic": pluck(d, t, 1200 * v, 0.06, 0.15, 5000); break;
      case "hover": pluck(d, t, 1800 * v, 0.04, 0.05, 5000); break;
      case "bien": [0, 4, 7, 12].forEach((s, i) => pluck(d, t + i * 0.06, mtof(72 + s) * v, 0.3, 0.2, 4200)); break;
      case "mal": pluck(d, t, mtof(57) * v, 0.22, 0.18, 1500); pluck(d, t + 0.12, mtof(53) * v, 0.3, 0.16, 1200); break;
      case "recoger": [0, 7, 12, 19].forEach((s, i) => pluck(d, t + i * 0.035, mtof(79 + s) * v, 0.2, 0.12, 6000)); break;
      case "dorada": [0, 4, 7, 11, 14, 19].forEach((s, i) => pluck(d, t + i * 0.05, mtof(76 + s), 0.5, 0.12, 6000)); break;
      case "foto": ruidoGolpe(d, t, 0.5, "highpass", 3000, 0.06); ruidoGolpe(d, t + 0.08, 0.35, "bandpass", 2000, 0.05); break;
      case "pagina": ruidoGolpe(d, t, 0.25, "bandpass", 2600, 0.25); break;
      case "pito": [0, 0.18].forEach((dd) => { const o = c.createOscillator(), g = c.createGain(); o.type = "square"; o.frequency.value = 440; const o2 = c.createOscillator(); o2.type = "square"; o2.frequency.value = 554; o.connect(g); o2.connect(g); g.connect(d); env(g, t + dd, 0.01, 0.06, 0.05, 0.8, 0.05, 0.12); o.start(t + dd); o2.start(t + dd); o.stop(t + dd + 0.25); o2.stop(t + dd + 0.25); }); break;
      case "choque": bombo(d, t, 0.7); ruidoGolpe(d, t, 0.2, "lowpass", 400, 0.2); break;
      case "inicio": { const o = c.createOscillator(), g = c.createGain(); o.type = "sawtooth"; o.frequency.setValueAtTime(220, t); o.frequency.exponentialRampToValueAtTime(880, t + 0.6); const f = c.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 2000; o.connect(f); f.connect(g); g.connect(d); env(g, t, 0.05, 0.08, 0.3, 0.6, 0.2, 0.55); o.start(t); o.stop(t + 0.9); [0, 4, 7].forEach((s) => pluck(d, t + 0.6, mtof(72 + s), 0.6, 0.12, 4000)); break; }
      case "victoria": [[0, 0], [4, 0.12], [7, 0.24], [12, 0.36], [7, 0.54], [12, 0.66], [16, 0.78]].forEach(([s, dd]) => { pluck(d, t + dd, mtof(67 + s), 0.5, 0.18, 4500); lead(d, t + dd, mtof(79 + s), 0.18, 0.04); }); [0, 4, 7, 12].forEach((s) => pluck(d, t + 1.0, mtof(55 + s), 1.2, 0.12, 2500)); break;
      case "estrella": pluck(d, t, mtof(88) * v, 0.5, 0.15, 7000); pluck(d, t + 0.05, mtof(95) * v, 0.5, 0.1, 7000); break;
      case "tecla": ruidoGolpe(d, t, 0.12 * v, "bandpass", 3500 * v, 0.03); break;
      case "whoosh": { const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); s.buffer = ruido; f.type = "bandpass"; f.frequency.setValueAtTime(400, t); f.frequency.exponentialRampToValueAtTime(3000, t + 0.3); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.25, t + 0.12); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35); s.connect(f); f.connect(g); g.connect(d); s.start(t); s.stop(t + 0.4); break; }
      case "turbo": { const o = c.createOscillator(), g = c.createGain(); o.type = "sawtooth"; o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(600, t + 0.4); const f = c.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 1500; o.connect(f); f.connect(g); g.connect(d); env(g, t, 0.02, 0.12, 0.2, 0.5, 0.15, 0.35); o.start(t); o.stop(t + 0.6); break; }
      case "frenazo": ruidoGolpe(d, t, 0.25, "bandpass", 900, 0.45); break;
      case "desbloqueo": [0, 7, 12, 16, 19, 24].forEach((s, i) => pluck(d, t + i * 0.07, mtof(67 + s), 0.6, 0.14, 5000)); break;
      case "salto": { const o = c.createOscillator(), g = c.createGain(); o.type = "square"; o.frequency.setValueAtTime(330, t); o.frequency.exponentialRampToValueAtTime(880, t + 0.14); const f = c.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 2400; o.connect(f); f.connect(g); g.connect(d); env(g, t, 0.005, 0.03, 0.12, 0.4, 0.05, 0.16); o.start(t); o.stop(t + 0.2); break; }
      case "golpe": ruidoGolpe(d, t, 0.45, "highpass", 1800, 0.05); pluck(d, t, mtof(84), 0.12, 0.1, 6000); break;
      case "radio": ruidoGolpe(d, t, 0.15, "bandpass", 1200, 0.5); break;
      default: break;
    }
  };

  PP.Audio = A;
})();
