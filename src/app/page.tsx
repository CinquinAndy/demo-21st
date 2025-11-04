'use client'

import Section4GlassShapes from '@/components/three/Section4GlassShapes'
import Section5GlassShapes from '@/components/three/Section5GlassShapes'

export default function Home() {
	return (
		<div className="relative min-h-screen">
			{/* Hero Section with Glass Shapes */}
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
				<Section4GlassShapes />

				<div className="relative z-10 container mx-auto px-6 text-center">
					<h1 className="text-6xl md:text-8xl font-bold text-foreground mb-6 tracking-tight">Glass Polygons</h1>
					<p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
						3D glass shapes with transmission materials and galaxy environment reflections
					</p>
					<div className="flex flex-wrap gap-4 justify-center">
						<div className="px-6 py-3 bg-primary/10 border border-primary rounded text-primary font-medium">
							Triangles & Octagons
						</div>
						<div className="px-6 py-3 bg-secondary/10 border border-secondary rounded text-secondary font-medium">
							React Three Fiber
						</div>
					</div>
				</div>
			</section>

			{/* Secondary Section with Glass Shapes */}
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
				<Section5GlassShapes />

				<div className="relative z-10 container mx-auto px-6 text-center">
					<h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">Fluid Designs</h2>
					<p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
						Squares and organic shapes with customizable transmission, refraction, and distortion effects
					</p>
				</div>
			</section>

			{/* Footer */}
			<footer className="relative z-10 py-12 text-center">
				<p className="text-sm text-muted-foreground">Built with Next.js 16, React Three Fiber, and Three.js</p>
			</footer>
		</div>
	)
}
