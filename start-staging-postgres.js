const { execSync } = require('child_process');
const fs = require('fs');

function run(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Command failed: ${command}`);
    process.exit(1);
  }
}

if (!fs.existsSync('.env.staging')) {
  console.error('.env.staging file not found. Please run "pnpm run env:set" first.');
  process.exit(1);
}

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

const args = process.argv.slice(2);
if (args.length) {
  run(args.join(' '));
}
