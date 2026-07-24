const fs = require('fs');
const path = require('path');
const osDir = 'c:/Users/itskr/Desktop/AuraOS/app/os';

const subdirs = fs.readdirSync(osDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

for (const dir of subdirs) {
  const filePath = path.join(osDir, dir, 'page.tsx');
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/return\s*\(\s*<(?:div|main|motion\.div|section)[^>]*className=\"([^\"]*)\"/);
    if (match) {
      if (match[1].includes('bg-')) {
          console.log(dir + ': has background class: ' + match[1]);
      } else {
          console.log(dir + ': no background class on root');
      }
    } else {
      console.log(dir + ': could not match root element');
    }
  }
}
