import { useI18n } from '../i18n'
import { applyOrder, useLayout } from '../layout'
import { Reveal, SectionTitle } from './Reveal'
import { DragHandle, SortableItem, SortableList } from './Sortable'
import { TiltCard } from './TiltCard'

export function Cases() {
  const { t } = useI18n()
  const { cardOrder, setCardOrder } = useLayout()
  // Ids are positional so the saved order survives switching language.
  const items = applyOrder(
    t.cases.items.map((c, i) => ({ ...c, id: `case-${i}` })),
    cardOrder('cases'),
    (c) => c.id,
  )

  return (
    <section id="cases" className="section">
      <SectionTitle title={t.cases.title} subtitle={t.cases.subtitle} />
      <SortableList ids={items.map((c) => c.id)} onReorder={(ids) => setCardOrder('cases', ids)}>
        <div className="cases-grid">
          {items.map((c, i) => (
            <SortableItem key={c.id} id={c.id}>
              <Reveal delay={(i % 2) * 0.12}>
                <TiltCard className="case-card">
                  <div className="card-head">
                    <h3>{c.title}</h3>
                    <DragHandle />
                  </div>
                  <div className="case-block">
                    <span className="label">{t.cases.problem}</span>
                    <p>{c.problem}</p>
                  </div>
                  <div className="case-block">
                    <span className="label accent">{t.cases.solution}</span>
                    <p>{c.solution}</p>
                  </div>
                  <div className="tags">
                    {c.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>
            </SortableItem>
          ))}
        </div>
      </SortableList>
    </section>
  )
}
