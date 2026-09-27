export const SITE_URL = 'https://milesmuehlbach.com';
export const SITE_NAME = 'Miles Muehlbach';
export const SITE_DESCRIPTION =
	'Miles Muehlbach is a high school student and full-stack developer building apps for the web, phones, and desktop with SvelteKit, React Native, Tauri, and TypeScript.';

export const EMAIL = 'miles@milesmuehlbach.com';

export const PROFILES = [
	{
		label: 'GitHub',
		icon: 'github',
		handle: '@milesmuehlbach',
		href: 'https://github.com/milesmuehlbach'
	},
	{
		label: 'LinkedIn',
		icon: 'linkedin',
		handle: 'Miles Muehlbach',
		href: 'https://www.linkedin.com/in/miles-muehlbach-48679b307/'
	}
] satisfies { label: string; icon: 'github' | 'linkedin'; handle: string; href: string }[];

/** Default social preview image, served from `static/`. */
export const OG_IMAGE = { src: '/og.png', width: 1200, height: 630 };

export function absoluteUrl(path: string) {
	return new URL(path, SITE_URL).href;
}

/** schema.org Person, shared by every page's structured data. */
export const PERSON = {
	'@type': 'Person',
	'@id': `${SITE_URL}/#person`,
	name: SITE_NAME,
	url: SITE_URL,
	email: `mailto:${EMAIL}`,
	jobTitle: 'Full-stack developer',
	sameAs: PROFILES.map((profile) => profile.href),
	knowsAbout: [
		'SvelteKit',
		'React Native',
		'Tauri',
		'TypeScript',
		'Python',
		'FastAPI',
		'PostgreSQL',
		'Kotlin'
	]
};

/** schema.org BreadcrumbList from the home page down to the current page. */
export function breadcrumbs(...trail: { name: string; path: string }[]) {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((crumb, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: crumb.name,
			item: absoluteUrl(crumb.path)
		}))
	};
}
