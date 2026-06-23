---
title: "Example Post: Every Formatting Option, Explained"
description: "A reference post showing every frontmatter field and markdown feature this blog supports."
excerpt: "Reference post. Shows every field and formatting trick available when writing a devlog. Not meant for real readers."
pubDate: 2026-06-23
updatedDate: 2026-06-24
heroImage: "blog/test-post/Screenshot%202026-03-01%20170747.png"
tags: ["reference", "formatting", "meta", "example"]
draft: true
featured: false
---

This post is a cheat sheet, not a devlog. It's `draft: true`, so it never shows up on
`/blog`, the homepage carousel, RSS, or the sitemap. The page itself still builds, so
you can open it directly any time you forget how something works. Delete it whenever you
don't need it anymore.

## Frontmatter fields, what each one does

```yaml
---
title: "Your Post Title"
description: "1-2 sentences. Used for SEO <meta description> and social share cards."
excerpt: "Optional. If set, shown on /blog and the homepage carousel INSTEAD of description."
pubDate: 2026-06-23
updatedDate: 2026-06-24 # optional. shows "· updated <date>" next to the date
heroImage: "devlog/my-post/cover.jpg" # optional. path inside your R2 bucket
tags: ["unreal", "gameplay"] # optional, defaults to []. powers the tag filter on /blog
draft: true # optional, defaults to false. hides from listings, keeps the page buildable
featured: false # optional, defaults to false. true adds it to the homepage carousel
---
```

- **title** is required. It shows as the `<h1>` and the browser tab title.
- **description** is required. This is the SEO and share-card text, so keep it tight, one or
  two sentences.
- **excerpt** is optional. Set it only when you want the `/blog` list and homepage carousel to
  read *differently* from the SEO description. Skip it and both places fall back to `description`.
- **pubDate** is required. It drives sort order everywhere and the "year" grouping on `/blog`.
- **updatedDate** is optional. It adds an "updated [date]" note next to the publish date.
- **heroImage** is optional, a path *inside your R2 bucket* (not a full URL). When set, it shows
  up in three places automatically: the small thumbnail in this post's header, the thumbnail on
  its `/blog` card and homepage carousel card, and the `og:image`/`twitter:image` used when the
  link gets shared.
- **tags** is an optional array. Each tag becomes a clickable filter pill in the "Tags" popover
  on `/blog`.
- **draft** is optional. `true` keeps the page buildable (so you can preview it) but hides it from
  `/blog`, the homepage, the RSS feed, and the sitemap.
- **featured** is optional. `true` adds the post to the homepage carousel. It has no effect while
  `draft: true`, since drafts never show there regardless.

## Reading time and table of contents (automatic, no field needed)

Reading time is computed from word count (~200 words/min) and shown next to the date.

The "On this page" box is the same kind of automatic. Nothing to set up, but the rules for when
it shows are specific:

- It's built from every `##` and `###` heading in the post. `#` (the title) doesn't count, and
  anything deeper than `###` is ignored.
- It only appears if the post has **more than one** heading. A single `##` isn't enough to bother
  with a sidebar for.
- It only renders on screens **1440px and wider**. Below that there isn't enough room beside the
  centered content column to show it without squeezing the article, so it just hides and the page
  layout never shifts to make room for it.
- On qualifying screens it's `position: fixed` in the left margin and stays in view as you scroll
  past the heading it's tracking. The currently-visible section is highlighted in the sidebar
  automatically as you scroll.
- The heading anchors it links to (`#what-s-coming`, etc.) are auto-generated from the heading
  text, so you don't write or set those either.

If you want a heading to show up here, just use `##`/`###`. If you don't want a heading included,
keep it at `####` or deeper, or don't add a heading at all.

## Basic text formatting

Plain paragraph text. **Bold**, *italic*, ***bold italic***, ~~strikethrough~~, and
`inline code` all work the normal markdown way. You can also drop raw HTML into a
markdown file when you need something markdown doesn't cover, like <mark>a highlighted
span</mark> or pressing <kbd>Ctrl</kbd> + <kbd>S</kbd>.

Here's a link: [Astro docs](https://docs.astro.build). Bare URLs autolink too:
https://astro.build.

Footnotes work[^1] if you ever want one.

[^1]: This renders as a numbered reference at the bottom of the post.

## Lists

Unordered:

- First point
- Second point
  - Nested point
  - Another nested point
- Third point

Ordered:

1. Set up the scene
2. Wire up input
3. Ship it

Task list (GFM):

- [x] Write the gameplay loop
- [x] Fix the camera
- [ ] Actually finish the boss fight

## Blockquote

> Use blockquotes for pulled quotes, design notes you want to call out, or anything that
> should visually break from the main text.

## Code blocks

Fenced code blocks get syntax highlighting automatically based on the language tag, with
no extra setup needed.

```cpp
void AMyCharacter::Jump()
{
    if (CanJump())
    {
        LaunchCharacter(FVector(0, 0, JumpVelocity), false, true);
    }
}
```

```ts
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
```

## Images, with a caption

Standard markdown image. Point it at your R2 bucket path the same way as `heroImage`:

```md
![Alt text describing the image](https://YOUR_R2_PUBLIC_BASE_URL/devlog/my-post/screenshot.jpg)
```

If you want a caption under the image, drop to raw HTML for that one image:

```html
<figure>
  <img src="https://YOUR_R2_PUBLIC_BASE_URL/devlog/my-post/screenshot.jpg" alt="Describe it" />
  <figcaption>Optional caption text shown under the image.</figcaption>
</figure>
```

## Collapsible section

Handy for spoilers, long logs, or optional detail you don't want taking up space by default:

<details>
<summary>Click to expand</summary>

Anything indented here only shows once expanded, and works with any markdown inside, including
more code blocks or lists.

</details>

## Table

| Engine version | Status | Notes |
| --- | --- | --- |
| 5.3 | Stable | What this project ships on |
| 5.4 | Testing | Nanite improvements look promising |
| 5.5 | Not started | Waiting on plugin support |

## Horizontal rule

Use three dashes on their own line to drop a visual divider:

---

That's everything. Copy this file, strip what you don't need, and start writing.
