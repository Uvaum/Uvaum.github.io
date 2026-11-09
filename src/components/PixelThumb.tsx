import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion, useInView } from '../hooks'

// Widths the label art is drawn at: chunky by default, sharpening in steps on hover.
const LOW = 48
const SHARP = [96, 192, 600]

/**
 * A remote image redrawn on a tiny canvas and scaled up with crisp pixels, like a cartridge
 * label. Hovering the card "focuses" it in a few discrete steps. Loads only near the viewport.
 */
export function PixelThumb({ src, alt, hover }: { src: string; alt: string; hover: boolean }) {
  // If the image can't load, the cartridge gets a plain generated label instead.
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const inView = useInView(wrap, { margin: '200px' })
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!inView) return
    const im = new Image()
    im.decoding = 'async'
    im.onload = () => setImg(im)
    im.onerror = () => setFailed(true)
    im.src = src
  }, [inView, src])

  useEffect(() => {
    const c = canvas.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx || !img) return
    const draw = (w: number) => {
      c.width = w
      c.height = Math.round((w * img.naturalHeight) / img.naturalWidth)
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(img, 0, 0, c.width, c.height)
    }
    if (!hover || prefersReducedMotion()) {
      draw(hover ? SHARP[SHARP.length - 1] : LOW)
      return
    }
    const ids = SHARP.map((w, i) => window.setTimeout(() => draw(w), i * 70))
    return () => ids.forEach(clearTimeout)
  }, [img, hover])

  return (
    <div ref={wrap} className={`thumb ${img ? 'ready' : ''} ${failed ? 'failed' : ''}`}>
      {failed ? (
        <span className="thumb-label" aria-hidden>
          {alt.replace(/[-_]/g, ' ')}
        </span>
      ) : (
        <canvas ref={canvas} role="img" aria-label={alt} />
      )}
    </div>
  )
}
