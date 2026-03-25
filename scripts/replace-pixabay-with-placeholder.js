const fs = require('fs');
const path = require('path');

// Read the animals data
const animalsDataPath = path.join(__dirname, '../lib/animals-data.json');
const animalsData = JSON.parse(fs.readFileSync(animalsDataPath, 'utf8'));

console.log('Replacing Pixabay URLs with placeholders...\n');

let replacedCount = 0;

animalsData.forEach(animal => {
  if (animal.imageUrl.includes('pixabay.com')) {
    const oldUrl = animal.imageUrl;
    // Use a placeholder that works with Next.js Image
    animal.imageUrl = `https://placehold.co/600x400/667eea/ffffff?text=${encodeURIComponent(animal.commonName)}`;
    console.log(`Replaced ${animal.commonName}:`);
    console.log(`  Old: ${oldUrl}`);
    console.log(`  New: ${animal.imageUrl}`);
    console.log('');
    replacedCount++;
  }
});

// Write back the updated data
if (replacedCount > 0) {
  fs.writeFileSync(animalsDataPath, JSON.stringify(animalsData, null, 2), 'utf8');
  console.log(`✅ Replaced ${replacedCount} Pixabay URL(s) with placeholders`);
  console.log('\nNote: These animals need proper Pexels images. You can:');
  console.log('1. Manually find Pexels images for these animals');
  console.log('2. Use the Pexels API to fetch images');
  console.log('3. Keep placeholders for now');
} else {
  console.log('✅ No Pixabay URLs found');
}
