<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Horizon from '$lib/components/horizon.svelte';
	import { SITE_NAME } from '$lib/site';

	const notFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{notFound ? 'Page not found' : 'Something went wrong'} · {SITE_NAME}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="flex min-h-svh flex-col">
	<main class="flex flex-1 flex-col justify-end px-6 pt-12 pb-10 sm:px-10 lg:px-16">
		<p class="font-mono text-xs">Error {page.status}</p>
		<h1
			class="mt-4 text-[clamp(2.75rem,8vw,6rem)] leading-[0.92] font-bold tracking-[-0.03em] text-balance text-cloud font-stretch-expanded"
		>
			{notFound ? 'Nothing at this address' : 'This page failed to load'}
		</h1>
		<p class="mt-6 max-w-xl text-xl leading-snug">
			{notFound
				? 'The link may be old, or the address may have a typo.'
				: (page.error?.message ?? 'Try again in a moment.')}
			<a
				href={resolve('/')}
				class="font-semibold underline decoration-1 underline-offset-4 hover:decoration-2"
			>
				Go to the home page
			</a>
		</p>
	</main>
	<Horizon class="h-[clamp(12rem,36svh,32rem)]" />
	<div class="h-10 bg-linear-to-b from-[#393e46] to-river"></div>
</div>
