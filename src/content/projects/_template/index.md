---
# Copy this folder to src/content/projects/<slug>/ to add a project.
# The folder name is the URL: projects/my-app/ -> /projects/my-app
# Folders starting with `_` are ignored, so this template never goes live.

# Required
title: My App
summary: One sentence on what it is and who it's for. Shown in the list and in search results.
date: 2026-01-31 # when it shipped, YYYY-MM-DD; the list is sorted by this

# Optional
updated: 2026-02-14 # last meaningful change; sets the sitemap's lastmod
stack: # shown on the list and the project page
  - SvelteKit
  - PostgreSQL
url: https://example.com # live site or app store link
repo: https://github.com/milesmuehlbach/my-app
draft: true # visible in `bun run dev`, left out of the build

# Cover image: put cover.png (or .jpg, .webp, .avif) next to this file.
# It appears on the project page and as the social preview image.
# coverAlt is required whenever a cover exists.
coverAlt: The app's dashboard showing a week of study sessions
---

## What it does

The body is regular Markdown. Svelte components also work: rename this file to `index.svx` and import them in a `<script>` block.

## How I built it

Fenced code blocks are highlighted at build time.
