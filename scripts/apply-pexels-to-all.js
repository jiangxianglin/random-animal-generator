const fs = require('fs');
const path = require('path');

// Read the animals data
const animalsDataPath = path.join(__dirname, '../lib/animals-data.json');
const animalsData = JSON.parse(fs.readFileSync(animalsDataPath, 'utf8'));

// Read Pexels images
const pexelsImagesPath = path.join(__dirname, 'pexels-images.json');
const pexelsImages = JSON.parse(fs.readFileSync(pexelsImagesPath, 'utf8'));

let updatedCount = 0;

// Update all animals with Pexels images
animalsData.forEach(animal => {
  const pexelsUrl = pexelsImages[animal.commonName];
  
  if (pexelsUrl) {
    console.log(`Updating ${animal.commonName}:`);
    console.log(`  Old: ${animal.imageUrl}`);
    console.log(`  New: ${pexelsUrl}`);
    animal.imageUrl = pexelsUrl;
    updatedCount++;
  } else {
    console.log(`⚠️  No Pexels image for: ${animal.commonName}`);
  }
});

// Write back the updated data
if (updatedCount > 0) {
  fs.writeFileSync(animalsDataPath, JSON.stringify(animalsData, null, 2), 'utf8');
  console.log(`\n✅ Updated ${updatedCount} image(s) with Pexels URLs`);
} else {
  console.log('\n❌ No images were updated');
}
