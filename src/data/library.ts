// ---------------------------------------------------------------------
// Library of Photo Books - loads in all book data from their files and
// surfaces it for the App
// ---------------------------------------------------------------------
//
// DATA STRUCTURE
//   shelves
//     shelf.books
//       book.slug        -> unique book id, used as the React key and as the
//                           shared `layoutId`
//       book.cover
//       book.accentColor
//       book.title
//       book.description
//       book.pages
//        page.backgroundColor
//        page.textColor?
//        page.blocks
//          block.type    -> 'image' | 'text'
//          block.size
//
// ---------------------------------------------------------------------

export * from './types.ts'

import type { Shelf } from './types.ts'
import { koreaBook } from './books/korea-2024.ts'
import { sanJuansBook } from './books/san-juans.ts'
import { taiwanBook } from './books/taiwan.ts'
import { testBook } from './books/test-book.ts'

export const shelves: Shelf[] = [
  {
    id: 'shelf-1',
    books: [koreaBook, sanJuansBook],
  },
  {
    id: 'shelf-2',
    books: [taiwanBook, testBook],
  },
]