// Tiny 8-bit sound effects synthesized with Web Audio (square waves), no audio files.
// Off by default; the visitor turns them on in the navbar and the choice is remembered.

const KEY = 'sound'
let ctx: AudioContext | null = null
let enabled = (() => {
  try {
    return localStorage.getItem(KEY) === 'on'
  } catch {
    return false
  }
})()
const listeners = new Set<(on: boolean) => void>()

export const isSoundOn = () => enabled

export function setSound(on: boolean) {
  enabled = on
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off')
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((l) => l(on))
}

export function onSoundChange(l: (on: boolean) => void) {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}

type Note = { f: number; d: number; to?: number }

function play(notes: Note[], force = false) {
  if (!enabled && !force) return
  if (document.documentElement.dataset.mode === 'recruiter') return
  try {
    ctx ??= new AudioContext()
    if (ctx.state === 'suspended') void ctx.resume()
    let t = ctx.currentTime
    for (const { f, d, to } of notes) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'square'
      osc.frequency.setValueAtTime(f, t)
      if (to) osc.frequency.exponentialRampToValueAtTime(to, t + d)
      gain.gain.setValueAtTime(0.045, t)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + d)
      osc.connect(gain).connect(ctx.destination)
      osc.start(t)
      osc.stop(t + d)
      t += d * 0.9
    }
  } catch {
    /* audio unavailable */
  }
}

export const sfx = {
  /** Menu cursor blip, for clicks on links and buttons. */
  blip: () => play([{ f: 880, d: 0.05 }]),
  /** Rising arpeggio, for going to the light theme and turning sound on. */
  powerUp: (force = false) =>
    play(
      [
        { f: 523, d: 0.07 },
        { f: 659, d: 0.07 },
        { f: 784, d: 0.07 },
        { f: 1047, d: 0.12 },
      ],
      force,
    ),
  /** Falling sweep, for going back to the dark theme. */
  powerDown: () => play([{ f: 900, d: 0.28, to: 160 }]),
  /** Coin, for copying the email. */
  coin: () =>
    play([
      { f: 988, d: 0.07 },
      { f: 1319, d: 0.25 },
    ]),
  /** Jump, for picking up a card to drag. */
  jump: () => play([{ f: 300, d: 0.14, to: 700 }]),
}
