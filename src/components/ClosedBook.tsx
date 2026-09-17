// Component for a single closed 3D book volume on the shelf
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
  const wrapStyle: CSSVarStyle = {'--accent': book.accentColor }

  const decorativeStyle = { opacity: hidden ? 0 : 1 }

  return (
    <div className="shelf-cover-wrap" style={wrapStyle}>
      <div
        className="book-volume"
        onClick={() => onSelect(book.slug)}
        role="button"
        tabIndex={0}
        aria-label={`Open ${book.title}`}
        onKeyDown={(e) => e.key === 'Enter' && onSelect(book.slug)}
        data-cursor="open"
      >
        {/* Front cover: pushed toward the viewer on a plain wrapper —
            the motion.div inside carries no transform of its own. */}
        <div className="book-face-front">
          <motion.div
            layoutId={`book-${book.slug}`}
            className="book-cover-plane"
            style={{ visibility: hidden ? 'hidden' : 'visible' }}
          >
            <img src={book.cover} alt="" loading="lazy" className="h-full w-full object-cover" />
          </motion.div>
        </div>

        <div className="book-face-spine" style={decorativeStyle} />
        <div className="book-face-pages" style={decorativeStyle} />
        <div className="book-face-top" style={decorativeStyle} />
      </div>
    </div>
  )
}