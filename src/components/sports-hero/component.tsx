"use client";

import React, { useState, useEffect, useRef } from "react";

/**
 * Sports Hero Component with Animated Life
 *
 * A hero section featuring animated runners and cyclists that traverse the screen.
 * Includes wave-based spawning system with peloton, breakaway, and straggler groups.
 *
 * Note: Uses Inter font (alternative to Geist Sans), JetBrains Mono (alternative to Geist Mono),
 * and Bowlby One SC for typography. These fonts are loaded via Google Fonts in globals.css.
 */

// ============================================================================
// Types & Interfaces
// ============================================================================

interface Entity {
  type: "runner" | "cyclist" | "bréval" | "quentin";
  emoji: string;
  position: number; // Horizontal position as percentage (0-120)
  speed: number; // Movement speed in % per frame
  group: "peloton" | "breakaway" | "straggler" | "special";
  id: number;
}

interface AnimatedLifeProps {
  className?: string;
  waveInterval?: number; // Time between wave spawns in ms (default 60000)
  baseEntityCount?: number; // Base number of entities per wave (default 15)
}

interface TemplateRunProps {
  imageSrc: string;
  imageAlt?: string;
  children?: React.ReactNode;
  className?: string;
}

interface HeroSportsProps {
  title?: string;
  subtitle?: string;
  backgroundImage: string;
  backgroundAlt?: string;
  waveInterval?: number;
  baseEntityCount?: number;
  className?: string;
}

// ============================================================================
// TemplateRun Component - Background with Image
// ============================================================================

function TemplateRun({
  imageSrc,
  imageAlt = "Hero Background",
  children,
  className = "",
}: TemplateRunProps) {
  return (
    <div className={`relative h-screen w-full overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover"
        />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// AnimatedLife Component - Runner/Cyclist Animation
// ============================================================================

function AnimatedLife({
  className = "",
  waveInterval = 60000, // 60 seconds
  baseEntityCount = 15,
}: AnimatedLifeProps) {
  const [entities, setEntities] = useState<Entity[]>([]);
  const nextIdRef = useRef(1);
  const lastWaveTimeRef = useRef(Date.now());
  const [responsiveFactor, setResponsiveFactor] = useState(1);

  // Handle responsive factor based on window width
  useEffect(() => {
    const updateResponsiveFactor = () => {
      const width = window.innerWidth;
      setResponsiveFactor(width > 768 ? 1 : 0.6); // Slower on mobile
    };

    updateResponsiveFactor();
    window.addEventListener("resize", updateResponsiveFactor);

    return () => window.removeEventListener("resize", updateResponsiveFactor);
  }, []);

  // Spawn a wave of entities
  const spawnWave = () => {
    const newEntities: Entity[] = [];
    const countFactor = window.innerWidth > 768 ? 1 : 0.5; // Fewer entities on mobile
    const count = Math.floor(baseEntityCount * countFactor);

    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      let entity: Entity;

      // Special entities: bréval (fast cyclist) and quentin (slow runner)
      if (rand < 0.05) {
        // 5% chance for bréval
        entity = {
          type: "bréval",
          emoji: "🚴",
          position: -Math.random() * 20,
          speed: (1.5 + Math.random() * 0.5) * responsiveFactor,
          group: "special",
          id: nextIdRef.current++,
        };
      } else if (rand < 0.1) {
        // 5% chance for quentin
        entity = {
          type: "quentin",
          emoji: "🏃",
          position: -Math.random() * 10,
          speed: (0.1 + Math.random() * 0.1) * responsiveFactor,
          group: "special",
          id: nextIdRef.current++,
        };
      } else {
        // Regular entities: distribute into groups
        const groupRand = Math.random();
        const isCyclist = Math.random() < 0.7; // 70% cyclists, 30% runners

        if (groupRand < 0.6) {
          // 60% peloton (main pack)
          entity = {
            type: isCyclist ? "cyclist" : "runner",
            emoji: isCyclist ? "🚴" : "🏃",
            position: -10 - Math.random() * 20,
            speed: (0.6 + Math.random() * 0.2) * responsiveFactor,
            group: "peloton",
            id: nextIdRef.current++,
          };
        } else if (groupRand < 0.9) {
          // 30% breakaway (fast group)
          entity = {
            type: isCyclist ? "cyclist" : "runner",
            emoji: isCyclist ? "🚴" : "🏃",
            position: -40 - Math.random() * 20,
            speed: (0.9 + Math.random() * 0.3) * responsiveFactor,
            group: "breakaway",
            id: nextIdRef.current++,
          };
        } else {
          // 10% straggler (slow group)
          entity = {
            type: isCyclist ? "cyclist" : "runner",
            emoji: isCyclist ? "🚴" : "🏃",
            position: -Math.random() * 5,
            speed: (0.3 + Math.random() * 0.2) * responsiveFactor,
            group: "straggler",
            id: nextIdRef.current++,
          };
        }
      }

      newEntities.push(entity);
    }

    setEntities((prev) => [...prev, ...newEntities]);
    lastWaveTimeRef.current = Date.now();
  };

  // Animation loop
  useEffect(() => {
    // Spawn initial wave
    spawnWave();

    const interval = setInterval(() => {
      const now = Date.now();

      // Spawn new wave if interval has passed
      if (now - lastWaveTimeRef.current >= waveInterval) {
        spawnWave();
      }

      // Update positions and remove off-screen entities
      setEntities((prevEntities) => {
        return prevEntities
          .map((entity) => ({
            ...entity,
            position: entity.position + entity.speed,
          }))
          .filter((entity) => entity.position <= 120); // Remove when off-screen
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [waveInterval, baseEntityCount, responsiveFactor]);

  return (
    <div
      className={`absolute inset-0 z-10 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 h-full w-full">
        {entities.map((entity) => (
          <text
            key={entity.id}
            x={`${entity.position}%`}
            y="50%"
            fontSize="2rem"
            className="select-none"
            style={{
              transform: "translateY(-50%)",
            }}
          >
            {entity.emoji}
          </text>
        ))}
      </svg>
    </div>
  );
}

// ============================================================================
// Main Hero Component Export
// ============================================================================

export const Component = ({
  title = "Run & Ride",
  subtitle = "Join the Movement",
  backgroundImage,
  backgroundAlt = "Sports Event Hero",
  waveInterval = 60000,
  baseEntityCount = 15,
  className = "",
}: HeroSportsProps) => {
  return (
    <section className={`relative ${className}`}>
      <TemplateRun imageSrc={backgroundImage} imageAlt={backgroundAlt}>
        {/* Animated Life Overlay */}
        <AnimatedLife
          waveInterval={waveInterval}
          baseEntityCount={baseEntityCount}
        />

        {/* Hero Content */}
        <div className="relative z-20 flex h-screen flex-col items-center justify-center px-4 text-center">
          <h1
            className="mb-4 text-4xl font-bold text-white sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ fontFamily: "var(--font-bowlby)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="text-xl text-white/90 sm:text-2xl md:text-3xl"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </TemplateRun>
    </section>
  );
};

// Export sub-components for advanced usage
export { AnimatedLife, TemplateRun };
