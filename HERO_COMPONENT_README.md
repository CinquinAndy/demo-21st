# Hero Component with Glittering Particles

This is a React component demo for 21st featuring a hero section with animated glittering particles effect.

## Files Created

### Components
- `/components/ui/component.tsx` - Main component file containing:
  - `GlitteringParticles` - Animated floating particles effect
  - `Component` (Hero Section) - Main hero section with responsive layout

### Demo
- `/demos/default.tsx` - Demo file showcasing the hero component

### Styles
- `/index.css` - Tailwind CSS configuration with:
  - Theme variables (light & dark mode)
  - Custom animations (`float-slow`, `float-medium`)
  - Global styles and utilities

### Utils
- `/lib/utils.ts` - Utility function for class name merging (cn)

## Features

### Glittering Particles
- **Randomized positioning**: Each particle has unique X/Y coordinates
- **Variable sizes**: Particles range from 2-6px
- **Smooth animations**: Floating effect with rotation
- **Performance optimized**: GPU-accelerated with `will-change`
- **Customizable**:
  - `speed`: Controls animation speed (default: 1)
  - `particleCount`: Number of particles (default: 50)

### Hero Section
- **Responsive typography**: Scales from mobile to 3xl screens
  - Mobile (< 640px): 75px
  - Tablet (640px - 1024px): 125px - 180px
  - Desktop (1024px+): 210px - 380px
- **Two-column grid layout**: Text on left, image on right
- **Gradient overlay**: Smooth transition between content and image
- **Scroll indicator**: Animated bounce arrow at bottom
- **Props**:
  - `title`: Main heading text
  - `subtitle`: Secondary heading text
  - `imageSrc`: Path to hero image
  - `imageAlt`: Alt text for accessibility

## Customization

### Colors
The component uses CSS variables for theming. Modify in `index.css`:

```css
:root {
  --primary: oklch(0.205 0 0);
  --foreground: oklch(0.145 0 0);
  --background: oklch(1 0 0);
  /* ... more variables */
}
```

### Animations
Adjust particle animation in `index.css`:

```css
@keyframes float-slow {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}
```

### Typography
Responsive font sizes are defined using Tailwind's responsive utilities:
```tsx
className="text-[75px]/[75px] sm:text-[125px]/[125px] lg:text-[180px]/[180px]"
```

## Usage Example

```tsx
import { Component } from "@/components/ui/component";

export default function MyPage() {
  return (
    <Component
      title="Your Title"
      subtitle="Your Subtitle"
      imageSrc="/your-image.jpg"
      imageAlt="Description"
    />
  );
}
```

## Dependencies

- `react` - UI library
- `clsx` - Class name utility
- `tailwind-merge` - Tailwind class merging
- `tw-animate-css` - Extended Tailwind animations
- `tailwindcss` - Utility-first CSS framework

## Dark Mode Support

The component automatically supports dark mode through CSS variables. Toggle dark mode by adding the `.dark` class to the root element:

```tsx
<html className="dark">
  {/* Your app */}
</html>
```

## Performance Notes

- Particles use `will-change: transform` for GPU acceleration
- `pointer-events: none` on overlay elements to prevent interaction blocking
- Fixed positioning keeps particles in viewport without reflow
- CSS animations preferred over JavaScript for better performance

## Browser Support

- Modern browsers with CSS Grid support
- CSS custom properties (CSS variables)
- CSS animations and transforms
- oklch color space support (with fallbacks)

## Accessibility

- Semantic HTML structure (`<h1>`, `<h2>`)
- Alt text on images
- Proper heading hierarchy
- Keyboard navigation friendly
- Respects user motion preferences (consider adding `prefers-reduced-motion`)

---

**Created for 21st component library**
