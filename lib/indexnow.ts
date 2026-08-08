import { CORE_SITE_ROUTES, SITE_URL } from '@/lib/site';

export const INDEXNOW_KEY = 'd9b6e4a1-6f7b-4b0c-9f3d-8f1a2c7b5e91';
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

type SubmitIndexNowInput = {
  urls: string[];
};

function normalizeUrl(url: string) {
  return url.trim();
}

export function getIndexNowKeyLocation() {
  return `${SITE_URL}/${INDEXNOW_KEY}.txt`;
}

/** All public pages from the shared sitemap route list. */
export function getAllIndexNowUrls() {
  return CORE_SITE_ROUTES.map((route) =>
    route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`,
  );
}

export async function submitToIndexNow({ urls }: SubmitIndexNowInput) {
  const host = new URL(SITE_URL).host;
  const normalizedUrls = Array.from(
    new Set(
      urls
        .map(normalizeUrl)
        .filter(Boolean)
        .filter((url) => url.startsWith(SITE_URL)),
    ),
  );

  if (normalizedUrls.length === 0) {
    throw new Error('No valid URLs were provided for IndexNow submission.');
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: getIndexNowKeyLocation(),
      urlList: normalizedUrls,
    }),
  });

  return {
    ok: response.ok,
    status: response.status,
    text: await response.text(),
    submittedUrls: normalizedUrls,
  };
}

export async function submitAllSiteUrlsToIndexNow() {
  return submitToIndexNow({ urls: getAllIndexNowUrls() });
}
