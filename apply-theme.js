const fs = require('fs');
const path = require('path');
const osDir = 'c:/Users/itskr/Desktop/AuraOS/app/os';

const themes = {
  'automation-os': { c: '#8B5CF6', cd: '#7C3AED', r: '139,92,246', rd: '124,58,237' },
  'business-os': { c: '#F59E0B', cd: '#D97706', r: '245,158,11', rd: '217,119,6' },
  'career-os': { c: '#3B82F6', cd: '#2563EB', r: '59,130,246', rd: '37,99,235' },
  'developer-os': { c: '#06B6D4', cd: '#0891B2', r: '6,182,212', rd: '8,145,178' },
  'fashion-os': { c: '#EC4899', cd: '#DB2777', r: '236,72,153', rd: '219,39,119' },
  'finance-os': { c: '#10B981', cd: '#059669', r: '16,185,129', rd: '5,150,105' },
  'goals-os': { c: '#22C55E', cd: '#16A34A', r: '34,197,94', rd: '22,163,74' },
  'health-os': { c: '#EF4444', cd: '#DC2626', r: '239,68,68', rd: '220,38,38' },
  'library-os': { c: '#14B8A6', cd: '#0D9488', r: '20,184,166', rd: '13,148,136' },
  'study-os': { c: '#F97316', cd: '#EA580C', r: '249,115,22', rd: '234,88,12' },
  'travel-os': { c: '#0EA5E9', cd: '#0284C7', r: '14,165,233', rd: '2,132,199' }
};

let updatedCount = 0;

for (const [dir, t] of Object.entries(themes)) {
  const filePath = path.join(osDir, dir, 'page.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // We want to match: `return (\n    <div className="p-8 pb-20 max-w-7xl mx-auto w-full relative">`
    // and replace it with:
    // `return (\n    <div className="min-h-screen bg-transparent p-8 pb-20 max-w-7xl mx-auto w-full relative" style={{'--theme-color': '${t.c}', '--theme-color-dark': '${t.cd}', '--theme-rgb': '${t.r}', '--theme-rgb-dark': '${t.rd}'} as React.CSSProperties}>`

    const returnRegex = /(return\s*\(\s*<div[^>]*className=\")([^\"]*)(\"[^>]*>)/;
    const match = content.match(returnRegex);
    
    if (match) {
        let classString = match[2];
        if (!classString.includes('min-h-screen')) classString = 'min-h-screen bg-transparent ' + classString;
        
        let newTag = match[1] + classString + match[3];
        
        // Add style prop if it doesn't have one
        if (!newTag.includes('style={{')) {
            const styleProp = ` style={{'--theme-color': '${t.c}', '--theme-color-dark': '${t.cd}', '--theme-rgb': '${t.r}', '--theme-rgb-dark': '${t.rd}'} as React.CSSProperties}`;
            // insert it right before the closing >
            newTag = newTag.replace(/>$/, styleProp + '>');
        }
        
        content = content.replace(match[0], newTag);
    }
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log('Updated ' + dir + '/page.tsx');
      updatedCount++;
    }
  }
}
console.log('Total updated: ' + updatedCount);
