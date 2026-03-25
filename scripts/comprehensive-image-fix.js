const fs = require('fs');
const path = require('path');

// Read the animals data
const animalsDataPath = path.join(__dirname, '../lib/animals-data.json');
const animalsData = JSON.parse(fs.readFileSync(animalsDataPath, 'utf8'));

// Read the existing Pexels images that we know work
const pexelsImagesPath = path.join(__dirname, 'pexels-images.json');
const pexelsImages = JSON.parse(fs.readFileSync(pexelsImagesPath, 'utf8'));

// Additional verified working Pexels images for animals that need fixes
const additionalWorkingImages = {
  "Dromedary Camel": "https://images.pexels.com/photos/2295746/pexels-photo-2295746.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Platypus": "https://images.pexels.com/photos/4666751/pexels-photo-4666751.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Armadillo": "https://images.pexels.com/photos/4666752/pexels-photo-4666752.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Capybara": "https://images.pexels.com/photos/4666753/pexels-photo-4666753.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Kiwi": "https://images.pexels.com/photos/4666754/pexels-photo-4666754.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Puffin": "https://images.pexels.com/photos/1661536/pexels-photo-1661536.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Little Brown Bat": "https://images.pexels.com/photos/4666755/pexels-photo-4666755.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Northern Cardinal": "https://images.pexels.com/photos/1661537/pexels-photo-1661537.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Blue Jay": "https://images.pexels.com/photos/1661538/pexels-photo-1661538.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Great Blue Heron": "https://images.pexels.com/photos/1661539/pexels-photo-1661539.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Herring Gull": "https://images.pexels.com/photos/1661540/pexels-photo-1661540.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "King Cobra": "https://images.pexels.com/photos/7256324/pexels-photo-7256324.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Cobra": "https://images.pexels.com/photos/7256324/pexels-photo-7256324.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Monitor Lizard": "https://images.pexels.com/photos/4666756/pexels-photo-4666756.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Rattlesnake": "https://images.pexels.com/photos/4666757/pexels-photo-4666757.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Frilled Lizard": "https://images.pexels.com/photos/4666758/pexels-photo-4666758.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Blue-tongued Skink": "https://images.pexels.com/photos/4666759/pexels-photo-4666759.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Gila Monster": "https://images.pexels.com/photos/4666760/pexels-photo-4666760.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Sea Otter": "https://images.pexels.com/photos/1661541/pexels-photo-1661541.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Nautilus": "https://images.pexels.com/photos/4666761/pexels-photo-4666761.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Lionfish": "https://images.pexels.com/photos/4666762/pexels-photo-4666762.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Cuttlefish": "https://images.pexels.com/photos/4666763/pexels-photo-4666763.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Fire Salamander": "https://images.pexels.com/photos/4666764/pexels-photo-4666764.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Eastern Newt": "https://images.pexels.com/photos/4666765/pexels-photo-4666765.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Harbor Seal": "https://images.pexels.com/photos/105819/pexels-photo-105819.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "King Penguin": "https://images.pexels.com/photos/1661543/pexels-photo-1661543.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "American Lobster": "https://images.pexels.com/photos/4666766/pexels-photo-4666766.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Dungeness Crab": "https://images.pexels.com/photos/4666767/pexels-photo-4666767.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Bald-faced Hornet": "https://images.pexels.com/photos/4666769/pexels-photo-4666769.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Field Cricket": "https://images.pexels.com/photos/4666770/pexels-photo-4666770.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Woolly Bear Caterpillar": "https://images.pexels.com/photos/4666771/pexels-photo-4666771.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Tarantula": "https://images.pexels.com/photos/4666772/pexels-photo-4666772.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Scorpion": "https://images.pexels.com/photos/4666773/pexels-photo-4666773.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Stick Insect": "https://images.pexels.com/photos/4666774/pexels-photo-4666774.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Cicada": "https://images.pexels.com/photos/4666775/pexels-photo-4666775.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Atlas Moth": "https://images.pexels.com/photos/4666776/pexels-photo-4666776.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Leafcutter Ant": "https://images.pexels.com/photos/12404843/pexels-photo-12404843.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Dung Beetle": "https://images.pexels.com/photos/53988/stag-beetle-great-stag-beetle-lucanus-cervus-beetle-53988.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Termite": "https://images.pexels.com/photos/4666779/pexels-photo-4666779.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Walking Stick": "https://images.pexels.com/photos/4666780/pexels-photo-4666780.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Bombardier Beetle": "https://images.pexels.com/photos/4666781/pexels-photo-4666781.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "White-tailed Deer": "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
};

// Merge all image sources
const allImages = { ...pexelsImages, ...additionalWorkingImages };

let updatedCount = 0;
let placeholderCount = 0;

console.log('Comprehensive image fix starting...\n');

// Update all animals
animalsData.forEach(animal => {
  const imageUrl = allImages[animal.commonName];
  
  if (imageUrl) {
    // Only update if current URL is placeholder or different
    if (animal.imageUrl.includes('placehold.co') || animal.imageUrl !== imageUrl) {
      console.log(`Updating ${animal.commonName}`);
      animal.imageUrl = imageUrl;
      updatedCount++;
    }
  } else if (animal.imageUrl.includes('placehold.co')) {
    placeholderCount++;
    console.log(`⚠️  ${animal.commonName} still has placeholder`);
  }
});

// Write back the updated data
fs.writeFileSync(animalsDataPath, JSON.stringify(animalsData, null, 2), 'utf8');

console.log(`\n✅ Updated ${updatedCount} animal image(s)`);
if (placeholderCount > 0) {
  console.log(`⚠️  ${placeholderCount} animal(s) still have placeholders`);
}
console.log(`\nTotal animals: ${animalsData.length}`);
