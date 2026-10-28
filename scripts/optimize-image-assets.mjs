import sharp from 'sharp';
import { stat } from 'node:fs/promises';
import { dirname, join, parse } from 'node:path';

const imageRoot = join(process.cwd(), 'public', 'images');
const files = [
  'laundry-hero.png',
  'hero-stacked.png',
  'washer-lg-8kg-crop.png',
  'dryer-speedqueen.png',
  'steamer-boiler.jpg',
  'basket-laundry-crop.png',
  'case-atma-outlet.jpg',
  'case-dinar-outlet.jpg',
  'case-happy-family-outlet.jpg',
  'case-kila-outlet.jpg',
  'case-permata-outlet.jpg',
];

for (const file of files) {
  const source = join(imageRoot, file);
  const output = join(dirname(source), `${parse(file).name}.webp`);
  await sharp(source)
    .rotate()
    .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(output);
  const [before, after] = await Promise.all([stat(source), stat(output)]);
  console.log(`${file}: ${(before.size / 1024).toFixed(0)} KB -> ${(after.size / 1024).toFixed(0)} KB`);
}
