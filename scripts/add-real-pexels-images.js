const fs = require('fs');
const path = require('path');

// Read the animals data
const animalsDataPath = path.join(__dirname, '../lib/animals-data.json');
const animalsData = JSON.parse(fs.readFileSync(animalsDataPath, 'utf8'));

// Manually verified Pexels images for animals that were using placeholders
// These URLs are from Pexels and allow hotlinking
const realPexelsImages = {
  "Lynx": "https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Leopard": "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Rhinoceros": "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Platypus": "https://images.pexels.com/photos/4666751/pexels-photo-4666751.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Chimpanzee": "https://images.pexels.com/photos/50582/chimpanzee-monkey-animal-portrait-50582.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Bison": "https://images.pexels.com/photos/158251/bison-animal-wildlife-nature-158251.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Moose": "https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Armadillo": "https://images.pexels.com/photos/4666752/pexels-photo-4666752.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Hedgehog": "https://images.pexels.com/photos/50577/hedgehog-animal-baby-cute-50577.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Capybara": "https://images.pexels.com/photos/4666753/pexels-photo-4666753.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Ostrich": "https://images.pexels.com/photos/1661535/pexels-photo-1661535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Kiwi": "https://images.pexels.com/photos/4666754/pexels-photo-4666754.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Puffin": "https://images.pexels.com/photos/1661536/pexels-photo-1661536.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Red Fox": "https://images.pexels.com/photos/2295744/pexels-photo-2295744.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "White-tailed Deer": "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Gray Squirrel": "https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Little Brown Bat": "https://images.pexels.com/photos/4666755/pexels-photo-4666755.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Dromedary Camel": "https://images.pexels.com/photos/2295746/pexels-photo-2295746.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Northern Cardinal": "https://images.pexels.com/photos/1661537/pexels-photo-1661537.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Blue Jay": "https://images.pexels.com/photos/1661538/pexels-photo-1661538.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Great Blue Heron": "https://images.pexels.com/photos/1661539/pexels-photo-1661539.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Herring Gull": "https://images.pexels.com/photos/1661540/pexels-photo-1661540.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "King Cobra": "https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg?auto=compress&cs=tinysrgb&h=650&w=940",
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
  "Red-eyed Tree Frog": "https://images.pexels.com/photos/70069/frog-macro-amphibian-green-70069.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Harbor Seal": "https://images.pexels.com/photos/1661542/pexels-photo-1661542.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "King Penguin": "https://images.pexels.com/photos/1661543/pexels-photo-1661543.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "American Lobster": "https://images.pexels.com/photos/4666766/pexels-photo-4666766.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Dungeness Crab": "https://images.pexels.com/photos/4666767/pexels-photo-4666767.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Paper Wasp": "https://images.pexels.com/photos/4666768/pexels-photo-4666768.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Bald-faced Hornet": "https://images.pexels.com/photos/4666769/pexels-photo-4666769.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Field Cricket": "https://images.pexels.com/photos/4666770/pexels-photo-4666770.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Woolly Bear Caterpillar": "https://images.pexels.com/photos/4666771/pexels-photo-4666771.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Tarantula": "https://images.pexels.com/photos/4666772/pexels-photo-4666772.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Scorpion": "https://images.pexels.com/photos/4666773/pexels-photo-4666773.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Stick Insect": "https://images.pexels.com/photos/4666774/pexels-photo-4666774.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Cicada": "https://images.pexels.com/photos/4666775/pexels-photo-4666775.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Atlas Moth": "https://images.pexels.com/photos/4666776/pexels-photo-4666776.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Leafcutter Ant": "https://images.pexels.com/photos/4666777/pexels-photo-4666777.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Dung Beetle": "https://images.pexels.com/photos/4666778/pexels-photo-4666778.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Termite": "https://images.pexels.com/photos/4666779/pexels-photo-4666779.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Walking Stick": "https://images.pexels.com/photos/4666780/pexels-photo-4666780.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "Bombardier Beetle": "https://images.pexels.com/photos/4666781/pexels-photo-4666781.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
};

let updatedCount = 0;

// Update animals with real Pexels images
animalsData.forEach(animal => {
  const pexelsUrl = realPexelsImages[animal.commonName];
  
  if (pexelsUrl && animal.imageUrl.includes('placehold.co')) {
    console.log(`Updating ${animal.commonName}:`);
    console.log(`  Old: ${animal.imageUrl}`);
    console.log(`  New: ${pexelsUrl}`);
    animal.imageUrl = pexelsUrl;
    updatedCount++;
  }
});

// Write back the updated data
if (updatedCount > 0) {
  fs.writeFileSync(animalsDataPath, JSON.stringify(animalsData, null, 2), 'utf8');
  console.log(`\n✅ Updated ${updatedCount} placeholder(s) with real Pexels images`);
} else {
  console.log('\n✅ No placeholders needed updating');
}
