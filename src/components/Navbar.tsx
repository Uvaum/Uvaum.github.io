import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { useLayout } from '../layout'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const { t, lang, toggle } = useI18n()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { sections } = useLayout()
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
    <motion.header
      className={`nav ${scrolled ? 'nav-scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div className="nav-progress" style={{ scaleX: progress }} />
      <a href="#top" className="logo" onClick={() => setOpen(false)}>
        <span className="logo-bracket">&lt;</span>RO<span className="logo-bracket">/&gt;</span>
      </a>

      <nav className={`nav-links ${open ? 'open' : ''}`}>
        {ids.map((id) => (
          <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>
            {t.nav[id]}
            {active === id && <motion.span layoutId="nav-dot" className="nav-dot" />}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <ThemeToggle />
        <button className="lang-toggle" onClick={toggle} aria-label="Mudar idioma / Change language">
          <span className={lang === 'pt' ? 'on' : ''}>PT</span>
          <span className={lang === 'en' ? 'on' : ''}>EN</span>
        </button>
        <button className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <span />
          <span />
        </button>
      </div>
    </motion.header>
  )
}
