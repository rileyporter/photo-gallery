
// Top level routing component wrapping the list of shelves, the optionally
// open BookReader for a current book and the necessary animation hooks

import { LayoutGroup, AnimatePresence } from 'motion/react'
import { useState, useCallback } from 'react'
import Shelf from './components/Shelf.tsx'
import OpenBook from './components/OpenBook.tsx'
import Cursor from './components/Cursor.tsx'
import { shelves } from './data/library.ts'

const booksBySlug = new Map(
  shelves.flatMap((shelf) => shelf.books.map((book) => [book.slug, book]))
);

export default function App() {

  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const [activeFlightSlug, setActiveFlightSlug] = useState<string | null>(null)
  const openBook = openSlug ? booksBySlug.get(openSlug) ?? null : null

  const handleSelect = useCallback((slug: string) => {
    setOpenSlug(slug)
    setActiveFlightSlug(slug)
    window.dispatchEvent(new Event('cursor:recheck'))
  }, [])

  const handleClose = useCallback(() => {
    setOpenSlug(null)
    window.dispatchEvent(new Event('cursor:recheck'))
  }, [])

  const handleExitComplete = useCallback(() => {
    setActiveFlightSlug(null)
  }, [])

  return (
    // LayoutGroup groups together the matching pair of ClosedBook
    // and OpenBook components with layoutId, so that React Motion can
    // compute bounding box sizes and animate between them
    <LayoutGroup>
      <div className={`gallery-stage min-h-screen bg-bg text-ink ${openSlug ? 'gallery-dimmed' : ''}`}>
        <header className="flex items-center gap-2 px-6 py-8 md:px-10">
          <div className="header-icon h-10 w-10">
            <img src="/favicon.svg" alt="A stylized daisy icon" />
          </div>
          <p className="font-display text-xl text-ink">DAISY Gallery</p>
        </header>

        <main className="flex flex-col gap-20 pb-24">
          {shelves.map((shelf) => (
            <Shelf
              key={shelf.id}
              books={shelf.books}
              onSelect={handleSelect}
              openSlug={activeFlightSlug}
            />
          ))}
        </main>
      </div>

      {/* AnimatePresence retains OpenBook in the DOM during its exit variants */}
      <AnimatePresence onExitComplete={handleExitComplete} presenceAffectsLayout={false} mode="sync">
        {openBook && (
          <OpenBook
            key={openBook.slug}
            book={openBook}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>

      {/* Cursor manages all window-level mouse listeners. Mounted inside LayoutGroup component
          for convenience as that is the current overall root for the app. */}
      <Cursor />
    </LayoutGroup>
  )
}
