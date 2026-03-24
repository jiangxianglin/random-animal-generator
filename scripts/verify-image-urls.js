const https = require('https');
const fs = require('fs');
const path = require('path');

// Read animals.ts and extract all image URLs
const animalsPath = path.join(__dirname, '..', 'lib', 'animals.ts');
const animalsContent = fs.readFileSync(animalsPath, 'utf8');

// Extract all imageUrl entries
const urlRegex = /commonName:\s*"([^"]+)"[\s\S]*?imageUrl:\s*"([^"]+)"/g;
const animals = [];
let match;

while ((match = urlRegex.exec(animalsContent)) !== null) {
  animals.push({
    name: match[1],
    url: match[2]
  });
}

console.log(`Found ${animals.length} animals to verify\n`);

// Function to check if URL is accessible
function checkUrl(url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'HEAD',
      timeout: 5000
    };

    const req = https.request(options, (res) => {
      resolve({
        success: res.statusCode >= 200 && res.statusCode < 400,
        status: res.statusCode
      });
    });

    req.on('error', () => {
      resolve({ success: false, status: 'ERROR' });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ success: false, status: 'TIMEOUT' });
    });

    req.end();
  });
}

// Verify all URLs
async function verifyAll() {
  const failed = [];
  const reptiles = animals.filter(a => {
    const index = animals.indexOf(a);
    return index >= 35 && index < 47; // Reptiles section
  });

  console.log('Checking Reptiles category:\n');
  
  for (const animal of reptiles) {
    const result = await checkUrl(animal.url);
    const status = result.success ? '✓' : '✗';
    console.log(`${status} ${animal.name} - ${result.status}`);
    
    if (!result.success) {
      failed.push(animal);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  if (failed.length > 0) {
    console.log(`\n❌ ${failed.length} images failed to load:`);
    failed.forEach(a => console.log(`   - ${a.name}: ${a.url}`));
  } else {
    console.log('\n✅ All reptile images are accessible!');
  }
}

verifyAll().catch(console.error);
