/**
 * Section 5 Glass Shapes - Squares & Heptagons Theme
 *
 * Glass shapes for the CTA + Stats section (footer area).
 * Features more fluid, organic designs with squares and heptagons.
 */

'use client'

import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { GlassPolygonShape, type GlassPolygonShapeProps } from './shapes/GlassPolygonShape'

export default function Section5GlassShapes() {
	// Section 5: Heptagons and Squares theme - More fluid, organic feel
	const shapes: GlassPolygonShapeProps[] = [
		{
			type: 'square',
			size: 190,
			holeRatio: 0.78,
			depth: 16,
			position: [-380, -220, -70],
			rotation: [3.5, 1.1, 5.2],
			rotationSpeed: [0.0022, -0.0018, -0.0035],
			transmission: 0.98,
			thickness: 1.2,
			roughness: 0.12,
			ior: 2.05,
			chromaticAberration: 0.35,
			anisotropy: 0.08,
			distortion: 1.5,
			distortionScale: 0.38,
			temporalDistortion: 0.28,
			attenuationDistance: 0.65,
			attenuationColor: '#d4e8ff',
			clearcoat: 0.52,
			clearcoatRoughness: 0.38,
			sheen: 0.12,
			sheenColor: '#ffffff',
		},
	]

	return (
		<div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
			<Canvas
				dpr={1}
				camera={{ position: [0, 0, 600], fov: 50 }}
				gl={{
					alpha: true,
					antialias: false,
					powerPreference: 'high-performance',
				}}
				style={{ pointerEvents: 'none' }}
			>
				<ambientLight intensity={0.6} />
				<directionalLight position={[5, 5, 5]} intensity={1.2} />
				<pointLight position={[-5, -5, 2]} intensity={0.5} color="#ffffff" />
				<Environment preset="warehouse" />
				{shapes.map(shapeProps => (
					<GlassPolygonShape key={`${shapeProps.type}-${shapeProps.position.join('-')}`} {...shapeProps} />
				))}
			</Canvas>
		</div>
	)
}
