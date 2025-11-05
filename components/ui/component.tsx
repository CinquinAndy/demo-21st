"use client";

/**
 * GlitterFinal Component
 *
 * Advanced glittering effect using Three.js and custom shaders.
 * Creates a realistic sparkling/glitter overlay effect across the entire screen.
 *
 * Features:
 * - Custom WebGL shaders for realistic glitter effect
 * - Procedural noise texture generation
 * - GPU-accelerated rendering via Three.js
 * - Configurable speed and intensity
 * - Blend mode support for overlay effects
 *
 * Technical Implementation:
 * - Uses fragment shader to sample noise texture at multiple scales
 * - Applies power function (pow 12.0) for sharp sparkle effect
 * - Animates texture sampling over time for dynamic sparkles
 *
 * @param speed - Animation speed multiplier (default: 1)
 * @param intensity - Sparkle intensity multiplier (default: 5.0)
 * @param className - Additional CSS classes for container
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { FadeIn, SlideInFromBottom } from "@/components/animations";

// Vertex shader - passes UV coordinates to fragment shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader - creates the glitter effect
// Adapted from Shadertoy shader with noise texture sampling
const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform sampler2D iChannel0;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float result = 0.0;

    // Sample noise texture at different scales and speeds
    // This creates the dynamic glitter effect
    result += texture2D(iChannel0, uv * 1.1 + vec2(iTime * -0.005)).r;
    result *= texture2D(iChannel0, uv * 0.9 + vec2(iTime * 0.005)).g;

    // Power function creates sharp, defined sparkles
    result = pow(result, 12.0);

    // Amplify the result for visibility
    gl_FragColor = vec4(vec3(5.0) * result, 1.0);
  }
`;

/**
 * Generate a random noise texture for the glitter effect
 *
 * Creates a procedural noise texture with random RGB values.
 * This texture is sampled by the fragment shader to create sparkles.
 *
 * @param size - Texture resolution (default: 512x512)
 * @returns THREE.DataTexture with random noise data
 */
function generateNoiseTexture(size = 512): THREE.DataTexture {
  const data = new Uint8Array(size * size * 4);

  for (let i = 0; i < size * size; i++) {
    const stride = i * 4;

    // Generate random noise for each color channel
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;

    data[stride] = r;
    data[stride + 1] = g;
    data[stride + 2] = b;
    data[stride + 3] = 255; // Full opacity
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return texture;
}

interface SparklesPlaneProps {
  speed?: number;
  intensity?: number;
}

/**
 * SparklesPlane Component
 *
 * Renders a plane with custom shader material for glitter effect.
 * Updates shader uniforms every frame for animation.
 */
function SparklesPlane({ speed = 1, intensity: _intensity = 5.0 }: SparklesPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Generate noise texture once on mount (memoized)
  const noiseTexture = useMemo(() => generateNoiseTexture(512), []);

  // Create shader material with custom uniforms
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(
            typeof window !== "undefined" ? window.innerWidth : 1920,
            typeof window !== "undefined" ? window.innerHeight : 1080
          ),
        },
        iChannel0: { value: noiseTexture },
      },
      vertexShader,
      fragmentShader,
      transparent: false,
      side: THREE.DoubleSide,
    });
  }, [noiseTexture]);

  // Update shader uniforms every frame
  useFrame((state) => {
    if (meshRef.current && meshRef.current.material instanceof THREE.ShaderMaterial) {
      // Animate time uniform for moving glitter effect
      meshRef.current.material.uniforms.iTime.value = state.clock.elapsedTime * speed;

      // Update resolution in case of window resize
      meshRef.current.material.uniforms.iResolution.value.set(
        state.size.width,
        state.size.height
      );
    }
  });

  return (
    <mesh ref={meshRef} material={material}>
      {/* Large plane to cover entire viewport */}
      <planeGeometry args={[10, 10]} />
    </mesh>
  );
}

interface GlitterFinalProps {
  speed?: number;
  intensity?: number;
  className?: string;
}

/**
 * GlitterFinal Component
 *
 * Main export - wraps Three.js canvas with glitter effect.
 * Positioned as fixed overlay with blend mode for integration.
 *
 * @param speed - Animation speed (default: 1)
 * @param intensity - Effect intensity (default: 5.0)
 * @param className - Additional CSS classes
 */
export const GlitterFinal = ({
  speed = 1,
  intensity = 5.0,
  className = "",
}: GlitterFinalProps) => {
  return (
    <div
      className={`fixed z-0 scale-125 custom-bg inset-0 w-full h-full opacity-50 mix-blend-lighten pointer-events-none ${className}`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 35 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
        }}
        gl={{ powerPreference: "high-performance" }}
      >
        {/* Dark background color */}
        <color attach="background" args={["#111111"]} />

        {/* Render sparkles plane with shader */}
        <SparklesPlane speed={speed} intensity={intensity} />
      </Canvas>
    </div>
  );
};

/**
 * Hero Section Component
 *
 * Main hero section with:
 * - Large responsive typography
 * - Image with gradient overlay
 * - Scroll indicator
 * - Integrated GlitterFinal effect
 *
 * Layout:
 * - Two-column grid on desktop (text left, image right)
 * - Single column on mobile (stacked)
 * - Full-screen height
 */

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  glitterSpeed?: number;
  glitterIntensity?: number;
}

export const Component = ({
  title = "Makeup Artist",
  subtitle = "Maeva Cinquin - Maquilleuse Professionnelle",
  imageSrc = "/image00001.jpeg",
  imageAlt = "Hero Section",
  glitterSpeed = 0.75,
  glitterIntensity = 5.0,
}: HeroSectionProps) => {
  return (
    <div className="min-w-screen h-screen min-h-screen grid grid-cols-1 xl:grid-cols-2 relative 2xl:-translate-y-20 z-10">
      {/* GlitterFinal background effect - WebGL shader-based sparkles */}
      <GlitterFinal speed={glitterSpeed} intensity={glitterIntensity} />

      {/* Text Content Section - Left Side with FadeIn animation */}
      <FadeIn className="lg:ml-10 absolute top-20 left-0 text-center xl:text-left z-10 opacity-100 h-full flex flex-col justify-center items-center xl:items-start gap-4 xl:gap-10 px-4">
        {/* Main Title - Large Typography with SlideInFromBottom animation */}
        <SlideInFromBottom delay={0.2} duration={0.8}>
          <h1 className="text-[75px]/[75px] sm:text-[125px]/[125px] lg:text-[180px]/[180px] xl:text-[210px]/[210px] 2xl:text-[285px]/[285px] 3xl:text-[380px]/[380px] uppercase text-foreground max-w-7xl font-bold tracking-tight">
            {title}
          </h1>
        </SlideInFromBottom>

        {/* Subtitle - Secondary Typography with delayed SlideInFromBottom */}
        <SlideInFromBottom delay={0.4} duration={0.8}>
          <h2 className="lg:text-5xl 2xl:text-6xl 3xl:text-7xl text-4xl font-bold text-foreground">
            {subtitle}
          </h2>
        </SlideInFromBottom>
      </FadeIn>

      {/* Scroll Indicator - Bottom Center with FadeIn and bounce animation */}
      <FadeIn
        delay={0.6}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex justify-center items-center z-40"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground animate-bounce"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </FadeIn>

      {/* Image Section - Right Side with FadeIn animation */}
      <FadeIn delay={0.3} className="w-full h-full col-span-1 lg:col-start-2 relative z-5">
        {/* Hero Image with horizontal flip (-scale-x-100) */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover z-5 -scale-x-100"
        />

        {/* Gradient Overlay - Smooth transition from background color to transparent */}
        <div className="absolute z-5 inset-0 bg-gradient-to-r from-background via-background/15 via-background/25 to-transparent pointer-events-none" />
      </FadeIn>
    </div>
  );
};
