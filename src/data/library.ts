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

const createBook = (book: Book): Book => book;

/* Page Template

          // Page Name
          {
            backgroundColor: '#f7f1e5',
            blocks: [

           ],
          },
*/

/* Image Block Template
              { 
                type: 'image',
                size: 'full',
                src: '/photos/name',
                alt: '' 
              }
*/

/* Text Block Template
              {
                type: 'text',
                textColor: '#383632',
                size: 'small',
                heading: 'Sample heading',
                body: 'Sample text'
              },
*/


export const shelves: Shelf[] = [
  {
    id: 'shelf-1',
    books: [
      // South Korea
      createBook({
        slug: 'korea-2024',
        cover: {
          src: '/photos/korea/truck.jpg',
          alt: '',
          textColor: '#d1c73a',
        },
        accentColor: '#042972',
        title: 'South Korea',
        year: '2024',
        description: 'Trip to South Korea 2024',
        pages: [
          // Bridge hiking
          {
            backgroundColor: '#A0795B',
            blocks: [
              { 
                type: 'image',
                size: 'full',
                src: '/photos/korea/bridge.jpg',
                alt: 'A person walking across a bridge on a hike in Jeju island' 
              }
           ],
          },
          // Jeju cafes
          {
            backgroundColor: '#B7C8CB',
            blocks: [
              {
                type: 'text',
                size: 'medium',
                body: 'Jeju cafes',
                position: {vertical: 'top', horizontal: 'right'},
              },
              { 
                type: 'image',
                size: 'medium',
                src: '/photos/korea/cafe-1.jpg',
                alt: 'The view of a small harbor from a cafe in Jeju island',
                position: {vertical: 'top', horizontal: 'left'}
              },
              { 
                type: 'image',
                size: 'xl',
                src: '/photos/korea/cafe-2.jpg',
                alt: 'A cozy well lit corner of an artsy cafe in Jeju island',
                position: {vertical: 'bottom', horizontal: 'right'}
              }
            ],
          },
          // Harbor introduction page
          {
            backgroundColor: '#e4e8eb',
            blocks: [
              { 
                type: 'image',
                size: 'full',
                src: '/photos/korea/two-mountains.jpg',
                alt: 'Construction equipment and hills making two mountain shapes in Busan harbor' 
              },
              {
                type: 'text',
                size: 'large',
                body: 'Busan Harbor',
                position: {vertical: 'top'},
              },
            ],
          },
          // Harbor lighthouse and views
          {
            backgroundColor: '#D1DAE1',
            blocks: [
              { 
                type: 'image',
                size: 'large',
                src: '/photos/korea/harbor-top.jpg',
                alt: 'Red light house in Busan harbor',
                position: {vertical: 'top'}
              },
              { 
                type: 'image',
                size: 'large',
                src: '/photos/korea/harbor-bottom.jpg',
                alt: 'A misty view of apartment buildings in Busan Harbor'
              }
            ],
          },
          // Cranes
          {
            backgroundColor: '#EBE6DD',
            blocks: [
              { 
                type: 'image',
                size: 'large',
                src: '/photos/korea/3-cranes.jpg',
                alt: 'Three large cranes in Busan harbor',
                position: {vertical: 'top'}
              },
              { 
                type: 'image',
                size: 'medium',
                src: '/photos/korea/cranes-bridge.jpg',
                alt: 'Part of a bridge and many large cranes in Busan harbor'
              }
           ],
          },
          // Busan bridge
          {
            backgroundColor: '#9b866b',
            blocks: [
              { 
                type: 'image',
                size: 'full',
                src: '/photos/korea/busan-bridge.jpg',
                alt: 'Large bridge in Busan harbor at sunset' 
              }
           ],
          },
        ],
      }),

      // San Juans
      createBook({
        slug: 'san-juans',
        cover: {
          src: '/photos/san-juans/DSC07547.JPG',
          alt: '',
          textColor: '#1b29e1',
        },
        accentColor: '#48bbfd',
        title: 'San Juan Islands',
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
            blocks: [
              { type: 'text', size: 'large', body: 'boats and water as far as can be seen' },
              { type: 'image', size: 'medium', src: '/photos/san-juans/DSC07501.JPG', alt: '' },
              { type: 'image', size: 'medium', src: '/photos/san-juans/DSC07567.JPG', alt: '' },
            ],
          },
        ],
      }),
    ], 
  }, // Close Shelf 1

  {
    id: 'shelf-2',
    books: [
      // Taiwan
      createBook({
        slug: 'taiwan',
        cover: {
          src: '/photos/taiwan/DSC08597.JPG',
          alt: '',
          textColor: '#d384f3',
        },
        accentColor: '#641079',
        title: 'Taiwan',
        description: 'Exploring Formosa with friends',
        pages: [
          {
            backgroundColor: '#EDE7DA',
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
              //  textColor: '#791e62',
              //   size: 'large',
              //   body: 'La Formosa',
              //   position: { vertical: 'bottom' },
              // }
            ],
          },
          // {
          //   backgroundColor: '#EDE7DA',
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

      // Test Book
      createBook({
        slug: 'test-book',
        cover: {
          src: '/photos/test-book/DSC00002.JPG',
          alt: '',
          textColor: '#d1a43a',
        },
        accentColor: '#04723f',
        title: 'Test Book',
        year: '2026',
        description: 'Test Pages',
        pages: [
          // TODO(rileyporter): debug layout
          {
            backgroundColor: '#ACC5CC',
            blocks: [
              {
                type: 'text',
                size: 'medium',
                body: 'Jeju cafes',
                position: {vertical: 'top', horizontal: 'right'},
              },
              { 
                type: 'image',
                size: 'medium',
                src: '/photos/korea/cafe-1.jpg',
                alt: 'The view of a small harbor from a cafe in Jeju island',
                position: {vertical: 'top', horizontal: 'left'}
              },
              { 
                type: 'image',
                size: 'xl',
                src: '/photos/korea/cafe-2.jpg',
                alt: 'A cozy well lit corner of an artsy cafe in Jeju island',
                position: {vertical: 'bottom', horizontal: 'right'}
              }
            ],
          },
          {
            backgroundColor: '#EDE7DA',
            blocks: [
              { 
                type: 'image',
                size: 'full',
                src: '/photos/test-book/DSC00041.JPG',
                alt: '' 
              }
            ],
          },
          {
            backgroundColor: '#EDE7DA',
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
            backgroundColor: '#EDE7DA',
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
              //   textColor: '#791e62',
              //   size: 'large',
              //   body: 'La Formosa',
              //   position: { vertical: 'bottom' },
              // }
            ],
          },
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
                textColor: '#16d1ee',
                size: 'small',
                position: { vertical: 'bottom'},
                justify: {horizontal: 'right' },
                body: 'Rocks with water at Taroko Gorge'
              },
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
          {
            backgroundColor: '#171614',
            blocks: [
              { type: 'image', size: 'medium', src: '/photos/test-book/DSC00044.JPG', alt: '' },
              { type: 'image', size: 'medium', src: '/photos/test-book/DSC00078.JPG', alt: '' },
              { type: 'text', size: 'large', body: 'Two more shots of Jeju' },
            ],
          },
          {
            backgroundColor: '#0E0D0B',
            blocks: [
              { type: 'image', size: 'large', src: '/photos/test-book/DSC00401.JPG', alt: '' }
            ],
          },
          {
            backgroundColor: '#171614',
            blocks: [
              { type: 'image', size: 'large', src: '/photos/test-book/DSC00317.JPG', alt: '' },
              { type: 'text', size: 'medium', body: 'Ambulance near Udo' },
            ],
          },
        ],
      }),      
    ], 
  },// Close Shelf 2
];
