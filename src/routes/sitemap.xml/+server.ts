import { lastModified, posts, projects } from '$lib/content';
import { absoluteUrl } from '$lib/site';
import type { RequestHandler } from './$types';

export const prerender = true;

type Url = { path: string; lastmod?: string };

const newest = (entries: typeof projects | typeof posts) => entries.map(lastModified).sort().at(-1);

const urls: Url[] = [
	{ path: '/' },
	{ path: '/about' },
	{ path: '/projects', lastmod: newest(projects) },
	...projects.map((project) => ({
		path: `/projects/${project.slug}`,
		lastmod: lastModified(project)
	})),
	// The blog index is noindexed until it has posts, so it is listed only then.
	...(posts.length ? [{ path: '/blog', lastmod: newest(posts) }] : []),
	...posts.map((post) => ({ path: `/blog/${post.slug}`, lastmod: lastModified(post) })),
	{ path: '/contact' }
];

export const GET: RequestHandler = () => {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(({ path, lastmod }) =>
		[
			'\t<url>',
			`\t\t<loc>${absoluteUrl(path)}</loc>`,
			lastmod && `\t\t<lastmod>${lastmod}</lastmod>`,
			'\t</url>'
		]
			.filter(Boolean)
			.join('\n')
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
};
