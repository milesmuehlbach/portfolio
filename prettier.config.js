/** @type {import("prettier").Config} */
const config = {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100,
	plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
	overrides: [
		{ files: '*.svelte', options: { parser: 'svelte' } },
		// mdsvex files are markdown first. The svelte parser treats the markdown as
		// HTML text and reflows it, which collapses frontmatter, headings, lists and
		// code fences onto one line. The markdown parser formats the prose and
		// leaves `<script>`/component blocks untouched.
		{ files: '*.svx', options: { parser: 'markdown' } }
	],
	tailwindStylesheet: './src/routes/layout.css'
};

export default config;
