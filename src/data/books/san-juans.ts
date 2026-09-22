import { createBook } from '../types.ts'

export const sanJuansBook = createBook({
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
      blocks: [{ type: 'image', size: 'full', src: '/photos/san-juans/DSC07383.JPG', alt: '' }],
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
})