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
  const wrapStyle: CSSVarStyle = {'--book-accent': book.accentColor , '--book-length': book.pages.length}

  const toggleOpacity = { opacity: hidden ? 0 : 1 }

  return (
    <div className="book-volume-wrap" style={wrapStyle}>
      <div
        className="book-hit-area"
        onClick={() => onSelect(book.slug)}
        role="button"
        tabIndex={0}
        aria-label={`Open ${book.title}`}
        onKeyDown={(e) => e.key === 'Enter' && onSelect(book.slug)}
        data-cursor="open"
      >
        <div className="book-volume">
          {/* Front cover: pushed toward the viewer on a plain wrapper —
              the motion.div inside carries no transform of its own. */}
          <div className="book-face-front">
            <motion.div
              layoutId={`book-${book.slug}`}
              className="book-cover-top"
              style={{ visibility: hidden ? 'hidden' : 'visible' }}
            >
              <div className="book-cover-content">
                <div className="book-cover-image flex min-h-0 min-w-0">
                  <img
                    src={book.cover.src}
                    alt={book.cover.alt}
                    loading="lazy"
                    className="max-h-full max-w-full h-auto w-auto"
                  />
                </div>
                <p className="book-cover-title" style={{ color: book.cover.textColor }}>
                  {book.title}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="book-closed-spine" style={toggleOpacity}>
            <div className="book-spine-edge" />
            <div className="book-spine-front" />
            <div className="book-spine-bottom" />
          </div>

          <div className="book-right-pages" style={toggleOpacity} />
          <div className="book-bottom-pages" style={toggleOpacity} />
          <div className="book-cover-bottom" style={toggleOpacity} />
        </div>
      </div>
    </div>
  )
}