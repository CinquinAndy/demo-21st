/**
 * Hero Component Demo
 *
 * Showcases the animated hero component with WebGL glitter effect.
 * Customize the title, subtitle, and glitter animation parameters.
 */
import { Component } from '@/components/ui/animated-hero-with-web-gl-glitter'

export default function DemoOne() {
	return (
		<div className="relative w-full h-screen">
			<Component
				title="Amazing Hero"
				subtitle="Beautiful animated hero section with WebGL sparkles"
				glitterSpeed={0.75}
				glitterIntensity={5.0}
			/>
		</div>
	)
}
