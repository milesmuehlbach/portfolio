<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import displayFont from '@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2?url';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="preload" href={displayFont} as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

{@render children()}
