/**
 * WebGL Glitter Background Demo
 *
 * Showcases the WebGL glitter background effect.
 * Customize the speed and intensity of the sparkle animation.
 */
import { Component } from '@/components/ui/animated-hero-with-web-gl-glitter'

export default function DemoOne() {
	return (
		<Component
			speed={0.75}
			intensity={5.0}
		/>
	)
}
