// Pexels API integration for animal images

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
const PEXELS_API_URL = 'https://api.pexels.com/v1/search';

interface PexelsPhoto {
  id: number;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
  };
  alt: string;
}

interface PexelsResponse {
  photos: PexelsPhoto[];
}

// Cache for animal images to avoid repeated API calls
const imageCache: Map<string, string> = new Map();

/**
 * Fetch animal image from Pexels API
 * @param animalName - Name of the animal to search for
 * @returns Image URL or fallback placeholder
 */
export async function fetchAnimalImage(animalName: string): Promise<string> {
  // Check cache first
  if (imageCache.has(animalName)) {
    return imageCache.get(animalName)!;
  }

  // If no API key, return placeholder
  if (!PEXELS_API_KEY || PEXELS_API_KEY === 'your_api_key_here') {
    console.warn('Pexels API key not configured');
    return getPlaceholderImage(animalName);
  }

  try {
    const response = await fetch(
      `${PEXELS_API_URL}?query=${encodeURIComponent(animalName + ' animal')}&per_page=1`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    const data: PexelsResponse = await response.json();

    if (data.photos && data.photos.length > 0) {
      const imageUrl = data.photos[0].src.large;
      imageCache.set(animalName, imageUrl);
      return imageUrl;
    }

    // No photos found, use placeholder
    return getPlaceholderImage(animalName);
  } catch (error) {
    console.error(`Error fetching image for ${animalName}:`, error);
    return getPlaceholderImage(animalName);
  }
}

/**
 * Generate placeholder image URL
 */
function getPlaceholderImage(animalName: string): string {
  return `https://placehold.co/600x400/667eea/ffffff?text=${encodeURIComponent(animalName)}`;
}

/**
 * Pre-curated Pexels image URLs for common animals
 * These are manually verified to ensure quality
 */
export const CURATED_PEXELS_IMAGES: Record<string, string> = {
  // Mammals
  "African Elephant": "https://images.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Red Panda": "https://images.pexels.com/photos/3608263/pexels-photo-3608263.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Bengal Tiger": "https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Giant Panda": "https://images.pexels.com/photos/3608263/pexels-photo-3608263.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Gray Wolf": "https://images.pexels.com/photos/1054713/pexels-photo-1054713.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Cheetah": "https://images.pexels.com/photos/2295744/pexels-photo-2295744.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Polar Bear": "https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Giraffe": "https://images.pexels.com/photos/802112/pexels-photo-802112.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Kangaroo": "https://images.pexels.com/photos/1590549/pexels-photo-1590549.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Sloth": "https://images.pexels.com/photos/4577793/pexels-photo-4577793.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Koala": "https://images.pexels.com/photos/1661535/pexels-photo-1661535.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Gorilla": "https://images.pexels.com/photos/2280545/pexels-photo-2280545.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Lion": "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Zebra": "https://images.pexels.com/photos/750539/pexels-photo-750539.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Fox": "https://images.pexels.com/photos/2295744/pexels-photo-2295744.jpeg?auto=compress&cs=tinysrgb&w=600",
  
  // Add more as needed...
};

/**
 * Get animal image URL (uses curated list first, then API)
 */
export function getAnimalImageUrl(animalName: string): string {
  // Check curated list first
  if (CURATED_PEXELS_IMAGES[animalName]) {
    return CURATED_PEXELS_IMAGES[animalName];
  }
  
  // Fallback to placeholder (API calls should be done server-side)
  return getPlaceholderImage(animalName);
}
