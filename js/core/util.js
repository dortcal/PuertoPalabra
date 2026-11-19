/* Puerto Palabra · Utilidades comunes */
window.PP = window.PP || {};
(function () {
  "use strict";
  const U = {};

  U.clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  U.lerp = (a, b, t) => a + (b - a) * t;
  U.dist = (ax, ay, bx, by) => Math.hypot(ax - bx, ay - by);
  U.angDiff = (a, b) => { let d = b - a; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return d; };
  U.rand = (a, b) => a + Math.random() * (b - a);
  U.randi = (a, b) => Math.floor(U.rand(a, b + 1));
  U.pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  U.shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  U.now = () => performance.now();

  // Generador pseudoaleatorio con semilla (ciudad idéntica en todas las partidas)
  U.seeded = function (seed) {
    let s = seed >>> 0;
    return function () { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  };

  // Escapado de texto para insertar en HTML
  U.esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Crear elementos DOM de forma compacta
  U.el = function (tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === "class") e.className = v;
      else if (k === "html") e.innerHTML = v;
      else if (k === "text") e.textContent = v;
      else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
      else if (k === "style" && typeof v === "object") Object.assign(e.style, v);
      else e.setAttribute(k, v === true ? "" : v);
    }
    if (children) (Array.isArray(children) ? children : [children]).forEach((c) => { if (c == null) return; e.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return e;
  };

  U.fmtTiempo = function (ms) {
    const s = Math.round(ms / 1000); const m = Math.floor(s / 60); const r = s % 60;
    return m + " min " + (r < 10 ? "0" : "") + r + " s";
  };

  U.hexToRgb = function (h) { h = h.replace("#", ""); if (h.length === 3) h = h.split("").map((c) => c + c).join(""); const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  U.shade = function (hex, f) { // f>0 aclara, f<0 oscurece
    const [r, g, b] = U.hexToRgb(hex);
    const t = f < 0 ? 0 : 255, p = Math.abs(f);
    const c = (x) => Math.round((t - x) * p + x);
    return "rgb(" + c(r) + "," + c(g) + "," + c(b) + ")";
  };

  // Normalización para comparar textos escritos por el alumnado
  U.norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zñ0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  U.contarPalabras = (s) => (String(s || "").trim().match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+/g) || []).length;

  U.prefiereMenosMovimiento = () => (PP.ajustes && PP.ajustes.reducirMovimiento) || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  // Iconos SVG propios (sin dependencias)
  const ICON = {
    play: '<path d="M8 5v14l11-7z"/>',
    gps: '<path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/>',
    phone: '<rect x="6" y="2" width="12" height="20" rx="3"/><rect x="8.5" y="5" width="7" height="11" rx="1" fill="#0006"/><circle cx="12" cy="18.6" r="1.1" fill="#0006"/>',
    camera: '<path d="M4 7h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="4" fill="#0007"/>',
    speaker: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>',
    check: '<path d="M4 12.5l5 5L20 6.5" stroke="currentColor" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    cross: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="3.2" fill="none" stroke-linecap="round"/>',
    star: '<path d="M12 2.5l2.9 6.2 6.6.7-5 4.5 1.4 6.6L12 17.2l-5.9 3.3 1.4-6.6-5-4.5 6.6-.7z"/>',
    pause: '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
    gear: '<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm9 5.5v-3l-2.4-.6a7 7 0 0 0-.8-1.9l1.3-2.1-2.1-2.1-2.1 1.3a7 7 0 0 0-1.9-.8L12.5 2h-3l-.6 2.4a7 7 0 0 0-1.9.8L4.9 3.9 2.8 6l1.3 2.1a7 7 0 0 0-.8 1.9L1 10.5v3l2.3.6c.2.7.5 1.3.8 1.9l-1.3 2.1 2.1 2.1 2.1-1.3c.6.3 1.2.6 1.9.8l.6 2.3h3l.6-2.3c.7-.2 1.3-.5 1.9-.8l2.1 1.3 2.1-2.1-1.3-2.1c.3-.6.6-1.2.8-1.9z"/>',
    map: '<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14" stroke="#0005" stroke-width="1.5"/>',
    book: '<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-5a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h5z"/>',
    radio: '<rect x="3" y="8" width="18" height="12" rx="2"/><circle cx="8.5" cy="14" r="3" fill="#0006"/><rect x="13.5" y="11" width="5" height="1.6" fill="#0006"/><rect x="13.5" y="14" width="5" height="1.6" fill="#0006"/><path d="M7 8l10-5" stroke="currentColor" stroke-width="1.6"/>',
    trophy: '<path d="M7 3h10v4a5 5 0 0 1-10 0zM5 4H2.5a3.5 3.5 0 0 0 4.5 5M19 4h2.5a3.5 3.5 0 0 1-4.5 5"/><rect x="10.5" y="12" width="3" height="5"/><rect x="7" y="17" width="10" height="3" rx="1"/>',
    doc: '<path d="M6 2h8l5 5v15H6z"/><path d="M9 11h7M9 14h7M9 17h5" stroke="#0006" stroke-width="1.6"/>',
    mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V22" stroke="currentColor" stroke-width="2" fill="none"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.2 9.2a2.9 2.9 0 1 1 3.9 2.7c-.7.3-1.1.9-1.1 1.6v.8" stroke="#0008" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="12" cy="17.6" r="1.3" fill="#0008"/>',
    back: '<path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    up: '<path d="M6 15l6-6 6 6" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    down: '<path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    hint: '<path d="M12 2a7 7 0 0 0-4 12.7V18h8v-3.3A7 7 0 0 0 12 2z"/><rect x="9" y="19.5" width="6" height="2.5" rx="1"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="2.4" fill="none"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="4" y="18" width="16" height="3" rx="1"/>',
    print: '<rect x="6" y="2" width="12" height="6"/><rect x="3" y="8" width="18" height="9" rx="2"/><rect x="7" y="14" width="10" height="8" fill="#fff" stroke="currentColor" stroke-width="1.5"/>',
    redo: '<path d="M19 8a8 8 0 1 0 1.5 6" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M20 3v6h-6z"/>',
    home: '<path d="M3 11.5L12 4l9 7.5V21h-6v-6H9v6H3z"/>',
    exit: '<path d="M10 4H5v16h5" stroke="currentColor" stroke-width="2.4" fill="none"/><path d="M14 8l4 4-4 4M18 12H9" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
  };
  U.icon = (name, cls) => '<svg class="ico ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">' + (ICON[name] || "") + "</svg>";

  PP.U = U;
})();
