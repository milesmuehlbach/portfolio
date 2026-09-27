<script lang="ts">
	import PageTitle from '$lib/components/page-title.svelte';
	import Seo from '$lib/components/seo.svelte';
	import { EMAIL, PROFILES } from '$lib/site';

	const channels = [{ label: 'Email', handle: EMAIL, href: `mailto:${EMAIL}` }, ...PROFILES];
</script>

<Seo title="Contact" description="How to reach Miles Muehlbach: email, GitHub, and LinkedIn." />

<PageTitle title="Contact">
	<p>Reach me by email, or find me on GitHub and LinkedIn.</p>
</PageTitle>

<ul class="mt-16 max-w-3xl border-t border-night/25">
	{#each channels as channel (channel.href)}
		<li class="border-b border-night/25">
			<a
				href={channel.href}
				rel="me external"
				class="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-8"
			>
				<span class="w-24 shrink-0 font-mono text-xs">{channel.label}</span>
				<span
					class="text-[clamp(1.25rem,3.2vw,2rem)] font-semibold break-all font-stretch-semi-expanded underline-offset-[0.2em] group-hover:underline"
				>
					{channel.handle}
				</span>
			</a>
		</li>
	{/each}
</ul>
