import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { DragHandle } from './Sortable'

type Props = { children: ReactNode; delay?: number; y?: number; className?: string }

export function Reveal({ children, delay = 0, y = 32, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
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
