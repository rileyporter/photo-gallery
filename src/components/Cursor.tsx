// A custom cursor that replaces the native OS cursor over specific
// interactive elements.
//
// To opt in to custom cursor, add these attribute options to an element
//     data-cursor=variant
//     data-cursor-color=hex, defaults to tailwind theme accent color

import { useEffect, useRef, useState } from 'react'
import type { CSSVarStyle } from '../types/css.ts'

// Short label shown inside the cursor ring for each variant
const LABELS: Record<string, string> = {
  open: 'Open',
  next: '→',
  prev: '←',
  close: 'X'
}

function isTouchDevice(): boolean {
  // Likely a touch device if user is interacting with a coarse pointer
  return typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches
}

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [variant, setVariant] = useState<string | null>(null)
  const [color, setColor] = useState<string | null>(null)
  const lastPoint = useRef({ x: -1, y: -1 })

  useEffect(() => {
    if (isTouchDevice()) return

    // Shared by the live mouseover handler and the manual recheck below,
    // so the two paths can never drift into different logic.
    function updateFromElement(target: Element | null) {
      const match = target?.closest('[data-cursor]') ?? null
      const variant = match?.getAttribute('data-cursor')
      setVariant(variant === 'none' ? null : (variant ?? null))
      setColor(match?.getAttribute('data-cursor-color') ?? null)
    }

    function handleMove(e: MouseEvent) {
      lastPoint.current = { x: e.clientX, y: e.clientY }
      // Direct DOM write, not setState for better performance than React re-renders
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    function handleOver(e: MouseEvent) {
      updateFromElement(e.target instanceof Element ? e.target : null)
    }

    // Fired by anything that changes what's under a stationary cursor, e.g. after
    // animating in or out a page and needing to update cursor
    function handleRecheck() {
      updateFromElement(document.elementFromPoint(lastPoint.current.x, lastPoint.current.y))
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleOver)
    window.addEventListener('cursor:recheck', handleRecheck)


    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
      window.removeEventListener('cursor:recheck', handleRecheck)
    }
  }, [])

  // Exit early and return no DOM elements if we're on a touch screen device
  if (isTouchDevice()) {
    return null
  }

  const label = variant ? LABELS[variant] : undefined
  const dotStyle: CSSVarStyle = { '--cursor-color': color ?? 'var(--site-accent)' }

  return (
    <div
      ref={dotRef}
      // will-change-transform to move the cursor to its own GPU layer since it changes frequently
      className={`custom-cursor ${variant ? 'is-active' : ''} will-change-transform`}
      style={dotStyle}
    >
      <span className="custom-cursor-ring">{label}</span>
    </div>
  )
}
