#!/usr/bin/env node

const { execSync, spawn } = require('child_process');

console.log('Starting PostgreSQL container...');
execSync('docker compose --env-file .env.staging up -d postgres-staging', { stdio: 'inherit' });

console.log('Waiting for PostgreSQL to be ready...');

let ready = false;

while (!ready) {
  try {
    execSync('docker exec postgres-staging pg_isready -U avnadmin', { stdio: 'inherit' });
    ready = true;
  } catch {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1000); // sleep 1s
  }
}

console.log('✅ PostgreSQL is ready!');
