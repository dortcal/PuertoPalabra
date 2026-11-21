/* Puerto Palabra · Caída de la Banda del Borrón y final de la aventura libre.
   - La Banda cae por zonas: al completar por primera vez una misión clave de cada barrio, un miembro queda
     detenido (escena breve). El estado se deduce de las misiones superadas, por lo que no hace falta guardar nada nuevo.
   - Final: la última misión es la «Edición especial» (las fotos al Borrón), que se desbloquea al completar todas las demás.
     Antes de jugarla se avisa de que el juego terminará. Después: epílogo → resumen de lo logrado → pantalla final con informe.
   Todos los personajes y textos son originales. */
window.PP = window.PP || {};
(function () {
  "use strict";
  const U = PP.U, el = U.el, $ = (s) => document.querySelector(s);

  /** Misión clave que hace caer a cada miembro de la banda (una por barrio) */
  const CAIDA = { sordina: "P2", bulin: "O2", revoltijo: "L1", tachon: "T2" };
  /** Escena de detención de cada miembro (redactada sin género para valer con cualquier retrato) */
  const DETENCION = {
    sordina: { tit: "¡Detención en el puerto!", t: "En la estación de guaguas, turistas y vecinos han vuelto a entenderse con palabras amables. Sordina se ha quedado sin burlas que contar y la policía de Puerto Palabra ha puesto fin a su plan." },
    bulin: { tit: "¡Se acabaron los bulos!", t: "Has revisado cada mensaje del Chismógrafo con ojo de detective. Bulín ya no puede reenviar mentiras sin que nadie las note: la policía ha cerrado su fábrica de bulos." },
    revoltijo: { tit: "¡Páginas en su sitio!", t: "La leyenda vuelve a tener principio, nudo y final. Revoltijo se ha quedado sin páginas que arrancar y sin poemas que desordenar: la policía lo ha dejado fuera de juego en el Barrio Literario." },
    tachon: { tit: "¡Sin tachaduras!", t: "La primera página ha salido de la imprenta sin borrones. Tachón y sus faltas de ortografía han llegado tarde: la policía ha puesto fin a las tachaduras en el Taller de la Lengua." }
  };
  PP.BANDA.forEach((b) => { b.mision = CAIDA[b.id]; });

  const hechas = (pr) => PP.MISIONES.filter((m) => !m.final && pr.misiones[m.id]).length;
  const totalNormales = () => PP.MISIONES.filter((m) => !m.final).length;
  const caido = (b, pr) => !!(b.mision && pr.misiones[b.mision]);
  const detenidos = (pr) => PP.BANDA.filter((b) => caido(b, pr));
  const miembroDe = (idMision) => PP.BANDA.find((b) => b.mision === idMision) || null;

  /** Fila con la banda: caídos con reja, libres en color, y el Borrón (cae al final) */
  function filaBanda(pr, borronCae) {
    const lis = PP.BANDA.map((b) => {
      const c = caido(b, pr), B = PP.BARRIOS[b.barrio];
      return '<li class="banda-m' + (c ? " caido" : "") + '" style="--c:' + B.color + '"><div class="banda-cara">' + PP.retrato(b.r, c ? "triste" : b.animo) + (c ? '<i class="reja" aria-hidden="true"></i>' : "") + "</div><b>" + U.esc(b.nombre) + "</b><small>" + (c ? "Detenido en " + U.esc(B.nombre) : "Libre en " + U.esc(B.nombre)) + "</small></li>";
    });
    lis.push('<li class="banda-m jefe' + (borronCae ? " caido" : "") + '" style="--c:#6b4fa3"><div class="banda-cara">' + PP.retrato(PP.BORRON, borronCae ? "triste" : "enfadado") + (borronCae ? '<i class="reja" aria-hidden="true"></i>' : "") + "</div><b>El Borrón</b><small>" + (borronCae ? "Capturado" : "Libre") + "</small></li>");
    return '<ul class="banda-fila" aria-label="Estado de la Banda del Borrón">' + lis.join("") + "</ul>";
  }

  /** Escena breve al caer un miembro. Devuelve una promesa que se resuelve al pulsar «Seguir». */
  function detencion(miembro) {
    return new Promise((res) => {
      const pr = PP.Store.progreso(), d = DETENCION[miembro.id], B = PP.BARRIOS[miembro.barrio];
      const quedan = PP.BANDA.length - detenidos(pr).length;
      const r = $("#resultado"); r.hidden = false; r.innerHTML = "";
      const resto = quedan > 0
        ? "Quedan <b>" + quedan + "</b> miembro" + (quedan > 1 ? "s" : "") + " de la banda en libertad… y el Borrón sigue suelto."
        : "¡La banda ya está desmantelada! El Borrón se ha quedado solo. Completa todas las misiones y podrás ir a por él.";
      const caja = el("div", { class: "res-caja det-caja", role: "dialog", "aria-modal": "true", "aria-labelledby": "det-tit", style: "--c:" + B.color }, [
        el("div", { class: "res-cinta", text: "¡CAE LA BANDA DEL BORRÓN!" }),
        el("div", { class: "det-retrato", html: PP.retrato(miembro.r, "triste") + '<i class="reja" aria-hidden="true"></i>' }),
        el("h2", { id: "det-tit", text: d.tit }),
        el("p", { class: "res-txt", text: d.t }),
        el("p", { class: "res-txt", html: resto }),
        el("div", { html: filaBanda(pr, false) }),
        el("div", { class: "fila-centro" }, [el("button", { class: "btn btn-primario", type: "button", html: "Seguir " + U.icon("play"), onclick: () => { r.hidden = true; r.innerHTML = ""; PP.Voz.callar(); res(); } })])
      ]);
      r.appendChild(caja); caja.querySelector(".btn").focus();
      PP.Audio.sfx("desbloqueo"); setTimeout(() => PP.Audio.sfx("estrella"), 350);
      PP.Voz.decir(d.tit + " " + d.t);
    });
  }

  /** Datos de lo conseguido para el resumen y para el aviso previo */
  function logros() {
    const pr = PP.Store.progreso();
    const normales = PP.MISIONES.filter((m) => !m.final);
    const ms = PP.MISIONES.filter((m) => pr.misiones[m.id]);
    const mj = pr.minijuegos || {}, minis = PP.MINIJUEGOS || [];
    return {
      pr, misiones: ms.length, totalMisiones: PP.MISIONES.length, normales: normales.filter((m) => pr.misiones[m.id]).length, totalNormales: normales.length,
      estrellas: ms.reduce((a, m) => a + (pr.misiones[m.id].estrellas || 0), 0), totalEstrellas: PP.MISIONES.length * 3,
      doradas: pr.doradas.length, totalDoradas: PP.PALABRAS_DORADAS.length,
      minijuegos: minis.filter((m) => mj[m.id]).length, totalMinijuegos: minis.length, minis: minis.map((m) => ({ titulo: m.titulo, estrellas: mj[m.id] ? mj[m.id].estrellas : 0, hecho: !!mj[m.id] })),
      logros: pr.logros.length, totalLogros: PP.juego.LOGROS.length, puntos: pr.puntos || 0, banda: detenidos(pr).length
    };
  }

  // ------------------------------------------------------------------ Final
  const CARMELA = { nombre: "Carmela", piel: "morena", pelo: "#ddd", peinado: "mono", ropa: "#264653", fondo: "#cde4e0", gafas: true, edad: "mayor", pendientes: true };

  function paginas(alias) {
    return [
      { cap: "Capítulo final", tit: "¡Clic, clic, clic!", fondo: "noche", cls: "borron", arte: () => PP.retrato(PP.BORRON, "sorpresa"),
        t: "Tres fotos, tres destellos… y la furgoneta morada frenó en seco. Sin su banda y sin sus trucos, el Borrón ya no tenía por dónde escapar. La policía de Puerto Palabra lo rodeó, y la portada de El Eco se puso en marcha." },
      { cap: "Capítulo final", tit: "Bajo la capucha", fondo: "noche", cls: "borron", arte: () => PP.retrato(PP.BORRON, "triste"),
        t: "Cuando cayó la capucha, el Borrón confesó su secreto: le daba mucho miedo equivocarse y por eso borraba las palabras de todo el mundo. Carmela le tendió la mano: «Los errores no se esconden, se corrigen. Así aprendemos todos»." },
      { cap: "Capítulo final", tit: "La portada del día", fondo: "redaccion", cls: "carmela", arte: () => PP.retrato(CARMELA, "feliz"),
        t: "«¡Esta es la mejor edición de la historia de El Eco!», dijo Carmela. «Gracias a ti, " + alias + ", las palabras han vuelto a las calles, a la radio, a los libros y a las pizarras. Has escuchado, leído, escrito y corregido como una gran reportera o un gran reportero»." },
      { cap: "Capítulo final", tit: "Puerto Palabra recupera sus colores", fondo: "amanecer", cls: "ciudad", arte: () => '<div class="sol"></div><div class="volcan-sil"></div><div class="mar"></div><div class="barco"></div>',
        t: "Amanece en Puerto Palabra. Las guaguas ya pueden hablar, la radio vuelve a sonar y los poemas tienen otra vez sus rimas. Y la ciudad sabe que, cuando alguien intente borrar las palabras, tendrá a un reportero o reportera dispuesto a defenderlas. FIN." }
    ];
  }

  function resumenLogros(L) {
    const kpi = (v, t) => '<div class="kpi"><b>' + v + "</b><span>" + t + "</span></div>";
    const pr = L.pr;
    const doradas = PP.PALABRAS_DORADAS.map((p, i) => '<li class="' + (pr.doradas.includes(i) ? "on" : "") + '" title="' + U.esc(pr.doradas.includes(i) ? p.d : "Sin encontrar") + '">' + (pr.doradas.includes(i) ? U.esc(p.p) : "???") + "</li>").join("");
    const minis = L.minis.map((m) => "<li class='" + (m.hecho ? "on" : "") + "'>" + U.esc(m.titulo) + " " + (m.hecho ? "★".repeat(m.estrellas) : "(sin jugar)") + "</li>").join("");
    return '<div class="fin-panel"><div class="inf-kpis">' +
      kpi(L.misiones + " / " + L.totalMisiones, "misiones superadas") + kpi(L.estrellas + " / " + L.totalEstrellas, "estrellas") +
      kpi(L.doradas + " / " + L.totalDoradas, "palabras doradas") + kpi(L.minijuegos + " / " + L.totalMinijuegos, "minijuegos") +
      kpi(L.logros + " / " + L.totalLogros, "logros") + kpi(L.puntos, "puntos de prestigio") + "</div>" +
      "<h3>La Banda del Borrón</h3>" + filaBanda(pr, true) +
      "<h3>Colección de palabras doradas</h3><ul class='fin-chips'>" + doradas + "</ul>" +
      "<h3>Minijuegos</h3><ul class='fin-chips minis'>" + minis + "</ul></div>";
  }

  function pantallaResultados(J) {
    const inf = PP.Eval.informe(); const L = logros();
    if (!inf) return '<div class="fin-panel"><p>No hay datos de esta sesión.</p></div>';
    const con = inf.criterios.filter((c) => c.n > 0), sin = inf.criterios.length - con.length;
    const fila = (c) => "<tr><td><b>" + c.code + "</b> " + U.esc(PP.CURRICULO.etiquetas[c.code]) + "</td><td>" + (PP.UI.nivelHTML ? PP.UI.nivelHTML(c) : U.esc(c.nivel || "—")) + "</td><td>" + c.n + (c.pct !== null ? " · " + Math.round(c.pct * 100) + " %" : "") + "</td></tr>";
    const kpi = (v, t) => '<div class="kpi"><b>' + v + "</b><span>" + t + "</span></div>";
    const media = L.estrellas / Math.max(1, L.misiones);
    const rango = media >= 2.6 ? "Reportero/a de portada" : media >= 2 ? "Reportero/a estrella" : media >= 1.4 ? "Reportero/a experto/a" : "Reportero/a valiente";
    return '<div class="fin-panel resultados"><div class="fin-sello"><span>FIN</span><b>' + U.esc(rango) + "</b></div>" +
      '<p class="fin-sub"><b>Puerto Palabra</b> · Lengua Castellana y Literatura · ' + inf.curso + ".º de Primaria (" + inf.ciclo + ".º ciclo) · código " + U.esc(inf.codigo) + "</p>" +
      '<div class="inf-kpis">' + kpi(inf.puntos, "puntos de esta sesión") + kpi(L.misiones + " / " + L.totalMisiones, "misiones superadas") + kpi(inf.pctAciertos === null ? "—" : Math.round(inf.pctAciertos * 100) + " %", "aciertos al primer intento") +
      kpi(inf.itemsPrimerIntento, "retos respondidos") + kpi(inf.intentos, "intentos") + kpi(inf.ayudas, "pistas usadas") + kpi(U.fmtTiempo(inf.duracionMs), "tiempo de juego") + "</div>" +
      "<h3>Criterios de evaluación observados</h3>" +
      (con.length ? '<table class="inf-tabla"><thead><tr><th>Criterio</th><th>Nivel observado</th><th>Retos y aciertos</th></tr></thead><tbody>' + con.map(fila).join("") + "</tbody></table>" : "<p>Todavía no hay evidencias suficientes.</p>") +
      (sin ? '<p class="nota">' + sin + " criterio" + (sin > 1 ? "s" : "") + " sin evidencias en esta sesión.</p>" : "") +
      '<p class="nota">Los niveles son orientativos: describen lo observado en el juego (primer intento de cada reto) y no sustituyen la evaluación del aula. El informe completo incluye recomendaciones de refuerzo y se puede guardar en PDF.</p></div>';
  }

  /** Muestra el final. alTerminar(destino): "modos" | "inicio" */
  function mostrar() {
    const J = PP.juego, pr = PP.Store.progreso();
    // logros concedidos sin aviso emergente (el resumen ya los muestra)
    ["final"].concat(detenidos(pr).length >= PP.BANDA.length ? ["banda"] : []).forEach((id) => { if (!pr.logros.includes(id)) pr.logros.push(id); });
    const tt = $("#toasts"); if (tt) tt.innerHTML = "";
    pr.finalVisto = (pr.finalVisto || 0) + 1; PP.Store.guardar();
    J.modo = "final"; PP.Mundo.activo = false; PP.Audio.motor(0, false);
    const rs = $("#resultado"); rs.hidden = true; rs.innerHTML = "";
    PP.UI.mostrar("pantalla-final"); PP.Audio.musica("menu"); PP.Audio.sfx("victoria");
    const cuerpo = $("#final-cuerpo"), puntos = $("#final-puntos"), bSig = $("#final-sig"), bAnt = $("#final-ant"), bSaltar = $("#final-saltar"), bOir = $("#final-oir");
    const P = paginas(J.alias || "reportero");
    const N = P.length + 2; // + resumen de logros + resultados
    let i = 0;
    const idxLogros = P.length, idxFin = P.length + 1;
    const voz = (txt) => PP.Voz.decir(txt);
    const textoPlano = () => i < P.length ? P[i].tit + ". " + P[i].t : i === idxLogros ? "Lo que has conseguido en Puerto Palabra." : "Fin de la aventura. Aquí tienes el resumen de tu partida.";
    function pintar(dir) {
      cuerpo.innerHTML = "";
      let panel;
      if (i < P.length) {
        const v = P[i];
        const arte = v.cls === "ciudad" ? '<div class="hist-arte vin-ciudad" aria-hidden="true">' + v.arte() + "</div>" : '<div class="hist-arte' + (v.cls === "borron" ? " hist-borron" : "") + '">' + v.arte() + "</div>";
        panel = el("div", { class: "vineta hist-vineta fondo-" + v.fondo + " hv-" + v.cls + (dir < 0 ? " atras" : "") }, [
          el("div", { class: "hist-cap", html: "<small>" + U.esc(v.cap) + "</small><h2 id='final-tit'>" + U.esc(v.tit) + "</h2>" }),
          el("div", { html: arte, class: "fin-arte" }), el("div", { class: "hist-texto" }, [el("p", { class: "vin-texto", text: v.t })])
        ]);
        if (i === 0 || i === 1) panel.querySelector(".hist-borron, .hist-arte").classList.add("hist-borron");
      } else if (i === idxLogros) {
        panel = el("div", { class: "vineta fin-vineta fondo-redaccion" }, [el("div", { class: "hist-cap", html: "<small>Resumen</small><h2 id='final-tit'>Todo lo que has logrado</h2>" }), el("div", { html: resumenLogros(logros()) })]);
      } else {
        panel = el("div", { class: "vineta fin-vineta fondo-redaccion" }, [el("div", { class: "hist-cap", html: "<small>Resultados</small><h2 id='final-tit'>Fin de la aventura</h2>" }), el("div", { html: pantallaResultados(J) })]);
        const acc = el("div", { class: "fila-centro fin-acciones" }, [
          el("button", { class: "btn btn-primario btn-grande", type: "button", html: U.icon("doc") + " Ver informe docente", onclick: () => { J.alVolverInforme = () => { J.alVolverInforme = null; PP.UI.mostrar("pantalla-final"); document.addEventListener("keydown", teclas); }; document.removeEventListener("keydown", teclas); PP.UI.informe(); } }),
          el("button", { class: "btn btn-sec", type: "button", html: "Elegir otro modo de juego", onclick: () => salir("modos") }),
          el("button", { class: "btn btn-terc", type: "button", text: "Volver al inicio", onclick: () => salir() })
        ]);
        panel.appendChild(acc);
        const cr = el("div", { "data-creditos": "claro", class: "cred-informe" }); panel.appendChild(cr);
      }
      cuerpo.appendChild(panel); PP.Creditos.pintar(); cuerpo.scrollTop = 0; panel.scrollTop = 0;
      puntos.innerHTML = Array.from({ length: N }, (_, k) => '<i class="' + (k === i ? "on" : k < i ? "hecho" : "") + '"></i>').join("");
      puntos.setAttribute("aria-label", "Parte " + (i + 1) + " de " + N);
      bAnt.disabled = i === 0; bSig.hidden = i === idxFin; bOir.hidden = false; bSaltar.hidden = i >= idxLogros;
      bSig.innerHTML = i === idxLogros ? "Ver resultados " + U.icon("play") : "Siguiente " + U.icon("play");
      voz(textoPlano());
      (i === idxFin ? panel.querySelector(".btn-primario") : bSig).focus({ preventScroll: true }); panel.scrollTop = 0;
    }
    function salir(destino) { document.removeEventListener("keydown", teclas); PP.Voz.callar(); J.alVolverInforme = null; J.salirAlMenu(destino); }
    const sig = () => { if (i >= idxFin) return; PP.Audio.sfx("pagina"); i++; pintar(1); };
    const ant = () => { if (i === 0) return; PP.Audio.sfx("pagina"); i--; pintar(-1); };
    function teclas(e) {
      if ($("#pantalla-final").hidden || /INPUT|TEXTAREA|SELECT/.test((e.target || {}).tagName || "")) return;
      if (e.code === "ArrowRight") { e.preventDefault(); sig(); } else if (e.code === "ArrowLeft") { e.preventDefault(); ant(); }
    }
    bSig.onclick = sig; bAnt.onclick = ant;
    bSaltar.onclick = () => { PP.Audio.sfx("clic"); i = idxLogros; pintar(1); };
    bOir.onclick = () => PP.Voz.decir(textoPlano(), { forzar: true });
    document.addEventListener("keydown", teclas);
    pintar(1);
  }

  /** Texto y datos del aviso previo a la última misión */
  function aviso() {
    const L = logros();
    return {
      titulo: "¡Atención: última misión!", icono: "camera", retrato: PP.BORRON, animo: "enfadado", boton: "Estoy listo: ¡a por el Borrón!",
      texto: "Cuando termines la Edición especial, la aventura acabará: verás el final de la historia, un resumen de lo que has logrado y el informe de tu partida. Si quieres completar la colección de palabras doradas o jugar a más minijuegos, hazlo ahora. Pulsa «Salir» para volver a la ciudad.",
      lista: ["Palabras doradas encontradas: <b>" + L.doradas + " de " + L.totalDoradas + "</b>", "Minijuegos superados: <b>" + L.minijuegos + " de " + L.totalMinijuegos + "</b>", "Banda del Borrón: <b>" + L.banda + " de " + PP.BANDA.length + "</b> detenidos"]
    };
  }

  PP.Final = { mostrar, detencion, aviso, detenidos, miembroDe, filaBanda, logros, hechas, totalNormales };
})();
