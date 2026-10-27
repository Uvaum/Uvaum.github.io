import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export const defaultSections = ['about', 'stack', 'experience', 'cases', 'repos'] as const
export type SectionId = (typeof defaultSections)[number]

// Card lists that can be reordered; an empty list means "default order".
type CardList = 'stack' | 'cases' | 'repos'

type Saved = { sections: SectionId[]; cards: Partial<Record<CardList, string[]>> }

type LayoutCtx = {
  sections: SectionId[]
  setSections: (ids: SectionId[]) => void
  cardOrder: (list: CardList) => string[] | undefined
  setCardOrder: (list: CardList, ids: string[]) => void
  customized: boolean
  reset: () => void
}

const KEY = 'layout-v1'
const defaults: Saved = { sections: [...defaultSections], cards: {} }

function load(): Saved {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaults
    const saved = JSON.parse(raw) as Saved
    const valid = saved.sections.filter((s) => defaultSections.includes(s))
    // Keep sections added in later versions of the site.
    const sections = [...valid, ...defaultSections.filter((s) => !valid.includes(s))]
    return { sections, cards: saved.cards ?? {} }
  } catch {
    return defaults
  }
}

/** Sorts items by a saved id order; items missing from it keep their original order at the end. */
export function applyOrder<T>(items: T[], order: string[] | undefined, getId: (item: T) => string): T[] {
  if (!order?.length) return items
  const rank = new Map(order.map((id, i) => [id, i]))
  return [...items].sort((a, b) => (rank.get(getId(a)) ?? Infinity) - (rank.get(getId(b)) ?? Infinity))
}

const Ctx = createContext<LayoutCtx | null>(null)

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Saved>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable */
    }
  }, [state])

  const customized =
    state.sections.some((s, i) => s !== defaultSections[i]) || Object.values(state.cards).some((c) => c?.length)

  const value: LayoutCtx = {
    sections: state.sections,
    setSections: (sections) => setState((s) => ({ ...s, sections })),
    cardOrder: (list) => state.cards[list],
    setCardOrder: (list, ids) => setState((s) => ({ ...s, cards: { ...s.cards, [list]: ids } })),
    customized,
    reset: () => setState(defaults),
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useLayout() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLayout must be used inside LayoutProvider')
  return ctx
}
