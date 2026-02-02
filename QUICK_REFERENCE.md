# Image Optimization Quick Reference

## 📋 Checklist

- [x] OptimizedImage component created (`src/components/OptimizedImage.jsx`)
- [x] Optimization script created (`scripts/optimize-images.js`)
- [x] Build script updated (package.json)
- [x] Sample components updated (TeamCard.jsx, Services.jsx)
- [x] Documentation created (IMAGE_OPTIMIZATION.md)
- [ ] Dependencies installed (`brew install imagemagick webp libavif`)
- [ ] Images optimized (`npm run optimize-images`)
- [ ] Remaining components updated (see OPTIMIZATION_EXAMPLES.md)

## 🚀 Quick Start

```bash
# 1. Install dependencies (one time)
brew install imagemagick webp libavif

# 2. Optimize images
npm run optimize-images

# 3. Update components as needed
# Import: import OptimizedImage from '../components/OptimizedImage';
# Replace: <img src={...} /> → <OptimizedImage src={...} />

# 4. Build and deploy
npm run build
```

## 📦 What Was Added

### Files Created

- `src/components/OptimizedImage.jsx` - Image optimization component
- `scripts/optimize-images.js` - Image conversion script
- `IMAGE_OPTIMIZATION.md` - Comprehensive guide
- `NEXT_GEN_IMAGES_IMPLEMENTATION.md` - Implementation summary
- `OPTIMIZATION_EXAMPLES.md` - Code examples for all components

### Files Modified

- `package.json` - Added npm scripts
- `src/sections/team/TeamCard.jsx` - Using OptimizedImage
- `src/sections/home/Services.jsx` - Using OptimizedImage

## 🎯 Component Usage

```jsx
import OptimizedImage from '../components/OptimizedImage';

<OptimizedImage
  src="/assets/image.jpg"
  alt="Description"
  originalFormat="jpg" // jpg, png (default: jpg)
  className="..." // CSS classes
  lazy={true} // lazy loading (default: true)
/>;
```

## 📊 Performance Gains

| Format   | Size Reduction | Browser Support |
| -------- | -------------- | --------------- |
| AVIF     | -50% vs JPG    | 85% (modern)    |
| WebP     | -30% vs JPG    | 95%             |
| Fallback | 0%             | 100%            |

## 🔧 Dependencies

```bash
# Required for optimization script
brew install imagemagick  # Image conversion
brew install webp        # WebP format
brew install libavif     # AVIF format
```

## 📍 Component Locations

### Already Updated

- ✅ `src/sections/team/TeamCard.jsx`
- ✅ `src/sections/home/Services.jsx`

### Need Update (16 files)

See `OPTIMIZATION_EXAMPLES.md` for each:

1. Navbar.jsx
2. Footer.jsx
3. Service.jsx
4. ServicesTabs.jsx
5. OfficeImageCarousel.jsx
6. ContactContainer.jsx
7. ResourceContainer.jsx
8. InstagramEmbed.jsx
9. Home.js
10. Career.js
11. Team.js
12. Services.js
13. - others with `<img>` tags

## 🛠️ Maintenance

### Before Each Build

```bash
npm run build  # Automatically optimizes images
```

### Manual Optimization

```bash
npm run optimize-images  # Convert images only
```

### Monitor Performance

1. Open DevTools Network tab
2. Check image sizes and formats
3. Verify AVIF/WebP served to modern browsers
4. Fall back to JPG/PNG on older browsers

## ⚠️ Important Notes

1. **Dependencies First**: Must install tools before running optimization
2. **Original Files**: JPG/PNG originals are never deleted
3. **Automatic**: Build process includes optimization
4. **Fallback**: Old browsers get original format automatically
5. **Safe**: Can always delete .webp/.avif files to rollback

## 📖 Documentation Files

- **IMAGE_OPTIMIZATION.md** - Complete guide with installation & troubleshooting
- **NEXT_GEN_IMAGES_IMPLEMENTATION.md** - What was changed and why
- **OPTIMIZATION_EXAMPLES.md** - Code examples for every component
- **This file** - Quick reference

## 🤔 FAQ

**Q: Do I need to manually convert images?**
A: No, the script does it automatically. Just run `npm run optimize-images`.

**Q: Will old browsers break?**
A: No, they automatically get the original JPG/PNG fallback.

**Q: Do I need to update all components at once?**
A: No, you can incrementally update them. Already-updated components work alongside regular img tags.

**Q: How much smaller will the site be?**
A: Typically 30-50% smaller for images, depending on image count and types.

**Q: What if optimization fails?**
A: Check that dependencies are installed. See IMAGE_OPTIMIZATION.md troubleshooting section.

## 🔍 Verification

```bash
# Check if images were optimized
ls -la public/assets/team/ | grep raymond-luk

# Should see:
# raymond-luk.jpg    (original)
# raymond-luk.webp   (generated)
# raymond-luk.avif   (generated)

# Check file sizes
du -h public/assets/team/raymond-luk.*
```

## 📚 External Resources

- [WebP Format](https://developers.google.com/speed/webp)
- [AVIF Format](https://github.com/AOMediaCodec/av1-avif)
- [Picture Element MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture)
- [Image Optimization Guide](https://web.dev/use-imagemin-to-compress-images/)
