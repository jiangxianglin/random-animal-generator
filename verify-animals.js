const data = require('./lib/animals-data.json');

console.log('Total animals:', data.length);

const categories = {};
const difficulties = {};

data.forEach(animal => {
  categories[animal.category] = (categories[animal.category] || 0) + 1;
  difficulties[animal.drawingDifficulty] = (difficulties[animal.drawingDifficulty] || 0) + 1;
});

console.log('\nBy Category:');
Object.entries(categories).sort().forEach(([category, count]) => {
  console.log(`  ${category}: ${count}`);
});

console.log('\nBy Difficulty:');
Object.entries(difficulties).sort().forEach(([difficulty, count]) => {
  const percentage = (count / data.length * 100).toFixed(1);
  console.log(`  ${difficulty}: ${count} (${percentage}%)`);
});

// Verify all animals have required fields
console.log('\nVerifying required fields...');
let hasErrors = false;
data.forEach((animal, index) => {
  const required = ['id', 'commonName', 'scientificName', 'category', 'facts', 'imageUrl', 'imageAlt', 'drawingDifficulty', 'drawingTips', 'bodyParts'];
  required.forEach(field => {
    if (!animal[field]) {
      console.log(`  ERROR: Animal ${index} (${animal.commonName || 'unknown'}) missing ${field}`);
      hasErrors = true;
    }
  });
  
  if (animal.facts && animal.facts.length !== 3) {
    console.log(`  WARNING: Animal ${animal.commonName} has ${animal.facts.length} facts (expected 3)`);
  }
  
  if (animal.drawingTips && (animal.drawingTips.length < 2 || animal.drawingTips.length > 3)) {
    console.log(`  WARNING: Animal ${animal.commonName} has ${animal.drawingTips.length} drawing tips (expected 2-3)`);
  }
  
  if (animal.bodyParts && (animal.bodyParts.length < 3 || animal.bodyParts.length > 5)) {
    console.log(`  WARNING: Animal ${animal.commonName} has ${animal.bodyParts.length} body parts (expected 3-5)`);
  }
});

if (!hasErrors) {
  console.log('  All animals have required fields ✓');
}

console.log('\n✓ Database expanded successfully!');
