<script lang="ts">
	import { resolve } from '$app/paths';
	import PageTitle from '$lib/components/page-title.svelte';
	import Seo from '$lib/components/seo.svelte';
	import { formatDate } from '$lib/content';
	import { breadcrumbs } from '$lib/site';

	let { data } = $props();
</script>

<!-- An empty index is thin content, so it stays out of search until the first post. -->
<Seo
	title="Blog"
	description="Writing by Miles Muehlbach about building software: what worked, what didn't, and what I learned."
	noindex={!data.posts.length}
	schema={[breadcrumbs({ name: 'Blog', path: '/blog' })]}
/>

<PageTitle title="Blog">
	<p>Notes on what I'm building and learning.</p>
</PageTitle>

{#if data.posts.length}
	<ol class="mt-16 max-w-4xl border-t border-night/25">
		{#each data.posts as post (post.slug)}
			<li class="border-b border-night/25">
				<a
					href={resolve(`/blog/${post.slug}`)}
					class="group grid gap-x-10 gap-y-2 py-7 sm:grid-cols-[8rem_1fr]"
				>
					<p class="font-mono text-xs sm:pt-2">
						{#if post.draft}Draft ·{/if}
						<time datetime={post.date}>{formatDate(post.date)}</time>
					</p>
					<div>
						<h2
							class="text-[clamp(1.375rem,2.6vw,1.875rem)] leading-tight font-semibold font-stretch-semi-expanded underline-offset-[0.15em] group-hover:underline"
						>
							{post.title}
						</h2>
						<p class="mt-2 max-w-xl text-lg text-pretty">{post.summary}</p>
					</div>
				</a>
			</li>
		{/each}
	</ol>
{:else}
	<p class="mt-16 text-lg">No posts yet.</p>
{/if}
