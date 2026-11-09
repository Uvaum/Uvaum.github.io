// Small replacements for what the page used from framer-motion. Motion itself lives in CSS
// (stepped keyframes in index.css); these hooks only decide *when* it starts.
import { useEffect, useRef, useState, type RefObject } from 'react'

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** True once the element scrolls into view (and stays true when `once`). */
export function useInView<T extends Element>(ref: RefObject<T | null>, { once = true, margin = '-80px' } = {}) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) setInView(false)
      },
      { rootMargin: `${margin} 0px ${margin} 0px` },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, once, margin])
  return inView
}

/**
 * Calls `onProgress` on every animation frame the page scrolls, without re-rendering.
 * `measure` turns the current scroll position into a 0..1 progress value.
 */
export function useScrollProgress(measure: () => number, onProgress: (p: number) => void) {
  const cb = useRef({ measure, onProgress })
  cb.current = { measure, onProgress }
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const p = Math.min(1, Math.max(0, cb.current.measure()))
      cb.current.onProgress(Number.isFinite(p) ? p : 0)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])
}

/** Counts from 0 up to `to` over `duration` ms once `start` turns true. */
export function useCountUp(to: number, start: boolean, duration = 1600) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    if (prefersReducedMotion()) {
      setValue(to)
      return
    }
    let frame = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      setValue(Math.round(p * to))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [to, start, duration])
  return value
}
