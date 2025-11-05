# Hero Alternative Component

A comprehensive and visually striking hero section featuring animated runners and cyclists, theme-aware backgrounds, and a sophisticated split layout. Perfect for sports events, race platforms, and athletic competitions.

## Features

- **AnimatedLife System**: Dynamic runners and cyclists traversing the screen
- **Theme-Aware Backgrounds**: Automatically switches between light/dark mode images
- **Split Layout Design**:
  - Event image (youpi) on bottom left
  - Topography pattern on bottom right
  - Content area on right side (desktop)
- **Responsive Title**: HTML-based title with emphasized `<span>` elements
- **Dual CTA Buttons**: For organizers and participants
- **Wave-Based Animation**: Peloton, breakaway, and straggler groups
- **Special Entities**: "Bréval" (fast cyclist) and "Quentin" (slow runner)
- **Full Responsive Design**: Optimized for mobile, tablet, and desktop

## Installation

### 1. Fonts Setup

The component uses Google Fonts (already configured in `globals.css`):

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Bowlby+One+SC&display=swap');
```

CSS variables (already in `:root`):

```css
:root {
  --font-inter: 'Inter', sans-serif;
  --font-bowlby: 'Bowlby One SC', sans-serif;
}
```

Make sure these are also in your `@theme inline` block:

```css
@theme inline {
  --font-inter: var(--font-inter);
  --font-bowlby: var(--font-bowlby);
}
```

### 2. Component Files

- `component.tsx` - Main component with AnimatedLife, TemplateRun, and HeroAlternative
- `demos/default.tsx` - Demo implementation

## Usage

### Basic Usage

```tsx
import { Component } from "@/components/hero-alternative/component";

export default function Page() {
  return (
    <Component
      title="Découvrez <span>l'aventure</span> du trail"
      description="Rejoignez la communauté des coureurs passionnés."
      organizerButtonText="Organiser un événement"
      organizerButtonHref="/contact"
      consultRacesButtonText="Consulter les courses"
      consultRacesButtonHref="/events"
    />
  );
}
```

### Custom Images

```tsx
import { Component } from "@/components/hero-alternative/component";

export default function Page() {
  return (
    <Component
      title="Marathon <span>2025</span>"
      description="Le plus grand événement de course à pied de l'année."
      youpiImage="/my-event-photo.jpg"
      backgroundLight="/custom-bg-light.webp"
      backgroundDark="/custom-bg-dark.webp"
      topographyPattern="/custom-pattern.svg"
    />
  );
}
```

### Advanced Usage - Custom Animation

```tsx
import { Component } from "@/components/hero-alternative/component";

export default function Page() {
  return (
    <Component
      title="Trail <span>Extrême</span>"
      description="Dépassez vos limites dans les montagnes."
      waveInterval={45000} // Spawn waves every 45 seconds
      baseEntityCount={20} // 20 entities per wave
      organizerButtonText="Devenir organisateur"
      consultRacesButtonText="Voir les trails"
    />
  );
}
```

### Using Sub-Components

```tsx
import { AnimatedLife, TemplateRun } from "@/components/hero-alternative/component";

export default function CustomHero() {
  return (
    <div className="relative">
      <TemplateRun
        backgroundLight="/bg-light.webp"
        backgroundDark="/bg-dark.webp"
      />
      <AnimatedLife waveInterval={30000} baseEntityCount={25} />

      {/* Your custom content */}
      <div className="absolute inset-0 z-20">
        <h1>Custom Layout</h1>
      </div>
    </div>
  );
}
```

## Props

### Component Props (HeroAlternative)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Découvrez <span>l'aventure</span> du trail"` | HTML string with `<span>` for emphasized text |
| `description` | `string` | `"Rejoignez la communauté..."` | HTML string for description text |
| `organizerButtonText` | `string` | `"Organiser un événement"` | Text for organizer CTA button |
| `organizerButtonHref` | `string` | `"#contact"` | Link for organizer button |
| `consultRacesButtonText` | `string` | `"Consulter les courses"` | Text for participant CTA button |
| `consultRacesButtonHref` | `string` | `"#events"` | Link for participant button |
| `youpiImage` | `string` | CDN URL | Event photo (bottom left) |
| `backgroundLight` | `string` | CDN URL | Background for light theme |
| `backgroundDark` | `string` | CDN URL | Background for dark theme |
| `topographyPattern` | `string` | CDN URL | SVG pattern (bottom right) |
| `waveInterval` | `number` | `60000` | Time between wave spawns (ms) |
| `baseEntityCount` | `number` | `15` | Number of entities per wave |
| `className` | `string` | `""` | Additional CSS classes |

### Default Image URLs

The component includes hosted images:

- **Youpi Image**: `https://r2-andycinquin.andy-cinquin.fr/youpi_40c4613102.jpg`
- **Background Light**: `https://r2-andycinquin.andy-cinquin.fr/background_v4_dark_cb59f0e4d1.webp`
- **Background Dark**: `https://r2-andycinquin.andy-cinquin.fr/background_v4_white_597dc37eff.webp`
- **Topography**: `https://r2-andycinquin.andy-cinquin.fr/topography_7bf885525f.svg`

### AnimatedLife Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `""` | Additional CSS classes |
| `waveInterval` | `number` | `60000` | Time between wave spawns (ms) |
| `baseEntityCount` | `number` | `15` | Base number of entities per wave |

### TemplateRun Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundLight` | `string` | **required** | Background image for light theme |
| `backgroundDark` | `string` | **required** | Background image for dark theme |
| `className` | `string` | `""` | Additional CSS classes |

## Layout Structure

### Mobile (< 1024px)
- Title: Top center, responsive text sizing
- Description: Below title, center-aligned
- Buttons: Horizontal row, center-aligned
- Images: Youpi (grayscale, opacity 75%), topography visible

### Desktop (≥ 1024px)
- Title: Top center, larger text
- Content: Right side panel (50% width)
- Description: Right panel, left-aligned
- Buttons: Right panel, horizontal row
- Images: Youpi (full opacity, no grayscale), topography visible

## Typography

### Title Styling
- **Base font**: Inter (`font-sans`)
- **Base sizes**:
  - Mobile: `0.9rem`
  - Tablet (lg): `1.5rem`
  - Desktop (xl): `2rem`
- **Span elements** (emphasized words):
  - Font: Bowlby One SC
  - Sizes: `3.5rem` → `6rem` → `8rem` (responsive)
  - Margin: `mx-2`

### Title Format Example

```tsx
title="Découvrez <span>l'aventure</span> du trail"
```

Result:
- "Découvrez" and "du trail" → Inter, base size
- "l'aventure" → Bowlby One SC, larger size

### Description Styling
- Font: Inter
- Size: `text-lg` (1.125rem)
- Colors:
  - Light mode: `text-neutral-800`
  - Dark mode: `text-neutral-100` (mobile), `text-neutral-300` (desktop)

## Animation Details

### Entity Types

1. **Runner** 🏃
   - 30% of regular entities
   - Speed varies by group

2. **Cyclist** 🚴
   - 70% of regular entities
   - Speed varies by group

3. **Bréval** (Special) 🚴
   - Fast cyclist
   - Speed: 1.5-2.0x base
   - 5% spawn chance

4. **Quentin** (Special) 🏃
   - Slow runner
   - Speed: 0.1-0.2x base
   - 5% spawn chance

### Group Distributions

- **Peloton** (60%): Main pack, speed 0.6-0.8, position -10 to -30%
- **Breakaway** (30%): Leading group, speed 0.9-1.2, position -40 to -60%
- **Straggler** (10%): Trailing group, speed 0.3-0.5, position 0 to -5%

### Responsive Behavior

- **Desktop** (>768px): Full speed (1.0x), full count (1.0x)
- **Mobile** (≤768px): Reduced speed (0.6x), reduced count (0.5x)

## Buttons

### Organizer Button (Secondary/Outline)
- Border style with hover effects
- Background transitions on hover
- Focus ring for accessibility

### Consult Races Button (Primary)
- Solid primary color background
- Opacity change on hover (90%)
- Focus ring for accessibility

Both buttons:
- Height: `h-11` (2.75rem)
- Padding: `px-3` (mobile), `px-8` (desktop)
- Border radius: `rounded-md`
- Shadow: `shadow-sm` (light mode only)
- Transitions: Color transitions on hover/focus

## Theme Support

### Dark Mode
- Automatic detection via Tailwind `dark:` classes
- Background switches to light image with grayscale
- Text colors adjust automatically
- Youpi image opacity reduced to 50%
- No shadows on buttons

### Light Mode
- Background uses dark image (no grayscale)
- Standard text colors
- Youpi image opacity 75% (mobile), 100% (desktop)
- Shadows on buttons

## Responsive Breakpoints

| Breakpoint | Width | Changes |
|------------|-------|---------|
| Mobile | < 1024px | Center layout, mobile content visible, desktop hidden |
| Tablet (lg) | ≥ 1024px | Desktop layout activates, mobile hidden |
| Desktop (xl) | ≥ 1280px | Larger spacing, bigger text sizes |

## Images Layout

### Youpi Image (Bottom Left)
- Width: 50vw (always)
- Height: 50vh (mobile/tablet), 55vh (desktop)
- Position: Bottom-aligned with varying margin
- Margin bottom: 40vh → 42vh → 25vh (responsive)
- Effects: Grayscale + opacity 75% (mobile), opacity 100% (tablet+)

### Topography Pattern (Bottom Right)
- Width: 50vw
- Height: 50vh
- Position: Translated up by -translate-y-14
- Background: SVG pattern, centered, repeating
- Opacity: 100% (light), 50% (dark)

## Z-Index Layers

- `z-0`: Youpi image + topography pattern (bottom)
- `z-10`: AnimatedLife overlay
- `z-20`: Title + buttons (content)
- `z-30`: TemplateRun background (top)

## Accessibility

- Semantic HTML (`<h1>`, `<p>`, `<a>`)
- Focus rings on interactive elements
- Alt text for images
- `aria-hidden="true"` on decorative AnimatedLife
- Keyboard navigation support
- Color contrast compliant

## Performance

- **Animation**: 60fps with 16ms intervals
- **Entity Cleanup**: Automatic removal at 120% screen width
- **Responsive Optimization**: Reduced entities on mobile
- **Memory Management**: Efficient state updates

## Browser Compatibility

- Modern browsers with ES6+ support
- SVG support required
- CSS Grid and Flexbox support
- Tailwind CSS dark mode support

## Customization

### Change Button Styles

Override via className:

```tsx
<Component
  className="[&_a]:rounded-full [&_a]:px-12"
  // ... other props
/>
```

### Adjust Title Span Sizes

Edit CSS or use inline styles:

```tsx
<Component
  title="Custom <span>Title</span>"
  className="[&_h1_span]:text-[5rem] [&_h1_span]:lg:text-[8rem]"
/>
```

### Custom Color Scheme

Leverage Tailwind CSS variables in `globals.css`:

```css
:root {
  --primary: oklch(...); /* Your color */
  --accent: oklch(...);  /* Your accent */
}
```

### Different Animation Entities

Edit the emoji values in `component.tsx`:

```tsx
emoji: isCyclist ? "🚴" : "🏃",
```

Replace with: "🏊", "🚴‍♀️", "🏃‍♂️", "⛷️", etc.

## Example Use Cases

1. **Trail Running Events**: Showcase mountain races and ultra-trails
2. **Cycling Competitions**: Promote road races, criteriums, and gran fondos
3. **Multi-Sport Events**: Triathlons, duathlons, and adventure races
4. **Fitness Platforms**: Community-driven running and cycling apps
5. **Event Registration**: Landing pages for race registration
6. **Sports Tourism**: Destination events and athletic travel

## Troubleshooting

### Animations not rendering
- Check browser console for errors
- Verify SVG support in browser
- Ensure component is client-side rendered (`"use client"`)

### Images not loading
- Verify image URLs are accessible
- Check CORS settings if using external CDN
- Ensure proper image formats (WEBP, JPG, SVG)

### Theme switching not working
- Verify Tailwind dark mode is configured
- Check `dark:` classes are applied
- Ensure `globals.css` has proper setup

### Buttons not styled correctly
- Verify CSS variables in `globals.css`
- Check `@theme inline` block includes all colors
- Ensure Tailwind is processing classes correctly

### Layout issues on mobile
- Test responsive breakpoints (lg: 1024px)
- Verify viewport meta tag in HTML
- Check for conflicting CSS

## Advanced Patterns

### Loading State

```tsx
import { Component } from "@/components/hero-alternative/component";
import { useState, useEffect } from "react";

export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return <Component {...props} />;
}
```

### Dynamic Content

```tsx
import { Component } from "@/components/hero-alternative/component";

export default function Page({ event }) {
  return (
    <Component
      title={`Rejoignez <span>${event.name}</span>`}
      description={event.description}
      youpiImage={event.heroImage}
    />
  );
}
```

### Analytics Integration

```tsx
import { Component } from "@/components/hero-alternative/component";

export default function Page() {
  const handleOrganizerClick = () => {
    // Track analytics
    console.log("Organizer button clicked");
  };

  return (
    <div onClick={handleOrganizerClick}>
      <Component {...props} />
    </div>
  );
}
```

## License

Part of the 21st component library.

## Credits

- Animation concept inspired by cycling peloton dynamics
- Typography featuring Inter and Bowlby One SC from Google Fonts
- Theme-aware design for optimal viewing in all conditions
- Created for sharing with the 21st dev community
