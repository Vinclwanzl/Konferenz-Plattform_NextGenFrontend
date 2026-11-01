# FrontendNow

FrontendNow is a Nuxt 4 and Vue 3 conference program for the FrontendNow event.

## Requirements

Install a current Node.js release supported by Nuxt 4 and npm.

## Run locally

```bash
npm install
npm run dev
```

Nuxt prints the local URL when the development server starts.

## Build

```bash
npm run build
```

## Routes

- `/` - Conference sessions with combined filters (search, track, day, level)
- `/speakers` - All speakers
- `/speakers/[id]` - Speaker profile with their sessions
- `/sessions/[id]` - Session detail page (in progress — part C)
- `/user-program` - Saved personal program

## Source structure

- `docs/schritt1/` - Planning and architecture deliverables
- `tokens/tokens.css` - Design tokens
- `src/app.vue` - Nuxt application entry
- `src/pages/` - File-based routes
- `src/components/base/` - Reusable UI components
- `src/components/features/` - Conference features
- `src/components/layout/` - Shared page layout
- `src/composables/` - Shared reactive state and logic
- `src/assets/conference-data.json` - Conference dataset

## Rendering

The app is statically generated (SSG) via `npm run generate`: the conference
dataset is a static JSON file checked into the build, so all session and
speaker pages are prerendered at build time. Filtering on the overview runs
client-side (CSR), because filter state is per-user interaction state that
only exists in the browser. The personal program is CSR-only and persists
in localStorage. Full reasoning per application part:
`docs/schritt2/01-rendering-strategie-adr.md`.