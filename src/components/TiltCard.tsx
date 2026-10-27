import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'

export function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 })
  const gx = useTransform(px, (v) => `${v * 100}%`)
  const gy = useTransform(py, (v) => `${v * 100}%`)
  const glare = useMotionTemplate`radial-gradient(400px circle at ${gx} ${gy}, rgba(var(--accent-rgb), 0.18), transparent 60%)`

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      className={`card tilt ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div className="tilt-glare" style={{ background: glare }} />
      {children}
    </motion.div>
  )
}
