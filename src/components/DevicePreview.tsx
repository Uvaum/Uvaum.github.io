import { lazy, Suspense, useCallback, useState } from 'react'
import { useI18n } from '../i18n'

const PreviewModal = lazy(() => import('./PreviewModal'))

const phone = 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 2v16h10V4H7Zm4 13h2v2h-2v-2Z'
const laptop = 'M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10h2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2h2V5Zm2 0v10h12V5H6Z'

// Inside the preview iframe the page renders without this widget, avoiding nested previews.
export const isEmbedded = new URLSearchParams(window.location.search).has('embed')

export function DevicePreview() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      <button className="preview-fab" onClick={() => setOpen(true)}>
        <span className="fab-icons">
          {[phone, laptop].map((d) => (
            <svg key={d} viewBox="0 0 24 24" width="18" height="18" aria-hidden>
              <path fill="currentColor" d={d} />
            </svg>
          ))}
        </span>
        <span className="fab-label">{t.preview.button}</span>
      </button>
      {open && (
        <Suspense fallback={null}>
          <PreviewModal onClose={close} />
        </Suspense>
      )}
    </>
  )
}
