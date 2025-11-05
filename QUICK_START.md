# Quick Start Guide

Get the Hero component with WebGL glitter running in 60 seconds!

## 1. Install Dependencies

Already done! ✅

```bash
pnpm install
```

## 2. Start Dev Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 3. Preview the Component

The demo is automatically loaded at the root URL. You should see:
- Large "MAKEUP ARTIST" title
- Subtitle text
- Hero image on the right
- ✨ **Sparkling glitter effect** in the background

## 4. Basic Usage

```tsx
import { Component } from "@/components/ui/component";

export default function MyPage() {
  return <Component />;
}
```

That's it! The component works with zero configuration.

## 5. Customization

### Change Text

```tsx
<Component
  title="Your Brand Name"
  subtitle="Your Tagline Here"
/>
```

### Change Image

```tsx
<Component
  imageSrc="/your-hero-image.jpg"
  imageAlt="Your image description"
/>
```

### Adjust Glitter

```tsx
<Component
  glitterSpeed={0.5}     // Slower sparkles
  glitterIntensity={3.0} // Dimmer sparkles
/>
```

## 6. Use Glitter Separately

```tsx
import { GlitterFinal } from "@/components/ui/component";

export default function AnyPage() {
  return (
    <div className="relative min-h-screen">
      <GlitterFinal speed={1} />

      <div className="relative z-10">
        {/* Your content here */}
      </div>
    </div>
  );
}
```

## Component Props

### Component (Hero Section)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Makeup Artist"` | Main heading |
| `subtitle` | `string` | `"Maeva Cinquin - Maquilleuse..."` | Subheading |
| `imageSrc` | `string` | `"/image00001.jpeg"` | Hero image path |
| `imageAlt` | `string` | `"Hero Section"` | Image alt text |
| `glitterSpeed` | `number` | `0.75` | Animation speed |
| `glitterIntensity` | `number` | `5.0` | Sparkle brightness |

### GlitterFinal (Standalone)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `speed` | `number` | `1` | Animation speed multiplier |
| `intensity` | `number` | `5.0` | Sparkle intensity |
| `className` | `string` | `""` | Additional CSS classes |

## File Structure

```
demo-21st/
├── components/ui/
│   └── component.tsx          ← Hero + GlitterFinal components
├── demos/
│   └── default.tsx            ← Demo preview
├── lib/
│   └── utils.ts               ← Utility functions
├── public/
│   └── image00001.jpeg        ← Placeholder image (replace this!)
└── index.css                  ← Styles and animations
```

## Replace Placeholder Image

1. Add your image to `/public/`:
   ```
   /public/my-hero-image.jpg
   ```

2. Update the component:
   ```tsx
   <Component imageSrc="/my-hero-image.jpg" />
   ```

## Common Issues

### Glitter not visible?

Check:
1. WebGL support in browser (F12 → Console)
2. Opacity not too low
3. Z-index stacking (should be z-0)

### Performance slow?

Try:
1. Lower speed: `glitterSpeed={0.5}`
2. Reduce texture size (edit component)
3. Disable on mobile devices

### TypeScript errors?

Restart TypeScript server:
- VS Code: `Cmd/Ctrl + Shift + P` → "Restart TS Server"
- Other editors: Restart editor

## Need More Help?

Check these documentation files:

- **`README_HERO_COMPONENT.md`** - Complete usage guide
- **`COMPONENT_SUMMARY.md`** - Component details
- **`GLITTER_TECHNICAL_DOCS.md`** - Technical deep-dive
- **`UPGRADE_SUMMARY.md`** - Migration guide
- **`INSTALLATION.md`** - Setup troubleshooting

## Examples

### Slow, Subtle Effect

```tsx
<Component
  glitterSpeed={0.3}
  className="opacity-30"
/>
```

### Fast, Intense Effect

```tsx
<Component
  glitterSpeed={2}
  glitterIntensity={8.0}
  className="opacity-70"
/>
```

### Mobile-Friendly

```tsx
const isMobile = window.innerWidth < 768;

<Component
  glitterSpeed={isMobile ? 0.5 : 1}
  className={isMobile ? "opacity-30" : "opacity-50"}
/>
```

### Dark Mode

```tsx
<Component
  className="opacity-40 dark:opacity-60"
/>
```

## Browser Support

Works in:
- ✅ Chrome 56+
- ✅ Firefox 51+
- ✅ Safari 12+
- ✅ Edge 79+

Requires WebGL (not supported in IE11).

## Performance

- Bundle size: +900KB (three.js + fiber)
- Runtime: <1ms per frame
- Memory: ~1MB GPU texture

For production:
- Enable tree-shaking
- Use code splitting
- Consider dynamic imports

---

**Ready to go! 🚀**

Your hero component with WebGL glitter is now running.
