import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { useI18n } from '../i18n'

type Theme = 'dark' | 'light'

const sun =
  'M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0-5 1 3h-2l1-3Zm0 20-1-3h2l-1 3ZM2 12l3-1v2l-3-1Zm20 0-3 1v-2l3 1ZM4.93 4.93l2.83 1.42-1.41 1.41-1.42-2.83Zm14.14 14.14-2.83-1.42 1.41-1.41 1.42 2.83ZM4.93 19.07l1.42-2.83 1.41 1.41-2.83 1.42ZM19.07 4.93l-1.42 2.83-1.41-1.41 2.83-1.42Z'
const moon = 'M21 14.5A9 9 0 0 1 9.5 3a9 9 0 1 0 11.5 11.5Z'

// index.html sets data-theme before React loads, so the first paint already has the right theme.
// Share of the flood's radius that is fully opaque; the rest is the feathered edge (see .theme-flood).
const SOLID = 0.7

const current = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

export function ThemeToggle() {
  const { lang } = useI18n()
  const [theme, setTheme] = useState<Theme>(current)
  const busy = useRef(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f7f8f5' : '#07060b')
    // Purple grape in the dark theme, green grape in the light one.
    document
      .querySelector('link[rel="icon"]')
      ?.setAttribute('href', `${import.meta.env.BASE_URL}${theme === 'light' ? 'favicon-light.svg' : 'favicon.svg'}`)
  }, [theme])

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage unavailable */
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || busy.current) {
      setTheme(next)
      return
    }
    busy.current = true

    // A soft-edged disc of light grows out of the button (or is sucked back into it).
    // Only transform and opacity are animated, so it stays on the GPU and never repaints the page.
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) / SOLID
    const flood = document.createElement('div')
    flood.className = 'theme-flood'
    Object.assign(flood.style, { left: `${x - r}px`, top: `${y - r}px`, width: `${2 * r}px`, height: `${2 * r}px` })
    document.body.appendChild(flood)

    const apply = () => {
      flushSync(() => setTheme(next))
      document.documentElement.dataset.theme = next
    }
    // Wait two frames so the theme switch is fully painted under the flood before it moves again.
    const afterPaint = () => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)))
    const finish = () => {
      flood.remove()
      busy.current = false
    }

    if (next === 'light') {
      flood
        .animate({ transform: ['scale(0)', 'scale(1)'] }, { duration: 650, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' })
        .finished.then(apply)
        .then(afterPaint)
        .then(() => flood.animate({ opacity: [1, 0] }, { duration: 380, easing: 'ease-out', fill: 'forwards' }).finished)
        .finally(finish)
    } else {
      flood
        .animate({ opacity: [0, 1] }, { duration: 160, easing: 'ease-out', fill: 'forwards' })
        .finished.then(apply)
        .then(afterPaint)
        .then(
          () =>
            flood.animate(
              { transform: ['scale(1)', 'scale(0)'] },
              { duration: 650, easing: 'cubic-bezier(0.55, 0, 0.75, 0.2)', fill: 'forwards' },
            ).finished,
        )
        .finally(finish)
    }
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
    <button className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.svg
          key={theme}
          viewBox="0 0 24 24"
          width="17"
          height="17"
          aria-hidden
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <path fill="currentColor" d={theme === 'dark' ? moon : sun} />
        </motion.svg>
      </AnimatePresence>
    </button>
  )
}
