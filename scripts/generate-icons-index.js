import fs from 'fs';
import path from 'path';

const iconsDir = path.resolve('src/components/icons');
const indexFile = path.join(iconsDir, 'index.ts');

const files = fs.readdirSync(iconsDir).filter(
  (file) => file.endsWith('.tsx') && file !== 'index.ts' // faqat .tsx iconlar
);

let content =
  files
    .map((file) => {
      const name = path.basename(file, '.tsx');
      return `export { default as ${name} } from './${name}';`;
    })
    .join('\n') + '\n';

fs.writeFileSync(indexFile, content);
console.log(`✅ index.ts generated with ${files.length} icons`);
