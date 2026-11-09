import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { useI18n } from '../i18n'
import { sfx } from '../sfx'
import { PixelArt, moon, sun } from './PixelArt'

type Theme = 'dark' | 'light'

// index.html sets data-theme before React loads, so the first paint already has the right theme.
const current = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

const CELL = 28 // size of one block of the pixelated circle
const FRAMES = 14 // the circle grows in discrete frames, like an old console
const DURATION = 620

/**
 * A pixelated circle centered on (cx, cy) as a clip-path polygon: for each row of blocks,
 * the span of blocks whose distance to the center fits inside r, traced as a staircase outline.
 */
function stairs(cx: number, cy: number, r: number) {
  if (r < CELL / 2) return `polygon(${cx}px ${cy}px, ${cx}px ${cy}px, ${cx}px ${cy}px)`
  const n = Math.floor(r / CELL)
  const rows: { top: number; bottom: number; x0: number; x1: number }[] = []
  for (let i = -n; i <= n; i++) {
    const dy = Math.abs(i) * CELL
    const half = Math.floor(Math.sqrt(r * r - dy * dy) / CELL)
    const top = cy + (i - 0.5) * CELL
    rows.push({ top, bottom: top + CELL, x0: cx - (half + 0.5) * CELL, x1: cx + (half + 0.5) * CELL })
  }
  const right = rows.flatMap((p) => [`${p.x1}px ${p.top}px`, `${p.x1}px ${p.bottom}px`])
  const left = [...rows].reverse().flatMap((p) => [`${p.x0}px ${p.bottom}px`, `${p.x0}px ${p.top}px`])
  return `polygon(${[...right, ...left].join(', ')})`
}

export function ThemeToggle() {
  const { lang } = useI18n()
  const [theme, setTheme] = useState<Theme>(current)
  const busy = useRef(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#d7e3a6' : '#0d0817')
    // Purple grape in the dark theme, green grape in the light one.
    document
      .querySelector('link[rel="icon"]')
      ?.setAttribute('href', `${import.meta.env.BASE_URL}${theme === 'light' ? 'favicon-light.svg' : 'favicon.svg'}`)
  }, [theme])

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    // Ignore clicks while a switch is still animating; the state would be stale.
    if (busy.current) return
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage unavailable */
    }
    if (next === 'light') sfx.powerUp()
    else sfx.powerDown()

    const root = document.documentElement
    const apply = () => {
      flushSync(() => setTheme(next))
      root.dataset.theme = next
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !document.startViewTransition) {
      apply()
      return
    }
    busy.current = true

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const cx = left + width / 2
    const cy = top + height / 2
    const R = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy)) + CELL * 2

    // Going to light, the new page grows out of the button; going back to dark,
    // the light page stays on top and is sucked back into the button.
    const grow = next === 'light'
    root.classList.toggle('vt-shrink', !grow)

    const frames = Array.from({ length: FRAMES + 1 }, (_, k) => {
      const p = k / FRAMES
      const eased = grow ? 1 - (1 - p) ** 2 : 1 - p * p
      return { clipPath: stairs(cx, cy, eased * R), easing: 'steps(1, end)' }
    })

    const vt = document.startViewTransition(apply)
    vt.ready
      .then(() => {
        root.animate(frames, {
          duration: DURATION,
          fill: 'both',
          pseudoElement: grow ? '::view-transition-new(root)' : '::view-transition-old(root)',
        })
      })
      .catch(() => {})
    vt.finished.finally(() => {
      root.classList.remove('vt-shrink')
      busy.current = false
    })
  }

  const label =
    theme === 'dark'
      ? lang === 'pt'
        ? 'Mudar para tema claro'
        : 'Switch to light theme'
      : lang === 'pt'
        ? 'Mudar para tema escuro'
        : 'Switch to dark theme'

  return (
    <button className="icon-btn theme-toggle" data-nosfx onClick={toggle} aria-label={label} title={label}>
      <PixelArt key={theme} rows={theme === 'dark' ? moon : sun} size={18} className="icon-pop" />
    </button>
  )
}
