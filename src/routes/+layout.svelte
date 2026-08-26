<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ny1 from '$lib/assets/nyskyline.jpeg';
	import { page } from '$app/state';

	let { children } = $props();
	let panelExpanded = $derived(page.url.pathname !== '/');
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="relative block h-screen w-full overflow-hidden overscroll-none select-none">
	<img
		src={ny1}
		alt="new york"
		class="animate-kenburns pointer-events-none h-full w-full flex-1 object-cover object-[center_20%] will-change-transform"
		draggable={false}
	/>
	<div
		class:site-panel-expanded={panelExpanded}
		class="site-panel absolute inset-0 overflow-hidden border-white/15 bg-black/50 shadow-2xl shadow-black/40 backdrop-blur-md sm:inset-x-auto sm:inset-y-0 sm:left-20 sm:border-x"
	>
		{@render children()}
	</div>
</div>
