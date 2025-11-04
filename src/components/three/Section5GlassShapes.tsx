/**
 * Section 5 Glass Shapes - Squares & Heptagons Theme
 *
 * Glass shapes for the CTA + Stats section (footer area).
 * Features more fluid, organic designs with squares and heptagons.
 */

'use client'

import { GlassShapesCanvas } from './GlassShapesCanvas'
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
		<GlassShapesCanvas zIndex={0}>
			{shapes.map(shapeProps => (
				<GlassPolygonShape key={`${shapeProps.type}-${shapeProps.position.join('-')}`} {...shapeProps} />
			))}
		</GlassShapesCanvas>
	)
}
