import { Transition, Variants, useReducedMotion } from 'motion/react'

/**
 * Shared duration transition curve for both book flight and cover flip.
 */
const SHARED_TRANSITION_DURATION = 0.7

// This one curve is the entire "book zoom + cover open" gesture. Having it as
// a Transition allows more alignment than only aligning on duration.
const OPEN_TRANSITION: Transition = {
  duration: SHARED_TRANSITION_DURATION,
  ease: [0.4, 0, 0.2, 1],
}

// The close gesture is deliberately a different shape than open — the
// cover should visually lead the shrink, then the book zooms back to the shelf
const CLOSE_TRANSITION: Transition = {
  duration: SHARED_TRANSITION_DURATION,
  ease: [0.32, 0, 0.67, 0],
}

/**
 * Returns the page flip transition sanitized for reduced motion
 */
export function usePageFlipTransition(): Transition {
  if (useReducedMotion()) {
    return { duration: 0 }
  }

  // Fast snappy flipping interior pages while reading
  return {
    duration: 0.22,
    ease: [0.45, 0, 0.2, 1],
  }
}

/**
 * Layout flight transition variants for book open and close behavior
 */
export function useBookZoomVariants(): Variants {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return {
      initial: {},
      animate: { transition: { duration: 0 } },
      exit: { transition: { duration: 0 } },
    }
  }

  return {
    initial: {},
    animate: {
      transition: OPEN_TRANSITION,
    },
    exit: {
      transition: CLOSE_TRANSITION,
    },
  }
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

  return {
    initial: {
      rotateY: 0,
    },
    animate: {
      rotateY: -180,
      transition: OPEN_TRANSITION,
    },
    exit: {
      rotateY: 0,
      transition: CLOSE_TRANSITION,
    },
  }
}

/**
 * Backdrop / shell fade variants sanitized for reduced motion
 */
export function useModalShellVariants(): Variants {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return {
      hidden: { opacity: 0, pointerEvents: 'none' },
      visible: { opacity: 1, pointerEvents: 'auto', transition: { duration: 0 } },
      exit: { opacity: 0, pointerEvents: 'none', transition: { duration: 0 } },
    }
  }

  return {
    hidden: { 
      opacity: 0, 
      pointerEvents: 'none' 
    },
    visible: { 
      opacity: 1, 
      pointerEvents: 'auto',
      transition: OPEN_TRANSITION,
    },
    exit: { 
      opacity: 0, 
      pointerEvents: 'none',
      transition: CLOSE_TRANSITION,
    },
  }
}