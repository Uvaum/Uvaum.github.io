// "Recruiter mode": the same content without the game layer (no intro, stars, sounds or
// countdown) and a one-page summary on top that prints as a CV. index.html applies the
// saved mode (or ?mode=recruiter from a shared link) before first paint.
import { useEffect, useState } from 'react'

const root = document.documentElement
const listeners = new Set<(on: boolean) => void>()

export const isRecruiter = () => root.dataset.mode === 'recruiter'

export function setRecruiter(on: boolean) {
  if (on) root.dataset.mode = 'recruiter'
  else delete root.dataset.mode
  try {
    localStorage.setItem('mode', on ? 'recruiter' : 'game')
  } catch {
    /* storage unavailable */
  }
  // Drop ?mode= so a reload keeps the visitor's own choice.
  const url = new URL(location.href)
  if (url.searchParams.has('mode')) {
    url.searchParams.delete('mode')
    history.replaceState(null, '', url)
  }
  window.scrollTo({ top: 0, behavior: 'instant' })
  listeners.forEach((l) => l(on))
}

export function useRecruiter() {
  const [on, setOn] = useState(isRecruiter)
  useEffect(() => {
    listeners.add(setOn)
    return () => {
      listeners.delete(setOn)
    }
  }, [])
  return on
}
