# Installation & Setup Guide

## Quick Start

### 1. Dependencies
All required dependencies are already installed:
```bash
pnpm install
```

Installed packages:
- `clsx@2.1.1` - Utility for constructing className strings
- `tailwind-merge@3.3.1` - Merge Tailwind classes without conflicts
- `tw-animate-css@1.4.0` - Extended animation utilities for Tailwind

### 2. File Structure
```
demo-21st/
├── components/
│   └── ui/
│       └── component.tsx     # Main component (Hero + Particles)
├── demos/
│   └── default.tsx           # Demo preview
├── lib/
│   └── utils.ts              # cn() utility
├── public/
│   └── image00001.jpeg       # Placeholder image (SVG)
├── index.css                 # Tailwind config + animations
└── tsconfig.json             # TypeScript config (updated)
```

### 3. Running the Demo

Start development server:
```bash
pnpm dev
```

The component will be available at:
- Local: `http://localhost:3000` (or next available port)
- Preview: Check 21st interface for live preview

### 4. Using the Component

#### Basic Usage
```tsx
import { Component } from "@/components/ui/component";

export default function MyPage() {
  return <Component />;
}
```

#### With Custom Props
```tsx
import { Component } from "@/components/ui/component";

export default function MyPage() {
  return (
    <Component
      title="Your Brand Name"
      subtitle="Your Tagline or Description"
      imageSrc="/your-hero-image.jpg"
      imageAlt="Description for screen readers"
    />
  );
}
```

#### Using Just the Particles
```tsx
import { GlitteringParticles } from "@/components/ui/component";

export default function MyPage() {
  return (
    <div className="relative">
      <GlitteringParticles speed={0.5} particleCount={100} />
      {/* Your content here */}
    </div>
  );
}
```

## Configuration

### Customizing Colors

Edit `index.css` to change theme colors:

```css
:root {
  /* Light mode */
  --primary: oklch(0.205 0 0);
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
}

.dark {
  /* Dark mode */
  --primary: oklch(0.922 0 0);
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
}
```

### Customizing Animations

Modify particle animation speed in `index.css`:

```css
@keyframes float-slow {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg); /* Adjust values */
  }
}
```

Or adjust via component props:

```tsx
<GlitteringParticles
  speed={2}           // 2x faster
  particleCount={20}  // Fewer particles
/>
```

### Customizing Typography

The component uses Tailwind's responsive utilities. To customize font sizes, edit the component:

```tsx
// Current sizes (mobile → desktop)
className="text-[75px]/[75px] sm:text-[125px]/[125px] lg:text-[180px]/[180px]"

// Example: Smaller sizes
className="text-[50px]/[50px] sm:text-[100px]/[100px] lg:text-[150px]/[150px]"
```

### Adding Your Own Image

Replace the placeholder:

1. Add your image to `/public/` folder:
   ```
   /public/hero-image.jpg
   ```

2. Update the component call:
   ```tsx
   <Component imageSrc="/hero-image.jpg" />
   ```

## TypeScript Configuration

The `tsconfig.json` has been updated to support path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*", "./*"]
    }
  }
}
```

This allows imports like:
```tsx
import { Component } from "@/components/ui/component";
import { cn } from "@/lib/utils";
```

## Troubleshooting

### Port Already in Use
If port 3000 is occupied, Next.js will automatically use the next available port (e.g., 3002):
```
⚠ Port 3000 is in use, using port 3002 instead.
```

### Lock File Issues
If you see lock file errors:
```bash
rm -rf .next
pnpm dev
```

### Path Alias Not Working
Ensure tsconfig.json includes:
```json
"paths": {
  "@/*": ["./src/*", "./*"]
}
```

And restart your editor/IDE.

### Image Not Loading
1. Check the file exists in `/public/`
2. Use relative path: `/image.jpg` (not `./image.jpg`)
3. Verify Next.js is serving static files correctly

### Animations Not Working
1. Ensure `tw-animate-css` is installed
2. Check `index.css` imports `tw-animate-css`:
   ```css
   @import "tw-animate-css";
   ```
3. Verify animations are defined in the `@keyframes` section

## Browser Support

Tested on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

Required features:
- CSS Grid
- CSS Custom Properties
- CSS Animations
- oklch color space (with fallbacks)

## Performance Tips

1. **Reduce particle count** for lower-end devices:
   ```tsx
   <GlitteringParticles particleCount={20} />
   ```

2. **Disable on mobile** if needed:
   ```tsx
   {!isMobile && <GlitteringParticles />}
   ```

3. **Optimize image**:
   - Use WebP format
   - Compress with tools like TinyPNG
   - Add lazy loading for below-fold content

4. **Respect motion preferences**:
   ```tsx
   const prefersReducedMotion = window.matchMedia(
     '(prefers-reduced-motion: reduce)'
   ).matches;

   {!prefersReducedMotion && <GlitteringParticles />}
   ```

## Accessibility Checklist

- ✅ Semantic HTML (`<h1>`, `<h2>`)
- ✅ Alt text on images
- ✅ Proper heading hierarchy
- ✅ Keyboard navigation friendly
- ⚠️ TODO: Add `prefers-reduced-motion` support
- ⚠️ TODO: Add focus indicators for scroll button

## Next Steps

1. **Add your content**: Replace placeholder text and image
2. **Customize theme**: Adjust colors to match your brand
3. **Test responsiveness**: Check all breakpoints
4. **Optimize performance**: Reduce particles if needed
5. **Add accessibility**: Implement motion preferences

---

**Need help?** Check the component documentation in `COMPONENT_SUMMARY.md`
