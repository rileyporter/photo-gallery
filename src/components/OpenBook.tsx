// Overlay component to render the open book for a selected book: a
// dimmed fullscreen stage holding a smaller, book-shaped object at its
// center. One page is visible at a time (the right, flat panel); the
// left panel is a decorative, near-perpendicular stand-in for the
// already-read pages.

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import BookProgress from './BookProgress.tsx'
import PageContent from './PageContent.tsx'
import type { Book } from '../data/library.ts'
import type { CSSVarStyle } from '../types/css.ts'

interface OpenBookProps {
  book: Book
  onClose: () => void
  onExited: () => void
}

type Direction = 'left' | 'right'

interface Turn {
  from: number
  direction: Direction
}

export default function OpenBook({ book, onClose, onExited }: OpenBookProps) {
  const shellStyle: CSSVarStyle = { '--book-accent': book.accentColor }
  const reduceMotion = useReducedMotion()

  const [pageIndex, setPageIndex] = useState(0)
  const [turn, setTurn] = useState<Turn | null>(null)
  const totalPages = book.pages.length


  // Left panel thickness grows with how far into the book we are
  const readProgressPercent = totalPages > 1 && pageIndex > 0 ? (pageIndex + 1) / totalPages : 0
  const leftStackPercent = Math.max(10, 100 * readProgressPercent)

  // Jump to a target page
  function goTo(target: number, direction: Direction) {
    if (turn || target < 0 || target >= totalPages) return
    setTurn({ from: pageIndex, direction })
    setPageIndex(target)
  }

  // Used to handle users using a progress bar to jump around the open book
  function handleSeek(target: number) {
    if (target === pageIndex) return
    goTo(target, target > pageIndex ? 'right' : 'left')
  }

  // Handle key events:
  // Arrow keys as the accessible nav fallback with Escape key to close
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' && !isLastPage) goTo(pageIndex + 1, 'right')
      if (e.key === 'ArrowLeft' && !isFirstPage) goTo(pageIndex - 1, 'left')
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [pageIndex, turn, totalPages])

  // Handle propagating custom event for updating the cursor, e.g. pageIndex reaching end of book
  useEffect(() => {
    window.dispatchEvent(new Event('cursor:recheck'))
  }, [pageIndex])

  const isFirstPage = pageIndex === 0
  const isLastPage = pageIndex === totalPages - 1

  // Current pages we're looking at and animating to/from
  //    - basePage for the open page on the right side of the book
  //    - turningPage for the animating page, either animating away or coming in, 
  //    depending on direction we're moving in the book.
  const baseIndex = turn?.direction === 'left' ? turn.from : pageIndex
  const basePage = book.pages[baseIndex]
  const turningIndex = turn ? (turn.direction === 'left' ? pageIndex : turn.from) : null
  const turningPage = turningIndex !== null ? book.pages[turningIndex] : null
  
  // Same pivot, same rotation range, both directions — backward just
  // traverses it in reverse (starts rotated away, ends flat) rather than
  // using a different edge.
  const turnFrom = turn?.direction === 'left' ? -100 : 0
  const turnTo = -100 + (turn?.direction === 'left' ? 100 : 0) // -100 for forward, 0 for backward
  
  return (
    <motion.div
      layoutId={undefined}
      className="reader-shell fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-bg/95"
      style={shellStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={(definition) => {
        // Fires whenever the animation is complete, both for opening and closing
        // When closing, triggers the onExited handler
        if (definition === 'exit') onExited()
      }}
      transition={{ duration: 0.2 }}
      // Click-outside-to-close; only fires on the backdrop itself, not
      // clicks bubbling up from the book
      onClick={(e) => e.target === e.currentTarget && onClose()}
      data-cursor="close"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close book"
        className={`reader-close absolute right-6 top-6 z-10
          font-sans text-xl hover:text-accent text-[color:var(--book-accent)]`}
        data-cursor="close-button"
      >
        X
      </button>
      
      {/* Open book shaped shell and navigation */}
      <div
        className="flex flex-col items-center"
        data-cursor="none"
      >
        <motion.div
          // Same layoutId as ClosedBook, for motion to animate the closed book to a book shaped shell
          layoutId={`book-${book.slug}`}
          className="book-object"
          transition={{ type: 'spring', stiffness: 260, damping: 32 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="book-left-panel">
            <div className="book-left-panel-page-stack" style={{ width: `${leftStackPercent}%`}} />
          </div>
          <div className="book-open-spine" />

          <div className="book-right-panel">
            <button
              className="page-nav-zone page-nav-left"
              onClick={() => goTo(pageIndex - 1, 'left')}
              aria-label="Previous page"
              disabled={isFirstPage}
              data-cursor={isFirstPage ? undefined: "prev"}
              data-cursor-color={book.accentColor}
            />
            <button
              className="page-nav-zone page-nav-right"
              onClick={() => goTo(pageIndex + 1, 'right')}
              aria-label="Next page"
              disabled={isLastPage}
              data-cursor={isLastPage ? undefined : "next"}
              data-cursor-color={book.accentColor}
            />

            {/* Pages and turning animation */}
            <div className="page-stack">
              <section className="reader-page-flat" style={{ backgroundColor: basePage.backgroundColor }}>
                <PageContent page={basePage} accentColor={book.accentColor} />
              </section>

              {turn && turningPage && (
                <motion.section
                  key={`${turningIndex}-${turn.direction}`}
                  className="reader-page-flat page-turning"
                  style={{ backgroundColor: turningPage.backgroundColor, transformOrigin: 'left center' }}
                  initial={{ rotateY: reduceMotion ? turnTo : turnFrom }}
                  animate={{ rotateY: turnTo }}
                  transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.45, 0, 0.2, 1] }}
                  onAnimationComplete={() => setTurn(null)}
                >
                  <PageContent page={turningPage} accentColor={book.accentColor} />
                  <div
                    className="page-turn-shade"
                    style={{
                      background:
                        turn?.direction === 'right'
                          ? 'linear-gradient(to right, transparent 55%, rgba(0,0,0,0.4))'
                          : 'linear-gradient(to left, transparent 55%, rgba(0,0,0,0.4))',
                    }}
                  />
                </motion.section>
              )}
            </div>
          </div>
        </motion.div>

        {/* Progress bar to jump around book */}
        <BookProgress
          className="mt-8 mb-6 z-10"
          currentPage={pageIndex}
          totalPages={totalPages}
          accentColor={book.accentColor}
          onSeek={handleSeek}
        />
      </div>
    </motion.div>
  )
}