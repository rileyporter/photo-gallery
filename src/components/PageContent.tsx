// Page component that dynamically places text and image blocks on the page
// based on their defined position and alignment rules, using a page-wide
// CSS Grid. Grid cells are dynamically sized weighted by content, creating
// bounding box lines to align content to neighboring content across row and
// column boundaries. Grid cells with multiple blocks use flexbox sizing to
// pack the items left to right and justfiy based on specified alignment.

import type {
    Page,
    PageBlock,
    ImageBlock,
    TextBlock,
    BlockSize,
    HorizontalPosition,
    VerticalPosition,
} from '../data/library.ts'
  
interface PageContentProps {
  page: Page
}

const V_ORDER: VerticalPosition[] = ['top', 'center', 'bottom']

// Fixed 3 grid-column index per horizontal position, with flexible column sizing
const COLUMN_INDEX: Record<HorizontalPosition, number> = { left: 1, center: 2, right: 3 }
const GRID_TEMPLATE_COLUMNS = 'minmax(0, 1fr) auto minmax(0, 1fr)'

const JUSTIFY: Record<HorizontalPosition, string> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}
const ALIGN: Record<VerticalPosition, string> = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
}

const ROW_WEIGHT: Record<BlockSize, number> = {
  xs: 1,
  small: 2,
  medium: 3,
  large: 4,
  xl: 5,
  full: 5,
}

// TODO(rileyporter): change viewport height to container based height with cqh, & by marking the
//                    .reader-page-flat container as a size container in the CSS
const IMAGE_MAX_HEIGHT: Record<BlockSize, string> = {
  xs: '20vh',
  small: '32vh',
  medium: '48vh',
  large: '62vh',
  xl: '75vh',
  full: '85vh',
}

const TEXT_MAX_WIDTH: Record<BlockSize, string> = {
  xs: '12vw',
  small: '18vw',
  medium: '24vw',
  large: '32vw',
  xl: '40vw',
  full: '40vw',
}

// #### Text Content Component ####

interface TextContentProps {
  heading?: string
  body: string | string[]
  small?: boolean
}

// TODO(rileyporter): Consider giving text content a small fixed margin for a minimum buffer
// to avoid auto sized text rows being totally overpowered in the grid
function TextContent({ heading, body, small }: TextContentProps) {
  return (
    <div className={`page-text ${small ? 'small' : ''}`}>
      {heading && <p className="page-heading">{heading}</p>}
      {(Array.isArray(body) ? body : [body]).map((paragraph, i) => (
        <p key={i} className={i === 0 ? 'page-paragraph first' : 'page-paragraph'}>
          {paragraph}
        </p>
      ))}
    </div>
  )
}

// #### Block Rendering ####

function renderImageBlock(block: ImageBlock) {
  return (
    <img
      src={block.src}
      alt={block.alt}
      loading="lazy"
      className="image-block object-contain w-auto h-auto min-w-0 max-w-full max-h-full"
      style={{ maxHeight: IMAGE_MAX_HEIGHT[block.size] }}
    />
  )
}

function renderTextBlock(block: TextBlock, textColor?: string) {
  const textBlockStyle = {
    color: textColor || '#F3EFE6',
    maxWidth: TEXT_MAX_WIDTH[block.size],
  }

  return (
    <div style={textBlockStyle}>
      <TextContent
        heading={block.heading}
        body={block.body}
        small={block.size === 'xs' || block.size === 'small'}
      />
    </div>
  )
}

// Renders one block within its cell's shrink-wrapped packing group
function renderBlock(
  block: PageBlock,
  index: number,
  row: VerticalPosition,
  col: HorizontalPosition,
  textColor?: string
) {
  const h = block.justify?.horizontal ?? col
  const v = block.justify?.vertical ?? row

  const blockContent =
    block.type === 'image' ? renderImageBlock(block) : renderTextBlock(block, textColor)

  return (
    <div
      key={index}
      className="flex min-w-0 min-h-0 max-w-full max-h-full shrink overflow-hidden"
      style={{
        flex: '0 1 auto',
        justifyContent: JUSTIFY[h],
        alignSelf: ALIGN[v],
      }}
    >
      {blockContent}
    </div>
  )
}

// #### Content mapped to page layout logic ####

interface Cell {
  v: VerticalPosition
  h: HorizontalPosition
  blocks: PageBlock[]
}

function buildCells(blocks: PageBlock[]): Cell[] {
  const cells = new Map<string, Cell>()
  for (const block of blocks) {
    const v: VerticalPosition = block.position?.vertical ?? 'center'
    const h: HorizontalPosition = block.position?.horizontal ?? 'center'
    const key = `${v}:${h}`
    const cell = cells.get(key)
    if (cell) cell.blocks.push(block)
    else cells.set(key, { v, h, blocks: [block] })
  }
  return Array.from(cells.values())
}

interface RowInfo {
  weight: number
  index: number
  hasImage: boolean
}

// Calculate active rows, weights, row types, and 1-based grid row indices
function buildRowMap(blocks: PageBlock[]): Map<VerticalPosition, RowInfo> {
  const rowData = new Map<VerticalPosition, { maxWeight: number; hasImage: boolean }>()
  for (const block of blocks) {
    const v: VerticalPosition = block.position?.vertical ?? 'center'
    const current = rowData.get(v) ?? { maxWeight: 0, hasImage: false }
    const weight = ROW_WEIGHT[block.size]
    current.maxWeight = Math.max(current.maxWeight, weight)
    if (block.type === 'image') {
      current.hasImage = true
    }
    rowData.set(v, current)
  }

  const map = new Map<VerticalPosition, RowInfo>()
  let index = 1
  for (const v of V_ORDER) {
    const data = rowData.get(v)
    if (data !== undefined) {
      map.set(v, {
        weight: data.maxWeight,
        index: index++,
        hasImage: data.hasImage,
      })
    }
  }
  return map
}

// #### Page Content Component ####

export default function PageContent({ page }: PageContentProps) {
  // Full image case: edge-to-edge / unpadded hero presentation
  const soleBlock = page.blocks.length === 1 ? page.blocks[0] : undefined
  if (soleBlock?.type === 'image' && soleBlock.size === 'full') {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <img 
          src={soleBlock.src}
          alt={soleBlock.alt}
          loading="lazy"
          className="h-full w-full object-contain" />
      </div>
    )
  }

  // Grid of content case
  const rowMap = buildRowMap(page.blocks)
  const cells = buildCells(page.blocks)
  const totalImageRows = Array.from(rowMap.values()).filter((r) => r.hasImage).length
  const gridTemplateRows = Array.from(rowMap.values())
    .map((r) => (r.hasImage || totalImageRows === 0 ? `minmax(0, ${r.weight}fr)` : 'auto'))
    .join(' ')

  return (
    <div
      className="grid h-full w-full min-h-0 min-w-0 max-w-full max-h-full gap-3 p-3 md:gap-4 md:p-5"
      style={{
        gridTemplateColumns: GRID_TEMPLATE_COLUMNS,
        gridTemplateRows,
      }}
    >
      {cells.map((cell) => {
        const isSolo = cell.blocks.length === 1
        const anchor = cell.blocks.reduce((a, b) => (ROW_WEIGHT[b.size] > ROW_WEIGHT[a.size] ? b : a))
        const outerH = anchor.justify?.horizontal ?? cell.h
        const outerV = anchor.justify?.vertical ?? cell.v

        // const rowIndex = rowMap.get(cell.v)?.index ?? 1

        const rowInfo = rowMap.get(cell.v)
        const rowIndex = rowInfo?.index ?? 1
        // Only text-only rows get a small fixed buffer — and only when they're genuinely
        // auto-sized (i.e. sharing the page with at least one image row)
        const needsTopBuffer = totalImageRows > 0 && rowInfo !== undefined && !rowInfo.hasImage

        return (
          <div
            key={`${cell.v}:${cell.h}`}
            className={`flex min-h-0 min-w-0 max-w-full ${isSolo ? 'h-full max-h-full' : ''}`}
            style={{
              gridColumn: COLUMN_INDEX[cell.h],
              gridRow: rowIndex,
              justifySelf: JUSTIFY[outerH],
              alignSelf: ALIGN[outerV],
              marginTop: needsTopBuffer ? '1.5rem' : undefined,
            }}
          >
            <div className={`flex gap-4 md:gap-6 min-w-0 max-w-full ${isSolo ? 'h-full max-h-full' : ''}`}>
              {cell.blocks.map((block, i) =>
                renderBlock(block, i, cell.v, cell.h, page.textColor)
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}