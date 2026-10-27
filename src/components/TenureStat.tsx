import { AnimatePresence, animate, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/content'
import { useI18n } from '../i18n'

const { year, month, day } = profile.careerStart
const start = new Date(year, month - 1, day)

/** Calendar difference (years, months, days) between two dates, like a person would count it. */
function tenure(from: Date, to: Date) {
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

function useToday() {
  const [today, setToday] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setToday(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])
  return today
}

export function TenureStat() {
  const { t, lang } = useI18n()
  const tt = t.about.tenure
  const today = useToday()
  const { y, m, d, months, days } = tenure(start, today)

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [shown, setShown] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, months, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setShown(Math.round(v)) })
    return () => controls.stop()
  }, [inView, months])

  const fmt = (date: Date) => date.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US')
  const unit = (n: number, [one, many]: readonly string[]) => `${n} ${n === 1 ? one : many}`
  const human = `${unit(y, tt.units.year)}, ${unit(m, tt.units.month)} ${tt.and} ${unit(d, tt.units.day)}`

  return (
    <motion.div
      ref={ref}
      className={`stat tenure ${open ? 'open' : ''}`}
      tabIndex={0}
      role="button"
      aria-expanded={open}
      aria-describedby="tenure-calc"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onTap={(e) => !('pointerType' in e && e.pointerType === 'mouse') && setOpen((o) => !o)}
    >
      <strong className="gradient-text">{shown}</strong>
      <span>{tt.label}</span>
      <span className="tenure-hint">
        <span className="live-dot" /> {tt.hint}
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            id="tenure-calc"
            role="tooltip"
            className="calc"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          >
            <div className="calc-bar mono">
              <span />
              <span />
              <span />
              <em>tenure.py</em>
            </div>
            <div className="calc-body mono">
              <p className="c-comment"># {tt.title}</p>
              <p>
                <span className="c-var">{tt.start}</span> = <span className="c-val">{fmt(start)}</span>{' '}
                <span className="c-comment"># {tt.startNote}</span>
              </p>
              <p>
                <span className="c-var">{tt.today}</span> = <span className="c-val">{fmt(today)}</span>
              </p>
              <p>
                <span className="c-var">{tt.diff}</span> = {tt.today} − {tt.start}
              </p>
              <p className="c-indent">
                = <span className="c-str">{human}</span>
              </p>
              <p>
                <span className="c-var">{tt.months}</span> = <span className="c-num">{y}</span> × 12 +{' '}
                <span className="c-num">{m}</span> = <span className="c-res">{months}</span>
              </p>
              <p>
                <span className="c-var">{tt.total}</span> = <span className="c-num">{days}</span> {tt.units.day[1]}
              </p>
              <p className="c-comment c-live"># {tt.live}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
