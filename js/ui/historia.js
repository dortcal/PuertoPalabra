/* Puerto Palabra · Historia de presentación.
   Se muestra al pulsar «Jugar», antes de elegir curso y reportero/a. Pone al alumnado en contexto:
   la ciudad, el periódico El Eco, El Borrón y su banda (uno por barrio y bloque de Lengua) y la misión.
   Accesible: texto en pantalla y narrado, botones Anterior / Siguiente / Saltar, teclado (← → Esc)
   y animaciones reducidas si el sistema lo pide. Todos los personajes son originales. */
window.PP = window.PP || {};
(function () {
  "use strict";
  const U = PP.U, el = U.el, $ = (s) => document.querySelector(s);

  /** La Banda del Borrón: un miembro por barrio (bloque de saberes de Lengua) */
  PP.BANDA = [
    { id: "sordina", nombre: "Sordina", barrio: "puerto", animo: "enfadado", hace: "Se burla de quien habla distinto y tapa los oídos para que nadie se entienda.",
      r: { nombre: "Sordina", piel: "#b9c7e8", pelo: "#3a2a4f", peinado: "coleta", ropa: "#7a4a12", fondo: "#ffcf86", antifaz: true, pendientes: true } },
    { id: "bulin", nombre: "Bulín", barrio: "onda", animo: "feliz", hace: "Inventa bulos y los reenvía por el Chismógrafo para que todo el mundo se los crea.",
      r: { nombre: "Bulín", piel: "#c7e0d0", pelo: "#14101f", peinado: "rizado", ropa: "#0b6f7a", fondo: "#9be7ef", antifaz: true, sombrero: "gorra", colorSombrero: "#14101f" } },
    { id: "revoltijo", nombre: "Revoltijo", barrio: "literario", animo: "sorpresa", hace: "Desordena las leyendas, arranca páginas de los libros y deja los poemas sin rima.",
      r: { nombre: "Revoltijo", piel: "#e8c9d8", pelo: "#5b2a86", peinado: "largo", ropa: "#5b2a86", fondo: "#dcc3ff", antifaz: true, gafas: true } },
    { id: "tachon", nombre: "Tachón", barrio: "taller", animo: "enfadado", hace: "Llena los textos de faltas, roba las tildes y mezcla las palabras en la fábrica.",
      r: { nombre: "Tachón", piel: "#e6c3a8", pelo: "#2b2d33", peinado: "calvo", ropa: "#a3360f", fondo: "#ffb795", antifaz: true, sombrero: "panama", colorSombrero: "#2b2d33", edad: "mayor" } }
  ];
  const CARMELA = { nombre: "Carmela, directora de El Eco", piel: "morena", pelo: "#ddd", peinado: "mono", ropa: "#264653", fondo: "#cde4e0", gafas: true, edad: "mayor", pendientes: true };

  const VINETAS = [
    { cap: "Capítulo 1", tit: "Puerto Palabra", fondo: "amanecer", escena: "ciudad",
      t: "Esto es Puerto Palabra, una ciudad junto al mar, a los pies de un volcán. Aquí las palabras viajan en guagua, en barco, por la radio y en el periódico. Gracias a ellas, la gente se entiende, se cuenta historias y sabe lo que pasa." },
    { cap: "Capítulo 2", tit: "El Borrón", fondo: "noche", escena: "borron",
      t: "Pero una noche llegó El Borrón. Nadie sabe quién se esconde bajo su capucha. Quiere una ciudad en silencio, donde nadie pueda leer, escribir ni contar lo que hace. Por donde pasa, borra las palabras… y la ciudad pierde sus colores." },
    { cap: "Capítulo 3", tit: "La Banda del Borrón", fondo: "noche", escena: "banda",
      t: "El Borrón no viene solo. Cada miembro de su banda se ha escondido en un barrio de la ciudad." },
    { cap: "Capítulo 4", tit: "El periódico El Eco", fondo: "redaccion", escena: "carmela",
      t: "Soy Carmela, directora de El Eco, el periódico de la ciudad. Necesito un reportero o una reportera con mucho valor: alguien que escuche con atención, lea como un detective y escriba sin borrones." },
    { cap: "Capítulo 5", tit: "Tu misión", fondo: "ciudad", escena: "mision",
      t: "¡Esa persona eres tú! Recorre los cuatro barrios y supera sus misiones de Lengua. Cada misión cumplida devuelve las palabras y el color a la ciudad. Y si te atreves… consigue la foto del Borrón para la portada de El Eco." }
  ];

  function escena(v) {
    switch (v.escena) {
      case "ciudad": return el("div", { class: "hist-arte vin-ciudad", "aria-hidden": "true", html: '<div class="sol"></div><div class="volcan-sil"></div><div class="mar"></div><div class="barco"></div><div class="hist-letras"><span>A</span><span>ñ</span><span>é</span><span>P</span><span>z</span></div>' });
      case "borron": return el("div", { class: "hist-arte hist-borron", html: PP.retrato(PP.BORRON, "enfadado") + '<div class="hist-mancha" aria-hidden="true"></div>' });
      case "carmela": return el("div", { class: "hist-arte", html: PP.retrato(CARMELA, "normal") });
      case "mision": return el("div", { class: "hist-arte hist-reporteros", html: PP.AVATARES.map((a) => '<div class="hist-rep">' + PP.retrato(a, "feliz") + "</div>").join("") + '<div class="hist-carnet"><b>PRENSA</b><span>El Eco</span></div>' });
      default: return null;
    }
  }
  function banda() {
    return el("ul", { class: "hist-banda", "aria-label": "Miembros de la Banda del Borrón" }, PP.BANDA.map((b) => {
      const B = PP.BARRIOS[b.barrio];
      const li = el("li", { class: "hist-miembro", html: '<div class="hist-mini">' + PP.retrato(b.r, b.animo) + "</div><div><b>" + U.esc(b.nombre) + "</b><small>" + U.esc(B.nombre) + "</small><p>" + U.esc(b.hace) + "</p></div>" });
      li.style.setProperty("--c", B.color); return li;
    }));
  }

  /** Muestra la historia. fin() se llama al terminar o al saltarla. */
  function mostrar(fin) {
    PP.UI.mostrar("pantalla-historia");
    PP.Audio.musica("mision");
    const cuerpo = $("#historia-cuerpo"), puntos = $("#historia-puntos");
    const bSig = $("#historia-sig"), bAnt = $("#historia-ant"), bSaltar = $("#historia-saltar"), bOir = $("#historia-oir");
    let i = 0, cerrado = false;
    const terminar = () => { if (cerrado) return; cerrado = true; PP.Voz.callar(); document.removeEventListener("keydown", teclas); PP.juego.historiaVista = true; fin(); };
    const textoCompleto = (v) => v.t + (v.escena === "banda" ? " " + PP.BANDA.map((b) => b.nombre + ", en el " + PP.BARRIOS[b.barrio].nombre + ": " + b.hace).join(" ") : "");
    const pintar = (dir) => {
      const v = VINETAS[i];
      cuerpo.innerHTML = "";
      const panel = el("div", { class: "vineta hist-vineta fondo-" + v.fondo + " hv-" + v.escena + (dir < 0 ? " atras" : "") }, [
        el("div", { class: "hist-cap", html: "<small>" + U.esc(v.cap) + "</small><h2 id='historia-tit'>" + U.esc(v.tit) + "</h2>" }),
        v.escena === "banda" ? null : escena(v),
        el("div", { class: "hist-texto" }, [el("p", { class: "vin-texto", text: v.t }), v.escena === "banda" ? banda() : null])
      ]);
      cuerpo.appendChild(panel);
      puntos.innerHTML = VINETAS.map((_, k) => '<i class="' + (k === i ? "on" : k < i ? "hecho" : "") + '"></i>').join("");
      puntos.setAttribute("aria-label", "Parte " + (i + 1) + " de " + VINETAS.length);
      bAnt.disabled = i === 0;
      bSig.innerHTML = i < VINETAS.length - 1 ? "Siguiente " + U.icon("play") : "¡Acepto la misión! " + U.icon("play");
      if (v.escena === "borron") PP.Audio.sfx("mal");
      PP.Voz.decir(textoCompleto(v));
      bSig.focus();
    };
    const siguiente = () => { PP.Audio.sfx("pagina"); if (i >= VINETAS.length - 1) { PP.Audio.sfx("inicio"); return terminar(); } i++; pintar(1); };
    const anterior = () => { if (i === 0) return; PP.Audio.sfx("pagina"); i--; pintar(-1); };
    function teclas(e) {
      if ($("#pantalla-historia").hidden) return;
      if (e.code === "ArrowRight") { e.preventDefault(); siguiente(); }
      else if (e.code === "ArrowLeft") { e.preventDefault(); anterior(); }
      else if (e.code === "Escape") { e.preventDefault(); terminar(); }
    }
    bSig.onclick = siguiente; bAnt.onclick = anterior; bSaltar.onclick = () => { PP.Audio.sfx("clic"); terminar(); };
    bOir.onclick = () => PP.Voz.decir(textoCompleto(VINETAS[i]), { forzar: true });
    document.addEventListener("keydown", teclas);
    pintar(1);
  }

  PP.Historia = { mostrar, VINETAS };
})();
