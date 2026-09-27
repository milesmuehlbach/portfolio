<script lang="ts">
	import { ArrowLeft, ArrowUpRight } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import PageTitle from '$lib/components/page-title.svelte';
	import Seo from '$lib/components/seo.svelte';
	import { formatDate } from '$lib/content';
	import { PERSON, absoluteUrl, breadcrumbs } from '$lib/site';

	let { data } = $props();

	const project = $derived(data.project);
	const Body = $derived(project.Body);
	const path = $derived(resolve(`/projects/${project.slug}`));
	const links = $derived(
		[
			project.url && { label: 'Visit the site', href: project.url },
			project.repo && { label: 'Read the source', href: project.repo }
		].filter((link) => !!link)
	);
</script>

<Seo
	title={project.title}
	description={project.summary}
	image={project.cover?.img.src}
	type="article"
	published={project.date}
	modified={project.updated}
	schema={[
		{
			'@type': 'SoftwareSourceCode',
			name: project.title,
			description: project.summary,
			url: absoluteUrl(path),
			author: { '@id': PERSON['@id'] },
			dateCreated: project.date,
			dateModified: project.updated ?? project.date,
			keywords: project.stack.join(', '),
			...(project.repo && { codeRepository: project.repo }),
			...(project.cover && { image: absoluteUrl(project.cover.img.src) })
		},
		breadcrumbs({ name: 'Projects', path: '/projects' }, { name: project.title, path })
	]}
/>

<article>
	<a
		href={resolve('/projects')}
		class="group mb-10 inline-flex items-center gap-2 font-mono text-xs"
	>
		<ArrowLeft
			class="size-3.5 transition-transform duration-300 ease-out-soft group-hover:-translate-x-1"
			aria-hidden="true"
		/>
		<span class="ink [--ink:1px]">All projects</span>
	</a>

	<PageTitle title={project.title}>
		<p>{project.summary}</p>
	</PageTitle>

	<dl
		class="reveal mt-12 grid max-w-3xl grid-cols-[6rem_1fr] gap-x-6 gap-y-4 border-t border-night/25 pt-5 sm:grid-cols-[8rem_1fr]"
	>
		<dt class="pt-1 font-mono text-xs">Shipped</dt>
		<dd><time datetime={project.date}>{formatDate(project.date, 'month')}</time></dd>
		{#if project.stack.length}
			<dt class="pt-1 font-mono text-xs">Built with</dt>
			<dd>{project.stack.join(', ')}</dd>
		{/if}
		{#if links.length}
			<dt class="pt-1 font-mono text-xs">Links</dt>
			<dd class="flex flex-wrap gap-x-6 gap-y-1">
				{#each links as link (link.href)}
					<a
						href={link.href}
						class="inline-flex items-center gap-1 font-semibold underline decoration-1 underline-offset-4 hover:decoration-2"
					>
						{link.label}
						<ArrowUpRight class="size-4" aria-hidden="true" />
					</a>
				{/each}
			</dd>
		{/if}
	</dl>

	{#if project.cover}
		<enhanced:img
			src={project.cover}
			alt={project.coverAlt}
			sizes="(min-width: 64rem) 56rem, 100vw"
			class="reveal mt-12 h-auto w-full max-w-4xl rounded-sm"
		/>
	{/if}

	<div class="prose-dusk prose mt-12 max-w-2xl">
		<Body />
	</div>
</article>
