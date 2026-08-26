import adapter from '@sveltejs/adapter-node';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'node:url';

// Extensions handled by mdsvex. Kept separate from `extensions` below so the
// preprocessor is only applied to markdown-flavoured components, not `.svelte`.
const mdsvexExtensions = ['.svx', '.md'];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexExtensions],
	preprocess: [
		mdsvex({
			extensions: mdsvexExtensions,
			// mdsvex inlines this path verbatim as the import specifier in every
			// compiled .svx file, regardless of that file's location, so it must
			// be absolute rather than relative to the project root.
			layout: fileURLToPath(new URL('./src/lib/components/mdsvex-layout.svelte', import.meta.url)),
			layoutPropForwarding: 'runes'
		})
	],
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter()
	}
};

export default config;
