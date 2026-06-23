---
title: "Hello, World: Starting This Devlog"
description: "First post on this site: why I'm writing a gamedev blog and what's coming next."
pubDate: 2026-06-22
tags: ["devlog", "meta"]
featured: true
---

This is the first post on my new gamedev portfolio site, built with [Astro](https://astro.build)
and deployed on Cloudflare. I'll be using this space for devlogs, postmortems, and notes on
whatever I'm building.

## What's coming

- Devlogs for current projects
- Postmortems on finished games
- Notes on tools, engines, and workflow

## Embedding media from R2

Images and video for posts live in an R2 bucket rather than in the git repo, so the repo
stays small and media loads from Cloudflare's CDN. Reference them with the public R2 base URL:

```md
![Cover art](https://YOUR_R2_PUBLIC_BASE_URL/devlog/hello-world/cover.jpg)
```

Once `PUBLIC_R2_BASE_URL` is set (see `.env.example`), swap in the real bucket URL above and
in this post's `heroImage` frontmatter field.

More soon.
