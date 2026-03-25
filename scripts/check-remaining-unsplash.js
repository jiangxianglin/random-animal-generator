const fs = require('fs');
const path = require('path');

// Read the animals data
const animalsDataPath = path.join(__dirname, '../lib/animals-data.json');
const animalsData = JSON.parse(fs.readFileSync(animalsDataPath, 'utf8'));

console.log('Checking for remaining Unsplash URLs...\n');

let unsplashCount = 0;
const unsplashAnimals = [];

animalsData.forEach(animal => {
  if (animal.imageUrl.includes('unsplash.com')) {
    unsplashCount++;
    unsplashAnimals.push(animal.commonName);
    console.log(`⚠️  ${animal.commonName}: ${animal.imageUrl}`);
  }
});

if (unsplashCount === 0) {
  console.log('✅ All animals now use Pexels or Pixabay images!');
  console.log('\nImage sources breakdown:');
  
  let pexelsCount = 0;
  let pixabayCount = 0;
  
  animalsData.forEach(animal => {
    if (animal.imageUrl.includes('pexels.com')) pexelsCount++;
    if (animal.imageUrl.includes('pixabay.com')) pixabayCount++;
  });
  
  console.log(`  Pexels: ${pexelsCount} animals`);
  console.log(`  Pixabay: ${pixabayCount} animals`);
  console.log(`  Total: ${animalsData.length} animals`);
} else {
  console.log(`\n⚠️  Found ${unsplashCount} animal(s) still using Unsplash URLs`);
  console.log('\nAnimals needing updates:');
  unsplashAnimals.forEach(name => console.log(`  - ${name}`));
}
