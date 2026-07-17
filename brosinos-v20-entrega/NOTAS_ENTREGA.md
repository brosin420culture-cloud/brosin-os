# Entrega Brosinos v20 — rediseño premium completo

Paquete listo para integrar y desplegar. Generado el 17-07-2026 desde la carpeta de trabajo `brosinos-app`. **Versión: v19 → v20** (subida en los 3 sitios: meta `brosin-build`, texto del splash y `CACHE` del service worker). `node check.js` en verde y `brosin-pwa/index.html` regenerado con `node build_pwa.js`.

## Contenido del paquete

| Archivo / carpeta | Qué es |
|---|---|
| `BrosinOS.jsx` | El fuente completo de la app con TODO el rediseño (lo único que se edita). |
| `build_pwa.js` | Build actualizado: splash nuevo (logo real + animación de entrada) y meta v20. |
| `brosin-pwa/` | Carpeta de deploy completa y ya construida: `index.html` v20 generado, `service-worker.js` con `CACHE = "brosin-os-v20"`, iconos PWA nuevos y `brosin_eye.png` (logo del splash). `functions/api/` va intacta (no se ha tocado). |

## Qué cambió (v19 → v20)

### Branding (assets reales del cliente, desde originales 3000px)
- `BROSIN_EYE` (embebido en el fuente) ahora es **la abeja real** (`IMG_9550`): saludo del inicio, "¡Día completado!", estados vacíos, chat y perfil.
- `BROSIN_LOGO` ahora es **el logo bellota-cerebro** (`logo amarillo.png`): pantalla de bloqueo, onboarding y splash.
- **Iconos PWA regenerados** (`icon-512.png`, `icon-192.png`, `apple-touch-icon.png`): logo dorado sobre `#0a0a0a` con brillo radial. Reemplazar en el repo junto al `index.html`.

### Sistema visual ("colmena de lujo")
- Tokens re-trabajados: base negra por capas (`#0a0a0a` / `#141414` / `#1c1c1c`), tarjetas como placas físicas (degradado + canto de luz cenital + caída), sistema de elevación de 3 niveles.
- **Botones 3D táctiles**: clases `.b3d`, `.b3d-purple`, `.b3d-good`, `.b3d-red`, `.b3d-dark`, `.bkeycap` en el styleTag global + regla universal `button:active` (todo botón se hunde al pulsar). Aplicado a PrimaryBtn, FAB (pop al montar), iconBtn, miniBtn, Chip, teclado de la calculadora, teclas PIN, ToolButton, pestañas Gasto/Ingreso, CTA de EmptyState.
- Tipografía: números grandes 900 con tracking negativo y `tabular-nums` en todas las cifras de dinero.

### Temas
- **Modo noche + modo claro** (crema y miel). Conmutador en Perfil → "Tema de la app"; se guarda en `profile.theme` (sincroniza con la nube como el resto del perfil).
- Implementación: paletas `DARK`/`LIGHT`, objeto `C` mutable y `applyTheme()` que también re-tokeniza los átomos de módulo (`card`, `iconBtn`, `inputStyle`, `settingRow`, `linkBtn`, `sectionH`).
- ⚠️ IMPORTANTE: el marco de la app lleva `key={C.mode}` — al cambiar de tema se remonta el árbol para evitar estilos obsoletos (los átomos se pasan por referencia con `style={iconBtn}`). No quitar ese `key`.

### Micro-interacciones (todo CSS, solo transform/opacity, 60fps)
- Herramientas del inicio con personalidad al tocarlas (~0,4s y luego navegan): coche que se sale de la carretera con líneas de asfalto, cámara con zoom + flash, bombilla que se enciende, Equipo con dos personitas asomando, curva de Mercados que se dibuja, tarta que brinca, calculadora que se menea, Pantalla que vibra. (`ToolButton` con prop nueva opcional `anim`.)
- `DayRing`: trazos en degradado con glow y **celebración única al 100%** (pulso dorado + 8 partículas).
- `Segmented` con inercia y mini-overshoot; `Sheet` con curva spring y blur 8px; transición de página al cambiar de pestaña (`bpagein`); stagger de entrada en listas (`.bstagger`); pop del número del balance al cambiar; TabBar glass (blur+saturación, con prefijo -webkit- para iOS) e icono activo elevado en pastilla dorada.
- Splash: entrada del logo con escala+fade y halo (sin alargar la carga real).

### Arreglos visuales de paso
- Botones anchos basados en `iconBtn` ya no parten icono y texto en dos líneas (grid → flex).
- La etiqueta "desglosar" de las gráficas es ahora una píldora sobre el canto de la placa (antes pisaba el subtítulo y aparecía huérfana cuando la gráfica interna devolvía null — ambos corregidos).
- Foco de inputs global (borde amarillo + anillo suave), `color-scheme` de date/time según tema.

## Reglas duras respetadas
- Cero cambios de reducer, estado, store, backup, Supabase, push, `callClaude`, dispatch ni textos funcionales (solo se quitó el emoji 🐝 de "¡Día completado!" a petición del cliente, sustituido por la abeja real).
- Un solo archivo `BrosinOS.jsx`; estilos inline + styleTag; sin librerías nuevas de runtime.
- Safe-areas intactas; animaciones solo transform/opacity.

## Cómo verificar
```bash
npm i typescript@5.6.3   # ojo: typescript 6/7 rompe check.js y build_pwa.js (ts.JsxEmit)
node check.js            # debe decir OK
node build_pwa.js        # regenera brosin-pwa/index.html
grep -o 'brosin-build" content="v[0-9]*' brosin-pwa/index.html   # → v20
npx serve brosin-pwa     # probar en navegador
```
Checklist manual: navegar las 5 pestañas, abrir/cerrar sheets, crear y marcar un evento (el anillo celebra al 100%), calculadora, cambiar tema en Perfil (claro ↔ noche), teclado PIN.

## Deploy
Subir al repo `brosin-os` (rama main): `index.html`, `service-worker.js` (cambió a v20), `icon-512.png`, `icon-192.png`, `apple-touch-icon.png` y `brosin_eye.png` (nuevo, lo usa el splash). Cloudflare Pages despliega solo. En el móvil: cerrar la app del todo y reabrir — el splash debe decir v20. Para ver el icono nuevo en iPhone, reinstalar la app en pantalla de inicio.

## Pendiente acordado (siguiente bloque)
- **Multi-idioma** (ES/EN/DE/FR/IT): requiere sistema `t()` + diccionario (~300 cadenas × 5 idiomas, incluidos prompts de IA y textos de push) + locale en formatos de fecha. Es un bloque grande e independiente; la arquitectura actual lo permite.
- Hay más personajes de marca en la carpeta de fotos del cliente (hexágono con patas, más poses de la abeja) listos para repartir por la app si se quiere más personalidad por sección.
