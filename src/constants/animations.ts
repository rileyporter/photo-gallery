import { Transition, Variants, useReducedMotion } from 'motion/react'


export type AnimationPreset = 'bookZoom' | 'coverFlipOpen' | 'coverFlipClosed' | 'pageTurn'

/**
 * Shared duration transition curve for both flight and cover flip.
 */
const SHARED_TRANSITION_DURATION = 3.0

const TRANSITIONS: Record<AnimationPreset, Transition> = {
  // Spatial layout flight from shelf to open book view
  bookZoom: {
    duration: SHARED_TRANSITION_DURATION,
    ease: [0.4, 0, 0.2, 1], // Standard balanced ease-in-out
  },
  // Cover Opening: Gradual unhinge while expanding to stage
  coverFlipOpen: {
    duration: SHARED_TRANSITION_DURATION,
    ease: [0.65, 0, 0.35, 1], // S-curve through -90deg
  },
  // Cover Closing: Snappy initial swing so cover shuts before spatial flight completes
  coverFlipClosed: {
    duration: SHARED_TRANSITION_DURATION * 0.6,
    ease: [0.32, 0, 0.67, 0], // Ease-in: Starts rotating immediately on click
  },
  // Fast snappy flipping interior pages while reading
  pageTurn: {
    duration: 0.22,
    ease: [0.45, 0, 0.2, 1],
  },
} as const


/**
 * Variants for cover flip open and close
 */
const COVER_FLIP_VARIANTS: Variants = {
  initial: {
    rotateY: 0,
  },
  animate: {
    rotateY: -180,
    transition: {
      duration: SHARED_TRANSITION_DURATION,
      ease: [0.65, 0, 0.35, 1], // S-curve unhinge for opening
    },
  },
  exit: {
    rotateY: 0,
    transition: {
      duration: SHARED_TRANSITION_DURATION,
      ease: [0.32, 0, 0.67, 0], // Snappy ease-in for closing
    },
  },
}

/**
 * Resolves a named animation preset and automatically sanitizes it 
 * for reduced-motion preferences.
 */
export function useTransition(preset: AnimationPreset): Transition {
  if (useReducedMotion()) {
    return { duration: 0 }
  }
  return TRANSITIONS[preset]
}

/**
 * Returns cover flip variants sanitized for reduced motion
 */
export function useCoverFlipVariants(): Variants {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return {
      initial: { rotateY: 0 },
      animate: { rotateY: -180, transition: { duration: 0 } },
      exit: { rotateY: 0, transition: { duration: 0 } },
    }
  }

  return COVER_FLIP_VARIANTS
}

/**
 * Backdrop / shell fade variants for modal overlays
 */
export const MODAL_SHELL_VARIANTS: Variants = {
  hidden: { 
    opacity: 0,
    pointerEvents: 'none',
  },
  visible: { 
    opacity: 1,
    pointerEvents: 'auto',
  },
  exit: { 
    opacity: 0,
    pointerEvents: 'none',
  },
}