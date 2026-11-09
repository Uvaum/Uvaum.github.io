import { useRef, type CSSProperties, type ReactNode } from 'react'
import { useInView } from '../hooks'
import { DragHandle } from './Sortable'

type Props = { children: ReactNode; delay?: number; y?: number; className?: string }

/** Fades and steps content up into place (in CSS, see .rv) the first time it scrolls into view. */
export function Reveal({ children, delay = 0, y = 32, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  return (
    <div
      ref={ref}
      className={`rv ${inView ? 'in' : ''} ${className}`}
      style={{ '--d': `${delay}s`, '--ry': `${y}px` } as CSSProperties}
    >
      {children}
    </div>
  )
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <Reveal className="section-title">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <DragHandle className="section-handle" />
    </Reveal>
  )
}
