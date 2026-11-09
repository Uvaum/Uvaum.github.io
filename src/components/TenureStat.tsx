import { useRef, useState, type CSSProperties } from 'react'
import { useCountUp, useInView } from '../hooks'
import { useI18n } from '../i18n'
import { careerStart as start, tenure, useToday } from '../tenure'

export function TenureStat() {
  const { t, lang } = useI18n()
  const tt = t.about.tenure
  const today = useToday()
  const { y, m, d, months, days } = tenure(start, today)

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-60px' })
  const shown = useCountUp(months, inView)
  const [open, setOpen] = useState(false)

  const fmt = (date: Date) => date.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US')
  const unit = (n: number, [one, many]: readonly string[]) => `${n} ${n === 1 ? one : many}`
  const human = `${unit(y, tt.units.year)}, ${unit(m, tt.units.month)} ${tt.and} ${unit(d, tt.units.day)}`

  return (
    <div
      ref={ref}
      className={`stat px-box tenure rv ${inView ? 'in' : ''} ${open ? 'open' : ''}`}
      style={{ '--d': '0.2s' } as CSSProperties}
      tabIndex={0}
      role="button"
      aria-expanded={open}
      aria-describedby="tenure-calc"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onPointerUp={(e) => e.pointerType !== 'mouse' && setOpen((o) => !o)}
    >
      <strong className="stat-value">{shown}</strong>
      <span>{tt.label}</span>
      <span className="tenure-hint">
        <span className="live-dot" /> {tt.hint}
      </span>

      {open && (
        <div id="tenure-calc" role="tooltip" className="calc pop-in">
          <div className="calc-bar mono">
            <span className="win-btn" />
            <span className="win-btn" />
            <span className="win-btn" />
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
        </div>
      )}
    </div>
  )
}
