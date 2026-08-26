# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio site for Miles Muehlbach, built with SvelteKit 2 / Svelte 5 (runes mode), Tailwind CSS 4, and mdsvex (for `.svx`/`.md` content). Deploys via `@sveltejs/adapter-node`. Package manager is `bun` (see `bun.lock`).

## Commands

```sh
bun install       # install dependencies
bun run dev        # start dev server (add --open to open a browser tab)
bun run build       # production build (via adapter-node)
bun run preview     # preview the production build
bun run check       # svelte-kit sync + svelte-check (type checking)
bun run check:watch  # type checking in watch mode
bun run lint       # prettier --check . && eslint .
bun run format      # prettier --write .
```

There is no test suite configured in this repo.

Always run `bun run check` and `bun run lint` after making changes.

## Architecture

- Routing is filesystem-based under `src/routes` (standard SvelteKit conventions: `+page.svelte`, `+layout.svelte`). There is no `+page.ts`/`+page.server.ts` yet — pages are static/presentational.
- `src/routes/+layout.svelte` is the root layout; it imports the global stylesheet `src/routes/layout.css` (Tailwind entry point, imports `tailwindcss`, `@tailwindcss/forms`, `@tailwindcss/typography`) and sets the favicon.
- Shared code goes in `src/lib` and is imported via the `$lib` alias (e.g. `$lib/components/link.svelte`, `$lib/assets/...`). `src/lib/index.ts` is the barrel for anything meant to be imported through `$lib` directly.
- Reusable UI pieces live in `src/lib/components/*.svelte`. Existing components (e.g. `link.svelte`) follow a pattern of forwarding native element attributes (`HTMLAnchorAttributes`, etc.) and accepting `children` as a `Snippet` for composition, rather than defining a large custom prop API.
- Static assets (images, favicon) live in `src/lib/assets` and are imported directly into components (Vite handles hashing/bundling), not referenced by path from `static/`.
- `svelte.config.js` is the single source of truth for Svelte/SvelteKit options (component `extensions`, the mdsvex preprocessor, runes mode, the adapter). `vite.config.ts` just calls `sveltekit()` with no arguments. Do not move that config back inline into `vite.config.ts` — passing options to `sveltekit()` makes SvelteKit ignore `svelte.config.js` entirely, and Prettier, `svelte-check` and the editor extension only read `svelte.config.js`, so mdsvex becomes invisible to all of them.
- `svelte.config.js` forces Svelte 5 runes mode for all project files (excluding `node_modules`) — always write components using runes (`$state`, `$props`, `$derived`, etc.), not the legacy Svelte reactivity model.
- Styling is Tailwind CSS 4 utility classes directly in markup; there is no separate component-level CSS convention in use currently.

## mdsvex (`.svx`)

`.svx` and `.md` are registered as component extensions, so they can be routes (`+page.svx`) or imported as components. `src/mdsvex.d.ts` declares the ambient module types that make those imports type-check; without it `import Post from './post.svx'` is a "cannot find module" error. It must stay free of top-level `import`/`export` or the wildcard declarations stop applying.

Tooling support is partial, because no tool except Vite runs the mdsvex preprocessor:

- **Prettier** formats `.svx` with the `markdown` parser, not `svelte`. The svelte parser reflows the markdown as HTML text and collapses frontmatter, headings, lists and code fences onto one line. Do not "fix" this override.
- **ESLint** ignores `.svx`. It would parse the raw file as Svelte, so braces in a code sample (inline `{ a: 1 }` or a fenced js block) throw a parse error on files that compile and render fine — and parse errors cannot be silenced with an eslint-disable comment.
- **svelte-check** does not type-check `.svx` bodies. `isSvelteFilepath` in svelte-check is hardcoded to `.svelte`, so this is not configurable. Imports _of_ `.svx` files are still checked via `src/mdsvex.d.ts`.

## Code style

- Formatting is enforced by Prettier: tabs for indentation, single quotes, no trailing commas, 100 print width. Svelte files use the `svelte` parser, `.svx` files the `markdown` parser. Tailwind classes are auto-sorted via `prettier-plugin-tailwindcss` against `src/routes/layout.css`. Run `bun run format` rather than hand-formatting.
- ESLint config (`eslint.config.js`) extends `@eslint/js` recommended, `typescript-eslint` recommended, and `eslint-plugin-svelte` recommended, with Prettier conflict rules disabled. `.svx` is ignored (see mdsvex section).
