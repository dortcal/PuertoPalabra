/* Puerto Palabra · Generación y dibujo de la ciudad (vista cenital 2D).
   Ciudad canaria ficticia generada de forma determinista (misma ciudad en cada partida).
   Rendimiento: el suelo y los edificios se pre-dibujan en «trozos» (chunks) bajo demanda. */
window.PP = window.PP || {};
(function () {
  "use strict";
  const U = PP.U;
  const T = 48, W = 72, H = 56, CH = 12; // tamaño de tesela, ancho/alto en teselas, chunk en teselas
  const TIPO = { CESPED: 0, CALLE: 1, ACERA: 2, EDIF: 3, AGUA: 4, ARENA: 5, PLAZA: 6, MUELLE: 7, MONTE: 8, ARBOL: 9 };
  const XS = [1, 13, 25, 37, 49, 61, 69];  // columnas de calles verticales (2 de ancho)
  const YS = [1, 11, 21, 31, 41];          // filas de calles horizontales (2 de alto)
  const COSTA = 44;                        // inicio de la arena

  const C = { T, W, H, TIPO, grid: new Uint8Array(W * H), edificios: [], arboles: [], luces: [], lugares: {}, chunks: {}, decor: [] };
  const rnd = U.seeded(20221110);

  const at = (x, y) => (x < 0 || y < 0 || x >= W || y >= H) ? TIPO.AGUA : C.grid[y * W + x];
  const set = (x, y, t) => { if (x >= 0 && y >= 0 && x < W && y < H) C.grid[y * W + x] = t; };
  C.at = at;
  C.conducible = (t) => t === TIPO.CALLE || t === TIPO.MUELLE || t === TIPO.ARENA;
  C.peatonal = (t) => t === TIPO.ACERA || t === TIPO.PLAZA;
  C.esVolcan = (x, y) => x >= 26 && x <= 48 && y <= 10;

  C.barrioDe = function (tx, ty) {
    if (ty >= 32) return "puerto";
    if (tx < 25) return "literario";
    if (tx >= 49) return "taller";
    if (ty <= 10) return "volcan";
    return "onda";
  };
  C.rectBarrio = {
    literario: [0, 0, 25, 32], taller: [49, 0, 23, 32], onda: [25, 11, 24, 21], puerto: [0, 32, 72, 24]
  };

  // ---------------- Generación ----------------
  function generar() {
    C.grid.fill(TIPO.CESPED);
    // mar y arena
    for (let y = COSTA; y < H; y++) for (let x = 0; x < W; x++) set(x, y, y < COSTA + 2 ? TIPO.ARENA : TIPO.AGUA);
    // calles
    YS.forEach((y) => { for (let x = 0; x < W; x++) { set(x, y, TIPO.CALLE); set(x, y + 1, TIPO.CALLE); } });
    XS.forEach((x) => { for (let y = 0; y < COSTA; y++) { set(x, y, TIPO.CALLE); set(x + 1, y, TIPO.CALLE); } });
    // volcán: elimina calles en su interior
    for (let y = 0; y <= 10; y++) for (let x = 26; x <= 48; x++) if (!(y <= 2 && (x <= 26 || x >= 48))) set(x, y, TIPO.MONTE);
    for (let y = 0; y <= 10; y++) { set(25, y, TIPO.CALLE); set(26, y, TIPO.CALLE); set(49, y, TIPO.CALLE); set(50, y, TIPO.CALLE); }
    // aceras alrededor de cada manzana
    for (let y = 0; y < COSTA; y++) for (let x = 0; x < W; x++) {
      if (at(x, y) !== TIPO.CESPED) continue;
      let junto = false;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (at(x + dx, y + dy) === TIPO.CALLE) junto = true;
      if (junto) set(x, y, TIPO.ACERA);
    }

    // manzanas
    for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) {
      const x0 = XS[i] + 3, x1 = XS[i + 1] - 2, y0 = YS[j] + 3, y1 = YS[j + 1] - 2;
      if (i >= 2 && i <= 3 && j === 0) continue; // volcán
      manzana(i, j, x0, y0, x1, y1);
    }
    costa();
    volcan();
    // luces de farolas a lo largo de las calles
    for (let y = 0; y < COSTA; y++) for (let x = 0; x < W; x++) {
      if (at(x, y) === TIPO.ACERA && (x + y * 3) % 7 === 0) {
        const callesCerca = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, b]) => at(x + a, y + b) === TIPO.CALLE);
        if (callesCerca) C.luces.push({ x: x * T + T / 2, y: y * T + T / 2, r: 120, c: "255,214,140", farola: true });
      }
    }
  }

  const PALETAS = {
    literario: { tejado: ["#c8553d", "#b84a33", "#d0663f", "#a8432f"], plano: ["#efe4cf", "#e9d8b4", "#f3ece0"], borde: ["#7a4b2a", "#2f6b4f", "#5b3a7a"] },
    onda: { tejado: ["#41557a", "#2f6f8f", "#4b5d74", "#3a7c8c"], plano: ["#c9d3df", "#b5c2d0", "#dfe6ee"], borde: ["#1f2b44", "#25455c"] },
    taller: { tejado: ["#8c5a3c", "#9a9a9a", "#b36a32", "#7d8188"], plano: ["#b9b2a6", "#a8a39b"], borde: ["#4a3a2f", "#3b3f44"] },
    puerto: { tejado: ["#f2c14e", "#4f86c6", "#5bb98c", "#e86f8a", "#e0a458", "#7cc6d6"], plano: ["#f7f3ea", "#fff8ee", "#f2ece2"], borde: ["#f2c14e", "#4f86c6", "#5bb98c", "#e86f8a"] }
  };

  function edificio(x, y, w, h, barrio, extra) {
    const p = PALETAS[barrio] || PALETAS.onda;
    const estilo = barrio === "literario" ? (rnd() < 0.7 ? "teja" : "azotea") : barrio === "taller" ? (rnd() < 0.7 ? "nave" : "azotea") : barrio === "onda" ? (rnd() < 0.55 ? "torre" : "azotea") : "azotea";
    const b = Object.assign({ x, y, w, h, barrio, estilo, alto: barrio === "onda" ? 0.7 + rnd() * 0.9 : 0.35 + rnd() * 0.35,
      color: U.pick.call(null, estilo === "azotea" ? p.plano : p.tejado), borde: p.borde[Math.floor(rnd() * p.borde.length)], semilla: rnd() }, extra || {});
    if (barrio === "puerto" && b.estilo === "azotea") b.borde = p.tejado[Math.floor(rnd() * p.tejado.length)];
    C.edificios.push(b);
    for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) set(xx, yy, TIPO.EDIF);
    return b;
  }

  function arbol(px, py, tipo, r) { C.arboles.push({ x: px, y: py, tipo, r: r || 16 + rnd() * 8, s: rnd() }); }

  // Lugares emblemáticos (destinos de misiones)
  const LUGARES_DEF = {
    // clave: [i, j, lado ('abajo'|'arriba'), nombre, barrio, tipo]
    radio:        [2, 1, "abajo", "Radio Onda Volcán", "onda", "radio"],
    periodico:    [3, 1, "abajo", "Redacción de El Eco", "onda", "periodico"],
    ayuntamiento: [2, 2, "arriba", "Ayuntamiento", "onda", "ayuntamiento"],
    plaza:        [2, 2, "abajo", "Plaza Mayor", "onda", "plaza"],
    cine:         [3, 2, "abajo", "Cine Atlántico", "onda", "cine"],
    casaPoeta:    [1, 0, "abajo", "Casa de la Poeta", "literario", "casaPoeta"],
    parque:       [0, 1, "abajo", "Parque de los Dragos", "literario", "parque"],
    biblioteca:   [1, 1, "abajo", "Biblioteca Municipal", "literario", "biblioteca"],
    teatro:       [0, 2, "abajo", "Teatro de la Luna", "literario", "teatro"],
    colegio:      [1, 2, "abajo", "Colegio La Laja", "literario", "colegio"],
    imprenta:     [5, 0, "abajo", "Imprenta Tinta Fresca", "taller", "imprenta"],
    taller:       [4, 1, "abajo", "Taller de Tuneo", "taller", "taller"],
    fabrica:      [4, 2, "abajo", "Fábrica de Palabras", "taller", "fabrica"],
    circuito:     [5, 2, "abajo", "Entrada a la Autopista", "taller", "circuito"],
    mercado:      [2, 3, "abajo", "Mercado del Puerto", "puerto", "mercado"],
    estacion:     [4, 3, "abajo", "Estación de Guaguas", "puerto", "estacion"],
    museo:        [1, 3, "abajo", "Museo del Mar", "puerto", "museo"],
    academia:     [4, 0, "abajo", "Academia de las Tildes", "taller", "academia"],
    almacen:      [5, 1, "abajo", "Almacén de Palabras", "taller", "almacen"]
  };

  function manzana(i, j, x0, y0, x1, y1) {
    const barrio = C.barrioDe(x0, y0);
    const especial = Object.keys(LUGARES_DEF).filter((k) => LUGARES_DEF[k][0] === i && LUGARES_DEF[k][1] === j);
    const w = x1 - x0 + 1, h = y1 - y0 + 1;
    if (especial.includes("plaza")) {
      // plaza con ayuntamiento en la mitad superior
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) set(x, y, TIPO.PLAZA);
      edificio(x0 + 2, y0, w - 4, 3, barrio, { especial: "ayuntamiento", alto: 1.1, estilo: "noble", color: "#e8dcc2" });
      C.decor.push({ tipo: "fuente", x: (x0 + w / 2) * T, y: (y0 + 4.6) * T });
      [[x0 + 0.8, y0 + 3.8], [x1 + 0.2, y0 + 3.8], [x0 + 0.8, y1 + 0.2], [x1 + 0.2, y1 + 0.2]].forEach(([a, b]) => arbol(a * T, b * T, "laurel", 26));
      registrar("plaza", i, j, "abajo"); registrar("ayuntamiento", i, j, "arriba");
      return;
    }
    if (especial.includes("parque")) {
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) set(x, y, TIPO.PLAZA);
      for (let k = 0; k < 9; k++) arbol((x0 + 0.8 + rnd() * (w - 1.6)) * T, (y0 + 0.8 + rnd() * (h - 1.6)) * T, k % 3 === 0 ? "drago" : "laurel", k % 3 === 0 ? 30 : 20);
      C.decor.push({ tipo: "cesped", x: x0 * T, y: y0 * T, w: w * T, h: h * T });
      registrar("parque", i, j, "abajo");
      return;
    }
    if (especial.length) {
      const k = especial[0], def = LUGARES_DEF[k];
      const b = edificio(x0 + 1, y0 + 1, w - 2, h - 2, barrio, { especial: def[5], alto: k === "radio" ? 1.6 : 0.9 });
      if (k === "mercado") b.estilo = "mercado";
      if (k === "estacion") b.estilo = "estacion";
      // jardín alrededor
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (at(x, y) === TIPO.CESPED) set(x, y, TIPO.PLAZA);
      if (barrio !== "taller") { arbol((x0 + 0.5) * T, (y0 + 0.5) * T, barrio === "puerto" ? "palmera" : "laurel"); arbol((x1 + 0.5) * T, (y1 + 0.5) * T, barrio === "puerto" ? "palmera" : "laurel"); }
      registrar(k, i, j, def[2]);
      return;
    }
    // manzana corriente: parcelas
    let x = x0;
    while (x <= x1) {
      const pw = Math.min(x1 - x + 1, 2 + Math.floor(rnd() * 3));
      let y = y0;
      while (y <= y1) {
        const ph = Math.min(y1 - y + 1, 2 + Math.floor(rnd() * 3));
        if (rnd() < 0.12 && barrio !== "taller") { arbol((x + pw / 2) * T, (y + ph / 2) * T, barrio === "puerto" ? "palmera" : rnd() < 0.3 ? "drago" : "laurel"); }
        else edificio(x, y, pw, ph, barrio);
        y += ph;
      }
      x += pw;
    }
  }

  function registrar(k, i, j, lado) {
    const def = LUGARES_DEF[k];
    const cx = Math.floor((XS[i] + XS[i + 1]) / 2) + 1;
    const ty = lado === "abajo" ? YS[j + 1] : YS[j] + 1;
    C.lugares[k] = { clave: k, nombre: def[3], barrio: def[4], tx: cx, ty, x: cx * T + T / 2, y: ty * T + T / 2 };
  }

  function costa() {
    // Muelle (plataforma y pantalanes)
    for (let y = COSTA; y <= COSTA + 4; y++) for (let x = 27; x <= 36; x++) set(x, y, TIPO.MUELLE);
    for (let y = COSTA + 5; y <= COSTA + 9; y++) { set(29, y, TIPO.MUELLE); set(30, y, TIPO.MUELLE); set(34, y, TIPO.MUELLE); set(35, y, TIPO.MUELLE); }
    for (let x = 25; x <= 26; x++) set(x, COSTA, TIPO.MUELLE), set(x, COSTA + 1, TIPO.MUELLE);
    // contenedores
    const colores = ["#e4572e", "#29335c", "#f3a712", "#669bbc", "#2a9d8f", "#c1121f"];
    for (let k = 0; k < 6; k++) C.decor.push({ tipo: "contenedor", x: (31 + (k % 3) * 1.6) * T, y: (COSTA + 1.2 + Math.floor(k / 3) * 1.2) * T, c: colores[k] });
    C.decor.push({ tipo: "grua", x: 28 * T, y: (COSTA + 2) * T });
    C.decor.push({ tipo: "ferry", x: 32.5 * T, y: (COSTA + 7.5) * T });
    C.decor.push({ tipo: "barca", x: 37.5 * T, y: (COSTA + 5.5) * T, c: "#e86f8a" }, { tipo: "barca", x: 27.4 * T, y: (COSTA + 6.8) * T, c: "#4f86c6" });
    C.lugares.muelle = { clave: "muelle", nombre: "Muelle de las Lenguas", barrio: "puerto", tx: 32, ty: COSTA + 3, x: 32 * T + T / 2, y: (COSTA + 3) * T + T / 2 };
    // Faro (espigón al este)
    for (let y = COSTA; y <= COSTA + 6; y++) { set(64, y, TIPO.MUELLE); set(65, y, TIPO.MUELLE); }
    for (let y = COSTA + 6; y <= COSTA + 8; y++) for (let x = 63; x <= 66; x++) set(x, y, TIPO.MUELLE);
    C.decor.push({ tipo: "faro", x: 65 * T, y: (COSTA + 7.6) * T });
    C.lugares.faro = { clave: "faro", nombre: "Faro de la Punta", barrio: "puerto", tx: 64, ty: COSTA + 5, x: 64 * T + T / 2, y: (COSTA + 5) * T + T / 2 };
    C.luces.push({ x: 65 * T, y: (COSTA + 7.6) * T, r: 220, c: "255,240,190", faro: true });
    // Playa (más ancha al oeste)
    for (let y = COSTA + 2; y <= COSTA + 4; y++) for (let x = 3; x <= 21; x++) set(x, y, TIPO.ARENA);
    for (let k = 0; k < 9; k++) C.decor.push({ tipo: "sombrilla", x: (4 + k * 2 + rnd()) * T, y: (COSTA + 2.6 + rnd() * 1.6) * T, c: ["#ff5d73", "#ffd23f", "#3bceac", "#7b6cf6"][k % 4] });
    C.lugares.playa = { clave: "playa", nombre: "Playa Chica", barrio: "puerto", tx: 12, ty: COSTA + 1, x: 12 * T + T / 2, y: (COSTA + 1) * T + T / 2 };
    for (let k = 0; k < 14; k++) arbol((2 + k * 5 + rnd() * 2) * T, 43.5 * T, "palmera", 18);
  }

  function volcan() {
    C.decor.push({ tipo: "volcan", x: 37.5 * T, y: 5.5 * T });
    C.lugares.mirador = { clave: "mirador", nombre: "Mirador del Volcán", barrio: "volcan", tx: 37, ty: 11, x: 37 * T + T / 2, y: 11 * T + T / 2 };
    for (let k = 0; k < 26; k++) {
      const a = (k / 26) * Math.PI * 2, r = 8.6 + rnd() * 1.6;
      const x = 37.5 + Math.cos(a) * r * 1.25, y = 5.5 + Math.sin(a) * r * 0.62;
      if (y > 0.4 && y < 10.4 && x > 26.5 && x < 48.5) arbol(x * T, y * T, "pino", 18);
    }
  }

  // ---------------- Dibujo estático (chunks) ----------------
  function dibujarSuelo(g, x0, y0, x1, y1) {
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      const t = at(x, y), px = x * T, py = y * T;
      switch (t) {
        case TIPO.CALLE: {
          g.fillStyle = "#3b3f4a"; g.fillRect(px, py, T, T);
          g.fillStyle = "rgba(255,255,255,0.025)"; if ((x * 7 + y * 13) % 5 === 0) g.fillRect(px + 8, py + 12, 10, 6);
          const hz = at(x - 1, y) === TIPO.CALLE && at(x + 1, y) === TIPO.CALLE && (at(x, y - 1) !== TIPO.CALLE || at(x, y + 1) !== TIPO.CALLE);
          const vt = at(x, y - 1) === TIPO.CALLE && at(x, y + 1) === TIPO.CALLE && (at(x - 1, y) !== TIPO.CALLE || at(x + 1, y) !== TIPO.CALLE);
          const esInter = !hz && !vt;
          g.fillStyle = "#f2d16b";
          if (hz && at(x, y + 1) === TIPO.CALLE && at(x, y - 1) !== TIPO.CALLE && x % 2 === 0) g.fillRect(px + 6, py + T - 2, T - 12, 4);
          if (vt && at(x + 1, y) === TIPO.CALLE && at(x - 1, y) !== TIPO.CALLE && y % 2 === 0) g.fillRect(px + T - 2, py + 6, 4, T - 12);
          if (esInter) {
            // pasos de cebra en los bordes del cruce
            g.fillStyle = "rgba(255,255,255,0.55)";
            if (at(x, y - 1) === TIPO.ACERA || at(x, y - 2) === TIPO.ACERA) {}
          }
          break;
        }
        case TIPO.ACERA:
          g.fillStyle = "#b9b4aa"; g.fillRect(px, py, T, T);
          g.fillStyle = "#a9a49a"; g.fillRect(px, py, T, 1); g.fillRect(px, py, 1, T); g.fillRect(px + T / 2, py, 1, T); g.fillRect(px, py + T / 2, T, 1);
          break;
        case TIPO.PLAZA:
          g.fillStyle = (x + y) % 2 ? "#d8cdb6" : "#d1c5ac"; g.fillRect(px, py, T, T);
          break;
        case TIPO.EDIF: g.fillStyle = "#8d877c"; g.fillRect(px, py, T, T); break;
        case TIPO.ARENA: {
          g.fillStyle = "#ecd9a6"; g.fillRect(px, py, T, T);
          g.fillStyle = "rgba(160,120,60,0.18)"; for (let k = 0; k < 4; k++) g.fillRect(px + ((x * 31 + k * 17) % T), py + ((y * 17 + k * 23) % T), 2, 2);
          break;
        }
        case TIPO.AGUA: {
          const prof = U.clamp((y - COSTA - 2) / 9, 0, 1);
          g.fillStyle = "rgb(" + Math.round(56 - prof * 30) + "," + Math.round(170 - prof * 80) + "," + Math.round(200 - prof * 40) + ")";
          g.fillRect(px, py, T, T);
          if (at(x, y - 1) === TIPO.ARENA) { g.fillStyle = "rgba(255,255,255,0.55)"; g.fillRect(px, py, T, 4); }
          break;
        }
        case TIPO.MUELLE:
          g.fillStyle = "#8a6b4e"; g.fillRect(px, py, T, T);
          g.fillStyle = "#735740"; for (let k = 0; k < T; k += 8) g.fillRect(px, py + k, T, 2);
          break;
        case TIPO.MONTE: g.fillStyle = "#6b4a3a"; g.fillRect(px, py, T, T); break;
        default: {
          g.fillStyle = "#5fae5a"; g.fillRect(px, py, T, T);
          g.fillStyle = "rgba(30,90,40,0.25)"; for (let k = 0; k < 3; k++) g.fillRect(px + ((x * 13 + k * 19) % T), py + ((y * 29 + k * 11) % T), 3, 3);
        }
      }
    }
    // pasos de cebra: junto a cada cruce, sobre la calle
    g.fillStyle = "rgba(255,255,255,0.75)";
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      if (at(x, y) !== TIPO.CALLE) continue;
      const interH = at(x, y - 1) === TIPO.CALLE && at(x, y + 1) === TIPO.CALLE; // dentro de calle vertical
      const interV = at(x - 1, y) === TIPO.CALLE && at(x + 1, y) === TIPO.CALLE;
      if (interH && interV) continue;
      // cebra vertical en calle horizontal pegada a un cruce
      if (XS.some((cx) => x === cx - 1 || x === cx + 2) && YS.some((cy) => y === cy || y === cy + 1)) {
        for (let k = 4; k < T; k += 10) g.fillRect(x * T + 10, y * T + k, T - 20, 5);
      }
      if (YS.some((cy) => y === cy - 1 || y === cy + 2) && XS.some((cx) => x === cx || x === cx + 1) && y < COSTA) {
        for (let k = 4; k < T; k += 10) g.fillRect(x * T + k, y * T + 10, 5, T - 20);
      }
    }
  }

  function texto(g, s, x, y, tam, color) {
    g.save(); g.font = "800 " + tam + "px 'Trebuchet MS', 'Segoe UI', sans-serif"; g.textAlign = "center"; g.textBaseline = "middle";
    g.fillStyle = "rgba(0,0,0,0.25)"; g.fillText(s, x + 2, y + 2); g.fillStyle = color || "#fff"; g.fillText(s, x, y); g.restore();
  }

  function dibujarEdificio(g, b) {
    const x = b.x * T, y = b.y * T, w = b.w * T, h = b.h * T, r = U.seeded(Math.floor(b.semilla * 1e6));
    const sh = 8 + b.alto * 14;
    // sombra proyectada
    g.fillStyle = "rgba(0,0,0,0.28)";
    g.beginPath(); g.moveTo(x + w, y + 4); g.lineTo(x + w + sh, y + 4 + sh); g.lineTo(x + w + sh, y + h + sh); g.lineTo(x + 4 + sh, y + h + sh); g.lineTo(x + 4, y + h); g.lineTo(x + w, y + h); g.closePath(); g.fill();
    const m = 3;
    if (b.estilo === "teja") {
      g.fillStyle = b.color; g.fillRect(x + m, y + m, w - 2 * m, h - 2 * m);
      // faldones
      g.fillStyle = "rgba(0,0,0,0.18)"; g.beginPath(); g.moveTo(x + m, y + h / 2); g.lineTo(x + w - m, y + h / 2); g.lineTo(x + w - m, y + h - m); g.lineTo(x + m, y + h - m); g.fill();
      g.strokeStyle = "rgba(0,0,0,0.18)"; g.lineWidth = 1;
      for (let k = x + m + 6; k < x + w - m; k += 7) { g.beginPath(); g.moveTo(k, y + m); g.lineTo(k, y + h - m); g.stroke(); }
      g.fillStyle = U.shade(b.color, 0.25); g.fillRect(x + m, y + h / 2 - 2, w - 2 * m, 4);
    } else if (b.estilo === "nave") {
      g.fillStyle = b.color; g.fillRect(x + m, y + m, w - 2 * m, h - 2 * m);
      g.fillStyle = "rgba(255,255,255,0.12)";
      for (let k = y + m; k < y + h - m; k += 6) g.fillRect(x + m, k, w - 2 * m, 2);
      g.fillStyle = "rgba(170,220,255,0.55)"; for (let k = 0; k < Math.floor(w / 40); k++) g.fillRect(x + 14 + k * 40, y + h / 2 - 8, 18, 16);
    } else if (b.estilo === "torre") {
      const gr = g.createLinearGradient(x, y, x + w, y + h); gr.addColorStop(0, U.shade(b.color, 0.25)); gr.addColorStop(1, U.shade(b.color, -0.2));
      g.fillStyle = gr; g.fillRect(x + m, y + m, w - 2 * m, h - 2 * m);
      g.strokeStyle = "rgba(255,255,255,0.18)"; g.lineWidth = 2; g.strokeRect(x + m + 6, y + m + 6, w - 2 * m - 12, h - 2 * m - 12);
      if (r() < 0.5) { g.strokeStyle = "rgba(255,255,255,0.5)"; g.lineWidth = 3; g.beginPath(); g.arc(x + w / 2, y + h / 2, Math.min(w, h) / 4, 0, Math.PI * 2); g.stroke(); texto(g, "H", x + w / 2, y + h / 2, 18, "rgba(255,255,255,0.7)"); }
      else { g.fillStyle = "#4caf6a"; g.fillRect(x + m + 10, y + m + 10, w / 3, h / 3); }
    } else if (b.estilo === "mercado") {
      const cols = ["#ff5d73", "#ffd23f", "#3bceac", "#7b6cf6"];
      for (let k = 0; k * 24 < w - 2 * m; k++) { g.fillStyle = cols[k % 4]; g.fillRect(x + m + k * 24, y + m, 24, h - 2 * m); g.fillStyle = "rgba(255,255,255,0.35)"; g.fillRect(x + m + k * 24, y + m, 12, h - 2 * m); }
      texto(g, "MERCADO", x + w / 2, y + h / 2, 26, "#fff");
    } else if (b.estilo === "estacion") {
      g.fillStyle = "#e9e4d8"; g.fillRect(x + m, y + m, w - 2 * m, h - 2 * m);
      for (let k = 0; k < 3; k++) { const bx = x + 16, by = y + 18 + k * (h - 36) / 3; g.fillStyle = "#f2c14e"; g.fillRect(bx, by, w - 32, 34); g.fillStyle = "#2b6e9e"; g.fillRect(bx, by + 12, w - 32, 6); g.fillStyle = "#cde8ff"; g.fillRect(bx + 8, by + 4, w - 48, 6); }
      texto(g, "GUAGUAS", x + w / 2, y + h - 18, 20, "#2b3a55");
    } else { // azotea / noble
      g.fillStyle = b.borde; g.fillRect(x + m, y + m, w - 2 * m, h - 2 * m);
      g.fillStyle = b.color; g.fillRect(x + m + 5, y + m + 5, w - 2 * m - 10, h - 2 * m - 10);
      if (b.estilo !== "noble") {
        // depósitos de agua y detalles típicos de azotea canaria
        const n = 1 + Math.floor(r() * 2);
        for (let k = 0; k < n; k++) { const tx = x + 16 + r() * (w - 36), ty = y + 16 + r() * (h - 36); g.fillStyle = "rgba(0,0,0,0.25)"; g.beginPath(); g.arc(tx + 3, ty + 3, 8, 0, 7); g.fill(); g.fillStyle = r() < 0.5 ? "#2b2b2b" : "#e9eef2"; g.beginPath(); g.arc(tx, ty, 8, 0, 7); g.fill(); }
        if (r() < 0.4) { g.fillStyle = "#2f4f7a"; const sx = x + w - 34, sy = y + 12; g.fillRect(sx, sy, 20, 14); g.strokeStyle = "#9cc3e6"; g.lineWidth = 1; g.strokeRect(sx, sy, 20, 14); g.beginPath(); g.moveTo(sx + 10, sy); g.lineTo(sx + 10, sy + 14); g.stroke(); }
        if (r() < 0.3 && b.barrio === "puerto") { g.fillStyle = "#c94f7c"; for (let k = 0; k < 5; k++) { g.beginPath(); g.arc(x + 10 + k * 6, y + h - 12, 5, 0, 7); g.fill(); } }
      }
    }
    // Rotulación de edificios especiales
    const cx = x + w / 2, cy = y + h / 2;
    switch (b.especial) {
      case "radio":
        g.fillStyle = "#1e2a44"; g.fillRect(x + m + 5, y + m + 5, w - 2 * m - 10, h - 2 * m - 10);
        g.strokeStyle = "#c6d3e8"; g.lineWidth = 2;
        for (let k = 0; k < 4; k++) { g.beginPath(); g.arc(cx, cy - 10, 12 + k * 14, Math.PI * 1.15, Math.PI * 1.85); g.stroke(); }
        g.fillStyle = "#e23d3d"; g.beginPath(); g.arc(cx, cy - 10, 7, 0, 7); g.fill();
        texto(g, "RADIO ONDA VOLCÁN", cx, cy + 40, 17, "#ffd166"); break;
      case "periodico": texto(g, "EL ECO", cx, cy, 40, "#1d1d1d"); texto(g, "DIARIO DE PUERTO PALABRA", cx, cy + 34, 13, "#444"); break;
      case "ayuntamiento":
        g.fillStyle = "#c9b48a"; g.fillRect(cx - 20, y + 6, 40, h - 12);
        g.fillStyle = "#fff"; g.beginPath(); g.arc(cx, cy, 14, 0, 7); g.fill(); g.strokeStyle = "#333"; g.lineWidth = 2; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx, cy - 10); g.moveTo(cx, cy); g.lineTo(cx + 7, cy); g.stroke();
        texto(g, "AYUNTAMIENTO", cx - w / 4 - 10, cy, 14, "#5b4a2a"); break;
      case "cine": g.fillStyle = "#2a1638"; g.fillRect(x + 10, y + 10, w - 20, h - 20); texto(g, "CINE ATLÁNTICO", cx, cy, 22, "#ffd23f"); break;
      case "biblioteca":
        g.fillStyle = "#e7dcc6"; g.fillRect(x + 8, y + 8, w - 16, h - 16);
        g.fillStyle = "#6f8f6d"; g.beginPath(); g.arc(cx, cy - 6, Math.min(w, h) / 4, 0, 7); g.fill(); g.fillStyle = "rgba(255,255,255,0.3)"; g.beginPath(); g.arc(cx - 8, cy - 14, Math.min(w, h) / 10, 0, 7); g.fill();
        texto(g, "BIBLIOTECA", cx, y + h - 24, 20, "#5a2f6b"); break;
      case "teatro": g.fillStyle = "#7a1f3d"; g.fillRect(x + 10, y + 10, w - 20, h - 20); texto(g, "TEATRO DE LA LUNA", cx, cy, 18, "#ffe08a"); g.fillStyle = "#ffe08a"; g.beginPath(); g.arc(cx, cy - 34, 12, 0.6, 5.6); g.fill(); break;
      case "academia":
        g.fillStyle = "#f3ead7"; g.fillRect(x + 10, y + 10, w - 20, h - 20);
        g.fillStyle = "#c1440e"; g.font = "900 64px Georgia, serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("´", cx, cy - 18);
        texto(g, "ACADEMIA", cx, cy + 16, 20, "#5b2a0e"); texto(g, "DE LAS TILDES", cx, cy + 38, 13, "#5b2a0e"); break;
      case "almacen":
        g.fillStyle = "#3b3f46"; g.fillRect(x + 10, y + 10, w - 20, h - 20);
        g.fillStyle = "#555b66"; g.fillRect(x + 18, cy - 10, w - 36, 20);
        ["#3a86ff", "#06d6a0", "#ff4f7b", "#ffbe0b"].forEach((col, k) => { g.fillStyle = col; g.fillRect(x + 24 + k * ((w - 60) / 4), cy - 22, (w - 60) / 4 - 8, 12); });
        texto(g, "ALMACÉN DE PALABRAS", cx, cy + 32, 14, "#ffd23f"); break;
      case "casaPoeta": texto(g, "CASA DE LA POETA", cx, cy, 15, "#5b3a7a"); break;
      case "colegio": texto(g, "COLEGIO", cx, cy, 22, "#2f6b4f"); break;
      case "imprenta": texto(g, "IMPRENTA", cx, cy - 8, 24, "#fff"); texto(g, "TINTA FRESCA", cx, cy + 18, 14, "#ffd166"); break;
      case "taller": g.fillStyle = "#262a31"; g.fillRect(x + 12, y + 12, w - 24, h - 24); texto(g, "TALLER DE TUNEO", cx, cy - 6, 20, "#ff7a45"); texto(g, "de palabras", cx, cy + 18, 14, "#fff"); break;
      case "fabrica":
        [[0.25, 0.3], [0.45, 0.3], [0.65, 0.3]].forEach(([a, bb]) => { g.fillStyle = "#5a4a42"; g.beginPath(); g.arc(x + w * a, y + h * bb, 12, 0, 7); g.fill(); g.fillStyle = "#222"; g.beginPath(); g.arc(x + w * a, y + h * bb, 7, 0, 7); g.fill(); });
        texto(g, "FÁBRICA DE PALABRAS", cx, cy + 30, 16, "#fff"); break;
      case "circuito":
        for (let yy = 0; yy < 4; yy++) for (let xx = 0; xx < Math.floor((w - 20) / 16); xx++) { g.fillStyle = (xx + yy) % 2 ? "#111" : "#f5f5f5"; g.fillRect(x + 10 + xx * 16, y + h - 74 + yy * 16, 16, 16); }
        texto(g, "AUTOPISTA", cx, cy - 22, 26, "#ffd23f"); break;
      case "museo": texto(g, "MUSEO DEL MAR", cx, cy, 18, "#2b6e9e"); break;
      default: break;
    }
  }

  function dibujarArbol(g, a) {
    const { x, y, r } = a;
    g.fillStyle = "rgba(0,0,0,0.25)"; g.beginPath(); g.ellipse(x + r * 0.35, y + r * 0.35, r, r * 0.9, 0, 0, 7); g.fill();
    if (a.tipo === "palmera") {
      g.strokeStyle = "#2f7d3a"; g.lineCap = "round";
      for (let k = 0; k < 7; k++) { const an = k / 7 * Math.PI * 2 + a.s; g.lineWidth = 6; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + Math.cos(an) * r * 0.6, y + Math.sin(an) * r * 0.6 - 4, x + Math.cos(an) * r * 1.15, y + Math.sin(an) * r * 1.15); g.stroke(); }
      g.strokeStyle = "#58b062"; for (let k = 0; k < 7; k++) { const an = k / 7 * Math.PI * 2 + a.s + 0.2; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); g.stroke(); }
      g.fillStyle = "#8b5a2b"; g.beginPath(); g.arc(x, y, 4, 0, 7); g.fill();
    } else if (a.tipo === "drago") {
      for (let k = 0; k < 9; k++) { const an = k / 9 * Math.PI * 2 + a.s, d = r * 0.55; const px = x + Math.cos(an) * d, py = y + Math.sin(an) * d;
        g.fillStyle = "#3d7a4a"; g.beginPath(); for (let q = 0; q < 10; q++) { const aa = q / 10 * Math.PI * 2, rr = q % 2 ? 4 : r * 0.42; g.lineTo(px + Math.cos(aa) * rr, py + Math.sin(aa) * rr); } g.fill(); }
      g.fillStyle = "#4f9a5c"; g.beginPath(); g.arc(x, y, r * 0.45, 0, 7); g.fill();
      g.fillStyle = "#9a8a70"; g.beginPath(); g.arc(x, y, r * 0.18, 0, 7); g.fill();
    } else if (a.tipo === "pino") {
      g.fillStyle = "#24553a"; g.beginPath(); for (let q = 0; q < 16; q++) { const aa = q / 16 * Math.PI * 2, rr = q % 2 ? r * 0.65 : r; g.lineTo(x + Math.cos(aa) * rr, y + Math.sin(aa) * rr); } g.fill();
      g.fillStyle = "#2f6e48"; g.beginPath(); g.arc(x - 2, y - 2, r * 0.5, 0, 7); g.fill();
    } else {
      g.fillStyle = "#3f8b45"; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
      g.fillStyle = "#56a85a"; g.beginPath(); g.arc(x - r * 0.25, y - r * 0.25, r * 0.6, 0, 7); g.fill();
      g.fillStyle = "rgba(255,255,255,0.12)"; g.beginPath(); g.arc(x - r * 0.4, y - r * 0.4, r * 0.25, 0, 7); g.fill();
    }
  }

  function dibujarDecor(g, d) {
    switch (d.tipo) {
      case "fuente":
        g.fillStyle = "#cfc4ad"; g.beginPath(); g.arc(d.x, d.y, 46, 0, 7); g.fill();
        g.fillStyle = "#58b7d6"; g.beginPath(); g.arc(d.x, d.y, 38, 0, 7); g.fill();
        g.fillStyle = "#cfc4ad"; g.beginPath(); g.arc(d.x, d.y, 10, 0, 7); g.fill(); break;
      case "cesped": g.fillStyle = "rgba(95,174,90,0.75)"; g.fillRect(d.x + 30, d.y + 30, d.w - 60, d.h - 60); break;
      case "contenedor": g.fillStyle = "rgba(0,0,0,0.3)"; g.fillRect(d.x + 6, d.y + 6, 70, 46); g.fillStyle = d.c; g.fillRect(d.x, d.y, 70, 46); g.fillStyle = "rgba(255,255,255,0.18)"; for (let k = 4; k < 70; k += 8) g.fillRect(d.x + k, d.y, 2, 46); break;
      case "grua": g.strokeStyle = "#f2b134"; g.lineWidth = 8; g.beginPath(); g.moveTo(d.x, d.y - 60); g.lineTo(d.x, d.y + 60); g.moveTo(d.x - 10, d.y - 40); g.lineTo(d.x + 140, d.y - 40); g.stroke(); g.fillStyle = "#c94a2a"; g.fillRect(d.x - 14, d.y - 14, 28, 28); break;
      case "ferry":
        g.fillStyle = "rgba(0,0,0,0.25)"; g.beginPath(); g.ellipse(d.x + 10, d.y + 10, 150, 46, 0, 0, 7); g.fill();
        g.fillStyle = "#f7f7f7"; g.beginPath(); g.ellipse(d.x, d.y, 150, 46, 0, 0, 7); g.fill();
        g.fillStyle = "#1f6fb2"; g.fillRect(d.x - 110, d.y - 30, 200, 60); g.fillStyle = "#fff"; g.fillRect(d.x - 90, d.y - 20, 160, 40);
        g.fillStyle = "#ffd23f"; g.beginPath(); g.arc(d.x + 40, d.y, 14, 0, 7); g.fill(); texto(g, "ISLAS", d.x - 20, d.y, 16, "#1f6fb2"); break;
      case "barca": g.fillStyle = "rgba(0,0,0,0.25)"; g.beginPath(); g.ellipse(d.x + 5, d.y + 5, 40, 14, 0.2, 0, 7); g.fill(); g.fillStyle = d.c; g.beginPath(); g.ellipse(d.x, d.y, 40, 14, 0.2, 0, 7); g.fill(); g.fillStyle = "#fff"; g.beginPath(); g.ellipse(d.x, d.y, 30, 8, 0.2, 0, 7); g.fill(); break;
      case "faro":
        g.fillStyle = "rgba(0,0,0,0.3)"; g.beginPath(); g.arc(d.x + 10, d.y + 10, 30, 0, 7); g.fill();
        g.fillStyle = "#fafafa"; g.beginPath(); g.arc(d.x, d.y, 30, 0, 7); g.fill();
        g.strokeStyle = "#d62828"; g.lineWidth = 8; g.beginPath(); g.arc(d.x, d.y, 22, 0, 7); g.stroke();
        g.fillStyle = "#ffd166"; g.beginPath(); g.arc(d.x, d.y, 10, 0, 7); g.fill(); break;
      case "sombrilla":
        g.fillStyle = "rgba(0,0,0,0.2)"; g.beginPath(); g.arc(d.x + 6, d.y + 6, 20, 0, 7); g.fill();
        for (let k = 0; k < 8; k++) { g.fillStyle = k % 2 ? "#fff" : d.c; g.beginPath(); g.moveTo(d.x, d.y); g.arc(d.x, d.y, 20, k * Math.PI / 4, (k + 1) * Math.PI / 4); g.fill(); } break;
      case "volcan": {
        const rx = 11.2 * T, ry = 5.4 * T;
        const gr = g.createRadialGradient(d.x, d.y - 20, 30, d.x, d.y, rx);
        gr.addColorStop(0, "#d9c7a8"); gr.addColorStop(0.12, "#8d6b52"); gr.addColorStop(0.45, "#6e4e3b"); gr.addColorStop(0.85, "#5a7a4a"); gr.addColorStop(1, "#5fae5a");
        g.fillStyle = gr; g.beginPath(); g.ellipse(d.x, d.y, rx, ry, 0, 0, 7); g.fill();
        g.strokeStyle = "rgba(40,20,10,0.25)"; g.lineWidth = 3;
        for (let k = 0; k < 22; k++) { const an = k / 22 * Math.PI * 2; g.beginPath(); g.moveTo(d.x + Math.cos(an) * 70, d.y + Math.sin(an) * 40); g.lineTo(d.x + Math.cos(an) * rx * 0.8, d.y + Math.sin(an) * ry * 0.8); g.stroke(); }
        g.fillStyle = "#f2efe8"; g.beginPath(); g.ellipse(d.x, d.y - 6, 86, 50, 0, 0, 7); g.fill();
        g.fillStyle = "#4a3326"; g.beginPath(); g.ellipse(d.x, d.y - 6, 44, 26, 0, 0, 7); g.fill();
        g.fillStyle = "#2c1d16"; g.beginPath(); g.ellipse(d.x, d.y - 4, 30, 16, 0, 0, 7); g.fill();
        texto(g, "VOLCÁN DE LAS LETRAS", d.x, d.y + ry * 0.55, 22, "rgba(255,255,255,0.85)");
        break;
      }
      default: break;
    }
  }

  C.chunk = function (cx, cy) {
    const k = cx + "," + cy;
    if (C.chunks[k]) return C.chunks[k];
    const cv = document.createElement("canvas"); cv.width = CH * T; cv.height = CH * T;
    const g = cv.getContext("2d");
    g.translate(-cx * CH * T, -cy * CH * T);
    const x0 = cx * CH, y0 = cy * CH, x1 = Math.min(W, x0 + CH), y1 = Math.min(H, y0 + CH);
    dibujarSuelo(g, x0, y0, x1, y1);
    const margen = 4 * T, r = [x0 * T - margen, y0 * T - margen, x1 * T + margen, y1 * T + margen];
    const dentro = (x, y, w, h) => x + w > r[0] && y + h > r[1] && x < r[2] && y < r[3];
    C.decor.filter((d) => d.tipo === "volcan" || d.tipo === "cesped").forEach((d) => dibujarDecor(g, d));
    C.edificios.forEach((b) => { if (dentro(b.x * T, b.y * T, b.w * T + 40, b.h * T + 40)) dibujarEdificio(g, b); });
    C.decor.filter((d) => d.tipo !== "volcan" && d.tipo !== "cesped").forEach((d) => { if (dentro(d.x - 200, d.y - 100, 400, 200)) dibujarDecor(g, d); });
    C.arboles.forEach((a) => { if (dentro(a.x - 40, a.y - 40, 80, 80)) dibujarArbol(g, a); });
    C.chunks[k] = cv;
    return cv;
  };
  C.CHPX = CH * T;

  // Minimapa pre-dibujado (3 px por tesela)
  C.minimapa = function () {
    if (C._mini) return C._mini;
    const k = 3, cv = document.createElement("canvas"); cv.width = W * k; cv.height = H * k;
    const g = cv.getContext("2d");
    const col = { 0: "#4f9a4b", 1: "#e6e1d6", 2: "#9b968c", 3: "#6c6f78", 4: "#2f7fa8", 5: "#e6cf8d", 6: "#bfb39a", 7: "#8a6b4e", 8: "#7a5a46", 9: "#3f8b45" };
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { g.fillStyle = col[at(x, y)] || "#000"; g.fillRect(x * k, y * k, k, k); }
    C._mini = cv; return cv;
  };

  // Búsqueda de ruta en la red de calles (para el GPS y la conducción asistida)
  C.ruta = function (sx, sy, tx, ty) {
    const ok = (x, y) => C.conducible(at(x, y));
    if (!ok(tx, ty)) { // acercar el destino a la calle más próxima
      let best = null, bd = 1e9;
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) if (ok(tx + dx, ty + dy) && Math.abs(dx) + Math.abs(dy) < bd) { bd = Math.abs(dx) + Math.abs(dy); best = [tx + dx, ty + dy]; }
      if (!best) return null; [tx, ty] = best;
    }
    if (!ok(sx, sy)) {
      let best = null, bd = 1e9;
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) if (ok(sx + dx, sy + dy) && Math.abs(dx) + Math.abs(dy) < bd) { bd = Math.abs(dx) + Math.abs(dy); best = [sx + dx, sy + dy]; }
      if (!best) return null; [sx, sy] = best;
    }
    const prev = new Int32Array(W * H).fill(-1), q = [sy * W + sx]; prev[sy * W + sx] = sy * W + sx;
    let head = 0; const fin = ty * W + tx;
    while (head < q.length) {
      const c = q[head++]; if (c === fin) break;
      const x = c % W, y = (c / W) | 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = x + dx, ny = y + dy, n = ny * W + nx; if (nx < 0 || ny < 0 || nx >= W || ny >= H || prev[n] !== -1 || !ok(nx, ny)) continue; prev[n] = c; q.push(n); }
    }
    if (prev[fin] === -1) return null;
    const path = []; let c = fin;
    while (c !== sy * W + sx) { path.push([c % W, (c / W) | 0]); c = prev[c]; }
    path.reverse();
    return path.map(([x, y]) => ({ x: x * T + T / 2, y: y * T + T / 2 }));
  };

  // Teselas de calle aleatorias dentro de un barrio (para palabras y páginas)
  C.callesDeBarrio = function (barrio) {
    const out = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (at(x, y) === TIPO.CALLE && C.barrioDe(x, y) === barrio) out.push([x, y]);
    return out;
  };

  generar();
  C.XS = XS; C.YS = YS; C.COSTA = COSTA;
  PP.Ciudad = C;
})();
