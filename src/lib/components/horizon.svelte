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
	The photo spans the full width. Give the band a height of at least
	56.25vw (the photo's aspect ratio) so it is never cropped vertically and the
	spire always survives; narrower screens crop the sides around the spire
	instead. Its sky fades into the page above and its water into the river
	below. As the band scrolls past, the photo drifts slower than the page, and
	a non-priority band turns its lights on as it comes into view.
-->
<div {...attributes} class={['horizon relative overflow-hidden', className]}>
	<div class="drift absolute inset-0">
		<enhanced:img
			src={skyline}
			{alt}
			sizes="(orientation: portrait) 250vw, 100vw"
			loading={priority ? 'eager' : 'lazy'}
			fetchpriority={priority ? 'high' : 'auto'}
			class={['skyline', priority ? 'animate-lights-on' : 'lights-on-in-view']}
			draggable="false"
		/>
	</div>
</div>

<style>
	.horizon {
		view-timeline: --horizon block;
		/* Shown while the photo loads. Sampled from the photo row by row; the
		   waterline sits at 81% of the band. */
		background: linear-gradient(
			#5892b7 0%,
			#5d89a8 30%,
			#62778d 60%,
			#66768e 80.5%,
			#434851 81%,
			#393e46 100%
		);
		/* The sky dissolves into the page: text scrolled under it fades out
		   behind the city rather than cutting off at an edge. */
		mask-image: linear-gradient(transparent 4%, #000 26%);

		/* The water runs into the river-colored strip below the band. */
		&::after {
			content: '';
			position: absolute;
			inset: auto 0 0;
			height: 12%;
			background: linear-gradient(transparent, #393e46);
			pointer-events: none;
		}
	}

	.skyline {
		width: 100%;
		max-width: none;
		height: 100%;
		object-fit: cover;
		/* Keeps One World Trade Center centered when the sides are cropped. */
		object-position: 51% 50%;
		user-select: none;
	}

	@media (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: view()) {
			/* Scaled up just enough that the drift never uncovers an edge. */
			.drift {
				scale: 1.1;
				animation: drift linear both;
				animation-timeline: --horizon;
			}

			/* Gentler than the load-time lights-on, so the dimmed sky never
			   stands out against the page above it. */
			.lights-on-in-view {
				animation: dusk-falls linear both;
				animation-timeline: --horizon;
				/* Complete once the band is fully in view, which the end of the
				   page always reaches. */
				animation-range: entry 0% entry 100%;
			}
		}
	}

	@keyframes dusk-falls {
		from {
			filter: brightness(0.7) saturate(0.75);
			scale: 1.05;
		}
	}

	@keyframes drift {
		from {
			translate: 0 -5%;
		}
		to {
			translate: 0 5%;
		}
	}
</style>
