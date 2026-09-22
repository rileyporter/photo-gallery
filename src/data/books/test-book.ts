import { createBook } from '../types.ts'

export const testBook = createBook({
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
          position: { vertical: 'top', horizontal: 'right' },
        },
        {
          type: 'image',
          size: 'medium',
          src: '/photos/korea/cafe-1.jpg',
          alt: 'The view of a small harbor from a cafe in Jeju island',
          position: { vertical: 'top', horizontal: 'left' },
        },
        {
          type: 'image',
          size: 'xl',
          src: '/photos/korea/cafe-2.jpg',
          alt: 'A cozy well lit corner of an artsy cafe in Jeju island',
          position: { vertical: 'bottom', horizontal: 'right' },
        },
      ],
    },
    {
      backgroundColor: '#EDE7DA',
      blocks: [{ type: 'image', size: 'full', src: '/photos/test-book/DSC00041.JPG', alt: '' }],
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
          justify: { vertical: 'bottom' },
          src: '/photos/taiwan/DSC09768.JPG',
          alt: '1 - taroko dark',
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
          justify: { vertical: 'top' },
          src: '/photos/taiwan/DSC09814.JPG',
          alt: '3 - taroko light',
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
        {
          type: 'image',
          size: 'xl',
          src: '/photos/taiwan/DSC09590.JPG',
          justify: { vertical: 'bottom' },
          alt: 'Top down view of rocks at Taroko Gorge',
        },
        {
          type: 'text',
          textColor: '#16d1ee',
          size: 'small',
          position: { vertical: 'bottom' },
          justify: { horizontal: 'right' },
          body: 'Rocks with water at Taroko Gorge',
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
          alt: 'Sharp clifs in Taroko Gorge',
        },
        {
          type: 'image',
          size: 'medium',
          /*position: { horizontal: 'right' },*/
          src: '/photos/taiwan/DSC09814.JPG',
          alt: 'Sunlight through Taroko Gorge',
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
      blocks: [{ type: 'image', size: 'large', src: '/photos/test-book/DSC00401.JPG', alt: '' }],
    },
    {
      backgroundColor: '#171614',
      blocks: [
        { type: 'image', size: 'large', src: '/photos/test-book/DSC00317.JPG', alt: '' },
        { type: 'text', size: 'medium', body: 'Ambulance near Udo' },
      ],
    },
  ],
})