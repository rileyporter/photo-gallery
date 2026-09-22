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
- Change overall styling, move away from black and play with styling of title
- Implement a book title page / trip report page
- Make the affordance of the scroll wheel better. The cursor is a bit finicky
  there, and I think the click target is too small. Changing the padding makes
  it visually thicker, but there is still some finicky cursor behavior and I think
  I prefer the thinner default progress bar visuals
- Play with landscape books for screen real estate on wide displays. Maybe a toggle
  for landscape or vertical. Play with photo layout options for different viewports
- Think about a CMS instead of json for data management
- Play with layout of shelves and tilt
- Play with page grain
- Test on mobile
- Protect images from being scraped, downloaded and saved
- move root styling rules to `@layer base` in CSS
- move general styling rules to Tailwind classes when possible to colocate
- add a "shelf background" line to indicate where the shelf intersects with the wall if the books
  are resting 22% back.
- Look at converting the 3D book divs to svg. Investigate performance comparison
- Fix book open/close animation to be more realistic
- Fix styling on selected book element, it outlines the book hit area and looks odd.
- Aspect ratio of cover image on books looks a bit stretched
- Change page layout so that if no image size is provided, it takes as large of a space as it can
- Fix text justification bugs, so text blocks truly adhere to justification rules
- Add "chapter" jumps and labels to the bottom progress bar to orient more easily
- Let `full` size images take their entire row/column if no other neighbors, or optionally, give
  full size images an optional caption that is positioned on their non-cropped side, if that is
  going to be a common use case
- Text bug, where text on a page gets clipped by an image row/column
- Images not sizing correctly with other elements on the page
- Verify the onExited() animation solution is efficient and semantically correct
- Found a bug with onExited() solution, it hides the rest of the book (besides the cover) after
  close
- No explicit width/height on either <img>. Beyond causing layout shift as the image decodes, this
  also means the browser can't reserve space or prioritize the fetch as intelligently as it could
  with known intrinsic dimensions up front. Address as part of fine tuning performance.
- Dynamically load in one book at a time as needed for performance, requires splitting out cover
  data to be displayed on the shelves
- Programatically resize data files to minimize performance issues. Or manually resize image files
  before loading them onto a host server.



### Add a React Router

As the library grows, it may make sense to add a React Router with
`/book/:slug`-style URLs. The current shelf → open book animation relies on
the shelf and the open book display being mounted in the *same* React tree at
the same time (using a shared `layoutId`). Adding routing would require the shelf
to stay mounted underneath the route change, which isn't typical default behavior.
