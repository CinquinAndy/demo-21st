/**
 * Three.js Components - Glass Polygon Shapes
 *
 * Export all glass polygon components for use in the landing page.
 */

// Shared canvas wrapper with galaxy environment
export { GlassShapesCanvas, type GlassShapesCanvasProps } from './GlassShapesCanvas'
// Glass shapes for specific sections
export { default as Section4GlassShapes } from './Section4GlassShapes'
export { default as Section5GlassShapes } from './Section5GlassShapes'

// Reusable glass polygon shape component
export { GlassPolygonShape, type GlassPolygonShapeProps, type GlassPolygonType } from './shapes/GlassPolygonShape'
