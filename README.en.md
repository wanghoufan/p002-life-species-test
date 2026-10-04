# Life Species

> A mobile-first personality quiz: answer 24 questions and find out which "life species" you are. This repository also contains the **final development prompt v1.3** and all assets used to have an AI coding platform build the product.

[简体中文](./README.md) | English

**Live site**: https://p002-life-species-test.vercel.app

The whole flow works right now (quiz → result → export a share image), running in [demo mode](#demo-mode-no-database-required) when no database is configured; only the species distribution view and permanent links other people can open need a backend database — see [Environment variables](#environment-variables).

![Homepage preview](./assets/homepage-preview.png)

---

## What this is

Life Species is a cartoon-animal personality universe. After 24 everyday-scenario questions, a fixed scoring algorithm derives **1 primary species + 2 secondary species** and issues a permanent share link.

The repository has two roles:

1. **A runnable website** — a complete Next.js 16 + Supabase implementation under `src/`, startable with one command.
2. **A delivery prompt package** — `docs/pm/life_species_coze_prompt_v1_3_FINAL.md` is the final development prompt written for the COZE coding platform. It specifies the questions, dimensions, scoring algorithm, database shape and visual direction, and is the single source of truth for requirements.

Who it suits: people who want to take the quiz; people who want to rebuild the product from the prompt; people looking for a complete "prompt → working web product" sample.

## What you can do

- **Answer 24 questions**: one question per screen, about 3–5 minutes, with editable progress dots at the top.
- **Get a stable result**: 24 species across 18 hidden dimensions, scored by `life_species_calibrated_scorer_v1.mjs` — the same answers always produce the same result, with no language model improvising the verdict.
- **Share a permanent link**: result URLs look like `/r/{share_code}` and show the same result to anyone.
- **Save an image**: the result page renders a share card you can save to your photo library.
- **Rate your result**: the result page offers four accuracy ratings (Not at all → Spot on). Note that only the in-page selection works today — `POST /api/runs/{runId}/feedback` exists but the frontend does not call it yet, so ratings are not stored.
- **Browse the distribution**: a modal on the homepage shows how the population splits across species.
- **Switch language**: "中文 / English" in the top-right corner, defaulting to your browser language. See [Languages](#languages).
- **See a result without a database**: if the database is unavailable at submit time, the app automatically falls back to an on-device path — the same official scorer computes your main and side species on the spot, the result page renders normally and can still export a share image, but nothing is stored, the result is gone when you close the tab, and there is no permanent link. The result page shows a demo-mode notice. See [Demo mode](#demo-mode-no-database-required).

## Quick start

Requirements: Node.js 24 (the version declared in `.coze`; verified working on Node 24.19) and pnpm ≥ 9 (a `preinstall` hook rejects npm).

```bash
pnpm install
pnpm dev
```

Open http://localhost:5000 . Everything works without a database: homepage, all 24 questions, the result and the exported share image (via [demo mode](#demo-mode-no-database-required)); only the species distribution view is unavailable. To get permanent links other people can open plus the distribution view, configure Supabase as described below.

Start in production mode:

```bash
pnpm build
COZE_PROJECT_ENV=PROD pnpm start   # also listens on port 5000
```

## Languages

- **Follows the browser by default**: anything starting with `zh` renders Chinese, everything else renders English.
- **Manual switch**: "中文 / English" in the top-right corner. The choice is stored in `localStorage` under `life_species_locale`, survives navigation between pages, and keeps `<html lang>` in sync as `zh-CN` / `en`.
- **Coverage**: homepage, all 24 questions and every option, quiz buttons and error messages, every result-page label and share string, and the distribution modal.
- **Where it lives**: `src/i18n/` — `locale.tsx` (state and detection), `ui.ts` (interface copy), `questions.ts` (bilingual question bank), `species-en.ts` (English copy for all 24 species), `LanguageToggle.tsx` (the switcher).
- **English species copy is a presentation overlay**: the `species_content` table keeps storing the official Chinese copy, and English is looked up by `species_key` from `species-en.ts`, falling back to Chinese for any key not covered. Image filenames, `species_key` values and the scoring algorithm are language-independent — the same answers yield the same species in either language.

## Demo mode (no database required)

`POST /api/runs/preview` is a path that never touches the database; it consists of two files: `src/app/api/runs/preview/route.ts` and `src/lib/preview-result.ts`.

- Scoring still calls the official `life_species_calibrated_scorer_v1.mjs` — there is no second implementation anywhere; species copy comes from the authoritative `life_species_supabase_seed_manifest_v1.json`, with the real image paths and `species_key` values.
- The quiz page always tries the normal flow first (`/api/runs/start` + `/api/runs/{runId}/complete`). Only when that chain fails does it fall back to preview, stashing the payload in `sessionStorage.life_species_preview` and navigating to `/r/preview`.
- So in demo mode the result page works and can export a share image, but there is **no permanent link** (the page hides "Copy result link" and shows the demo notice) and the result is lost once the tab closes.
- Once a database is configured the fallback never fires: a successful normal run goes straight to `/r/{share_code}`.

## Environment variables

All three are **credentials of a Supabase project**. Keep them server-side (`.env.local`, or Vercel's Environment Variables) and out of the frontend bundle.

| Variable | Purpose | Where to get it |
|---|---|---|
| `COZE_SUPABASE_URL` | Supabase project URL | Supabase dashboard → Project Settings → API |
| `COZE_SUPABASE_ANON_KEY` | Anonymous access key | Same place |
| `COZE_SUPABASE_SERVICE_ROLE_KEY` | High-privilege key for server-side writes | Same place, **must never reach the frontend bundle** |

The `COZE_` prefix is historical: these key names were inherited from the ones the COZE platform injects automatically. Local and Vercel runs use the same names; `src/storage/database/supabase-client.ts` reads exactly these three.

`COZE_PROJECT_ENV=PROD` only affects how `src/server.ts` boots; without it the server starts in development mode.

## Routes and APIs

| Path | Purpose | Needs database |
|---|---|---|
| `/` | Homepage | No (except the distribution modal) |
| `/test` | 24-question quiz | On submit |
| `/r/{share_code}` | Permanent result page | Yes |
| `POST /api/runs/preview` | Compute a result on the spot without writing to the database (fallback when no database is configured) | No |
| `POST /api/runs/start` | Start a run, return `runId` | Yes |
| `POST /api/runs/{runId}/complete` | Store answers and mint the share code | Yes |
| `POST /api/runs/{runId}/feedback` | Save the user's rating of their result | Yes |
| `GET /api/results/{shareCode}` | Read a result by share code | Yes |
| `GET /api/stats` | Species distribution stats | Yes |

## Database

Five tables are required at runtime: `test_runs`, `test_answers`, `result_snapshot`, `species_content`, `feedback`.

- Table DDL, RLS policies and the seeding procedure are **not in this repository** — the prompt assigns them to whoever implements the product. See the database and acceptance chapters of `docs/pm/life_species_coze_prompt_v1_3_FINAL.md`.
- The authoritative source for the 24 species texts and image paths is `life_species_supabase_seed_manifest_v1.json` (`schemaVersion 1.0` / `testVersion mvp-1.2` / `scorerVersion mvp-1.2-calibrated`); its fields map one-to-one onto `species_content`.
- Images live as files under `public/assets/species/`; the database stores paths only (e.g. `/assets/species/01_weekend-dog.png`), never binaries.

## Self-check commands

```bash
node life_species_calibrated_scorer_test_v1.mjs   # expect: 24/24 hits, Overall PASS, Status PASS
pnpm ts-check                                     # TypeScript type check
pnpm validate                                     # tsc + eslint + stylelint in parallel
pnpm build                                        # next build + tsup bundle of src/server.ts
```

## Deployment

- **Vercel** (the live site): `vercel.json` pins the build command to `next build`; `.vercelignore` excludes only the archived asset copies in this repo, so the 24 PNGs under `public/assets/species/` are still deployed.
- **COZE**: the original preview site is no longer serving. `.coze` and `scripts/*.sh` are kept, so the original build flow still works if COZE hosting is re-enabled.

## Implementation constraints

Hard rules for an AI coding platform or a second developer; the prompt v1.3 remains authoritative for the full list:

1. Only `life_species_calibrated_scorer_v1.mjs` (version `mvp-1.2-calibrated`) may produce official scores; the frontend must not keep its own scoring logic.
2. The 24 questions, 18 dimensions, 24 `species_key` values and the primary-plus-two-cross-family-secondary rules must not be redesigned.
3. The 24 PNG filenames are bound to their `species_key` — no renaming, translating or changing extensions; `manifest.csv` is never uploaded, deployed or used as the mapping source.
4. High-privilege credentials (`service_role`, `DATABASE_URL`) stay in server-side environment variables only.
5. The same answers plus the same test version plus the same scorer version must always yield the same result.
6. Explicitly out of MVP scope: sign-up/login, peer reviews, pair matching, leaderboards, community, direct messages, AI chat.

## Repository contents

| Path | Description |
|---|---|
| `src/` | Next.js 16 App Router implementation: pages, APIs, Supabase client |
| `public/assets/species/` | The 24 official character PNGs, served as static assets |
| `docs/pm/life_species_coze_prompt_v1_3_FINAL.md` | **Requirements / development spec (single source of truth)** |
| `life_species_calibrated_scorer_v1.mjs` | Official scorer |
| `life_species_calibrated_scorer_test_v1.mjs` | Automated scorer test |
| `life_species_supabase_seed_manifest_v1.json` | Official image and copy mapping (24 entries) |
| `species_assets_v1/`, `species_assets/` | Archived asset copies (same content as `public/assets/species/`, not deployed) |
| `docs/pm/PLAN.md` | Project plan |
| `docs/handoff/HANDOFF.md` | Handoff notes |
| `docs/qa/`, `docs/review/` | Regression checklist, bug tracker, code review, product backlog |
| `docs/roles/` | Collaboration role specs |
| `AGENTS.md` | Repository facts and working agreements (for AI collaborators) |
| `scripts/` | COZE build / dev / start / validate scripts |

## Layout

```
.
├── src/
│   ├── app/                 # pages and API routes
│   ├── components/          # app components (distribution modal, etc.)
│   ├── storage/database/    # Supabase client and credential lookup
│   └── server.ts            # custom HTTP server (for COZE hosting)
├── public/assets/species/   # 24 official PNGs
├── docs/                    # requirements, plan, QA, reviews, roles
├── scripts/                 # build and run scripts
└── life_species_*.mjs / *.json   # scorer, test, seed manifest (sources of truth)
```

## Known limitations

- No table DDL or migrations in the repository; you create the database yourself following the prompt.
- Chinese species copy lives in the database while the English copy lives in `src/i18n/species-en.ts`; the two must be kept in sync by hand whenever a species is added or rewritten.
- The 24 PNGs total roughly 38 MB and are served as-is, with no compression or responsive sizing.
- Public repository with no open-source license attached — people may read it, but that is not permission to reuse.
- COZE runtime integrations (the reporting wrapper from `coze-coding-dev-sdk`, and key lookup through `coze_workload_identity`) are skipped automatically off COZE, so credentials must be supplied via the variables above.

## Further reading

- [Requirements / development spec v1.3](./docs/pm/life_species_coze_prompt_v1_3_FINAL.md)
- [Project plan](./docs/pm/PLAN.md) · [Handoff notes](./docs/handoff/HANDOFF.md)
- [Code review](./docs/review/CODE_REVIEW.md) · [Product backlog](./docs/review/PRODUCT_BACKLOG.md) · [Regression checklist](./docs/qa/QA_CHECKLIST.md) · [Bug tracker](./docs/qa/BUGS.md)
- [Working agreements AGENTS.md](./AGENTS.md)
