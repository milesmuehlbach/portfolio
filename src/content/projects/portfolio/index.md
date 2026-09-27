---
title: milesmuehlbach.com
summary: This site, a SvelteKit portfolio prerendered to static HTML, with projects and posts written in Markdown.
date: 2026-08-26
updated: 2026-09-27
stack:
  - SvelteKit
  - Svelte 5
  - TypeScript
  - Tailwind CSS
  - mdsvex
  - Cloudflare
url: https://milesmuehlbach.com
repo: https://github.com/milesmuehlbach/portfolio
---

## Why I built it

I wanted one place to point people to that shows what I make, and adding to it had to take less effort than a social media post.

## How it works

Every page is rendered to HTML at build time, so it loads fast and search engines read the full content without running any JavaScript.

Projects and blog posts are Markdown files in `src/content`. Each one is a folder with an `index.md` and an optional cover image. The folder name becomes the URL. The frontmatter is checked when the site builds, so a missing field stops the build and names the file, and nothing half-finished goes live.

Each page generates its own title, description, canonical URL, social preview tags, and structured data. The sitemap is built from the same content, so it can't fall out of date.

## The design

The colors come from a photo I like of Lower Manhattan at dusk. The page background is the sky above the skyline, and the footer is the river below it.
