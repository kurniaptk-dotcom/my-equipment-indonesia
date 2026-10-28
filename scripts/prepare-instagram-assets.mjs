import sharp from 'sharp';
import fs from 'fs';

const input = 'C:/Users/user/.gemini/antigravity/brain/e443a1e8-1470-41bf-9151-7c8837863f68/.user_uploaded/media_1793169594900_21ec1099.png';
const outDir = 'public/images/instagram';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function maskCircle(sourceInput, extractRegion, outFile, targetSize) {
  const mask = Buffer.from(
    `<svg width="${targetSize}" height="${targetSize}"><circle cx="${targetSize/2}" cy="${targetSize/2}" r="${targetSize/2 - 1}" fill="#fff"/></svg>`
  );

  const cropped = await sharp(sourceInput)
    .extract(extractRegion)
    .resize(targetSize, targetSize, { fit: 'cover' })
    .toBuffer();

  await sharp(cropped)
    .composite([{ input: mask, blend: 'dest-in' }])
    .webp({ quality: 90 })
    .toFile(outFile);
}

async function run() {
  // Avatar
  await maskCircle(
    input,
    { left: 52, top: 158, width: 180, height: 180 },
    `${outDir}/avatar.webp`,
    180
  );

  // Story highlights
  await maskCircle(
    input,
    { left: 77, top: 577, width: 82, height: 82 },
    `${outDir}/highlight-pengiriman.webp`,
    84
  );

  await maskCircle(
    input,
    { left: 202, top: 577, width: 82, height: 82 },
    `${outDir}/highlight-balai-karangan.webp`,
    84
  );

  await maskCircle(
    input,
    { left: 324, top: 577, width: 82, height: 82 },
    `${outDir}/highlight-sambas.webp`,
    84
  );

  await maskCircle(
    input,
    { left: 446, top: 577, width: 82, height: 82 },
    `${outDir}/highlight-training.webp`,
    84
  );

  console.log('Instagram webp assets generated successfully!');
}

run().catch(console.error);

