const fs = require('fs');
const path = require('path');

// Read the animals data
const animalsDataPath = path.join(__dirname, '../lib/animals-data.json');
const animalsData = JSON.parse(fs.readFileSync(animalsDataPath, 'utf8'));

// Verified correct image IDs from verified-images.ts
const verifiedImages = {
  "African Elephant": "photo-1564760055775-d63b17a55c44",
  "Red Panda": "photo-1497752531616-c3afd9760a11",
  "Bengal Tiger": "photo-1561731216-c3a4d99437d5",
  "Giant Panda": "photo-1525382455947-f319bc05fb35",
  "Gray Wolf": "photo-1614027164847-1b28cfe1df60",
  "Cheetah": "photo-1549480017-d76466a4b7e8",
  "Polar Bear": "photo-1589656966895-2f33e7653819",
  "Giraffe": "photo-1547970810-dc1eac37d174",
  "Kangaroo": "photo-1515562141207-7a88fb7ce338",
  "Sloth": "photo-1621374584572-c7c1c8b0a8c0",
  "Koala": "photo-1459262838948-3e2de6c1ec80",
  "Gorilla": "photo-1551969014-7d2c4cddf0b6",
  "Lion": "photo-1546182990-dffeafbe841d",
  "Orangutan": "photo-1568393691622-c7ba131d63b4",
  "Zebra": "photo-1526336024174-e58f5cdd8e13",
  "Hippopotamus": "photo-1564349683136-77e08dba1ef7",
  "Bald Eagle": "photo-1611689342806-0863700ce1e4",
  "Hummingbird": "photo-1570733577667-d3d2b4d0e0e7",
  "Penguin": "photo-1551986782-d0169b3f8fa7",
  "Owl": "photo-1568641889-e0b8f0c2e19c",
  "Flamingo": "photo-1559827260-dc66d52bef19",
  "Parrot": "photo-1552728089-57bdde30beb3",
};

console.log('Checking for image mismatches...\n');

let mismatchCount = 0;
const mismatches = [];

animalsData.forEach(animal => {
  const verifiedPhotoId = verifiedImages[animal.commonName];
  
  if (verifiedPhotoId) {
    // Extract photo ID from current URL
    const currentMatch = animal.imageUrl.match(/photo-([a-zA-Z0-9-]+)/);
    const currentPhotoId = currentMatch ? currentMatch[0] : null;
    
    if (currentPhotoId !== verifiedPhotoId) {
      mismatchCount++;
      mismatches.push({
        name: animal.commonName,
        current: currentPhotoId,
        verified: verifiedPhotoId
      });
      
      console.log(`❌ ${animal.commonName}:`);
      console.log(`   Current:  ${currentPhotoId || 'N/A'}`);
      console.log(`   Verified: ${verifiedPhotoId}`);
      console.log('');
    }
  }
});

if (mismatchCount === 0) {
  console.log('✅ All verified animals have matching images!');
} else {
  console.log(`\n⚠️  Found ${mismatchCount} mismatch(es)`);
  console.log('\nTo fix these, run: node scripts/fix-image-mismatches.js');
}
