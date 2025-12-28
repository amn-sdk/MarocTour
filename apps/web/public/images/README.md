# Images Organization Guide

This directory contains all static images for the MarocTour application, organized by category.

## 📁 Directory Structure

```
images/
├── cities/                    # City-specific images
│   ├── casablanca/
│   ├── fes/
│   ├── kenitra/
│   ├── nador/
│   ├── casablanca.jpg         # Cover images (used in quiz listings)
│   ├── fes.jpg
│   ├── kenitra.jpg
│   └── nador.jpg
└── marocpageaccueil.png       # Homepage image
```

## 🏙️ City Images Structure

Each city has its own directory under `cities/` with the following structure:

```
cities/{city-slug}/
├── hero.jpg (or .png)         # Main hero image (left side in split-screen)
├── hero.webp                  # WebP version (auto-generated)
├── {feature}.jpg              # Feature images (tanneries, medina, etc.)
├── {feature}.webp            # WebP versions (auto-generated)
├── history_{period}.jpg      # Historical background images
└── README.md                  # City-specific image documentation
```

### Required Images per City

#### Hero Section (Split-screen)
- **Left side**: `medina.jpg` or `hero.jpg` - Main city view
- **Right side**: `tanneries.jpg` or `art_deco.jpg` - Distinctive feature
- **Format**: JPG or PNG
- **Recommended size**: 1920x1080px or larger (landscape)
- **Optimization**: Automatically optimized and WebP versions created

#### History Section
- **Background**: `history_foundation.jpg` or `history_{period}.jpg`
- **Format**: JPG or PNG
- **Recommended size**: 1920x1080px
- **Usage**: Subtle background (5% opacity) for history timeline

#### Cover Image (Root Level)
- **Location**: `cities/{city-slug}.jpg`
- **Purpose**: Used in quiz listings and city cards
- **Format**: JPG
- **Size**: 1600px width (auto-generated from hero image)

## 🖼️ Image Optimization

### Automatic Optimization

Run the optimization script for a specific city:

```bash
cd apps/web
pnpm images:optimize:kenitra  # For Kénitra
# Or use the script directly:
node scripts/optimize-images.mjs {city-slug}
```

### What the Script Does

1. **Optimizes original images**:
   - PNG: Lossless compression (level 9)
   - JPG: MozJPEG quality 82
   - Resizes hero images to max 1920px width

2. **Creates WebP versions**:
   - Quality: 80
   - Same dimensions as optimized originals
   - ~30-50% smaller file size

3. **Generates cover image**:
   - Creates `{city-slug}.jpg` at root level
   - 1600px width, optimized JPG

### Manual Optimization

If you need to optimize images manually:

```bash
# Using sharp (Node.js)
npx sharp-cli -i input.jpg -o output.jpg --quality 82
npx sharp-cli -i input.jpg -o output.webp --webp
```

## 📋 Image Naming Conventions

### City Images
- Use lowercase with underscores: `medina.jpg`, `tanneries.jpg`
- Descriptive names: `history_foundation.jpg`, `art_deco.png`
- Hero images: `hero.jpg` or `hero.png`

### Cover Images
- Format: `{city-slug}.jpg` (e.g., `fes.jpg`, `casablanca.jpg`)
- Located at: `cities/{city-slug}.jpg`

## 🎨 Image Requirements

### Formats
- **Primary**: JPG (for photos), PNG (for graphics with transparency)
- **Optimized**: WebP (auto-generated, used when supported)

### Dimensions
- **Hero images**: Minimum 1920x1080px (16:9 aspect ratio)
- **Feature images**: Minimum 800x600px
- **Cover images**: 1600px width (auto-generated)

### File Size
- **Hero images**: < 500KB (optimized)
- **Feature images**: < 200KB (optimized)
- **WebP versions**: ~30-50% smaller than originals

### Quality Guidelines
- **JPG quality**: 82 (good balance of quality/size)
- **WebP quality**: 80
- **PNG compression**: Level 9

## 🔄 Workflow for Adding New City Images

1. **Add raw images** to `cities/{city-slug}/`:
   ```bash
   cp my-image.jpg apps/web/public/images/cities/fes/
   ```

2. **Run optimization script**:
   ```bash
   cd apps/web
   node scripts/optimize-images.mjs fes
   ```

3. **Verify results**:
   - Check that WebP versions were created
   - Verify cover image exists at root level
   - Check file sizes are reasonable

4. **Update code** to reference images:
   ```tsx
   backgroundImage: 'url(/images/cities/fes/medina.jpg)'
   ```

## 📊 Current City Assets

### ✅ Optimized Cities
- **Kénitra**: Hero, gare, coucher de soleil (PNG + WebP)
- **Fès**: Medina, tanneries, history_foundation (JPG + WebP)

### ⚠️ Needs Optimization
- **Casablanca**: Has PNG images, WebP versions recommended
- **Nador**: Has JPG images, WebP versions recommended

## 🚀 Performance Tips

1. **Use WebP when possible**: Modern browsers support it, ~30-50% smaller
2. **Lazy load images**: Use Next.js Image component with `loading="lazy"`
3. **Responsive images**: Use `srcset` for different screen sizes
4. **Optimize before upload**: Run optimization script before committing

## 📝 Notes

- All images are served from `/images/` path (Next.js public folder)
- WebP versions are automatically used by browsers that support them
- Fallback to JPG/PNG for older browsers
- Images are cached by the browser and CDN

## 🔗 Related Files

- Optimization script: `apps/web/scripts/optimize-images.mjs`
- Package.json script: `pnpm images:optimize:{city}`
- City image READMEs: `cities/{city-slug}/README.md`

