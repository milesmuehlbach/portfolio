<script lang="ts">
	import { page } from '$app/state';
	import { OG_IMAGE, PERSON, SITE_NAME, SITE_URL, absoluteUrl } from '$lib/site';

	let {
		title,
		description,
		image,
		type = 'website',
		published,
		modified,
		noindex = false,
		schema = []
	}: {
		/** Page-specific title; the site name is appended. Omit on the home page. */
		title?: string;
		description: string;
		/** Share image path or URL. Defaults to the site-wide image. */
		image?: string;
		type?: 'website' | 'article' | 'profile';
		published?: string;
		modified?: string;
		noindex?: boolean;
		/** Extra schema.org nodes for this page. The WebSite and Person are always included. */
		schema?: Record<string, unknown>[];
	} = $props();

	const fullTitle = $derived(
		title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} · Full-stack developer`
	);
	// Built from SITE_URL rather than page.url, which is a placeholder origin while prerendering.
	const canonical = $derived(absoluteUrl(page.url.pathname));
	const imageUrl = $derived(absoluteUrl(image ?? OG_IMAGE.src));

	const jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'WebSite',
					'@id': `${SITE_URL}/#website`,
					url: SITE_URL,
					name: SITE_NAME,
					author: { '@id': PERSON['@id'] }
				},
				PERSON,
				...schema
			]
		})
			// Keep a closing script tag inside any string from ending the element early.
			.replaceAll('<', '\\u003c')
	);
	// Assembled in pieces because a literal closing tag would end this <script> block.
	const jsonLdTag = $derived(`<script type="application/ld+json">${jsonLd}<${'/'}script>`);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#if noindex}
		<meta name="robots" content="noindex, follow" />
	{/if}

	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content={title ?? SITE_NAME} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={imageUrl} />
	{#if !image}
		<meta property="og:image:width" content={String(OG_IMAGE.width)} />
		<meta property="og:image:height" content={String(OG_IMAGE.height)} />
	{/if}
	{#if published}
		<meta property="article:published_time" content={published} />
	{/if}
	{#if modified}
		<meta property="article:modified_time" content={modified} />
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title ?? SITE_NAME} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -- serialized JSON with `<` escaped -->
	{@html jsonLdTag}
</svelte:head>
