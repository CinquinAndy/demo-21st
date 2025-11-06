'use client'

import { AnimatedHeroSection } from '../../code'

export default function AnimatedHeroDemo() {
	return (
		<AnimatedHeroSection
			title="Can't Attend Your Race? <span>Transfer</span> Your Bib Safely!"
			subtitle="Legal race bib transfers for running, trail, triathlon & cycling events worldwide. <br />Secure PayPal payments, verified sellers, and instant organizer approval. Join thousands of athletes who trust us."
			buttons={[
				{
					label: 'Get Started',
					href: '/get-started',
					variant: 'primary',
				},
				{
					label: 'Learn More',
					href: '/learn-more',
					variant: 'secondary',
				},
			]}
			backgroundImage="/landing/background_v4_dark.webp"
			sideImage="/landing/youpi.jpg"
			backgroundPattern="/svgs/topography.svg"
			theme="light"
			enableAnimation={true}
			animationSpeed={0.75}
			animationDensity={0.2}
		/>
	)
}
