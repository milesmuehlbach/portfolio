<script lang="ts">
	import { Mail } from '@lucide/svelte';
	import PageTitle from '$lib/components/page-title.svelte';
	import GithubIcon from '$lib/components/icons/github-icon.svelte';
	import LinkedinIcon from '$lib/components/icons/linkedin-icon.svelte';
	import Seo from '$lib/components/seo.svelte';
	import { EMAIL, PROFILES } from '$lib/site';

	const channels = [
		{ label: 'Email', icon: 'mail' as const, handle: EMAIL, href: `mailto:${EMAIL}` },
		...PROFILES
	];

	// Both icon sets share a 24x24 viewBox, so they mix in one map.
	const icons = { mail: Mail, github: GithubIcon, linkedin: LinkedinIcon };
</script>

<Seo title="Contact" description="How to reach Miles Muehlbach: email, GitHub, and LinkedIn." />

<PageTitle title="Contact">
	<p>Reach me by email, or find me on GitHub and LinkedIn.</p>
</PageTitle>

<ul class="mt-16 max-w-3xl border-t border-night/25">
	{#each channels as channel (channel.href)}
		{@const Icon = icons[channel.icon]}
		<li class="reveal border-b border-night/25">
			<a href={channel.href} rel="me external" class="group flex items-center gap-5 py-5 sm:gap-8">
				<span class="sr-only">{channel.label}</span>
				<Icon class="size-6 shrink-0 sm:size-7" aria-hidden="true" />
				<span
					class="text-[clamp(1.25rem,3.2vw,2rem)] font-semibold break-all font-stretch-semi-expanded"
				>
					<span class="ink [--ink:0.06em]">{channel.handle}</span>
				</span>
			</a>
		</li>
	{/each}
</ul>
