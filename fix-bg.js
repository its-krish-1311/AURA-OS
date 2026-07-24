const fs = require('fs');
const path = require('path');
const osDir = 'c:/Users/itskr/Desktop/AuraOS/app/os';

const subdirs = fs.readdirSync(osDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let updatedCount = 0;

for (const dir of subdirs) {
  const filePath = path.join(osDir, dir, 'page.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const originalContent = content;
    
    // Pattern 1: min-h-screen bg-[...] or bg-black
    content = content.replace(/className="([^"]*)min-h-screen ([^"]*)(bg-\[[^\]]+\]|bg-black)/g, 'className="$1min-h-screen $2bg-transparent');
    
    // Pattern 2: bg-[...] or bg-black before min-h-screen
    content = content.replace(/className="([^"]*)(bg-\[[^\]]+\]|bg-black) ([^"]*)min-h-screen/g, 'className="$1bg-transparent $3min-h-screen');

    // Pattern 3: just any direct bg-[#04060B] or bg-black in a min-h-screen class string
    // Let's do a simpler approach: find the class string containing min-h-screen, and replace bg-[*] or bg-black inside it.
    let minHMatch = content.match(/className="([^"]*min-h-screen[^"]*)"/);
    if (minHMatch) {
      let classString = minHMatch[1];
      if (classString.includes('bg-[#04060B]') || classString.includes('bg-black') || classString.includes('bg-[#0A0C10]')) {
        let newClassString = classString
          .replace(/bg-\[[^\]]+\]/g, 'bg-transparent')
          .replace(/\bbg-black\b/g, 'bg-transparent');
        content = content.replace(minHMatch[1], newClassString);
      }
    }

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log('Updated ' + dir + '/page.tsx');
      updatedCount++;
    } else {
        const match = content.match(/className="[^"]*min-h-screen[^"]*"/);
        if (match) {
            console.log('No change needed for ' + dir + ': ' + match[0]);
        }
    }
  }
}
console.log('Total files updated: ' + updatedCount);
