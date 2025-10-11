// start-staging-postgres.js
const { execSync } = require('child_process');

function run(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Command failed: ${command}`);
    process.exit(1);
  }
}

// 1️⃣ Make sure .env.staging exists
const fs = require('fs');
if (!fs.existsSync('.env.staging')) {
  console.error('.env.staging file not found. Please run "pnpm run env:set" first.');
  process.exit(1);
}

// 2️⃣ Verify POSTGRES_PASSWORD exists
console.log('Checking for POSTGRES_PASSWORD...');
const envContent = fs.readFileSync('.env.staging', 'utf8');
if (!envContent.includes('POSTGRES_PASSWORD=')) {
  console.error('POSTGRES_PASSWORD not found in .env.staging');
  process.exit(1);
}
console.log('✓ POSTGRES_PASSWORD found in .env.staging');

// 3️⃣ Start Postgres container with explicit env file
console.log('Starting PostgreSQL container...');
run('docker compose --env-file .env.staging up -d postgres-staging');

// 4️⃣ Wait for Postgres to be ready
console.log('Waiting for PostgreSQL to be ready...');
let ready = false;
const maxRetries = 30;
let retries = 0;

while (!ready && retries < maxRetries) {
  try {
    execSync('docker exec postgres-staging pg_isready -U avnadmin', { stdio: 'ignore' });
    ready = true;
    console.log('PostgreSQL is ready!');
  } catch (err) {
    retries++;
    if (retries === maxRetries) {
      console.error('PostgreSQL failed to start. Here are the logs:');
      run('docker logs postgres-staging');
      process.exit(1);
    }
    process.stdout.write('.');
    execSync('sleep 1');
  }
}

// 5️⃣ Optional: run any command passed to this script
const args = process.argv.slice(2);
if (args.length) {
  run(args.join(' '));
}
