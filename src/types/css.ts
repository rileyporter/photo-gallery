import type { CSSProperties } from 'react'

export type CSSVarStyle = CSSProperties & {
  [key: `--${string}`]: string | number
}
