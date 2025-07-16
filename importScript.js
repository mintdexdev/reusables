import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========== CONFIGURATION ==========
const prefix = 'imgMobile';                    // Variable name prefix
const importPathFolder = 'images/mobile';      // Used in import path
const removeWords = ['image'];         // Words to remove from file names
const includeExtensions = ['.jpg', '.png', '.svg', '.js', '.json', '.pdf', '.txt']; // Allowed extensions
// ===================================

const files = await readdir(path.join(__dirname, importPathFolder));

files.forEach((file) => {
  const ext = path.extname(file);
  if (!includeExtensions.includes(ext)) return;

  const baseName = path.basename(file, ext);

  // Clean baseName by removing defined words
  let cleanedName = baseName;
  removeWords.forEach((word) => {
    cleanedName = cleanedName.replace(new RegExp(`\\b${word}\\b`, 'gi'), '');
  });

  // Normalize dashes/underscores and trim
  cleanedName = cleanedName.replace(/[-_]+/g, '-').replace(/^-|-$/g, '');

  // Create camelCase variable name with prefix
  const varName =
    prefix +
    cleanedName
      .replace(/[-_ ](.)/g, (_, c) => c.toUpperCase()) // kebab/snake to camelCase
      .replace(/^./, (c) => c.toUpperCase()); // Capitalize first

  const importPath = `./${importPathFolder}/${file}`;
  console.log(`import ${varName} from '${importPath}'`);
});
