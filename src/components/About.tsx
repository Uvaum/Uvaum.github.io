import { motion } from 'framer-motion'
import { profile } from '../data/content'
import { useI18n } from '../i18n'
import { Reveal, SectionTitle } from './Reveal'
import { TenureStat } from './TenureStat'

const icons: Record<string, string> = {
  pin: 'M12 2a7 7 0 0 1 7 7c0 5.2-7 13-7 13S5 14.2 5 9a7 7 0 0 1 7-7Zm0 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z',
  grad: 'M12 3 1 9l11 6 9-4.9V17h2V9L12 3ZM5 13.2v4L12 21l7-3.8v-4L12 17l-7-3.8Z',
  work: 'M9 3h6a2 2 0 0 1 2 2v2h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3V5a2 2 0 0 1 2-2Zm0 4h6V5H9v2Z',
  target:
    'M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z',
  globe:
    'M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm-1.9 2.2A8 8 0 0 0 4.06 11h3.97c.12-2.5.82-4.9 2.07-6.8ZM13.9 4.2c1.25 1.9 1.95 4.3 2.07 6.8h3.97a8 8 0 0 0-6.04-6.8ZM12 4.6c-1.2 1.6-1.85 3.9-1.97 6.4h3.94c-.12-2.5-.77-4.8-1.97-6.4ZM4.06 13a8 8 0 0 0 6.04 6.8C8.85 17.9 8.15 15.5 8.03 13H4.06Zm5.97 0c.12 2.5.77 4.8 1.97 6.4 1.2-1.6 1.85-3.9 1.97-6.4h-3.94Zm5.94 0c-.12 2.5-.82 4.9-2.07 6.8a8 8 0 0 0 6.04-6.8h-3.97Z',
}

export function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="section">
      <SectionTitle title={t.about.title} />
      <div className="about-grid">
        <Reveal className="profile-card-wrap">
          <div className="profile-card">
            <div className="profile-head">
              <div>
                <strong>{profile.name}</strong>
                <span className="role">Full Stack Developer</span>
              </div>
              <span className="status">
                <span className="pulse" />
                {t.about.available}
              </span>
            </div>
            <ul className="facts">
              {t.about.facts.map((f, i) => (
                <motion.li
                  key={f.icon}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                >
                  <span className="fact-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
                      <path fill="currentColor" d={icons[f.icon]} />
                    </svg>
                  </span>
                  <span className="fact-text">
                    <small>{f.label}</small>
                    {f.value}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="about-text">
          {t.about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p>{p}</p>
            </Reveal>
          ))}
          <div className="stats">
            <TenureStat />
            {t.about.stats.map((s, i) => (
              <Reveal key={s.label} delay={0.3 + i * 0.1} className="stat">
                <strong className="gradient-text">{s.value}</strong>
                <span>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
