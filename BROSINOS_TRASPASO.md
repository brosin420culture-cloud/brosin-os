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
| **v41** | **`5b3a4c8` + `4f4bcf3`** | **Sección Objetos: cartera de lo que cotiza de verdad. 711 claves, I18N_VER = 41** |
| **v42** | **subida web** | **Cristal líquido (Liquid Glass) en toda la app: `glassSurface()` y fondo vivo detrás del marco. 711 claves, I18N_VER = 41** |
| **v43** | **subida web** | **El juego de la vida: avatar de 1000 puntos, 9 áreas editables con XP y niveles, Brosin Coins, malos hábitos, tiendita y resurrección ganando 100 € de verdad. 773 claves, I18N_VER = 43** |
| **v44** | **subida web** | **Cuatro pestañas en vez de cinco, Dinero en tres grupos, y los hábitos rehechos: banco por área, misión de cinco al día, pruebas y castigo por lo que dejas. 826 claves, I18N_VER = 44** |
| **v45** | **subida web** | **El Juego con pestaña propia y radar de áreas, temporadas de 30/90 días, clan con clasificación por códigos, y "hoy" pasa a hora local. 885 claves, I18N_VER = 45** |
| **v46** | **subida web** | **Las fotos de prueba salen a IndexedDB, visor de pruebas, 12 logros que pagan monedas y celebración al subir de nivel. 924 claves, I18N_VER = 46** |
| **v47** | **subida web** | **Historial del juego con el motivo de cada movimiento, análisis por día de la semana y respuesta al tacto en toda la app. 947 claves, I18N_VER = 47** |
| **v48** | **subida web** | **Proyectos: gastos, ventas, punto de equilibrio y beneficio real por semana y mes. Banco de pruebas y limpieza de terminología. 1009 claves, I18N_VER = 48** |
| **v49** | **subida web** | **Aviso de la misión del día a la hora que elijas, y la insignia del icono cuenta la misión y no todo el banco. 1014 claves, I18N_VER = 49** ← actual |

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

---

## v43 — El juego de la vida (04/08/2026)

Kevin lo pidió así: un RPG de su propia vida, **pero enfocado en el dinero**, no
en el deporte. Está en **Cerebro → Avatar**.

**Las piezas**

- `AREAS_DEFECTO` — sus nueve áreas (finanzas primero), **editables desde la app**
  (`AreasEditor`): renombrar, cambiar el icono, quitar y añadir. La clave interna
  (`k`) no se toca nunca, para que los hábitos ya creados sigan apuntando a su sitio.
- `nivelDeXp(xp)` — cada nivel cuesta 100 XP más que el anterior (100, 200, 300…).
  Sube rápido al principio, que es cuando engancha.
- **Los premios salen SOLO de los hábitos** (él lo pidió expresamente). Cada hábito
  tiene área y dificultad (Fácil ×1, Normal ×2, Duro ×3) → +10/20/30 XP,
  +5/10/15 monedas y +10/20/30 de vida por día cumplido.
- **Malos hábitos** (`state.malos`): tú defines lo que te quita y cuánto. Botón
  "He caído" → resta esa vida. Si llegas a 0 y tienes vida extra, se gasta una.
- **La tiendita** (`state.tienda`): el mismo capricho, pero pagado con monedas y
  SIN perder vida. Ese es el trato que hace que el sistema no sea un látigo.
- **Muerte y resurrección**: a 0 puntos el avatar cae. Para volver hay que **ganar
  100 € de verdad en 48 h y apuntarlos en Movimientos** — `ingresosDesde()` los suma
  solo desde el momento de la muerte, así que no valen ingresos viejos.

**Dos trampas que costaron encontrar**

1. **Los premios se pisaban entre sí.** Si se marcaban tres hábitos seguidos, cada
   uno leía el mismo `state` viejo y solo contaba el último. Por eso el reducer
   tiene `case "premio"`: va por **incrementos**, no por valores absolutos, y cada
   dispatch lee el estado ya actualizado por el anterior.
2. **Desmarcar te robaba vida.** Estando al máximo, marcar daba +0 de vida (tope)
   pero desmarcar restaba la cura entera → te quedabas con menos que al empezar.
   Ahora el reducer **apunta la cura que aplicó de verdad** (`rpg.curas`) y al
   deshacer devuelve exactamente eso. Verificado con los dos casos: con la vida a
   970 y con la vida al tope.

**Probado de punta a punta** antes de publicar (en un iframe, con la app real):
crear hábito → marcar/desmarcar tres veces → morir con un mal hábito de 1000 →
apuntar 100 € → revivir → comprar en la tienda → renombrar un área. Sin errores
en consola.

**Traducciones**: 62 claves nuevas × 25 idiomas, **en la misma versión** (regla de
Kevin). El diccionario pasa de 711 a 773 claves. `I18N_VER = 43`.

---

## v44 — Menos ruido y una misión al día (04/08/2026)

Kevin lo dijo tal cual: *"lo veo desorganizado… la app en si la veo un poco
caotica muchas pestañas"*. Y tenía razón: había 5 pestañas abajo, pero Dinero
escondía **nueve** sub-pestañas todas del mismo tamaño. Referencia que él pasó:
bromos.app, del que salen la misión diaria, las pruebas y el castigo.

**La navegación**

- Abajo quedan **cuatro**: Hoy · Agenda · Dinero · Vida. Colección desaparece.
- Dinero pasa a **tres grupos** (`GRUPOS_DINERO`): Día a día, Patrimonio y
  Con otros. La hoja activa sigue siendo la misma variable `tab`, así que
  ningún panel de abajo se enteró del cambio: cero riesgo de romper nada.
- Colecciones, Objetos, Empresas y Fiados se mudan a Dinero. `CollectionScreen`
  acepta ahora `soloTab` y se empotra sin su título ni sus pestañas — se reusa
  entera, sin duplicar una línea.
- Herramientas: 4 a la vista, las otras 4 tras "Ver todas".

**Los hábitos, rehechos**

- **Banco por área**: todos los que quieras, agrupados por tus nueve áreas.
- **La misión de hoy**: `MISION_TAM = 5`. `proponerMision()` elige repartiendo
  entre áreas y priorizando lo que llevas más tiempo sin tocar; con la estrella
  los cambias tú. Se guarda en `rpg.mision = {d, ids, cerrado}`.
- **Pruebas** (`PRUEBAS`): foto con hora, texto de 20 caracteres o un número.
  La foto se reduce a 260 px y JPEG 0.55 antes de guardarse: a tamaño real,
  cinco fotos diarias llenan el almacén en una semana y la app deja de guardar.
- **El castigo**: `CASTIGO_POR_FALLO = 20` por cada uno de los cinco sin marcar.
  `cierreDelDia()` pasa cuenta la primera vez que abres la app al día siguiente:
  sin temporizadores, que es justo cuando te enteras.
- **Diario** (`state.diario`), una nota por día, historial completo y días
  pasados editables. **Reglamento** de seis reglas dentro del Avatar.

**Dos cosas aprendidas**

1. **Cristal dentro de cristal se lava.** Puse `settingRow` (que es
   `glassSurface`) dentro de una `card` (que también lo es) y la fila sin marcar
   salía casi BLANCA con la letra gris encima: ilegible. Es la regla 2 y la 7 del
   LiquidGlassKit. Arreglado con `filaDentro()`: **pintura, no desenfoque**. Si
   vuelves a meter una fila dentro de un panel, usa esa y no `settingRow`.
2. **Al probar en el iframe, mata el iframe ANTES de tocar localStorage.** El
   flush de `pagehide` que añadimos en la v34 escribe el estado viejo encima de
   lo que acabas de falsear, y parece que el código no funciona cuando sí lo
   hace. Me costó una vuelta entera.

**Probado**: misión marcar/desmarcar, prueba de texto, tres grupos de Dinero con
Colecciones dentro, banco por área con estrella, reglamento, diario, y el cierre
del día con tres fallos → 1000 a 940 de vida. Sin errores en consola.

**Traducciones**: 53 claves nuevas × 25 idiomas, en la misma versión. 773 → 826.

**Pendiente** (lo que Kevin pidió y aún no está): temporadas con reinicio, y la
capa social (clanes, clasificación, bote). Ojo con el bote: **con dinero real es
juego de azar** y necesita licencia en España. Va con Brosin Coins y la pregunta
queda para el gestor.

---

## v45 — El Juego sale a la barra (05/08/2026)

Kevin: *"el apartado nuevo de habitos puntos y demas lo quiero separado abajo
tmb como una pestaña unica y que sea mas parecido a bromos.app con el pentagono
diciendo que habilidades destancan cuales no"*.

**Aviso para el que venga detrás**: la inspiración es bromos.app (misión diaria,
radar de áreas, temporadas, clan), pero el código y los textos son nuestros. No
se copió nada literal, y es a propósito: esta app se va a publicar y a cobrar.

**Lo nuevo**

- **Pestaña Juego** abajo (5 en total: Hoy · Agenda · Dinero · Juego · Vida).
  Cerebro se queda con Objetivos y Notas; hábitos, avatar y retos se mudan.
- **`RadarAreas`**: el pentágono. SVG a pelo, sin librerías — cuatro fórmulas de
  trigonometría. Tiene tantos lados como áreas tengas, así que si añades o
  quitas una se redibuja solo. Suelo del 12 % para que un área a cero se siga
  viendo. Debajo, "DESTACA" y "TE PIDE ATENCIÓN" con la más fuerte y la más floja.
- **`nivelGlobal()`**: la suma de todo el XP, que es el número de la cabecera.
- **Temporadas** (`state.temporadas`): bloques de 30 o 90 días. Al cerrarlas se
  guarda nivel, XP y monedas del final. **El XP no se borra**: lo aprendido se
  queda, solo empieza otra cuenta.
- **Clan** (`state.clanes`): clasificación entre amigos **sin servidor**. Cada uno
  genera su CARTA (`encodeShare({kind:"brosin-carta"})`) y la pasa por WhatsApp;
  al pegarla entra en la tabla. Mismo truco que los Grupos de gastos, y con una
  ventaja seria: los datos de sus amigos no viven en ningún servidor nuestro.
- **El bote va en Brosin Coins, NUNCA en euros.** Un bote con dinero real es
  juego de azar en España y necesita licencia. Está anotado para el gestor.

**Un fallo de fechas que llevaba ahí desde el principio**

`todayISO()` usaba `toISOString()`, o sea UTC, mientras la cabecera pintaba la
fecha LOCAL. En España, entre las 00:00 y las 02:00, "hoy" seguía siendo ayer:
marcabas un hábito a la una de la mañana y se apuntaba en el día anterior, la
misión aparecía ya cumplida y el cierre del día se equivocaba de fecha. Se pilló
de pura casualidad probando pasada la medianoche: la misión salía 3/3 recién
estrenado el día. Ahora `todayISO()` va en hora local. Si algún día metes otra
función de fechas, que use la local también.

**Probado**: radar con las nueve áreas, temporada de 90 días creada y su ficha,
clan creado, carta propia generada, carta de un amigo pegada y clasificación
ordenada bien (Javi Nv 3 por delante de Kevin Nv 1). Sin errores en consola.

**Traducciones**: 59 claves nuevas × 25 idiomas, en la misma versión. 826 → 885.

---

## v46 — Quitar una bomba de relojería (05/08/2026)

**Lo importante de esta versión no se ve.** En la v44 metí las pruebas con foto
guardándolas dentro del estado, o sea en localStorage, junto a TODOS los datos
del usuario. Ese cajón son unos 5 MB. A ~25 KB por foto y dos hábitos con foto
al día, se llenaba en **mes y medio** — y al llenarse la app deja de guardar.
Era un fallo mío con fecha de caducidad puesta.

**El arreglo**: las fotos viven ahora en **IndexedDB** (`FOTO_DB`), que aguanta
cientos de MB y va aparte. En el estado solo queda `imgId`. Añadidos:

- `fotoGuardar/fotoLeer/fotoBorrar` y `fotosPodar(idsVivos)`, que borra las fotos
  que ya no apunta ninguna prueba viva (si no, borrar una prueba dejaba la foto
  huérfana ocupando sitio para siempre).
- Migración automática al arrancar: las pruebas con `img` dentro del estado se
  pasan a IndexedDB y se limpia el campo. Nadie pierde nada.
- `VerPrueba` acepta las dos formas, por si la migración no llegó a correr.

**Regla para el futuro**: en localStorage van datos, NUNCA binarios. Si algún día
metes audio, adjuntos o lo que sea, mismo camino.

**Y un agujero que tenía abierto desde la v44**: las pruebas se guardaban pero no
se veían en ninguna pantalla, o sea que no servían para nada. Ahora en la misión,
los hábitos cumplidos con prueba llevan un botón que la abre con su hora exacta.

**Lo demás (pulido del juego)**

- **12 logros** (`LOGROS`) que pagan Brosin Coins. Cada uno es una función `ok(state)`
  que mira el estado: **nada de contadores que haya que mantener a mano**, así no se
  pueden desincronizar. Pestaña Logros con anillo de progreso.
- **Celebración al subir de nivel** con seis frases que rotan. El nivel ya visto se
  guarda en `rpg.nivelVisto` (en el estado, no en una ref) para que no se celebre
  dos veces al recargar.

**AVISO GORDO PARA EL QUE VENGA DETRÁS**

Durante esta versión `mcp__claude-in-chrome__file_upload` se rompió: rechaza las
rutas largas de la carpeta de sesión (error de validación diciendo que `paths` es
undefined). Con rutas cortas funciona. Si te pasa, **no pierdas el tiempo pidiendo
reinicios**: el camino que funcionó fue

1. `fetch` del `fuente/BrosinOS.jsx` publicado desde raw.githubusercontent,
2. aplicar los cambios en el navegador con reemplazos de texto verificados uno a uno,
3. compilar ahí mismo y publicar por DataTransfer (que no usa file_upload).

Por eso **el repo es la fuente de verdad, no el disco local**: la v46 se construyó
sobre lo publicado. Si editas en local, publica antes de seguir.

**Probado**: marcar con prueba de texto y volver a abrirla desde la misión, subida a
nivel 2 celebrada, 3 logros desbloqueados y 145 monedas pagadas. Sin errores.

**Traducciones**: 39 claves nuevas × 25 idiomas. 885 → 924.

**Pendiente**: el aviso de la misión del día a una hora elegida.

---

## v47 — Que el juego cuente lo que pasó (10/08/2026)

Kevin: *"deberia quedar registro de cuando compre un capricho o cuando perdi
puntos de vida y por q… asi se que dias flojeo mas y cuales soy mas productivo"*.

**El registro (`state.registro`)**

Lo importante es DÓNDE se escribe: **solo en el reducer, en `case "premio"`**.
Cualquier via que gane o pierda vida o monedas pasa por ahi y queda apuntada
sola. Es la unica forma de que el historial no mienta — si lo escribiera cada
pantalla por su cuenta, el dia que alguien anada una via nueva se le olvidaria.

Por eso en esta version se reencaminaron por `premio` cosas que iban por libre:

- **La tienda**: `comprar()` ya no hace `patch({coins})`, dispara `premio` con
  monedas en negativo y su nota.
- **Los malos habitos**: `caer()` igual, con la vida en negativo.
- **Revivir**: la vida se devuelve por `premio` para que quede el rastro.

Cada entrada lleva `{tipo, texto, hp, coins, xp, area, at, dia}`. Techo de 500
entradas: el historial informa, no es un archivo eterno.

**El analisis por dia de la semana (`porDiaSemana`)**

Sale del registro real. Nota de cada dia = (buenos − malos) / dias con datos.
El detalle que importa: **un dia sin datos no puntua**. Sin eso, el domingo que
aun no ha llegado saldria como "el peor dia" y seria mentira.

Se pinta con barras verdes/rojas, el mejor y el peor resaltados con glow.

**Pulido (`CSS_TACTO`)**

Todo lo pulsable se hunde a 0.968 al tocarlo. Se anima `transform`, que va en la
GPU; **nunca el desenfoque** (regla del cristal, ver v44). Respeta
`prefers-reduced-motion`. Y las pestanas del Juego entran con `.bentra`.
Es un detalle tonto que es justo lo que separa una app de una web.

**Cuidado al probar**: si siembras datos falsos para ver el grafico, ojo con los
timestamps. Yo sume 9 h a una fecha de las 21:26 y se me fueron todos al dia
siguiente: el grafico salia desplazado y parecia un bug del codigo cuando el
error estaba en la prueba.

**Traducciones**: 23 claves nuevas × 25 idiomas. 924 → 947.

**Pendiente**: el aviso de la mision del dia a una hora elegida.

---

## v48 — Saber si un negocio te paga (28/08/2026)

Kevin se compró una impresora 3D y empezó a vender. Lo intentó apuntar en
Inversiones y no cuadraba, con razón: Inversiones es comprar algo y venderlo
entero más tarde. Un negocio es otra cosa — gastos y ventas que se repiten.

**Dinero › 🛠️ Proyectos.** Metes la inversión y los gastos, defines lo que
vendes con su precio y su coste, y sabes cuánto te falta para cubrir gastos y
cuánto ganas de verdad cada semana y cada mes.

### LA REGLA QUE NO SE TOCA

Un gasto o una venta de un proyecto **NO es una copia de un movimiento, ES un
movimiento** (`state.tx`) con el campo `proj`. Solo existe una copia del dinero.
Por eso el balance no se puede inflar, borrar el movimiento lo quita del
proyecto, y editarlo lo cambia en los dos sitios.

Si algún día te tienta guardar los gastos dentro del objeto proyecto: **no lo
hagas**. Ese fue exactamente el fallo de las inversiones en la v36, cuando una
venta de 3.600 € sumaba 3.600 en vez de los 800 de ganancia.

### El punto de equilibrio

- Los gastos se separan en `inversion` (la máquina, una vez) y `recurrente`
  (material, luz). Importa: lo recurrente mueve el objetivo hacia arriba cada mes.
- `faltanUnidades()` usa el **margen** (precio − coste), no el precio. El material
  de esas unidades futuras también lo vas a pagar; con el precio saldría un
  número optimista, que es lo último que quieres en una app de dinero.

### Banco de pruebas — `pruebas.html`

La app llevaba 48 versiones sin una sola prueba automática, y los dos fallos
gordos de esta semana (fechas en UTC, fotos llenando el almacén) se encontraron
de pura casualidad. Ya no.

Abre **https://brosinos.com/pruebas** antes de publicar cualquier versión.
Se descarga `fuente/BrosinOS.jsx`, lo compila en el navegador y ejecuta 29
comprobaciones sobre el código de verdad. **Cada prueba nació de un fallo real.**

El truco para probar un fichero que no exporta nada: como todo vive en el mismo
ámbito del módulo, se le añade al final `window.__T = { ...las funciones... }`.
Si añades una función pura que merezca prueba, métela en esa lista.

**Si una prueba falla, no la borres: pregúntate por qué falla.** Y si escribes
una nueva, valídala contra el código antes de fiarte — a mí una me falló y el
error estaba en la prueba (usé fechas de enero y las lápidas se podan a los 120
días). Una prueba mal escrita es peor que no tener ninguna.

### Terminología unificada (deuda de la v39, saldada)

Como las traducciones se hicieron en tandas, el mismo concepto tenía dos nombres
dentro del mismo idioma: en francés "Mouvements" y "Opérations", en alemán
"Bewegungen" y "Buchungen", en búlgaro "Движения" y "Транзакции"…

Se revisaron los 25 y se corrigieron **21**. Criterio: **manda el término que se
usa como nombre de pestaña**, porque es el que fija el vocabulario del usuario.
Ya estaban bien en, et, lt y ga.

Ojo con dos colisiones que se resolvieron y conviene no deshacer:
- **"Inversión"** significa *Investment* en la sección financiera. Para el coste
  único de un proyecto se creó la clave aparte **"Inversión inicial"**.
- **"Vida"** es a la vez la pestaña personal y los puntos de vida del juego. Son
  dos traducciones distintas a propósito en los 25 idiomas.

**Traducciones**: 64 claves nuevas × 25 idiomas. 947 → 1009.

**Pendiente**: el aviso de la misión del día a una hora elegida.

---

## v49 — El aviso de la misión (28/08/2026)

Última tarea que quedaba abierta del juego. En **Juego › Misión**, debajo de los
cinco del día: un interruptor y una hora.

**Tres reglas de cortesía**, y son deliberadas: **una vez al día** (la marca vive
en `misionNagRef`), **solo si te queda algo** por marcar, y **nunca antes de la
hora que elijas**. Avisar de lo que ya has hecho es ruido, y el ruido se acaba
silenciando — y una app silenciada no sirve para nada.

El ajuste vive **donde se ve la misión, no escondido en Ajustes**: el sitio
natural para decidir si quieres que te recuerden algo es justo donde ves ese algo.

Va en su propio `useEffect` con su intervalo, sin tocar el planificador de
eventos que ya existía. Duplica un temporizador, sí, pero a cambio no puede
romper los avisos de agenda, que llevan versiones funcionando.

**Y un arreglo pequeño que importa**: la insignia del icono contaba TODOS los
hábitos pendientes del banco. Ahora cuenta solo los de la misión, que es lo que
la app te pide de verdad. Con veinte hábitos en el banco, un "20" en el icono no
informa: agobia.

### Dos trampas de esta sesión, para quien venga detrás

1. **No pulses "Commit changes" en GitHub hasta que los ficheros hayan terminado
   de subir.** Le di con "Uploading 23 of 25" en pantalla y no se comiteó nada —
   silenciosamente. Espera a que desaparezca ese texto, no a un tiempo fijo.
2. **Al probar en el iframe, mata el iframe ANTES de tocar localStorage.** Está
   escrito en la v47 y volví a caer: borré el almacén, luego quité el iframe, y su
   `pagehide` lo restauró encima. Me pasé un buen rato persiguiendo un bug de
   bienvenida que no existía: la pantalla de bienvenida SÍ funciona, yo leía solo
   los primeros caracteres de la página y veía el inicio que hay detrás.

**Traducciones**: 5 claves nuevas × 25 idiomas. 1009 → 1014.

**No queda nada abierto del juego.** Lo siguiente, según el propio HQ, no es
añadir: es que dos personas lo usen siete días seguidos.
