const fs = require('fs');
const path = require('path');
const https = require('https');

// Pexels API key
const PEXELS_API_KEY = 'REMOVED_PEXELS_KEY';

// Animals that need images
const missingAnimals = [
  "Platypus",
  "Kiwi",
  "Monitor Lizard",
  "Rattlesnake",
  "Frilled Lizard",
  "Blue-tongued Skink",
  "Gila Monster",
  "Nautilus",
  "Lionfish",
  "Cuttlefish",
  "Armadillo",
  "Capybara",
  "Tarantula",
  "Scorpion",
  "Stick Insect",
  "Cicada",
  "Atlas Moth",
  "Termite",
  "Walking Stick",
  "Bombardier Beetle",
  "Little Brown Bat",
  "Fire Salamander",
  "Eastern Newt",
  "American Lobster",
  "Dungeness Crab",
  "Bald-faced Hornet",
  "Field Cricket",
  "Woolly Bear Caterpillar",
];

// Function to fetch from Pexels API
function fetchPexelsImage(query) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.pexels.com',
      path: `/v1/search?query=${encodeURIComponent(query)}&per_page=1`,
      headers: {
        'Authorization': PEXELS_API_KEY
      }
    };

    https.get(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.photos && json.photos.length > 0) {
            const photo = json.photos[0];
            resolve({
              url: photo.src.large,
              id: photo.id
            });
          } else {
            resolve(null);
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (e) => {
      reject(e);
    });
  });
}

// Main function
async function fetchAllImages() {
  const results = {};
  
  console.log('Fetching images from Pexels API...\n');
  
  for (const animal of missingAnimals) {
    try {
      console.log(`Searching for: ${animal}`);
      const result = await fetchPexelsImage(animal);
      
      if (result) {
        results[animal] = result.url;
        console.log(`  ✓ Found: ${result.url}`);
      } else {
        console.log(`  ✗ No image found`);
      }
      
      // Wait 1 second between requests to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.log(`  ✗ Error: ${error.message}`);
    }
  }
  
  // Save results
  const outputPath = path.join(__dirname, 'fetched-animals.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\n✅ Fetched ${Object.keys(results).length} images`);
  console.log(`Results saved to: ${outputPath}`);
}

fetchAllImages().catch(console.error);
