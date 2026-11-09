import { useEffect, useRef } from 'react'

const PX = 3 // size of one "screen pixel"
const FPS = 8 // stars twinkle at a low, console-like frame rate

type Star = { x: number; y: number; layer: number; phase: number; big: boolean }

// Deterministic PRNG so the sky looks the same on every visit.
function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
}

export function Background() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const c = canvas?.getContext('2d')
    if (!canvas || !c) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const rand = rng(7)
    // Stars live in a tile of virtual pixels that repeats down the page.
    const TW = 640
    const TH = 480
    const stars: Star[] = Array.from({ length: 150 }, () => ({
      x: Math.floor(rand() * TW),
      y: Math.floor(rand() * TH),
      layer: rand() < 0.6 ? 0 : rand() < 0.75 ? 1 : 2,
      phase: Math.floor(rand() * 16),
      big: rand() < 0.08,
    }))

    let colors = ['#fff', '#fff', '#fff']
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      colors = ['--star-1', '--star-2', '--star-3'].map((v) => cs.getPropertyValue(v).trim() || '#fff')
    }
    readColors()
    const mo = new MutationObserver(() => {
      readColors()
      draw()
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    let w = 0
    let h = 0
    const resize = () => {
      w = Math.ceil(innerWidth / PX)
      h = Math.ceil(innerHeight / PX)
      canvas.width = w
      canvas.height = h
      draw()
    }

    let frame = 0
    function draw() {
      if (!c) return
      c.clearRect(0, 0, w, h)
      const scroll = scrollY / PX
      for (const s of stars) {
        // Farther layers move slower when scrolling (parallax), snapped to whole pixels.
        const speed = [0.12, 0.25, 0.45][s.layer]
        const y0 = Math.floor(s.y - scroll * speed)
        const tw = (frame + s.phase) % 16
        if (!reduce && s.layer === 0 && tw > 13) continue // dim stars blink off now and then
        c.fillStyle = colors[s.layer]
        for (let ox = 0; ox < w; ox += TW) {
          const x = s.x + ox
          if (x >= w) continue
          for (let y = ((y0 % TH) + TH) % TH; y < h; y += TH) {
            c.fillRect(x, y, 1, 1)
            if (s.big && (reduce || tw < 8)) {
              // a little plus-shaped sparkle
              c.fillRect(x - 1, y, 1, 1)
              c.fillRect(x + 1, y, 1, 1)
              c.fillRect(x, y - 1, 1, 1)
              c.fillRect(x, y + 1, 1, 1)
            }
          }
        }
      }
    }

    resize()
    addEventListener('resize', resize)
    const onScroll = () => draw()
    addEventListener('scroll', onScroll, { passive: true })
    const id = reduce
      ? 0
      : window.setInterval(() => {
          if (document.hidden) return
          frame++
          draw()
        }, 1000 / FPS)

    return () => {
      clearInterval(id)
      mo.disconnect()
      removeEventListener('resize', resize)
      removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="bg" aria-hidden>
      <canvas ref={ref} className="stars" />
      <div className="scanlines" />
      <div className="vignette" />
    </div>
  )
}
