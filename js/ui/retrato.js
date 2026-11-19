/* Puerto Palabra · Generador de retratos SVG originales para los personajes.
   Cada personaje se describe con unos pocos rasgos; el ánimo cambia la expresión. */
window.PP = window.PP || {};
(function () {
  "use strict";
  const PIEL = { clara: "#f6d1b5", media: "#e0a875", morena: "#b97a4a", oscura: "#7a4a2a" };

  PP.retrato = function (o, animo) {
    o = o || {};
    animo = animo || o.animo || "normal";
    const piel = PIEL[o.piel] || o.piel || PIEL.media;
    const pelo = o.pelo || "#3b2416";
    const ropa = o.ropa || "#3a86ff";
    const fondo = o.fondo || "#ffd8a8";
    const nino = o.edad === "nino", mayor = o.edad === "mayor";
    const cy = nino ? 58 : 52, rx = nino ? 24 : 25, ry = nino ? 26 : 30;
    const p = [];
    p.push('<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="retrato" role="img" aria-label="' + (o.nombre || "Personaje") + '">');
    p.push('<circle cx="60" cy="60" r="60" fill="' + fondo + '"/>');
    // pelo largo por detrás
    if (o.peinado === "largo" || o.peinado === "coleta") p.push('<path d="M' + (60 - rx - 6) + ' ' + (cy - 6) + ' Q60 ' + (cy - ry - 22) + ' ' + (60 + rx + 6) + ' ' + (cy - 6) + ' L' + (60 + rx + 8) + ' ' + (cy + 34) + ' Q60 ' + (cy + 44) + ' ' + (60 - rx - 8) + ' ' + (cy + 34) + 'Z" fill="' + pelo + '"/>');
    // cuerpo
    p.push('<path d="M14 120 Q18 ' + (cy + 40) + ' 60 ' + (cy + 38) + ' Q102 ' + (cy + 40) + ' 106 120Z" fill="' + ropa + '"/>');
    p.push('<path d="M48 ' + (cy + 36) + ' L60 ' + (cy + 50) + ' L72 ' + (cy + 36) + '" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="3"/>');
    if (o.acreditacion) p.push('<rect x="66" y="' + (cy + 46) + '" width="16" height="12" rx="2" fill="#fff" stroke="#333"/><rect x="69" y="' + (cy + 49) + '" width="10" height="2" fill="#e63946"/>');
    p.push('<rect x="53" y="' + (cy + 20) + '" width="14" height="18" fill="' + piel + '"/>');
    // cabeza y orejas
    p.push('<ellipse cx="' + (60 - rx) + '" cy="' + (cy + 2) + '" rx="5" ry="7" fill="' + piel + '"/><ellipse cx="' + (60 + rx) + '" cy="' + (cy + 2) + '" rx="5" ry="7" fill="' + piel + '"/>');
    p.push('<ellipse cx="60" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + piel + '"/>');
    if (o.pendientes) p.push('<circle cx="' + (60 - rx) + '" cy="' + (cy + 11) + '" r="2.5" fill="#ffd23f"/><circle cx="' + (60 + rx) + '" cy="' + (cy + 11) + '" r="2.5" fill="#ffd23f"/>');
    // pelo superior
    const top = cy - ry;
    switch (o.peinado) {
      case "calvo": if (mayor) p.push('<path d="M' + (60 - rx) + ' ' + (cy - 4) + ' q4 -10 8 -12 M' + (60 + rx) + ' ' + (cy - 4) + ' q-4 -10 -8 -12" stroke="' + pelo + '" stroke-width="6" fill="none"/>'); break;
      case "rizado": for (let k = 0; k < 9; k++) { const a = Math.PI + k / 8 * Math.PI; p.push('<circle cx="' + (60 + Math.cos(a) * (rx - 2)) + '" cy="' + (cy - 6 + Math.sin(a) * (ry - 4)) + '" r="9" fill="' + pelo + '"/>'); } break;
      case "mono": p.push('<path d="M' + (60 - rx - 1) + ' ' + (cy - 2) + ' Q' + (60 - rx) + ' ' + (top - 6) + ' 60 ' + (top - 4) + ' Q' + (60 + rx) + ' ' + (top - 6) + ' ' + (60 + rx + 1) + ' ' + (cy - 2) + ' Q60 ' + (top + 8) + ' ' + (60 - rx - 1) + ' ' + (cy - 2) + 'Z" fill="' + pelo + '"/><circle cx="60" cy="' + (top - 8) + '" r="10" fill="' + pelo + '"/>'); break;
      case "coleta": p.push('<path d="M' + (60 - rx - 1) + ' ' + (cy - 4) + ' Q60 ' + (top - 14) + ' ' + (60 + rx + 1) + ' ' + (cy - 4) + ' Q60 ' + (top + 6) + ' ' + (60 - rx - 1) + ' ' + (cy - 4) + 'Z" fill="' + pelo + '"/>'); break;
      case "largo": p.push('<path d="M' + (60 - rx - 2) + ' ' + (cy + 4) + ' Q' + (60 - rx - 4) + ' ' + (top - 8) + ' 60 ' + (top - 6) + ' Q' + (60 + rx + 4) + ' ' + (top - 8) + ' ' + (60 + rx + 2) + ' ' + (cy + 4) + ' Q' + (60 + 8) + ' ' + (top + 4) + ' 52 ' + (top + 8) + ' Q' + (60 - rx + 4) + ' ' + (top + 12) + ' ' + (60 - rx - 2) + ' ' + (cy + 4) + 'Z" fill="' + pelo + '"/>'); break;
      default: p.push('<path d="M' + (60 - rx - 1) + ' ' + (cy - 2) + ' Q' + (60 - rx) + ' ' + (top - 8) + ' 60 ' + (top - 5) + ' Q' + (60 + rx) + ' ' + (top - 8) + ' ' + (60 + rx + 1) + ' ' + (cy - 2) + ' L' + (60 + rx - 4) + ' ' + (cy - 10) + ' Q60 ' + (top + 6) + ' ' + (60 - rx + 4) + ' ' + (cy - 10) + 'Z" fill="' + pelo + '"/>');
    }
    // ojos y cejas según el ánimo
    const ey = cy - 2, ex = nino ? 10 : 10, er = nino ? 4.2 : 3.4;
    const cejas = { normal: [0, 0], feliz: [-2, -2], triste: [4, -4], enfadado: [-5, 5], sorpresa: [-5, -5] }[animo] || [0, 0];
    p.push('<ellipse cx="' + (60 - ex) + '" cy="' + ey + '" rx="' + er + '" ry="' + (animo === "sorpresa" ? er + 1.5 : er) + '" fill="#1b1b2f"/><ellipse cx="' + (60 + ex) + '" cy="' + ey + '" rx="' + er + '" ry="' + (animo === "sorpresa" ? er + 1.5 : er) + '" fill="#1b1b2f"/>');
    p.push('<circle cx="' + (60 - ex + 1.2) + '" cy="' + (ey - 1.2) + '" r="1.2" fill="#fff"/><circle cx="' + (60 + ex + 1.2) + '" cy="' + (ey - 1.2) + '" r="1.2" fill="#fff"/>');
    p.push('<path d="M' + (60 - ex - 6) + ' ' + (ey - 9 + cejas[1] * 0.4) + ' L' + (60 - ex + 5) + ' ' + (ey - 9 + cejas[0] * 0.4) + ' M' + (60 + ex - 5) + ' ' + (ey - 9 + cejas[0] * 0.4) + ' L' + (60 + ex + 6) + ' ' + (ey - 9 + cejas[1] * 0.4) + '" stroke="' + (mayor ? "#ddd" : pelo) + '" stroke-width="3" stroke-linecap="round"/>');
    if (o.gafas) p.push('<circle cx="' + (60 - ex) + '" cy="' + ey + '" r="8" fill="rgba(255,255,255,.15)" stroke="#222" stroke-width="2.5"/><circle cx="' + (60 + ex) + '" cy="' + ey + '" r="8" fill="rgba(255,255,255,.15)" stroke="#222" stroke-width="2.5"/><path d="M' + (60 - ex + 8) + ' ' + ey + ' L' + (60 + ex - 8) + ' ' + ey + '" stroke="#222" stroke-width="2.5"/>');
    // boca
    const my = cy + 13;
    const boca = {
      feliz: '<path d="M50 ' + my + ' Q60 ' + (my + 11) + ' 70 ' + my + '" fill="#7a2230" stroke="#5a1520" stroke-width="2"/>',
      normal: '<path d="M52 ' + (my + 2) + ' Q60 ' + (my + 5) + ' 68 ' + (my + 2) + '" fill="none" stroke="#5a1520" stroke-width="2.5" stroke-linecap="round"/>',
      triste: '<path d="M52 ' + (my + 6) + ' Q60 ' + (my - 1) + ' 68 ' + (my + 6) + '" fill="none" stroke="#5a1520" stroke-width="2.5" stroke-linecap="round"/>',
      enfadado: '<path d="M52 ' + (my + 4) + ' L68 ' + (my + 2) + '" stroke="#5a1520" stroke-width="3" stroke-linecap="round"/>',
      sorpresa: '<ellipse cx="60" cy="' + (my + 3) + '" rx="5" ry="6" fill="#5a1520"/>'
    }[animo] || "";
    p.push(boca);
    p.push('<ellipse cx="' + (60 - 16) + '" cy="' + (cy + 8) + '" rx="5" ry="3" fill="#ff8a8a" opacity=".35"/><ellipse cx="' + (60 + 16) + '" cy="' + (cy + 8) + '" rx="5" ry="3" fill="#ff8a8a" opacity=".35"/>');
    if (o.barba) p.push('<path d="M' + (60 - rx + 3) + ' ' + (cy + 4) + ' Q60 ' + (cy + ry + 14) + ' ' + (60 + rx - 3) + ' ' + (cy + 4) + ' Q60 ' + (cy + 22) + ' ' + (60 - rx + 3) + ' ' + (cy + 4) + 'Z" fill="' + pelo + '"/><path d="M52 ' + (my + 3) + ' Q60 ' + (my + 6) + ' 68 ' + (my + 3) + '" fill="none" stroke="#5a1520" stroke-width="2.5"/>');
    if (mayor) p.push('<path d="M' + (60 - ex - 8) + ' ' + (ey + 7) + ' q3 2 6 0 M' + (60 + ex + 2) + ' ' + (ey + 7) + ' q3 2 6 0" stroke="#a0715a" stroke-width="1.4" fill="none"/>');
    // sombreros
    if (o.sombrero === "gorra") p.push('<path d="M' + (60 - rx - 2) + ' ' + (top + 12) + ' Q60 ' + (top - 14) + ' ' + (60 + rx + 2) + ' ' + (top + 12) + 'Z" fill="' + (o.colorSombrero || "#e63946") + '"/><path d="M' + (60 + rx - 6) + ' ' + (top + 10) + ' L' + (60 + rx + 16) + ' ' + (top + 14) + ' L' + (60 + rx - 6) + ' ' + (top + 15) + 'Z" fill="' + (o.colorSombrero || "#e63946") + '"/>');
    if (o.sombrero === "panama") p.push('<ellipse cx="60" cy="' + (top + 8) + '" rx="' + (rx + 16) + '" ry="7" fill="#e9d8a6"/><path d="M' + (60 - rx + 4) + ' ' + (top + 8) + ' Q60 ' + (top - 18) + ' ' + (60 + rx - 4) + ' ' + (top + 8) + 'Z" fill="#e9d8a6"/><rect x="' + (60 - rx + 5) + '" y="' + (top + 1) + '" width="' + (rx * 2 - 10) + '" height="5" fill="#2b2d42"/>');
    if (o.sombrero === "capucha") p.push('<path d="M' + (60 - rx - 10) + ' ' + (cy + 30) + ' Q' + (60 - rx - 12) + ' ' + (top - 12) + ' 60 ' + (top - 12) + ' Q' + (60 + rx + 12) + ' ' + (top - 12) + ' ' + (60 + rx + 10) + ' ' + (cy + 30) + ' L' + (60 + rx - 2) + ' ' + (cy + 26) + ' Q' + (60 + rx) + ' ' + (top + 2) + ' 60 ' + (top + 2) + ' Q' + (60 - rx) + ' ' + (top + 2) + ' ' + (60 - rx + 2) + ' ' + (cy + 26) + 'Z" fill="' + (o.colorSombrero || "#2a1f3d") + '"/>');
    if (o.antifaz) p.push('<path d="M' + (60 - rx - 2) + ' ' + (ey - 6) + ' Q60 ' + (ey - 12) + ' ' + (60 + rx + 2) + ' ' + (ey - 6) + ' L' + (60 + rx) + ' ' + (ey + 6) + ' Q60 ' + (ey + 2) + ' ' + (60 - rx) + ' ' + (ey + 6) + 'Z" fill="#14101f"/><circle cx="' + (60 - ex) + '" cy="' + ey + '" r="3" fill="#b388ff"/><circle cx="' + (60 + ex) + '" cy="' + ey + '" r="3" fill="#b388ff"/>');
    p.push("</svg>");
    return p.join("");
  };

  // Avatares de reportero/a seleccionables (personajes originales)
  PP.AVATARES = [
    { id: "nayra", nombre: "Nayra", piel: "media", pelo: "#2b1d14", peinado: "coleta", ropa: "#ff4f7b", fondo: "#ffe0e9", acreditacion: true, pendientes: true },
    { id: "airam", nombre: "Airam", piel: "morena", pelo: "#1c1c1c", peinado: "rizado", ropa: "#3a86ff", fondo: "#dbe9ff", acreditacion: true },
    { id: "ariadna", nombre: "Ariadna", piel: "clara", pelo: "#c0712f", peinado: "largo", ropa: "#2a9d8f", fondo: "#d6f5ef", acreditacion: true, gafas: true },
    { id: "yeray", nombre: "Yeray", piel: "oscura", pelo: "#111", peinado: "corto", ropa: "#ffb703", fondo: "#fff1c9", acreditacion: true, sombrero: "gorra", colorSombrero: "#6a4c93" }
  ];
  PP.BORRON = { nombre: "El Borrón", piel: "#c9b8e8", pelo: "#14101f", peinado: "corto", ropa: "#2a1f3d", fondo: "#3d2b63", sombrero: "capucha", colorSombrero: "#2a1f3d", antifaz: true };
})();
