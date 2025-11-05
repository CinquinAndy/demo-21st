# Sports Hero Component

A dynamic hero section component featuring animated runners and cyclists that traverse the screen in waves. Perfect for sports events, running/cycling challenges, fitness applications, and athletic competitions.

## Features

- **Animated Life System**: Runners (🏃) and cyclists (🚴) continuously move across the screen
- **Wave-based Spawning**: New groups spawn every 60 seconds (configurable)
- **Group Dynamics**:
  - **Peloton** (60%): Main pack, moderate speed
  - **Breakaway** (30%): Fast leading group
  - **Straggler** (10%): Slower trailing group
- **Special Entities**:
  - **Bréval**: Fast cyclist (5% spawn chance)
  - **Quentin**: Slow runner (5% spawn chance)
- **Fully Responsive**: Adapts animation speed and entity count on mobile
- **Performance Optimized**: 60fps animation loop with automatic cleanup

## Installation

### 1. Fonts Setup

The component uses Google Fonts. Add this import to your `globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Bowlby+One+SC&display=swap');
```

Add CSS variables in your `:root`:

```css
:root {
  --font-inter: 'Inter', sans-serif;
  --font-jetbrains: 'JetBrains Mono', monospace;
  --font-bowlby: 'Bowlby One SC', sans-serif;
}
```

### 2. Component Files

- `component.tsx` - Main component with AnimatedLife and TemplateRun
- `demos/default.tsx` - Demo implementation

## Usage

### Basic Usage

```tsx
import { Component } from "@/components/sports-hero/component";

export default function Page() {
  return (
    <Component
      title="Run & Ride 2025"
      subtitle="Join the Ultimate Challenge"
      backgroundImage="/your-image.jpg"
    />
  );
}
```

### Advanced Usage

```tsx
import { Component } from "@/components/sports-hero/component";

export default function Page() {
  return (
    <Component
      title="Marathon 2025"
      subtitle="Push Your Limits"
      backgroundImage="/marathon-bg.jpg"
      backgroundAlt="Marathon runners at sunrise"
      waveInterval={45000} // Spawn waves every 45 seconds
      baseEntityCount={20} // 20 entities per wave
      className="custom-hero-class"
    />
  );
}
```

### Using Sub-Components

```tsx
import { AnimatedLife, TemplateRun } from "@/components/sports-hero/component";

export default function CustomHero() {
  return (
    <TemplateRun imageSrc="/bg.jpg">
      <AnimatedLife waveInterval={30000} baseEntityCount={25} />

      {/* Your custom content */}
      <div className="relative z-20">
        <h1>Custom Hero Content</h1>
      </div>
    </TemplateRun>
  );
}
```

## Props

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Run & Ride"` | Main hero title |
| `subtitle` | `string` | `"Join the Movement"` | Subtitle text (optional) |
| `backgroundImage` | `string` | **required** | Path to background image |
| `backgroundAlt` | `string` | `"Sports Event Hero"` | Alt text for background image |
| `waveInterval` | `number` | `60000` | Time between wave spawns (ms) |
| `baseEntityCount` | `number` | `15` | Number of entities per wave |
| `className` | `string` | `""` | Additional CSS classes |

### AnimatedLife Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `""` | Additional CSS classes |
| `waveInterval` | `number` | `60000` | Time between wave spawns (ms) |
| `baseEntityCount` | `number` | `15` | Base number of entities per wave |

### TemplateRun Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageSrc` | `string` | **required** | Path to background image |
| `imageAlt` | `string` | `"Hero Background"` | Alt text for image |
| `children` | `ReactNode` | - | Content to render over background |
| `className` | `string` | `""` | Additional CSS classes |

## Animation Details

### Entity Types

1. **Runner** 🏃
   - 30% of regular entities
   - Variable speed based on group

2. **Cyclist** 🚴
   - 70% of regular entities
   - Variable speed based on group

3. **Bréval** (Special) 🚴
   - Fast cyclist
   - Speed: 1.5-2.0x base speed
   - 5% spawn chance

4. **Quentin** (Special) 🏃
   - Slow runner
   - Speed: 0.1-0.2x base speed
   - 5% spawn chance

### Group Distributions

- **Peloton** (60%): Position -10 to -30%, Speed 0.6-0.8
- **Breakaway** (30%): Position -40 to -60%, Speed 0.9-1.2
- **Straggler** (10%): Position 0 to -5%, Speed 0.3-0.5

### Responsive Behavior

- **Desktop** (>768px):
  - Full speed (1.0x factor)
  - Full entity count

- **Mobile** (≤768px):
  - Reduced speed (0.6x factor)
  - Reduced entity count (0.5x factor)

## Technical Details

### Performance

- **Animation Loop**: 60fps (~16ms interval)
- **Auto Cleanup**: Entities removed at 120% screen width
- **Memory Management**: Efficient state updates and cleanup

### Browser Compatibility

- Modern browsers with ES6+ support
- SVG animation support required
- Responsive design for all screen sizes

### Dependencies

- React 18+
- TypeScript (optional but recommended)
- Tailwind CSS

## Fonts Used

This component uses Google Fonts as alternatives to the original Geist fonts:

- **Inter** (replaces Geist Sans): Modern variable sans-serif
- **JetBrains Mono** (replaces Geist Mono): Excellent monospace font
- **Bowlby One SC**: Bold display font for titles

If you need the exact Geist fonts, you can:
1. Install via npm: `npm install geist`
2. Import in your app layout
3. Update CSS variables accordingly

## Customization

### Changing Colors

Modify the overlay gradient in `TemplateRun`:

```tsx
<div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-blue-800/20 to-blue-900/40" />
```

### Adjusting Text Styles

Override fonts inline or via className:

```tsx
<Component
  title="Your Title"
  className="[&_h1]:text-red-500 [&_h1]:font-sans"
/>
```

### Modifying Animation Speed

```tsx
<Component
  waveInterval={30000} // Faster waves (30s)
  baseEntityCount={25} // More entities
/>
```

### Custom Entity Emojis

Edit the emoji values in `component.tsx` (lines ~140-175):

```tsx
emoji: isCyclist ? "🚴" : "🏃",
```

Replace with any emoji: "🏊", "🚴‍♀️", "🏃‍♂️", etc.

## Example Use Cases

1. **Sports Events**: Marathon, triathlon, cycling race landing pages
2. **Fitness Apps**: Workout challenges, fitness community platforms
3. **Fundraising**: Charity runs, athletic fundraising campaigns
4. **Athletic Organizations**: Sports clubs, running groups, cycling teams
5. **Event Registration**: Race registration pages, event announcements

## Troubleshooting

### Animations not showing
- Ensure `backgroundImage` path is correct
- Check browser console for errors
- Verify fonts are loaded in globals.css

### Performance issues
- Reduce `baseEntityCount` for slower devices
- Increase `waveInterval` to reduce active entities
- Check for other heavy animations on the page

### Fonts not loading
- Verify Google Fonts import in globals.css
- Check CSS variables are defined in :root
- Clear browser cache and reload

## License

Part of the 21st component library.

## Credits

- Animation concept inspired by peloton dynamics
- Emoji rendering via native SVG text elements
- Responsive design following mobile-first principles
