import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { profile } from '../data/content'
import { useI18n } from '../i18n'

function useTypewriter(words: string[]) {
  const reduce = useReducedMotion()
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
    if (reduce) {
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
  }, [text, deleting, index, words, reduce])

  return text
}

const code = [
  [['kw', 'class '], ['fn', 'ReportViewSet'], ['p', '(ModelViewSet):']],
  [['p', '    queryset = Report.objects.'], ['fn', 'all'], ['p', '()']],
  [['p', '    serializer_class = ReportSerializer']],
  [['p', '    permission_classes = [IsAuthenticated]']],
  [],
  [['p', '    '], ['dec', '@action'], ['p', '(detail='], ['kw', 'False'], ['p', ')']],
  [['p', '    '], ['kw', 'def '], ['fn', 'summary'], ['p', '(self, request):']],
  [['p', '        total = self.'], ['fn', 'get_queryset'], ['p', '().'], ['fn', 'count'], ['p', '()']],
  [['p', '        '], ['kw', 'return '], ['fn', 'Response'], ['p', '({'], ['str', '"total"'], ['p', ': total}, '], ['num', '200'], ['p', ')']],
] as const

export function Hero() {
  const { t } = useI18n()
  const role = useTypewriter(t.hero.roles)
  const words = profile.name.split(' ')

  return (
    <section id="top" className="hero">
      <div className="hero-text">
        <motion.span
          className="badge"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="pulse" />
          {t.hero.available}
        </motion.span>

        <motion.p className="hello" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          {t.hero.hello}
        </motion.p>

        <h1 className="hero-name" aria-label={profile.name}>
          {words.map((word, w) => (
            <span key={w} className="hero-word" aria-hidden>
              {word.split('').map((l, i) => {
                const n = words.slice(0, w).join('').length + w + i
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 60, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.45 + n * 0.04, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {l}
                  </motion.span>
                )
              })}
            </span>
          ))}
        </h1>

        <motion.p className="hero-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <span className="mono">&gt; </span>
          <span className="gradient-text">{role}</span>
          <span className="caret" />
        </motion.p>

        <motion.p
          className="hero-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6 }}
        >
          {t.hero.summary}
        </motion.p>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <a href="#cases" className="btn btn-primary">
            {t.hero.ctaPrimary}
          </a>
          <a href="#contact" className="btn btn-ghost">
            {t.hero.ctaSecondary}
          </a>
        </motion.div>
      </div>

      <motion.div
        className="code-window"
        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6, rotate: 0.5 }}
      >
        <div className="code-bar">
          <span />
          <span />
          <span />
          <em>api/views.py</em>
        </div>
        <pre>
          {code.map((line, i) => (
            <motion.div
              key={i}
              className="code-line"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 + i * 0.12 }}
            >
              <span className="ln">{i + 1}</span>
              {line.map(([cls, txt], j) => (
                <span key={j} className={`tk-${cls}`}>
                  {txt}
                </span>
              ))}
            </motion.div>
          ))}
        </pre>
        <div className="code-glow" />
      </motion.div>

      <motion.a
        href="#about"
        className="scroll-hint"
        aria-label="Scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 2 }, y: { repeat: Infinity, duration: 1.8 } }}
      >
        <span />
      </motion.a>
    </section>
  )
}
