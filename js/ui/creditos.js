/* Puerto Palabra · Créditos y licencia.
   Diseñado por David OZC · © David 2026 · CC BY-NC-ND (Reconocimiento – NoComercial – SinObraDerivada).
   Las insignias son dibujos SVG propios del juego (no hace falta conexión): círculo «cc», figura «BY»,
   dólar tachado «NC» e igual «ND». Se pintan en todos los elementos con el atributo data-creditos. */
window.PP = window.PP || {};
(function () {
  "use strict";
  const LICENCIA_URL = "https://creativecommons.org/licenses/by-nc-nd/4.0/deed.es";

  /** Cada insignia: círculo blanco con borde negro y el símbolo dentro */
  function insignia(titulo, interior) {
    return '<svg class="cc-ico" viewBox="0 0 64 64" role="img" aria-label="' + titulo + '"><title>' + titulo + '</title>' +
      '<circle cx="32" cy="32" r="29" fill="#fff" stroke="#000" stroke-width="5"/>' + interior + "</svg>";
  }
  const ICONOS = {
    cc: insignia("Creative Commons", '<g fill="none" stroke="#000" stroke-width="6" stroke-linecap="butt"><path d="M30 23.5A10 10 0 1 0 30 40.5"/><path d="M48 23.5A10 10 0 1 0 48 40.5" transform="translate(-6 0)"/></g>'),
    by: insignia("Reconocimiento (BY)", '<circle cx="32" cy="18.5" r="5" fill="#000"/><rect x="23" y="26" width="18" height="15" rx="2" fill="#000"/><rect x="28" y="41" width="8" height="10" fill="#000"/>'),
    nc: insignia("NoComercial (NC)", '<text x="32" y="43" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="34" fill="#000">$</text><line x1="16" y1="48" x2="48" y2="16" stroke="#fff" stroke-width="9"/><line x1="16" y1="48" x2="48" y2="16" stroke="#000" stroke-width="5"/>'),
    nd: insignia("SinObraDerivada (ND)", '<rect x="19" y="22" width="26" height="6.5" fill="#000"/><rect x="19" y="35.5" width="26" height="6.5" fill="#000"/>')
  };

  /** Bloque de créditos. opciones.claro: texto oscuro sobre fondo claro (informe) */
  function html(opciones) {
    const o = opciones || {};
    return '<div class="creditos-bloque' + (o.claro ? " claro" : "") + '">' +
      '<p class="cred-autor">Diseñado por <b>David OZC</b></p>' +
      '<a class="cc-enlace" href="' + LICENCIA_URL + '" target="_blank" rel="noopener license" title="Licencia Creative Commons Reconocimiento – NoComercial – SinObraDerivada">' +
      '<span class="cc-insignias">' + ICONOS.cc + ICONOS.by + ICONOS.nc + ICONOS.nd + "</span>" +
      '<span class="cc-texto"><b>CC BY-NC-ND</b><small>Reconocimiento · NoComercial · SinObraDerivada</small></span></a>' +
      '<p class="cred-pie">© David 2026 · Uso gratuito en centros educativos</p></div>';
  }
  function pintar() { document.querySelectorAll("[data-creditos]").forEach((e) => { e.innerHTML = html({ claro: e.dataset.creditos === "claro" }); }); }

  PP.Creditos = { html, pintar, URL: LICENCIA_URL };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", pintar); else pintar();
})();
