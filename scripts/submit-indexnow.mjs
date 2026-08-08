/**
 * Submit all public site URLs to IndexNow.
 * Prefers live sitemap.xml (post-deploy), falls back to known routes.
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs
 *   NEXT_PUBLIC_SITE_URL=https://www.randomanimalgenerator.online node scripts/submit-indexnow.mjs
 */

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.randomanimalgenerator.online'
).replace(/\/$/, '');

const INDEXNOW_KEY = 'd9b6e4a1-6f7b-4b0c-9f3d-8f1a2c7b5e91';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

const FALLBACK_PATHS = [
  '/',
  '/cute-animal-generator',
  '/random-animal-picker',
  '/random-animal-name-generator',
  '/drawing-prompt-generator',
  '/random-animal-generator-wheel',
  '/random-animal-generator-for-drawing',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
];

function pathToUrl(path) {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

async function urlsFromSitemap() {
  const response = await fetch(`${SITE_URL}/sitemap.xml`, {
    headers: { Accept: 'application/xml,text/xml,*/*' },
  });

  if (!response.ok) {
    throw new Error(`sitemap.xml returned ${response.status}`);
  }

  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) =>
    match[1].trim(),
  );

  if (urls.length === 0) {
    throw new Error('sitemap.xml contained no <loc> entries');
  }

  return urls;
}

async function resolveUrls() {
  try {
    const urls = await urlsFromSitemap();
    console.log(`Loaded ${urls.length} URLs from sitemap.xml`);
    return urls;
  } catch (error) {
    console.warn(
      `Sitemap fetch failed (${error instanceof Error ? error.message : error}); using fallback routes.`,
    );
    return FALLBACK_PATHS.map(pathToUrl);
  }
}

async function main() {
  const urlList = Array.from(
    new Set(
      (await resolveUrls()).filter(
        (url) => url === SITE_URL || url.startsWith(`${SITE_URL}/`),
      ),
    ),
  );

  if (urlList.length === 0) {
    throw new Error('No URLs to submit.');
  }

  const host = new URL(SITE_URL).host;
  const keyLocation = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

  console.log(`Submitting ${urlList.length} URLs for ${host}...`);

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation,
      urlList,
    }),
  });

  const text = await response.text();

  console.log(`IndexNow status: ${response.status}`);
  if (text) {
    console.log(text);
  }
  console.log('Submitted:');
  for (const url of urlList) {
    console.log(`  - ${url}`);
  }

  if (!response.ok) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
