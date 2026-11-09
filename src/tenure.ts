import { useEffect, useState } from 'react'
import { profile } from './data/content'

const { year, month, day } = profile.careerStart
export const careerStart = new Date(year, month - 1, day)

/** Calendar difference (years, months, days) between two dates, like a person would count it. */
export function tenure(from: Date, to: Date) {
  let y = to.getFullYear() - from.getFullYear()
  let m = to.getMonth() - from.getMonth()
  let d = to.getDate() - from.getDate()
  if (d < 0) {
    m--
    d += new Date(to.getFullYear(), to.getMonth(), 0).getDate() // days in the previous month
  }
  if (m < 0) {
    y--
    m += 12
  }
  const days = Math.round(
    (Date.UTC(to.getFullYear(), to.getMonth(), to.getDate()) -
      Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())) /
      86_400_000,
  )
  return { y, m, d, months: y * 12 + m, days }
}

/** Today's date, refreshed every minute so counters roll over at midnight. */
export function useToday() {
  const [today, setToday] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setToday(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])
  return today
}
