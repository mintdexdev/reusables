import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// ========== CONFIGURATION ==========
const config = {
  importPathFolders: [
    'icons',
    'images/crew',
    'images/destination',
    'images/home',
    'images/technology',
  ],

  prefixMap: {
    icons: 'icon',
    images: 'img',
  },

  removeWords: ['icon', 'image'],
  includeExtensions: ['.jpg', '.svg', '.jpeg', '.webp'],
  outputFile: 'import.js',
};
// ====================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputFilePath = path.join(__dirname, config.outputFile);
await fs.writeFile(outputFilePath, '', 'utf-8'); // Clear output file

const allImportedNames = new Set();

for (const folderPath of config.importPathFolders) {
  const fullPath = path.join(__dirname, folderPath);
  let files;

  try {
    files = await fs.readdir(fullPath);
  } catch (err) {
    console.warn(`⚠️ Folder not found: ${folderPath}`);
    continue;
  }

  const [topFolder] = folderPath.split('/');
  const topPrefix = config.prefixMap[topFolder] || 'asset';

  const importLines = [];

  for (const file of files) {
    const ext = path.extname(file);
    if (!config.includeExtensions.includes(ext)) continue;

    const baseName = path.basename(file, ext);

    let cleanedName = baseName;
    config.removeWords.forEach((word) => {
      cleanedName = cleanedName.replace(new RegExp(`\\b${word}\\b`, 'gi'), '');
    });

    cleanedName = cleanedName.replace(/[-_]+/g, '-').replace(/^-|-$/g, '');

    const camelCase = (str) =>
      str
        .replace(/[-_ ]+(.)/g, (_, c) => c.toUpperCase())
        .replace(/^./, (c) => c.toUpperCase());

    const varName = topPrefix + camelCase(cleanedName);

    const importPath = `./${folderPath}/${file}`;

    if (allImportedNames.has(varName)) {
      console.warn(`⚠️ Skipped duplicate variable: ${varName} (${importPath})`);
      continue;
    }

    importLines.push(`import ${varName} from '${importPath}';`);
    allImportedNames.add(varName);
  }

  if (importLines.length) {
    const comment = folderPath.split('/').slice(1).join('/') || topFolder;

    await fs.appendFile(
      outputFilePath,
      `\n// ${comment}\n${importLines.join('\n')}\n`,
      'utf-8'
    );

    console.log(`✅ ${folderPath}: ${importLines.length} imports written`);
  }
}

// Append export block
if (allImportedNames.size) {
  const exportBlock =
    `\nexport {\n` +
    [...allImportedNames].map((name) => `  ${name},`).join('\n') +
    `\n};\n`;

  await fs.appendFile(outputFilePath, exportBlock, 'utf-8');
  console.log(
    `🎉 Export block with ${allImportedNames.size} unique names added to ${config.outputFile}`
  );
}
