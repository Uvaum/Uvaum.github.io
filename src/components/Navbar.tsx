import { useEffect, useRef, useState } from 'react'
import { useScrollProgress } from '../hooks'
import { useI18n } from '../i18n'
import { useLayout } from '../layout'
import { setRecruiter, useRecruiter } from '../mode'
import { PixelArt, grapeSprite } from './PixelArt'
import { SoundToggle } from './SoundToggle'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const { t, lang, toggle } = useI18n()
  const fillRef = useRef<HTMLDivElement>(null)
  useScrollProgress(
    () => window.scrollY / (document.documentElement.scrollHeight - window.innerHeight),
    (p) => fillRef.current?.style.setProperty('transform', `scaleX(${p})`),
  )
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { sections } = useLayout()
  const recruiter = useRecruiter()
  const ids = [...sections, 'contact' as const]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-progress">
        <div className="nav-progress-fill" ref={fillRef} />
      </div>
      <a href="#top" className="logo" onClick={() => setOpen(false)} aria-label="Rhuan Oliveira">
        <PixelArt rows={grapeSprite} size={26} className="logo-grape" />
        <span>RO</span>
      </a>

      <nav className={`nav-links ${open ? 'open' : ''}`}>
        {ids.map((id) => (
          <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>
            {active === id && <span className="nav-cursor" aria-hidden />}
            {t.nav[id]}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <button
          className={`mode-btn ${recruiter ? 'on' : ''}`}
          onClick={() => setRecruiter(!recruiter)}
          aria-pressed={recruiter}
          title={recruiter ? t.recruiter.off : t.recruiter.on}
        >
          {recruiter ? (lang === 'pt' ? 'JOGO' : 'GAME') : 'CV'}
        </button>
        {!recruiter && <SoundToggle />}
        <ThemeToggle />
        <button className="lang-toggle" onClick={toggle} title="Mudar idioma / Change language">
          <span className={lang === 'pt' ? 'on' : ''}>PT</span>
          <span className={lang === 'en' ? 'on' : ''}>EN</span>
        </button>
        <button className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
