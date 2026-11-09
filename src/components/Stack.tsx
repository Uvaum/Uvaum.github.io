import type { CSSProperties } from 'react'
import { stack } from '../data/content'
import { useI18n } from '../i18n'
import { applyOrder, useLayout } from '../layout'
import { Reveal, SectionTitle } from './Reveal'
import { DragHandle, SortableItem, SortableList } from './Sortable'

export function Stack() {
  const { t } = useI18n()
  const { cardOrder, setCardOrder } = useLayout()
  const groups = applyOrder(stack, cardOrder('stack'), (g) => g.group)

  return (
    <section id="stack" className="section">
      <SectionTitle title={t.stackTitle} subtitle={t.stackSubtitle} />

      <SortableList ids={groups.map((g) => g.group)} onReorder={(ids) => setCardOrder('stack', ids)}>
        <div className="stack-grid">
          {groups.map((g, gi) => (
            <SortableItem key={g.group} id={g.group}>
              <Reveal delay={gi * 0.1} className="stack-group">
                <div className="card-head">
                  <h3>{g.group}</h3>
                  <DragHandle />
                </div>
                <div className="chips">
                  {g.items.map((item, i) => (
                    <span
                      key={item}
                      className="chip pop"
                      style={{ '--d': `${gi * 0.1 + i * 0.05}s` } as CSSProperties}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            </SortableItem>
          ))}
        </div>
      </SortableList>
    </section>
  )
}
