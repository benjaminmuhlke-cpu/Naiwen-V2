const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Log where we're running from
const cwd = process.cwd();
fs.writeFileSync('C:/Users/LENOVO/Desktop/debug-preview.txt',
  `CWD: ${cwd}\nDIR: ${__dirname}\nARGS: ${process.argv.join(' ')}\n`
);

// Run vite from the main project dir
const projectRoot = 'C:/Users/LENOVO/Desktop/claude';
process.chdir(projectRoot);
require(path.join(projectRoot, 'node_modules/vite/bin/vite.js'));
