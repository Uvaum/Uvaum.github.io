import { motion, useScroll } from 'framer-motion'
import { useRef } from 'react'
import { useI18n } from '../i18n'
import { Reveal, SectionTitle } from './Reveal'

export function Experience() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })

  return (
    <section id="experience" className="section">
      <SectionTitle title={t.experience.title} />
      <div className="timeline" ref={ref}>
        <div className="timeline-line">
          <motion.div className="timeline-fill" style={{ scaleY: scrollYProgress }} />
        </div>
        {t.experience.items.map((item, i) => (
          <Reveal key={item.role} delay={0.05} className="timeline-item">
            <motion.span
              className="timeline-dot"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            />
            <div className={`card timeline-card ${i === 0 ? 'current' : ''}`}>
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
