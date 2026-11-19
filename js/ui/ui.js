/* Puerto Palabra · Interfaz general: pantallas, HUD, móvil del juego, ajustes y avisos. */
window.PP = window.PP || {};
(function () {
  "use strict";
  const U = PP.U, el = U.el, $ = (s) => document.querySelector(s);
  const UI = {};

  // ---------------- Pantallas ----------------
  UI.mostrar = function (id) {
    document.querySelectorAll(".pantalla").forEach((p) => { const on = p.id === id; p.hidden = !on; p.setAttribute("aria-hidden", String(!on)); });
    const pan = document.getElementById(id);
    if (pan) setTimeout(() => { const f = pan.querySelector("[data-foco], button, input"); if (f) f.focus({ preventScroll: true }); }, 50);
  };

  // ---------------- Avisos (toasts) ----------------
  UI.toast = function (html, tipo, ms) {
    const c = $("#toasts");
    const t = el("div", { class: "toast " + (tipo || "info"), role: "status", html });
    c.appendChild(t);
    while (c.children.length > 3) c.firstChild.remove();
    setTimeout(() => t.classList.add("sale"), (ms || 3200));
    setTimeout(() => t.remove(), (ms || 3200) + 500);
  };

  // ---------------- Ajustes ----------------
  UI.aplicarAjustes = function () {
    const a = PP.ajustes, r = document.documentElement;
    r.style.setProperty("--escala-texto", a.tamTexto);
    document.body.classList.toggle("alto-contraste", !!a.altoContraste);
    document.body.classList.toggle("reducir-movimiento", !!a.reducirMovimiento);
    PP.Audio.aplicarVolumen();
    if (PP.juego && PP.juego.refrescarRadio) PP.juego.refrescarRadio();
    const bm = $("#btn-silencio"); if (bm) { bm.setAttribute("aria-pressed", String(a.silencio)); bm.innerHTML = U.icon("speaker") + (a.silencio ? '<span class="tachado"></span>' : ""); }
  };

  UI.panelAjustes = function (cont) {
    const a = PP.ajustes;
    cont.innerHTML = "";
    const fila = (etq, control) => el("label", { class: "ajuste" }, [el("span", { text: etq }), control]);
    const rango = (k, min, max, paso) => { const i = el("input", { type: "range", min, max, step: paso, value: a[k] }); i.addEventListener("input", () => { a[k] = Number(i.value); UI.aplicarAjustes(); PP.Store.guardar(); }); i.addEventListener("change", () => PP.Audio.sfx("clic")); return i; };
    const casilla = (k) => { const i = el("input", { type: "checkbox" }); i.checked = !!a[k]; i.addEventListener("change", () => { a[k] = i.checked; UI.aplicarAjustes(); PP.Store.guardar(); PP.Audio.sfx("clic"); }); return i; };
    const selector = (k, ops) => { const s = el("select", {}, ops.map(([v, t]) => el("option", { value: v, text: t }))); s.value = String(a[k]); s.addEventListener("change", () => { a[k] = isNaN(Number(s.value)) ? s.value : Number(s.value); UI.aplicarAjustes(); PP.Store.guardar(); }); return s; };
    cont.append(
      el("h3", { text: "Sonido" }),
      fila("Música", rango("volMusica", 0, 1, 0.05)),
      fila("Efectos y voz", rango("volEfectos", 0, 1, 0.05)),
      fila("Silenciar todo", casilla("silencio")),
      fila("Narración en voz alta", casilla("narracion")),
      fila("Velocidad de la voz", selector("velocidadVoz", [["0.8", "Lenta"], ["1", "Normal"], ["1.15", "Rápida"]])),
      fila("Subtítulos en la radio", casilla("subtitulosRadio")),
      el("h3", { text: "Lectura y vista" }),
      fila("Tamaño del texto", selector("tamTexto", [["1", "Normal"], ["1.2", "Grande"], ["1.4", "Muy grande"]])),
      fila("Alto contraste", casilla("altoContraste")),
      fila("Reducir movimiento y efectos", casilla("reducirMovimiento")),
      el("h3", { text: "Juego" }),
      fila("Sin límite de tiempo (modo tranquilo)", casilla("sinTiempo")),
      fila("Ayudas progresivas (pistas)", casilla("ayudasProgresivas")),
      fila("Emisora de radio de la moto", selector("emisora", PP.Audio.RADIOS.map((r) => [r.id, r.nombre + (r.frec ? " " + r.frec : "") + " · " + r.estilo]))),
      fila("Conducción", selector("control", [["clasico", "Clásica: ↑ acelera, ↓ marcha atrás, ← → giran"], ["sencillo", "Sencilla: la flecha indica hacia dónde ir"]]))
    );
    if (!PP.Voz.hayEspanol) cont.appendChild(el("p", { class: "nota", text: "Aviso: este dispositivo no tiene una voz en español instalada; los textos siempre aparecen escritos." }));
    if (!PP.Store.disponible()) cont.appendChild(el("p", { class: "nota", text: "Aviso: el navegador no permite guardar datos (modo privado). El progreso se perderá al cerrar." }));
  };

  // ---------------- HUD ----------------
  UI.actualizarHUD = function () {
    const J = PP.juego; if (!J || !J.curso) return;
    $("#hud-puntos").textContent = J.sesionPuntos();
    $("#hud-curso").textContent = J.curso + ".º · " + (J.alias || "");
    const pr = PP.Store.progreso();
    const est = Object.values(pr.misiones).reduce((a, m) => a + (m.estrellas || 0), 0);
    $("#hud-estrellas").textContent = est;
    const barras = $("#hud-barrios"); barras.innerHTML = "";
    Object.keys(PP.BARRIOS).forEach((b) => {
      const v = PP.Mundo.restauracion[b] || 0;
      barras.appendChild(el("div", { class: "hud-barrio", title: PP.BARRIOS[b].nombre + ": " + Math.round(v * 100) + "% recuperado", "aria-label": PP.BARRIOS[b].nombre + " " + Math.round(v * 100) + " por ciento recuperado" }, [
        el("span", { text: PP.BARRIOS[b].bloque }), el("div", { class: "b" }, [el("i", { style: { width: Math.round(v * 100) + "%", background: PP.BARRIOS[b].color } })])
      ]));
    });
  };

  UI.objetivo = function (o) {
    const box = $("#objetivo");
    if (!o) { box.hidden = true; box.innerHTML = ""; return; }
    box.hidden = false; box.innerHTML = "";
    box.appendChild(el("div", { class: "obj-cab", html: (o.icono ? U.icon(o.icono) : "") + "<b>" + U.esc(o.titulo || "") + "</b>" }));
    if (o.texto) box.appendChild(el("p", { class: "obj-txt", html: o.texto }));
    if (o.progreso) box.appendChild(el("p", { class: "obj-prog", text: o.progreso }));
    if (o.botones && o.botones.length) {
      const f = el("div", { class: "obj-btns" });
      o.botones.forEach((b) => f.appendChild(el("button", { class: "btn " + (b.clase || "btn-sec") + " btn-peq", type: "button", html: (b.icono ? U.icon(b.icono) : "") + U.esc(b.t), onclick: () => { PP.Audio.sfx("clic"); b.f(); } })));
      box.appendChild(f);
    }
  };
  UI.progresoObjetivo = function (txt) { const p = document.querySelector("#objetivo .obj-prog"); if (p) p.textContent = txt; };

  UI.aviso = function (m) {
    const a = $("#aviso-cerca"), b = $("#btn-accion");
    if (m) {
      a.hidden = false; a.innerHTML = '<span class="mini-rombo" style="background:' + m.color + '"></span><div><b>' + U.esc(m.titulo) + "</b><small>" + (m.bloqueada ? "Completa " + m.requiere + " misiones para desbloquearla" : (PP.Input.tactil ? "Toca el botón ▶" : "Pulsa ESPACIO o ENTER") + " para empezar") + "</small></div>";
      b.classList.add("listo"); b.innerHTML = U.icon(m.bloqueada ? "lock" : "play"); b.setAttribute("aria-label", "Empezar misión " + m.titulo);
    } else {
      a.hidden = true; b.classList.remove("listo");
      const enPers = !!PP.Mundo.borron;
      b.innerHTML = U.icon(enPers ? "camera" : "radio"); b.setAttribute("aria-label", enPers ? "Hacer foto" : "Tocar el claxon");
    }
  };

  // Ticker de la radio: cada emisora tiene sus propios mensajes
  const TICKERS = {
    auto: [
      "Estás escuchando Radio Onda Volcán, la radio de Puerto Palabra.",
      "Consejo del día: antes de compartir un mensaje, pregúntate quién lo dice y cómo lo sabe.",
      "En Canarias decimos guagua, papa y millo. ¡Otra forma de decir las cosas, igual de correcta!",
      "La biblioteca municipal abre por la tarde. ¿Ya sabes cuál será tu próxima lectura?",
      "Busca las palabras doradas escondidas por la ciudad: son monedas con una Ñ.",
      "Aviso de tráfico: circulación tranquila en el Paseo Marítimo.",
      "El Borrón ha sido visto cerca de la Fábrica de Palabras. ¡Atención, reporteros!",
      "Recuerda: escribir es reescribir. Revisa siempre tus textos antes de publicarlos."
    ],
    alisio: ["Alisio FM 92.7 · Música suave para recorrer Puerto Palabra sin prisa.", "Respira hondo: leer despacio también es avanzar.", "Truco de reportero: si un texto es difícil, léelo una segunda vez, en voz baja."],
    timple: ["Timple y Brisa 101.3 · El timple es un instrumento muy típico de Canarias.", "En Canarias se dice «guagua» para el autobús y «millo» para el maíz.", "Las palabras que usamos en casa también forman parte de nuestra cultura."],
    rock: ["Roque Rock 105.5 · ¡Sube el volumen de las ideas, no el de los gritos!", "Una buena letra de canción cuenta una historia con ritmo y con emoción.", "Pista: la rima consonante repite todos los sonidos desde la última vocal con fuerza; la asonante, solo las vocales."],
    salsa: ["Salsa del Atlántico 96.1 · Las canciones cuentan historias: ¿qué te cuenta la que suena?", "El Atlántico une Canarias, América y la Península: las palabras también viajan en barco.", "Una canción es un texto: tiene tema, personajes y emociones."],
    clasica: ["Radio Teide Clásica 88.9 · Música suave de cuerdas para concentrarse.", "Leer en silencio y escribir con calma: dos grandes trucos de reportero.", "Cuando un texto te guste, subraya la frase que más te haya gustado y cuéntale a alguien por qué."],
    palabra: [
      "Radio Palabra 99.9 · ¿Sabías que…? Las palabras esdrújulas llevan siempre tilde: «música», «sábado».",
      "¿Sabías que…? «Ahí» señala un lugar, «hay» es del verbo haber y «¡ay!» expresa dolor o sorpresa.",
      "¿Sabías que…? «Porque» (junto) da una razón; «por qué» (separado) pregunta.",
      "¿Sabías que…? Un diptongo junta dos vocales en una sílaba (puer-to); un hiato las separa (pa-ís).",
      "¿Sabías que…? Una palabra polisémica tiene varios significados, como «pie» (del cuerpo, de una foto, de una montaña).",
      "¿Sabías que…? Antes de «b» y de «p» se escribe «m»: «también», «campo».",
      "¿Sabías que…? «Haber» es un verbo y «a ver» significa mirar.",
      "¿Sabías que…? Los sinónimos significan casi lo mismo y los antónimos, lo contrario."
    ],
    off: ["Radio apagada · Solo se oyen el motor y la ciudad. Pulsa R para volver a sintonizar."]
  };
  let tickerI = 0;
  UI.etiquetaEmisora = function () {
    const r = PP.Audio.radioActual(), t = $("#ticker-emisora");
    if (t) t.textContent = (r.id === "off" ? "RADIO APAGADA" : r.nombre.toUpperCase() + (r.frec ? " " + r.frec : ""));
  };
  UI.ticker = function (txt) {
    const t = $("#ticker-txt"); if (!t) return;
    const lista = TICKERS[PP.Audio.radioActual().id] || TICKERS.auto;
    t.textContent = txt || lista[tickerI++ % lista.length];
    t.classList.remove("corre"); void t.offsetWidth; t.classList.add("corre");
  };
  UI.reiniciarTicker = function () { tickerI = 0; UI.etiquetaEmisora(); UI.ticker(); };

  // ---------------- Diálogo genérico y código de partida ----------------
  UI.dialogo = function (o) {
    const f = $("#dialogo"); f.innerHTML = ""; f.hidden = false;
    const cerrar = () => { f.hidden = true; f.innerHTML = ""; document.removeEventListener("keydown", tecla, true); };
    const tecla = (e) => { if (e.code === "Escape") { e.stopPropagation(); e.preventDefault(); cerrar(); if (o.alCerrar) o.alCerrar(); } };
    document.addEventListener("keydown", tecla, true);
    const botones = el("div", { class: "fila-centro" }, (o.botones || []).map((b) => el("button", { class: "btn " + (b.clase || "btn-sec"), type: "button", html: (b.icono ? U.icon(b.icono) : "") + U.esc(b.t), onclick: () => { PP.Audio.sfx("clic"); if (b.cerrar !== false) cerrar(); if (b.f) b.f(); } })));
    const caja = el("div", { class: "dlg-conf", role: "dialog", "aria-modal": "true", "aria-labelledby": "dlg-tit" }, [el("h2", { id: "dlg-tit", text: o.titulo })].concat(o.cuerpo || [], [botones]));
    f.appendChild(caja);
    setTimeout(() => { const b = caja.querySelector(".btn-primario") || caja.querySelector("button"); if (b) b.focus(); }, 30);
    return { cerrar };
  };

  /** Bloque con el código de partida actual: texto, copiar y descargar */
  UI.bloqueCodigo = function () {
    if (PP.juego && PP.juego.guardarPos) PP.juego.guardarPos();
    const cod = PP.Codigo.generar();
    if (!cod) return el("p", { class: "nota", text: "Todavía no hay una partida que guardar." });
    const estado = el("span", { class: "codigo-estado", role: "status", "aria-live": "polite" });
    return el("div", { class: "bloque-codigo" }, [
      el("p", { html: "<b>Tu código de partida</b>: anótalo o cópialo. Con él podrás continuar en cualquier dispositivo desde «Continuar con código»." }),
      el("code", { class: "codigo-valor", tabindex: "0", text: cod }),
      el("div", { class: "fila-centro" }, [
        el("button", { class: "btn btn-sec btn-peq", type: "button", html: U.icon("doc") + "Copiar código", onclick: async () => { const ok = await PP.Codigo.copiar(cod); estado.textContent = ok ? "Código copiado." : "No se pudo copiar: selecciona el código y cópialo a mano."; PP.Audio.sfx(ok ? "bien" : "mal"); } }),
        el("button", { class: "btn btn-sec btn-peq", type: "button", html: U.icon("download") + "Descargar .txt", onclick: () => { const ok = PP.Codigo.descargar(cod); estado.textContent = ok ? "Archivo descargado." : "Tu navegador no permite descargar aquí: copia el código a mano."; } }),
        estado
      ]),
      el("p", { class: "nota", text: "El código guarda tu progreso (misiones, estrellas, palabras doradas, logros, vehículo y dónde estabas). No contiene datos personales." })
    ]);
  };

  /** Botón «menú principal» del juego: pregunta y ofrece el código antes de salir */
  UI.confirmarSalida = function () {
    const J = PP.juego, yaPausado = J.pausado; J.pausar(true);
    UI.dialogo({
      titulo: "¿Volver al menú principal?",
      cuerpo: [el("p", { text: "Tu progreso queda guardado en este dispositivo. Si quieres seguir en otro, guarda tu código de partida." }), UI.bloqueCodigo()],
      botones: [
        { t: "Seguir jugando", clase: "btn-primario", icono: "play", f: () => { if (!yaPausado) J.pausar(false); } },
        { t: "Salir al menú", clase: "btn-terc", icono: "exit", f: () => { PP.juego.salirAlMenu(); } }
      ],
      alCerrar: () => { if (!yaPausado) J.pausar(false); }
    });
  };

  // ---------------- Móvil del juego (menú de pausa) ----------------
  UI.abrirMovil = function (pestana) {
    const J = PP.juego; J.pausar(true);
    const m = $("#movil"); m.hidden = false;
    const tabs = [["misiones", "Misiones", "trophy"], ["mapa", "Mapa", "map"], ["coleccion", "Colección", "star"], ["ajustes", "Ajustes", "gear"], ["partida", "Partida", "download"], ["informe", "Informe", "doc"]];
    const nav = $("#movil-tabs"); nav.innerHTML = "";
    tabs.forEach(([id, t, ic]) => nav.appendChild(el("button", { class: "tab" + (id === (pestana || "misiones") ? " activa" : ""), type: "button", role: "tab", "aria-selected": String(id === (pestana || "misiones")), html: U.icon(ic) + "<span>" + t + "</span>", onclick: () => { PP.Audio.sfx("clic"); UI.abrirMovil(id); } })));
    const c = $("#movil-cuerpo"); c.innerHTML = "";
    const p = pestana || "misiones";
    if (p === "misiones") pintarMisiones(c);
    else if (p === "mapa") { const cv = el("canvas", { class: "mapa-grande", width: 720, height: 560, "aria-label": "Mapa de Puerto Palabra" }); c.appendChild(cv); PP.Mundo.dibujarMapaGrande(cv); c.appendChild(el("p", { class: "nota", text: "Los rombos de colores son misiones. El punto rosa eres tú." })); }
    else if (p === "coleccion") pintarColeccion(c);
    else if (p === "ajustes") { const d = el("div", { class: "ajustes" }); c.appendChild(d); UI.panelAjustes(d); }
    else if (p === "partida") {
      c.append(el("h3", { text: "Guardar la partida" }), UI.bloqueCodigo(),
        el("p", { class: "nota", text: "Tu progreso también se guarda solo en este dispositivo. El código sirve para llevártelo a otro o para tenerlo apuntado." }));
    }
    else if (p === "informe") {
      c.append(el("p", { text: "El informe muestra qué has trabajado y cómo vas en cada criterio de Lengua. Tu docente puede imprimirlo o descargarlo." }),
        el("button", { class: "btn btn-primario", type: "button", html: U.icon("doc") + " Ver informe de esta sesión", onclick: () => { UI.cerrarMovil(false); PP.UI.informe(); } }));
    }
    $("#movil-cerrar").focus();
  };
  UI.cerrarMovil = function (reanudar) { $("#movil").hidden = true; if (reanudar !== false) PP.juego.pausar(false); };

  function pintarMisiones(c) {
    const pr = PP.Store.progreso(), J = PP.juego;
    const hechas = Object.keys(pr.misiones).length;
    Object.keys(PP.BARRIOS).forEach((b) => {
      const B = PP.BARRIOS[b];
      const grupo = el("section", { class: "grupo-mis" }, [el("h3", { html: '<span class="punto" style="background:' + B.color + '"></span>' + U.esc(B.nombre) + " <small>Bloque " + B.bloque + ": " + U.esc(PP.CURRICULO.bloques[B.bloque].nombre) + "</small>" })]);
      PP.MISIONES.filter((m) => m.barrio === b).sort((x, y) => (x.final ? 1 : 0) - (y.final ? 1 : 0)).forEach((m) => {
        const st = pr.misiones[m.id], bloq = m.requiere && hechas < m.requiere;
        const lugar = PP.Ciudad.lugares[m.lugar];
        grupo.appendChild(el("div", { class: "fila-mis" + (st ? " hecha" : "") }, [
          el("div", { class: "fm-info", html: "<b>" + U.esc(m.titulo) + "</b><small>" + U.esc(lugar ? lugar.nombre : "") + " · Criterios " + m.criterios.join(", ") + "</small>" }),
          el("div", { class: "fm-est", "aria-label": (st ? st.estrellas : 0) + " estrellas", html: [1, 2, 3].map((k) => '<span class="' + (st && st.estrellas >= k ? "on" : "") + '">★</span>').join("") }),
          bloq ? el("span", { class: "fm-bloq", html: U.icon("lock") + " " + hechas + "/" + m.requiere })
            : el("div", { class: "fm-btns" }, [
              el("button", { class: "btn btn-sec btn-peq", type: "button", html: U.icon("gps") + "GPS", onclick: () => { UI.cerrarMovil(); J.gpsA(lugar); } }),
              el("button", { class: "btn btn-primario btn-peq", type: "button", html: U.icon("play") + "Guagua", title: "Viajar en guagua hasta la misión", onclick: () => { UI.cerrarMovil(); PP.Mundo.colocarJugador(m.lugar); UI.toast("¡Has llegado en guagua a " + U.esc(lugar.nombre) + "!", "info"); } })
            ])
        ]));
      });
      c.appendChild(grupo);
    });
  }

  function pintarColeccion(c) {
    const pr = PP.Store.progreso(), J = PP.juego;
    c.appendChild(el("h3", { text: "Palabras doradas (" + pr.doradas.length + "/" + PP.PALABRAS_DORADAS.length + ")" }));
    const g = el("div", { class: "rejilla-doradas" });
    PP.PALABRAS_DORADAS.forEach((p, i) => g.appendChild(el("div", { class: "dorada" + (pr.doradas.includes(i) ? " on" : ""), html: pr.doradas.includes(i) ? "<b>" + U.esc(p.p) + "</b><small>" + U.esc(p.d) + "</small>" : "<b>?</b><small>Búscala por la ciudad</small>" })));
    c.appendChild(g);
    c.appendChild(el("h3", { text: "Vehículos" }));
    const v = el("div", { class: "rejilla-veh" });
    J.VEHICULOS.forEach((ve) => {
      const libre = J.prestigio() >= ve.coste;
      const cv = el("canvas", { width: 120, height: 70 });
      const b = el("button", { class: "veh" + (pr.vehiculo === ve.id ? " sel" : ""), type: "button", disabled: !libre, "aria-label": ve.nombre + (libre ? "" : ", bloqueado") }, [cv, el("span", { html: U.esc(ve.nombre) + (libre ? "" : "<small>" + U.icon("lock") + ve.coste + " pts</small>") })]);
      const g2 = cv.getContext("2d"); PP.Dibujo.vehiculo(g2, ve.id, pr.color, 60, 35, 0, ve.id === "guagua" ? 1 : 1.6, { casco: "#ffd23f" });
      b.addEventListener("click", () => { pr.vehiculo = ve.id; PP.Store.guardar(); PP.Audio.sfx("desbloqueo"); pintarCol(); });
      v.appendChild(b);
    });
    c.appendChild(v);
    const cols = el("div", { class: "colores" }, PP.Codigo.COLORES.map((col) => el("button", { class: "color" + (pr.color === col ? " sel" : ""), type: "button", style: { background: col }, "aria-label": "Color " + col, onclick: () => { pr.color = col; PP.Store.guardar(); pintarCol(); } })));
    c.appendChild(cols);
    c.appendChild(el("h3", { text: "Logros (" + pr.logros.length + "/" + J.LOGROS.length + ")" }));
    c.appendChild(el("div", { class: "rejilla-logros" }, J.LOGROS.map((l) => el("div", { class: "logro" + (pr.logros.includes(l.id) ? " on" : ""), html: U.icon("trophy") + "<b>" + U.esc(l.t) + "</b><small>" + U.esc(l.d) + "</small>" }))));
    function pintarCol() { c.innerHTML = ""; pintarColeccion(c); }
  }

  PP.UI = UI;
})();
