import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { profile } from '../data/content'
import { useI18n } from '../i18n'
import { ResetLayout } from './ResetLayout'
import { Reveal } from './Reveal'

const icons = {
  linkedin:
    'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
  github:
    'M12 .3a12 12 0 0 0-3.8 23.38c.6.12.82-.26.82-.57v-2c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3',
  mail: 'M2 4h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.5l10 6.25L22 6.5V6H2Zm20 2.85-9.47 5.92a1 1 0 0 1-1.06 0L2 8.85V18h20V8.85Z',
}

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
      <path fill="currentColor" d={d} />
    </svg>
  )
}

export function Contact() {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="section contact">
      <Reveal className="contact-card">
        <h2>
          <span className="gradient-text">{t.contact.title}</span>
        </h2>
        <p>{t.contact.text}</p>

        <div className="contact-links">
          <motion.a whileHover={{ y: -4 }} href={profile.linkedin} target="_blank" rel="noreferrer" className="social">
            <Icon d={icons.linkedin} /> LinkedIn
          </motion.a>
          <motion.a
            whileHover={{ y: -4 }}
            href={`https://github.com/${profile.github}`}
            target="_blank"
            rel="noreferrer"
            className="social"
          >
            <Icon d={icons.github} /> GitHub
          </motion.a>
          <motion.a whileHover={{ y: -4 }} href={`mailto:${profile.email}`} className="social">
            <Icon d={icons.mail} /> E-mail
          </motion.a>
        </div>

        <button className="email-copy mono" onClick={copy}>
          {profile.email}
          <AnimatePresence mode="wait">
            <motion.span
              key={copied ? 'ok' : 'copy'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="copy-label"
            >
              {copied ? t.contact.copied : t.contact.copy}
            </motion.span>
          </AnimatePresence>
        </button>
      </Reveal>

      <ResetLayout />

      <footer className="footer">
        © {new Date().getFullYear()} {profile.name}. {t.footer}
      </footer>
    </section>
  )
}
