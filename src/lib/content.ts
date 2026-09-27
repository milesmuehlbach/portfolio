// Content collections: one folder per entry under src/content/<collection>/.
//
//   src/content/projects/my-app/index.md    frontmatter + markdown body
//   src/content/projects/my-app/cover.png   optional, used on the page and as the share image
//
// The folder name is the URL slug. Folders starting with `_` (like `_template`)
// are ignored. Frontmatter is validated when the site builds, so a missing or
// malformed field fails the build with the file path instead of shipping a
// broken page.
import type { Component } from 'svelte';
import type { Picture } from '@sveltejs/enhanced-img';

type Frontmatter = Record<string, unknown>;
type Module = { default: Component; metadata?: Frontmatter };

interface Entry {
	slug: string;
	title: string;
	summary: string;
	/** ISO date, `YYYY-MM-DD`. */
	date: string;
	updated?: string;
	draft: boolean;
	cover?: Picture;
	coverAlt?: string;
	/** The rendered markdown. */
	Body: Component;
}

export interface Project extends Entry {
	stack: string[];
	url?: string;
	repo?: string;
}

export interface Post extends Entry {
	tags: string[];
}

// The site ships without client JavaScript (see src/routes/+layout.ts), so
// importing every entry eagerly only affects the build, not what visitors load.
const projectModules = import.meta.glob<Module>(
	['/src/content/projects/*/index.{md,svx}', '!/src/content/projects/_*/**'],
	{ eager: true }
);
const projectCovers = import.meta.glob<Picture>(
	'/src/content/projects/*/cover.{avif,jpeg,jpg,png,webp}',
	{ eager: true, import: 'default', query: { enhanced: true } }
);

const postModules = import.meta.glob<Module>(
	['/src/content/posts/*/index.{md,svx}', '!/src/content/posts/_*/**'],
	{ eager: true }
);
const postCovers = import.meta.glob<Picture>(
	'/src/content/posts/*/cover.{avif,jpeg,jpg,png,webp}',
	{
		eager: true,
		import: 'default',
		query: { enhanced: true }
	}
);

export const projects: Project[] = collect(projectModules, projectCovers, (read) => ({
	stack: read.list('stack'),
	url: read.url('url'),
	repo: read.url('repo')
}));

export const posts: Post[] = collect(postModules, postCovers, (read) => ({
	tags: read.list('tags')
}));

/** The date search engines should see as the last change. */
export function lastModified(entry: Entry) {
	return entry.updated ?? entry.date;
}

export function formatDate(date: string, precision: 'year' | 'month' | 'day' = 'day') {
	return new Intl.DateTimeFormat('en-US', {
		timeZone: 'UTC',
		year: 'numeric',
		month: precision === 'year' ? undefined : 'short',
		day: precision === 'day' ? 'numeric' : undefined
	}).format(new Date(date));
}

function slugOf(path: string) {
	return path.split('/').at(-2) as string;
}

function collect<T extends Entry>(
	modules: Record<string, Module>,
	covers: Record<string, Picture>,
	extra: (read: Reader) => Omit<T, keyof Entry>
): T[] {
	const coverBySlug = new Map(Object.entries(covers).map(([path, cover]) => [slugOf(path), cover]));
	const seen = new Set<string>();

	return Object.entries(modules)
		.map(([path, { default: Body, metadata = {} }]) => {
			const slug = slugOf(path);
			if (seen.has(slug)) throw new Error(`${path}: another index file already uses "${slug}"`);
			seen.add(slug);

			const read = reader(path, metadata);
			const cover = coverBySlug.get(slug);
			return {
				slug,
				title: read.text('title', 'the page heading and <title>'),
				summary: read.text('summary', 'one sentence shown in lists and search results'),
				date: read.date('date', 'when it shipped or was published, YYYY-MM-DD'),
				updated: read.optionalDate('updated'),
				draft: read.flag('draft'),
				Body,
				cover,
				coverAlt: cover
					? read.text('coverAlt', 'describes cover image for screen readers and image search')
					: undefined,
				...extra(read)
			} as T;
		})
		.filter((entry) => import.meta.env.DEV || !entry.draft)
		.sort((a, b) => b.date.localeCompare(a.date));
}

type Reader = ReturnType<typeof reader>;

function reader(path: string, frontmatter: Frontmatter) {
	const fail = (message: string): never => {
		throw new Error(`${path}: ${message}`);
	};

	const toDate = (key: string) => {
		const value = frontmatter[key];
		if (value === undefined) return undefined;
		// YAML parses unquoted dates into Date objects, which mdsvex serializes to ISO strings.
		const iso = value instanceof Date ? value.toISOString() : value;
		if (typeof iso !== 'string' || !/^\d{4}-\d{2}-\d{2}/.test(iso) || isNaN(Date.parse(iso))) {
			fail(`\`${key}\` must be a date like 2026-09-27`);
		}
		return (iso as string).slice(0, 10);
	};

	return {
		text(key: string, purpose: string) {
			const value = frontmatter[key];
			if (typeof value !== 'string' || !value.trim()) fail(`\`${key}\` is required: ${purpose}`);
			return (value as string).trim();
		},
		date(key: string, purpose: string) {
			return toDate(key) ?? fail(`\`${key}\` is required: ${purpose}`);
		},
		optionalDate: toDate,
		flag(key: string) {
			const value = frontmatter[key] ?? false;
			if (typeof value !== 'boolean') fail(`\`${key}\` must be true or false`);
			return value as boolean;
		},
		list(key: string) {
			const value = frontmatter[key] ?? [];
			if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
				fail(`\`${key}\` must be a list of strings`);
			}
			return value as string[];
		},
		url(key: string) {
			const value = frontmatter[key];
			if (value === undefined) return undefined;
			if (typeof value !== 'string' || !URL.canParse(value)) fail(`\`${key}\` must be a full URL`);
			return value as string;
		}
	};
}
