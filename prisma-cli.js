const { execSync } = require('child_process');

const SCHEMA_PATH = './apps/server/src/modules/prisma/schema.prisma';
const args = process.argv.slice(2);

const cmd = `npx prisma ${args.join(' ')} --schema=${SCHEMA_PATH}`;
console.log(`Running: ${cmd}`);
execSync(cmd, { stdio: 'inherit' });
