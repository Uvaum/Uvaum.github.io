import { useState } from 'react'
import { useI18n } from '../i18n'
import { useLayout } from '../layout'
import { GripIcon } from './Sortable'

export function ResetLayout() {
  const { t } = useI18n()
  const { customized, reset } = useLayout()
  const [done, setDone] = useState(false)
  const [before, after] = t.layout.hint.split('⠿')

  const onReset = () => {
    reset()
    setDone(true)
    setTimeout(() => setDone(false), 2000)
  }

  return (
    <div className="layout-bar">
      <p>
        {before}
        <GripIcon size={14} />
        {after}
      </p>
      <button className="btn btn-ghost reset-btn" onClick={onReset} disabled={!customized && !done}>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden className={done ? 'spin-back' : ''}>
          <path fill="currentColor" d="M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7Z" />
        </svg>
        <span key={done ? 'done' : 'reset'} className={done ? 'swap-in' : ''}>
          {done ? t.layout.done : t.layout.reset}
        </span>
      </button>
    </div>
  )
}
