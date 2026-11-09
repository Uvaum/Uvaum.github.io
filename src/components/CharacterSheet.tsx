import type { CSSProperties } from 'react'
import { useI18n } from '../i18n'
import { careerStart, tenure, useToday } from '../tenure'

const BLOCKS = 12
const DAY = 86_400_000
const gear = ['Python', 'Django', 'React', 'AWS']

/**
 * The hero's "save file": who I am in a few chunks a recruiter can scan in seconds.
 * The level is the number of months in tech and the XP bar is the current month,
 * both computed live from the career start date (same source as the tenure counter).
 */
export function CharacterSheet() {
  const { t } = useI18n()
  const s = t.sheet
  const today = useToday()
  const { months } = tenure(careerStart, today)

  const from = new Date(careerStart.getFullYear(), careerStart.getMonth() + months, careerStart.getDate())
  const to = new Date(careerStart.getFullYear(), careerStart.getMonth() + months + 1, careerStart.getDate())
  const total = Math.round((to.getTime() - from.getTime()) / DAY)
  const done = Math.min(total, Math.floor((today.getTime() - from.getTime()) / DAY))
  const filled = Math.floor((done / total) * BLOCKS)

  return (
    <div className="sheet px-box">
      <div className="code-bar">
        <span className="win-btn" />
        <span className="win-btn" />
        <span className="win-btn" />
        <em>{s.file}</em>
      </div>
      <div className="sheet-grid">
        <div className="cell cell-level">
          <div className="level">
            <span className="lv-tag">{s.level}</span>
            <strong>{months}</strong>
          </div>
          <div className="xp">
            <div className="xp-bar" role="meter" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} aria-label={s.xp(done, total, months + 1)}>
              {Array.from({ length: BLOCKS }, (_, i) => (
                <i key={i} className={i < filled ? 'on' : ''} style={{ '--i': i } as CSSProperties} />
              ))}
            </div>
            <span className="xp-text">{s.xp(done, total, months + 1)}</span>
            <small>{s.levelNote}</small>
          </div>
        </div>

        <div className="cell cell-status">
          <small>{s.status}</small>
          <span className="status-value">
            <span className="pulse" /> {s.statusValue}
          </span>
        </div>
        {t.about.stats.map((st) => (
          <div key={st.label} className="cell cell-stat">
            <strong>{st.value}</strong>
            <small>{st.label}</small>
          </div>
        ))}

        {s.cells.map((c) => (
          <div key={c.label} className="cell">
            <small>{c.label}</small>
            <span>{c.value}</span>
          </div>
        ))}

        <div className="cell cell-gear">
          <small>{s.gear}</small>
          <div className="gear">
            {gear.map((g) => (
              <span key={g} className="tag">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
