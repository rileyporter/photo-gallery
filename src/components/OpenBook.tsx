// Overlay component to render the open book for a selected book:
// Uses a simultaneous 3D cover flip + spatial spring movement for instant feedback.

import { motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import BookProgress from './BookProgress.tsx'
import PageContent from './PageContent.tsx'
import { useTransition, MODAL_SHELL_VARIANTS, useCoverFlipVariants} from '../constants/animations'
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

  const [pageIndex, setPageIndex] = useState(0)
  const [turn, setTurn] = useState<Turn | null>(null)
  const totalPages = book.pages.length

  const isFirstPage = pageIndex === 0
  const isLastPage = pageIndex === totalPages - 1

  // Left panel thickness grows with read progress
  const readProgressPercent = totalPages > 1 && pageIndex > 0 ? (pageIndex + 1) / totalPages : 0
  const leftStackPercent = Math.max(10, 100 * readProgressPercent)

  const goTo = useCallback(
    (target: number, direction: Direction) => {
      if (turn || target < 0 || target >= totalPages) return
      setTurn({ from: pageIndex, direction })
      setPageIndex(target)
    },
    [turn, totalPages, pageIndex]
  )

  const handleSeek = useCallback(
    (target: number) => {
      if (target === pageIndex) return
      goTo(target, target > pageIndex ? 'right' : 'left')
    },
    [pageIndex, goTo]
  )

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' && !isLastPage) goTo(pageIndex + 1, 'right')
      if (e.key === 'ArrowLeft' && !isFirstPage) goTo(pageIndex - 1, 'left')
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [pageIndex, isFirstPage, isLastPage, goTo, onClose])

  useEffect(() => {
    window.dispatchEvent(new Event('cursor:recheck'))
  }, [pageIndex])

  // Current pages
  const baseIndex = turn?.direction === 'left' ? turn.from : pageIndex
  const basePage = book.pages[baseIndex]
  const turningIndex = turn ? (turn.direction === 'left' ? pageIndex : turn.from) : null
  const turningPage = turningIndex !== null ? book.pages[turningIndex] : null

  const turnFrom = turn?.direction === 'left' ? -100 : 0
  const turnTo = turn?.direction === 'left' ? 0 : -100

  const coverVariants = useCoverFlipVariants()
  const pageTurnTransition = useTransition('pageTurn')
  const bookZoomTransition = useTransition('bookZoom')

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
      transition={bookZoomTransition}
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

      {/* Main stage wrapper */}
      <div className="flex flex-col items-center" data-cursor="none">
        <motion.div
          layoutId={`book-volume-${book.slug}`}
          className="book-object relative preserve-3d"
          transition={bookZoomTransition}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Panel Decorative Stand-in */}
          <div className="book-left-panel">
            <div className="book-left-panel-page-stack" style={{ width: `${leftStackPercent}%` }} />
          </div>

          <div className="book-open-spine" />

          {/* Right Panel / Open Page Stack */}
          <div className="book-right-panel relative">
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

            <div className="page-stack">
              <section className="reader-page-flat" style={{ backgroundColor: basePage.backgroundColor }}>
                <PageContent page={basePage} accentColor={book.accentColor} />
              </section>

              {turn && turningPage && (
                <motion.section
                  key={`${turningIndex}-${turn.direction}`}
                  className="reader-page-flat page-turning absolute inset-0 z-10"
                  style={{
                    backgroundColor: turningPage.backgroundColor,
                    transformOrigin: 'left center',
                    backfaceVisibility: 'hidden',
                  }}
                  initial={{ rotateY: turnFrom }}
                  animate={{ rotateY: turnTo }}
                  transition={pageTurnTransition}
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

          {/* 
            Simultaneous Cover Flip:
            Rotates -180deg from right to left concurrently as the book flies onto the stage.
          */}
          <motion.div
            className="book-cover-flipper absolute inset-0 z-30 pointer-events-none"
            style={{
              transformOrigin: 'left center',
              backfaceVisibility: 'hidden',
            }}
            variants={coverVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="book-cover-top h-full w-full">
              <div className="book-cover-content">
                <div className="book-cover-image flex min-h-0 min-w-0">
                  <img
                    src={book.cover.src}
                    alt={book.cover.alt}
                    className="max-h-full max-w-full h-auto w-auto"
                  />
                </div>
                <div className="book-cover-title" style={{ color: book.cover.textColor }}>
                  <p>{book.title}</p>
                  <p>{book.year}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Progress Navigation */}
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