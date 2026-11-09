import { useI18n } from '../i18n'
import { applyOrder, useLayout } from '../layout'
import { Reveal, SectionTitle } from './Reveal'
import { DragHandle, SortableItem, SortableList } from './Sortable'
import { TiltCard } from './TiltCard'

type Metric = { value: string; label: string }

export function Cases() {
  const { t } = useI18n()
  const { cardOrder, setCardOrder } = useLayout()
  // Ids are positional so the saved order survives switching language.
  const items = applyOrder(
    t.cases.items.map((c, i) => ({ ...c, id: `case-${i}`, n: i + 1 })),
    cardOrder('cases'),
    (c) => c.id,
  )

  return (
    <section id="cases" className="section">
      <SectionTitle title={t.cases.title} subtitle={t.cases.subtitle} />
      <SortableList ids={items.map((c) => c.id)} onReorder={(ids) => setCardOrder('cases', ids)}>
        <div className="cases-grid">
          {items.map((c, i) => {
            const metric = (c as { metric?: Metric }).metric
            return (
              <SortableItem key={c.id} id={c.id}>
                <Reveal delay={(i % 2) * 0.12}>
                  <TiltCard className="case-card">
                    <div className="mission-bar">
                      <span>
                        {t.cases.mission} {String(c.n).padStart(2, '0')}
                      </span>
                      <span className="cleared">★ {t.cases.done}</span>
                    </div>
                    <div className="card-head">
                      <h3>{c.title}</h3>
                      <DragHandle />
                    </div>
                    {metric && (
                      <div className="metric">
                        <strong>{metric.value}</strong>
                        <span>{metric.label}</span>
                      </div>
                    )}
                    <ol className="mission-steps">
                      <li>
                        <span className="label">{t.cases.problem}</span>
                        <p>{c.problem}</p>
                      </li>
                      <li>
                        <span className="label">{t.cases.solution}</span>
                        <p>{c.solution}</p>
                      </li>
                      <li className="outcome">
                        <span className="label accent">{t.cases.result}</span>
                        <p>{c.result}</p>
                      </li>
                    </ol>
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
            )
          })}
        </div>
      </SortableList>
    </section>
  )
}
