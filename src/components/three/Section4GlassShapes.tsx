/**
 * Section 4 Glass Shapes - Triangles & Octagons Theme
 *
 * Geometric glass shapes for the Data Sovereignty section.
 * Features sharper, more angular designs with triangles and octagons.
 */

'use client'

import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { GlassPolygonShape, type GlassPolygonShapeProps } from './shapes/GlassPolygonShape'

export default function Section4GlassShapes() {
	// Section 4: Triangles and Octagons theme - More geometric, sharper
	const shapes: GlassPolygonShapeProps[] = [
		{
			type: 'triangle',
			size: 200,
			holeRatio: 0.65,
			depth: 30,
			position: [-450, 100, -30],
			rotation: [0.5, 0.8, 0.3],
			rotationSpeed: [0.002, -0.001, 0.003],
			transmission: 0.97,
			thickness: 3.5,
			roughness: 0.03,
			ior: 1.85,
			chromaticAberration: 0.4,
			anisotropy: 0.2,
			distortion: 1.2,
			distortionScale: 0.6,
			temporalDistortion: 0.15,
			attenuationDistance: 0.5,
			attenuationColor: '#ffd4e8',
			clearcoat: 0.5,
			clearcoatRoughness: 0.2,
			sheen: 0.25,
			sheenColor: '#ffffff',
		},
		{
			type: 'octagon',
			size: 350,
			holeRatio: 0.8,
			depth: 18,
			position: [380, -180, -60],
			rotation: [2.1, 1.5, 4.8],
			rotationSpeed: [-0.0015, 0.0025, -0.002],
			transmission: 0.92,
			thickness: 1.8,
			roughness: 0.08,
			ior: 1.45,
			chromaticAberration: 0.18,
			anisotropy: 0.12,
			distortion: 0.7,
			distortionScale: 0.45,
			temporalDistortion: 0.08,
			attenuationDistance: 1.2,
			attenuationColor: '#e8d4ff',
			clearcoat: 0.35,
			clearcoatRoughness: 0.35,
			sheen: 0.4,
			sheenColor: '#ffffff',
		},
		{
			type: 'triangle',
			size: 150,
			holeRatio: 0.7,
			depth: 22,
			position: [200, 250, -40],
			rotation: [3.8, 2.2, 1.1],
			rotationSpeed: [0.0018, 0.0012, -0.0028],
			transmission: 0.95,
			thickness: 2.2,
			roughness: 0.05,
			ior: 1.68,
			chromaticAberration: 0.22,
			anisotropy: 0.18,
			distortion: 0.9,
			distortionScale: 0.52,
			temporalDistortion: 0.12,
			attenuationDistance: 0.8,
			attenuationColor: '#d4fff4',
			clearcoat: 0.42,
			clearcoatRoughness: 0.28,
			sheen: 0.18,
			sheenColor: '#ffffff',
		},
	]

	return (
		<div className="absolute inset-0 pointer-events-none z-40 overflow-visible">
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
			{shapes.map((shapeProps) => (
				<GlassPolygonShape
					key={`${shapeProps.type}-${shapeProps.position.join('-')}`}
					{...shapeProps}
				/>
			))}
			</Canvas>
		</div>
	)
}

