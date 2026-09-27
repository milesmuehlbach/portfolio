<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import SiteNav from '$lib/components/site-nav.svelte';
	import SkylineStage from '$lib/components/skyline-stage.svelte';
	import { SITE_DESCRIPTION } from '$lib/site';
</script>

<Seo description={SITE_DESCRIPTION} />

<!-- One screen, no scrolling: the photo is the page. The name hangs in the sky
     behind the city, its last line resting on the crown of One World Trade
     Center so the spire cuts through it. -->
<div class="home relative h-svh min-h-[30rem] overflow-hidden bg-river">
	<SkylineStage
		alt="The Lower Manhattan skyline at dusk, lit windows reflected in the Hudson River"
		class="h-full"
	>
		<h1
			class="name absolute leading-[0.86] font-bold tracking-[-0.035em] text-cloud font-stretch-expanded [view-transition-name:site-name]"
		>
			<span class="animate-emerge block [animation-delay:250ms]">Miles</span>
			<span class="animate-emerge block [animation-delay:120ms]">Muehlbach</span>
		</h1>
	</SkylineStage>

	<header class="absolute inset-x-0 top-0 z-10 flex px-6 pt-6 sm:justify-end sm:px-10 lg:px-16">
		<SiteNav class="animate-fade-in text-lg [animation-delay:700ms]" />
	</header>

	<!-- Set on the river, darkened toward the bottom edge so the text holds up
	     over the reflections. -->
	<footer
		class="animate-fade-in absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 bg-linear-to-b from-transparent to-river/85 px-6 pt-16 pb-6 [animation-delay:900ms] sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:px-10 lg:px-16"
	>
		<p class="max-w-sm text-lg leading-snug text-balance text-cloud">
			High school student building full-stack software for the web, phones, and desktop.
		</p>
		<p class="font-mono text-[0.6875rem] text-mist">Lower Manhattan, from across the Hudson</p>
	</footer>
</div>

<style>
	/* A poster, not a document: nothing to scroll, so nothing to bounce. */
	:global(html:has(.home)) {
		overscroll-behavior: none;
	}

	/* The name is sized so both lines fit between the top edge and the crown,
	   then placed so the baseline of the last line sits just below the crown.
	   The photo slides so the spire rises between the "a" and the "c" of
	   "Muehlbach" (78.5% of its 6.26em width), where it hides no letter; wide
	   screens leave it no room to slide, and it lands where it lands. */
	.home :global(.stage) {
		--pad: 1.5rem;
		--name-size: clamp(2.75rem, min(13.5cqw, calc((var(--crown) - 2.5rem) / 1.58)), 12rem);
		--spire-x: calc(var(--pad) + 4.91 * var(--name-size));

		@media (width >= 40rem) {
			--pad: 2.5rem;
		}
		@media (width >= 64rem) {
			--pad: 4rem;
		}
	}

	.name {
		left: var(--pad);
		font-size: var(--name-size);
		top: max(2.5rem, calc(var(--crown) - 1.58em));
	}
</style>
