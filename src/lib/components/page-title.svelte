<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, children }: { title: string; children?: Snippet } = $props();
</script>

<header class="max-w-3xl">
	<h1
		class="animate-rise text-[clamp(2.75rem,8vw,6rem)] leading-[0.92] font-bold tracking-[-0.03em] text-balance text-cloud font-stretch-expanded"
	>
		{title}
	</h1>
	{#if children}
		<div
			class="animate-rise mt-6 max-w-xl text-xl leading-snug text-pretty [animation-delay:120ms]"
		>
			{@render children()}
		</div>
	{/if}
</header>
