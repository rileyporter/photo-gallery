// Component for a single closed book on the shelf
//
// Uses a shared `layoutId` with the open book display for animating
// transitions between picking up a book and closing it.

import { motion } from 'framer-motion'
import type { Book } from '../data/library.ts'
import type { CSSVarStyle } from '../types/css.ts'

interface ClosedBookProps {
  book: Book
  onSelect: (slug: string) => void
  hidden: boolean
}

export default function ClosedBook({ book, onSelect, hidden }: ClosedBookProps) {

  const wrapStyle: CSSVarStyle = {'--book-accent': book.accentColor }

  return (
    // Outer wrapper for CSS styling that is separate from motion div which is animated
    <div className="shelf-cover-wrap" style={wrapStyle}>
      <motion.div
        layoutId={`book-${book.slug}`}
        className="shelf-cover"
        // Hide the currently open book instead of unmounting it to make 
        // animating between open and closed version possible
        style={{ visibility: hidden ? 'hidden' : 'visible' }}
        onClick={() => onSelect(book.slug)}
        // This div acts like a button. Using a div instead of a <button>
        // for ease of animation and styling
        role="button"
        tabIndex={0}
        aria-label="Open book"
        onKeyDown={(e) => e.key === 'Enter' && onSelect(book.slug)}
        data-cursor="open"
      >
        <img src={book.cover} alt="" loading="lazy" className="h-full w-full object-cover" />
      </motion.div>
    </div>
  )
}
