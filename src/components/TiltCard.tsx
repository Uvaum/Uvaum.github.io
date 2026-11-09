import type { ReactNode } from 'react'

/** Pixel-bordered card that hops up on hover (the hop and hard shadow live in CSS). */
export function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`card px-box hop ${className}`}>{children}</div>
}
