import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { content, type Content, type Lang } from './data/content'

type I18n = { lang: Lang; t: Content; toggle: () => void }

const I18nContext = createContext<I18n | null>(null)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'pt' || saved === 'en') return saved
  } catch {
    /* storage unavailable */
  }
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang])

  const toggle = () => setLang((l) => (l === 'pt' ? 'en' : 'pt'))

  return <I18nContext.Provider value={{ lang, t: content[lang], toggle }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}
