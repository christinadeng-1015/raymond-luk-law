#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts images to WebP and AVIF formats for better performance
 * Run with: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ASSETS_DIR = path.join(__dirname, '../public/assets');
const BUILD_ASSETS_DIR = path.join(__dirname, '../build/assets');
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];
const FORMATS_TO_CREATE = ['webp', 'avif'];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

/**
 * Check if ImageMagick/GraphicsMagick or cwebp/avifenc is installed
 */
const checkDependencies = () => {
  const tools = ['convert', 'cwebp', 'avifenc'];
  const missing = [];

  tools.forEach((tool) => {
    try {
      execSync(`which ${tool}`, { stdio: 'ignore' });
    } catch {
      missing.push(tool);
    }
  });

  if (missing.length > 0) {
    log(`\n⚠️  Missing dependencies: ${missing.join(', ')}`, 'yellow');
    log('Install them using: brew install imagemagick webp libavif', 'yellow');
    log(
      'Or use: apt-get install imagemagick webp libavif-bin (Linux)',
      'yellow'
    );
    return false;
  }

  return true;
};

/**
 * Find all image files recursively
 */
const findImages = (dir) => {
  let images = [];

  const files = fs.readdirSync(dir, { withFileTypes: true });

  files.forEach((file) => {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      images = images.concat(findImages(fullPath));
    } else if (
      SUPPORTED_FORMATS.includes(path.extname(file.name).toLowerCase())
    ) {
      images.push(fullPath);
    }
  });

  return images;
};

/**
 * Convert image to WebP format
 */
const convertToWebP = (imagePath) => {
  const outputPath = imagePath.replace(/\.[^/.]+$/, '.webp');

  try {
    // Using cwebp for better quality and compression
    execSync(`cwebp -q 80 "${imagePath}" -o "${outputPath}"`, {
      stdio: 'pipe',
    });
    log(`✓ Created ${path.relative(ASSETS_DIR, outputPath)}`, 'green');
    return true;
  } catch (error) {
    // Fallback to ImageMagick if cwebp fails
    try {
      execSync(`convert "${imagePath}" -quality 80 "${outputPath}"`, {
        stdio: 'pipe',
      });
      log(`✓ Created ${path.relative(ASSETS_DIR, outputPath)}`, 'green');
      return true;
    } catch (err) {
      log(`✗ Failed to convert ${path.basename(imagePath)} to WebP`, 'red');
      return false;
    }
  }
};

/**
 * Convert image to AVIF format
 */
const convertToAVIF = (imagePath) => {
  const outputPath = imagePath.replace(/\.[^/.]+$/, '.avif');

  try {
    // Using avifenc for AVIF conversion
    execSync(`avifenc -j 4 -s 10 "${imagePath}" "${outputPath}"`, {
      stdio: 'pipe',
    });
    log(`✓ Created ${path.relative(ASSETS_DIR, outputPath)}`, 'green');
    return true;
  } catch (error) {
    // Fallback to ImageMagick if avifenc fails
    try {
      execSync(`convert "${imagePath}" -define heic:speed=10 "${outputPath}"`, {
        stdio: 'pipe',
      });
      log(`✓ Created ${path.relative(ASSETS_DIR, outputPath)}`, 'green');
      return true;
    } catch (err) {
      log(`✗ Failed to convert ${path.basename(imagePath)} to AVIF`, 'red');
      return false;
    }
  }
};

/**
 * Main optimization process
 */
const optimizeImages = () => {
  // Check if assets directory exists
  if (!fs.existsSync(ASSETS_DIR)) {
    log(`Assets directory not found: ${ASSETS_DIR}`, 'red');
    return;
  }

  log('\n🖼️  Image Optimization Script\n', 'cyan');
  log(`Scanning: ${ASSETS_DIR}\n`, 'cyan');

  const images = findImages(ASSETS_DIR);

  if (images.length === 0) {
    log('No images found to optimize.', 'yellow');
    return;
  }

  log(`Found ${images.length} image(s) to optimize\n`, 'cyan');

  let successCount = 0;
  let totalConversions = 0;

  images.forEach((imagePath) => {
    const relativePath = path.relative(ASSETS_DIR, imagePath);
    log(`\nProcessing: ${relativePath}`, 'cyan');

    // Skip if already optimized
    const baseName = imagePath.replace(/\.[^/.]+$/, '');
    const webpPath = `${baseName}.webp`;
    const avifPath = `${baseName}.avif`;

    const webpExists = fs.existsSync(webpPath);
    const avifExists = fs.existsSync(avifPath);

    if (webpExists && avifExists) {
      log('  → Already optimized, skipping', 'yellow');
      return;
    }

    // Convert to WebP
    if (!webpExists) {
      totalConversions++;
      if (convertToWebP(imagePath)) {
        successCount++;
      }
    }

    // Convert to AVIF
    if (!avifExists) {
      totalConversions++;
      if (convertToAVIF(imagePath)) {
        successCount++;
      }
    }
  });

  log(
    `\n✓ Optimization complete: ${successCount}/${totalConversions} conversions successful\n`,
    'green'
  );
};

// Run the optimization
if (checkDependencies()) {
  optimizeImages();
} else {
  log('\nPlease install the required dependencies and try again.', 'red');
  process.exit(1);
}
