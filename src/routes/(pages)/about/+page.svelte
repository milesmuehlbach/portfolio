<script lang="ts">
	import { resolve } from '$app/paths';
	import PageTitle from '$lib/components/page-title.svelte';
	import Seo from '$lib/components/seo.svelte';
	import { PERSON, SITE_URL, absoluteUrl } from '$lib/site';

	const toolkit = [
		{
			heading: 'Languages',
			items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'Kotlin', 'C', 'C++', 'SQL']
		},
		{
			heading: 'Frameworks and tools',
			items: [
				'SvelteKit',
				'React',
				'React Native',
				'Tauri',
				'FastAPI',
				'Tailwind CSS',
				'PostgreSQL'
			]
		}
	];
</script>

<Seo
	title="About"
	description="Miles Muehlbach is a high school student who builds full-stack apps with SvelteKit, React Native, Tauri, FastAPI, and PostgreSQL."
	type="profile"
	schema={[
		{
			'@type': 'ProfilePage',
			url: absoluteUrl('/about'),
			mainEntity: { '@id': PERSON['@id'] },
			isPartOf: { '@id': `${SITE_URL}/#website` }
		}
	]}
/>

<PageTitle title="About">
	<p>
		I'm Miles Muehlbach, a high school student who builds full-stack applications, from the database
		schema to the interface people use.
	</p>
</PageTitle>

<section aria-labelledby="toolkit" class="mt-20 max-w-3xl">
	<h2 id="toolkit" class="text-2xl font-semibold font-stretch-semi-expanded">What I work with</h2>
	<div class="mt-6 grid gap-10 sm:grid-cols-2">
		{#each toolkit as group (group.heading)}
			<div>
				<h3 class="border-b border-night/25 pb-2 font-mono text-xs">{group.heading}</h3>
				<ul class="mt-3 columns-2 gap-6 text-lg leading-[1.9] sm:columns-1">
					{#each group.items as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

<p class="mt-20 max-w-xl text-lg">
	See what I've built on the <a
		href={resolve('/projects')}
		class="underline decoration-1 underline-offset-4 hover:decoration-2">projects page</a
	>, or
	<a href={resolve('/contact')} class="underline decoration-1 underline-offset-4 hover:decoration-2"
		>get in touch</a
	>.
</p>
