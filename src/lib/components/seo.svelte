<script lang="ts">
	import { SITE_NAME, SITE_URL } from '$lib/site';

	let {
		title,
		description,
		path = '/'
	}: {
		title: string;
		description: string;
		path?: string;
	} = $props();

	const canonical = $derived(`${SITE_URL}${path}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>
