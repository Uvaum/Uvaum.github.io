import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export function Background() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 120, damping: 20 })
  const sy = useSpring(y, { stiffness: 120, damping: 20 })

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 200)
      y.set(e.clientY - 200)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return (
    <div className="bg" aria-hidden>
      <div className="bg-grid" />
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <motion.div className="cursor-glow" style={{ x: sx, y: sy }} />
      <div className="noise" />
    </div>
  )
}
