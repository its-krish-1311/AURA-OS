const fs = require('fs');
const path = require('path');

const osDir = path.join('c:', 'Users', 'itskr', 'Desktop', 'AuraOS', 'app', 'os');
const dirs = fs.readdirSync(osDir);

for (const dir of dirs) {
  const layoutPath = path.join(osDir, dir, 'layout.tsx');
  if (fs.existsSync(layoutPath)) {
    let content = fs.readFileSync(layoutPath, 'utf8');
    
    // Add 'use client'; if not present
    if (!content.includes('"use client"')) {
      content = '"use client";\n\n' + content;
    }
    
    // Remove metadata block
    content = content.replace(/export const metadata = \{[\s\S]*?\};\n/g, '');
    
    fs.writeFileSync(layoutPath, content, 'utf8');
    console.log('Fixed ' + layoutPath);
  }
}
