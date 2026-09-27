import { error } from '@sveltejs/kit';
import { posts } from '$lib/content';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => posts.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const post = posts.find(({ slug }) => slug === params.slug);
	if (!post) error(404, 'There is no post at this address.');

	return { post };
};
