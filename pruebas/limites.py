import asyncio, pathlib, os
from playwright.async_api import async_playwright
RAIZ = pathlib.Path(__file__).resolve().parent.parent
URL = (RAIZ / "index.html").as_uri()
CHROME = os.environ.get("CHROME")  # opcional: ruta a Chrome/Chromium
SALIDA = pathlib.Path(__file__).resolve().parent / "capturas"; SALIDA.mkdir(exist_ok=True)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=CHROME) if CHROME else p.chromium.launch()
        ctx = await b.new_context(viewport={"width":1180,"height":820}, has_touch=True)
        pg = await ctx.new_page(); pg.set_default_timeout(8000)
        errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
        R=[]
        await pg.goto(URL); await pg.wait_for_timeout(500)
        # zona docente sin datos
        await pg.click("#btn-docente"); await pg.wait_for_timeout(200)
        R.append(("Zona docente sin datos", await pg.locator("#docente-cuerpo td").first.inner_text()))
        await pg.click("#pantalla-docente [data-volver]")
        await pg.click("#btn-jugar"); await pg.click("#perfil-cursos .curso:nth-child(3)"); await pg.click("#btn-perfil-ok"); await pg.click(".modo-aventura"); await pg.wait_for_timeout(300)
        await pg.click("#intro-sig"); await pg.click("#intro-sig"); await pg.click("#intro-sig"); await pg.click("#intro-sig"); await pg.wait_for_timeout(700)
        await pg.click("#escena .esc-pie .btn"); await pg.wait_for_timeout(300)
        # joystick táctil
        x0 = await pg.evaluate("PP.Mundo.jugador.x"); y0 = await pg.evaluate("PP.Mundo.jugador.y")
        box = await pg.locator("#joystick").bounding_box()
        cx, cy = box["x"]+box["width"]/2, box["y"]+box["height"]/2
        await pg.evaluate(f"""(()=>{{const z=document.getElementById('joystick');const ev=(t,x,y)=>z.dispatchEvent(new PointerEvent(t,{{pointerId:7,clientX:x,clientY:y,bubbles:true,pointerType:'touch'}}));ev('pointerdown',{cx},{cy});ev('pointermove',{cx},{cy-50});window.__evj=ev;}})()""")
        await pg.wait_for_timeout(1200)
        await pg.evaluate(f"window.__evj('pointerup',{cx},{cy-50})")
        x1 = await pg.evaluate("PP.Mundo.jugador.x"); y1 = await pg.evaluate("PP.Mundo.jugador.y")
        R.append(("Joystick táctil (arriba) acelera la moto", f"desplazamiento {((x1-x0)**2+(y1-y0)**2)**0.5:.0f} px"))
        # teclado
        await pg.keyboard.down("ArrowUp"); await pg.wait_for_timeout(800); await pg.keyboard.up("ArrowUp")
        x2 = await pg.evaluate("PP.Mundo.jugador.x"); y2 = await pg.evaluate("PP.Mundo.jugador.y")
        R.append(("Teclado (↑) acelera la moto", f"desplazamiento {((x2-x1)**2+(y2-y1)**2)**0.5:.0f} px"))
        # móvil: abrir con P y cerrar con Esc
        await pg.keyboard.press("KeyP"); await pg.wait_for_timeout(200)
        a = await pg.evaluate("!document.getElementById('movil').hidden && !PP.Mundo.activo")
        await pg.keyboard.press("Escape"); await pg.wait_for_timeout(200)
        c = await pg.evaluate("document.getElementById('movil').hidden && PP.Mundo.activo")
        R.append(("Móvil P/Esc pausa y reanuda", a and c))
        # misión final bloqueada
        await pg.evaluate("PP.Mundo.colocarJugador('periodico'); PP.Mundo.jugador.x += 1.4*48")
        await pg.wait_for_timeout(300); await pg.keyboard.press("Space"); await pg.wait_for_timeout(300)
        R.append(("Misión final bloqueada con <10", await pg.evaluate("PP.juego.misionActiva===null && document.getElementById('escena').hidden")))
        # abandonar misión desde la escena
        await pg.evaluate("PP.Mundo.colocarJugador('estacion')"); await pg.wait_for_timeout(300)
        await pg.keyboard.press("Enter"); await pg.wait_for_timeout(400)
        await pg.click("#escena .esc-pie .btn"); await pg.wait_for_timeout(300)
        # doble clic rápido sobre una opción
        n0 = await pg.evaluate("PP.Eval.sesion.eventos.length")
        await pg.locator(".dlg-opciones button").first.dblclick(); await pg.wait_for_timeout(200)
        n1 = await pg.evaluate("PP.Eval.sesion.eventos.length")
        R.append(("Doble clic registra un solo evento por nodo", f"{n1-n0} evento(s)"))
        await pg.click("#escena .btn-salir"); await pg.wait_for_timeout(300)
        R.append(("Salir de misión vuelve al mundo", await pg.evaluate("PP.juego.misionActiva===null && PP.juego.modo==='mundo' && document.getElementById('escena').hidden")))
        # abandonar en un paso del mundo (ir)
        await pg.evaluate("PP.Mundo.colocarJugador('radio')"); await pg.wait_for_timeout(300)
        await pg.keyboard.press("Enter"); await pg.wait_for_timeout(300)
        await pg.click("#escena .esc-pie .btn"); await pg.wait_for_timeout(300)
        await pg.click(".btn-play"); await pg.wait_for_timeout(200)
        await pg.evaluate("document.querySelectorAll('#escena .esc-pie .btn')[0].disabled=false")
        await pg.click("#escena .esc-pie .btn"); await pg.wait_for_timeout(400)
        nd = await pg.evaluate("PP.Mundo.destinos.length")
        await pg.locator("#objetivo .btn", has_text="Salir").click(); await pg.wait_for_timeout(300)
        R.append(("Paso «ir» muestra 3 destinos y se puede abandonar", f"{nd} destinos; activa={await pg.evaluate('PP.juego.misionActiva')}"))
        # autopista con teclado en modo tranquilo
        await pg.evaluate("PP.ajustes.sinTiempo=true; PP.Mundo.colocarJugador('circuito')"); await pg.wait_for_timeout(300)
        await pg.keyboard.press("Enter"); await pg.wait_for_timeout(300); await pg.click("#escena .esc-pie .btn"); await pg.wait_for_timeout(500)
        for k in range(900):
            st = await pg.evaluate("(()=>{const d=PP.Autopista._debug; if(!document.querySelector('.autopista')) return null; const s=d.st; const p=s.portico; return {esp:s.esperando, fin:s.fin, car:s.carril, obj: p&&!p.resuelto? p.paneles.find(x=>x.op===p.it.c).c : null}})()")
            if st is None: break
            if st["obj"] is not None and st["car"] != st["obj"]:
                await pg.keyboard.press("ArrowRight" if st["obj"]>st["car"] else "ArrowLeft")
            elif st["esp"]:
                await pg.keyboard.press("Space")
            if await pg.locator(".ap-fin").count():
                await pg.click(".ap-fin"); break
            await pg.wait_for_timeout(120)
        await pg.wait_for_timeout(600)
        res = await pg.evaluate("document.getElementById('resultado').hidden ? 'sin resultado' : document.querySelector('#resultado .res-txt').textContent")
        R.append(("Autopista con teclado en modo tranquilo", res))
        await pg.screenshot(path=str(SALIDA) + "/resultado.png")
        if await pg.locator("#resultado .btn-primario").count(): await pg.click("#resultado .btn-primario")
        # ajustes: texto grande y alto contraste
        await pg.evaluate("PP.UI.abrirMovil('ajustes')"); await pg.wait_for_timeout(200)
        await pg.select_option("#movil-cuerpo select >> nth=1", "1.4"); await pg.wait_for_timeout(100)
        fs = await pg.evaluate("getComputedStyle(document.documentElement).fontSize")
        R.append(("Tamaño de texto muy grande", fs))
        await pg.screenshot(path=str(SALIDA) + "/ajustes.png")
        await pg.click("#movil-cerrar")
        print("\n".join(f"- {a}: {b}" for a,b in R)); print("ERRORES:", errs)
        await b.close()
asyncio.run(main())
