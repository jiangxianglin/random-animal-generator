// Helper function to generate animal image URLs
// Using Unsplash's random image API with specific search terms

export function getAnimalImageUrl(animalName: string, category: string): string {
  // Unsplash random image API (note: this requires Unsplash API key for production)
  // For now, using placeholder service
  const searchTerm = animalName.toLowerCase().replace(/\s+/g, '-');
  
  // Using a reliable placeholder service
  return `https://placehold.co/600x400/667eea/ffffff?text=${encodeURIComponent(animalName)}`;
}

// Alternative: Use specific Unsplash photo IDs (more reliable)
export const VERIFIED_UNSPLASH_IMAGES: Record<string, string> = {
  // Mammals
  'African Elephant': 'photo-1564760055775-d63b17a55c44',
  'Red Panda': 'photo-1497752531616-c3afd9760a11',
  'Bengal Tiger': 'photo-1561731216-c3a4d99437d5',
  'Giant Panda': 'photo-1525382455947-f319bc05fb35',
  'Gray Wolf': 'photo-1614027164847-1b28cfe1df60',
  'Cheetah': 'photo-1549480017-d76466a4b7e8',
  'Polar Bear': 'photo-1589656966895-2f33e7653819',
  'Giraffe': 'photo-1547970810-dc1eac37d174',
  'Kangaroo': 'photo-1515562141207-7a88fb7ce338',
  'Sloth': 'photo-1621374584572-c7c1c8b0a8c0',
  
  // Add more as needed
};

export function getVerifiedImageUrl(animalName: string): string {
  const photoId = VERIFIED_UNSPLASH_IMAGES[animalName];
  if (photoId) {
    return `https://images.unsplash.com/${photoId}?w=600&q=80&auto=format`;
  }
  // Fallback to placeholder
  return `https://placehold.co/600x400/667eea/ffffff?text=${encodeURIComponent(animalName)}`;
}
