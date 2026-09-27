import adapter from '@sveltejs/adapter-cloudflare';
import { mdsvex } from 'mdsvex';

// Extensions handled by mdsvex. Kept separate from `extensions` below so the
// preprocessor is only applied to markdown-flavoured components, not `.svelte`.
// Markdown is used for content collections (src/content), not for routes, so
// there is no mdsvex layout: the route that renders an entry owns its chrome.
const mdsvexExtensions = ['.svx', '.md'];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexExtensions],
	preprocess: [mdsvex({ extensions: mdsvexExtensions })],
	compilerOptions: {
		// mdsvex still emits `<script context="module">` for frontmatter. That is
		// its output, not ours, so the deprecation is silenced for markdown only.
		warningFilter: (warning) =>
			!(
				warning.code === 'script_context_deprecated' &&
				mdsvexExtensions.some((extension) => warning.filename?.endsWith(extension))
			),
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter(),
		prerender: {
			// A collection route (`/blog/[slug]`) has nothing to render while its
			// collection is empty. Any other unreachable route is still an error.
			handleUnseenRoutes: ({ routes, message }) => {
				if (routes.some((route) => !route.endsWith('/[slug]'))) throw new Error(message);
			}
		}
	}
};

export default config;
