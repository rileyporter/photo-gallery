import type { CSSVarStyle } from '../types/css.ts'

interface BookProgressProps {
  currentPage: number
  totalPages: number
  accentColor: string
  onSeek: (targetPage: number) => void
  className?: string
}

// A page-position bar beneath the open book, built on a native
// <input type="range"> rather than a hand-rolled div — this gets
// click-to-seek, drag, and keyboard (arrow key) support for free from
// the browser instead of reimplementing slider semantics by hand.
// Default appearance is fully overridden via CSS to match the book's
// accent color.
export default function BookProgress({ currentPage, totalPages, accentColor, onSeek, className }: BookProgressProps) {
  if (totalPages <= 1) return null // nothing to seek through in a one-page book

  const percent = (currentPage / (totalPages - 1)) * 100

  // The filled-vs-unfilled look is computed here rather than in CSS:
  // browsers don't agree on a pseudo-element for "the filled portion" of
  // a range input (Firefox has ::-moz-range-progress; Chrome/Safari
  // don't), so a dynamic inline gradient is the simplest thing that
  // looks identical everywhere.
  const style: CSSVarStyle = {
    '--book-accent': accentColor,
    background: `linear-gradient(to right, var(--book-accent) ${percent}%, rgba(255,255,255,0.18) ${percent}%)`,
  }

  return (
    <input
      type="range"
      className={`book-progress ${className ?? ''}`}
      style={style}
      min={0}
      max={totalPages - 1}
      value={currentPage}
      aria-label={`Page ${currentPage + 1} of ${totalPages}`}
      onChange={(e) => onSeek(Number(e.target.value))}
      // Without this, focusing the bar and pressing an arrow key would
      // move two pages at once: this input's own native seeking AND
      // OpenBook's window-level ArrowLeft/ArrowRight page-turn handler.
      onKeyDown={(e) => e.stopPropagation()}
      data-cursor="seek"
      data-cursor-color={accentColor}
    />
  )
}