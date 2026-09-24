// Component for a single closed 3D book volume on the shelf
import { motion } from 'motion/react'
import { useTransition } from '../constants/animations'
import type { Book } from '../data/library.ts'
import type { CSSVarStyle } from '../types/css.ts'

interface ClosedBookProps {
  book: Book
  onSelect: (slug: string) => void
  hidden: boolean
}

export default function ClosedBook({ book, onSelect, hidden }: ClosedBookProps) {
  const wrapStyle: CSSVarStyle = {
    '--book-accent': book.accentColor,
    '--book-length': book.pages.length,
    // visibility: hidden ? 'hidden' : 'visible',

  }

  const bookZoomTransition = useTransition('bookZoom')

  return (
    <div
      className="book-volume-wrap"
      style={{
        ...wrapStyle,
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? 'none' : 'auto',
      }}
    >
      <div
        className="book-hit-area"
        onClick={() => onSelect(book.slug)}
        role="button"
        tabIndex={0}
        aria-label={`Open ${book.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onSelect(book.slug)
          }
        }}
        data-cursor="open"
      >
        <div className="book-volume">
          <motion.div
            layoutId={`book-volume-${book.slug}`}
            className="book-volume-inner relative h-full w-full"
            transition={bookZoomTransition}
            style={{
              // Has to be set here so React motion doesn't override during layout projection
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front cover face */}
            <div className="book-face-front">
              <div className="book-cover-top">
                <div className="book-cover-content">
                  <div className="book-cover-image flex min-h-0 min-w-0">
                    <img
                      src={book.cover.src}
                      alt={book.cover.alt}
                      loading="lazy"
                      className="max-h-full max-w-full h-auto w-auto"
                    />
                  </div>
                  <div className="book-cover-title" style={{ color: book.cover.textColor }}>
                    <p>{book.title}</p>
                    <p>{book.year}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Spine and Pages depth elements */}
            <div className="book-closed-spine">
              <div className="book-spine-edge" />
              <div className="book-spine-front" />
              <div className="book-spine-bottom" />
            </div>

            <div className="book-right-pages" />
            <div className="book-bottom-pages" />
            <div className="book-cover-bottom" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}