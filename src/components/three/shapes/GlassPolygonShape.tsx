/**
 * GlassPolygonShape - Reusable Glass Polygon Component
 *
 * A production-ready component for creating extruded glass polygons with
 * transmission material effects. Supports various polygon shapes (triangle,
 * square, pentagon, hexagon, heptagon, octagon) with customizable glass properties.
 *
 * @example
 * ```tsx
 * <GlassPolygonShape
 *   type="hexagon"
 *   size={200}
 *   holeRatio={0.7}
 *   depth={20}
 *   position={[0, 0, 0]}
 *   rotation={[0, 0, 0]}
 *   rotationSpeed={[0.001, 0.002, 0]}
 *   transmission={0.95}
 *   thickness={2}
 *   roughness={0.05}
 *   ior={1.5}
 * />
 * ```
 */

import { MeshTransmissionMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

/**
 * Available polygon shapes
 */
export type GlassPolygonType = 'triangle' | 'square' | 'pentagon' | 'hexagon' | 'heptagon' | 'octagon'

/**
 * Props for GlassPolygonShape component
 */
export interface GlassPolygonShapeProps {
	// Shape configuration
	/** Type of polygon (triangle, square, pentagon, etc.) */
	type: GlassPolygonType
	/** Size/radius of the polygon */
	size: number
	/** Ratio of inner hole (0 = no hole, 1 = full hole) */
	holeRatio: number
	/** Extrusion depth of the polygon */
	depth: number

	// Transform properties
	/** Position [x, y, z] */
	position: [number, number, number]
	/** Initial rotation [x, y, z] in radians */
	rotation: [number, number, number]
	/** Rotation speed [x, y, z] per frame */
	rotationSpeed: [number, number, number]

	// Glass material properties
	/** Light transmission (0-1, higher = more transparent) */
	transmission: number
	/** Glass thickness for refraction */
	thickness: number
	/** Surface roughness (0-1) */
	roughness: number
	/** Index of refraction (1.0 = air, 1.5 = glass) */
	ior: number
	/** Chromatic aberration intensity */
	chromaticAberration: number
	/** Anisotropic filtering */
	anisotropy: number
	/** Distortion intensity */
	distortion: number
	/** Distortion scale */
	distortionScale: number
	/** Temporal distortion (animated) */
	temporalDistortion: number
	/** Light attenuation distance */
	attenuationDistance: number
	/** Attenuation color (hex) */
	attenuationColor: string

	// Surface finish properties
	/** Clearcoat layer intensity */
	clearcoat: number
	/** Clearcoat roughness */
	clearcoatRoughness: number
	/** Sheen intensity (fabric-like reflection) */
	sheen: number
	/** Sheen color (hex) */
	sheenColor: string
}

/**
 * Map polygon type to number of sides
 */
const SHAPE_TO_SIDES: Record<GlassPolygonType, number> = {
	triangle: 3,
	square: 4,
	pentagon: 5,
	hexagon: 6,
	heptagon: 7,
	octagon: 8,
}

/**
 * Creates an extruded polygon geometry with optional inner hole
 */
function createExtrudedPolygon(sides: number, size: number, holeRatio: number, depth: number): THREE.ExtrudeGeometry {
	// Generate polygon points for a given radius
	const generatePoints = (radius: number): THREE.Vector2[] => {
		const points: THREE.Vector2[] = []
		for (let i = 0; i < sides; i++) {
			const angle = (Math.PI * 2 * i) / sides - Math.PI / 2
			points.push(new THREE.Vector2(Math.cos(angle) * radius, Math.sin(angle) * radius))
		}
		return points
	}

	// Create outer shape
	const shape = new THREE.Shape(generatePoints(size))

	// Add inner hole if specified
	if (holeRatio > 0) {
		const hole = new THREE.Path(generatePoints(size * holeRatio))
		shape.holes.push(hole)
	}

	// Extrude the shape with beveling for smooth edges
	const geometry = new THREE.ExtrudeGeometry(shape, {
		depth: depth,
		bevelEnabled: true,
		bevelThickness: 2,
		bevelSize: 1,
		bevelSegments: 3,
	})

	// Center the geometry for proper rotation
	geometry.center()

	return geometry
}

/**
 * GlassPolygonShape Component
 *
 * Renders an animated extruded polygon with glass transmission material.
 * The shape rotates continuously based on rotationSpeed.
 */
export function GlassPolygonShape(props: GlassPolygonShapeProps) {
	const meshRef = useRef<THREE.Mesh>(null)

	// Create geometry (memoized to prevent recreation on every render)
	const geometry = useMemo(
		() => createExtrudedPolygon(SHAPE_TO_SIDES[props.type], props.size, props.holeRatio, props.depth),
		[props.type, props.size, props.holeRatio, props.depth],
	)

	// Animate rotation on every frame
	useFrame((_, delta) => {
		if (!meshRef.current) return
		meshRef.current.rotation.x += props.rotationSpeed[0] * delta * 60
		meshRef.current.rotation.y += props.rotationSpeed[1] * delta * 60
		meshRef.current.rotation.z += props.rotationSpeed[2] * delta * 60
	})

	return (
		<mesh ref={meshRef} geometry={geometry} position={props.position} rotation={props.rotation}>
			<MeshTransmissionMaterial
				// Core transmission properties
				transmission={props.transmission}
				thickness={props.thickness}
				roughness={props.roughness}
				ior={props.ior}
				// Distortion effects
				chromaticAberration={props.chromaticAberration}
				anisotropy={props.anisotropy}
				distortion={props.distortion}
				distortionScale={props.distortionScale}
				temporalDistortion={props.temporalDistortion}
				// Light attenuation
				attenuationDistance={props.attenuationDistance}
				attenuationColor={props.attenuationColor}
				// Base color
				color="#ffffff"
				transparent
				samples={6}
				resolution={512}
				// Surface finish
				clearcoat={props.clearcoat}
				clearcoatRoughness={props.clearcoatRoughness}
				sheen={props.sheen}
				sheenColor={props.sheenColor}
				backside
			/>
		</mesh>
	)
}

