import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { isSoundOn, onSoundChange, setSound, sfx } from '../sfx'
import { PixelArt, speakerOff, speakerOn } from './PixelArt'

export function SoundToggle() {
  const { lang } = useI18n()
  const [on, setOn] = useState(isSoundOn)

  useEffect(() => onSoundChange(setOn), [])

  // One delegated listener plays a blip for every link and button on the page.
  useEffect(() => {
    const onClick = (e: globalThis.MouseEvent) => {
      const el = (e.target as Element | null)?.closest('a, button')
      if (el && !el.hasAttribute('data-nosfx')) sfx.blip()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const label = lang === 'pt' ? (on ? 'Desligar sons' : 'Ligar sons 8-bit') : on ? 'Turn sound off' : 'Turn 8-bit sound on'

  return (
    <button
      className={`icon-btn sound-toggle ${on ? 'on' : ''}`}
      data-nosfx
      onClick={() => {
        setSound(!on)
        if (!on) sfx.powerUp(true)
      }}
      aria-label={label}
      aria-pressed={on}
      title={label}
    >
      <PixelArt key={String(on)} rows={on ? speakerOn : speakerOff} size={18} className="icon-pop" />
    </button>
  )
}
