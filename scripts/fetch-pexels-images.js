// Script to fetch Pexels images for all animals
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

if (!PEXELS_API_KEY) {
  console.error('Error: NEXT_PUBLIC_PEXELS_API_KEY not found in .env.local');
  console.error('Please create a .env.local file with your Pexels API key');
  process.exit(1);
}

// List of all animals that need images
const animals = [
  // Mammals
  'African Elephant', 'Red Panda', 'Bengal Tiger', 'Giant Panda', 'Gray Wolf',
  'Cheetah', 'Polar Bear', 'Giraffe', 'Kangaroo', 'Sloth',
  'Koala', 'Gorilla', 'Lion', 'Orangutan', 'Zebra',
  'Hippopotamus', 'Raccoon', 'Meerkat', 'Otter', 'Fox',
  
  // Birds
  'Bald Eagle', 'Hummingbird', 'Penguin', 'Owl', 'Peacock',
  'Flamingo', 'Parrot', 'Albatross', 'Toucan', 'Woodpecker',
  'Kingfisher', 'Crane', 'Pelican', 'Raven', 'Swan',
  
  // Reptiles
  'Green Sea Turtle', 'Komodo Dragon', 'Chameleon', 'Crocodile', 'Python',
  'Iguana', 'Gecko', 'Tortoise', 'Cobra', 'Alligator',
  'Bearded Dragon', 'Anaconda',
  
  // Marine
  'Great White Shark', 'Blue Whale', 'Dolphin', 'Octopus', 'Jellyfish',
  'Seahorse', 'Manta Ray', 'Clownfish', 'Orca', 'Hammerhead Shark',
  'Starfish', 'Walrus', 'Seal', 'Manatee', 'Pufferfish',
  
  // Insects
  'Monarch Butterfly', 'Honeybee', 'Ladybug', 'Dragonfly', 'Ant',
  'Praying Mantis', 'Firefly', 'Grasshopper', 'Beetle', 'Mosquito'
];

async function fetchPexelsImage(animalName) {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(animalName + ' animal')}&per_page=1`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.photos && data.photos.length > 0) {
      return data.photos[0].src.large;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching ${animalName}:`, error.message);
    return null;
  }
}

async function fetchAllImages() {
  console.log('Fetching images for', animals.length, 'animals...\n');
  
  const imageMap = {};
  
  for (const animal of animals) {
    process.stdout.write(`Fetching ${animal}... `);
    const imageUrl = await fetchPexelsImage(animal);
    
    if (imageUrl) {
      imageMap[animal] = imageUrl;
      console.log('✓');
    } else {
      console.log('✗ (not found)');
    }
    
    // Rate limiting: wait 1 second between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Save to file
  const outputPath = path.join(__dirname, 'pexels-images.json');
  fs.writeFileSync(outputPath, JSON.stringify(imageMap, null, 2));
  
  console.log(`\n✓ Saved ${Object.keys(imageMap).length} image URLs to ${outputPath}`);
  console.log('\nNow copy these URLs to your animals.ts file!');
}

fetchAllImages();
