import { useRef } from 'react'
import { useScrollProgress } from '../hooks'
import { useI18n } from '../i18n'
import { Reveal, SectionTitle } from './Reveal'

export function Experience() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  // Fills while the timeline goes from 75% down the viewport (top) to 60% (bottom),
  // in whole blocks, like a health bar.
  useScrollProgress(
    () => {
      const el = ref.current
      if (!el) return 0
      const { top, height } = el.getBoundingClientRect()
      const vh = window.innerHeight
      return (vh * 0.75 - top) / (height + vh * 0.15)
    },
    (p) => fillRef.current?.style.setProperty('transform', `scaleY(${Math.floor(p * 24) / 24})`),
  )

  return (
    <section id="experience" className="section">
      <SectionTitle title={t.experience.title} />
      <div className="timeline" ref={ref}>
        <div className="timeline-line">
          <div className="timeline-fill" ref={fillRef} />
        </div>
        {t.experience.items.map((item, i) => (
          <Reveal key={item.role} delay={0.05} className="timeline-item">
            <span className={`timeline-dot ${i === 0 ? 'current' : ''}`} />
            <div className={`card timeline-card ${i === 0 ? 'current px-box' : ''}`}>
              {i === 0 && <span className="here">{t.experience.here}</span>}
              <span className="period">{item.period}</span>
              <h3>{item.role}</h3>
              <span className="org">{item.org}</span>
              <ul>
                {item.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
