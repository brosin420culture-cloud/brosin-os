# BROSINOS — DOCUMENTO DE TRASPASO COMPLETO
### Todo lo que hace falta para seguir el proyecto desde otra cuenta de Claude
**Fecha del traspaso:** 27 de julio de 2026 · **Última versión publicada: v31** (commit `eb42019`)

---

## PARTE 0 · PARA KEVIN — CÓMO USAR ESTE DOCUMENTO (3 pasos)

1. Abre un chat nuevo en la cuenta nueva de Claude y **adjunta este archivo** (`BROSINOS_TRASPASO.md`). Si también tienes el ZIP (`brosinos_traspaso_v31.zip`), adjúntalo o súbelo: dentro va todo el código y los scripts.
2. Escribe este mensaje de arranque, tal cual:

   > Lee el documento BROSINOS_TRASPASO.md que te adjunto. Es mi proyecto. Quiero que sigas trabajando exactamente igual que en el chat anterior: tú lo haces todo (programar, probar, subir a GitHub) y yo solo abro la app. Te doy todos los permisos. Empieza por confirmarme que lo has entendido y dime cuál es la siguiente tarea pendiente.

3. Claude te pedirá **un token nuevo de GitHub** (un "PAT"). El antiguo **no está en este documento a propósito**, por seguridad. Cómo sacar uno nuevo:
   GitHub → foto de perfil (arriba derecha) → *Settings* → abajo del todo *Developer settings* → *Personal access tokens* → *Fine-grained tokens* → **Generate new token** → dale un nombre (`brosinos-claude`), *Repository access* → **Only select repositories** → `brosin420culture-cloud/brosin-os`, y en *Permissions → Repository permissions* pon **Contents: Read and write**. Genera y pega el token en el chat nuevo (empieza por `github_pat_`).

**Nota importante:** todo el código ya está en GitHub, así que **no se pierde nada**. Lo que este documento traspasa es el *conocimiento*: cómo está montado, cómo se despliega, qué convenios hay, qué falla y por qué, y qué queda pendiente.

---

## PARTE 1 · INSTRUCCIONES PARA EL NUEVO CLAUDE

Léelas antes de tocar nada.

### Quién es el usuario
Kevin, español, **no es programador**. No sabe usar git, ni la terminal, ni entiende código. No le expliques implementación salvo que la pida: explícale **qué cambia en la app y qué va a ver él**.

### Cómo trabajar (permiso permanente que ya concedió)
> *"quiero que lo hagas tu todo ya en github siempre... te doy todos los permisos necesarios"*

Eso significa, literalmente: **tú** editas el código fuente, **tú** compilas, **tú** escribes y pasas las pruebas, **tú** haces commit y push a GitHub. Cloudflare Pages despliega solo. Kevin únicamente **cierra y reabre la app** en el móvil. No le pidas que suba archivos, ni que copie código, ni que ejecute comandos. Nunca le des instrucciones técnicas como tarea.

Cuando dice **"sigue"** significa: *elige tú la siguiente mejora, hazla entera y súbela*. No le preguntes qué quiere; decide con criterio (hay una hoja de ruta en la Parte 9) y cuéntaselo al terminar.

### Cómo hablarle
En español de España, cercano, con frases cortas y sin jerga. Al terminar una versión, un resumen tipo:

> **v31 ya está subida.** Cierra la app del todo y vuelve a abrirla y verás X, Y y Z. Tarda 1-2 minutos en actualizarse.

Nada de listas técnicas ni tablas de commits. Él quiere saber qué ve y qué hacer.

### Seguridad — reglas que no se rompen
- El **PAT de GitHub** vive en un fichero con permisos 600 (`/home/claude/.ghpat`), **nunca se escribe en el chat** y toda salida de `git push`/`fetch` se filtra con `| sed 's/github_pat_[A-Za-z0-9_]*/***/g'`.
- La **clave SECRETA de Supabase** (service key) **jamás** va en el código del cliente ni se le pide a Kevin que la mande por chat. Solo se pega directamente en las variables de entorno de Cloudflare. Cita suya: *"Esa clave es secreta — pégala directamente en Cloudflare, no me la mandes a mí"*.
- La **clave publishable** de Supabase y la **VAPID pública** sí pueden ir incrustadas en `index.html` (son públicas por diseño; protegidas por Row-Level Security).
- La **API key de Anthropic** vive solo como variable de entorno en Cloudflare (`ANTHROPIC_API_KEY`). No la pidas.

---

## PARTE 2 · QUÉ ES BROSINOS

Una **PWA personal tipo "segundo cerebro"** hecha a medida para Kevin: agenda + dinero + hábitos + colecciones + objetivos + empresas/eventos + equipo, con IA integrada, avisos push, sincronización en la nube y 26 idiomas.

- **App en vivo:** https://brosinos.com
- **Repositorio:** https://github.com/brosin420culture-cloud/brosin-os (rama `main`)
- **Hosting:** Cloudflare Pages, **despliegue automático al hacer push a `main`** (1-2 min)
- **Base de datos / auth / cron:** Supabase, proyecto `brosin420culture` → `https://xjawjkrgxdhxanwtjcpb.supabase.co`
- **IA:** Anthropic vía proxy propio en `/api/claude` (modelo `claude-sonnet-5`, se cambia en un único sitio)
- **Lema:** *"Tu segundo cerebro. Bro, no te quedes sin."*

> ⚠️ El fichero `LEEME.txt` que hay en la carpeta está **desactualizado**: habla de Netlify y de `brosinoss.netlify.app`. El proyecto migró a **Cloudflare Pages + dominio brosinos.com** hace muchas versiones. La carpeta `netlify/` del sandbox es historia; la que cuenta es `functions/` (formato Cloudflare Pages Functions).

---

## PARTE 3 · ARQUITECTURA (lo esencial)

### 3.1 Un solo fichero fuente
Toda la app es **un único fichero React 18**: `BrosinOS.jsx`, ~7.000 líneas, ~552 KB. No hay bundler, ni npm install, ni `src/`. Un script de compilación lo transpila y lo **incrusta entero** dentro de un `index.html` autocontenido.

```
BrosinOS.jsx  ──(build_pwa.js: ts.transpileModule, JSX→JS, ES2019, módulos ESNext)──▶  brosin-pwa/index.html
```

El `index.html` resultante (~626 KB) lleva:
- un **importmap** que apunta a esm.sh: `react@18.3.1`, `react-dom@18.3.1`, `lucide-react@0.456.0`, `@supabase/supabase-js@2`
- un `<script>` de configuración con `window.__SB_URL`, `window.__SB_KEY` (publishable), `window.__VAPID_PUBLIC`, `window.__BROSIN_PROXY = "/api/claude"` y un shim de `window.storage` sobre `localStorage` (prefijo `brosin:`)
- un splash con el ojo de Brosin y el texto `Despertando la colmena… · vNN`
- la marca de versión `<meta name="brosin-build" content="vNN" />` ← **sirve para verificar el despliegue**
- registro del service worker

**Regla de oro:** *nunca* edites `brosin-pwa/index.html` a mano. Se regenera siempre con `node build_pwa.js`.

### 3.2 Estado y reducer
Un solo `useReducer` con el objeto `EMPTY` (línea ~934). Colecciones: `events, sleepLog, tx, debts, investments, collections, orgs, groups, fiados, goals, notes, chat, markets, meals, sharedInv, people, savings, habits, screenApps, teamProjects` + `profile` + `drive`.

Acciones del reducer (solo 8, muy genéricas):

```js
{type:"hydrate", payload}                     // cargar estado guardado
{type:"ready"}
{type:"profile", payload}                     // merge sobre state.profile
{type:"add",    col:"events", item}           // añade al principio
{type:"update", col:"events", id, patch}
{type:"remove", col:"events", id}
{type:"setCol", col:"events", items}          // reemplaza la colección entera
{type:"drive",  payload}
```

Persistencia local: `STATE_KEY = "brosin_os_v1"`, PIN en `PIN_KEY = "brosin_pin_v1"`, copia automática en `AUTOBAK_KEY = "brosin_autobak_v1"`. Nube: tabla `app_state` de Supabase (`user_id`, `data`, `updated_at`), con upsert.

### 3.3 Pantallas principales
`HomeScreen` (anillo del día `DayRing`, atajos, IA), `AgendaScreen` + `MonthView`, `MoneyScreen` (tx, deudas, huchas, inversiones, mercados en vivo, grupos estilo Splitwise, cierre de mes con IA), `CollectionScreen`, `BrainScreen` (objetivos + notas + chat), `CameraScreen` (comidas), `ProfileScreen` (ajustes, avisos, nube, copia de seguridad, temas), `TeamScreen`, `DrivingScreen`, `ScreenTimeScreen`, más `Onboarding`, `LockScreen` (PIN), `DailyBrief` (el parte matinal) y `TabBar`.

### 3.4 Temas — **`mode` vs `base`** (decisión clave, no la rompas)
Existe un objeto **mutable** `const C = { ...DARK }` que todo el código usa para colores. `applyTheme(k)` hace `Object.assign` sobre `C` y **retokeniza** los átomos de estilo de nivel de módulo (`card`, `iconBtn`, `inputStyle`, `sectionH`, `linkBtn`, `settingRow`) y los colores de `SHARE_KINDS`/`SHARE_META`. Sale antes si `C.mode === T.mode`.

Cada paleta tiene **dos** identificadores:
- `mode` — **único por tema** (`"dark"`, `"light"`, `"mid"`, `"honey"`, `"gold"`). Solo sirve para identidad y para la `key` de remontaje del frame.
- `base` — **`"dark"` o `"light"`**. Es el que usan *todas* las condiciones de estilo (`color-scheme`, color del placeholder, sombras de las teclas, filtros de brillo, `boxShadow` del marco…).

> Si añades un tema nuevo, hereda de `DARK` o `LIGHT`, ponle un `mode` propio y el `base` correcto. **Nunca** escribas `C.mode === "light"` en código de estilo — usa `C.base`. (Había 8 sitios que lo hacían y se migraron todos en v30; volver a introducirlo rompería el tema Miel.)

Registro (línea ~246):

```js
const THEMES = { dark: DARK, light: LIGHT, mid: MID, honey: HONEY, gold: GOLD };
const THEME_LIST = [
  { k: "dark",  name: "Noche",      emoji: "🌙", req: 0  },
  { k: "light", name: "Claro",      emoji: "☀️", req: 0  },
  { k: "mid",   name: "Medianoche", emoji: "🌌", req: 7  },
  { k: "honey", name: "Miel",       emoji: "🍯", req: 14 },
  { k: "gold",  name: "Oro puro",   emoji: "👑", req: 30 },
];
```

`req` = días de racha necesarios para desbloquearlo. El desbloqueo usa `Math.max(profile.streakBest, hiveStreak(state).count, hiveBestStreak(state))` — **la mejor racha histórica cuenta para siempre**, no se pierde el tema al romper la racha. En la raíz: `applyTheme(THEMES[_thK] ? _thK : "dark")` (fallback ante clave desconocida).

### 3.5 Idiomas (i18n) — el sistema
26 idiomas (los 24 oficiales de la UE + noruego + ucraniano) + "auto". Piezas:

```js
let I18N = null, CUR_LANG = "es", LOCALE = "es-ES";
const I18N_VER = "31";                       // ← romper caché al publicar
const tr  = (es) => (I18N && Object.prototype.hasOwnProperty.call(I18N, es) ? I18N[es] : es);
const tri = (es, vars) => { let s = tr(es); for (const k in vars) s = s.split("{"+k+"}").join(String(vars[k])); return s; };
```

**El literal en castellano ES la clave.** Por eso, si falta una traducción, la app cae con elegancia al español y nunca se rompe. Eso permite publicar el "envoltorio" (`tr(...)`) primero y las traducciones después, en otra versión.

- `tri()` es para frases con huecos: `tri("Te faltan {n} días", { n: 3 })`. **Traduce la frase entera y luego rellena** — nunca concatenes trozos traducidos sueltos.
- Diccionarios: `brosin-pwa/i18n/{código}.json`, **25 ficheros** (el español no necesita fichero), **595 claves cada uno** (desde la v32), todos con exactamente las mismas claves.
- Carga: `loadLang()` guarda en caché con clave `i18n_{lang}_v{I18N_VER}` y pide `./i18n/{lang}.json?v={I18N_VER}` con `no-cache`. **Si tocas los diccionarios, sube `I18N_VER`** o los móviles seguirán con el viejo.
- Al cambiar de idioma se remonta el frame con `key={C.mode + "·" + CUR_LANG + "·" + langTick}`.

**El bucle de trabajo de idiomas (repetible):**
1. `node scan_v31.js` → detecta castellano sin envolver (texto JSX `>…<`, ternarios `? "A" : "B"`, plantillas con `${}`) y vuelca `/tmp/scan31.json`.
2. Editas la lista de cadenas en `wrap_v31.js` y ejecutas `node wrap_v31.js check`. **Si hay algún "✗ sin encontrar", el modo `apply` aborta.** Solo cuando salen 0 fallos: `node wrap_v31.js apply`.
3. `node dump_keys_v31.js` → extrae todas las claves `tr("…")`/`tri("…")`, las compara con `en.json` y escribe las nuevas en `i18n_new_keys_v31.json`.
4. Traducir esas claves a los 25 idiomas.
5. Fusionar con un script tipo `merge_v30.js` que **valida**: ninguna traducción vacía, paridad de número de claves entre todos los ficheros, y que las claves anteriores no cambian (compara contra `git show HEAD:i18n/{f}`).
6. Subir `I18N_VER`, compilar, probar, publicar.

### 3.6 Racha / gamificación
```js
wasActiveOn(state, iso)   // ¿hubo actividad ese día? mira (h.done || []).includes(iso) o un evento hecho
hiveStreak(state, now)    // → { count, activeToday }
hiveBestStreak(state)     // mejor racha histórica
dayISOOf(d)
```
Campos de perfil: `streakFreezes` (congeladores, máx. 2, se gana 1 cada 7 días), `streakSaved`, `streakMilestone`, `streakBest`.

⚠️ **Ojo con los datos de prueba:** los hábitos guardan los días hechos en un **array** `h.done = ["2026-07-27", …]`, **no** en un objeto `history`. Este error ya costó dos pruebas falladas.

### 3.7 Avisos push (arquitectura completa)
```
App → calcula computeReminders(state) → inserta filas en Supabase `reminders`
Supabase pg_cron (cada minuto) → POST https://brosinos.com/api/tick  (cabecera x-tick-secret)
/api/tick (Cloudflare Function) → firma VAPID (ES256) → envía push SIN payload al móvil
Service worker recibe el push → POST /api/pending {endpoint} → recibe los textos → showNotification()
```
Tablas: `push_subs` (un móvil = una fila, `endpoint` único) y `reminders` (`rkey, fire_at, title, body, sent, shown`), ambas con RLS por `auth.uid()`. El SQL completo está en `brosin-pwa/brosin_push_setup.sql`.

⚠️ **`computeReminders` devuelve objetos con `rkey`, NO con `id`.** (Otro error que ya costó una prueba fallada.)

Variables de entorno necesarias en Cloudflare Pages: `ANTHROPIC_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `VAPID_PUBLIC`, `VAPID_PRIVATE`, `VAPID_SUBJECT`, `TICK_SECRET`.

---

## PARTE 4 · MAPA DE FICHEROS

### En el repositorio (lo que se despliega)
| Fichero | Qué es |
|---|---|
| `index.html` | **La app entera compilada.** Generado, nunca editar a mano |
| `service-worker.js` | Offline + caché + recepción de push. Constante `CACHE = "brosin-os-vNN"` |
| `manifest.webmanifest` | Nombre e icono al instalar |
| `i18n/*.json` | 25 diccionarios de idiomas |
| `functions/api/claude.js` | Proxy a Anthropic (`/api/claude`). Aquí se cambia el modelo de IA |
| `functions/api/tick.js` | Lo llama Supabase cada minuto; firma VAPID y manda los push |
| `functions/api/pending.js` | Lo llama el service worker; devuelve los textos pendientes |
| `functions/_middleware.js` | Compatibilidad con la ruta antigua `/.netlify/functions/claude` |
| `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `brosin_eye.png` | Iconos y logo |

### En el entorno de trabajo (sandbox de Claude, `/home/claude`)
| Fichero | Qué es |
|---|---|
| **`BrosinOS.jsx`** | **El código fuente. Aquí van TODAS las ediciones** |
| **`build_pwa.js`** | El compilador. Contiene los marcadores de versión y las claves públicas |
| `brosin-pwa/` | Copia local de lo que va al repo (index.html, sw, i18n, iconos, SQL) |
| `repo/` | Clon de git (`origin` = brosin-os) |
| `.ghpat` | El token de GitHub, chmod 600 — **nunca se imprime** |
| `i18n_new_keys_v31.json` | Las 208 claves de la fase 4 — **ya fusionadas en la v32** |
| `scan_v31.js` / `wrap_v31.js` / `dump_keys_v31.js` | Herramientas del bucle de idiomas |
| `merge_v30.js` | Plantilla del script de fusión de traducciones (con validaciones) |
| `test_v30.js` / `test_v31.js` | Bancos de pruebas (v31: 78 comprobaciones) |
| `kit_compartir/` | Guía HTML con QR, mensaje de WhatsApp y el informe de competencia |
| `LEEME.txt` | **Obsoleto** (menciona Netlify). Ignorar |

---

## PARTE 5 · EL RITUAL DE PUBLICACIÓN (paso a paso, exacto)

Para pasar de la versión **N** a la **N+1**:

```bash
# 0) Editar /home/claude/BrosinOS.jsx  (todo el trabajo real ocurre aquí)

# 1) Subir el número de versión en los tres sitios
cd /home/claude
sed -i 's/content="vN"/content="vN+1"/; s/· vN</· vN+1</' build_pwa.js
sed -i 's/brosin-os-vN/brosin-os-vN+1/' brosin-pwa/service-worker.js
#    y si tocaste diccionarios, I18N_VER en BrosinOS.jsx:
sed -i 's/const I18N_VER = "N"/const I18N_VER = "N+1"/' BrosinOS.jsx

# 2) Compilar
node build_pwa.js          # → "index.html written: ~626000 bytes"

# 3) Probar  (ver Parte 6)
export NODE_PATH="$(npm root -g)"
node test_vNN.js           # debe salir "78 OK · 0 fallos"

# 4) Copiar al clon y publicar
cp brosin-pwa/index.html brosin-pwa/service-worker.js repo/
cp brosin-pwa/i18n/*.json repo/i18n/          # solo si cambiaron
cd repo
git add index.html service-worker.js i18n/    # i18n solo si procede
git commit -qF /tmp/msg.txt                   # ← mensaje en FICHERO, nunca inline
git push origin main 2>&1 | sed 's/github_pat_[A-Za-z0-9_]*/***/g'

# 5) VERIFICAR que llegó de verdad (no te fíes del push)
git fetch -q origin 2>&1 | sed 's/github_pat_[A-Za-z0-9_]*/***/g'
[ "$(git rev-parse HEAD)" = "$(git rev-parse origin/main)" ] && echo "✓ EN GITHUB"
git show origin/main:index.html | grep -o 'brosin-build" content="v[0-9]*"'
```

**Configuración de git ya establecida en el clon** (`/home/claude/repo/.git/config`):
```
user.name  = Claude
user.email = noreply@anthropic.com      ← obligatorio, hay un hook que lo exige
credential.helper = !f() { echo "username=x-access-token"; echo "password=$(cat /home/claude/.ghpat)"; }; f
```

**Formato del mensaje de commit** (en castellano, orientado a Kevin, y terminando con las dos líneas de firma que exige el entorno):
```
v31: fase 4 de idiomas — 208 textos más preparados para traducir

- Nuevo helper tri() para frases con huecos ({n} días, {nombre} cumple…)
- ~210 textos visibles envueltos: onboarding, agenda, dinero, mercados…
- Sin cambios visibles en español

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## PARTE 6 · CÓMO PROBAR (banco de pruebas sin navegador)

No hay jsdom (bloqueado en el sandbox). La técnica que funciona es transpilar a CommonJS, cargar el módulo a mano y renderizar con `renderToStaticMarkup`. Receta:

```js
const ts = require(path.join(process.env.NODE_PATH, "typescript"));   // export NODE_PATH="$(npm root -g)"

// 1) entorno de navegador mínimo
global.window = { storage:{get:async()=>null,set:async()=>{}}, addEventListener(){}, removeEventListener(){},
  matchMedia:()=>({matches:false,addEventListener(){},removeEventListener(){}}),
  location:{origin:"https://brosinos.com"}, __VAPID_PUBLIC:"test", __SB_URL:"", __SB_KEY:"",
  __BROSIN_PROXY:"/api/claude", setTimeout, clearTimeout };
global.navigator = { language:"es-ES", userAgent:"node-test", onLine:true };
global.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
global.fetch = async () => { throw new Error("offline"); };

// 2) transpilar y exportar lo interno para poder examinarlo
let src = fs.readFileSync("/home/claude/BrosinOS.jsx","utf8")
            .replace("export default function BrosinOS","function BrosinOS");
src += `\nexport const __t = { THEMES, THEME_LIST, applyTheme, C, card, hiveStreak, computeReminders, tr };
        \nexport const __ui = { ProfileScreen, StreakPanel, Sheet };`;
const out = ts.transpileModule(src, { compilerOptions:{ jsx: ts.JsxEmit.React,
  target: ts.ScriptTarget.ES2019, module: ts.ModuleKind.CommonJS, esModuleInterop:true }, reportDiagnostics:true });
const m = new Module("/home/claude/B.cjs");
m.paths = Module._nodeModulePaths("/home/claude");
m._compile(out.outputText, "/home/claude/B.cjs");
```

Antes hay que dejar un **stub de `lucide-react`** en `node_modules` local (un `Proxy` que devuelve un componente vacío para cualquier icono), porque los iconos se importan por nombre.

**Truco para renderizar hojas (`Sheet`) que arrancan cerradas** — se parchea temporalmente `useState`:
```js
const realUseState = React.useState;
React.useState = (init) => (init === false ? [true, () => {}] : realUseState(init));
// … renderToStaticMarkup(…) …
React.useState = realUseState;
```

El fichero `test_v31.js` (78 comprobaciones, todas en verde) cubre: forma y requisitos de `THEME_LIST`, que ninguna paleta tenga huecos, unicidad de `mode`, herencia correcta de `base`, que `applyTheme` retokenice `card.background`, fallback ante tema desconocido, presencia de las claves i18n en `en.json`, SSR de `ProfileScreen` (cerrada y con las hojas abiertas), número de candados según la racha, la tarjeta "Próxima recompensa" en `StreakPanel`, sustitución de `tri()`, `leadLabel` en todas sus ramas, SSR de `DailyBrief` y `NotifSettings`, ausencia de doble envoltura `tr(tr(`, y regresión del núcleo (`hiveStreak`, `computeReminders`, `monthStats`, fallback de `tr`).

---

## PARTE 7 · TRAMPAS CONOCIDAS (léelas, ahorran horas)

1. **Comillas en `node -e` y heredocs.** Cualquier script con comillas o barras invertidas (`.replace(/\\"/g, '"')`) revienta el intérprete. **Regla: escribe siempre un fichero `.js` de verdad y ejecútalo**, y usa `git commit -qF /tmp/msg.txt` en vez de `-m "…"`.
2. **Líneas gigantes de base64** en `BrosinOS.jsx` alrededor de `BROSIN_EYE` / `BROSIN_LOGO` (línea ~989). **Nunca leas rangos de líneas que las crucen** ni hagas grep sin recortar (`cut -c1-140`): saturan el contexto.
3. **Envolver textos con regex:** el límite estricto `>Texto<` falla con espacios (`> Texto <`) y cuando el texto sigue a una expresión JSX (`{money(x)}Texto<`). Usa el patrón flexible y aplica **las cadenas más largas primero** para que una corta no corrompa una larga que la contiene:
   ```js
   const rx = (s) => new RegExp("([>}])(\\s*)" + escapaRegex(s) + "(\\s*)([<{])", "g");
   ```
4. **El directorio de trabajo del shell persiste** entre llamadas dentro de un mismo comando compuesto. Usa rutas absolutas o `cd /home/claude` al empezar.
5. **Red del sandbox:** `brosinos.com`, `*.supabase.co` y `esm.sh` están **bloqueados** (CONNECT 403). Sí funcionan `github.com` y el registro de npm. `pip` casi todo bloqueado. `jsdom` no se puede instalar. Consecuencia: **no puedes comprobar la web desplegada desde aquí** — la verificación se hace contra `origin/main` con `git show`.
6. **Los subagentes se quedan sin cuota.** Ha pasado dos veces (`"You've hit your limit"`). Por eso conviene separar el *envolver* (se puede publicar solo, cae al español) del *traducir* (puede llegar en la versión siguiente). Si un agente traductor muere, sus ficheros parciales ya escritos siguen ahí: **valídalos antes de usarlos**.
7. **Al desplegar, verifica siempre**: compara `git rev-parse HEAD` con `origin/main` y comprueba el `<meta name="brosin-build">` del `index.html` remoto.

---

## PARTE 8 · HISTORIAL DE VERSIONES

| Ver | Commit | Qué trajo |
|---|---|---|
| v20 | `52a2a54` | Rediseño premium + arreglo de notificaciones push |
| v21 | `d9bb22b` | Médico de avisos (diagnóstico push) + aviso de prueba de 1 min |
| v22 | `8adae46` | Racha de la colmena, contador en el icono, voz multi-acción |
| v23 | `885ed2b` | «Tu día en 30 segundos»: brief matinal con aviso programado |
| v24 | `769d8f6` | Multi-idioma fase 1: ES · EN · FR · DE · IT · PT |
| v25 | `66fffd6` | Fase 2: 26 idiomas (24 oficiales UE + noruego + ucraniano) |
| v26 | `1bdd2a8` | Fase 3: profundidad ×3,5 (315 claves en los 26 idiomas) |
| v27 | `68b4ed8` | IA multilingüe, push traducidos, mapa de calor de constancia |
| v28 | `d68b429` | Grupos de gastos con pagos mínimos (estilo Splitwise) |
| v29 | `f920826` | Cierre de mes financiero con IA |
| v30 | `8257eae` | **Temas desbloqueables por racha** (+ separación `mode`/`base`) |
| v31 | `eb42019` | Fase 4 de idiomas: helper `tri()` + 208 claves nuevas envueltas |
| v32 | `b226bc4` + `6237dfc` | 25 idiomas completos: 595 claves en los 25 diccionarios |
| v33 | `8500945` | 10 arreglos de Kevin + Fijos, huchas compartidas y Retos con amigos |
| v34 | `a39d2cb` | **Arreglada la pérdida de datos**: sello savedAt, la nube ya no pisa a ciegas, guardado al cerrar |
| v35 | `8c821d3` | Apilado dinámico de paneles, editar piezas, día en deudas, Vistazo al abrir |
| v36 | `b60c61d` | Vender inversiones con ingreso real en Movimientos; historial de sueño completo |
| v37 | `516f711` | Precio real en Colecciones: oro/plata al peso y cartas Pokémon/Magic |
| v38 | `5ce1c2f` | **Fusión real de sincronización** con marcas de borrado |
| v39 | `2d599c0` + `74cc81e` | Los 25 idiomas al día: 690 claves, I18N_VER = 39 |
| v40 | `be653ee` + `3ef6e86` | Vender apunta **solo la ganancia**; Herramientas y Hábitos al abrir |
| **v41** | **`5b3a4c8` + `4f4bcf3`** | **Sección Objetos: cartera de lo que cotiza de verdad. 711 claves, I18N_VER = 41** ← actual |

---

## PARTE 9 · TRABAJO PENDIENTE

### ✅ HECHAS — de la v33 a la v39 (30/07 y 03/08 de 2026)
Resumen corto, el detalle está en cada commit:

- **v33** — los 10 arreglos que pidió Kevin más los Retos con amigos (#8 de la hoja de ruta).
- **v34** — *pérdida de datos*. `cloudLoad` volcaba la nube encima de lo local sin mirar fechas.
  Ahora cada guardado lleva `savedAt`, hay flush en `pagehide`/`visibilitychange` y los fallos
  de cuota de `localStorage` se ven en vez de tragarse.
- **v35** — `useTopZ`: el apilado de paneles es dinámico, manda el último que se abre. Con
  números fijos no había arreglo posible. Además: editar piezas, día en deudas, Vistazo al abrir.
- **v36** — vender inversiones (el cobro entra como ingreso real en Movimientos, separando
  "sin vender" de "ya ganado") e historial de sueño completo, no solo 7 días.
- **v37** — precio real en Colecciones. Ver PARTE 11.
- **v38** — *fusión real de sincronización*: `updatedAt` por item, marcas de borrado en
  `state._tomb` y `fusionarEstados`. Dos dispositivos ya no se pisan.
- **v39** — los 25 idiomas al día: 690 claves cada uno, `I18N_VER = 39`.

### ✅ HECHAS después — v40 y v41 (03/08/2026)

- **v40** — la venta de una inversión apuntaba SIEMPRE el cobro entero en Movimientos, y eso
  infla el saldo si la compra nunca se apuntó como gasto (Kevin: compró por 2800, vendió por
  3600, ganó 800, y la app le sumó 3600). Ahora se elige qué apuntar y **"Solo la ganancia" es
  lo que viene marcado**. Además, Herramientas y Hábitos suben al principio de Vistazo.
- **v41** — nueva pestaña **Objetos** dentro de Colecciones (`ObjetosPanel`): reúne las piezas
  de todas las colecciones que tengan fuente de precio real y las trata como una cartera, con
  valor total, variación desde la última actualización, actualización en lote y orden por valor
  o por movimiento.

**Decisión que NO hay que revertir:** el paquete `objetos/` que trajo Kevin incluía un motor que
simula movimiento de precios cada pocos segundos para aparentar cotización en vivo. Se descartó a
propósito. En una app donde se mira dinero real, enseñar movimiento inventado es engañoso. El
precio solo cambia cuando se consulta de verdad. De ese paquete se aprovecharon los **proveedores**
(qué endpoint llamar y qué campo leer), no su arquitectura: asumía Flutter y una lista fija en el
repo, y aquí los objetos los mete el usuario.

### ✅ RESUELTO — el código fuente ya está en el repo
Desde el commit `dcd9be3` el fuente vive en **`fuente/BrosinOS.jsx`** (8256 líneas) y el compilador
en **`fuente/build_pwa.js`**. Antes solo estaba el `index.html` compilado y el fuente vivía en el
ordenador de Kevin: si se perdía esa carpeta, quedaba un bundle de 600 KB imposible de mantener.

**El repo es ahora la fuente de la verdad.** Al tocar el código: edita `fuente/BrosinOS.jsx`,
compílalo, y sube el fuente JUNTO con el `index.html` generado. Si subes solo el compilado, la
siguiente sesión partirá de un fuente viejo y deshará trabajo.

### 🟠 DEUDA CONOCIDA — terminología inconsistente en algunos idiomas
El lote de la v39 introdujo términos que chocan con el glosario anterior: en francés "Mouvements"
donde ya se usaba "Opérations", en alemán "Bewegungen" donde había "Buchungen", en búlgaro
"Движения" donde había "Транзакции". No rompe nada, pero canta. Merece una pasada de repaso.

### 🔴 REGLA NUEVA — traducir en la misma versión, no después
Kevin lo pidió expresamente el 03/08/2026: **cada versión que añada texto visible se publica ya
con sus 25 idiomas**. Dejarlo para luego fue justo lo que creó una deuda de 96 claves.

Receta que funciona (probada en la v39):
1. Sacar las claves nuevas: regex `\btri?\(\s*"..."` sobre el JSX y restar las que ya están en
   `i18n/en.json`. **Ojo:** los textos que se traducen dinámicamente (`tr(f.l)` sobre una tabla
   de etiquetas, como `FUENTES_PRECIO` o `LEYES`) NO los ve el regex; hay que añadirlos a mano.
2. Repartir los 25 idiomas entre varios subagentes que escriban un JSON por idioma **a disco**,
   no por el chat: así las traducciones no pasan por el contexto.
3. Fusionar con el diccionario existente y **validar antes de subir**, abortando si falla:
   mismo juego de claves en los 25, ninguna vacía, y los huecos `{n}` `{d}` `{i}` `{g}` `{p}` `{r}`
   idénticos entre la clave española y su traducción (un hueco perdido pinta texto roto).
4. Subir `I18N_VER` al número de la versión, que es lo que rompe la caché de idiomas del móvil.

### 🟡 Aparcado por Kevin
Probar las notificaciones push reales en el móvil con el "médico de avisos" (`PushDoctor` en Perfil). Cita: *"deja el medico de avisos ya lo probaremos mas tarde"*.

### 🟢 Hoja de ruta (del informe de competencia, `kit_compartir/informe_competencia_innovacion.md`)
Ya hechas: racha + badge (#1), voz multi-acción (#2), temas desbloqueables (#3), brief matinal (#5), mapa de calor, grupos de gastos (#7), cierre de mes (#9).

Pendientes, por orden de recomendación:
1. **#8 Retos y rachas con amigos** — racha conjunta y retos de 21/30 días. Impacto alto, esfuerzo medio, y encaja perfecto sobre la racha y los grupos que ya existen.
2. **#4 Monetización: freemium + plan "Fundador" vitalicio** — al ser PWA se cobra con Stripe sin la comisión de las tiendas. Impacto alto, esfuerzo bajo.
3. **#6 Bandeja de entrada por email** (`tunombre@in.brosinos.com`) y luego WhatsApp. Impacto alto, esfuerzo medio.
4. **#10 Compañero evolutivo (tamagotchi ligero)** — solo después de validar las anteriores. Esfuerzo alto.

---

## PARTE 10 · LO QUE **NO** ESTÁ EN ESTE DOCUMENTO (a propósito)

| Secreto | Dónde vive | Qué hacer en la cuenta nueva |
|---|---|---|
| Token de GitHub (PAT) | `/home/claude/.ghpat` de la sesión antigua | **Generar uno nuevo** (instrucciones en la Parte 0) y borrar el viejo en GitHub |
| API key de Anthropic | Variable `ANTHROPIC_API_KEY` en Cloudflare | Nada: ya está puesta y sigue funcionando |
| Supabase **service key** | Variable `SUPABASE_SERVICE_KEY` en Cloudflare | Nada. **Nunca** pedírsela a Kevin por chat |
| VAPID privada | Variable `VAPID_PRIVATE` en Cloudflare | Nada |
| `TICK_SECRET` | Cloudflare + el SQL del cron en Supabase | Nada |
| Contraseñas de Kevin | Solo él | Nunca pedirlas |

Sí son públicas y ya están incrustadas en `build_pwa.js` (es correcto y seguro): la URL de Supabase, la clave *publishable* y la VAPID *pública*.

---

## RESUMEN EN UNA PÁGINA (si solo lees esto)

- **Editas** `/home/claude/BrosinOS.jsx` → **compilas** con `node build_pwa.js` → **pruebas** con `node test_vNN.js` → **copias** `index.html` + `service-worker.js` (+ `i18n/` si tocaste idiomas) al clon → **commit + push** a `main` → Cloudflare despliega solo → **verificas** el `meta brosin-build` en `origin/main`.
- Sube **siempre los tres números de versión**: `build_pwa.js` (meta + splash), `service-worker.js` (`CACHE`) y, si hay diccionarios nuevos, `I18N_VER`.
- Textos visibles: envuélvelos en `tr("…")`, y `tri("… {n} …", {n})` si llevan huecos. El español es la clave, así que nunca se rompe nada.
- Colores condicionales: **`C.base`**, jamás `C.mode`.
- Scripts en ficheros, nunca `node -e` con comillas raras. Mensajes de commit con `-F fichero`.
- Kevin no toca nada. Tú lo haces todo y se lo cuentas en dos frases.

**Siguiente cosa que hacer: lo que pida Kevin. No hay deuda pendiente.**

*Bro, no te quedes sin.*
