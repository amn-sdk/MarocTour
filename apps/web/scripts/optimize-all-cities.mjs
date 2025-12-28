#!/usr/bin/env node

/**
 * Optimize images for all cities
 * Usage: node scripts/optimize-all-cities.mjs
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const root = path.resolve(process.cwd());
const publicCitiesDir = path.join(root, 'public', 'images', 'cities');

if (!fs.existsSync(publicCitiesDir)) {
  console.error(`Cities directory not found: ${publicCitiesDir}`);
  process.exit(1);
}

// Get all city directories
const cities = fs.readdirSync(publicCitiesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)
  .filter(name => !name.startsWith('.'));

if (cities.length === 0) {
  console.log('No city directories found');
  process.exit(0);
}

console.log(`Found ${cities.length} cities: ${cities.join(', ')}\n`);

// Optimize each city
for (const city of cities) {
  console.log(`\n📸 Optimizing ${city}...`);
  try {
    execSync(`node scripts/optimize-images.mjs ${city}`, {
      cwd: root,
      stdio: 'inherit'
    });
    console.log(`✅ ${city} optimized`);
  } catch (error) {
    console.error(`❌ Failed to optimize ${city}:`, error.message);
  }
}

console.log(`\n✨ All cities optimized!`);

