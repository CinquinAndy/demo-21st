/**
 * Shared Glass Shapes Canvas Component
 *
 * Reusable canvas wrapper with galaxy environment for glass shape compositions.
 * Provides consistent lighting, environment, and performance settings.
 */

'use client'

import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import type { ReactNode } from 'react'

export type GlassShapesCanvasProps = {
	children: ReactNode
	/** Z-index for positioning (default: 40) */
	zIndex?: number
	/** Camera FOV (default: 50) */
	fov?: number
	/** Camera position (default: [0, 0, 600]) */
	cameraPosition?: [number, number, number]
	/** Environment intensity multiplier (default: 1.5) */
	environmentIntensity?: number
	/** Ambient light intensity (default: 0.6) */
	ambientIntensity?: number
	/** Use 8k galaxy texture instead of 4k (default: false, impacts performance) */
	useHighResTexture?: boolean
}

export function GlassShapesCanvas({
	children,
	zIndex = 40,
	fov = 50,
	cameraPosition = [0, 0, 600],
	environmentIntensity = 1.5,
	ambientIntensity = 0.6,
	useHighResTexture = false,
}: GlassShapesCanvasProps) {
	const galaxyTexture = useHighResTexture ? '/starmap_2020_8k.exr' : '/starmap_2020_4k.exr'

	return (
		<div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex }}>
			<Canvas
				dpr={1}
				camera={{ position: cameraPosition, fov }}
				gl={{
					alpha: true,
					antialias: false,
					powerPreference: 'high-performance',
				}}
				style={{ pointerEvents: 'none' }}
			>
				{/* Lighting setup */}
				<ambientLight intensity={ambientIntensity} />
				<directionalLight position={[5, 5, 5]} intensity={1.2} />
				<pointLight position={[-5, -5, 2]} intensity={0.5} color="#ffffff" />

				{/* Galaxy environment for realistic reflections */}
				<Environment files={galaxyTexture} background={false} environmentIntensity={environmentIntensity} />

				{children}
			</Canvas>
		</div>
	)
}
