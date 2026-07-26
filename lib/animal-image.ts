/**
 * Upgrade CDN image URLs for sharper display / lightbox.
 * iNaturalist: large (~1024) → original for full-screen viewing.
 */
export function getAnimalImageUrl(
  imageUrl: string,
  size: 'display' | 'lightbox' = 'display',
): string {
  if (!imageUrl) return imageUrl;

  try {
    const url = new URL(imageUrl);
    const host = url.hostname;

    if (
      host === 'inaturalist-open-data.s3.amazonaws.com' ||
      host === 'static.inaturalist.org'
    ) {
      if (size === 'lightbox') {
        return imageUrl.replace(/\/(square|thumb|small|medium|large)\./, '/original.');
      }
      // Prefer large for cards; bump medium/small if present
      return imageUrl.replace(/\/(square|thumb|small|medium)\./, '/large.');
    }

    if (host === 'images.unsplash.com') {
      const width = size === 'lightbox' ? '1600' : '1200';
      url.searchParams.set('w', width);
      url.searchParams.set('q', '85');
      url.searchParams.set('auto', 'format');
      return url.toString();
    }

    if (host === 'images.pexels.com') {
      url.searchParams.set('auto', 'compress');
      url.searchParams.set('cs', 'tinysrgb');
      url.searchParams.set('w', size === 'lightbox' ? '1600' : '1200');
      return url.toString();
    }
  } catch {
    return imageUrl;
  }

  return imageUrl;
}
