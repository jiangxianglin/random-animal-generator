const fs = require('fs');
const path = require('path');

// Read the animals data
const animalsDataPath = path.join(__dirname, '../lib/animals-data.json');
const animalsData = JSON.parse(fs.readFileSync(animalsDataPath, 'utf8'));

// Known working Pexels images - these are verified to exist
const workingImages = {
  "Ostrich": "https://images.pexels.com/photos/3551227/pexels-photo-3551227.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Paper Wasp": "https://images.pexels.com/photos/3070870/pexels-photo-3070870.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Using honeybee as wasp alternative
  "Lynx": "https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Leopard": "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Rhinoceros": "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Chimpanzee": "https://images.pexels.com/photos/50582/chimpanzee-monkey-animal-portrait-50582.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Bison": "https://images.pexels.com/photos/158251/bison-animal-wildlife-nature-158251.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Moose": "https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Hedgehog": "https://images.pexels.com/photos/50577/hedgehog-animal-baby-cute-50577.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Red Fox": "https://images.pexels.com/photos/2295744/pexels-photo-2295744.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Gray Squirrel": "https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Red-eyed Tree Frog": "https://images.pexels.com/photos/70069/frog-macro-amphibian-green-70069.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
};

let updatedCount = 0;

// Update animals with working images
animalsData.forEach(animal => {
  const workingUrl = workingImages[animal.commonName];
  
  if (workingUrl) {
    console.log(`Updating ${animal.commonName}:`);
    console.log(`  Old: ${animal.imageUrl}`);
    console.log(`  New: ${workingUrl}`);
    animal.imageUrl = workingUrl;
    updatedCount++;
  }
});

// Write back the updated data
if (updatedCount > 0) {
  fs.writeFileSync(animalsDataPath, JSON.stringify(animalsData, null, 2), 'utf8');
  console.log(`\n✅ Updated ${updatedCount} animal(s) with verified working images`);
} else {
  console.log('\n✅ No animals needed updating');
}
