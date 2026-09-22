// Type definitions for the data

export type BlockSize = 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'full'
export type HorizontalPosition = 'left' | 'center' | 'right'
export type VerticalPosition = 'top' | 'center' | 'bottom'

interface Position {
  horizontal?: HorizontalPosition
  vertical?: VerticalPosition
}

interface BaseBlock {
  size: BlockSize
  position?: Position
  justify?: Position
}

export interface ImageBlock extends BaseBlock {
  type: 'image'
  src: string
  alt: string
}

export interface TextBlock extends BaseBlock {
  type: 'text'
  textColor?: string
  heading?: string
  body: string | string[]
}

export type PageBlock = ImageBlock | TextBlock

export interface Page {
  backgroundColor: string
  blocks: PageBlock[]
}

interface Cover {
  src: string
  alt: string
  textColor: string
}

export interface Book {
  slug: string
  cover: Cover
  accentColor: string
  title: string
  year?: string
  description: string
  pages: Page[]
}

export interface Shelf {
  id: string
  books: Book[]
}

export const createBook = (book: Book): Book => book