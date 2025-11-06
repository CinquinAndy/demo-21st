'use client'

import { Component } from '@/components/ui/sports-hero-with-animated-athletes-in-stickman'

/**
 * Default Demo for Sports Hero Component
 *
 * This showcases the sports hero with animated runners and cyclists.
 * All props are optional and have sensible defaults.
 */

export default function SportsHeroDefault() {
	return (
		<div className="relative w-full min-h-screen">
			<Component
				title="Can't Attend Your Race? <span>Transfer</span> Your Bib Safely!"
				description="Legal race bib transfers for running, trail, triathlon & cycling events worldwide. <br />Secure payments, verified sellers, and instant organizer approval."
				primaryButtonText="Get Started"
				primaryButtonHref="/get-started"
				secondaryButtonText="Learn More"
				secondaryButtonHref="/learn-more"
				sideImage="https://r2-andycinquin.andy-cinquin.fr/youpi_40c4613102.jpg"
				backgroundLight="https://r2-andycinquin.andy-cinquin.fr/background_v4_dark_cb59f0e4d1.webp"
				backgroundDark="https://r2-andycinquin.andy-cinquin.fr/background_v4_white_597dc37eff.webp"
				topographyPattern="https://r2-andycinquin.andy-cinquin.fr/topography_7bf885525f.svg"
				animationSpeed={0.75}
				entityDensity={0.2}
			/>
		</div>
	)
}
