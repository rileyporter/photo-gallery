// Component for a single closed 3D book volume on the shelf
import { motion } from 'motion/react'
import { BOOK_SPRING_TRANSITION } from '../constants/animations'
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
  }

  return (
    <div className="book-volume-wrap" style={wrapStyle}>
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
        {/* CSS 3D solid stays intact — hover rotateX/rotateY rules work automatically */}
        <div className="book-volume">
          {/* Front cover face */}
          <div className="book-face-front">
            <motion.div
              layoutId={`book-${book.slug}`}
              className="book-cover-top"
              transition={BOOK_SPRING_TRANSITION}
              style={{
                // Prevent front cover from disappearing instantly while closing
                visibility: 'visible',
              }}
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
                <div className="book-cover-title" style={{ color: book.cover.textColor }}>
                  <p>{book.title}</p>
                  <p>{book.year}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 3D Spine and Page depth elements — fade cleanly during pickup/close */}
          <motion.div
            style={{
              transformStyle: 'preserve-3d',
              position: 'absolute',
              inset: 0,
            }}
            initial={false}
            animate={{
              visibility: hidden ? 'hidden' : 'visible',
              scaleZ: hidden ? 0 : 1,
            }}
            transition={BOOK_SPRING_TRANSITION}
          >
            <div className="book-closed-spine">
              <div className="book-spine-edge" />
              <div className="book-spine-front" />
              <div className="book-spine-bottom" />
            </div>
            <div className="book-right-pages" />
            <div className="book-bottom-pages" />
            <div className="book-cover-bottom" />
          </motion.div>
            
{/* 
          <motion.div
            className="book-closed-spine"
            initial={false}
            animate={{ opacity: hidden ? 0 : 1 }}
            transition={BOOK_SPRING_TRANSITION}
          >
            <div className="book-spine-edge" />
            <div className="book-spine-front" />
            <div className="book-spine-bottom" />
          </motion.div>

          <motion.div
            className="book-right-pages"
            initial={false}
            animate={{ opacity: hidden ? 0 : 1 }}
            transition={BOOK_SPRING_TRANSITION}
          />
          <motion.div
            className="book-bottom-pages"
            initial={false}
            animate={{ opacity: hidden ? 0 : 1 }}
            transition={BOOK_SPRING_TRANSITION}
          />
          <motion.div
            className="book-cover-bottom"
            initial={false}
            animate={{ opacity: hidden ? 0 : 1 }}
            transition={BOOK_SPRING_TRANSITION}
          /> */}
        </div>
      </div>
    </div>
  )
}