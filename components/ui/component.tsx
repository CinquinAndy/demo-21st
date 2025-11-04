"use client";

/**
 * Glittering Particles Component
 *
 * A visual effect that creates floating, sparkling particles across the screen.
 * Features:
 * - Randomized particle positions, sizes, and animation timings
 * - Smooth floating animations with rotation
 * - Performance optimized with GPU acceleration
 * - Customizable speed and particle count
 *
 * @param speed - Animation speed multiplier (default: 1)
 * @param particleCount - Number of particles to render (default: 50)
 */

import { useEffect, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface GlitteringParticlesProps {
  speed?: number;
  particleCount?: number;
}

export const GlitteringParticles = ({
  speed = 1,
  particleCount = 50
}: GlitteringParticlesProps) => {
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    // Generate random particles on mount
    particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Random X position (%)
      y: Math.random() * 100, // Random Y position (%)
      size: Math.random() * 4 + 2, // Random size between 2-6px
      duration: (Math.random() * 3 + 2) / speed, // Animation duration (2-5s)
      delay: Math.random() * 2, // Random delay (0-2s)
    }));
  }, [particleCount, speed]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particlesRef.current.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/60 animate-float-slow"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
};

/**
 * Hero Section Component
 *
 * Main hero section with:
 * - Large typography with responsive sizing
 * - Image with gradient overlay
 * - Scroll indicator
 * - Integrated glittering particle effect
 *
 * Uses a two-column grid layout that collapses on mobile.
 */

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export const Component = ({
  title = "Makeup Artist",
  subtitle = "Maeva Cinquin - Maquilleuse Professionnelle",
  imageSrc = "/image00001.jpeg",
  imageAlt = "Hero Section",
}: HeroSectionProps) => {
  return (
    <div className="min-w-screen h-screen min-h-screen grid grid-cols-1 xl:grid-cols-2 relative z-10">
      {/* Glittering particles background effect */}
      <GlitteringParticles speed={0.75} particleCount={50} />

      {/* Text Content Section - Left Side */}
      <div className="lg:ml-10 absolute top-20 left-0 text-center xl:text-left z-10 opacity-100 h-full flex flex-col justify-center items-center xl:items-start gap-4 xl:gap-10 px-4">
        {/* Main Title - Large Typography */}
        <h1 className="text-[75px]/[75px] sm:text-[125px]/[125px] lg:text-[180px]/[180px] xl:text-[210px]/[210px] 2xl:text-[285px]/[285px] uppercase text-foreground max-w-7xl font-bold tracking-tight">
          {title}
        </h1>

        {/* Subtitle - Secondary Typography */}
        <h2 className="lg:text-5xl 2xl:text-6xl text-4xl font-bold text-foreground">
          {subtitle}
        </h2>
      </div>

      {/* Scroll Indicator - Bottom Center */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex justify-center items-center z-40 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>

      {/* Image Section - Right Side */}
      <div className="w-full h-full col-span-1 lg:col-start-2 relative z-5">
        {/* Hero Image with horizontal flip */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover z-5 -scale-x-100"
        />

        {/* Gradient Overlay - Smooth transition from left */}
        <div className="absolute z-5 inset-0 bg-gradient-to-r from-background via-background/15 via-background/25 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};
