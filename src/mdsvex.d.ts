// mdsvex compiles `.svx`/`.md` into Svelte components, but TypeScript has no
// way to know that, so importing one is an error without these declarations.
// `metadata` is the file's YAML frontmatter.
//
// This file must stay free of top-level `import`/`export` statements — that
// would make it a module, and wildcard declarations only apply globally from a
// script file.

declare module '*.svx' {
	const component: import('svelte').Component;
	export const metadata: Record<string, unknown>;
	export default component;
}

declare module '*.md' {
	const component: import('svelte').Component;
	export const metadata: Record<string, unknown>;
	export default component;
}
