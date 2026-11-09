import { PixelArt } from './PixelArt'

// The grape mascot as a little fighter next to the "Continue?" countdown. It reacts to the
// time left: on guard twirling a wooden staff from 9 to 4 (a little nod to a certain
// staff-wielding ninja), nervous from 3 to 1, knocked out at 0.
// Colors come from the theme (purple grape at night, green grape on the light theme).
type Mood = 'idle' | 'nervous' | 'ko'

const W = 27
const H = 27
const OX = 2 // the art is drawn in local coordinates; this leaves room for the left glove

type P = [number, number]

function fighter(mood: Mood, step: 0 | 1) {
  const g: string[][] = Array.from({ length: H }, () => Array(W).fill('.'))
  const put = (cells: P[], c: string) => {
    for (const [x, y] of cells) {
      const gx = x + OX
      if (gx >= 0 && gx < W && y >= 0 && y < H) g[y][gx] = c
    }
  }
  const rect = (x0: number, y0: number, x1: number, y1: number, c: string) => {
    const cells: P[] = []
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) cells.push([x, y])
    put(cells, c)
  }

  // stem and leaf
  put([[10, 0], [10, 1], [10, 2], [10, 3]], 's')
  put([[12, 0], [13, 0], [11, 1], [12, 1], [13, 1], [14, 1], [12, 2]], 'L')
  put([[14, 0], [13, 2]], 'l')

  // the bunch: rows of berries, back to front
  const berry = ['.ooo.', 'ohBBo', 'oBBDo', 'oBDDo', '.ooo.']
  const ball = (bx: number, by: number) =>
    berry.forEach((row, y) => row.split('').forEach((c, x) => c !== '.' && put([[bx + x, by + y]], c)))
  ;[
    [2, 4], [6, 4], [10, 4], [14, 4],
    [2, 8], [6, 8], [10, 8], [14, 8],
    [4, 12], [8, 12], [12, 12],
    [6, 16], [10, 16],
    [8, 19],
  ].forEach(([x, y]) => ball(x, y))

  // headband, with the knot's tails flying to the right
  for (let x = 2; x <= 18; x++) put([[x, 5], [x, 6]], 'r')
  put([[19, 5], [20, 4], [21, 4], [19, 6], [20, 7], [21, 8]], 'r')

  // face
  rect(6, 9, 14, 16, 'B')
  put([[6, 9], [14, 9], [6, 16], [14, 16]], 'D') // soften the face's corners
  if (mood === 'ko') {
    for (const cx of [8, 12]) put([[cx - 1, 11], [cx + 1, 11], [cx, 12], [cx - 1, 13], [cx + 1, 13]], 'o') // X eyes
    put([[9, 15], [10, 15], [11, 15]], 'o')
  } else {
    put([[6, 10], [7, 10], [8, 11], [9, 11], [14, 10], [13, 10], [12, 11], [11, 11]], 'o') // angry brows
    put([[7, 12], [7, 13], [13, 12], [13, 13]], 'e') // eye whites
    put([[8, 12], [8, 13], [12, 12], [12, 13]], 'o') // pupils, looking in
    put([[6, 14], [14, 14]], 'p') // blush
    if (mood === 'idle') put([[10, 14], [9, 15], [11, 15]], 'o') // frown
    else put([[9, 14], [10, 14], [11, 14], [9, 15], [10, 15], [11, 15]], 'o') // "eek" mouth
  }

  // wooden staff: a line of pixels from (x0, y0) to (x1, y1), drawn under the glove
  const staff = (x0: number, y0: number, x1: number, y1: number) => {
    const cells: P[] = []
    for (let y = y0; y <= y1; y++) cells.push([Math.round(x0 + ((x1 - x0) * (y - y0)) / (y1 - y0)), y])
    put(cells, 't')
  }

  // twig arms and gloves
  if (mood === 'idle') {
    put([[1, 12], [0, 11]], 's')
    rect(-2, 9, -1, 10, 'g') // left fist up, on guard
    if (step === 0) {
      staff(24, 1, 18, 21) // held on guard, slanted
      put([[19, 12], [20, 11]], 's')
      rect(21, 9, 22, 10, 'g')
    } else {
      staff(24, 2, 24, 22) // thrust forward, upright
      put([[19, 12], [20, 12], [21, 12], [22, 12]], 's')
      rect(23, 11, 24, 12, 'g')
    }
  } else {
    if (mood === 'nervous') staff(23, 7, 19, 25) // held limply
    put([[1, 13], [0, 14], [0, 15]], 's')
    rect(-1, 16, 0, 17, 'g')
    put([[19, 13], [20, 14], [20, 15]], 's')
    rect(20, 16, 21, 17, 'g')
  }

  // twig legs and boots, bouncing on the right foot while on guard
  put([[9, 24], [9, 25]], 's')
  put([[8, 26], [9, 26]], 'b')
  if (mood === 'idle' && step === 1) {
    put([[11, 24]], 's')
    put([[11, 25], [12, 25]], 'b')
  } else {
    put([[11, 24], [11, 25]], 's')
    put([[11, 26], [12, 26]], 'b')
  }

  // a falling drop of sweat
  if (mood === 'nervous') put(step === 0 ? [[22, 2], [22, 3]] : [[22, 6], [22, 7]], 'w')

  return g.map((r) => r.join(''))
}

const frames: Record<Mood, [string[], string[]]> = {
  idle: [fighter('idle', 0), fighter('idle', 1)],
  nervous: [fighter('nervous', 0), fighter('nervous', 1)],
  ko: [fighter('ko', 0), fighter('ko', 0)],
}

export function ContinueBuddy({ n }: { n: number }) {
  const mood: Mood = n === 0 ? 'ko' : n <= 3 ? 'nervous' : 'idle'
  const [a, b] = frames[mood]
  return (
    <span className={`buddy ${mood}`} aria-hidden>
      <PixelArt rows={a} size={64} className="fa" />
      <PixelArt rows={b} size={64} className="fb" />
    </span>
  )
}
