/* Puerto Palabra · Gestor del juego: flujo de pantallas, misiones, progreso y recompensas. */
window.PP = window.PP || {};
(function () {
  "use strict";
  const U = PP.U, el = U.el, $ = (s) => document.querySelector(s);
  const M = PP.Mundo, UI = PP.UI, E = PP.Eval, Esc = PP.Escenas;

  const J = {
    modo: "menu", curso: null, ciclo: null, avatar: PP.AVATARES[0], alias: "", contenido: null, misionActiva: null, pausado: false,
    VEHICULOS: [
      { id: "moto", nombre: "Moto de reportero", coste: 0 },
      { id: "scooter", nombre: "Scooter clásica", coste: 400 },
      { id: "buggy", nombre: "Buggy de playa", coste: 900 },
      { id: "guagua", nombre: "Guagua de prensa", coste: 1600 }
    ],
    LOGROS: [
      { id: "primera", t: "Primera exclusiva", d: "Completa tu primera misión." },
      { id: "poliglota", t: "Oído atlántico", d: "Consigue 3 estrellas en «Turistas en el muelle»." },
      { id: "mediador", t: "Palabra de paz", d: "Consigue 3 estrellas en «Lío en la guagua»." },
      { id: "cazabulos", t: "Cazabulos", d: "Consigue 3 estrellas en «Cazabulos»." },
      { id: "poeta", t: "Pluma de oro", d: "Consigue 3 estrellas en «Poeta sin rima»." },
      { id: "sinborrones", t: "Sin borrones", d: "Termina una misión sin ningún error." },
      { id: "turbo", t: "Turbo total", d: "Acierta todos los pórticos de la autopista." },
      { id: "fotografo", t: "Foto de portada", d: "Fotografía al Borrón tres veces." },
      { id: "barrio", t: "Color recuperado", d: "Devuelve el color a un barrio entero." },
      { id: "ciudad", t: "Ciudad a todo color", d: "Recupera los cuatro barrios." },
      { id: "doradas5", t: "Buscador de tesoros", d: "Encuentra 5 palabras doradas." },
      { id: "doradas", t: "Diccionario canario", d: "Encuentra todas las palabras doradas." }
    ]
  };
  PP.juego = J;

  J.prestigio = () => { const pr = PP.Store.progreso(); return pr.puntos || 0; };
  J.sesionPuntos = () => (E.sesion ? E.sesion.puntos : 0);
  J.sumar = function (n) {
    if (!E.sesion) return;
    E.sesion.puntos += n; const pr = PP.Store.progreso(); pr.puntos = (pr.puntos || 0) + n;
    const antes = J.VEHICULOS.filter((v) => (pr.puntos - n) >= v.coste).length, ahora = J.VEHICULOS.filter((v) => pr.puntos >= v.coste).length;
    if (ahora > antes) { const v = J.VEHICULOS[ahora - 1]; setTimeout(() => { PP.Audio.sfx("desbloqueo"); UI.toast(U.icon("trophy") + " ¡Nuevo vehículo desbloqueado: <b>" + U.esc(v.nombre) + "</b>! Cámbialo en el móvil → Colección.", "premio", 4500); }, 600); }
    UI.actualizarHUD();
  };
  J.logro = function (id) {
    const pr = PP.Store.progreso(); if (pr.logros.includes(id)) return;
    pr.logros.push(id); PP.Store.guardar();
    const l = J.LOGROS.find((x) => x.id === id);
    setTimeout(() => { PP.Audio.sfx("desbloqueo"); UI.toast(U.icon("trophy") + " Logro: <b>" + U.esc(l.t) + "</b>", "premio", 4000); }, 900);
  };

  // ---------------- Arranque ----------------
  function iniciar() {
    M.init($("#mundo"), $("#minimapa"));
    UI.aplicarAjustes();
    M.modoAtraccion = true;
    PP.Input.montarJoystick($("#joystick"), $("#joystick .mando"));
    // Botones de la pantalla de inicio
    $("#btn-jugar").addEventListener("click", () => { PP.Audio.init(); PP.Audio.sfx("inicio"); pantallaPerfil(); });
    $("#btn-como").addEventListener("click", () => { PP.Audio.init(); PP.Audio.sfx("clic"); UI.mostrar("pantalla-como"); });
    $("#btn-ajustes-inicio").addEventListener("click", () => { PP.Audio.init(); PP.Audio.sfx("clic"); UI.panelAjustes($("#ajustes-inicio-cuerpo")); UI.mostrar("pantalla-ajustes"); });
    $("#btn-docente").addEventListener("click", () => { PP.Audio.init(); PP.Audio.sfx("clic"); UI.zonaDocente(); });
    document.querySelectorAll("[data-volver]").forEach((b) => b.addEventListener("click", () => { PP.Audio.sfx("clic"); UI.mostrar("pantalla-inicio"); }));
    $("#btn-silencio").addEventListener("click", () => { PP.ajustes.silencio = !PP.ajustes.silencio; UI.aplicarAjustes(); PP.Store.guardar(); if (PP.ajustes.silencio) PP.Voz.callar(); });
    // HUD
    $("#btn-movil").addEventListener("click", () => { PP.Audio.sfx("clic"); UI.abrirMovil(); });
    $("#movil-cerrar").addEventListener("click", () => { PP.Audio.sfx("clic"); UI.cerrarMovil(); });
    $("#btn-gps").addEventListener("click", () => { PP.Audio.sfx("clic"); gpsBoton(); });
    $("#btn-accion").addEventListener("click", () => { PP.Input.pulsado.accion = true; if (!M.avisoCerca && !M.borron) PP.Audio.sfx("pito"); });
    $("#btn-salir-menu").addEventListener("click", () => { UI.cerrarMovil(false); salirAlMenu(); });
    $("#btn-fin-sesion").addEventListener("click", () => { UI.cerrarMovil(false); UI.informe(); });
    M.cb.marcador = (m) => { if (J.modo !== "mundo" || J.misionActiva) return; if (m.bloqueada) { UI.toast("Esta misión se desbloquea al completar " + m.requiere + " misiones.", "info"); return; } empezarMision(PP.MISIONES.find((x) => x.id === m.id)); };
    M.cb.aviso = (m) => UI.aviso(m);
    M.cb.dorada = (i) => palabraDorada(i);
    document.addEventListener("keydown", (e) => {
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT")) return;
      if (e.code === "Escape" && !$("#movil").hidden) { UI.cerrarMovil(); return; }
      if (J.modo !== "mundo") return;
      if ((e.code === "Escape" || e.code === "KeyP") && $("#escena").hidden) UI.abrirMovil();
      if (e.code === "KeyM" && $("#escena").hidden) UI.abrirMovil("mapa");
      if (e.code === "KeyG") gpsBoton();
    });
    // Teclas numéricas para elegir opciones en escenas
    document.addEventListener("keydown", (e) => {
      if ($("#escena").hidden || /INPUT|TEXTAREA|SELECT/.test((e.target || {}).tagName || "")) return;
      const n = parseInt(e.key, 10); if (!n) return;
      const ops = Array.from(document.querySelectorAll("#escena .btn-opcion:not([disabled]), #escena .btn-clasif:not([disabled])"));
      if (ops[n - 1]) { ops[n - 1].click(); e.preventDefault(); }
    });
    setInterval(() => { if (J.modo === "mundo" && !J.pausado) UI.ticker(); }, 16000);
    setInterval(() => { if (E.sesion && J.modo !== "menu") { /* autoguardado ligero */ PP.Store.guardar(); } }, 20000);
    window.addEventListener("beforeunload", () => { try { if (E.sesion) E.archivar(); PP.Store.guardar(); } catch (e) {} });
    UI.mostrar("pantalla-inicio");
    PP.Audio.musica("menu");
  }

  // ---------------- Perfil ----------------
  function pantallaPerfil() {
    UI.mostrar("pantalla-perfil");
    const p = PP.datos.perfil || {};
    const cursos = $("#perfil-cursos"); cursos.innerHTML = "";
    let curso = p.curso || null, avatar = p.avatar || "nayra";
    for (let c = 1; c <= 6; c++) {
      const b = el("button", { class: "curso" + (curso === c ? " sel" : ""), type: "button", "aria-pressed": String(curso === c), html: "<b>" + c + ".º</b><small>" + Math.ceil(c / 2) + ".º ciclo</small>" });
      b.addEventListener("click", () => { PP.Audio.sfx("clic"); curso = c; cursos.querySelectorAll(".curso").forEach((x) => { x.classList.remove("sel"); x.setAttribute("aria-pressed", "false"); }); b.classList.add("sel"); b.setAttribute("aria-pressed", "true"); validar(); });
      cursos.appendChild(b);
    }
    const avs = $("#perfil-avatares"); avs.innerHTML = "";
    PP.AVATARES.forEach((a) => {
      const b = el("button", { class: "avatar" + (avatar === a.id ? " sel" : ""), type: "button", "aria-pressed": String(avatar === a.id), html: PP.retrato(a, "feliz") + "<span>" + a.nombre + "</span>" });
      b.addEventListener("click", () => { PP.Audio.sfx("clic"); avatar = a.id; avs.querySelectorAll(".avatar").forEach((x) => { x.classList.remove("sel"); x.setAttribute("aria-pressed", "false"); }); b.classList.add("sel"); b.setAttribute("aria-pressed", "true"); });
      avs.appendChild(b);
    });
    const cod = $("#perfil-codigo"); cod.value = p.codigo || "";
    const ir = $("#btn-perfil-ok");
    const validar = () => { ir.disabled = !curso; };
    validar();
    ir.onclick = () => {
      if (!curso) return;
      const codigo = cod.value.trim().replace(/[^A-Za-z0-9ºª\-_. ]/g, "").slice(0, 16) || "anónimo";
      PP.datos.perfil = { curso, avatar, codigo, alias: PP.AVATARES.find((a) => a.id === avatar).nombre };
      PP.Store.guardar();
      empezarPartida();
    };
  }

  function empezarPartida() {
    const p = PP.datos.perfil;
    J.curso = p.curso; J.ciclo = Math.ceil(p.curso / 2); J.avatar = PP.AVATARES.find((a) => a.id === p.avatar) || PP.AVATARES[0]; J.alias = p.alias;
    J.contenido = PP.CONTENIDO[J.curso];
    if (!J.contenido) { UI.toast("No hay contenidos para este curso.", "mal"); return; }
    if (!E.sesion || E.sesion.curso !== J.curso || E.sesion.codigo !== p.codigo) E.nueva(p);
    const pr = PP.Store.progreso();
    M.prepararDoradas(pr.doradas);
    if (!pr.introVista) { cinematica(() => { pr.introVista = true; PP.Store.guardar(); entrarAlMundo(true); }); }
    else entrarAlMundo(false);
  }

  // ---------------- Cinemática de introducción ----------------
  function cinematica(fin) {
    UI.mostrar("pantalla-intro");
    PP.Audio.musica("mision");
    const c = $("#intro-cuerpo"); c.innerHTML = "";
    const v = J.curso <= 2;
    const vinetas = [
      { r: null, fondo: "amanecer", t: "Amanece en Puerto Palabra, una ciudad junto al mar donde las palabras viajan en guagua, en barco y por la radio." },
      { r: PP.BORRON, animo: "enfadado", fondo: "noche", t: v ? "Pero esta noche ha llegado la Banda del Borrón. ¡Borra las palabras y la ciudad pierde sus colores!" : "Pero esta noche ha llegado la Banda del Borrón: borran palabras, desordenan historias y llenan la red de bulos. Donde pasan, la ciudad pierde sus colores." },
      { r: { nombre: "Directora de El Eco", piel: "morena", pelo: "#ddd", peinado: "mono", ropa: "#264653", fondo: "#cde4e0", gafas: true, edad: "mayor", pendientes: true }, animo: "normal", fondo: "redaccion", t: "Soy Carmela, directora del periódico El Eco. Necesito a mi mejor reportero o reportera para recuperar las palabras de la ciudad." },
      { r: J.avatar, animo: "feliz", fondo: "ciudad", t: "¡Ese eres tú, " + J.alias + "! Recorre los cuatro barrios, completa misiones y devuelve el color a Puerto Palabra. ¡Y consigue la foto del Borrón para la portada!" }
    ];
    let i = 0;
    const pintar = () => {
      const vi = vinetas[i];
      c.innerHTML = "";
      const panel = el("div", { class: "vineta fondo-" + vi.fondo }, [
        vi.r ? el("div", { class: "vin-retrato", html: PP.retrato(vi.r, vi.animo) }) : el("div", { class: "vin-ciudad", html: '<div class="sol"></div><div class="volcan-sil"></div><div class="mar"></div><div class="barco"></div>' }),
        el("p", { class: "vin-texto", text: vi.t })
      ]);
      c.appendChild(panel);
      PP.Voz.decir(vi.t);
      $("#intro-sig").innerHTML = i < vinetas.length - 1 ? "Siguiente " + U.icon("play") : "¡A la calle! " + U.icon("play");
      $("#intro-sig").focus();
    };
    $("#intro-sig").onclick = () => { PP.Audio.sfx("pagina"); i++; if (i >= vinetas.length) { PP.Voz.callar(); fin(); } else pintar(); };
    $("#intro-saltar").onclick = () => { PP.Voz.callar(); fin(); };
    pintar();
  }

  // ---------------- Mundo ----------------
  function entrarAlMundo(primeraVez) {
    UI.mostrar("pantalla-juego");
    M.modoAtraccion = false; M.activo = true; J.modo = "mundo"; J.pausado = false;
    M.ajustar();
    if (primeraVez) M.colocarJugador("colegio");
    refrescarMarcadores();
    UI.actualizarHUD(); UI.aviso(null); UI.ticker("Radio Onda Volcán: ¡bienvenido a Puerto Palabra, " + J.alias + "!");
    musicaBarrio(true);
    objetivoLibre();
    PP.Input.limpiarPulsados();
    if (primeraVez) setTimeout(() => Esc.aviso({ titulo: "¿Cómo se juega?", texto: "Conduce tu moto por la ciudad y entra en las misiones (los rombos de colores).", lista: [
      PP.Input.tactil ? "Joystick: <b>arriba</b> acelera, <b>abajo</b> marcha atrás, <b>izquierda y derecha</b> giran. El botón <b>▶</b> entra en la misión." : "Conduce con las <b>flechas</b> o <b>WASD</b>: <b>↑</b> acelera, <b>↓</b> marcha atrás, <b>←</b> y <b>→</b> giran. Entra en una misión con <b>ESPACIO</b> o <b>ENTER</b>.",
      "El botón <b>GPS</b> te marca el camino. Si lo pulsas dos veces, la moto conduce sola.",
      "El <b>móvil</b> (tecla P) tiene el mapa, las misiones, los ajustes y tu informe.",
      "Cada barrio trabaja un bloque de Lengua. ¡Completa sus misiones para devolverle el color!"
    ], retrato: J.avatar, animo: "feliz", boton: "¡Entendido!" }, { tema: "onda", titulo: "Bienvenida" }).then(() => { J.modo = "mundo"; }), 400);
  }
  J.volverAlMundo = function () { UI.mostrar("pantalla-juego"); J.modo = "mundo"; J.pausar(false); M.ajustar(); };
  function salirAlMenu() { if (E.sesion) E.archivar(); J.modo = "menu"; M.activo = false; M.modoAtraccion = true; M.limpiarObjetivos(); PP.Audio.motor(0, false); UI.mostrar("pantalla-inicio"); PP.Audio.musica("menu"); }

  J.pausar = function (p) {
    J.pausado = p; M.activo = !p && J.modo !== "menu";
    if (p) PP.Audio.motor(0, false);
  };

  let ultimoBarrio = null;
  function musicaBarrio(forzar) {
    if (J.misionActiva) return;
    const j = M.jugador, b = PP.Ciudad.barrioDe(Math.floor(j.x / PP.Ciudad.T), Math.floor(j.y / PP.Ciudad.T));
    if (b !== ultimoBarrio || forzar) {
      ultimoBarrio = b;
      if (PP.BARRIOS[b]) { PP.Audio.musica(PP.BARRIOS[b].musica); if (!forzar) UI.toast("<b>" + U.esc(PP.BARRIOS[b].nombre) + "</b><br><small>Bloque " + PP.BARRIOS[b].bloque + ": " + U.esc(PP.CURRICULO.bloques[PP.BARRIOS[b].bloque].nombre) + "</small>", "barrio", 2600); }
      else PP.Audio.musica("menu");
    }
  }
  setInterval(() => { if (J.modo === "mundo" && !J.pausado) musicaBarrio(false); }, 1000);

  function refrescarMarcadores() {
    const pr = PP.Store.progreso(), hechas = Object.keys(pr.misiones).length;
    M.fijarMarcadores(PP.MISIONES.map((m, k) => {
      const l = PP.Ciudad.lugares[m.lugar], st = pr.misiones[m.id];
      // la misión final comparte lugar con O2: se desplaza un poco
      const off = m.final ? 1.4 * PP.Ciudad.T : 0;
      return { id: m.id, x: l.x + off, y: l.y, color: m.final ? "#ffffff" : PP.BARRIOS[m.barrio].color, etiqueta: m.final ? "★" : m.id, titulo: m.titulo, hecha: !!st, estrellas: st ? st.estrellas : 0, bloqueada: m.requiere && hechas < m.requiere, requiere: m.requiere };
    }));
    // restauración de barrios
    Object.keys(PP.BARRIOS).forEach((b) => { const ms = PP.MISIONES.filter((m) => m.barrio === b && !m.final); M.restauracion[b] = ms.filter((m) => pr.misiones[m.id]).length / ms.length; });
    UI.actualizarHUD();
  }

  function objetivoLibre() {
    const pr = PP.Store.progreso(), hechas = Object.keys(pr.misiones).length;
    const sig = PP.MISIONES.find((m) => !pr.misiones[m.id] && !(m.requiere && hechas < m.requiere));
    UI.objetivo({ titulo: "Explora Puerto Palabra", icono: "map", texto: sig ? "Busca una misión (rombo de color). Te sugerimos: <b>" + U.esc(sig.titulo) + "</b> en " + U.esc(PP.Ciudad.lugares[sig.lugar].nombre) + "." : "¡Has completado todas las misiones! Puedes repetirlas para mejorar tus estrellas.", progreso: "Misiones: " + hechas + " / " + PP.MISIONES.length,
      botones: sig ? [{ t: "GPS", icono: "gps", f: () => J.gpsA(PP.Ciudad.lugares[sig.lugar]) }] : [] });
  }

  J.gpsA = function (destino) {
    if (!destino) return;
    if (M.rutaObjetivo === destino || (M.rutaObjetivo && M.rutaObjetivo.x === destino.x && M.rutaObjetivo.y === destino.y)) { M.autopiloto = !M.autopiloto; UI.toast(M.autopiloto ? "Conducción asistida activada. Toca una flecha para recuperar el control." : "Conducción asistida desactivada.", "info", 2200); return; }
    M.gps({ x: destino.x, y: destino.y }); UI.toast("Ruta marcada en el mapa. Pulsa GPS otra vez para que la moto conduzca sola.", "info", 2600);
  };
  function gpsBoton() {
    if (J.gpsActual) { J.gpsActual(); return; }
    // por defecto: la misión pendiente más cercana
    const pr = PP.Store.progreso(), j = M.jugador, hechas = Object.keys(pr.misiones).length;
    let best = null, bd = 1e9;
    for (const m of PP.MISIONES) { if (pr.misiones[m.id] || (m.requiere && hechas < m.requiere)) continue; const l = PP.Ciudad.lugares[m.lugar], d = U.dist(l.x, l.y, j.x, j.y); if (d < bd) { bd = d; best = l; } }
    if (best) J.gpsA(best); else UI.toast("No quedan misiones pendientes. ¡Enhorabuena!", "info");
  }

  // ---------------- Palabras doradas ----------------
  function palabraDorada(i) {
    const pr = PP.Store.progreso(); if (pr.doradas.includes(i)) return;
    pr.doradas.push(i); PP.Store.guardar(); if (E.sesion) E.sesion.doradas++;
    const p = PP.PALABRAS_DORADAS[i];
    PP.Audio.sfx("dorada"); J.sumar(25);
    UI.toast('<span class="dorada-mini">Ñ</span> Palabra dorada: <b>' + U.esc(p.p) + "</b><br><small>" + U.esc(p.d) + "</small>", "dorada", 5200);
    PP.Voz.decir("Palabra dorada: " + p.p + ". " + p.d);
    if (pr.doradas.length >= 5) J.logro("doradas5");
    if (pr.doradas.length >= PP.PALABRAS_DORADAS.length) J.logro("doradas");
  }

  // ---------------- Misiones ----------------
  function resolverRef(ref) {
    if (!ref) return null;
    return ref.split(".").reduce((o, k) => (o == null ? o : o[k]), J.contenido);
  }

  async function empezarMision(mis) {
    if (!mis || J.misionActiva) return;
    J.misionActiva = mis; J.modo = "escena"; M.activo = false; PP.Audio.motor(0, false);
    UI.aviso(null);
    PP.Audio.musica("mision"); PP.Audio.sfx("inicio");
    const ctx = { id: mis.id, titulo: mis.titulo, tema: mis.barrio, crit: null, estado: {} };
    const B = PP.BARRIOS[mis.barrio];
    const r0 = await Esc.aviso({ titulo: mis.titulo, texto: mis.resumen, icono: "trophy", lista: ["<b>" + U.esc(B.nombre) + "</b> · Bloque " + B.bloque + ": " + U.esc(PP.CURRICULO.bloques[B.bloque].nombre), "Practicarás: " + mis.criterios.map((c) => U.esc(PP.CURRICULO.etiquetas[c].toLowerCase())).join("; ") + "."], boton: "Empezar misión" }, ctx);
    if (r0.abandonada) return terminarMision(mis, ctx, true);
    for (const paso of mis.pasos) {
      ctx.crit = paso.crit || null;
      const datos = resolverRef(paso.ref);
      let r;
      switch (paso.tipo) {
        case "dialogo": r = await Esc.dialogo(datos, ctx); break;
        case "parejas": r = await Esc.parejas(datos, ctx); break;
        case "radio": ctx.textoRadio = datos.texto; r = await Esc.radio(datos, ctx); break;
        case "cartel": ctx.cartel = datos; r = await Esc.cartel(datos, ctx); break;
        case "chismografo": r = await Esc.chismografo(datos, ctx); break;
        case "ordenar": r = await Esc.ordenar(datos, ctx); break;
        case "lectura": r = await Esc.lectura(datos, ctx); break;
        case "corrector": r = await Esc.corrector(datos, ctx); break;
        case "taller": r = await Esc.taller(datos, ctx); break;
        case "rimas": r = await Esc.rimas(datos, ctx); break;
        case "escritura": r = await Esc.escritura(datos, ctx); break;
        case "biblioteca": r = await Esc.biblioteca(datos, ctx); break;
        case "grabacion": r = await Esc.grabacion(datos, ctx); break;
        case "autopista": r = await PP.Autopista.jugar(datos, ctx); if (r.hecho && r.aciertos >= Math.min(8, datos.length) && (J.ciclo > 1 || r.aciertos >= 6)) J.logro("turbo"); break;
        case "preguntas": {
          const extra = {};
          if (paso.ref === "radio") { extra.repetir = () => PP.Voz.decir(ctx.textoRadio, { forzar: true }); extra.repetirTxt = "Volver a escuchar"; if (!PP.Voz.hayEspanol) extra.textoApoyo = ctx.textoRadio; extra.apoyoInicial = !!(ctx.estado.subtitulos && PP.Voz.hayEspanol); }
          if (paso.ref === "cartel") extra.textoApoyo = Esc.textoCartel(datos);
          if (paso.ref === "historia") extra.textoApoyo = datos.piezas.map((p) => p.t || p).join(" ");
          r = await Esc.preguntas(datos.preguntas, Object.assign(ctx, extra, { mecanica: paso.ref === "radio" ? "radio-preguntas" : paso.ref === "cartel" ? "cartel-preguntas" : "lectura-preguntas" }));
          delete ctx.repetir; delete ctx.textoApoyo; delete ctx.apoyoInicial; break;
        }
        case "ir": r = await pasoIr(datos, ctx, paso.ref); break;
        case "caza": r = await pasoCaza(datos, ctx); break;
        case "paginas": r = await pasoPaginas(datos, ctx); break;
        case "persecucion": r = await pasoPersecucion(ctx); break;
        default: r = { hecho: true };
      }
      if (!r || r.abandonada) return terminarMision(mis, ctx, true);
    }
    terminarMision(mis, ctx, false);
  }

  function volverAConducir() { J.modo = "mundo"; M.activo = true; J.pausado = false; PP.Input.limpiarPulsados(); }

  // Paso: ir al lugar correcto entre varios candidatos
  function pasoIr(d, ctx, ref) {
    return new Promise((res) => {
      volverAConducir();
      const candidatos = U.shuffle([d.destino].concat(d.distractores || [])).map((k) => { const l = PP.Ciudad.lugares[k]; return { clave: k, x: l.x, y: l.y, etiqueta: l.nombre }; });
      let registrado = false;
      const botones = candidatos.map((c) => ({ t: c.etiqueta, icono: "gps", f: () => { M.gps({ x: c.x, y: c.y }); M.autopiloto = true; UI.toast("Conduciendo hacia " + U.esc(c.etiqueta) + "…", "info", 1800); } }));
      if (ref === "radio") botones.push({ t: "Repetir boletín", icono: "speaker", clase: "btn-terc", f: () => { if (!E.sesion) return; ctx.ayudaIr = true; PP.Voz.decir(d.texto, { forzar: true }); if (!PP.Voz.hayEspanol || PP.ajustes.subtitulosRadio) UI.toast(U.esc(d.texto), "info", 9000); } });
      if (ref === "cartel") botones.push({ t: "Ver el texto", icono: "doc", clase: "btn-terc", f: () => { ctx.ayudaIr = true; J.pausar(true); Esc.cartel(d, ctx).then(() => { J.pausar(false); volverAConducir(); }); } });
      botones.push({ t: "Salir", icono: "exit", clase: "btn-terc", f: () => { M.limpiarObjetivos(); res({ abandonada: true }); } });
      UI.objetivo({ titulo: ctx.titulo, icono: "gps", texto: d.consignaIr || "¿Adónde hay que ir? Conduce hasta el lugar correcto (puedes tocar su nombre para que la moto te lleve).", botones });
      J.gpsActual = () => UI.toast("En esta misión tienes que decidir tú el destino. Toca uno de los lugares del recuadro.", "info");
      M.fijarDestinos(candidatos, (dest) => {
        const ok = dest.clave === d.destino;
        if (!registrado) { registrado = true; E.registrar({ crit: ctx.crit, ok, mecanica: ref === "radio" ? "radio-destino" : "cartel-destino", mision: ctx.id, item: "destino", respuesta: dest.etiqueta, correcta: PP.Ciudad.lugares[d.destino].nombre, ayuda: !!ctx.ayudaIr || (ref === "radio" && !!ctx.estado.subtitulos && PP.Voz.hayEspanol), detalle: ok ? "" : "Fue a «" + dest.etiqueta + "» en lugar de «" + PP.Ciudad.lugares[d.destino].nombre + "»" }); }
        if (ok) {
          PP.Audio.sfx("bien"); M.chispas(dest.x, dest.y, "#ffe066", 30); J.sumar(registrado ? 30 : 10);
          UI.toast(U.icon("check") + " ¡Es aquí! " + U.esc(d.fbBien || ""), "bien", 3000);
          M.limpiarObjetivos(); J.gpsActual = null; J.modo = "escena"; M.activo = false;
          setTimeout(() => res({ hecho: true }), 700);
        } else {
          PP.Audio.sfx("mal"); UI.toast(U.icon("cross") + " Aquí no es. " + U.esc(d.fbMal || "Vuelve a pensar en lo que decía el texto."), "mal", 4200);
          PP.Voz.decir("Aquí no es. " + (d.fbMal || ""));
          M.destinos = M.destinos.filter((x) => x !== dest); M.gps(null);
        }
      });
    });
  }

  // Paso: cazar palabras en las calles del barrio
  function pasoCaza(d, ctx) {
    return new Promise(async (res) => {
      const r0 = await Esc.aviso({ titulo: "¡A la caza!", texto: d.instruccion, lista: [d.explica, "Pasa con la moto por encima de las palabras correctas. Si te equivocas, no pasa nada: aprenderás por qué."].filter(Boolean), icono: "gps", boton: "Salir a cazar" }, ctx);
      if (r0.abandonada) return res({ abandonada: true });
      volverAConducir();
      const buenas = U.shuffle(d.buenas), malas = U.shuffle(d.malas).map((m) => { const [t, por] = m.split("|"); return { t, por }; });
      const objetivo = Math.min(d.objetivo || 5, buenas.length);
      const items = buenas.slice(0, objetivo + 2).map((t) => ({ t, ok: true, color: PP.BARRIOS[ctx.tema].color })).concat(malas.slice(0, objetivo + 2).map((m) => ({ t: m.t, por: m.por, ok: false, color: PP.BARRIOS[ctx.tema].color })));
      let cogidas = 0;
      const prog = () => "Recogidas: " + cogidas + " / " + objetivo;
      UI.objetivo({ titulo: ctx.titulo, icono: "star", texto: U.esc(d.instruccion), progreso: prog(), botones: [
        { t: "GPS a la más cercana", icono: "gps", f: () => J.gpsActual() },
        { t: "Salir", icono: "exit", clase: "btn-terc", f: () => { M.limpiarObjetivos(); J.gpsActual = null; res({ abandonada: true }); } }] });
      J.gpsActual = () => { M.gps(() => { const j = M.jugador; let b = null, bd = 1e9; M.fichas.forEach((f) => { if (!f.vivo) return; const dd = U.dist(f.x, f.y, j.x, j.y); if (dd < bd) { bd = dd; b = f; } }); return b; }); UI.toast("GPS hacia la palabra más cercana (¡no te dice si es correcta!).", "info", 2200); };
      M.soltarFichas(ctx.tema, U.shuffle(items), (f) => {
        E.registrar({ crit: ctx.crit, ok: f.ok, mecanica: "caza", mision: ctx.id, item: "caza-" + f.t, respuesta: f.t, correcta: f.ok ? f.t : "(no recoger)", detalle: f.ok ? "" : "Recogió «" + f.t + "», que no cumplía la condición" });
        if (f.ok) {
          cogidas++; PP.Audio.sfx("recoger"); J.sumar(12); UI.progresoObjetivo(prog());
          UI.toast(U.icon("check") + " <b>" + U.esc(f.t) + "</b> " + (d.fbBien ? U.esc(d.fbBien) : "¡Sí!"), "bien", 1800);
          if (cogidas >= objetivo) { M.limpiarObjetivos(); J.gpsActual = null; J.modo = "escena"; M.activo = false; M.confeti(); setTimeout(() => res({ hecho: true }), 900); }
        } else {
          PP.Audio.sfx("mal"); UI.toast(U.icon("cross") + " <b>" + U.esc(f.t) + "</b>: " + U.esc(f.por || "esta palabra no cumple la condición."), "mal", 4200);
          PP.Voz.decir(f.t + ": " + (f.por || "esta no."));
          // si se agotan las buenas, añadimos más
          if (M.fichas.filter((x) => x.vivo && x.ok).length + cogidas < objetivo) M.soltarFichas(ctx.tema, M.fichas.filter((x) => x.vivo).concat(buenas.slice(objetivo + 2).map((t) => ({ t, ok: true, color: PP.BARRIOS[ctx.tema].color }))), M.cb.ficha);
        }
      });
    });
  }

  // Paso: recoger las páginas de la leyenda
  function pasoPaginas(d, ctx) {
    return new Promise(async (res) => {
      const r0 = await Esc.aviso({ titulo: "Páginas al viento", texto: "El Borrón ha lanzado por los aires las páginas de «" + d.titulo + "». Recoge las " + d.piezas.length + " páginas que vuelan por el Barrio Literario.", icono: "book", boton: "¡A por ellas!" }, ctx);
      if (r0.abandonada) return res({ abandonada: true });
      volverAConducir();
      let n = 0;
      UI.objetivo({ titulo: ctx.titulo, icono: "book", texto: "Recoge las páginas (iconos morados en el minimapa).", progreso: "Páginas: 0 / " + d.piezas.length, botones: [
        { t: "GPS a la más cercana", icono: "gps", f: () => J.gpsActual() }, { t: "Salir", icono: "exit", clase: "btn-terc", f: () => { M.limpiarObjetivos(); J.gpsActual = null; res({ abandonada: true }); } }] });
      J.gpsActual = () => { M.gps(() => { const j = M.jugador; let b = null, bd = 1e9; M.fichas.forEach((f) => { if (!f.vivo) return; const dd = U.dist(f.x, f.y, j.x, j.y); if (dd < bd) { bd = dd; b = f; } }); return b; }); M.autopiloto = false; };
      M.soltarFichas("literario", d.piezas.map((p, k) => ({ pagina: true, k })), () => {
        n++; PP.Audio.sfx("pagina"); J.sumar(8); UI.progresoObjetivo("Páginas: " + n + " / " + d.piezas.length);
        if (n >= d.piezas.length) { M.limpiarObjetivos(); J.gpsActual = null; J.modo = "escena"; M.activo = false; setTimeout(() => res({ hecho: true }), 500); }
      });
    });
  }

  // Paso: persecución final con fotos
  function pasoPersecucion(ctx) {
    return new Promise(async (res) => {
      const r0 = await Esc.aviso({ titulo: "¡El Borrón está en la ciudad!", texto: "Su furgoneta morada acaba de pasar por aquí. Síguela, acércate y hazle tres fotos para la portada de El Eco.", retrato: PP.BORRON, animo: "enfadado", lista: [PP.Input.tactil ? "Toca el botón de la <b>cámara</b> cuando estés cerca." : "Pulsa <b>ESPACIO</b> cuando estés cerca para hacer la foto.", "La flecha morada del borde de la pantalla te indica dónde está."], icono: "camera", boton: "¡A por la foto!" }, ctx);
      if (r0.abandonada) return res({ abandonada: true });
      volverAConducir();
      UI.objetivo({ titulo: ctx.titulo, icono: "camera", texto: "Acércate a la furgoneta morada y haz las fotos.", progreso: "Fotos: 0 / 3", botones: [{ t: "GPS", icono: "gps", f: () => J.gpsActual() }, { t: "Salir", icono: "exit", clase: "btn-terc", f: () => { M.limpiarObjetivos(); J.gpsActual = null; PP.Audio.musica("mision"); res({ abandonada: true }); } }] });
      J.gpsActual = () => { M.gps(() => M.borron); };
      M.iniciarPersecucion((n) => { UI.progresoObjetivo("Fotos: " + n + " / 3"); UI.toast(U.icon("camera") + " ¡Foto " + n + "!", "bien", 1500); E.sesion.fotos = n; }, () => {
        J.logro("fotografo"); M.limpiarObjetivos(); J.gpsActual = null; M.confeti(); PP.Audio.sfx("victoria");
        J.modo = "escena"; M.activo = false; setTimeout(() => res({ hecho: true }), 1200);
      });
      UI.aviso(null);
    });
  }

  function terminarMision(mis, ctx, abandonada) {
    M.limpiarObjetivos(); J.gpsActual = null; J.misionActiva = null;
    const esc = document.getElementById("escena"); esc.hidden = true; esc.innerHTML = "";
    if (abandonada) { UI.toast("Has salido de la misión. Puedes volver a intentarlo cuando quieras.", "info"); volverAConducir(); objetivoLibre(); musicaBarrio(true); return; }
    const v = E.valorMision(mis.id);
    const estrellas = v.pct >= 0.9 ? 3 : v.pct >= 0.6 ? 2 : 1;
    const pr = PP.Store.progreso();
    const antes = pr.misiones[mis.id];
    const bonus = 50 + estrellas * 25;
    J.sumar(bonus);
    pr.misiones[mis.id] = { estrellas: Math.max(estrellas, antes ? antes.estrellas : 0), ultima: Date.now(), veces: (antes ? antes.veces : 0) + 1 };
    E.misionCompletada(mis.id, { estrellas, pct: v.pct, n: v.n });
    PP.Store.guardar();
    // logros
    J.logro("primera");
    if (estrellas === 3) ({ P1: "poliglota", P2: "mediador", O2: "cazabulos", L2: "poeta" })[mis.id] && J.logro({ P1: "poliglota", P2: "mediador", O2: "cazabulos", L2: "poeta" }[mis.id]);
    if (v.n >= 4 && v.pct === 1) J.logro("sinborrones");
    const restAntes = Object.assign({}, M.restauracion);
    refrescarMarcadores();
    const barrioCompleto = !mis.final && M.restauracion[mis.barrio] >= 1 && restAntes[mis.barrio] < 1;
    if (barrioCompleto) J.logro("barrio");
    if (Object.values(M.restauracion).every((x) => x >= 1)) J.logro("ciudad");
    // pantalla de resultado
    PP.Audio.sfx("victoria"); PP.Audio.musica("mision");
    const r = $("#resultado"); r.hidden = false; r.innerHTML = "";
    const caja = el("div", { class: "res-caja", role: "dialog", "aria-modal": "true", "aria-labelledby": "res-tit" }, [
      el("div", { class: "res-cinta", text: mis.final ? "¡EDICIÓN ESPECIAL!" : "¡MISIÓN CUMPLIDA!" }),
      el("h2", { id: "res-tit", text: mis.titulo }),
      el("div", { class: "res-estrellas", "aria-label": estrellas + " de 3 estrellas", html: [1, 2, 3].map((k) => '<span class="est' + (k <= estrellas ? " on" : "") + '" style="animation-delay:' + (k * 0.25) + 's">★</span>').join("") }),
      el("p", { class: "res-txt", text: v.n ? "Acertaste a la primera " + Math.round(v.pct * 100) + " % de los retos (" + v.n + " retos)." : "¡Misión completada!" }),
      el("p", { class: "res-txt", html: "+" + bonus + " puntos de prestigio" + (barrioCompleto ? "<br><b>¡El " + U.esc(PP.BARRIOS[mis.barrio].nombre) + " ha recuperado todos sus colores!</b>" : "") }),
      mis.final ? el("div", { class: "portada", html: '<div class="per-cab"><b>EL ECO</b><span>Edición especial</span></div><h3>' + U.esc((E.sesion.producciones.filter((p) => p.mision === "F").pop() || {}).texto || "¡Capturada la Banda del Borrón!") + '</h3><div class="foto-borron">' + PP.retrato(PP.BORRON, "sorpresa") + '</div><p>Por ' + U.esc(J.alias) + ', reportero/a de Puerto Palabra</p>' }) : null,
      el("div", { class: "fila-centro" }, [
        el("button", { class: "btn btn-primario", type: "button", html: "Seguir explorando " + U.icon("play"), onclick: () => { r.hidden = true; volverAConducir(); objetivoLibre(); musicaBarrio(true); if (estrellas < 3) UI.toast("Puedes repetir la misión para conseguir más estrellas.", "info"); } }),
        el("button", { class: "btn btn-sec", type: "button", html: U.icon("doc") + " Ver informe", onclick: () => { r.hidden = true; J.modo = "mundo"; UI.informe(); } })
      ])
    ]);
    r.appendChild(caja);
    caja.querySelector(".btn-primario").focus();
    for (let k = 1; k <= estrellas; k++) setTimeout(() => PP.Audio.sfx("estrella"), 300 + k * 250);
    M.activo = true; M.confeti(); setTimeout(() => { if (J.modo !== "mundo") M.activo = false; }, 1600);
    J.modo = "escena";
    UI.ticker("Última hora en Radio Onda Volcán: " + J.alias + " completa la misión «" + mis.titulo + "».");
  }

  document.addEventListener("DOMContentLoaded", iniciar);
})();
