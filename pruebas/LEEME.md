# Pruebas automáticas

Scripts para comprobar el juego en un navegador real con [Playwright](https://playwright.dev/python/).

```bash
pip install playwright && python -m playwright install chromium
python pruebas/completo.py 1,2,3,4,5,6   # juega las 15 misiones de cada curso y revisa el informe, las exportaciones y el guardado
python pruebas/limites.py                # casos límite: táctil, teclado, pausa, abandono, bloqueo, modo tranquilo
```

`autoplay.js` es un arnés que se inyecta en la página durante las pruebas: pulsa los botones reales de cada escena y recorre el mundo. No forma parte del juego publicado.
