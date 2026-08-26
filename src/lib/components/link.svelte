<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { ArrowUpRight } from '@lucide/svelte';

	let { children, ...attributes }: HTMLAnchorAttributes & { children?: Snippet } = $props();
</script>

<a
	{...attributes}
	class="group flex items-center justify-between gap-4 border-t border-white/10 py-3
	       text-xs font-medium text-neutral-400
	       transition-colors duration-300 first:border-t-0
	       hover:text-amber-200 focus-visible:text-amber-200 focus-visible:outline-none"
>
	<span>{@render children?.()}</span>
	<ArrowUpRight
		class="size-3.5 -translate-x-1.5 text-amber-200 opacity-0 transition-all duration-300 ease-out
		       group-hover:translate-x-0 group-hover:opacity-100
		       group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
	/>
</a>
