# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install deps
npm run dev         # local dev server, http://localhost:4321
npm run build       # build to dist/ (also syncs content collection types)
npm run preview     # serve the dist/ build locally
npx wrangler deploy # manual deploy to Cloudflare Workers (normally CI does this)
```

No test suite or linter is configured. There is no single-test command.

## Architecture

Static Astro site (`output: "static"`, default) for a gamedev portfolio + blog, deployed to
Cloudflare Workers as static assets (not Pages, not SSR) — see `wrangler.toml`. R2 is used
purely as external object storage for media; it has no binding in this Worker.

**Content flow for blog posts:** each post is a markdown file in `src/content/blog/*.md`. The
schema/frontmatter contract is defined once in `src/content/config.ts` (zod). Two pages consume
the collection: `src/pages/blog/index.astro` (lists non-draft posts, sorted by `pubDate` desc)
and `src/pages/blog/[...slug].astro` (renders one post via `getStaticPaths()` + `post.render()`,
wrapping output in `src/layouts/BlogPostLayout.astro`). Adding a post requires no code change —
just a new markdown file. Setting `draft: true` hides a post from the index without deleting it.

**Project showcase data** lives as a plain TS array in `src/data/projects.ts`, not a content
collection — there's no per-project markdown file, just an array of `{title, description, image,
tags, link}` consumed by `src/pages/index.astro` (featured slice) and `src/pages/projects.astro`
(full list).

**R2 media:** large images/video are not committed to the repo. They're uploaded directly to the
`portfolio-media` R2 bucket and referenced by full public URL. `src/lib/r2.ts` exports `r2Url(path)`
which joins `PUBLIC_R2_BASE_URL` (a `PUBLIC_`-prefixed env var, so it's inlined client-side by Vite)
with a relative path — use it from `.astro`/`.ts` files when building a URL from a path constant;
markdown posts just hardcode the full R2 URL directly in the body since there's no templating in
frontmatter content.

**Layouts:** `BaseLayout.astro` owns the `<html>` shell, nav, footer, and imports
`src/styles/global.css` globally. `BlogPostLayout.astro` wraps `BaseLayout` and adds the
post-specific header (title/date/tags) before `<slot />`. Every page imports `BaseLayout` directly
except blog posts, which go through `BlogPostLayout`.

**Sitemap:** `@astrojs/sitemap` is wired in `astro.config.mjs` and requires `site` to be the real
deployed URL (currently `https://portfolio.williamlunsford02.workers.dev`) — if the Workers
subdomain or a custom domain ever changes, update `site` here or the sitemap will emit wrong
absolute URLs.

## Deployment

`.github/workflows/deploy.yml` builds and deploys on every push to `main` via
`cloudflare/wrangler-action`. Required GitHub Actions secrets (already configured in this repo):
`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `PUBLIC_R2_BASE_URL`. The build step injects
`PUBLIC_R2_BASE_URL` from secrets since Vite needs it at build time, not request time — there is
no server runtime to read env vars later.

For local dev, copy `.env.example` to `.env` and set `PUBLIC_R2_BASE_URL` to the bucket's public
r2.dev URL (or custom domain) so local image/video URLs resolve the same way production does.
