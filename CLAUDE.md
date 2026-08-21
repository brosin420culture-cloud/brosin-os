# brosinOS

PWA de un solo fichero. Segundo cerebro (dinero, agenda, colecciones) + un juego
de la vida real (hábitos, vida, XP, monedas). En https://brosinos.com.

**Antes de tocar nada, lee `BROSINOS_TRASPASO.md`.** Está la historia por versión
y por qué cada cosa es como es. Ahorra reabrir agujeros ya tapados.

## Stack

React 18 + lucide-react por importmap desde esm.sh. **Sin bundler, sin
node_modules.** Datos en localStorage + Supabase; fotos en IndexedDB.
Hosting: **Cloudflare Pages**, deploy al hacer push a `main`.
(`LEER-PRIMERO.txt` dice Netlify: está desactualizado.)

## Estructura

```
fuente/BrosinOS.jsx   TODO el código (~9.000 líneas)
fuente/build_pwa.js   transpila fuente → index.html
index.html            el build — NO se edita a mano
functions/api/        claude.js (proxy IA), pending.js, tick.js (push)
i18n/*.json           25 idiomas, 947 claves (la clave es el texto español)
```

## Comandos

```bash
npm i -g typescript
cd fuente && node build_pwa.js    # genera index.html
```
**No hay tests.** Se verifica a mano en el navegador, y hay que hacerlo.

## Convenciones

- Estilos en objetos inline; los temas mutan `card`, `iconBtn`, `settingRow` en
  `applyTheme()`. Para condicionales usa `C.base`, nunca `C.mode`.
- Textos siempre por `tr()` / `tri()`, con el español como clave.
- Colecciones del estado: `add` / `update` / `remove` / `setCol` en el reducer.
  Los borrados dejan lápida en `state._tomb` para que la sincronización no los
  resucite.
- Comentarios en español, explicando **por qué**, no qué.

## Reglas que no se negocian

1. **En localStorage van datos, NUNCA binarios.** Las fotos lo llenaron una vez
   y la app dejó de guardar. Van a IndexedDB (`FOTO_DB`).
2. **Nunca animes el radio del desenfoque** — anima el relleno o `transform`. Si
   lo animas, los paneles salen negros en móviles reales.
3. **Nada de cristal dentro de cristal.** Filas dentro de un panel:
   `filaDentro()`, que es pintura. Con `settingRow` el texto se vuelve ilegible.
4. **Fechas en hora local** vía `todayISO()`. Con UTC, lo marcado entre las 00:00
   y las 02:00 se apuntaba en el día anterior.
5. **Vida y monedas solo por `dispatch({type:"premio"})`**, que es donde se
   escribe el historial. Por otra vía, el historial miente.
6. **Al subir versión, tres sitios a la vez:** `I18N_VER`, el
   `<meta name="brosin-build">` y el nombre de caché del service worker.
7. **Las traducciones, en la misma versión** que el código que las introduce.
8. **El repo es la fuente de verdad, no el disco.** Publica antes de seguir.
9. **Nunca commitees credenciales.** Lo embebido en `index.html` es público a
   propósito (clave publicable de Supabase con RLS, mitad pública de VAPID).
