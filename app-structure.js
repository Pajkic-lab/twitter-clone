const fs = require('fs');
const path = require('path');

const excludeList = [
  'node_modules',
  '.git',
  'dist',
  'tmp',
  'cache',
  'media',
  'coverage',
  'build',
  'out',
  '.github',
  '.nx',
  '.vscode',
  'jest.config.js',
  'jest.config.ts',
  'jest.preset.js',
  'eslint.config.js',
  'docs',
];

function getDirStructure(dir, prefix = '') {
  const items = fs.readdirSync(dir);
  let structure = '';

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);

    if (
      excludeList.includes(item) ||
      (!stats.isDirectory() && !item.endsWith('.ts') && !item.endsWith('.js'))
    ) {
      return;
    }

    structure += `${prefix}${isLast ? '└──' : '├──'} ${item}\n`;

    if (stats.isDirectory()) {
      structure += getDirStructure(itemPath, `${prefix}${isLast ? '    ' : '│   '}`);
    }
  });

  return structure;
}

const dirStructure = getDirStructure('.');
const filePath = path.join(__dirname, 'app-structure.txt');

fs.writeFileSync(filePath, dirStructure);
console.log('Directory structure written to app-structure.txt');
