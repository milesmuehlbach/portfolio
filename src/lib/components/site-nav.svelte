<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { posts } from '$lib/content';

	let { class: className, ...attributes }: HTMLAttributes<HTMLElement> = $props();

	// The blog link appears once there is something to read.
	const items: { path: '/about' | '/projects' | '/blog' | '/contact'; label: string }[] = [
		{ path: '/about', label: 'About' },
		{ path: '/projects', label: 'Projects' },
		...(posts.length ? [{ path: '/blog', label: 'Blog' } as const] : []),
		{ path: '/contact', label: 'Contact' }
	];

	// Compare route paths, not hrefs: prerendered hrefs from `resolve` are relative.
	function isCurrent(path: string) {
		return page.url.pathname === path || page.url.pathname.startsWith(`${path}/`);
	}
</script>

<!-- Named for view transitions, so it glides between the home hero and the header. -->
<nav aria-label="Main" {...attributes} class={['[view-transition-name:site-nav]', className]}>
	<ul class="flex flex-wrap gap-x-6 gap-y-2">
		{#each items as item (item.path)}
			<li>
				<a
					href={resolve(item.path)}
					aria-current={isCurrent(item.path) ? 'page' : undefined}
					class="ink font-semibold font-stretch-semi-expanded"
				>
					{item.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>
