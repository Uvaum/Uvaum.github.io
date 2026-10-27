import { AnimatePresence, motion } from 'framer-motion'
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
      <motion.button
        className="btn btn-ghost reset-btn"
        onClick={onReset}
        disabled={!customized && !done}
        whileTap={{ scale: 0.95 }}
      >
        <motion.svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          aria-hidden
          animate={{ rotate: done ? -360 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <path fill="currentColor" d="M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7Z" />
        </motion.svg>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={done ? 'done' : 'reset'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            {done ? t.layout.done : t.layout.reset}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
