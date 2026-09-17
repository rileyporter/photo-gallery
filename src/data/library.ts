// ---------------------------------------------------------------------
// Library of Photo Books - all current data
// ---------------------------------------------------------------------
//
// STRUCTURE
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
  heading?: string
  body: string | string[]
}

export type PageBlock = ImageBlock | TextBlock

export interface Page {
  backgroundColor: string
  textColor?: string
  blocks: PageBlock[]
}

export interface Book {
  slug: string
  cover: string
  accentColor: string
  title: string
  description: string
  pages: Page[]
}

export interface Shelf {
  id: string
  books: Book[]
}

const createBook = (book: Book): Book => book;

export const shelves: Shelf[] = [
  {
    id: 'shelf-1',
    books: [
      createBook({
        slug: 'japan-and-korea',
        cover: '/photos/japan-korea/DSC00002.JPG',
        accentColor: '#19807c',
        title: 'Japan and South Korea',
        description: 'Trip to Japan and South Korea 2024',
        pages: [
          {
            backgroundColor: '#EDE7DA',
            blocks: [
              { 
                type: 'image',
                size: 'full',
                src: '/photos/japan-korea/DSC00041.JPG',
                alt: '' 
              }
            ],
          },
          {
            backgroundColor: '#EDE7DA',
            textColor: '#14130F',
            blocks: [
              {
                type: 'text',
                size: 'small',
                heading: 'Trip Overview',
                body: [
                  'First, Japan for 3 weeks',
                  'Then, South Korea for a month. To Seoul and back again.',
                ],
              },
           ],
          },
          {
            backgroundColor: '#171614',
            blocks: [
              { type: 'image', size: 'medium', src: '/photos/japan-korea/DSC00044.JPG', alt: '' },
              { type: 'image', size: 'medium', src: '/photos/japan-korea/DSC00078.JPG', alt: '' },
              { type: 'text', size: 'large', body: 'Two more shots of Jeju' },
            ],
          },
          {
            backgroundColor: '#0E0D0B',
            blocks: [
              { type: 'image', size: 'large', src: '/photos/japan-korea/DSC00401.JPG', alt: '' }
            ],
          },
          {
            backgroundColor: '#171614',
            blocks: [
              { type: 'image', size: 'large', src: '/photos/japan-korea/DSC00317.JPG', alt: '' },
              { type: 'text', size: 'medium', body: 'Ambulance near Udo' },
            ],
          },
        ],
      }),

      createBook({
        slug: 'san-juans',
        cover: '/photos/san-juans/DSC07547.JPG',
        accentColor: '#48bbfd',
        title: 'San Juans',
        description: 'Sailing with friends and seeing ferries in the san juans',
        pages: [
          {
            backgroundColor: '#1B2420',
            blocks: [
              { type: 'image', size: 'full', src: '/photos/san-juans/DSC07383.JPG', alt: '' },
            ],
          },
          {
            backgroundColor: '#EDE7DA',
            textColor: '#14130F',
            blocks: [
              { type: 'text', size: 'large', body: 'boats and water as far as can be seen' },
              { type: 'image', size: 'medium', src: '/photos/san-juans/DSC07501.JPG', alt: '' },
              { type: 'image', size: 'medium', src: '/photos/san-juans/DSC07567.JPG', alt: '' },
            ],
          },
        ],
      }),
    ],
  },

  {
    id: 'shelf-2',
    books: [
      createBook({
        slug: 'taiwan',
        cover: '/photos/taiwan/DSC08597.JPG',
        accentColor: '#0a8a2a',
        title: 'Taiwain',
        description: 'Exploring Formosa with friends',
        pages: [
          {
            backgroundColor: '#EDE7DA',
            textColor: '#791e62',
            blocks: [
              { 
                type: 'image',
                size: 'medium',
                justify: {vertical: 'bottom'},
                src: '/photos/taiwan/DSC09768.JPG',
                alt: '1 - taroko dark'
              },
              { 
                type: 'image',
                size: 'xl',
                src: '/photos/taiwan/DSC08516.JPG',
                alt: '2 - alishan flowers',
                // justify: {vertical: 'bottom' }
              },
              { 
                type: 'image',
                size: 'small',
                justify: {vertical: 'top'},
                src: '/photos/taiwan/DSC09814.JPG',
                alt: '3 - taroko light'
              },
              // {
              //   type: 'text',
              //   size: 'large',
              //   body: 'La Formosa',
              //   position: { vertical: 'bottom' },
              // }
            ],
          },
          // {
          //   backgroundColor: '#EDE7DA',
          //   textColor: '#475324',
          //   blocks: [
          //     {
          //       type: 'text',
          //       size: 'full',
          //       heading: 'Alishan',
          //       body: [
          //         'The sunsrise at Alishan.',
          //         'Incredible views',
          //         'Incredible moment',
          //       ],
          //     },
          //   ],
          // },
          // {
          //   backgroundColor: '#171410',
          //   blocks: [
          //     { type: 'image',
          //       size: 'full',
          //       src: '/photos/taiwan/DSC08675.JPG',
          //       alt: 'Sunrise through the grass at Alishan'
          //     },
          //   ],
          // },
          {
            backgroundColor: '#0F1416',
            blocks: [
              { type: 'image',
                size: 'xl',
                src: '/photos/taiwan/DSC09590.JPG',
                justify: {vertical: 'bottom' },
                alt: 'Top down view of rocks at Taroko Gorge'
              },
              { 
                type: 'text',
                size: 'small',
                position: { vertical: 'bottom'},
                justify: {horizontal: 'right' },
                body: 'Rocks with water at Taroko Gorge'
              },
            ],
          },
          {
            backgroundColor: '#EDE7DA',
            textColor: '#23a2b0',
            blocks: [
              { 
                type: 'image',
                size: 'full',
                src: '/photos/japan-korea/DSC00041.JPG',
                alt: '' 
              },
              {
                type: 'text',
                size: 'small',
                position: { vertical: 'bottom' },
                body: 'cozy Jeju cafes'
              }
            ],
          },
          {
            backgroundColor: '#171614',
            blocks: [
              { 
                type: 'image',
                size: 'medium',
                /*position: { horizontal: 'left' },*/
                src: '/photos/taiwan/DSC09768.JPG',
                alt: 'Sharp clifs in Taroko Gorge'
              },
              { 
                type: 'image',
                size: 'medium',
                /*position: { horizontal: 'right' },*/
                src: '/photos/taiwan/DSC09814.JPG',
                alt: 'Sunlight through Taroko Gorge'
              },
            ],
          },
        ],
      }),
    ],
  },
];
