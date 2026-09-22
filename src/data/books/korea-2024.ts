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
    // Bamboo
    {
      backgroundColor: '#737d3b',
      blocks: [
        {
          type: 'image',
          size: 'large',
          src: '/photos/korea/bamboo-left.jpg',
          alt: 'A bamboo forest outside of Busan',
        },
        {
          type: 'image',
          size: 'large',
          src: '/photos/korea/bamboo-tops.jpg',
          alt: 'The tops of a bamboo forest',
        },
        {
          type: 'image',
          size: 'large',
          src: '/photos/korea/bamboo-right.jpg',
          alt: 'A bamboo forest outside of Busan',
        },
      ],
    },
    // Bamboo 2
    {
      backgroundColor: '#737d3b',
      blocks: [
        {
          type: 'image',
          size: 'large',
          src: '/photos/korea/bamboo-split-1.jpg',
          alt: 'A bamboo forest outside of Busan',
        },
        {
          type: 'image',
          size: 'large',
          src: '/photos/korea/bamboo-split-2.jpg',
          alt: 'A bamboo forest outside of Busan',
          justify: {vertical: 'top'}
        },
        {
          type: 'image',
          size: 'large',
          src: '/photos/korea/bamboo-split-3.jpg',
          alt: 'A bamboo forest outside of Busan',
          justify: {vertical: 'top'}
        },
      ],
    },
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
    // Seongsan
    {
      backgroundColor: '#93A762',
      blocks: [
        {
          type: 'image',
          size: 'medium',
          src: '/photos/korea/seongsan.jpg',
          alt: 'Seongsan Ilchulbong',
          position: { horizontal: 'right'}
        },
        {
          type: 'image',
          size: 'small',
          src: '/photos/korea/udo-grass.jpg',
          alt: 'The view of Seongsan Ilchulbong from Udo',
          position: { horizontal: 'left', vertical: 'top' },
        },
        {
          type: 'image',
          size: 'small',
          src: '/photos/korea/udo-hill.jpg',
          alt: 'The view of grassy cliff with the sea below Udo',
          position: { horizontal: 'left', vertical: 'bottom' },
        },
      ],
    },
    // Jeju flowers and ocean
    {
      backgroundColor: '#B7C8CB',
      blocks: [
        {
          type: 'image',
          size: 'full',
          src: '/photos/korea/jeju-flowers.jpg',
          alt: 'Wildflowers photo overlaid on an Jeju beach',
        }
      ],
    },
    // Jeju yellow building and flowers
    {
      backgroundColor: '#DCC837',
      blocks: [
        {
          type: 'image',
          size: 'xl',
          src: '/photos/korea/yellow.jpg',
          alt: 'A concrete building with a bright yellow pane of glass set against yellow flowers',
          position: {vertical: 'top'}
        },
        // TODO: add a red and blue photo to the bottom of the page, including one of me on the red
        //      Udo hoop swing
      ],
    },
    // Jeju truck in a field
    {
      backgroundColor: '#D0B797',
      blocks: [
        {
          type: 'image',
          size: 'full',
          src: '/photos/korea/truck.jpg',
          alt: 'A farm truck on a field in Jeju island with Jeju city outskirts in the background',
        },
      ],
    },
    // Two views of sunrise at Seongsan
    {
      backgroundColor: '#3E3854',
      blocks: [
        {
          type: 'image',
          size: 'medium',
          src: '/photos/korea/sunrise-1.jpg',
          alt: 'A view of the early sunrise at Seongsan',
          position: {vertical: 'top'}
        },
        {
          type: 'image',
          size: 'medium',
          src: '/photos/korea/sunrise-2.jpg',
          alt: 'A view of a later sunrise at Seongsan',
        },
      ],
    },
    // Sunrise in Seongsan town
    {
      backgroundColor: '#53313d',
      blocks: [
        {
          type: 'image',
          size: 'full',
          src: '/photos/korea/seongsan-sunrise.jpg',
          alt: 'Sunrise sky with overlaid photos of Seongsan town at sunrise with colorful rooves',
        },
      ],
    },
    // Golden hour Seongsan
    {
      backgroundColor: '#dab784',
      blocks: [
        {
          type: 'image',
          size: 'full',
          src: '/photos/korea/seongsan-golden-grass.jpg',
          alt: 'The golden hour in the grass in Seongsan',
        },
      ],
    },
    // Udo ambulance
    {
      backgroundColor: '#C1D8EA',
      blocks: [
        {
          type: 'image',
          size: 'full',
          src: '/photos/korea/udo-ferry.png',
          alt: 'A ferry from Udo island with an ambulance and a waving Korean flag',
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
        },
        {
          type: 'image',
          size: 'large',
          src: '/photos/korea/busan-bridge.jpg',
          alt: 'Large bridge in Busan harbor at sunset',
          position: { vertical: 'bottom'}
        },
      ],
    },
    // Seoraksan
    {
      backgroundColor: '#1B2E39',
      blocks: [
        {
          type: 'image',
          size: 'full',
          src: '/photos/korea/seoraksan.jpg',
          alt: 'Ulsanbawi in Seoraksan park',
        },
      ],
    },
  ],
})