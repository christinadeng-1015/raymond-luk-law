import React from 'react';

/**
 * OptimizedImage Component
 * Serves images in next-gen formats (WebP, AVIF) with fallback to original format
 * Provides responsive image loading with lazy loading support
 *
 * @param {string} src - Path to the original image (without extension)
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - CSS classes to apply
 * @param {boolean} lazy - Whether to use lazy loading (default: true)
 * @param {string} originalFormat - Original format extension (e.g., 'jpg', 'png')
 * @param {object} srcSet - Optional responsive image sizes
 * Example: { "mobile": "src-mobile", "tablet": "src-tablet", "desktop": "src-desktop" }
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  lazy = true,
  originalFormat = 'jpg',
  srcSet = null,
  ...props
}) => {
  // Generate the image path without extension
  const basePath =
    src.lastIndexOf('.') > 0 ? src.substring(0, src.lastIndexOf('.')) : src;

  // Build source set for responsive images if provided
  const buildSourceSet = (path, format) => {
    if (!srcSet) return `${path}.${format}`;

    return Object.entries(srcSet)
      .map(([size, sizePath]) => `${sizePath}.${format} ${size}`)
      .join(', ');
  };

  return (
    <picture>
      {/* AVIF format - most efficient, modern browsers only */}
      <source srcSet={buildSourceSet(basePath, 'avif')} type="image/avif" />
      {/* WebP format - good browser support */}
      <source srcSet={buildSourceSet(basePath, 'webp')} type="image/webp" />
      {/* Fallback to original format */}
      <img
        src={`${basePath}.${originalFormat}`}
        alt={alt}
        className={className}
        loading={lazy ? 'lazy' : 'eager'}
        {...props}
      />
    </picture>
  );
};

export default OptimizedImage;
