const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch {
    process.exit(1);
  }
}

const envPath = path.resolve('.env.staging');
if (!fs.existsSync(envPath)) {
  console.error('.env.staging file not found. Please run "pnpm run env:set" first.');
  process.exit(1);
}

// ✅ Load .env.staging manually to avoid hardcoded values
const env = Object.fromEntries(
  fs
    .readFileSync(envPath, 'utf8')
    .split('\n')
    .filter((line) => line.trim() && !line.startsWith('#'))
    .map((line) => line.split('=')),
);

process.env.POSTGRES_HOST_AUTH_METHOD = 'trust';

console.log('🚀 Starting PostgreSQL container...');
run('docker compose --env-file .env.staging up -d postgres-staging');

console.log('⏳ Waiting for PostgreSQL...');
const MAX_RETRIES = 30;
const WAIT_MS = 1000;

const POSTGRES_USER = env.POSTGRES_USER;
const CONTAINER_NAME = 'postgres-staging';

(async () => {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      execSync(`docker exec -u postgres ${CONTAINER_NAME} pg_isready -U ${POSTGRES_USER}`, {
        stdio: 'ignore',
      });
      console.log('\n✅ PostgreSQL is ready!');
      process.exit(0);
    } catch {
      process.stdout.write('.');
      await new Promise((r) => setTimeout(r, WAIT_MS));
    }
  }
  console.error('\n❌ PostgreSQL failed to start. Logs:');
  run(`docker logs ${CONTAINER_NAME}`);
  process.exit(1);
})();

const args = process.argv.slice(2);
if (args.length) {
  run(args.join(' '));
}

// const { execSync } = require('child_process');
// const fs = require('fs');

// function run(command) {
//   try {
//     execSync(command, { stdio: 'inherit' });
//   } catch {
//     process.exit(1);
//   }
// }

// if (!fs.existsSync('.env.staging')) {
//   console.error('.env.staging file not found. Please run "pnpm run env:set" first.');
//   process.exit(1);
// }

// process.env.POSTGRES_HOST_AUTH_METHOD = 'trust';
// console.log('🚀 Starting PostgreSQL container...');
// run('docker compose --env-file .env.staging up -d postgres-staging');

// console.log('⏳ Waiting for PostgreSQL...');
// const MAX_RETRIES = 30;
// const WAIT_MS = 1000;

// (async () => {
//   for (let i = 0; i < MAX_RETRIES; i++) {
//     try {
//       execSync('docker exec -u postgres postgres-staging pg_isready -U avnadmin', {
//         stdio: 'ignore',
//       });
//       console.log('\n✅ PostgreSQL is ready!');
//       process.exit(0);
//     } catch {
//       process.stdout.write('.');
//       await new Promise((r) => setTimeout(r, WAIT_MS));
//     }
//   }
//   console.error('\n❌ PostgreSQL failed to start. Logs:');
//   run('docker logs postgres-staging');
//   process.exit(1);
// })();

// const args = process.argv.slice(2);
// if (args.length) {
//   run(args.join(' '));
// }
