import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Svelte/SvelteKit options (extensions, mdsvex, adapter, runes) live in
// svelte.config.js so eslint, prettier, svelte-check and the editor extension
// can discover them too — they do not read this file.
export default defineConfig({
	plugins: [tailwindcss(), sveltekit()]
});
