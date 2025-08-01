import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========== CONFIGURATION ==========

const prefix = 'asset'; // Prefix for generated variable names
const importPathFolders = ['icons', 'images/crew', 'images/destination', 'images/home', 'images/technology']; // 👈 Multiple folders
const removeWords = ['icon', 'img'];           // Words to strip from variable names
const includeExtensions = ['.jpg', '.png', '.svg', '.js', '.json', '.pdf', '.txt']; // Allowed extensions

const outputFile = 'index.txt';                // Output file

// ====================================

for (const folder of importPathFolders) {
  const dirPath = path.join(__dirname, folder);
  let files;

  try {
    files = await fs.readdir(dirPath);
  } catch (err) {
    console.warn(`⚠️ Folder not found: ${folder}`);
    continue;
  }

  const importLines = [];

  for (const file of files) {
    const ext = path.extname(file);
    if (!includeExtensions.includes(ext)) continue;

    const baseName = path.basename(file, ext);

    // Clean baseName by removing defined words
    let cleanedName = baseName;
    removeWords.forEach((word) => {
      cleanedName = cleanedName.replace(new RegExp(`\\b${word}\\b`, 'gi'), '');
    });

    // Normalize dashes/underscores and trim
    cleanedName = cleanedName.replace(/[-_]+/g, '-').replace(/^-|-$/g, '');

    // Convert to PascalCase and prefix
    const varName =
      prefix +
      cleanedName
        .replace(/[-_ ](.)/g, (_, c) => c.toUpperCase()) // kebab/snake to camelCase
        .replace(/^./, (c) => c.toUpperCase()); // Capitalize first

    const importPath = `./${folder}/${file}`;
    importLines.push(`import ${varName} from '${importPath}';`);
  }

  // Append import lines to output file
  if (importLines.length) {
    await fs.appendFile(path.join(__dirname, outputFile), importLines.join('\n') + '\n', 'utf-8');
    console.log(`✅ ${folder}: ${importLines.length} imports added`);
  }
}

console.log(`🎉 All done. Imports written to ${outputFile}`);


