"use client";

/**
 * Animation Wrapper Components
 *
 * Collection of reusable animation components using Framer Motion.
 * Provides fade-in, slide-in, scale-in, and stagger animations.
 *
 * All animations support:
 * - Custom delays and durations
 * - Viewport-based triggering (scroll animations)
 * - CSS custom classes
 * - Performance optimization with will-change
 *
 * Components:
 * - FadeIn: Simple fade-in animation
 * - FadeInWhenVisible: Fade-in triggered by scroll
 * - SlideInFromBottom: Slide up from bottom
 * - SlideInFromLeft: Slide in from left
 * - SlideInFromRight: Slide in from right
 * - ScaleIn: Scale from small to full size
 * - StaggerContainer: Container for staggered children
 * - StaggerItem: Child element with stagger effect
 */

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

interface AnimationWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

// FadeIn animation variants
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

// Slide in from bottom variants
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

// Slide in from left variants
const slideInFromLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: (custom: { delay?: number; duration?: number }) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom?.duration || 0.6,
      delay: custom?.delay || 0,
      ease: "easeOut",
    },
  }),
};

// Slide in from right variants
const slideInFromRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: (custom: { delay?: number; duration?: number }) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom?.duration || 0.6,
      delay: custom?.delay || 0,
      ease: "easeOut",
    },
  }),
};

// Scale in variants
const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (custom: { delay?: number; duration?: number }) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom?.duration || 0.6,
      delay: custom?.delay || 0,
      ease: "easeOut",
    },
  }),
};

/**
 * FadeInWhenVisible
 *
 * Fades in element when it enters viewport (scroll-triggered).
 * Uses intersection observer for performance.
 *
 * @param children - Content to animate
 * @param className - Additional CSS classes
 * @param duration - Animation duration in seconds (default: 0.6)
 */
export function FadeInWhenVisible({
  children,
  className,
  duration = 0.6,
}: AnimationWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInVariants}
      custom={duration}
      className={className}
      style={{ willChange: "opacity" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeIn
 *
 * Fades in element immediately on mount (no scroll detection).
 * Useful for above-the-fold content.
 *
 * @param children - Content to animate
 * @param className - Additional CSS classes
 * @param duration - Animation duration in seconds (default: 0.6)
 */
export function FadeIn({
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
 * SlideInFromBottom
 *
 * Slides element up from bottom when entering viewport.
 * Combines opacity fade with vertical translation.
 *
 * @param children - Content to animate
 * @param className - Additional CSS classes
 * @param delay - Start delay in seconds (default: 0)
 * @param duration - Animation duration in seconds (default: 0.6)
 */
export function SlideInFromBottom({
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

/**
 * SlideInFromLeft
 *
 * Slides element in from left side when entering viewport.
 * Combines opacity fade with horizontal translation.
 *
 * @param children - Content to animate
 * @param className - Additional CSS classes
 * @param delay - Start delay in seconds (default: 0)
 * @param duration - Animation duration in seconds (default: 0.6)
 */
export function SlideInFromLeft({
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
      variants={slideInFromLeftVariants}
      custom={{ delay, duration }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * SlideInFromRight
 *
 * Slides element in from right side when entering viewport.
 * Combines opacity fade with horizontal translation.
 *
 * @param children - Content to animate
 * @param className - Additional CSS classes
 * @param delay - Start delay in seconds (default: 0)
 * @param duration - Animation duration in seconds (default: 0.6)
 */
export function SlideInFromRight({
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
      variants={slideInFromRightVariants}
      custom={{ delay, duration }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScaleIn
 *
 * Scales element from 90% to 100% size when entering viewport.
 * Combines opacity fade with scale transformation.
 *
 * @param children - Content to animate
 * @param className - Additional CSS classes
 * @param delay - Start delay in seconds (default: 0)
 * @param duration - Animation duration in seconds (default: 0.6)
 */
export function ScaleIn({
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
      variants={scaleInVariants}
      custom={{ delay, duration }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer
 *
 * Container for creating staggered animations of children.
 * Children should use StaggerItem component for proper timing.
 *
 * Example:
 * ```tsx
 * <StaggerContainer staggerDelay={0.1}>
 *   <StaggerItem>Item 1</StaggerItem>
 *   <StaggerItem>Item 2</StaggerItem>
 *   <StaggerItem>Item 3</StaggerItem>
 * </StaggerContainer>
 * ```
 *
 * @param children - StaggerItem components
 * @param className - Additional CSS classes
 * @param staggerDelay - Delay between each child (default: 0.1s)
 * @param initialDelay - Initial delay before first child (default: 0s)
 */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  initialDelay = 0,
}: StaggerContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: initialDelay,
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem
 *
 * Individual item within a StaggerContainer.
 * Animates with slide-up and fade-in effect.
 *
 * @param children - Content to animate
 * @param className - Additional CSS classes
 * @param duration - Animation duration in seconds (default: 0.5)
 */
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  duration?: number;
}

export function StaggerItem({
  children,
  className,
  duration = 0.5,
}: StaggerItemProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
