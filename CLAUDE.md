@AGENTS.md

# laughdieme — project guide for Claude Code

A whole-of-government internal talent marketplace ("internal LinkedIn"). Currently a
bold & playful marketing/landing page with a waitlist. Brand vibe: bold & playful
(vibrant purple `--color-brand-600`, coral/amber accents).

## Stack
- **Next.js 16** (App Router, `src/` dir) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-first config in `src/app/globals.css` — brand tokens live in the `@theme` block)
- **PostHog** analytics (`posthog-js`)
- Hosted on **Vercel**, source on **GitHub**, production at https://project-joavd.vercel.app/

## Environment (important)
Node is installed via **nvm and is NOT on the default PATH**. Before any `npm`/`node`/`npx`:
```bash
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

## Commands
```bash
npm run dev      # local dev server at http://localhost:3000
npm run build    # production build — ALWAYS run this to verify before pushing
npm run lint     # eslint
npm start        # serve the production build locally
```

## Deploy
- Push to `main` → Vercel auto-deploys (if Git is connected). Otherwise: `vercel --prod`.
- **Always verify `npm run build` passes before pushing.**
- To roll back: Vercel dashboard → Deployments → pick last good one → Promote to Production.
- `vercel.json` forces `"framework": "nextjs"` — **do not remove it** (the dashboard preset was wrong and caused 404s).

## Conventions
- Pages/layouts are **Server Components** by default. Add `"use client"` only for interactivity
  (state, event handlers, browser APIs). Example: `src/app/_components/signup-form.tsx`.
- Shared UI goes in `src/app/_components/`.
- Brand colors: use the Tailwind tokens (`bg-brand-600`, `text-brand-700`, `bg-accent`, etc.)
  defined in `globals.css` rather than hardcoding hex.
- Keep the playful tone in copy and the rounded, high-contrast visual style.

## Analytics
- PostHog is initialized in `src/instrumentation-client.ts` (Next.js 16 client instrumentation).
- Capture custom events with `posthog.capture("event_name", { ...props })`.
- Existing events: `$pageview` (auto), `waitlist_signup` (with `email`).
- Keys come from `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST`. The key is in
  `.env.local` (gitignored) locally and in Vercel env vars for production. US cloud.

## Secrets
- Never commit `.env.local` or any real secret. `.env.example` documents what's needed.
- The PostHog `NEXT_PUBLIC_*` key is public-safe (write-only ingest). Treat any future
  server-side keys as never-commit.

## Design workflow (Figma / "Claude design")
- For new pages or redesigns: design in Figma first, then implement as code matching the
  brand tokens above. Use the Figma MCP tools; read the relevant Next.js docs in
  `node_modules/next/dist/docs/` before writing new patterns (this is Next 16, newer than
  most training data).
