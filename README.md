# laughdieme

A whole-of-government internal talent marketplace — your "internal LinkedIn." This repo is
the marketing/landing site with a waitlist.

**Live:** https://project-joavd.vercel.app/

## Tech stack
- [Next.js 16](https://nextjs.org) (App Router) · React 19 · TypeScript
- Tailwind CSS v4 (brand tokens in `src/app/globals.css`)
- [PostHog](https://posthog.com) analytics
- Deployed on [Vercel](https://vercel.com), source on GitHub

## Prerequisites
Node is managed with [nvm](https://github.com/nvm-sh/nvm). If `node`/`npm` aren't found, load nvm:
```bash
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

## Getting started
```bash
npm install                  # install dependencies
cp .env.example .env.local   # then fill in your PostHog key
npm run dev                  # http://localhost:3000
```

## Environment variables
Copy `.env.example` to `.env.local` and set:

| Variable | What it is |
|----------|-----------|
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project API key (`phc_...`, public/write-only) |
| `NEXT_PUBLIC_POSTHOG_HOST` | `https://us.i.posthog.com` (US) or `https://eu.i.posthog.com` (EU) |

`.env.local` is gitignored — never commit real keys. Set the same values in Vercel →
Settings → Environment Variables for production.

## Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build — run before pushing |
| `npm run lint` | Lint with ESLint |
| `npm start` | Serve the production build |

## Deploying
Pushing to `main` deploys to production automatically via Vercel. Every other branch / pull
request gets its own **preview URL** (see below). To roll back, promote a previous deployment
in the Vercel dashboard.

## Branch + preview workflow
Don't edit `main` directly for anything non-trivial. Instead:
```bash
git checkout -b feature/my-change     # branch off main
# ...make changes...
npm run build                         # verify it builds
git add -A && git commit -m "Describe the change"
git push -u origin feature/my-change  # Vercel posts a preview URL on the PR
```
Open a Pull Request on GitHub, review the preview URL, then **Merge** → it deploys to
production. This keeps `main` always-deployable.

## Maintenance
- Monthly: `npm outdated`, `npm update`, `npm audit fix`, then `npm run build` and push.
- Do major version bumps one at a time and test locally first.
- Check PostHog (events flowing?) and Vercel logs (errors?).

## Project conventions
See [`CLAUDE.md`](./CLAUDE.md) for architecture, conventions, and the design workflow.
