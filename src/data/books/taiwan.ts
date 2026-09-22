import { createBook } from '../types.ts'

export const taiwanBook = createBook({
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
        {
          type: 'image',
          size: 'xl',
          src: '/photos/taiwan/DSC09590.JPG',
          justify: { vertical: 'bottom' },
          alt: 'Top down view of rocks at Taroko Gorge',
        },
        {
          type: 'text',
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
  ],
})