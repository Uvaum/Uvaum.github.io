import { useState } from 'react'
import { profile, stack } from '../data/content'
import { useI18n } from '../i18n'
import { setRecruiter } from '../mode'

/** One-page, no-frills summary shown at the top in recruiter mode. It is also what prints as a CV. */
export function RecruiterSummary() {
  const { t } = useI18n()
  const r = t.recruiter
  const [copied, setCopied] = useState(false)
  const where = t.about.facts.find((f) => f.icon === 'pin')?.value
  const model = t.about.facts.find((f) => f.icon === 'globe')?.value

  const share = async () => {
    try {
      await navigator.clipboard.writeText(`${location.origin}${location.pathname}?mode=recruiter`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section className="cv" aria-labelledby="cv-title">
      <div className="cv-actions no-print">
        <p>
          <strong id="cv-title">{r.title}</strong> {r.lead}
        </p>
        <div>
          <button className="btn btn-primary" onClick={() => window.print()}>
            {r.print}
          </button>
          <button className="btn" onClick={share}>
            {copied ? r.copied : r.share}
          </button>
          <button className="btn btn-ghost" onClick={() => setRecruiter(false)}>
            {r.off}
          </button>
        </div>
      </div>

      <article className="cv-sheet">
        <header className="cv-head">
          <div>
            <h1>{profile.name}</h1>
            <p className="cv-role">Full Stack Developer · Python · Django · React · AWS</p>
            <p className="cv-where">
              {where} · {model}
            </p>
          </div>
          <ul className="cv-contact">
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                {profile.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </li>
            <li>
              <a href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer">
                github.com/{profile.github}
              </a>
            </li>
          </ul>
        </header>

        <p className="cv-lead">{t.hero.summary}</p>

        <h2>{r.experience}</h2>
        {t.experience.items.map((item) => (
          <div key={item.role} className="cv-job">
            <div className="cv-job-head">
              <strong>{item.role}</strong>
              <span>{item.period}</span>
            </div>
            <span className="cv-org">{item.org}</span>
            <ul>
              {item.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}

        <h2>{r.highlights}</h2>
        <ul className="cv-list">
          {t.cases.items.map((c) => (
            <li key={c.title}>
              <strong>{c.title}:</strong> {c.solution} {c.result}
            </li>
          ))}
        </ul>

        <h2>{r.stack}</h2>
        <ul className="cv-list">
          {stack.map((g) => (
            <li key={g.group}>
              <strong>{g.group}:</strong> {g.items.join(', ')}
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}
