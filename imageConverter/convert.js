import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = 'source';
const outputDir = 'converted/images';

// Ensure output directory exists
fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(inputDir).filter(f =>
  /\.(png|jpe?g)$/i.test(f)
);

if (files.length === 0) {
  console.log('❌ No PNG or JPG images found.');
  process.exit(1);
}

for (const file of files) {
  const inputPath = path.join(inputDir, file);
  const baseName = path.parse(file).name;

  const baseOutputPath = path.join(outputDir, baseName);

  const image = sharp(inputPath);

  // Convert to JPG (using mozjpeg-like options)
  await image
    .clone()
    .jpeg({
      quality: 90, // High compression, still good visual quality
      progressive: true,
      chromaSubsampling: '4:4:4',
      mozjpeg: true
    })
    .toFile(`${baseOutputPath}.jpg`);

  // Convert to AVIF
  await image
    .clone()
    .avif({
      quality: 75,       // Lower number = smaller file, still sharp
      effort: 4,         // Speed-size tradeoff
      chromaSubsampling: '4:4:4'
    })
    .toFile(`${baseOutputPath}.avif`);


  // Convert to WebP
  // await image
  //   .clone()
  //   .webp({
  //     quality: 80,
  //     effort: 5 // 4–6 is a sweet spot between speed and size
  //   })
  //   .toFile(`${baseOutputPath}.webp`);


  console.log(`✅ Converted: ${file}`);
}
