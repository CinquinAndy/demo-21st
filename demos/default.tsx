/**
 * Hero Component Demo
 *
 * This demo showcases the Hero section with glittering particles effect.
 * The component features:
 * - Responsive typography that scales across different screen sizes
 * - Animated floating particles in the background
 * - Image with gradient overlay
 * - Smooth scroll indicator
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
    />
  );
}
