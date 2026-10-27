import { useEffect, useState } from 'react'
import { profile } from '../data/content'
import { useI18n } from '../i18n'
import { applyOrder, useLayout } from '../layout'
import { Reveal, SectionTitle } from './Reveal'
import { DragHandle, SortableItem, SortableList } from './Sortable'
import { TiltCard } from './TiltCard'

type Repo = {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  pushed_at: string
  fork: boolean
}

const langColors: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  'C#': '#178600',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#663399',
}

const MAX = 6

export function Repos() {
  const { t, lang } = useI18n()
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [error, setError] = useState(false)
  const { cardOrder, setCardOrder } = useLayout()
  const shown = repos && applyOrder(repos, cardOrder('repos'), (r) => String(r.id))

  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`https://api.github.com/users/${profile.github}/repos?per_page=100&sort=pushed`, { signal: ctrl.signal })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status))
        return r.json() as Promise<Repo[]>
      })
      .then((data) => setRepos(data.filter((r) => !r.fork).slice(0, MAX)))
      .catch((e) => {
        if (e.name !== 'AbortError') setError(true)
      })
    return () => ctrl.abort()
  }, [])

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric' })

  return (
    <section id="repos" className="section">
      <SectionTitle title={t.repos.title} subtitle={t.repos.subtitle} />

      {error && <p className="muted center">{t.repos.error}</p>}

      {!shown && !error && (
        <div className="repos-grid">
          {Array.from({ length: MAX }, (_, i) => (
            <div key={i} className="card repo-card skeleton" />
          ))}
        </div>
      )}

      {shown && (
        <SortableList ids={shown.map((r) => String(r.id))} onReorder={(ids) => setCardOrder('repos', ids)}>
          <div className="repos-grid">
            {shown.map((r, i) => (
              <SortableItem key={r.id} id={String(r.id)}>
                <Reveal delay={(i % 3) * 0.08}>
                  <TiltCard className="repo-card">
                    <div className="repo-head">
                      <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden>
                        <path
                          fill="currentColor"
                          d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"
                        />
                      </svg>
                      <h3>
                        <a href={r.html_url} target="_blank" rel="noreferrer" className="stretched-link">
                          {r.name.replace(/[-_]/g, ' ')}
                        </a>
                      </h3>
                      <span className="arrow">↗</span>
                      <DragHandle />
                    </div>
                    {r.description && <p>{r.description}</p>}
                    <div className="repo-meta">
                      {r.language && (
                        <span>
                          <i style={{ background: langColors[r.language] ?? '#a855f7' }} />
                          {r.language}
                        </span>
                      )}
                      {r.stargazers_count > 0 && <span>★ {r.stargazers_count}</span>}
                      <span>
                        {t.repos.updated} {fmt(r.pushed_at)}
                      </span>
                    </div>
                  </TiltCard>
                </Reveal>
              </SortableItem>
            ))}
          </div>
        </SortableList>
      )}

      <Reveal className="center">
        <a
          href={`https://github.com/${profile.github}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost"
        >
          {t.repos.all}
        </a>
      </Reveal>
    </section>
  )
}
