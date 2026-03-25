const fs = require('fs');
const path = require('path');

// Read the animals data
const animalsDataPath = path.join(__dirname, '../lib/animals-data.json');
const animalsData = JSON.parse(fs.readFileSync(animalsDataPath, 'utf8'));

// List of animals with known invalid/incorrect images that need placeholders
// These are Pexels IDs that don't exist or show wrong content
const invalidImages = [
  "Frilled Lizard",
  "Blue-tongued Skink",
  "Gila Monster",
  "Monitor Lizard",
  "Rattlesnake",
  "Platypus",
  "Armadillo",
  "Capybara",
  "Kiwi",
  "Puffin",
  "Little Brown Bat",
  "Northern Cardinal",
  "Blue Jay",
  "Great Blue Heron",
  "Herring Gull",
  "Sea Otter",
  "Nautilus",
  "Lionfish",
  "Cuttlefish",
  "Fire Salamander",
  "Eastern Newt",
  "King Penguin",
  "American Lobster",
  "Dungeness Crab",
  "Bald-faced Hornet",
  "Field Cricket",
  "Woolly Bear Caterpillar",
  "Tarantula",
  "Scorpion",
  "Stick Insect",
  "Cicada",
  "Atlas Moth",
  "Termite",
  "Walking Stick",
  "Bombardier Beetle",
];

let replacedCount = 0;

console.log('Replacing invalid images with placeholders...\n');

animalsData.forEach(animal => {
  if (invalidImages.includes(animal.commonName)) {
    // Check if it's using a 4666xxx photo ID (these are likely invalid)
    if (animal.imageUrl.includes('/4666')) {
      const oldUrl = animal.imageUrl;
      animal.imageUrl = `https://placehold.co/600x400/667eea/ffffff?text=${encodeURIComponent(animal.commonName)}`;
      console.log(`Replaced ${animal.commonName}`);
      console.log(`  Old: ${oldUrl}`);
      console.log(`  New: ${animal.imageUrl}\n`);
      replacedCount++;
    }
  }
});

// Write back the updated data
if (replacedCount > 0) {
  fs.writeFileSync(animalsDataPath, JSON.stringify(animalsData, null, 2), 'utf8');
  console.log(`✅ Replaced ${replacedCount} invalid image(s) with placeholders`);
  console.log('\nThese animals need real Pexels images to be manually added.');
} else {
  console.log('✅ No invalid images found');
}
