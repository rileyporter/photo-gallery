# DAISY Photography — a virtual photo-book gallery for DAISY Studio

A library of shelves, each holding a small run of face-out books on a
display shelf. Click a book and it animates from its shelf spot into the
full viewport, opening onto pages you scroll through — each page a
flexible mix of photos and text.

## Tech Stack

- **Vite** - dev server + bundler
- **React** - component structure
- **TypeScript** - client side scripting
- **Motion** — Animation library
- **Tailwind CSS** - styling
- **src/data/library.ts** - Data file with local photos from `/public`

No backend, router, or CMS.

## Run it

```bash
npm install
npm run dev
```

- `npm run build` — type-checks the whole project (`tsc -b`) THEN builds;
  it will refuse to build if there's a type error anywhere, on purpose.
- `npm run type-check` — just the type-check, no build. Useful to run on
  its own while editing, faster feedback than a full build.

## How the data is organized

- `src/data/library.ts` exports an array of shelves, each with 3-5 books.
  Each book has a slug, a cover image, an accent color, and an ordered list
  of pages. Every page has an array of blocks of images and/or text, each
  independently sized and positioned.

## Cursor and color tinting

- **Custom cursor.** Any element can opt in to a custom cursor, which 
  swaps the native pointer for a colored ring (`src/components/Cursor.tsx`).
- **Per-book tinting.** Each book's `accentColor` shows up in different places
  when interacting with the book. For example, there are various UI elements when
  the book is open and a soft glow behind the closed book on hover.

## ToDo
- Fix book tilt click bug. Have to manually trigger a click to get motion to find the book
- Swap to a 3D book element with a cover
- Change overall styling, move away from black and play with styling of title
- Implement photo book covers and text for display on the shelf
- Implement a book title page / trip report page
- Make the affordance of the scroll wheel better. The cursor is a bit finicky
  there, and I think the click target is too small. Changing the padding makes
  it visually thicker, but there is still some finicky cursor behavior and I think
  I prefer the thinner default progress bar visuals
- Play with landscape books for screen real estate on wide displays. Maybe a toggle
  for landscape or vertical. Play with photo layout options for different viewports
- Think about a CMS instead of json for data management
- Play with layout of shelves and tilt
- Fix shelf lighting elements
- Play with page grain
- Choose different fonts for the page and fix the first letter paragraph styling
- Test on mobile
- Protect images from being scraped, downloaded and saved
- move root styling rules to `@layer base` in CSS
- move general styling rules to Tailwind classes when possible to colocate
- add a "shelf background" line to indicate where the shelf intersects with the wall if the books
  are resting 22% back.
- Look at shifting the 3D book divs to svg

### Add a React Router

As the library grows, it may make sense to add a React Router with
`/book/:slug`-style URLs. The current shelf → open book animation relies on
the shelf and the open book display being mounted in the *same* React tree at
the same time (using a shared `layoutId`). Adding routing would require the shelf
to stay mounted underneath the route change, which isn't typical default behavior.
