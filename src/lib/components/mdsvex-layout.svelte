<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ArrowLeft } from '@lucide/svelte';
	import Seo from '$lib/components/seo.svelte';
	import { resolve } from '$app/paths';

	let {
		children,
		title,
		description,
		path = '/',
		backLabel = 'home'
	}: {
		children: Snippet;
		title?: string;
		description?: string;
		path?: string;
		backLabel?: string;
	} = $props();
</script>

{#if title && description}
	<Seo {title} {description} {path} />
{/if}

<div class="h-full overflow-y-auto overscroll-y-contain select-text">
	<main class="animate-content-in min-h-full px-6 pb-16 sm:px-10">
		<header class="flex h-20 items-center justify-between border-b border-white/10">
			<a
				href={resolve('/')}
				class="group inline-flex items-center gap-2 text-xs font-medium text-neutral-400 transition-colors duration-300 hover:text-amber-200 focus-visible:text-amber-200 focus-visible:outline-none"
			>
				<ArrowLeft class="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
				{backLabel}
			</a>
		</header>

		<article class="prose max-w-xl pt-8 pb-20 prose-neutral prose-invert sm:pt-10">
			<div
				class="mdsvex-content text-neutral-300 prose-a:font-semibold prose-a:text-white prose-a:no-underline prose-strong:text-white"
			>
				{@render children()}
			</div>
		</article>
	</main>
</div>

<style>
	:global(.mdsvex-content h1) {
		margin: 0 0 1rem;
		color: var(--color-neutral-100);
		font-size: clamp(2rem, 7vw, 2.75rem);
		font-weight: 600;
		letter-spacing: -0.045em;
		line-height: 1;
	}

	:global(.mdsvex-content h1 + p) {
		max-width: 32rem;
		margin: 0;
		color: var(--color-neutral-300);
		font-size: 1.05rem;
		line-height: 1.65;
	}

	:global(.mdsvex-content h2) {
		margin: 3rem 0 1rem;
		padding-top: 1rem;
		border-top: 1px solid color-mix(in srgb, white 10%, transparent);
		color: var(--color-neutral-200);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		line-height: 1.4;
		text-transform: uppercase;
	}

	:global(.mdsvex-content p) {
		margin: 0 0 1.25rem;
		color: var(--color-neutral-300);
		font-size: 0.9375rem;
		line-height: 1.75;
	}

	:global(.mdsvex-content ul) {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		margin: 1.5rem 0 0;
		padding: 0;
		border-top: 1px solid color-mix(in srgb, white 10%, transparent);
		list-style: none;
		column-gap: 1.5rem;
	}

	:global(.mdsvex-content li) {
		position: relative;
		margin: 0;
		padding: 0.7rem 0 0.7rem 1rem;
		border-bottom: 1px solid color-mix(in srgb, white 8%, transparent);
		color: var(--color-neutral-400);
		font-size: 0.8125rem;
		line-height: 1.4;
	}

	:global(.mdsvex-content li::before) {
		position: absolute;
		top: 1.05rem;
		left: 0;
		width: 0.3rem;
		height: 0.3rem;
		border-radius: 999px;
		background: var(--color-amber-200);
		content: '';
		opacity: 0.65;
	}

	:global(.mdsvex-content a) {
		background-image: linear-gradient(currentColor, currentColor);
		background-position: 0 100%;
		background-repeat: no-repeat;
		background-size: 0 1px;
		transition:
			background-size 300ms cubic-bezier(0.22, 1, 0.36, 1),
			color 200ms ease;
	}

	:global(.mdsvex-content a:hover),
	:global(.mdsvex-content a:focus-visible) {
		background-size: 100% 1px;
		color: var(--color-neutral-200);
	}

	:global(.mdsvex-content .inline-icon-link) {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}

	:global(.mdsvex-content .contact-links) {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}

	:global(.mdsvex-content .inline-icon-link svg) {
		width: 1.05em;
		height: 1.05em;
		flex: none;
	}

	@media (max-width: 30rem) {
		:global(.mdsvex-content ul) {
			grid-template-columns: 1fr;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.mdsvex-content a) {
			transition-duration: 0ms;
		}
	}
</style>
