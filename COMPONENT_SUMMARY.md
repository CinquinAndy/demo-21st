# Hero Component - Files Summary

## ✅ Files Created

### 1. `/components/ui/component.tsx`
**Main Component File**

Contains two exportable components:

#### `GlitteringParticles`
- Creates animated floating sparkle effect
- Props:
  - `speed?: number` (default: 1) - Animation speed multiplier
  - `particleCount?: number` (default: 50) - Number of particles
- Features:
  - Random positioning (X/Y coordinates)
  - Variable particle sizes (2-6px)
  - Staggered animation delays
  - GPU-accelerated transforms

#### `Component` (Hero Section)
- Full-screen hero section with responsive layout
- Props:
  - `title?: string` - Main heading
  - `subtitle?: string` - Secondary heading
  - `imageSrc?: string` - Hero image path
  - `imageAlt?: string` - Image alt text
- Layout:
  - Two-column grid (stacks on mobile)
  - Text content on left
  - Image with gradient overlay on right
  - Scroll indicator at bottom
  - Integrated glittering particles background

---

### 2. `/demos/default.tsx`
**Demo/Preview File**

Shows the hero component in action with example props:
```tsx
<Component
  title="Makeup Artist"
  subtitle="Maeva Cinquin - Maquilleuse Professionnelle"
  imageSrc="/image00001.jpeg"
  imageAlt="Hero Section Image"
/>
```

This is what users will see in the 21st preview interface.

---

### 3. `/index.css`
**Styles & Theme Configuration**

Includes:
- **Tailwind 4 imports**: Base CSS framework
- **CSS Custom Properties**: Theme variables for colors, spacing, shadows
- **Light/Dark Mode**: Full theme support with oklch colors
- **Custom Animations**:
  ```css
  @keyframes float-slow {
    /* Smooth floating with rotation */
  }
  @keyframes float-medium {
    /* Medium speed floating */
  }
  ```
- **Global Resets**: Box-sizing, scrollbar hiding, smooth scroll

Color Palette (Dark Theme):
- Primary: `oklch(0.922 0 0)` - Light gray/white
- Background: `oklch(0.145 0 0)` - Dark
- Foreground: `oklch(0.985 0 0)` - Near white
- Accent: `oklch(0.269 0 0)` - Medium dark

---

### 4. `/lib/utils.ts`
**Utility Functions**

Single export:
```tsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Combines `clsx` and `tailwind-merge` for intelligent class name handling:
- Merges conditional classes
- Resolves Tailwind conflicts (e.g., `p-4` vs `p-2` → keeps last one)

---

### 5. `/public/image00001.jpeg`
**Placeholder Image (SVG)**

Gradient SVG placeholder with:
- Dimensions: 1920x1080
- Gradient colors matching theme
- Text instructions to replace with actual image

**Note**: Replace this with an actual JPEG/PNG for production use.

---

## 📦 Dependencies Installed

```json
{
  "clsx": "2.1.1",
  "tailwind-merge": "3.3.1",
  "tw-animate-css": "1.4.0"
}
```

---

## 🎨 Component Structure

```
Hero Section (Component)
├── GlitteringParticles (Background Layer)
│   └── 50 animated particles with random positions
├── Text Content (Left Column)
│   ├── Large Title (responsive: 75px → 380px)
│   └── Subtitle (responsive: text-4xl → text-7xl)
├── Scroll Indicator (Bottom Center)
│   └── Animated bounce arrow
└── Image Section (Right Column)
    ├── Hero Image (flipped horizontally)
    └── Gradient Overlay (smooth transition)
```

---

## 🚀 Usage in 21st

The component follows 21st conventions:

1. **Component File**: `/components/ui/component.tsx`
   - Named export: `Component`
   - Fully documented with JSDoc comments

2. **Demo File**: `/demos/default.tsx`
   - Default export renders the component
   - Shows realistic use case

3. **Styles**: `/index.css`
   - Tailwind 4 configuration
   - Theme variables
   - Custom animations

---

## 🎯 Key Features

✅ **Fully Responsive**
- Mobile-first design
- Breakpoints: sm, lg, xl, 2xl, 3xl
- Typography scales smoothly

✅ **Performance Optimized**
- GPU-accelerated animations
- `will-change` hints for smooth transforms
- CSS animations (not JS)

✅ **Theme Support**
- Light & dark mode ready
- CSS custom properties
- oklch color space

✅ **Accessible**
- Semantic HTML
- Proper heading hierarchy
- Alt text on images
- Keyboard friendly

✅ **Customizable**
- All props optional with sensible defaults
- Easy to modify colors via CSS vars
- Adjustable particle count/speed

---

## 📝 Next Steps

1. **Replace Placeholder Image**
   - Add actual hero image to `/public/`
   - Update `imageSrc` prop in demo

2. **Customize Colors**
   - Modify CSS variables in `index.css`
   - Adjust particle colors (currently uses `--primary`)

3. **Add Motion Preferences**
   - Respect `prefers-reduced-motion`
   - Disable particles for users who prefer less motion

4. **Test Responsiveness**
   - Check all breakpoints
   - Verify text doesn't overflow
   - Test on mobile devices

---

## 🔧 Configuration

All configuration is in `index.css`:

```css
/* Change particle colors */
.bg-primary/60 → .bg-accent/60

/* Adjust animation speed */
--animate-float-slow: float-slow 6s → 8s

/* Modify theme colors */
--primary: oklch(...) → your color
```

---

**Ready to use in 21st! 🎉**
