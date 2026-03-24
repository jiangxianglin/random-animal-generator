const fs = require('fs');
const path = require('path');

// Read the Pexels images JSON
const pexelsImages = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'pexels-images.json'), 'utf8')
);

// Read the animals.ts file
const animalsPath = path.join(__dirname, '..', 'lib', 'animals.ts');
let animalsContent = fs.readFileSync(animalsPath, 'utf8');

// Update each animal's imageUrl
let updatedCount = 0;
Object.entries(pexelsImages).forEach(([animalName, imageUrl]) => {
  // Create a regex to find the animal entry and its imageUrl
  const regex = new RegExp(
    `(commonName:\\s*"${animalName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?imageUrl:\\s*")([^"]+)(")`,
    'g'
  );
  
  const newContent = animalsContent.replace(regex, (match, before, oldUrl, after) => {
    updatedCount++;
    console.log(`✓ Updated ${animalName}`);
    return before + imageUrl + after;
  });
  
  animalsContent = newContent;
});

// Write the updated content back
fs.writeFileSync(animalsPath, animalsContent, 'utf8');

console.log(`\n✅ Successfully updated ${updatedCount} animal image URLs!`);
console.log(`📝 File saved: ${animalsPath}`);
