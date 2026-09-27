<script lang="ts">
	import { ArrowLeft } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import PageTitle from '$lib/components/page-title.svelte';
	import Seo from '$lib/components/seo.svelte';
	import { formatDate, lastModified } from '$lib/content';
	import { OG_IMAGE, PERSON, absoluteUrl, breadcrumbs } from '$lib/site';

	let { data } = $props();

	const post = $derived(data.post);
	const Body = $derived(post.Body);
	const path = $derived(resolve(`/blog/${post.slug}`));
</script>

<Seo
	title={post.title}
	description={post.summary}
	image={post.cover?.img.src}
	type="article"
	published={post.date}
	modified={post.updated}
	schema={[
		{
			'@type': 'BlogPosting',
			headline: post.title,
			description: post.summary,
			url: absoluteUrl(path),
			mainEntityOfPage: absoluteUrl(path),
			author: { '@id': PERSON['@id'] },
			datePublished: post.date,
			dateModified: lastModified(post),
			image: absoluteUrl(post.cover?.img.src ?? OG_IMAGE.src),
			...(post.tags.length && { keywords: post.tags.join(', ') })
		},
		breadcrumbs({ name: 'Blog', path: '/blog' }, { name: post.title, path })
	]}
/>

<article>
	<a href={resolve('/blog')} class="group mb-10 inline-flex items-center gap-2 font-mono text-xs">
		<ArrowLeft
			class="size-3.5 transition-transform duration-300 ease-out-soft group-hover:-translate-x-1"
			aria-hidden="true"
		/>
		<span class="ink [--ink:1px]">All posts</span>
	</a>

	<PageTitle title={post.title}>
		<p>{post.summary}</p>
	</PageTitle>

	<p class="mt-8 font-mono text-xs">
		<time datetime={post.date}>{formatDate(post.date)}</time>
		{#if post.updated}
			· Updated <time datetime={post.updated}>{formatDate(post.updated)}</time>
		{/if}
	</p>

	{#if post.cover}
		<enhanced:img
			src={post.cover}
			alt={post.coverAlt}
			sizes="(min-width: 64rem) 56rem, 100vw"
			class="mt-12 h-auto w-full max-w-4xl rounded-sm"
		/>
	{/if}

	<div class="prose-dusk prose mt-12 max-w-2xl">
		<Body />
	</div>
</article>
