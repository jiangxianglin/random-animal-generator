const fs = require('fs');
const path = require('path');

// Read the animals data
const animalsDataPath = path.join(__dirname, '../lib/animals-data.json');
const animalsData = JSON.parse(fs.readFileSync(animalsDataPath, 'utf8'));

console.log('Checking for placeholder images...\n');

let placeholderCount = 0;
const placeholderAnimals = [];

animalsData.forEach(animal => {
  if (animal.imageUrl.includes('placehold.co')) {
    placeholderCount++;
    placeholderAnimals.push(animal.commonName);
    console.log(`⚠️  ${animal.commonName}: ${animal.imageUrl}`);
  }
});

if (placeholderCount === 0) {
  console.log('✅ No placeholders found! All animals have real images.');
  
  // Show image source breakdown
  let pexelsCount = 0;
  let pixabayCount = 0;
  let otherCount = 0;
  
  animalsData.forEach(animal => {
    if (animal.imageUrl.includes('pexels.com')) {
      pexelsCount++;
    } else if (animal.imageUrl.includes('pixabay.com')) {
      pixabayCount++;
    } else {
      otherCount++;
    }
  });
  
  console.log(`\nImage sources:`);
  console.log(`  Pexels: ${pexelsCount} animals`);
  console.log(`  Pixabay: ${pixabayCount} animals`);
  console.log(`  Other: ${otherCount} animals`);
  console.log(`  Total: ${animalsData.length} animals`);
} else {
  console.log(`\n⚠️  Found ${placeholderCount} placeholder(s)`);
  console.log('\nAnimals with placeholders:');
  placeholderAnimals.forEach(name => console.log(`  - ${name}`));
}
