# Component Library

A dark-themed, developer-quality component library browser powered by React + Vite + Tailwind CSS v4.

Browse, preview, theme, create, and export UI components. All AI processing runs server-side via GitHub Actions — Vercel only serves the static UI.

---

## Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/component-library
cd component-library
cp .env.example .env
# Fill in .env (see below)
npm install
npm run dev
```

---

## Environment Variables

Copy `.env.example` → `.env` and fill in:

| Variable | Required | Purpose |
|---|---|---|
| `VITE_GITHUB_TOKEN` | ✅ | PAT with `repo` + `workflow` scopes |
| `VITE_GITHUB_OWNER` | ✅ | Your GitHub username or org |
| `VITE_GITHUB_REPO` | ✅ | This repo name (`component-library`) |
| `VITE_ANTHROPIC_API_KEY` | Optional | Only for local in-browser fallback |

### Create a GitHub Personal Access Token

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Generate new token (classic) with scopes: **`repo`** and **`workflow`**
3. Paste the token as `VITE_GITHUB_TOKEN`

---

## GitHub Secret (for Actions)

The GitHub Actions workflows need a Claude API key. Add it as a repo secret:

1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `ANTHROPIC_API_KEY`, Value: your Anthropic API key

---

## Vercel Deployment

1. Import this repo on [vercel.com](https://vercel.com)
2. Add the three env vars (`VITE_GITHUB_TOKEN`, `VITE_GITHUB_OWNER`, `VITE_GITHUB_REPO`) in Vercel project settings
3. Vercel auto-deploys on every push — including commits from GitHub Actions

---

## How It Works

### Component Generation
Click **+ Create** → describe a component → the app triggers a GitHub Actions workflow that:
1. Calls Claude with a strict quality-enforcement prompt
2. Writes `src/components/{Name}/{Name}.jsx` and `.meta.js` to the repo
3. Pushes the commit → Vercel redeploys → the component appears in the sidebar

### URL/UI Scanning
Click **Scan** → paste a URL or describe a UI → same workflow runs but with the reverse-engineering prompt.

### Variant Generation
Load a `design.md` file → open the **Theme** panel → describe a palette variant → GitHub Actions generates a new token map and saves it to `themes/`.

### Theme System
Every component uses only Tailwind token classes (`bg-primary`, `text-ink`, `border-hairline`). Loading a `design.md` swaps CSS custom properties at `:root` — instant full re-skin, zero component changes.

---

## Component Contract

See [COMPONENT_CONTRACT.md](COMPONENT_CONTRACT.md) for the rules every component must follow to be token-compatible.

---

## Stack

- **React 18 + Vite 6** — fast dev server
- **Tailwind CSS v4** — `@theme` CSS block, no `tailwind.config.js`
- **Framer Motion** — micro-interactions, entrance animations
- **Radix UI** — accessible headless primitives (Dialog, Tooltip, Tabs, Switch)
- **Geist** — Vercel's open font (UI)
- **JetBrains Mono** — code panels
- **GitHub Actions** — all AI compute (Claude API)
- **Vercel** — static hosting + auto-deploy
