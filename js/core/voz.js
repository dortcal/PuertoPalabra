/* Puerto Palabra · Narración con la síntesis de voz del navegador (Web Speech API).
   Si el dispositivo no tiene voces en español, el juego muestra siempre el texto. */
window.PP = window.PP || {};
(function () {
  "use strict";
  const V = { voz: null, disponible: "speechSynthesis" in window, hablando: false };

  function elegirVoz() {
    if (!V.disponible) return;
    const vs = window.speechSynthesis.getVoices() || [];
    const es = vs.filter((v) => /^es/i.test(v.lang));
    V.voz = es.find((v) => /es-ES/i.test(v.lang) && /google|natural|online/i.test(v.name)) ||
            es.find((v) => /es-ES/i.test(v.lang)) || es.find((v) => /es-(MX|US|419)/i.test(v.lang)) || es[0] || null;
    V.hayEspanol = !!V.voz;
  }
  if (V.disponible) { elegirVoz(); window.speechSynthesis.onvoiceschanged = elegirVoz; }

  // Limpia marcas internas antes de leer en voz alta
  const limpiar = (t) => String(t || "").replace(/<[^>]+>/g, " ").replace(/___+/g, ", hueco, ").replace(/\s+/g, " ").trim();

  /** Lee un texto. opciones: {forzar, alTerminar, velocidad} */
  V.decir = function (texto, op) {
    op = op || {};
    if (!V.disponible || (!PP.ajustes.narracion && !op.forzar) || PP.ajustes.silencio) { if (op.alTerminar) setTimeout(op.alTerminar, 50); return false; }
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(limpiar(texto));
      u.lang = V.voz ? V.voz.lang : "es-ES"; if (V.voz) u.voice = V.voz;
      const ciclo = PP.juego && PP.juego.ciclo ? PP.juego.ciclo : 2;
      u.rate = (op.velocidad || (ciclo === 1 ? 0.88 : ciclo === 2 ? 0.95 : 1)) * (PP.ajustes.velocidadVoz || 1);
      u.pitch = op.tono || 1;
      u.volume = Math.min(1, 0.4 + PP.ajustes.volEfectos * 0.6);
      V.hablando = true;
      u.onend = u.onerror = () => { V.hablando = false; if (op.alTerminar) op.alTerminar(); };
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) { V.hablando = false; if (op.alTerminar) setTimeout(op.alTerminar, 50); return false; }
  };
  V.callar = function () { if (V.disponible) try { window.speechSynthesis.cancel(); } catch (e) {} V.hablando = false; };

  PP.Voz = V;
})();
