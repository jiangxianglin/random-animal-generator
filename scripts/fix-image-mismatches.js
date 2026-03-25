const fs = require('fs');
const path = require('path');

// Read the animals data
const animalsDataPath = path.join(__dirname, '../lib/animals-data.json');
const animalsData = JSON.parse(fs.readFileSync(animalsDataPath, 'utf8'));

// Verified correct image IDs from verified-images.ts
const correctImages = {
  "Sloth": "photo-1621374584572-c7c1c8b0a8c0",
  "Cheetah": "photo-1549480017-d76466a4b7e8",
  "Giraffe": "photo-1547970810-dc1eac37d174",
  "Kangaroo": "photo-1515562141207-7a88fb7ce338",
  "Gorilla": "photo-1551969014-7d2c4cddf0b6",
  "Orangutan": "photo-1568393691622-c7ba131d63b4",
  "Hummingbird": "photo-1570733577667-d3d2b4d0e0e7",
  "Owl": "photo-1568641889-e0b8f0c2e19c",
};

let updatedCount = 0;

// Update mismatched images
animalsData.forEach(animal => {
  if (correctImages[animal.commonName]) {
    const correctPhotoId = correctImages[animal.commonName];
    const correctUrl = `https://images.unsplash.com/${correctPhotoId}?w=600&q=80&fm=webp`;
    
    if (animal.imageUrl !== correctUrl) {
      console.log(`Fixing ${animal.commonName}:`);
      console.log(`  Old: ${animal.imageUrl}`);
      console.log(`  New: ${correctUrl}`);
      animal.imageUrl = correctUrl;
      updatedCount++;
    }
  }
});

// Write back the updated data
if (updatedCount > 0) {
  fs.writeFileSync(animalsDataPath, JSON.stringify(animalsData, null, 2), 'utf8');
  console.log(`\n✅ Fixed ${updatedCount} image(s)`);
} else {
  console.log('\n✅ No images needed fixing');
}
