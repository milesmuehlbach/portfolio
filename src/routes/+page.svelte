<script lang="ts">
	import Link from '$lib/components/link.svelte';
	import Seo from '$lib/components/seo.svelte';

	const nav = [
		{ href: '/about', label: 'about' },
		{ href: '/projects', label: 'projects' },
		{ href: '/blog', label: 'blog' },
		{ href: '/contact', label: 'contact me' }
	];
</script>

<Seo
	title="Miles Muehlbach"
	description="building software for humans"
	path="/"
/>
<div class="flex h-full flex-col items-start justify-center px-6 sm:px-10">
	<div class="animate-content-in flex flex-col items-start gap-5">
		<div class="flex flex-col gap-1">
			<p class="font-sans text-2xl font-semibold text-neutral-300">Miles Muehlbach</p>
			<p class="text-sm text-neutral-400">building software for humans</p>
		</div>
		<div class="flex w-full flex-col">
			{#each nav as item, i (item.label)}
				<Link href={item.href} class="animate-content-in" style="animation-delay: {100 + i * 70}ms">
					{item.label}
				</Link>
			{/each}
		</div>
	</div>
</div>
