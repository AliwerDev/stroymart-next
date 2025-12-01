import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import fs from 'fs';
import { globby } from 'globby';
const traverse = traverseModule.default;

const shouldDeleteUnusedKeys = true;

async function extract() {
  const languageFiles = await globby(['messages/*.json']);
  const translations = {};

  for (const file of languageFiles) {
    const lang = file.split('/')[1].split('.')[0];
    translations[lang] = JSON.parse(fs.readFileSync(file, 'utf8'));
  }

  const existingKeys = new Set();
  Object.values(translations).forEach((translation) => {
    Object.keys(translation).forEach((key) => existingKeys.add(key));
  });

  const foundKeys = new Set();
  const files = await globby(['src/**/*.{js,jsx,ts,tsx}']);

  for (const file of files) {
    const code = fs.readFileSync(file, 'utf8');
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });

    traverse(ast, {
      CallExpression(path) {
        const callee = path.node.callee;

        if (callee.type === 'Identifier' && callee.name === 't') {
          const arg = path.node.arguments[0];
          if (arg && arg.type === 'StringLiteral') {
            foundKeys.add(arg.value);
          }
        }

        if (callee.type === 'CallExpression' && callee.callee.name === 'useTranslations') {
          const secondCall = path.parentPath.parentPath;
          if (secondCall && secondCall.node.type === 'CallExpression') {
            const arg = secondCall.node.arguments[0];
            if (arg && arg.type === 'StringLiteral') {
              foundKeys.add(arg.value);
            }
          }
        }
      },
    });
  }

  const newKeys = [...foundKeys].filter((key) => !existingKeys.has(key));

  const unusedKeys = [...existingKeys].filter((key) => !foundKeys.has(key));

  let allKeys;
  if (shouldDeleteUnusedKeys) {
    allKeys = [...foundKeys].sort();
    console.log(`Removing ${unusedKeys.length} unused keys: ${unusedKeys.join(', ')}`);
  } else {
    allKeys = [...existingKeys, ...foundKeys].sort();
    console.log(`Keeping ${unusedKeys.length} unused keys: ${unusedKeys.join(', ')}`);
  }

  for (const [lang, translation] of Object.entries(translations)) {
    const updatedTranslation = {};

    for (const key of allKeys) {
      if (translation[key] !== undefined) {
        updatedTranslation[key] = translation[key];
      } else {
        updatedTranslation[key] = '';
      }
    }

    fs.writeFileSync(`messages/${lang}.json`, JSON.stringify(updatedTranslation, null, 2), 'utf8');
  }

  console.log(`Found ${foundKeys.size} total keys in project`);
  console.log(`Added ${newKeys.length} new keys to all language files`);
  console.log(`Updated files: ${languageFiles.join(', ')}`);
  console.log(`shouldDeleteUnusedKeys: ${shouldDeleteUnusedKeys}`);
}

extract().catch(console.error);
