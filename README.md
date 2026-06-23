# William Lunsford: Portfolio

Static gamedev portfolio + blog. Astro, deployed to Cloudflare Workers (static assets),
media served from a Cloudflare R2 bucket, auto-deployed via GitHub Actions.

## Stack

- **[Astro](https://astro.build)**: static site generator, content collections for blog posts
- **Cloudflare Workers (static assets)**: hosting, replaces the older "Workers Sites" / Pages flow
- **Cloudflare R2**: object storage for images/video referenced in blog posts and project cards
- **GitHub Actions**: builds and deploys on every push to `main`
- **@astrojs/sitemap**: auto-generates `sitemap-index.xml` for Google/search engines

## Project structure

```
src/
  content/blog/*.md      <- one markdown file per blog post
  content/config.ts      <- schema for blog frontmatter (zod)
  data/projects.ts        <- your games/projects list (edit this)
  layouts/                <- BaseLayout (nav/footer), BlogPostLayout
  pages/                   <- index, projects, about, contact, resume, blog/
  lib/r2.ts                <- r2Url() helper for building R2 asset URLs
  styles/global.css        <- dark theme
wrangler.toml              <- Cloudflare Workers static-asset deploy config
.github/workflows/deploy.yml
```

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serve the build locally
```

## Writing a blog post

Add a new file to `src/content/blog/your-slug.md`:

```md
---
title: "Post Title"
description: "One-line summary for previews/SEO."
pubDate: 2026-06-22
tags: ["devlog"]
heroImage: "devlog/your-slug/cover.jpg"   # optional, path inside R2 bucket
draft: false
---

Body content in markdown here.
```

The route is auto-generated at `/blog/your-slug/`. Set `draft: true` to hide it from the
blog index until it's ready.

## Adding projects

Edit `src/data/projects.ts`. It's a plain array, no CMS needed.

## Serving images/video from R2

Don't commit large media to git. Upload it to your R2 bucket and reference it via the
public R2 URL, either directly in markdown:

```md
![Screenshot](https://YOUR_R2_PUBLIC_URL/devlog/your-slug/screenshot.png)
```

or in `src/data/projects.ts` using the `r2Url()` helper from `src/lib/r2.ts`, which reads
`PUBLIC_R2_BASE_URL` from your environment.

Set `PUBLIC_R2_BASE_URL` locally by copying `.env.example` to `.env` and filling it in.

---

## One-time setup (do this once)

### 1. Cloudflare account + Wrangler login

1. Sign up at https://dash.cloudflare.com/sign-up (free plan is fine).
2. Install Wrangler if you don't have it globally, or just use the local devDependency
   once added. For one-off commands you can use `npx wrangler <command>`.
3. Authenticate:
   ```bash
   npx wrangler login
   ```
   This opens your browser to authorize the CLI.

### 2. Create the R2 bucket

```bash
npx wrangler r2 bucket create portfolio-media
```

Then make it publicly readable so the site can load images/video directly:

1. In the Cloudflare dashboard, go to **R2 → portfolio-media → Settings**.
2. Under **Public access**, enable the **r2.dev** subdomain (or attach a custom domain
   you own, e.g. `media.yourdomain.com`, if you have one).
3. Copy the public URL it gives you (something like `https://pub-xxxxxxxx.r2.dev`).
4. Put that URL in `.env` as `PUBLIC_R2_BASE_URL` for local dev, and add it as a GitHub
   Actions secret (`PUBLIC_R2_BASE_URL`) so production builds pick it up too. See step 4.

Upload media either via the dashboard (drag and drop) or CLI:

```bash
npx wrangler r2 object put portfolio-media/devlog/hello-world/cover.jpg --file=./cover.jpg
```

### 3. First manual deploy (establishes your workers.dev subdomain)

```bash
npm run build
npx wrangler deploy
```

The first time you deploy to a fresh Cloudflare account, Wrangler/the dashboard will ask
you to pick a `workers.dev` subdomain (e.g. `william-lunsford`). Your site will then be
live at:

```
https://portfolio.<your-subdomain>.workers.dev
```

Update `astro.config.mjs`'s `site` value to that exact URL. This is required for the
sitemap to emit correct absolute URLs for Google.

### 4. GitHub repo + Actions secrets

Repo creation/push is handled separately (see below). Once the repo exists, add these
secrets at **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Where to get it |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens → Create Token → use the **"Edit Cloudflare Workers"** template (also grant R2 edit if you want CI to manage bucket objects) |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → right sidebar of any zone/Workers page, or `npx wrangler whoami` |
| `PUBLIC_R2_BASE_URL` | The public R2 URL from step 2 |

After secrets are set, every push to `main` runs `.github/workflows/deploy.yml`: build,
then deploy to Workers automatically.

### 5. Google indexing

Once live:

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add your property (the workers.dev URL or custom domain).
3. Submit `https://YOUR_SITE/sitemap-index.xml` under **Sitemaps**.

That's the whole loop: write a markdown file, push, and it's live and indexed.
