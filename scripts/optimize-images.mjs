/**
 * Shrinks the photos bundled from src/assets/images in place:
 * resizes anything wider than MAX_WIDTH and re-encodes JPEGs with mozjpeg.
 * Usage: node scripts/optimize-images.mjs [--backup <dir>] [--width 1600] [--quality 78] [--only a.jpg,b.jpg]
 */
import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const arg = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
};

const MAX_WIDTH = Number(arg('--width', 1600));
const JPEG_QUALITY = Number(arg('--quality', 78));
const only = arg('--only', '').split(',').map((s) => s.trim()).filter(Boolean);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = path.join(root, 'src', 'assets', 'images');

const backupDir = arg('--backup', '');
if (backupDir) await mkdir(backupDir, { recursive: true });

let before = 0;
let after = 0;
for (const file of await readdir(imagesDir)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  if (only.length && !only.includes(file)) continue;
  const filePath = path.join(imagesDir, file);
  // Read into memory first so no file handle stays open while we overwrite (Windows).
  const original = await readFile(filePath);
  const originalSize = original.length;
  if (backupDir) await copyFile(filePath, path.join(backupDir, file));

  const image = sharp(original, { failOn: 'none' });
  const meta = await image.metadata();
  let pipeline = image.rotate();
  if ((meta.width ?? 0) > MAX_WIDTH) pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const buffer = /\.png$/i.test(file)
    ? await pipeline.png({ compressionLevel: 9, palette: true }).toBuffer()
    : await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();

  if (buffer.length < originalSize) await writeFile(filePath, buffer);
  const finalSize = Math.min(buffer.length, originalSize);
  before += originalSize;
  after += finalSize;
  console.log(`${file.padEnd(48)} ${(originalSize / 1024).toFixed(0).padStart(5)} KB -> ${(finalSize / 1024).toFixed(0).padStart(5)} KB`);
}
console.log(`\nTotal: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`);
