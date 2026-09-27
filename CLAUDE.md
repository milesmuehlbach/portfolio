# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio site for Miles Muehlbach, built with SvelteKit 2 / Svelte 5 (runes mode), Tailwind CSS 4, and mdsvex (for `.md`/`.svx` content). Every page is prerendered and ships with no client JavaScript. Deploys via `@sveltejs/adapter-cloudflare`. Package manager is `bun` (see `bun.lock`).

## Commands

```sh
bun install       # install dependencies
bun run dev        # start dev server (add --open to open a browser tab)
bun run build       # production build (prerendered, via adapter-cloudflare)
bun run preview     # preview the production build
bun run check       # svelte-kit sync + svelte-check (type checking)
bun run check:watch  # type checking in watch mode
bun run lint       # prettier --check . && eslint .
bun run format      # prettier --write .
```

There is no test suite configured in this repo.

Always run `bun run check` and `bun run lint` after making changes.

## Architecture

- **Static, zero-JS output.** `src/routes/+layout.ts` sets `prerender = true` and `csr = false`, so every route becomes an HTML file at build time and no Svelte runtime ships to the browser. Page transitions come from CSS (`@view-transition` in `layout.css`), and links are prefetched by the speculation rules in `src/app.html`. A page that needs interactivity can opt in with `export const csr = true` in its own `+page.ts`. Because nothing hydrates, `onNavigate`, `$state` driven UI, and event handlers do nothing unless that route enables CSR.
- **Routes.** `src/routes/+page.svelte` is the home page (full-viewport hero, no header). Every other page lives in the `(pages)` route group, whose `+layout.svelte` adds the header nav and the skyline footer. `+error.svelte` is standalone. `sitemap.xml/+server.ts` is generated from the content collections. Pages are `.svelte`, not markdown.
- **Content collections** live in `src/content/<collection>/<slug>/index.md` (optionally `.svx`) with an optional `cover.{png,jpg,webp,avif}` beside it. `src/lib/content.ts` loads them with `import.meta.glob`, validates the frontmatter (a bad field throws with the file path and fails the build), drops `draft: true` entries outside dev, and sorts newest first. Folders starting with `_` are ignored; `_template/` in each collection documents every field. To add a collection, add globs and a `collect(...)` call there, plus routes and sitemap entries.
- **SEO.** Every page renders `$lib/components/seo.svelte`, which sets title, description, canonical URL (built from `SITE_URL`, since `page.url` has a placeholder origin during prerendering), Open Graph/Twitter tags, and a JSON-LD `@graph` that always includes the `WebSite` and `Person` from `src/lib/site.ts`. Pages pass extra schema nodes (`ProfilePage`, `SoftwareSourceCode`, `BlogPosting`, `BreadcrumbList` via `breadcrumbs()`). The blog index is `noindex` and left out of the sitemap and nav while there are no posts. `static/og.png` is the default share image; a cover image replaces it for its entry.
- **Links.** Use `resolve()` from `$app/paths` for internal hrefs (ESLint enforces it). Prerendered hrefs from `resolve` are relative (`./about`), so compare `page.url.pathname` against route paths, never against hrefs. External links in loops need a literal `rel="external"` (or `"me external"`) to satisfy the lint rule.
- **Images.** Use `@sveltejs/enhanced-img` (`<enhanced:img>` or `?enhanced` imports), which generates AVIF/WebP srcsets at build time. `enhancedImages()` must come before `sveltekit()` in `vite.config.ts`. `src/lib/assets/skyline.jpg` is a crop of `nyskyline.jpeg`, used by `horizon.svelte`.
- Shared code goes in `src/lib` and is imported via the `$lib` alias. Site-wide facts (name, URL, email, profiles, Person schema) live in `src/lib/site.ts`; change them there, not in pages.
- Reusable UI pieces live in `src/lib/components/*.svelte` and forward native element attributes (`HTMLAttributes<...>`) rather than defining a large custom prop API.
- `svelte.config.js` is the single source of truth for Svelte/SvelteKit options (component `extensions`, the mdsvex preprocessor, runes mode, the adapter, prerender options). `vite.config.ts` may register other Vite plugins but must call `sveltekit()` with no arguments. Do not move Svelte config inline into `vite.config.ts`: passing options to `sveltekit()` makes SvelteKit ignore `svelte.config.js` entirely, and Prettier, `svelte-check` and the editor extension only read `svelte.config.js`, so mdsvex becomes invisible to all of them.
- `svelte.config.js` forces Svelte 5 runes mode for all project files (excluding `node_modules`) — always write components using runes (`$state`, `$props`, `$derived`, etc.), not the legacy Svelte reactivity model.

## Design system

Colors are Tailwind theme tokens in `src/routes/layout.css`, all sampled from the skyline photo: `dusk` (page background, the sky), `night` (all text on dusk), `cloud` (display headings on dusk, text on the footer), `river` (footer, the water), and `mist` (secondary text on river). Don't add grays or accent colors; hierarchy comes from size, weight, width and the mono face, not lighter text (lighter ink on dusk fails contrast).

Type is Archivo (variable, with a width axis) plus Martian Mono. Width carries hierarchy: `font-stretch-expanded` for display headings, `font-stretch-semi-expanded` for nav and subheads, normal width for body. Mono is reserved for labels and metadata (dates, stacks, captions). Fonts are self-hosted via `@fontsource-variable`; the display font is preloaded in the root layout.

The skyline (`horizon.svelte`) is the signature: the photo scales to the band's height so the spire is never cropped, and on wide screens its edges dissolve into a gradient that matches its sky and water. Rendered markdown uses `prose prose-dusk`.

## mdsvex (`.svx`)

`.svx` and `.md` are registered as component extensions. They are used for content collections in `src/content` (see Architecture), not for routes, and there is no mdsvex layout: the route that renders an entry provides the chrome. mdsvex exposes frontmatter as a `metadata` export and emits a deprecated `<script context="module">`, whose warning is filtered for markdown files in `svelte.config.js`. `src/mdsvex.d.ts` declares the ambient module types that make those imports type-check; without it `import Post from './post.svx'` is a "cannot find module" error. It must stay free of top-level `import`/`export` or the wildcard declarations stop applying.

Tooling support is partial, because no tool except Vite runs the mdsvex preprocessor:

- **Prettier** formats `.svx` with the `markdown` parser, not `svelte`. The svelte parser reflows the markdown as HTML text and collapses frontmatter, headings, lists and code fences onto one line. Do not "fix" this override.
- **ESLint** ignores `.svx` (and never matches `.md`). It would parse the raw file as Svelte, so braces in a code sample (inline `{ a: 1 }` or a fenced js block) throw a parse error on files that compile and render fine — and parse errors cannot be silenced with an eslint-disable comment.
- **svelte-check** does not type-check `.svx` bodies. `isSvelteFilepath` in svelte-check is hardcoded to `.svelte`, so this is not configurable. Imports _of_ `.svx` files are still checked via `src/mdsvex.d.ts`.

## Code style

- Formatting is enforced by Prettier: tabs for indentation, single quotes, no trailing commas, 100 print width. Svelte files use the `svelte` parser, `.svx` and `.md` files the `markdown` parser. Tailwind classes are auto-sorted via `prettier-plugin-tailwindcss` against `src/routes/layout.css`. Run `bun run format` rather than hand-formatting.
- ESLint config (`eslint.config.js`) extends `@eslint/js` recommended, `typescript-eslint` recommended, and `eslint-plugin-svelte` recommended, with Prettier conflict rules disabled. `.svx` is ignored (see mdsvex section).
