"use client";

import React, { useState, useEffect, useRef } from "react";

/**
 * Hero Alternative Component
 *
 * A comprehensive hero section featuring:
 * - AnimatedLife: Runners and cyclists traversing the screen
 * - TemplateRun: Theme-aware background image
 * - Split layout with image and topography pattern
 * - Responsive title with emphasized spans
 * - Call-to-action buttons for organizers and participants
 *
 * Perfect for sports events, races, and athletic competitions.
 *
 * Fonts: Inter (base text) and Bowlby One SC (emphasized text)
 * Already imported in globals.css.
 */

// ============================================================================
// Types & Interfaces
// ============================================================================

interface Entity {
  type: "runner" | "cyclist" | "bréval" | "quentin";
  emoji: string;
  position: number;
  speed: number;
  group: "peloton" | "breakaway" | "straggler" | "special";
  id: number;
}

interface AnimatedLifeProps {
  className?: string;
  waveInterval?: number;
  baseEntityCount?: number;
}

interface TemplateRunProps {
  backgroundLight: string;
  backgroundDark: string;
  className?: string;
}

interface HeroAlternativeProps {
  title?: string; // HTML string with <span> for emphasized text
  description?: string; // HTML string
  organizerButtonText?: string;
  organizerButtonHref?: string;
  consultRacesButtonText?: string;
  consultRacesButtonHref?: string;
  youpiImage?: string;
  backgroundLight?: string;
  backgroundDark?: string;
  topographyPattern?: string;
  waveInterval?: number;
  baseEntityCount?: number;
  className?: string;
}

// ============================================================================
// AnimatedLife Component - Runner/Cyclist Animation
// ============================================================================

function AnimatedLife({
  className = "",
  waveInterval = 60000,
  baseEntityCount = 15,
}: AnimatedLifeProps) {
  const [entities, setEntities] = useState<Entity[]>([]);
  const nextIdRef = useRef(1);
  const lastWaveTimeRef = useRef(Date.now());
  const [responsiveFactor, setResponsiveFactor] = useState(1);

  useEffect(() => {
    const updateResponsiveFactor = () => {
      const width = window.innerWidth;
      setResponsiveFactor(width > 768 ? 1 : 0.6);
    };

    updateResponsiveFactor();
    window.addEventListener("resize", updateResponsiveFactor);

    return () => window.removeEventListener("resize", updateResponsiveFactor);
  }, []);

  const spawnWave = () => {
    const newEntities: Entity[] = [];
    const countFactor = window.innerWidth > 768 ? 1 : 0.5;
    const count = Math.floor(baseEntityCount * countFactor);

    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      let entity: Entity;

      if (rand < 0.05) {
        entity = {
          type: "bréval",
          emoji: "🚴",
          position: -Math.random() * 20,
          speed: (1.5 + Math.random() * 0.5) * responsiveFactor,
          group: "special",
          id: nextIdRef.current++,
        };
      } else if (rand < 0.1) {
        entity = {
          type: "quentin",
          emoji: "🏃",
          position: -Math.random() * 10,
          speed: (0.1 + Math.random() * 0.1) * responsiveFactor,
          group: "special",
          id: nextIdRef.current++,
        };
      } else {
        const groupRand = Math.random();
        const isCyclist = Math.random() < 0.7;

        if (groupRand < 0.6) {
          entity = {
            type: isCyclist ? "cyclist" : "runner",
            emoji: isCyclist ? "🚴" : "🏃",
            position: -10 - Math.random() * 20,
            speed: (0.6 + Math.random() * 0.2) * responsiveFactor,
            group: "peloton",
            id: nextIdRef.current++,
          };
        } else if (groupRand < 0.9) {
          entity = {
            type: isCyclist ? "cyclist" : "runner",
            emoji: isCyclist ? "🚴" : "🏃",
            position: -40 - Math.random() * 20,
            speed: (0.9 + Math.random() * 0.3) * responsiveFactor,
            group: "breakaway",
            id: nextIdRef.current++,
          };
        } else {
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

  useEffect(() => {
    spawnWave();

    const interval = setInterval(() => {
      const now = Date.now();

      if (now - lastWaveTimeRef.current >= waveInterval) {
        spawnWave();
      }

      setEntities((prevEntities) => {
        return prevEntities
          .map((entity) => ({
            ...entity,
            position: entity.position + entity.speed,
          }))
          .filter((entity) => entity.position <= 120);
      });
    }, 16);

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
// TemplateRun Component - Theme-Aware Background
// ============================================================================

function TemplateRun({
  backgroundLight,
  backgroundDark,
  className = "",
}: TemplateRunProps) {
  return (
    <div className={className}>
      {/* Light theme - shows dark background (inverted) */}
      <img
        alt="Hero background light theme"
        className="absolute inset-0 w-full h-full pointer-events-none z-30 -scale-x-100 object-cover object-bottom pt-36 block dark:hidden"
        src={backgroundLight}
      />
      {/* Dark theme - shows light background with grayscale (inverted) */}
      <img
        alt="Hero background dark theme"
        className="absolute inset-0 w-full h-full pointer-events-none z-30 -scale-x-100 object-cover object-bottom pt-36 grayscale hidden dark:block"
        src={backgroundDark}
      />
    </div>
  );
}

// ============================================================================
// Main Hero Alternative Component
// ============================================================================

export const Component = ({
  title = "Découvrez <span>l'aventure</span> du trail",
  description = "Rejoignez la communauté des coureurs passionnés et participez à des événements exceptionnels.",
  organizerButtonText = "Organiser un événement",
  organizerButtonHref = "#contact",
  consultRacesButtonText = "Consulter les courses",
  consultRacesButtonHref = "#events",
  youpiImage = "https://r2-andycinquin.andy-cinquin.fr/youpi_40c4613102.jpg",
  backgroundLight = "https://r2-andycinquin.andy-cinquin.fr/background_v4_dark_cb59f0e4d1.webp",
  backgroundDark = "https://r2-andycinquin.andy-cinquin.fr/background_v4_white_597dc37eff.webp",
  topographyPattern = "https://r2-andycinquin.andy-cinquin.fr/topography_7bf885525f.svg",
  waveInterval = 60000,
  baseEntityCount = 15,
  className = "",
}: HeroAlternativeProps) => {
  return (
    <div className={`relative pb-0 md:pb-0 xl:pb-24 ${className}`}>
      {/* Background Image - Theme Aware */}
      <TemplateRun
        backgroundLight={backgroundLight}
        backgroundDark={backgroundDark}
      />

      {/* Animated Life - Runners & Cyclists */}
      <AnimatedLife
        waveInterval={waveInterval}
        baseEntityCount={baseEntityCount}
      />

      {/* Title Section - Visible on all breakpoints */}
      <div className="absolute top-8 left-0 z-20 w-full text-center text-[0.9rem] font-bold tracking-tight text-neutral-800 lg:top-10 lg:text-[1.5rem] xl:top-24 xl:text-[2rem] dark:text-neutral-50">
        <h1
          dangerouslySetInnerHTML={{ __html: title }}
          className="font-sans [&_span]:font-bowlby [&_span]:mx-2 [&_span]:text-[3.5rem] [&_span]:lg:text-[6rem] [&_span]:xl:text-[8rem]"
          style={{
            fontFamily: "var(--font-inter)",
          }}
        />

        {/* Mobile Section - Description + Buttons */}
        <div className="flex flex-col justify-start gap-6 px-4 lg:hidden">
          {description && (
            <p
              dangerouslySetInnerHTML={{ __html: description }}
              className="text-center text-lg text-neutral-800 dark:text-neutral-100"
            />
          )}
          <div className="flex flex-row justify-center gap-4">
            <a
              className="border-input bg-background ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-11 items-center justify-center rounded-md border px-3 text-sm font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:px-8 dark:shadow-none"
              href={organizerButtonHref}
            >
              {organizerButtonText}
            </a>
            <a
              className="bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex h-11 items-center justify-center rounded-md px-3 text-sm font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:px-8 dark:shadow-none"
              href={consultRacesButtonHref}
            >
              {consultRacesButtonText}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section - Images */}
      <section className="pointer-events-none relative">
        <div className="absolute top-0 left-0 z-0 flex h-screen w-screen">
          {/* Left - Youpi Image */}
          <div className="flex h-full items-end">
            <img
              alt="Running event"
              className="z-0 mb-[40vh] h-[50vh] w-[50vw] max-w-[50vw] min-w-[50vw] object-cover object-center opacity-75 grayscale lg:mb-[42vh] lg:opacity-100 xl:mb-[25vh] xl:h-[55vh] dark:opacity-50"
              src={youpiImage}
            />
          </div>

          {/* Right - Topography Pattern */}
          <div
            className="z-0 h-[50vh] max-h-[50vh] w-[50vw] max-w-[50vw] -translate-y-14 overflow-hidden bg-center bg-repeat opacity-100 dark:opacity-50"
            style={{
              backgroundImage: `url('${topographyPattern}')`,
            }}
          />
        </div>
      </section>

      {/* Desktop Section - Description + Buttons (Right Side) */}
      <div className="z-20 mx-auto flex max-w-full justify-end">
        <div className="grid min-h-screen w-1/2 grid-cols-12 gap-4">
          <div className="col-span-12 hidden flex-col justify-start gap-6 px-20 pt-[50vh] lg:flex">
            {description && (
              <p
                dangerouslySetInnerHTML={{ __html: description }}
                className="text-lg text-neutral-800 dark:text-neutral-300"
              />
            )}
            <div className="flex flex-row gap-4">
              <a
                className="border-input bg-background ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-11 items-center justify-center rounded-md border px-3 text-sm font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:px-8 dark:shadow-none"
                href={organizerButtonHref}
              >
                {organizerButtonText}
              </a>
              <a
                className="bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex h-11 items-center justify-center rounded-md px-3 text-sm font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:px-8 dark:shadow-none"
                href={consultRacesButtonHref}
              >
                {consultRacesButtonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export sub-components for advanced usage
export { AnimatedLife, TemplateRun };
