# VERITAS — Univers Azertya

An interactive encyclopedia for the **Azertya** original universe — built as a single self-contained HTML file that opens directly in any browser, no server required.

## What it contains

| Section | Description |
|---|---|
| **Characters** | 69 characters with age, blood type, height, nationality, race, and an interactive map preview |
| **Map** | Full zoomable/pannable map of Azertya |
| **Lore** | World history, the 5 races, zone guide, and threat level bestiary |
| **Principles of Ruth** | 28 principles + 10 racial techniques + 3 forbidden techniques, each with a detail modal |

Features: splash screen, background music, light/dark theme, FR/EN language toggle, character search, scroll reveal animations.

## Output

Running `npm run build` produces a **single file**: `dist/index.html`

- All CSS and JavaScript are inlined — no external dependencies at runtime
- Images, audio, and illustrations are loaded from relative paths (`./images/`, `./RUTH/`, `./audio/`)
- The file can be opened directly by double-clicking it (no local server needed)

## Tech stack

- **Vite** — bundler and dev server
- **TypeScript** — typed source in `src/`
- **vite-plugin-singlefile** — inlines JS + CSS into the HTML at build time
- Vanilla DOM — no framework

## Prerequisites

- [Node.js](https://nodejs.org/) v18+

## Install & build

```bash
npm install
npm run build
```

Open `dist/index.html` directly in your browser.

## Development

```bash
npm run dev
```

Opens `http://localhost:5173` with hot reload.

## Project structure

```
oc/
├── index.html              # Entry point (Vite template)
├── vite.config.ts          # Build config + singlefile plugin
├── tsconfig.json
├── package.json
│
├── src/
│   ├── main.ts             # App entry — wires all modules
│   ├── style.css           # All styles (dark + light theme)
│   ├── characters.ts       # Character grid + modal + map preview
│   ├── principles.ts       # Ruth principles / racial / forbidden cards
│   ├── history.ts          # Lore, races, zones, threat levels
│   ├── detail-modal.ts     # Shared detail modal (principles + zones)
│   ├── map.ts              # Zoom/pan map logic
│   ├── music.ts            # Background music toggle
│   ├── theme.ts            # Dark/light theme toggle
│   ├── i18n.ts             # FR/EN translations
│   ├── tabs.ts             # Tab navigation
│   ├── reveal.ts           # Scroll reveal animation
│   └── data/
│       ├── characters.ts   # 69 characters with full metadata
│       ├── principles.ts   # 28 principles + racial + forbidden data
│       └── lore.ts         # Races, zones, threat levels
│
└── public/
    ├── images/             # Character portraits + map (MAP.png, page.png)
    ├── RUTH/               # Principle illustrations (tarot-style)
    ├── Zones/              # Threat level creature images
    └── audio/              # Background music
```

## Adding character data

Edit `src/data/characters.ts`. Each entry supports:

```ts
{
  name: "CHARACTER NAME",
  image: "/images/CHARACTER NAME.png",
  age: "25",
  bloodType: "A+",
  height: "170",        // cm, shown as "170 cm"
  nationality: "Nahr",  // must match a key in NATMAP for map preview
  race: "Human",
  specialty: "...",     // optional power description
  firstChapter: "1",    // optional chapter number
}
```
