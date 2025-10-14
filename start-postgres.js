#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`\n❌ Command failed: ${command}`);
    process.exit(1);
  }
}

async function waitForPostgres(containerName, user) {
  const MAX_RETRIES = 30;
  const RETRY_DELAY_MS = 1000;

  console.log('⏳ Waiting for PostgreSQL to be ready...');

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      execSync(`docker exec -u postgres ${containerName} pg_isready -U ${user}`, {
        stdio: 'ignore',
      });
      console.log('\n✅ PostgreSQL is ready!');
      return;
    } catch {
      process.stdout.write('.');
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }

  console.error('\n❌ PostgreSQL failed to start after multiple attempts.');
  console.log('🪵 Container logs:');
  run(`docker logs ${containerName}`);
  process.exit(1);
}

function loadEnv(envName) {
  const envFile = `.env.${envName}`;
  const envPath = path.resolve(envFile);

  if (!fs.existsSync(envPath)) {
    console.error(`\n❌ Missing ${envFile} file.`);
    console.log('👉 Please run "pnpm run env:set" to generate it.');
    process.exit(1);
  }

  const envEntries = fs
    .readFileSync(envPath, 'utf8')
    .split('\n')
    .filter((line) => line.trim() && !line.startsWith('#'))
    .map((line) => line.split('='));

  return Object.fromEntries(envEntries);
}

async function main() {
  const ALLOWED_ENVS = ['development', 'staging'];
  const CONTAINER_MAP = {
    development: 'postgres-dev',
    staging: 'postgres-staging',
  };

  const inputEnv = process.argv[2];

  if (!inputEnv) {
    console.error(`❌ Missing environment argument. Use one of: ${ALLOWED_ENVS.join(', ')}.`);
    process.exit(1);
  }

  if (!ALLOWED_ENVS.includes(inputEnv)) {
    console.error(
      `❌ Invalid environment: "${inputEnv}". Allowed values: ${ALLOWED_ENVS.join(', ')}.`,
    );
    process.exit(1);
  }

  const envName = inputEnv;
  console.log(`\n🌍 Environment: ${envName}`);

  const env = loadEnv(envName);
  const containerName = CONTAINER_MAP[envName];

  process.env.POSTGRES_HOST_AUTH_METHOD = 'trust';

  console.log(`🚀 Starting PostgreSQL container (${containerName})...`);
  run(`docker compose --env-file .env.${envName} up -d ${containerName}`);

  await waitForPostgres(containerName, env.POSTGRES_USER);
  console.log(`\n🎉 ${containerName} is up and running!\n`);
}

main().catch((err) => {
  console.error('\n❌ Unexpected error:', err);
  process.exit(1);
});
