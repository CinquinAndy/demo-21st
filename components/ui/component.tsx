"use client";

/**
 * Hero Component with WebGL Glitter Effect and Framer Motion Animations
 *
 * A complete hero section featuring:
 * - WebGL shader-based glitter effect (GlitterFinal)
 * - Smooth Framer Motion entrance animations
 * - Responsive typography (75px → 380px)
 * - Two-column grid layout
 * - Image with gradient overlay
 *
 * This file contains everything needed - no external dependencies except npm packages.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { motion, type Variants } from "motion/react";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Utility function to merge class names
 * Combines clsx and tailwind-merge functionality
 */
function cn(...inputs: string[]): string {
  return inputs.filter(Boolean).join(" ");
}

// ============================================================================
// ANIMATION COMPONENTS
// ============================================================================

interface AnimationWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

// Animation variants
const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: number) => ({
    opacity: 1,
    transition: {
      duration: custom || 0.6,
      ease: "easeOut",
    },
  }),
};

const slideInFromBottomVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom: { delay?: number; duration?: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom?.duration || 0.6,
      delay: custom?.delay || 0,
      ease: "easeOut",
    },
  }),
};

/**
 * FadeIn Component
 * Fades in element immediately on mount (no scroll detection)
 */
function FadeIn({
  children,
  className,
  duration = 0.6,
  delay = 0,
}: AnimationWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
      custom={duration}
      className={className}
      style={{ willChange: "opacity" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * SlideInFromBottom Component
 * Slides element up from bottom when entering viewport
 */
function SlideInFromBottom({
  children,
  className,
  delay = 0,
  duration = 0.6,
}: AnimationWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={slideInFromBottomVariants}
      custom={{ delay, duration }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// WEBGL GLITTER EFFECT
// ============================================================================

// Vertex shader - passes UV coordinates to fragment shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader - creates the glitter effect
const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform sampler2D iChannel0;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float result = 0.0;

    // Sample noise texture at different scales and speeds
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
 */
function generateNoiseTexture(size = 512): THREE.DataTexture {
  const data = new Uint8Array(size * size * 4);

  for (let i = 0; i < size * size; i++) {
    const stride = i * 4;
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;

    data[stride] = r;
    data[stride + 1] = g;
    data[stride + 2] = b;
    data[stride + 3] = 255;
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
 * SparklesPlane - Renders plane with shader material
 */
function SparklesPlane({ speed = 1, intensity: _intensity = 5.0 }: SparklesPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const noiseTexture = useMemo(() => generateNoiseTexture(512), []);

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

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material instanceof THREE.ShaderMaterial) {
      meshRef.current.material.uniforms.iTime.value = state.clock.elapsedTime * speed;
      meshRef.current.material.uniforms.iResolution.value.set(
        state.size.width,
        state.size.height
      );
    }
  });

  return (
    <mesh ref={meshRef} material={material}>
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
 * WebGL shader-based glitter effect overlay
 */
export function GlitterFinal({
  speed = 1,
  intensity = 5.0,
  className = "",
}: GlitterFinalProps) {
  return (
    <div
      className={cn(
        "fixed z-0 scale-125 inset-0 w-full h-full opacity-50 mix-blend-lighten pointer-events-none",
        className
      )}
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
        <color attach="background" args={["#111111"]} />
        <SparklesPlane speed={speed} intensity={intensity} />
      </Canvas>
    </div>
  );
}

// ============================================================================
// HERO COMPONENT
// ============================================================================

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  glitterSpeed?: number;
  glitterIntensity?: number;
}

/**
 * Component - Main Hero Section
 *
 * Full-screen hero with:
 * - WebGL glitter background
 * - Animated text content (title + subtitle)
 * - Hero image with gradient overlay
 * - Scroll indicator
 *
 * Responsive typography scales from 75px (mobile) to 380px (3xl screens)
 */
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
