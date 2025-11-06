# Animated Hero Section

A beautiful, animated hero section component with runners and cyclists moving across the screen. Perfect for sports, fitness, or event-related websites.

## Features

- ✨ Smooth animations with configurable speed and density
- 🎨 Full light/dark mode support using CSS variables
- 📱 Fully responsive design
- ⚡ Performance-optimized with React hooks
- 🎯 Highly customizable through props
- 🔧 Zero custom dependencies

## Installation

```bash
npx shadcn@latest add "https://21st.dev/r/[your-username]/animated-hero"
```

## Usage

```tsx
import { AnimatedHeroSection } from './code'

export default function Page() {
  return (
    <AnimatedHeroSection
      title="Your Amazing <span>Title</span> Here!"
      subtitle="Your compelling subtitle goes here. <br />It supports HTML for line breaks."
      buttons={[
        {
          label: 'Get Started',
          href: '/get-started',
          variant: 'primary',
        },
        {
          label: 'Learn More',
          href: '/learn-more',
          variant: 'secondary',
        },
      ]}
      backgroundImage="/path/to/your/background.webp"
      sideImage="/path/to/your/side-image.jpg"
      theme="light"
      enableAnimation={true}
      animationSpeed={0.75}
      animationDensity={0.2}
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Main title (supports HTML with `<span>` for special styling) |
| `subtitle` | `string` | required | Subtitle text (supports HTML with `<br />`) |
| `buttons` | `HeroButton[]` | required | Array of CTA buttons |
| `backgroundImage` | `string` | optional | Path to background image |
| `sideImage` | `string` | optional | Path to side hero image |
| `backgroundPattern` | `string` | `'/svgs/topography.svg'` | Path to SVG pattern |
| `theme` | `'light' \| 'dark'` | `'light'` | Color theme |
| `enableAnimation` | `boolean` | `true` | Enable/disable runner & cyclist animations |
| `animationSpeed` | `number` | `0.75` | Global speed multiplier for animations |
| `animationDensity` | `number` | `0.2` | Count multiplier for animated entities |

### HeroButton Type

```typescript
interface HeroButton {
  label: string
  href: string
  variant: 'primary' | 'secondary'
}
```

## Customization

### Theming

The component uses CSS variables from shadcn/ui's theme system. Customize colors in your `globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 259.8145 0.188 62.31%;
  /* ... other variables */
}
```

### Animation Speed

Control animation speed and density:

```tsx
<AnimatedHeroSection
  animationSpeed={1.5}  // Faster (default: 0.75)
  animationDensity={0.4} // More entities (default: 0.2)
  // ... other props
/>
```

### Disable Animations

For a static hero section:

```tsx
<AnimatedHeroSection
  enableAnimation={false}
  // ... other props
/>
```

## Dependencies

- React 18+
- Next.js 13+ (for `next/image` and `next/link`)
- Tailwind CSS

## Notes

- Images are optional - the component works without them
- The title supports HTML - wrap text in `<span>` for special font styling
- Fully responsive - adapts to mobile, tablet, and desktop
- Uses CSS variables for theming - works with dark mode out of the box

## License

MIT
