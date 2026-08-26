import { SITE_URL } from '$lib/site';
import type { RequestHandler } from './$types';

const routes = ['/', '/about'];

export const GET: RequestHandler = () => {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `\t<url>\n\t\t<loc>${SITE_URL}${route}</loc>\n\t</url>`).join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
};
