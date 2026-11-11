/**
 * Saat Phere Events - Cloudinary Batch Upload & Migration Script
 *
 * This script scans `frontend/public/images/` and uploads images to your Cloudinary cloud.
 * It produces `scripts/cloudinary-mapping.json` containing the mapping from local paths to Cloudinary CDN URLs.
 *
 * Usage:
 *   node scripts/upload-to-cloudinary.js
 *   node scripts/upload-to-cloudinary.js --folder=gallery
 *   node scripts/upload-to-cloudinary.js --dry-run
 */

const fs = require('fs');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

// Load environment variables from frontend/.env.local or backend/.env
const envLocalPath = path.join(__dirname, '..', 'frontend', '.env.local');
const backendEnvPath = path.join(__dirname, '..', 'backend', '.env');

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  });
}

loadEnv(envLocalPath);
loadEnv(backendEnvPath);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'ct7edeoo',
  api_key: process.env.CLOUDINARY_API_KEY || '934886645915611',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'esPcHh9GKecj7PvEzz2K9YmTyEE',
  secure: true,
});

const isDryRun = process.argv.includes('--dry-run');
const folderArg = process.argv.find((arg) => arg.startsWith('--folder='));
const targetSubfolder = folderArg ? folderArg.split('=')[1] : null;

const imagesBaseDir = path.join(__dirname, '..', 'frontend', 'public', 'images');
const mappingFilePath = path.join(__dirname, 'cloudinary-mapping.json');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg']);

function getAllImageFiles(dir) {
  let files = [];
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllImageFiles(fullPath));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (IMAGE_EXTENSIONS.has(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function main() {
  console.log('====================================================');
  console.log(' Saat Phere Events - Cloudinary Migration Tool');
  console.log(` Cloud Name: ${cloudinary.config().cloud_name}`);
  console.log(` Mode: ${isDryRun ? 'DRY-RUN (Simulated)' : 'LIVE UPLOAD'}`);
  console.log('====================================================\n');

  // Verify connection
  try {
    const ping = await cloudinary.api.ping();
    console.log(`✓ Cloudinary Connection Verified (${ping.status})\n`);
  } catch (err) {
    console.error('✗ Failed to connect to Cloudinary:', err.message);
    process.exit(1);
  }

  const startDir = targetSubfolder
    ? path.join(imagesBaseDir, targetSubfolder)
    : imagesBaseDir;

  console.log(`Scanning directory: ${startDir}`);
  const allImages = getAllImageFiles(startDir);
  console.log(`Found ${allImages.length} images to process.\n`);

  let mapping = {};
  if (fs.existsSync(mappingFilePath)) {
    try {
      mapping = JSON.parse(fs.readFileSync(mappingFilePath, 'utf-8'));
    } catch {
      mapping = {};
    }
  }

  let uploadedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (let i = 0; i < allImages.length; i++) {
    const localFilePath = allImages[i];
    const relativeToPublic = path
      .relative(path.join(__dirname, '..', 'frontend', 'public'), localFilePath)
      .replace(/\\/g, '/');
    const localUrl = `/${relativeToPublic}`;

    if (mapping[localUrl]) {
      skippedCount++;
      continue;
    }

    // Cloudinary destination folder
    const relativeSubdir = path.dirname(relativeToPublic).replace(/^images\/?/, '');
    const folder = `saat-phere-events/${relativeSubdir || 'general'}`;
    const filenameNoExt = path.basename(localFilePath, path.extname(localFilePath));

    const progress = `[${i + 1}/${allImages.length}]`;

    if (isDryRun) {
      console.log(`${progress} [DRY-RUN] Would upload: ${localUrl} -> ${folder}/${filenameNoExt}`);
      uploadedCount++;
      continue;
    }

    try {
      process.stdout.write(`${progress} Uploading ${localUrl} ... `);
      const res = await cloudinary.uploader.upload(localFilePath, {
        folder,
        public_id: filenameNoExt,
        overwrite: false,
        resource_type: 'image',
        quality: 'auto',
        fetch_format: 'auto',
      });

      mapping[localUrl] = res.secure_url;
      uploadedCount++;
      console.log(`✓ ${res.secure_url}`);

      // Save mapping periodically
      if (uploadedCount % 10 === 0) {
        fs.writeFileSync(mappingFilePath, JSON.stringify(mapping, null, 2));
      }
    } catch (err) {
      failedCount++;
      console.log(`✗ Error: ${err.message}`);
    }
  }

  if (!isDryRun) {
    fs.writeFileSync(mappingFilePath, JSON.stringify(mapping, null, 2));
  }

  console.log('\n====================================================');
  console.log(' Migration Summary:');
  console.log(` Total processed: ${allImages.length}`);
  console.log(` Uploaded:        ${uploadedCount}`);
  console.log(` Already mapped:  ${skippedCount}`);
  console.log(` Failed:          ${failedCount}`);
  console.log(` Mapping saved:   ${mappingFilePath}`);
  console.log('====================================================');
}

main().catch(console.error);

