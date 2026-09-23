import type { Transition, Variants } from 'motion/react'

/**
 * Shared spring transition for layoutId transitions when picking up or closing a book.
 * Keeping this in a shared constant guarantees both views animate with identical velocity.
 */
export const BOOK_SPRING_TRANSITION: Transition = {
  type: 'spring',
  duration: 0.45,
  bounce: 0,
} as const

/**
 * Backdrop / shell fade variants for modal overlays
 */
export const MODAL_SHELL_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}