# Human from Stars

**The cosmic origin of your body.**

> *Not a single atom in your body was made on Earth.*

An interactive web page that shows a human silhouette next to the complete
periodic table, highlights the chemical elements that make up the human body,
and colour-codes them by the astronomical event that forged them: the Big Bang,
the CNO cycle of Sun-like stars, supernovae, the collision of two neutron
stars…

Every event has its own CSS animation, its own sound synthesized in real time,
and its place on a 13.8-billion-year timeline.

🇪🇸 [Lee esto en español](./README.md) — Spanish is the project's primary language.

---

## Contents

- [What it does](#what-it-does)
- [Getting started](#getting-started)
- [Docker](#docker)
- [How it works](#how-it-works)
  - [The seven origins](#the-seven-origins)
  - [The silhouette](#the-silhouette)
  - [The animations](#the-animations)
  - [The sound](#the-sound)
  - [The languages](#the-languages)
- [Project structure](#project-structure)
- [Adding or fixing data](#adding-or-fixing-data)
- [Accessibility](#accessibility)
- [Browser support](#browser-support)
- [Deployment](#deployment)
- [Sources](#sources)
- [License](#license)

---

## What it does

| | |
|---|---|
| **Interactive silhouette** | Hover an element and the body regions where it lives light up: bones with calcium, blood with iron, the thyroid with iodine. The heart beats, the lungs breathe, the blood flows. |
| **Complete periodic table** | All 118 elements. The 30 that build your body glow in the colour of their origin; the rest stay in shadow. A filter shows body elements only. |
| **Seven-origin legend** | Each cosmic catastrophe with its colour, its CSS animation, when it happened, how long it lasted and which of your elements came out of it. |
| **Timeline** | The fourteen milestones that had to happen — from the Big Bang to the appearance of human beings — for you to exist. |
| **Original sound** | Ambience, melody and seven effects, all synthesized in the browser. Zero audio files. |
| **Bilingual** | Spanish (primary) and English, switchable on the fly. |

---

## Getting started

Requirements: **Node.js 24** (LTS "Krypton") and **pnpm 11.20**. If you don't
have pnpm, the recommended way is to enable it through corepack, which ships
with Node:

```bash
corepack enable
```

Corepack reads the `packageManager` field in `package.json` and uses exactly
the pnpm version the project is developed with (11.20.0), so there is nothing
to install by hand. There is an `.nvmrc` with the Node version, so with nvm a
plain `nvm use` is enough.

pnpm 11 requires Node 22.13 or newer on its own, so Node 24 clears that
comfortably.

```bash
# 1. Install dependencies
pnpm install

# 2. Start the dev server
pnpm dev             # http://localhost:5173

# 3. Build for production
pnpm build           # emits dist/

# 4. Preview the build
pnpm preview
```

There is nothing else to do: no API keys, no environment variables, no external
assets to fetch.

> **A note on pnpm 11**: for safety, pnpm does not run dependency install
> scripts unless each one is explicitly allowed, and since version 11 finding
> an unapproved one is an **error**, not a warning. This project needs the one
> from `esbuild` (the compiler Vite uses) and it is already allowed in
> `pnpm-workspace.yaml`, so there is nothing to do:
>
> ```yaml
> allowBuilds:
>   esbuild: true
> ```
>
> That file is also why there is no longer a `pnpm` field in `package.json`:
> since pnpm 11 all project settings live in `pnpm-workspace.yaml` and the old
> field is silently ignored.

If you would rather not install anything on your machine, jump straight to
[Docker](#docker).

---

## Docker

The build produces a static site, so the final image carries **no Node at all**:
it is built with pnpm in an intermediate stage and only nginx serving `dist/`
is shipped. The resulting image is around 60 MB instead of 400.

### Production

```bash
# Build and start
docker compose up -d --build      # http://localhost:8080

# Status and logs
docker compose ps
docker compose logs -f web

# Stop
docker compose down
```

Change the port with the `PORT` variable:

```bash
PORT=3000 docker compose up -d
```

Without Compose, with plain Docker:

```bash
docker build -t human-from-stars .
docker run -d -p 8080:80 --name human-from-stars human-from-stars
```

### Developing inside the container

There is a `dev` stage running the Vite server with hot reload. It sits behind
a profile so a plain `docker compose up` won't start it:

```bash
docker compose --profile dev up   # http://localhost:5173
```

The source is mounted from the host, so changes show up instantly.
`node_modules` deliberately stays inside the container: pnpm builds it out of
symlinks into its store, and mounting it from the host would break it.

### Publishing under a subdirectory

If the page won't live at the domain root, Vite needs to know at build time via
the `BASE_PATH` argument:

```bash
docker build --build-arg BASE_PATH=/human/ -t human-from-stars .
```

Or in `docker-compose.yml`, by changing `services.web.build.args.BASE_PATH`.

### What's inside

| File | What it's for |
|---|---|
| `Dockerfile` | Five stages on `node:24-alpine`: `base` (Node + pnpm via corepack), `deps` (cached install), `build` (compilation), `dev` (Vite server) and `production` (nginx). |
| `docker/nginx.conf` | Gzip compression, immutable caching for hashed assets, no caching for HTML, and SPA fallback. |
| `docker/security-headers.conf` | Security headers, in a separate file because nginx does not inherit them into `location` blocks that declare their own. |
| `docker-compose.yml` | A `web` service (production) and a profile-gated `dev` service. |
| `.dockerignore` | Keeps `node_modules`, `dist`, `.git` and other package managers' lockfiles out. |

The `deps` stage is separate on purpose: as long as `package.json` and
`pnpm-lock.yaml` don't change, Docker reuses the layer and installs nothing.
On top of that, `pnpm install` uses a mounted cache (`--mount=type=cache`) for
the pnpm store, so rebuilds don't re-download packages.

The production container ships a `HEALTHCHECK`, so `docker compose ps` shows
whether the page actually responds rather than merely whether the process is
alive.

### Troubleshooting

**The browser shows "Cannot GET /".** That message is **not produced by this
container**: it is Express's default 404. When something is missing, nginx
always answers with its own branded page. If you see it, your browser is
talking to a different process. The response headers give it away instantly:

```bash
curl -sI http://localhost:8080/ | grep -iE "server|x-powered-by"
```

- `Server: nginx` → that's this container.
- `X-Powered-By: Express` → that's another application, and there's your problem.

Nearly always it comes down to opening a different port than the published one.
The authoritative one is whatever the `PORTS` column says:

```bash
docker compose ps        # e.g. 0.0.0.0:8080->80/tcp
docker ps -a             # any stale container lying around?
```

Watch out for one silent detail: **Docker Compose automatically reads a `.env`**
file from the project directory. If yours has `PORT=3000`, the page is published
on 3000 even though you're opening 8080. Same goes for a `PORT` left exported in
your shell.

To reach the container bypassing any proxy or port mapping:

```bash
docker exec -it human-from-stars wget -qO- http://localhost/ | head -5
```

If that returns the HTML, the container is fine and the fault lies upstream.

**The page loads but has no styles or JavaScript.** It is being served from a
subdirectory it wasn't built for. Rebuild with `BASE_PATH`, as explained above.

---

## How it works

### The seven origins

The whole project revolves around one idea: **every chemical element has an
astronomical birth certificate**. The dominant origin assigned to each element
approximately follows the outreach work of
[Jennifer A. Johnson](https://blog.sdss.org/2017/01/09/origin-of-the-elements-in-the-solar-system/)
(Ohio State University, 2017).

| Colour | Event | What it forges | When |
|---|---|---|---|
| 🩵 Cyan | **Big Bang** | Hydrogen, helium, lithium | T + 3 minutes, 13.8 billion years ago |
| 💜 Violet | **Cosmic rays** | Beryllium, boron | Continuously, still today |
| 🟡 Amber | **Dying low-mass stars** | Carbon, nitrogen (CNO cycle and s-process) | 1 to 10 billion years per star |
| 🔴 Red | **Exploding massive stars** | Oxygen, magnesium, silicon, calcium | Collapse in under 1 second |
| ⚪ White | **Exploding white dwarfs** | Iron, nickel, chromium | Detonation in 2 seconds |
| 🩷 Pink | **Merging neutron stars** | Iodine, selenium, gold, uranium (r-process) | Merger in 100 milliseconds |
| 🟢 Green | **Human-made** | Technetium, plutonium, oganesson | Microseconds inside an accelerator |

The data lives in [`src/data/origins.js`](src/data/origins.js), holding each
event's description, colour, moment in history and the text explaining which
part of your body you owe to it.

### The silhouette

[`src/components/BodySilhouette.jsx`](src/components/BodySilhouette.jsx) draws a
human body in SVG out of eleven shapes (head, torso, arms, legs, hands, feet).
Those same shapes are reused three times:

1. as the **fill**, with a dark radial gradient;
2. as a **`clipPath`**, to cut a starfield into the body (ninety twinkling
   stars: you are literally a piece of the universe);
3. as a **glowing outline** when the skin is highlighted.

Thirteen anatomical regions are layered on top — skeleton, blood, muscles,
brain, thyroid, lungs, heart, liver, nerves, teeth, skin, cells and fluids —
which light up in the active element's colour and carry their own animation:
the heart beats in systole and diastole, the lungs inflate every 4 seconds, and
blood and nerves use `stroke-dashoffset` so the signal visibly flows.

### The animations

The seven legend scenes
([`src/components/OriginAnimation.jsx`](src/components/OriginAnimation.jsx) and
[`src/styles/animations.css`](src/styles/animations.css)) are built **entirely
from `<span>` elements, gradients and `@keyframes`**. No canvas, no GIFs, no
libraries:

- **Big Bang** — a singularity that detonates, with three expanding shells of wavefront.
- **Cosmic rays** — four particles streak across, shatter a nucleus, and splinters fly out.
- **CNO cycle** — a breathing Sun with four protons orbiting, entering one at a time.
- **Supernova** — the star swells, collapses to a sixth of its size and rebounds as a shock wave.
- **Type Ia** — a companion feeds a flowing stream of matter until the white dwarf detonates and vanishes.
- **Kilonova** — two neutron stars spiral in (with gravitational waves), collide, and eject heavy metals.
- **Accelerator** — two counter-rotating beams collide and create an atom that promptly decays.

All of them share a 4-second cycle and are **sized in `em`**, which lets the
same scene serve both the legend (`font-size: 16px`) and the miniature inside
the element detail card (`font-size: 5.4px`) without writing anything twice.

### The sound

[`src/audio/AudioEngine.js`](src/audio/AudioEngine.js) is a complete synthesizer
written by hand with the Web Audio API. **No audio file is ever loaded**: no
samples, no MP3s, no sound libraries. Everything is computed in the browser,
sample by sample.

- **Reverb** — a procedurally generated impulse response (noise with exponential decay), not sampled from any real room.
- **Ambience** — a D-minor drone: a 36.7 Hz sub, two detuned saws and a low-pass filter breathing under a 0.045 Hz LFO.
- **Melody** — an original sixteen-note motif over an extended D minor pentatonic scale, played on three-partial bells spaced a variable 2.4–4 s apart, so it never repeats exactly.
- **The table as an instrument** — hovering a tile plays a note whose pitch rises with the atomic number: you can play the periodic table.
- **Seven effects**, one per event. The kilonova reproduces the real *chirp* of a neutron-star inspiral: frequency and volume climb until the moment of merger, exactly as in the GW170817 gravitational-wave signal.

Sound **starts muted** and is only enabled by an explicit gesture (the "Begin
the journey" button or the header toggle), as browsers require.

### The languages

**Spanish is the primary and default language.** The resolution cascade lives in
[`src/i18n/LanguageContext.jsx`](src/i18n/LanguageContext.jsx):

```
?lang=en in the URL   →   preference saved in localStorage   →   Spanish
```

Browser language is deliberately not sniffed: the page opens in Spanish unless
someone asks for something else. Switching language updates the `<html lang>`
attribute, the `<title>`, the meta description and the `?lang=` URL parameter,
so any link can be shared in the language it was read in.

UI copy lives in [`src/i18n/translations.js`](src/i18n/translations.js); content
copy (elements, origins, timeline) sits next to its own data, with the `es` and
`en` keys side by side so it is impossible to translate one and forget the
other.

---

## Project structure

```
Human-from-Stars/
├── index.html                 Root document (inline SVG favicon)
├── vite.config.js             Vite config (configurable base path)
├── package.json               Scripts and pnpm version (packageManager)
├── pnpm-lock.yaml             pnpm lockfile
├── pnpm-workspace.yaml        pnpm settings (allowed build scripts)
├── .nvmrc                     Node version (24)
├── Dockerfile                 Multi-stage image: pnpm builds, nginx serves
├── docker-compose.yml         Production and development services
├── .dockerignore
├── docker/
│   ├── nginx.conf             Compression, caching and SPA fallback
│   └── security-headers.conf  Reusable security headers
├── README.md                  Spanish documentation (primary)
├── README.en.md               This document
└── src/
    ├── main.jsx               Entry point: providers + styles
    ├── App.jsx                Page composition and shared state
    ├── data/
    │   ├── elements.js        All 118 elements: name, position and origin
    │   ├── bodyElements.js    The 30 body ones: where they live, what they do
    │   └── origins.js         The seven events and the timeline
    ├── components/
    │   ├── Starfield.jsx      Canvas sky: parallax and shooting stars
    │   ├── Header.jsx         Navigation, language and sound
    │   ├── PeriodicTable.jsx  18-column grid of element tiles
    │   ├── BodySilhouette.jsx SVG body and anatomical regions
    │   ├── ElementDetail.jsx  Selected element card
    │   ├── OriginAnimation.jsx The seven CSS scenes
    │   ├── Legend.jsx         Colour and event legend
    │   └── Timeline.jsx       Timeline with progressive reveal
    ├── audio/
    │   ├── AudioEngine.js     Synthesizer (Web Audio API)
    │   └── useAudio.js        React context for the audio engine
    ├── i18n/
    │   ├── translations.js    UI copy (es / en)
    │   └── LanguageContext.jsx Language resolution and switching
    └── styles/
        ├── base.css           Variables, typography, starfield background
        ├── layout.css         Header, hero, sections, legend, footer
        ├── table.css          Periodic table and detail card
        ├── body.css           Silhouette and anatomical regions
        └── animations.css     The seven cosmic events in CSS
```

---

## Adding or fixing data

**Change an element's origin** — edit its row in `src/data/elements.js`. The
format is `[Z, symbol, name_es, name_en, column, row, origin]`:

```js
[26, 'Fe', 'Hierro', 'Iron', 8, 4, 'white_dwarfs'],
```

**Add a body element** — add an entry to `src/data/bodyElements.js` with its
mass percentage, the amount in a 70 kg adult, the regions it occupies and its
description in both languages. It will light up in the table and appear in its
origin's legend automatically.

**Add a cosmic event** — add an entry to `ORIGINS` (colour and copy), include it
in `ORIGIN_ORDER`, create its scene in `SCENES` inside `OriginAnimation.jsx`,
its `@keyframes` in `animations.css` and its `_sfxWhatever()` method in
`AudioEngine.js`.

---

## Accessibility

- Everything is keyboard navigable; table tiles are real `<button>` elements
  with `aria-pressed` and a descriptive `title`.
- A **"Skip to content"** link opens the document.
- The silhouette carries `role="img"` and a translated label; the detail card is
  an `aria-live` region that announces the selected element.
- Animations are decorative and marked `aria-hidden`.
- **`prefers-reduced-motion`**: when the system asks for it, the sky, the
  animations and the progressive reveals stop, and the timeline is shown in full
  at once.
- Sound never plays without explicit permission.

---

## Browser support

Modern browsers with Web Audio API, `color-mix()` and `backdrop-filter`:
Chrome/Edge 111+, Firefox 113+, Safari 16.4+.

If the browser refuses to create an `AudioContext`, the page works exactly the
same — it just stays silent.

---

## Deployment

`pnpm build` produces a fully static `dist/` folder: serve it from any host with
no configuration.

To publish under a subdirectory (GitHub Pages, for instance):

```bash
BASE_PATH=/human-from-stars/ pnpm build
```

And if you'd rather deploy the container than loose files, see the
[Docker](#docker) section.

---

## Sources

- Johnson, J. A. (2017). *Origin of the Elements in the Solar System*, SDSS Blog / Ohio State University.
- Elemental composition of the human body: reference values for a 70 kg adult (Emsley, *Nature's Building Blocks*; ICRP Publication 23).
- Abbott, B. P. et al. (2017). *GW170817: Observation of Gravitational Waves from a Binary Neutron Star Inspiral*, Physical Review Letters 119, 161101.

Body mass percentages and amounts are approximate reference values; they vary
with age, sex, diet and individual.

---

## License

MIT. The code, the animations and the music are original to this project.
