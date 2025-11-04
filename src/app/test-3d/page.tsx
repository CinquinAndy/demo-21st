'use client'

import Section4GlassShapes from '@/components/three/Section4GlassShapes'
import Section5GlassShapes from '@/components/three/Section5GlassShapes'

export default function Test3DPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
			{/* Header */}
			<div className="relative z-50 p-8">
				<h1 className="text-4xl font-bold text-white mb-4">3D Glass Shapes Test</h1>
				<p className="text-gray-300">Testing the glass polygon components with different configurations</p>
			</div>

			{/* Section 4 - Triangles & Octagons */}
			<section className="relative h-screen w-full overflow-hidden">
				<div className="absolute inset-0 flex items-center justify-center z-10">
					<div className="text-center text-white">
						<h2 className="text-3xl font-bold mb-2">Section 4</h2>
						<p className="text-gray-300">Triangles & Octagons Theme</p>
						<p className="text-sm text-gray-400 mt-2">Sharp, angular geometric shapes</p>
					</div>
				</div>
				<Section4GlassShapes />
			</section>

			{/* Section 5 - Squares & Heptagons */}
			<section className="relative h-screen w-full overflow-hidden">
				<div className="absolute inset-0 flex items-center justify-center z-10">
					<div className="text-center text-white">
						<h2 className="text-3xl font-bold mb-2">Section 5</h2>
						<p className="text-gray-300">Squares & Heptagons Theme</p>
						<p className="text-sm text-gray-400 mt-2">Fluid, organic designs</p>
					</div>
				</div>
				<Section5GlassShapes />
			</section>

			{/* Footer */}
			<div className="relative z-50 p-8 text-center text-white">
				<p className="text-gray-400">Scroll to see different shape configurations</p>
			</div>
		</div>
	)
}
