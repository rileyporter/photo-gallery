import { createBook } from '../types.ts'

export const koreaBook = createBook({
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
          alt: 'A person walking across a bridge on a hike in Jeju island',
        },
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
    // Harbor introduction page
    {
      backgroundColor: '#e4e8eb',
      blocks: [
        {
          type: 'image',
          size: 'full',
          src: '/photos/korea/two-mountains.jpg',
          alt: 'Construction equipment and hills making two mountain shapes in Busan harbor',
        },
        {
          type: 'text',
          size: 'large',
          body: 'Busan Harbor',
          position: { vertical: 'top' },
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
          position: { vertical: 'top' },
        },
        {
          type: 'image',
          size: 'large',
          src: '/photos/korea/harbor-bottom.jpg',
          alt: 'A misty view of apartment buildings in Busan Harbor',
        },
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
          position: { vertical: 'top' },
        },
        {
          type: 'image',
          size: 'medium',
          src: '/photos/korea/cranes-bridge.jpg',
          alt: 'Part of a bridge and many large cranes in Busan harbor',
        },
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
          alt: 'Large bridge in Busan harbor at sunset',
        },
      ],
    },
  ],
})