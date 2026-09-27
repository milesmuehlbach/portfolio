// Every page is static, so the whole site is rendered to HTML at build time
// and ships without JavaScript: crawlers and people get the complete page on
// the first response. Page transitions are CSS (`@view-transition` in
// layout.css) and links are prefetched by the speculation rules in app.html.
//
// A future page that needs interactivity can opt back in with
// `export const csr = true` in its own +page.ts.
export const prerender = true;
export const csr = false;
