<script lang="ts">
	import { resolve } from '$app/paths';
	import Horizon from '$lib/components/horizon.svelte';
	import SiteNav from '$lib/components/site-nav.svelte';
	import { EMAIL, PROFILES, SITE_NAME } from '$lib/site';

	let { children } = $props();

	const year = new Date().getFullYear();
</script>

<a
	href="#main"
	class="sr-only z-10 bg-night px-4 py-2 text-cloud focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
>
	Skip to content
</a>

<div class="flex min-h-svh flex-col">
	<header
		class="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 px-6 pt-6 sm:px-10 lg:px-16"
	>
		<a href={resolve('/')} class="text-lg font-bold tracking-[-0.02em] font-stretch-expanded">
			{SITE_NAME}
		</a>
		<SiteNav />
	</header>

	<main id="main" class="flex-1 px-6 pt-16 pb-24 sm:px-10 sm:pt-24 lg:px-16">
		{@render children()}
	</main>

	<footer>
		<Horizon class="h-[clamp(16rem,32vw,30rem)]" />
		<div
			class="flex flex-col gap-4 bg-linear-to-b from-[#393e46] to-river px-6 pt-4 pb-10 text-sm text-mist sm:flex-row sm:items-baseline sm:justify-between sm:px-10 lg:px-16"
		>
			<p>© {year} {SITE_NAME}</p>
			<ul class="flex flex-wrap gap-x-6 gap-y-2 text-cloud">
				<li><a href="mailto:{EMAIL}" class="underline-offset-4 hover:underline">Email</a></li>
				{#each PROFILES as profile (profile.href)}
					<li>
						<a href={profile.href} rel="me external" class="underline-offset-4 hover:underline">
							{profile.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</footer>
</div>
