import type { Book } from '../data/library.ts'
import ClosedBook from './ClosedBook.tsx'

interface ShelfProps {
  books: Book[]
  onSelect: (slug: string) => void
  openSlug: string | null
}

export default function Shelf({ books, onSelect, openSlug }: ShelfProps) {
  return (
    <div className="shelf-row">
      <div className="shelf-books">
        {books.map((book) => (
          <ClosedBook
            key={book.slug}
            book={book}
            onSelect={onSelect}
            // hide the shelf version of the book currently open
            hidden={openSlug === book.slug}
          />
        ))}
      </div>
      <div className="shelf-ledge" />
    </div>
  )
}
