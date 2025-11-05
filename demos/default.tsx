/**
 * Hero Component Demo with WebGL Glitter Effect
 *
 * This demo showcases the Hero section with advanced WebGL-based glitter effect.
 *
 * Features:
 * - Responsive typography that scales across different screen sizes (75px -> 380px)
 * - WebGL shader-based glittering particles background
 * - Two-column grid layout (text left, image right)
 * - Gradient overlay for smooth transitions
 * - Animated scroll indicator
 *
 * The glitter effect uses:
 * - Three.js for WebGL rendering
 * - Custom fragment shader with procedural noise
 * - GPU-accelerated animations
 * - Real-time texture sampling for dynamic sparkles
 *
 * Props customization:
 * - title/subtitle: Change the hero text
 * - imageSrc: Path to hero image
 * - glitterSpeed: Control animation speed (0.5 = slow, 2 = fast)
 * - glitterIntensity: Control sparkle brightness (5.0 default)
 *
 * Try resizing your browser to see the responsive behavior!
 */

import { Component } from "@/components/ui/component";

// ONLY DEFAULT EXPORT WILL BE TREATED AS A DEMO
export default function DemoOne() {
  return (
    <Component
      title="Makeup Artist"
      subtitle="Maeva Cinquin - Maquilleuse Professionnelle"
      imageSrc="/image00001.jpeg"
      imageAlt="Hero Section Image"
      glitterSpeed={0.75}
      glitterIntensity={5.0}
    />
  );
}
