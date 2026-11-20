/* Puerto Palabra · Guardado local (localStorage) y ajustes.
   No se guardan datos personales: solo un código anónimo, el curso y el progreso. */
window.PP = window.PP || {};
(function () {
  "use strict";
  const KEY = "puertoPalabra.v1";

  const AJUSTES_DEF = {
    volMusica: 0.55, volEfectos: 0.8, silencio: false,
    narracion: true, velocidadVoz: 1,
    subtitulosRadio: false,
    tamTexto: 1,            // 1, 1.2, 1.4
    altoContraste: false,
    reducirMovimiento: false,
    sinTiempo: false,       // sin límite de tiempo
    control: "clasico",     // "clasico" (arriba acelera, abajo marcha atrás, lados giran) | "sencillo" (direccional)
    ayudasProgresivas: true,
    emisora: "auto"         // emisora de radio de la moto (ver PP.Audio.RADIOS)
  };

  function leer() {
    try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
  }
  function escribir(obj) {
    try { localStorage.setItem(KEY, JSON.stringify(obj)); return true; } catch (e) { return false; }
  }

  const base = leer() || {};
  PP.datos = {
    ajustes: Object.assign({}, AJUSTES_DEF, base.ajustes || {}),
    perfil: base.perfil || null,            // { codigo, curso, avatar, alias }
    progreso: base.progreso || {},          // por clave perfil+curso: { misiones:{id:{estrellas,mejor}}, doradas:[], logros:[], vehiculo, color }
    historial: base.historial || []         // resúmenes de sesiones finalizadas (máx. 60)
  };
  // Migración: la conducción por defecto pasó a ser la clásica (acelerar / marcha atrás / girar)
  if (!PP.datos.ajustes.controlV2) { PP.datos.ajustes.control = "clasico"; PP.datos.ajustes.controlV2 = true; }
  PP.ajustes = PP.datos.ajustes;

  PP.Store = {
    guardar() { return escribir(PP.datos); },
    disponible() { try { localStorage.setItem(KEY + ".t", "1"); localStorage.removeItem(KEY + ".t"); return true; } catch (e) { return false; } },
    clave() { const p = PP.datos.perfil; return p ? (p.codigo || "anonimo") + "|" + p.curso : "anonimo|0"; },
    progreso() {
      const k = this.clave();
      if (!PP.datos.progreso[k]) PP.datos.progreso[k] = { misiones: {}, minijuegos: {}, doradas: [], logros: [], vehiculo: "moto", color: "#ff4f7b", fotos: 0 };
      return PP.datos.progreso[k];
    },
    borrarProgresoActual() { delete PP.datos.progreso[this.clave()]; this.guardar(); },
    borrarTodo() { try { localStorage.removeItem(KEY); } catch (e) {} PP.datos.progreso = {}; PP.datos.historial = []; PP.datos.perfil = null; },
    restablecerAjustes() { Object.assign(PP.ajustes, AJUSTES_DEF); this.guardar(); }
  };
})();
