# Aptitude Nexus

A fast, browser-based math and aptitude quiz game. Pick a category and a game
mode, answer against a countdown, build a streak, then review what you got
wrong. Includes a scientific calculator for working problems out by hand.

## Game modes

- **Practice** — answer at your own pace, no run-ending pressure. Each question
  still has a 30s countdown.
- **Sprint** — 60 seconds on the clock; answer as many as you can.
- **Survival** — 3 lives; every wrong answer (or timeout) costs one. Run ends at
  zero lives.

All modes track a live **streak counter**, a per-question countdown, and end on
a **review-wrong-answers** screen with explanations.

## Categories

Questions span seven categories, each with easy / medium / hard tiers:

`Mathematics` · `Arithmetic` · `Algebra` · `Logic & Series` · `Speed Math` ·
`Logic` · `Verbal` — plus a **Mixed** option that samples across all of them.

## Tech stack

- React 18 + Vite 6
- Tailwind CSS 4
- Zustand (state, with `persist` to localStorage)
- Framer Motion (animation)
- mathjs (calculator)
- Vitest + Testing Library (tests)

## Run, build, test

```bash
npm install        # install dependencies
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # production build to dist/
npm run preview    # preview the production build
npm test           # run the test suite once
npm run test:watch # run tests in watch mode
npx tsc --noEmit   # type-check
```

## Project layout

```
src/
  components/
    calculator/      # mathjs-backed scientific calculator
    test/            # TestEngine (quiz runner) + ReviewView
    Dashboard.tsx    # mode + category selection, history
    ResultsView.tsx  # post-test results
  data/questions.ts  # question bank
  stores/aptiStore.ts# Zustand store (quiz state + stats)
  utils/scoring.ts   # pure scoring / streak / lives logic (unit-tested)
  pages/             # routed pages (Game, Stats, Achievements)
  router/            # router with React.lazy code-splitting
  types/apti.ts      # shared types
```

## Architecture notes

- Routes are lazy-loaded with `React.lazy` + `Suspense`, and heavy vendor
  libraries (`mathjs`, `framer-motion`, React) are split into their own chunks
  via Vite `manualChunks`, so the initial bundle stays small.
- Game logic lives in pure functions in `src/utils/scoring.ts` (scoring, answer
  validation, streak, lives) and is covered directly by unit tests; the store
  composes those functions.

## Testing

Tests run on Vitest with a jsdom environment:

- `src/utils/scoring.test.ts` — scoring, answer validation, streak, lives, result building
- `src/stores/aptiStore.test.ts` — start/answer/finish flow, survival lives, stats
- `src/data/questions.test.ts` — question-bank integrity (unique ids, valid answer indices, category/difficulty coverage)

## Deploy

The build is a fully static SPA in `dist/` (`base: './'`), deployed on Vercel:

```bash
npm run build
# then serve dist/ — e.g. on Vercel: framework "Vite", output "dist"
```

For client-side routing on static hosts, configure a catch-all rewrite to
`index.html`.

## License

MIT
