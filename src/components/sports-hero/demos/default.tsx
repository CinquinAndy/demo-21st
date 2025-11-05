"use client";

import { Component } from "../component";

/**
 * Default Demo for Sports Hero Component
 *
 * This demo showcases the sports hero with animated runners and cyclists.
 * Replace the backgroundImage path with your actual image asset.
 */

export default function SportsHeroDefault() {
  return (
    <div className="min-h-screen">
      <Component
        title="Run & Ride 2025"
        subtitle="Join the Ultimate Cycling & Running Challenge"
        backgroundImage="/sports-hero-background.jpg"
        backgroundAlt="Sports event with runners and cyclists"
        waveInterval={60000} // New wave every 60 seconds
        baseEntityCount={15} // 15 entities per wave
      />
    </div>
  );
}
