import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(fullPath));
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) { 
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('./client/src/components');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    // Text alignments
    // We only want to replace tailwind classes, not random occurrences
    .replace(/(["'`\s])text-left(["'`\s])/g, '$1text-start$2')
    .replace(/(["'`\s])text-right(["'`\s])/g, '$1text-end$2')
    
    // Padding / margin
    .replace(/(["'`\s]-?)ml-([0-9]+|px|auto|\[?[0-9a-zA-Z%#-]+\]?)(["'`\s])/g, '$1ms-$2$3')
    .replace(/(["'`\s]-?)mr-([0-9]+|px|auto|\[?[0-9a-zA-Z%#-]+\]?)(["'`\s])/g, '$1me-$2$3')
    .replace(/(["'`\s]-?)pl-([0-9]+|px|\[?[0-9a-zA-Z%#-]+\]?)(["'`\s])/g, '$1ps-$2$3')
    .replace(/(["'`\s]-?)pr-([0-9]+|px|\[?[0-9a-zA-Z%#-]+\]?)(["'`\s])/g, '$1pe-$2$3')
    
    // Absolute positions
    .replace(/(["'`\s]-?)left-([0-9]+|px|auto|1\/2|full|\[?[0-9a-zA-Z%#-]+\]?)(["'`\s])/g, '$1start-$2$3')
    .replace(/(["'`\s]-?)right-([0-9]+|px|auto|1\/2|full|\[?[0-9a-zA-Z%#-]+\]?)(["'`\s])/g, '$1end-$2$3')
    
    // Borders
    .replace(/(["'`\s])border-l(["'`\s])/g, '$1border-s$2')
    .replace(/(["'`\s])border-l-([0-9]+|\[?[0-9a-zA-Z%#-]+\]?|[a-z]+(?:-[0-9]+)?)(["'`\s])/g, '$1border-s-$2$3')
    .replace(/(["'`\s])border-r(["'`\s])/g, '$1border-e$2')
    .replace(/(["'`\s])border-r-([0-9]+|\[?[0-9a-zA-Z%#-]+\]?|[a-z]+(?:-[0-9]+)?)(["'`\s])/g, '$1border-e-$2$3')
    
    // Gradients
    .replace(/(["'`\s])bg-gradient-to-r(["'`\s])/g, '$1bg-gradient-to-r rtl:bg-gradient-to-l$2')
    .replace(/(["'`\s])bg-gradient-to-l(["'`\s])/g, '$1bg-gradient-to-l rtl:bg-gradient-to-r$2');
    
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedCount++;
  }
});

console.log(`Updated ${changedCount} files.`);
