import tailwindcss from '@tailwindcss/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Svelte/SvelteKit options (extensions, mdsvex, adapter, runes) live in
// svelte.config.js so eslint, prettier, svelte-check and the editor extension
// can discover them too — they do not read this file. Other Vite plugins are
// fine here; just never pass options to `sveltekit()`.
export default defineConfig({
	// enhancedImages must run before sveltekit so `<enhanced:img>` and
	// `?enhanced` imports are transformed before Svelte compiles the markup.
	plugins: [tailwindcss(), enhancedImages(), sveltekit()]
});
