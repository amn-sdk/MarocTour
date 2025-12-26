import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const city = process.argv[2];
if (!city) {
  console.error('Usage: node scripts/optimize-images.mjs <city-slug>');
  process.exit(1);
}

const root = path.resolve(process.cwd());
const publicCitiesDir = path.join(root, 'public', 'images', 'cities');
const cityDir = path.join(publicCitiesDir, city);

if (!fs.existsSync(cityDir)) {
  console.error(`City directory not found: ${cityDir}`);
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function isRaster(file) {
  const ext = path.extname(file).toLowerCase();
  return ['.png', '.jpg', '.jpeg'].includes(ext);
}

async function optimizeOne(file) {
  const ext = path.extname(file).toLowerCase();
  const base = file.slice(0, -ext.length);

  // Resize large hero-like assets up to 1920px max width, otherwise keep size
  const shouldResize = /hero|gare|panorama|banner/i.test(path.basename(base));
  const pipeline = sharp(file);
  const meta = await pipeline.metadata();
  const width = meta.width || 0;
  const target = shouldResize && width > 1920 ? 1920 : null;

  // Overwrite optimized original (lossless for PNG, mozjpeg for JPG)
  if (ext === '.png') {
    await sharp(file)
      .resize(target ? { width: target, withoutEnlargement: true } : {})
      .png({ compressionLevel: 9, palette: true })
      .toFile(file + '.opt');
  } else {
    await sharp(file)
      .resize(target ? { width: target, withoutEnlargement: true } : {})
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(file + '.opt');
  }
  fs.renameSync(file + '.opt', file);

  // WebP sidecar
  await sharp(file)
    .resize(target ? { width: target, withoutEnlargement: true } : {})
    .webp({ quality: 80 })
    .toFile(base + '.webp');
}

async function ensureCoverFromHero() {
  const cover = path.join(publicCitiesDir, `${city}.jpg`);
  if (fs.existsSync(cover)) return;

  const heroCandidates = ['hero.png', 'hero.jpg', 'Hero.png'];
  for (const candidate of heroCandidates) {
    const p = path.join(cityDir, candidate);
    if (fs.existsSync(p)) {
      await sharp(p)
        .resize({ width: 1600, withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(cover);
      return;
    }
  }
}

async function main() {
  const files = walk(cityDir).filter(isRaster);
  for (const f of files) {
    // Skip already-generated webp (guard if re-run)
    if (f.toLowerCase().endsWith('.webp')) continue;
    await optimizeOne(f);
  }
  await ensureCoverFromHero();
  console.log(`Optimized assets for city: ${city}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


