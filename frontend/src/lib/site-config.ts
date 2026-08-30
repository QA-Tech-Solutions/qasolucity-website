// Single source of truth for the site's canonical public URL. Vercel
// redirects the bare qasolucity.com domain to www.qasolucity.com, so www
// is what Google should see everywhere: sitemap entries, canonical tags
// (via metadataBase in app/layout.tsx, which every page's relative
// `alternates.canonical` resolves against), structured data, and links
// inside emails. Update this one constant if that ever changes, rather
// than the many places that used to hardcode the domain individually.
export const SITE_URL = "https://www.qasolucity.com";
