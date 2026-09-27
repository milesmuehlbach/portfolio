<script lang="ts">
	import Horizon from '$lib/components/horizon.svelte';
	import Seo from '$lib/components/seo.svelte';
	import SiteNav from '$lib/components/site-nav.svelte';
	import { SITE_DESCRIPTION } from '$lib/site';
</script>

<Seo description={SITE_DESCRIPTION} />

<div class="flex min-h-svh flex-col">
	<header
		class="flex flex-1 flex-col justify-end px-6 pt-12 pb-8 sm:px-10 lg:flex-none lg:px-16 lg:pt-14"
	>
		<div class="animate-fade-in">
			<h1
				class="text-[min(14vw,16svh)] leading-[0.86] font-bold tracking-[-0.035em] text-cloud font-stretch-expanded"
			>
				<span class="block">Miles</span>
				<span class="block">Muehlbach</span>
			</h1>
			<div class="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
				<p class="max-w-sm text-lg leading-snug text-balance">
					High school student building full-stack software for the web, phones, and desktop.
				</p>
				<SiteNav class="text-lg" />
			</div>
		</div>
	</header>

	<!-- Below lg the text takes the spare height; from lg up the skyline does, so
	     the page always fits the viewport without scrolling. -->
	<figure class="flex flex-col lg:flex-1">
		<Horizon
			priority
			alt="The Lower Manhattan skyline at dusk, lit windows reflected in the Hudson River"
			class="h-[clamp(12rem,42svh,38rem)] lg:h-auto lg:min-h-56 lg:flex-1"
		/>
		<figcaption
			class="bg-linear-to-b from-[#393e46] to-river px-6 pt-2 pb-5 text-right font-mono text-[0.6875rem] text-mist sm:px-10 lg:px-16"
		>
			Lower Manhattan, from across the Hudson
		</figcaption>
	</figure>
</div>
