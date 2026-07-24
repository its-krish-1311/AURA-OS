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
    
    // Many of these pages have something like `<div className="min-h-screen bg-[#04060B] ...">`
    // We want to replace ANY bg-[#xxxxxx] or bg-black on the outermost div with bg-transparent.
    // The outermost div usually comes right after `return (`.
    
    const returnRegex = /return\s*\(\s*<div[^>]*className=\"([^\"]*)\"/;
    const match = content.match(returnRegex);
    
    if (match) {
        let classString = match[1];
        // Does it have a background color?
        if (classString.match(/bg-\[[^\]]+\]/) || classString.includes('bg-black') || classString.includes('bg-gray-900') || classString.includes('bg-[#04060B]') || classString.includes('bg-[#0A0C10]') || classString.includes('bg-[#0B0F19]') || classString.includes('bg-[#111827]')) {
            let newClassString = classString
                .replace(/bg-\[[^\]]+\]/g, 'bg-transparent')
                .replace(/\bbg-black\b/g, 'bg-transparent')
                .replace(/\bbg-gray-900\b/g, 'bg-transparent');
                
            content = content.replace(classString, newClassString);
        }
    }
    
    // Also catch some files that use motion.div instead of div for the root element
    const returnMotionRegex = /return\s*\(\s*<motion\.div[^>]*className=\"([^\"]*)\"/;
    const matchMotion = content.match(returnMotionRegex);
    if (matchMotion) {
        let classString = matchMotion[1];
        if (classString.match(/bg-\[[^\]]+\]/) || classString.includes('bg-black') || classString.includes('bg-gray-900')) {
            let newClassString = classString
                .replace(/bg-\[[^\]]+\]/g, 'bg-transparent')
                .replace(/\bbg-black\b/g, 'bg-transparent')
                .replace(/\bbg-gray-900\b/g, 'bg-transparent');
                
            content = content.replace(classString, newClassString);
        }
    }

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log('Updated ' + dir + '/page.tsx');
      updatedCount++;
    } else {
      console.log('No change needed for ' + dir);
    }
  }
}
console.log('Total files updated: ' + updatedCount);
