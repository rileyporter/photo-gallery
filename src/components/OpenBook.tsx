// Overlay component to render the open book for a selected book: a
// dimmed fullscreen stage holding a smaller, book-shaped object at its
// center. One page is visible at a time (the right, flat panel); the
// left panel is a decorative, near-perpendicular stand-in for the
// already-read pages.

import { motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import BookProgress from './BookProgress.tsx'
import PageContent from './PageContent.tsx'
import { BOOK_SPRING_TRANSITION, MODAL_SHELL_VARIANTS } from '../constants/animations'
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

const CLOSE_TRANSITION = { type: 'spring', duration: 0.4, bounce: 0 } as const

export default function OpenBook({ book, onClose, onExited }: OpenBookProps) {
  const shellStyle: CSSVarStyle = { '--book-accent': book.accentColor }
  const reduceMotion = useReducedMotion()

  const [pageIndex, setPageIndex] = useState(0)
  const [turn, setTurn] = useState<Turn | null>(null)
  const totalPages = book.pages.length

  const isFirstPage = pageIndex === 0
  const isLastPage = pageIndex === totalPages - 1

  // Left panel thickness grows with how far into the book we are
  const readProgressPercent = totalPages > 1 && pageIndex > 0 ? (pageIndex + 1) / totalPages : 0
  const leftStackPercent = Math.max(10, 100 * readProgressPercent)

  // Jump to a target page
  const goTo = useCallback(
    (target: number, direction: Direction) => {
      if (turn || target < 0 || target >= totalPages) return
      setTurn({ from: pageIndex, direction })
      setPageIndex(target)
    },
    [turn, totalPages, pageIndex]
  )

  // Used to handle users using a progress bar to jump around the open book
  const handleSeek = useCallback(
    (target: number) => {
      if (target === pageIndex) return
      goTo(target, target > pageIndex ? 'right' : 'left')
    },
    [pageIndex, goTo]
  )

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
  }, [pageIndex, isFirstPage, isLastPage, goTo, onClose])

  // Handle propagating custom event for updating the cursor, e.g. pageIndex reaching end of book
  useEffect(() => {
    window.dispatchEvent(new Event('cursor:recheck'))
  }, [pageIndex])

  // Current pages we're looking at and animating to/from
  const baseIndex = turn?.direction === 'left' ? turn.from : pageIndex
  const basePage = book.pages[baseIndex]
  const turningIndex = turn ? (turn.direction === 'left' ? pageIndex : turn.from) : null
  const turningPage = turningIndex !== null ? book.pages[turningIndex] : null

  // Pivot and rotation bounds for page flips
  const turnFrom = turn?.direction === 'left' ? -100 : 0
  const turnTo = turn?.direction === 'left' ? 0 : -100

  return (
    <motion.div
      className="reader-shell fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-bg/95"
      style={shellStyle}
      variants={MODAL_SHELL_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
      onAnimationComplete={(definition) => {
        if (definition === 'exit') onExited()
      }}
      transition={CLOSE_TRANSITION}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      data-cursor="close"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close book"
        className="reader-close absolute right-6 top-6 z-10 font-sans text-xl hover:text-accent text-[color:var(--book-accent)]"
        data-cursor="close-button"
      >
        ✕
      </button>

      {/* Open book shaped shell and navigation */}
      <div className="flex flex-col items-center" data-cursor="none">
        <div className="book-object" onClick={(e) => e.stopPropagation()} >
          <div className="book-left-panel">
            <div className="book-left-panel-page-stack" style={{ width: `${leftStackPercent}%` }} />
          </div>
          <div className="book-open-spine" />

          <div className="book-right-panel">
            <button
              type="button"
              className="page-nav-zone page-nav-left"
              onClick={() => goTo(pageIndex - 1, 'left')}
              aria-label="Previous page"
              disabled={isFirstPage}
              data-cursor={isFirstPage ? undefined : 'prev'}
              data-cursor-color={book.accentColor}
            />
            <button
              type="button"
              className="page-nav-zone page-nav-right"
              onClick={() => goTo(pageIndex + 1, 'right')}
              aria-label="Next page"
              disabled={isLastPage}
              data-cursor={isLastPage ? undefined : 'next'}
              data-cursor-color={book.accentColor}
            />

            {/* Pages and turning animation */}
            <div className="page-stack">
              <motion.section
                layoutId={`book-${book.slug}`}
                transition={BOOK_SPRING_TRANSITION}
                className="reader-page-flat"
                style={{ backgroundColor: basePage.backgroundColor }}
              >
                <PageContent page={basePage} accentColor={book.accentColor} />
              </motion.section>

              {turn && turningPage && (
                <motion.section
                  key={`${turningIndex}-${turn.direction}`}
                  className="reader-page-flat page-turning"
                  style={{
                    backgroundColor: turningPage.backgroundColor,
                    transformOrigin: 'left center',
                  }}
                  initial={{ rotateY: reduceMotion ? turnTo : turnFrom }}
                  animate={{ rotateY: turnTo }}
                  transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.45, 0, 0.2, 1] }}
                  onAnimationComplete={() => setTurn(null)}
                >
                  <PageContent page={turningPage} accentColor={book.accentColor} />
                  <div
                    className="page-turn-shade absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        turn.direction === 'right'
                          ? 'linear-gradient(to right, transparent 55%, rgba(0,0,0,0.4))'
                          : 'linear-gradient(to left, transparent 55%, rgba(0,0,0,0.4))',
                    }}
                  />
                </motion.section>
              )}
            </div>
          </div>
        </div>

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