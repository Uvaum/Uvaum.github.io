import type { CSSProperties, ReactElement } from 'react'

/**
 * Renders pixel art from rows of characters. Each character maps to a CSS class (`px-<char>`),
 * so the colors come from the stylesheet and follow the theme. '.' is transparent.
 */
export function PixelArt({
  rows,
  size = 32,
  className = '',
  style,
  title,
}: {
  rows: string[]
  size?: number
  className?: string
  style?: CSSProperties
  title?: string
}) {
  const w = Math.max(...rows.map((r) => r.length))
  const h = rows.length
  const rects: ReactElement[] = []
  rows.forEach((row, y) => {
    // Merge horizontal runs of the same color into one rect to keep the DOM small.
    let x = 0
    while (x < row.length) {
      const c = row[x]
      let end = x + 1
      while (end < row.length && row[end] === c) end++
      if (c !== '.' && c !== ' ') rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={end - x} height={1} className={`px-${c}`} />)
      x = end
    }
  })
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={size}
      height={(size * h) / w}
      shapeRendering="crispEdges"
      className={`pixel-art ${className}`}
      style={style}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {rects}
    </svg>
  )
}

/** The grape mascot: o = outline, B = berry, h = highlight, D = shade, s = stem, L/l = leaf. */
function buildGrape(): string[] {
  const W = 13
  const H = 16
  const g: string[][] = Array.from({ length: H }, () => Array(W).fill('.'))
  const put = (x: number, y: number, c: string) => {
    if (x >= 0 && x < W && y >= 0 && y < H) g[y][x] = c
  }
  ;[
    [6, 0],
    [6, 1],
    [6, 2],
  ].forEach(([x, y]) => put(x, y, 's'))
  ;[
    [8, 0],
    [9, 0],
    [7, 1],
    [8, 1],
    [9, 1],
    [10, 1],
    [8, 2],
  ].forEach(([x, y]) => put(x, y, 'L'))
  put(10, 0, 'l')
  put(9, 2, 'l')
  const berry = ['.ooo.', 'ohBBo', 'oBBDo', 'oBDDo', '.ooo.']
  const ball = (bx: number, by: number) =>
    berry.forEach((row, y) => row.split('').forEach((c, x) => c !== '.' && put(bx + x, by + y, c)))
  // Back to front, so each lower berry sits on top of the ones above it.
  ;[
    [0, 3],
    [4, 3],
    [8, 3],
    [2, 7],
    [6, 7],
    [4, 11],
  ].forEach(([x, y]) => ball(x, y))
  return g.map((r) => r.join(''))
}

export const grapeSprite = buildGrape()

export const sun = [
  '...y..y...',
  '.y......y.',
  '...yyyy...',
  'y.yyyyyy.y',
  '..yyyyyy..',
  '..yyyyyy..',
  'y.yyyyyy.y',
  '...yyyy...',
  '.y......y.',
  '...y..y...',
]

export const moon = [
  '...mmmm...',
  '..mmm.....',
  '.mmm......',
  'mmmm......',
  'mmmm......',
  'mmmm......',
  'mmmmm.....',
  '.mmmmm..m.',
  '..mmmmmm..',
  '...mmmm...',
]

export const speakerOn = [
  '....k.....',
  '...kk..k..',
  'kkkkk...k.',
  'kkkkk.k.k.',
  'kkkkk.k.k.',
  'kkkkk...k.',
  '...kk..k..',
  '....k.....',
]

export const speakerOff = [
  '....k.....',
  '...kk.....',
  'kkkkk.k..k',
  'kkkkk..kk.',
  'kkkkk..kk.',
  'kkkkk.k..k',
  '...kk.....',
  '....k.....',
]
