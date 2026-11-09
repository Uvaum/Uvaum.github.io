import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'

const devices = {
  phone: { w: 390, h: 844, rotatable: true },
  tablet: { w: 820, h: 1180, rotatable: true },
  laptop: { w: 1366, h: 768, rotatable: false },
  desktop: { w: 1920, h: 1080, rotatable: false },
} as const

type Device = keyof typeof devices

const icons: Record<Device, string> = {
  phone: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 2v16h10V4H7Zm4 13h2v2h-2v-2Z',
  tablet: 'M5 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 2v16h14V4H5Zm6 13h2v2h-2v-2Z',
  laptop: 'M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10h2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2h2V5Zm2 0v10h12V5H6Z',
  desktop: 'M3 4h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-7v2h3v2H7v-2h3v-2H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1 2v9h16V6H4Z',
}

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path fill="currentColor" d={d} />
    </svg>
  )
}

/** The device-preview dialog. Loaded on demand, the first time someone opens it. */
export default function PreviewModal({ onClose }: { onClose: () => void }) {
  const { t } = useI18n()
  const [device, setDevice] = useState<Device>('phone')
  const [landscape, setLandscape] = useState(false)
  const [scale, setScale] = useState(1)
  const stageRef = useRef<HTMLDivElement>(null)

  const spec = devices[device]
  const rotated = landscape && spec.rotatable
  const w = rotated ? spec.h : spec.w
  const h = rotated ? spec.w : spec.h

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const fit = () => {
      const pad = 28 // frame bezel
      setScale(Math.min(1, (stage.clientWidth - pad) / w, (stage.clientHeight - pad) / h))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(stage)
    return () => ro.disconnect()
  }, [w, h])

  return (
    <div
      className="preview-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={t.preview.title}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="preview-panel">
        <div className="preview-head">
          <div>
            <h3>{t.preview.title}</h3>
            <p>{t.preview.hint}</p>
          </div>
          <button className="preview-close" onClick={onClose} aria-label={t.preview.close}>
            ✕
          </button>
        </div>

        <div className="preview-toolbar">
          <div className="device-tabs" role="tablist">
            {(Object.keys(devices) as Device[]).map((d) => (
              <button
                key={d}
                role="tab"
                aria-selected={device === d}
                className={device === d ? 'on' : ''}
                onClick={() => setDevice(d)}
              >
                {device === d && <span className="device-pill" />}
                <Icon d={icons[d]} />
                <span className="device-name">{t.preview.devices[d]}</span>
              </button>
            ))}
          </div>
          <div className="preview-meta mono">
            <span>
              {w} × {h}
            </span>
            <span>{Math.round(scale * 100)}%</span>
            {spec.rotatable && (
              <button className="rotate" onClick={() => setLandscape((l) => !l)}>
                ⟳ {t.preview.rotate}
              </button>
            )}
          </div>
        </div>

        <div className="preview-stage" ref={stageRef}>
          <div
            className={`device-frame device-${device}`}
            style={{ width: w * scale + 28, height: h * scale + 28 }}
          >
            <iframe
              title={t.preview.title}
              src={`${import.meta.env.BASE_URL}?embed=1`}
              style={{ width: w, height: h, transform: `scale(${scale})` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
