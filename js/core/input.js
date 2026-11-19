/* Puerto Palabra · Entrada: teclado, ratón, táctil y pizarra digital.
   Mantiene un vector de dirección (x,y), acelerar/frenar y acciones puntuales. */
window.PP = window.PP || {};
(function () {
  "use strict";
  const I = { teclas: {}, joy: { x: 0, y: 0, activo: false }, pulsado: {}, tactil: false };

  const MAPA = {
    ArrowUp: "arriba", KeyW: "arriba", ArrowDown: "abajo", KeyS: "abajo",
    ArrowLeft: "izq", KeyA: "izq", ArrowRight: "der", KeyD: "der",
    Space: "accion", Enter: "accion", KeyE: "accion",
    KeyM: "mapa", KeyP: "pausa", Escape: "pausa", KeyG: "gps", ShiftLeft: "turbo", ShiftRight: "turbo", KeyH: "pito"
  };

  function enCampoTexto(e) { const t = e.target; return t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable); }

  window.addEventListener("keydown", (e) => {
    if (PP.Audio) PP.Audio.init();
    if (enCampoTexto(e)) return;
    const a = MAPA[e.code]; if (!a) return;
    // Solo bloqueamos el desplazamiento de la página cuando se está conduciendo
    if (PP.juego && PP.juego.modo === "mundo" && ["arriba", "abajo", "izq", "der", "accion"].includes(a)) e.preventDefault();
    if (!I.teclas[a]) I.pulsado[a] = true;
    I.teclas[a] = true;
  });
  window.addEventListener("keyup", (e) => { const a = MAPA[e.code]; if (a) I.teclas[a] = false; });
  window.addEventListener("blur", () => { I.teclas = {}; I.joy.x = I.joy.y = 0; I.joy.activo = false; });
  window.addEventListener("pointerdown", (e) => { if (PP.Audio) PP.Audio.init(); if (e.pointerType === "touch" || e.pointerType === "pen") { I.tactil = true; document.body.classList.add("tactil"); } }, { capture: true });

  /** Consume una acción puntual (devuelve true una sola vez por pulsación) */
  I.tomar = function (a) { if (I.pulsado[a]) { I.pulsado[a] = false; return true; } return false; };
  I.limpiarPulsados = function () { I.pulsado = {}; };

  /** Vector de dirección deseada combinando teclado y joystick */
  I.direccion = function () {
    let x = (I.teclas.der ? 1 : 0) - (I.teclas.izq ? 1 : 0);
    let y = (I.teclas.abajo ? 1 : 0) - (I.teclas.arriba ? 1 : 0);
    if (I.joy.activo) { x = I.joy.x; y = I.joy.y; }
    return { x, y };
  };

  // Joystick virtual (se muestra en pantallas táctiles)
  I.montarJoystick = function (zona, mando) {
    let id = null, cx = 0, cy = 0;
    const R = 56;
    const mover = (e) => {
      const dx = e.clientX - cx, dy = e.clientY - cy, d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / R);
      I.joy.x = (dx / d) * k; I.joy.y = (dy / d) * k;
      mando.style.transform = "translate(" + (I.joy.x * R) + "px," + (I.joy.y * R) + "px)";
    };
    zona.addEventListener("pointerdown", (e) => {
      if (id !== null) return; id = e.pointerId; try { zona.setPointerCapture(id); } catch (err) { /* algunos navegadores no lo permiten */ }
      const r = zona.getBoundingClientRect(); cx = r.left + r.width / 2; cy = r.top + r.height / 2;
      I.joy.activo = true; mover(e); e.preventDefault();
    });
    zona.addEventListener("pointermove", (e) => { if (e.pointerId === id) mover(e); });
    const fin = (e) => { if (e.pointerId !== id) return; id = null; I.joy.activo = false; I.joy.x = I.joy.y = 0; mando.style.transform = ""; };
    zona.addEventListener("pointerup", fin); zona.addEventListener("pointercancel", fin);
  };

  PP.Input = I;
})();

// Si el dispositivo tiene pantalla táctil (tableta, pizarra digital), se muestran los mandos desde el principio
(function () {
  const tactil = (navigator.maxTouchPoints || 0) > 0 || "ontouchstart" in window;
  if (tactil) { PP.Input.tactil = true; const marcar = () => document.body && document.body.classList.add("tactil"); if (document.body) marcar(); else document.addEventListener("DOMContentLoaded", marcar); }
})();
