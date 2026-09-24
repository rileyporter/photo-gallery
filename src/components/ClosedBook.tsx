// Component for a single closed 3D book volume on the shelf
import { motion } from 'motion/react'
import { useBookZoomVariants } from '../constants/animations'
import type { Book } from '../data/library.ts'
import type { CSSVarStyle } from '../types/css.ts'

interface ClosedBookProps {
  book: Book
  onSelect: (slug: string) => void
  hidden: boolean
}

export default function ClosedBook({ book, onSelect, hidden }: ClosedBookProps) {
  const hitAreaStyle: CSSVarStyle = {
    '--book-accent': book.accentColor,
    '--book-length': book.pages.length,
    // visibility: hidden ? 'hidden' : 'visible',
    opacity: hidden ? 0 : 1,
    pointerEvents: hidden ? 'none' : 'auto',

  }

  const bookZoomVariants = useBookZoomVariants()

/*
[book-hit-area]  <-- 1. Captures mouse hovers & clicks
   │
   └── [motion.div book-volume layoutId={}]  <-- 2. Pure 2D Bounding Box (Motion spatial flight only)
          │
          └── [book-3d-closed]  <-- 3. CSS 3D Hover Transforms & preserve-3d
                 │
                 ├── [book-face-front]
                 ├── [book-closed-spine]
                 └── [book-right-pages]
*/


  return (
    // Static anchor and interactive target
    //    - holds CSS variables, opacity, and layout coordinates
    //    - sets perspective for 3D children
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
      style={hitAreaStyle}
      data-cursor="open"
    >
      {/* Spatial container used by Motion to handle 2D spatial layout projection when animating */}
      <motion.div 
        className="book-volume"
        layoutId={`book-volume-${book.slug}`}
        layout
        variants={bookZoomVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Element used for 3D transformations in CSS, e.g. on hover */}
        <div className="book-3d-closed preserve-3d h-full w-full" >
          {/* Front cover face */}
          <div className="book-face-front">
            <div className="book-cover-top">
              <div className="book-cover-content">
                <img
                  src={book.cover.src}
                  alt={book.cover.alt}
                  loading="lazy"
                  className="max-h-full max-w-full h-auto w-auto"
                />

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
        </div>
      </motion.div>
    </div>
  )
}