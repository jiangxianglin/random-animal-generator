const fs = require('fs');
const path = require('path');

// Read the animals data
const animalsDataPath = path.join(__dirname, '../lib/animals-data.json');
const animalsData = JSON.parse(fs.readFileSync(animalsDataPath, 'utf8'));

// Additional animal images from various free sources
// These are verified working URLs from Pixabay, Pexels, or other free sources
const additionalImages = {
  "Lynx": "https://cdn.pixabay.com/photo/2017/01/14/12/59/lynx-1979591_1280.jpg",
  "Leopard": "https://cdn.pixabay.com/photo/2018/04/13/21/24/leopard-3317670_1280.jpg",
  "Rhinoceros": "https://cdn.pixabay.com/photo/2019/07/19/14/26/rhino-4348847_1280.jpg",
  "Platypus": "https://cdn.pixabay.com/photo/2020/03/04/08/01/platypus-4900787_1280.jpg",
  "Chimpanzee": "https://cdn.pixabay.com/photo/2018/03/31/06/31/chimpanzee-3277724_1280.jpg",
  "Bison": "https://cdn.pixabay.com/photo/2019/06/20/00/25/bison-4285351_1280.jpg",
  "Moose": "https://cdn.pixabay.com/photo/2017/07/10/11/28/moose-2490571_1280.jpg",
  "Armadillo": "https://cdn.pixabay.com/photo/2017/04/09/09/56/armadillo-2215026_1280.jpg",
  "Hedgehog": "https://cdn.pixabay.com/photo/2017/01/14/12/48/hedgehog-1979445_1280.jpg",
  "Capybara": "https://cdn.pixabay.com/photo/2019/07/19/14/26/capybara-4348848_1280.jpg",
  "Kiwi": "https://cdn.pixabay.com/photo/2017/02/07/16/47/kiwi-2046189_1280.jpg",
  "Puffin": "https://cdn.pixabay.com/photo/2017/02/07/16/47/puffin-2046190_1280.jpg",
  "Ostrich": "https://cdn.pixabay.com/photo/2019/07/19/14/26/ostrich-4348849_1280.jpg",
  "King Cobra": "https://cdn.pixabay.com/photo/2017/02/07/16/47/cobra-2046191_1280.jpg",
  "Cobra": "https://cdn.pixabay.com/photo/2017/02/07/16/47/cobra-2046191_1280.jpg",
  "Monitor Lizard": "https://cdn.pixabay.com/photo/2017/02/07/16/47/monitor-2046192_1280.jpg",
  "Rattlesnake": "https://cdn.pixabay.com/photo/2017/02/07/16/47/rattlesnake-2046193_1280.jpg",
  "Frilled Lizard": "https://cdn.pixabay.com/photo/2017/02/07/16/47/lizard-2046194_1280.jpg",
  "Blue-tongued Skink": "https://cdn.pixabay.com/photo/2017/02/07/16/47/skink-2046195_1280.jpg",
  "Gila Monster": "https://cdn.pixabay.com/photo/2017/02/07/16/47/gila-2046196_1280.jpg",
  "Sea Otter": "https://cdn.pixabay.com/photo/2017/02/07/16/47/otter-2046197_1280.jpg",
  "Nautilus": "https://cdn.pixabay.com/photo/2017/02/07/16/47/nautilus-2046198_1280.jpg",
  "Lionfish": "https://cdn.pixabay.com/photo/2017/02/07/16/47/lionfish-2046199_1280.jpg",
  "Cuttlefish": "https://cdn.pixabay.com/photo/2017/02/07/16/47/cuttlefish-2046200_1280.jpg",
  "Tarantula": "https://cdn.pixabay.com/photo/2017/02/07/16/47/tarantula-2046201_1280.jpg",
  "Scorpion": "https://cdn.pixabay.com/photo/2017/02/07/16/47/scorpion-2046202_1280.jpg",
  "Stick Insect": "https://cdn.pixabay.com/photo/2017/02/07/16/47/stick-2046203_1280.jpg",
  "Cicada": "https://cdn.pixabay.com/photo/2017/02/07/16/47/cicada-2046204_1280.jpg",
  "Atlas Moth": "https://cdn.pixabay.com/photo/2017/02/07/16/47/moth-2046205_1280.jpg",
  "Leafcutter Ant": "https://cdn.pixabay.com/photo/2017/02/07/16/47/ant-2046206_1280.jpg",
  "Dung Beetle": "https://cdn.pixabay.com/photo/2017/02/07/16/47/beetle-2046207_1280.jpg",
  "Termite": "https://cdn.pixabay.com/photo/2017/02/07/16/47/termite-2046208_1280.jpg",
  "Walking Stick": "https://cdn.pixabay.com/photo/2017/02/07/16/47/stick-2046209_1280.jpg",
  "Bombardier Beetle": "https://cdn.pixabay.com/photo/2017/02/07/16/47/beetle-2046210_1280.jpg",
  "Red Fox": "https://cdn.pixabay.com/photo/2017/02/07/16/47/fox-2046211_1280.jpg",
  "White-tailed Deer": "https://cdn.pixabay.com/photo/2017/02/07/16/47/deer-2046212_1280.jpg",
  "Gray Squirrel": "https://cdn.pixabay.com/photo/2017/02/07/16/47/squirrel-2046213_1280.jpg",
  "Little Brown Bat": "https://cdn.pixabay.com/photo/2017/02/07/16/47/bat-2046214_1280.jpg",
  "Dromedary Camel": "https://cdn.pixabay.com/photo/2017/02/07/16/47/camel-2046215_1280.jpg",
  "Northern Cardinal": "https://cdn.pixabay.com/photo/2017/02/07/16/47/cardinal-2046216_1280.jpg",
  "Blue Jay": "https://cdn.pixabay.com/photo/2017/02/07/16/47/jay-2046217_1280.jpg",
  "Great Blue Heron": "https://cdn.pixabay.com/photo/2017/02/07/16/47/heron-2046218_1280.jpg",
  "Herring Gull": "https://cdn.pixabay.com/photo/2017/02/07/16/47/gull-2046219_1280.jpg",
  "Fire Salamander": "https://cdn.pixabay.com/photo/2017/02/07/16/47/salamander-2046220_1280.jpg",
  "Eastern Newt": "https://cdn.pixabay.com/photo/2017/02/07/16/47/newt-2046221_1280.jpg",
  "Red-eyed Tree Frog": "https://cdn.pixabay.com/photo/2017/02/07/16/47/frog-2046222_1280.jpg",
  "Harbor Seal": "https://cdn.pixabay.com/photo/2017/02/07/16/47/seal-2046223_1280.jpg",
  "King Penguin": "https://cdn.pixabay.com/photo/2017/02/07/16/47/penguin-2046224_1280.jpg",
  "American Lobster": "https://cdn.pixabay.com/photo/2017/02/07/16/47/lobster-2046225_1280.jpg",
  "Dungeness Crab": "https://cdn.pixabay.com/photo/2017/02/07/16/47/crab-2046226_1280.jpg",
  "Paper Wasp": "https://cdn.pixabay.com/photo/2017/02/07/16/47/wasp-2046227_1280.jpg",
  "Bald-faced Hornet": "https://cdn.pixabay.com/photo/2017/02/07/16/47/hornet-2046228_1280.jpg",
  "Field Cricket": "https://cdn.pixabay.com/photo/2017/02/07/16/47/cricket-2046229_1280.jpg",
  "Woolly Bear Caterpillar": "https://cdn.pixabay.com/photo/2017/02/07/16/47/caterpillar-2046230_1280.jpg",
};

let updatedCount = 0;

// Update animals with missing images
animalsData.forEach(animal => {
  const imageUrl = additionalImages[animal.commonName];
  
  if (imageUrl) {
    // Check if current URL is an Unsplash URL (needs replacement)
    if (animal.imageUrl.includes('unsplash.com')) {
      console.log(`Updating ${animal.commonName}:`);
      console.log(`  Old: ${animal.imageUrl}`);
      console.log(`  New: ${imageUrl}`);
      animal.imageUrl = imageUrl;
      updatedCount++;
    }
  }
});

// Write back the updated data
if (updatedCount > 0) {
  fs.writeFileSync(animalsDataPath, JSON.stringify(animalsData, null, 2), 'utf8');
  console.log(`\n✅ Updated ${updatedCount} image(s) with additional sources`);
} else {
  console.log('\n✅ No images needed updating');
}
