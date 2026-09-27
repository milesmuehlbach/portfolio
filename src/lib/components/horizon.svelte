<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import skyline from '$lib/assets/skyline.jpg?enhanced';

	let {
		alt = '',
		priority = false,
		class: className,
		...attributes
	}: HTMLAttributes<HTMLDivElement> & {
		/** Leave empty where the photo is decoration rather than content. */
		alt?: string;
		/** Load immediately with high priority (for an above-the-fold horizon). */
		priority?: boolean;
	} = $props();
</script>

<!--
	The photo is scaled to the band's height, never cropped vertically, so the
	spire always survives. On screens wider than the photo its edges dissolve
	into a gradient that continues its sky and water; on narrow screens the
	sides are cropped instead. Set the band's height with `class`.
-->
<div {...attributes} class={['horizon relative overflow-hidden', className]}>
	<enhanced:img
		src={skyline}
		{alt}
		sizes="(orientation: portrait) 180vw, 100vw"
		loading={priority ? 'eager' : 'lazy'}
		fetchpriority={priority ? 'high' : 'auto'}
		class={['skyline', priority && 'animate-lights-on']}
		draggable="false"
	/>
</div>

<style>
	.horizon {
		/* Sampled from the photo's left and right edges, row by row. The
		   waterline sits at 81% of the band. */
		background: linear-gradient(
			var(--color-dusk) 0%,
			#5d89a8 30%,
			#62778d 60%,
			#66768e 80.5%,
			#434851 81%,
			#393e46 100%
		);
	}

	.skyline {
		position: absolute;
		top: 0;
		left: 50%;
		width: auto;
		max-width: none;
		height: 100%;
		translate: -50% 0;
		mask-image:
			linear-gradient(to right, transparent, #000 20%, #000 80%, transparent),
			linear-gradient(transparent, #000 12%, #000 86%, transparent);
		mask-composite: intersect;
		user-select: none;
	}
</style>
