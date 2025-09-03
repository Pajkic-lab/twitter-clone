// setup-env.js
const fs = require('fs');
const path = require('path');

const EXAMPLE_FILE = path.resolve('.env.example');
const DEV_FILE = path.resolve('.env.development');
const STAGING_FILE = path.resolve('.env.staging');

const NEW_DB_URL =
  'postgres://avnadmin:AVNS_0TU9ktE4pwBZ5bEgp-N@localhost:5433/twitterclonetest6_staging';

// check if .env.example exists
if (!fs.existsSync(EXAMPLE_FILE)) {
  console.error('❌ .env.example file not found in current directory.');
  process.exit(1);
}

// read example content
const exampleContent = fs.readFileSync(EXAMPLE_FILE, 'utf-8');

// write .env.development
fs.writeFileSync(DEV_FILE, exampleContent);
console.log('✅ Created .env.development');

// write .env.staging with DATABASE_URL_PG replaced
const stagingContent = exampleContent.replace(
  /^DATABASE_URL_PG=.*/m,
  `DATABASE_URL_PG=${NEW_DB_URL}`,
);
fs.writeFileSync(STAGING_FILE, stagingContent);
console.log('✅ Created .env.staging with updated DATABASE_URL_PG');
console.log('✅ setup env complete!');
