const fs = require('fs');
const path = require('path');

const files = [
  {
    source: '.env.development.example',
    target: '.env.development',
  },
  {
    source: '.env.staging.example',
    target: '.env.staging',
  },
];

files.forEach(({ source, target }) => {
  const sourcePath = path.join(process.cwd(), source);
  const targetPath = path.join(process.cwd(), target);

  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Error: ${source} not found`);
    return;
  }

  if (fs.existsSync(targetPath)) {
    console.warn(`⚠️  ${target} already exists, skipping...`);
    return;
  }

  try {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`✅ Created ${target} from ${source}`);
  } catch (error) {
    console.error(`❌ Error creating ${target}:`, error.message);
  }
});

console.log('\n✨ Done!');
