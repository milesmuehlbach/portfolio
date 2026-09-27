<script lang="ts">
	import { resolve } from '$app/paths';
	import PageTitle from '$lib/components/page-title.svelte';
	import Seo from '$lib/components/seo.svelte';
	import { formatDate } from '$lib/content';
	import { breadcrumbs } from '$lib/site';

	let { data } = $props();
</script>

<Seo
	title="Projects"
	description="Web, mobile, and desktop software built by Miles Muehlbach, with the stack and source for each project."
	schema={[breadcrumbs({ name: 'Projects', path: '/projects' })]}
/>

<PageTitle title="Projects">
	<p>Things I've built, newest first.</p>
</PageTitle>

{#if data.projects.length}
	<ol class="mt-16 max-w-4xl border-t border-night/25">
		{#each data.projects as project (project.slug)}
			<li class="reveal border-b border-night/25">
				<a
					href={resolve(`/projects/${project.slug}`)}
					class="group grid gap-x-10 gap-y-4 py-8 sm:grid-cols-[1fr_auto]"
				>
					<div>
						<h2
							class="text-[clamp(1.5rem,3vw,2.25rem)] leading-tight font-semibold font-stretch-semi-expanded"
						>
							<span class="ink [--ink:0.06em]">{project.title}</span>
						</h2>
						<p class="mt-2 max-w-xl text-lg text-pretty">{project.summary}</p>
						{#if project.stack.length}
							<p class="mt-4 font-mono text-xs">{project.stack.join(' · ')}</p>
						{/if}
					</div>
					<p class="font-mono text-xs sm:pt-3">
						{#if project.draft}Draft ·{/if}
						<time datetime={project.date}>{formatDate(project.date, 'year')}</time>
					</p>
				</a>
			</li>
		{/each}
	</ol>
{:else}
	<p class="mt-16 text-lg">Nothing published yet.</p>
{/if}
