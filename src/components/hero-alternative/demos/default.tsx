"use client";

import { Component } from "../component";

/**
 * Default Demo for Hero Alternative Component
 *
 * This demo showcases the hero with:
 * - AnimatedLife animation (runners and cyclists)
 * - Theme-aware background image (dark/light mode)
 * - Split layout with event image and topography pattern
 * - Responsive title with emphasized spans
 * - Call-to-action buttons
 */

export default function HeroAlternativeDefault() {
  return (
    <div className="min-h-screen">
      <Component
        title="Découvrez <span>l'aventure</span> du trail"
        description="Rejoignez la communauté des coureurs passionnés et participez à des événements exceptionnels dans des paysages à couper le souffle."
        organizerButtonText="Organiser un événement"
        organizerButtonHref="#contact"
        consultRacesButtonText="Consulter les courses"
        consultRacesButtonHref="#events"
        youpiImage="https://r2-andycinquin.andy-cinquin.fr/youpi_40c4613102.jpg"
        backgroundLight="https://r2-andycinquin.andy-cinquin.fr/background_v4_dark_cb59f0e4d1.webp"
        backgroundDark="https://r2-andycinquin.andy-cinquin.fr/background_v4_white_597dc37eff.webp"
        topographyPattern="https://r2-andycinquin.andy-cinquin.fr/topography_7bf885525f.svg"
        waveInterval={60000}
        baseEntityCount={15}
      />
    </div>
  );
}
