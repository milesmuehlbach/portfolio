# milesmuehlbach.com

My portfolio. SvelteKit, prerendered to static HTML with no client JavaScript, deployed on Cloudflare.

```sh
bun install
bun run dev      # http://localhost:5173
bun run build    # prerender everything into .svelte-kit/cloudflare
bun run check && bun run lint
```

## Adding a project

1. Copy `src/content/projects/_template/` to `src/content/projects/<slug>/`. The folder name becomes the URL (`/projects/<slug>`).
2. Fill in the frontmatter in `index.md` and write the page in Markdown below it.
3. Optionally add `cover.png` (or `.jpg`, `.webp`, `.avif`) next to it, plus a `coverAlt` line. It's shown on the page and used as the social preview image.
4. Run `bun run dev` to preview. `draft: true` keeps it out of the build until it's ready.

The project list, its page, the sitemap, and the structured data update automatically. If a required field is missing or malformed, the build fails and names the file.

Blog posts work the same way in `src/content/posts/`. The Blog link appears in the navigation once the first post is published.

## Where things live

| Change                              | File                                |
| ----------------------------------- | ----------------------------------- |
| Name, email, social links, site URL | `src/lib/site.ts`                   |
| About page, contact page            | `src/routes/(pages)/*/+page.svelte` |
| Colors and fonts                    | `src/routes/layout.css`             |
| Frontmatter fields and validation   | `src/lib/content.ts`                |
| Default share image                 | `static/og.png`                     |
