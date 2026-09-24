// Overlay component to render the open book for a selected book:
// Uses a simultaneous 3D cover flip + spatial spring movement for instant feedback.

import { motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import BookProgress from './BookProgress.tsx'
import PageContent from './PageContent.tsx'
import {
  usePageFlipTransition,
  useModalShellVariants,
  useBookZoomVariants,
  useCoverFlipVariants
} from '../constants/animations'
import type { Book } from '../data/library.ts'
import type { CSSVarStyle } from '../types/css.ts'

interface OpenBookProps {
  book: Book
  onClose: () => void
}

type Direction = 'left' | 'right'

interface Turn {
  from: number
  direction: Direction
}

export default function OpenBook({ book, onClose }: OpenBookProps) {
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
  const modalShellVariants = useModalShellVariants()
  const pageFlipTransition = usePageFlipTransition()
  const bookZoomVariants = useBookZoomVariants()

/*
[reader-shell]  <-- 1. AnimatePresence host
   │
   └── [reader-backdrop] Backdrop overlay  
   │
   └── [close button]
   |
   └── [div flex flex-col items-center]  <-- 2. Layout Container, necessary for flex rules
          │
          ├── [motion.div book-object layoutId={}]  <-- 3. Pure 2D Bounding Box for Motion
          │      │
          │      └── [book-3d-open]  <-- 4. 3D elements for animations (Book covers, page flipper)
          |             │
          |             ├── [book-left-panel]
          |             ├── [book-right-panel]
          |             └── [motion.div book-cover-flipper]  <-- Cover flip animation
          |                     │
          |                     ├── [book-cover-top]
          |                     └── [book-cover-inside]
          │
          └── [BookProgress]  <-- 5. Independent UI Control (outside book bounding box for Motion)
*/

  return (
    // Overall open book reader shell and AnimatePresence host
    <div className="reader-shell fixed inset-0 z-50 flex items-center justify-center overflow-hidden">

      {/* Backdrop overlay */}
      <motion.div
        className="reader-backdrop absolute inset-0 bg-bg/95"
        style={shellStyle}
        variants={modalShellVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        // should also have a transition?
        onClick={(e) => e.target === e.currentTarget && onClose()}
        data-cursor="close"
      />

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

      {/* Layout container for establishing flex layout and progress bar outside of book */}
      <div className="flex flex-col items-center" data-cursor="none">

        {/* 2D bounding box used by Motion transformation when animating book open and closed */}
        <motion.div
          layoutId={`book-volume-${book.slug}`}
          layout
          variants={bookZoomVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="book-object"
          onClick={(e) => e.stopPropagation()}
        >

          {/* 3D book object that contains any 3D animations */}
          <div className="book-3d-open flex preserve-3d relative h-full w-full">

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
                    transition={pageFlipTransition}
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

            {/* Cover flipper */}
            <motion.div
              className="book-cover-flipper absolute inset-0 z-30 pointer-events-none"
              variants={coverVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              // transition={bookZoomTransition}
            >
              <div className="book-cover-top absolute inset-0" >
                <div className="book-cover-content">
                  <img
                    src={book.cover.src}
                    alt={book.cover.alt}
                    className="max-h-full max-w-full h-auto w-auto"
                  />

                  <div className="book-cover-title" style={{ color: book.cover.textColor }}>
                    <p>{book.title}</p>
                    <p>{book.year}</p>
                  </div>
                </div>
              </div>

              {/* Inside Cover Backface */}
              <div className="book-cover-inside absolute inset-0 bg-paper" />
            </motion.div>
          </div>
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
    </div>
  )
}