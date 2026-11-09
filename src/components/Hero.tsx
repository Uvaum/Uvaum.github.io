import { useEffect, useState, type CSSProperties } from 'react'
import { profile } from '../data/content'
import { prefersReducedMotion } from '../hooks'
import { useI18n } from '../i18n'
import { setRecruiter } from '../mode'
import { CharacterSheet } from './CharacterSheet'
import { PixelArt, grapeSprite } from './PixelArt'

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    setIndex(0)
    setText('')
    setDeleting(false)
  }, [words])

  useEffect(() => {
    const word = words[index % words.length]
    if (prefersReducedMotion()) {
      setText(word)
      const id = setTimeout(() => setIndex((i) => i + 1), 2500)
      return () => clearTimeout(id)
    }
    let delay = deleting ? 40 : 85
    if (!deleting && text === word) delay = 1600
    if (deleting && text === '') delay = 300

    const id = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => i + 1)
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)
    return () => clearTimeout(id)
  }, [text, deleting, index, words])

  return text
}

/** Intro animation delay, in seconds (the keyframes live in CSS, see .intro). */
const at = (d: number) => ({ '--d': `${d}s` }) as CSSProperties

export function Hero() {
  const { t } = useI18n()
  const role = useTypewriter(t.hero.roles)
  const words = profile.name.split(' ')

  return (
    <section id="top" className="hero">
      <div className="hero-text">
        <span className="badge intro fade" style={at(0.2)}>
          <span className="pulse" />
          {t.hero.available}
        </span>

        <p className="hello intro fade" style={at(0.3)}>
          {t.hero.hello}
        </p>

        <h1 className="hero-name" aria-label={profile.name}>
          {words.map((word, w) => (
            <span key={w} className="hero-word" aria-hidden>
              {word.split('').map((l, i) => {
                const n = words.slice(0, w).join('').length + i
                return (
                  <span key={i} className="hero-letter intro drop" style={at(0.35 + n * 0.05)}>
                    {l}
                  </span>
                )
              })}
            </span>
          ))}
        </h1>

        <p className="hero-role intro fade" style={at(1)}>
          <span className="prompt">&gt;</span>
          <span className="role-text">{role}</span>
          <span className="caret" />
        </p>

        <p className="hero-summary intro slide-up" style={at(0.15)}>
          {t.hero.summary}
        </p>

        <div className="hero-ctas intro rise" style={at(1.1)}>
          <a href="#cases" className="btn btn-primary">
            {t.hero.ctaPrimary}
          </a>
          <a href="#contact" className="btn btn-ghost">
            {t.hero.ctaSecondary}
          </a>
        </div>

        <button className="skip-link intro fade" style={at(1.3)} onClick={() => setRecruiter(true)}>
          {t.hero.skip} »
        </button>
      </div>

      <div className="hero-art intro rise-big" style={at(0.6)}>
        <div className="mascot" aria-hidden>
          <PixelArt rows={grapeSprite} size={78} />
          <span className="mascot-shadow" />
        </div>
        <CharacterSheet />
      </div>

      <a href="#about" className="scroll-hint intro fade" style={at(2)}>
        <span className="blink">▼ {t.hero.start}</span>
      </a>
    </section>
  )
}
