import { error } from '@sveltejs/kit';
import { projects } from '$lib/content';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => projects.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const project = projects.find(({ slug }) => slug === params.slug);
	if (!project) error(404, 'There is no project at this address.');

	return { project };
};
