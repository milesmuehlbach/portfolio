<script lang="ts">
	import { Mail } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import Horizon from '$lib/components/horizon.svelte';
	import GithubIcon from '$lib/components/icons/github-icon.svelte';
	import LinkedinIcon from '$lib/components/icons/linkedin-icon.svelte';
	import SiteNav from '$lib/components/site-nav.svelte';
	import { EMAIL, PROFILES, SITE_NAME } from '$lib/site';

	let { children } = $props();

	const year = new Date().getFullYear();

	// Both icon sets share a 24x24 viewBox, so they mix in one map.
	const icons = { github: GithubIcon, linkedin: LinkedinIcon };
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
		<a
			href={resolve('/')}
			class="text-lg font-bold tracking-[-0.02em] font-stretch-expanded [view-transition-name:site-name]"
		>
			{SITE_NAME}
		</a>
		<SiteNav />
	</header>

	<main id="main" class="flex-1 px-6 pt-16 pb-24 sm:px-10 sm:pt-24 lg:px-16">
		{@render children()}
	</main>

	<footer>
		<Horizon class="h-[max(56.25vw,22rem)]" />
		<div
			class="flex flex-col gap-4 bg-linear-to-b from-[#393e46] to-river px-6 pt-4 pb-10 text-sm text-mist sm:flex-row sm:items-baseline sm:justify-between sm:px-10 lg:px-16"
		>
			<p>© {year} {SITE_NAME}</p>
			<ul class="flex flex-wrap items-center gap-1 text-cloud">
				<li>
					<a
						href="mailto:{EMAIL}"
						aria-label="Email"
						class="block rounded-full p-2 opacity-80 transition-opacity hover:opacity-100"
					>
						<Mail class="size-4.5" aria-hidden="true" />
					</a>
				</li>
				{#each PROFILES as profile (profile.href)}
					{@const Icon = icons[profile.icon]}
					<li>
						<a
							href={profile.href}
							rel="me external"
							aria-label={profile.label}
							class="block rounded-full p-2 opacity-80 transition-opacity hover:opacity-100"
						>
							<Icon class="size-4.5" />
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</footer>
</div>
