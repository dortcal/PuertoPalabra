/* Puerto Palabra · Código de partida.
   Convierte el progreso (curso, misiones, estrellas, palabras doradas, logros, vehículo…) en un código
   corto y legible que se puede copiar, anotar o escribir en otro dispositivo para retomar la partida.
   - Alfabeto Crockford (sin I, L, O, U): no distingue mayúsculas de minúsculas ni confunde 0/O ni 1/I.
   - Lleva un control de errores (CRC16): si falta o sobra un carácter, el código se rechaza.
   - No guarda datos personales: solo el código anónimo que eligió el alumnado.
   Limitación honesta: el código recupera el PROGRESO del juego, no las evidencias detalladas
   del informe docente (esas se guardan en el dispositivo donde se jugó). */
window.PP = window.PP || {};
(function () {
  "use strict";
  const VERSION = 1;
  const PREFIJO = "PP1";
  const ABC = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
  const COLORES = ["#ff4f7b", "#3a86ff", "#06d6a0", "#ffbe0b", "#8338ec", "#f8f9fa", "#fb5607"];
  const K = { COLORES };

  function crc16(bytes) {
    let c = 0xffff;
    for (const b of bytes) { c ^= b << 8; for (let i = 0; i < 8; i++) c = (c & 0x8000) ? ((c << 1) ^ 0x1021) & 0xffff : (c << 1) & 0xffff; }
    return c;
  }
  function aBase32(bytes) {
    let bits = 0, acc = 0, out = "";
    for (const b of bytes) { acc = (acc << 8) | b; bits += 8; while (bits >= 5) { out += ABC[(acc >> (bits - 5)) & 31]; bits -= 5; } acc &= (1 << bits) - 1; }
    if (bits > 0) out += ABC[(acc << (5 - bits)) & 31];
    return out;
  }
  function deBase32(txt) {
    let bits = 0, acc = 0; const out = [];
    for (const ch of txt) {
      const v = ABC.indexOf(ch); if (v < 0) return null;
      acc = (acc << 5) | v; bits += 5;
      if (bits >= 8) { out.push((acc >> (bits - 8)) & 255); bits -= 8; acc &= (1 << bits) - 1; }
    }
    return Uint8Array.from(out);
  }
  const npack = (n, bits) => Math.ceil(n * bits / 8);

  function ids() {
    const J = PP.juego || {};
    return {
      misiones: (PP.MISIONES || []).map((m) => m.id),
      nDoradas: (PP.PALABRAS_DORADAS || []).length,
      logros: (J.LOGROS || []).map((l) => l.id),
      vehiculos: (J.VEHICULOS || []).map((v) => v.id),
      avatares: (PP.AVATARES || []).map((a) => a.id)
    };
  }

  /** Genera el código de la partida actual. Devuelve null si no hay perfil. */
  K.generar = function () {
    const p = PP.datos.perfil; if (!p || !p.curso) return null;
    const I = ids(), pr = PP.Store.progreso();
    const b = [];
    b.push(VERSION);
    b.push((p.curso & 15) | ((pr.introVista ? 1 : 0) << 4));
    b.push(Math.max(0, I.avatares.indexOf(p.avatar)));
    b.push(Math.max(0, I.vehiculos.indexOf(pr.vehiculo)));
    const ci = COLORES.indexOf(pr.color); b.push(ci < 0 ? 255 : ci);
    b.push(I.misiones.length);
    const est = new Array(npack(I.misiones.length, 2)).fill(0);
    I.misiones.forEach((id, i) => { const e = pr.misiones[id] ? Math.min(3, Math.max(1, pr.misiones[id].estrellas || 1)) : 0; est[i >> 2] |= e << ((i & 3) * 2); });
    b.push(...est);
    b.push(I.nDoradas);
    const dor = new Array(npack(I.nDoradas, 1)).fill(0);
    (pr.doradas || []).forEach((i) => { if (i >= 0 && i < I.nDoradas) dor[i >> 3] |= 1 << (i & 7); });
    b.push(...dor);
    b.push(I.logros.length);
    const log = new Array(npack(I.logros.length, 1)).fill(0);
    I.logros.forEach((id, i) => { if ((pr.logros || []).includes(id)) log[i >> 3] |= 1 << (i & 7); });
    b.push(...log);
    const pts = Math.min(0xffffff, Math.max(0, Math.round(pr.puntos || 0)));
    b.push((pts >> 16) & 255, (pts >> 8) & 255, pts & 255);
    b.push(Math.min(255, pr.fotos || 0));
    const pos = pr.pos && isFinite(pr.pos.x) ? pr.pos : null;
    const px = pos ? Math.min(0xfffe, Math.max(0, Math.round(pos.x / 2))) : 0xffff, py = pos ? Math.min(0xfffe, Math.max(0, Math.round(pos.y / 2))) : 0xffff;
    b.push(px >> 8, px & 255, py >> 8, py & 255);
    const cod = Array.from(new TextEncoder().encode(String(p.codigo || "anónimo").slice(0, 16)));
    b.push(cod.length, ...cod);
    const c = crc16(b); b.push(c >> 8, c & 255);
    const txt = aBase32(b);
    return PREFIJO + "-" + txt.match(/.{1,4}/g).join("-");
  };

  /** Lee y valida un código. { ok:true, datos } o { ok:false, error } */
  K.leer = function (entrada) {
    let t = String(entrada || "").toUpperCase().replace(/[\s\-_.]/g, "").replace(/I|L/g, "1").replace(/O/g, "0");
    if (!t.startsWith(PREFIJO)) return { ok: false, error: "El código debe empezar por PP1. Cópialo entero, tal como aparece en el juego." };
    t = t.slice(PREFIJO.length);
    const b = deBase32(t);
    if (!b || b.length < 20) return { ok: false, error: "El código está incompleto o tiene caracteres que no son válidos." };
    const cuerpo = b.slice(0, b.length - 2), c = (b[b.length - 2] << 8) | b[b.length - 1];
    if (crc16(cuerpo) !== c) return { ok: false, error: "El código no es correcto: revisa que no falte ni sobre ningún carácter." };
    try {
      const I = ids(); let i = 0;
      const ver = cuerpo[i++]; if (ver !== VERSION) return { ok: false, error: "Este código es de otra versión del juego." };
      const cf = cuerpo[i++], curso = cf & 15, intro = !!((cf >> 4) & 1);
      if (curso < 1 || curso > 6) return { ok: false, error: "El código no es válido (curso desconocido)." };
      const avatar = I.avatares[cuerpo[i++]] || I.avatares[0];
      const vehiculo = I.vehiculos[cuerpo[i++]] || I.vehiculos[0] || "moto";
      const ci = cuerpo[i++], color = COLORES[ci] || COLORES[0];
      const nM = cuerpo[i++], misiones = {};
      const est = cuerpo.slice(i, i + npack(nM, 2)); i += est.length;
      for (let k = 0; k < nM && k < I.misiones.length; k++) { const e = (est[k >> 2] >> ((k & 3) * 2)) & 3; if (e) misiones[I.misiones[k]] = { estrellas: e }; }
      const nD = cuerpo[i++], dm = cuerpo.slice(i, i + npack(nD, 1)); i += dm.length;
      const doradas = []; for (let k = 0; k < nD && k < I.nDoradas; k++) if ((dm[k >> 3] >> (k & 7)) & 1) doradas.push(k);
      const nL = cuerpo[i++], lm = cuerpo.slice(i, i + npack(nL, 1)); i += lm.length;
      const logros = []; for (let k = 0; k < nL && k < I.logros.length; k++) if ((lm[k >> 3] >> (k & 7)) & 1) logros.push(I.logros[k]);
      const puntos = (cuerpo[i] << 16) | (cuerpo[i + 1] << 8) | cuerpo[i + 2]; i += 3;
      const fotos = cuerpo[i++];
      const px = (cuerpo[i] << 8) | cuerpo[i + 1], py = (cuerpo[i + 2] << 8) | cuerpo[i + 3]; i += 4;
      const pos = px === 0xffff || py === 0xffff ? null : { x: px * 2, y: py * 2 };
      const ln = cuerpo[i++], codigo = new TextDecoder().decode(cuerpo.slice(i, i + ln)).replace(/[^A-Za-z0-9ºª\-_. áéíóúüñÁÉÍÓÚÜÑ]/g, "").slice(0, 16) || "anónimo";
      if (i + ln !== cuerpo.length) return { ok: false, error: "El código no es válido (longitud inesperada)." };
      return { ok: true, datos: { curso, avatar, codigo, intro, vehiculo, color, misiones, doradas, logros, puntos, fotos, pos } };
    } catch (e) { return { ok: false, error: "No se ha podido leer el código." }; }
  };

  /** Aplica los datos al guardado local. Si ya había progreso, se FUSIONA (nunca se pierde lo mejor de cada lado). */
  K.aplicar = function (d) {
    const av = (PP.AVATARES || []).find((a) => a.id === d.avatar) || PP.AVATARES[0];
    PP.datos.perfil = { curso: d.curso, avatar: av.id, codigo: d.codigo, alias: av.nombre };
    const pr = PP.Store.progreso();
    Object.keys(d.misiones).forEach((id) => {
      const a = pr.misiones[id];
      pr.misiones[id] = { estrellas: Math.max(d.misiones[id].estrellas, a ? a.estrellas : 0), ultima: a ? a.ultima : Date.now(), veces: Math.max(1, a ? a.veces || 1 : 1) };
    });
    pr.doradas = Array.from(new Set([].concat(pr.doradas || [], d.doradas))).sort((a, b) => a - b);
    pr.logros = Array.from(new Set([].concat(pr.logros || [], d.logros)));
    pr.puntos = Math.max(pr.puntos || 0, d.puntos);
    pr.fotos = Math.max(pr.fotos || 0, d.fotos);
    pr.vehiculo = d.vehiculo; pr.color = d.color;
    if (d.intro) pr.introVista = true;
    if (d.pos) pr.pos = d.pos;
    PP.Store.guardar();
    return { misiones: Object.keys(pr.misiones).length, doradas: pr.doradas.length, puntos: pr.puntos };
  };

  K.descargar = function (codigo) {
    try {
      const blob = new Blob(["Puerto Palabra · código de partida\n\n" + codigo + "\n\nPara continuar: en la pantalla de inicio pulsa «Continuar con código» y pega este código.\n"], { type: "text/plain;charset=utf-8" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "puerto-palabra-codigo.txt";
      document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); return true;
    } catch (e) { return false; }
  };
  K.copiar = async function (txt) {
    try { await navigator.clipboard.writeText(txt); return true; } catch (e) {
      try { const t = document.createElement("textarea"); t.value = txt; t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t); t.select(); const ok = document.execCommand("copy"); t.remove(); return ok; } catch (e2) { return false; }
    }
  };

  PP.Codigo = K;
})();
