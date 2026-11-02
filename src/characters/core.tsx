import type { CSSProperties, ReactNode } from 'react'

/**
 * idle  – blinks and glances around
 * watch – user is typing; eyes follow the text
 * shy   – password is visible; eyes close, cheeks blush
 * error – something went wrong; squint + sweat drop
 * happy – success; happy squint + blush
 * sleep – no activity for a while; eyes closed, "z z Z"
 */
export type Mood = 'idle' | 'watch' | 'shy' | 'error' | 'happy' | 'sleep'

/** Gaze direction, each axis -1..1 (x: left→right, y: up→down). */
export interface Look {
  x: number
  y: number
}

export interface CharacterProps {
  /** 0..1 – usually password strength. Default 0. */
  stretch?: number
  /** Default 'idle'. */
  mood?: Mood
  /** Where the eyes look. Default straight ahead. */
  look?: Look
  className?: string
}

/** Stretch at/above this counts as "full" (extra celebration animations). */
export const FULL_STRETCH = 0.85

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))
const clampLook = (n: number) => Math.min(1, Math.max(-1, n))

const CORE_CSS = `
.lc-root { display: block; width: 100%; height: auto; overflow: visible; }
.lc-gaze {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  transform: translate(calc(var(--look-x, 0) * var(--travel-x, 0) * 1px), calc(var(--look-y, 0) * var(--travel-y, 0) * 1px));
}
.lc-root[data-mood='idle'] .lc-glance { animation: lc-glance 6s ease-in-out infinite; }
.lc-lid {
  transform-box: fill-box; transform-origin: 50% 0%; transform: scaleY(0);
  animation: lc-blink 5s ease-in-out infinite; transition: transform 0.25s ease;
}
.lc-root[data-mood='shy'] .lc-lid,
.lc-root[data-mood='sleep'] .lc-lid { animation: none; transform: scaleY(1); }
.lc-root[data-mood='happy'] .lc-lid { animation: none; transform: scaleY(0.55); }
.lc-root[data-mood='error'] .lc-lid { animation: none; transform: scaleY(0.3); }
.lc-blush { opacity: 0; transition: opacity 0.3s ease; }
.lc-root[data-mood='shy'] .lc-blush, .lc-root[data-mood='happy'] .lc-blush { opacity: 0.8; }
.lc-sweat { opacity: 0; transition: opacity 0.2s ease; }
.lc-root[data-mood='error'] .lc-sweat { opacity: 1; animation: lc-drip 0.9s ease-in infinite; }
.lc-zzz { opacity: 0; transition: opacity 0.4s ease; }
.lc-root[data-mood='sleep'] .lc-zzz { opacity: 1; }
.lc-root[data-mood='sleep'] .lc-z { animation: lc-float 2.4s ease-in-out infinite; }
.lc-root[data-mood='sleep'] .lc-z:nth-child(2) { animation-delay: 0.4s; }
.lc-root[data-mood='sleep'] .lc-z:nth-child(3) { animation-delay: 0.8s; }
@keyframes lc-blink { 0%, 91%, 97%, 100% { transform: scaleY(0); } 94% { transform: scaleY(1); } }
@keyframes lc-glance { 0%, 70%, 100% { transform: translate(0, 0); } 76%, 90% { transform: translate(-4px, 1px); } }
@keyframes lc-drip { 0% { transform: translateY(0); } 100% { transform: translateY(8px); } }
@keyframes lc-float { 0%, 100% { opacity: 0.2; transform: translate(0, 4px); } 50% { opacity: 1; transform: translate(3px, -4px); } }
@media (prefers-reduced-motion: reduce) {
  .lc-root, .lc-root * { animation: none !important; transition: none !important; }
}
`

interface CharacterSvgProps extends CharacterProps {
  /** Root class used by the character's own CSS, e.g. "lc-dog". */
  name: string
  /** The character's own CSS. */
  css: string
  children: ReactNode
}

/**
 * Shared root for every character: 640×240 canvas, decorative only.
 * Exposes --stretch / --look-x / --look-y and data-mood / data-full to CSS.
 */
export function CharacterSvg({
  stretch = 0,
  mood = 'idle',
  look = { x: 0, y: 0 },
  className,
  name,
  css,
  children,
}: CharacterSvgProps) {
  const s = clamp01(stretch)
  return (
    <svg
      className={['lc-root', name, className].filter(Boolean).join(' ')}
      viewBox="0 0 640 240"
      data-mood={mood}
      data-full={s >= FULL_STRETCH}
      style={
        {
          '--stretch': s,
          '--look-x': clampLook(look.x),
          '--look-y': clampLook(look.y),
        } as CSSProperties
      }
      aria-hidden="true"
      focusable="false"
    >
      <style>{CORE_CSS + css}</style>
      {children}
    </svg>
  )
}

interface EyeProps {
  cx: number
  cy: number
  rx: number
  ry: number
  pupil: number
  /** Eyelid colour (usually the skin/fur colour). */
  lid: string
  outline: string
}

/** Cartoon eye that blinks, follows `look` and closes for shy/sleep. */
export function Eye({ cx, cy, rx, ry, pupil, lid, outline }: EyeProps) {
  const travel = {
    '--travel-x': Math.max(0, rx - pupil - 2),
    '--travel-y': Math.max(0, ry - pupil - 2),
  } as CSSProperties

  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#fff" />
      <g className="lc-gaze" style={travel}>
        <g className="lc-glance">
          <circle cx={cx} cy={cy} r={pupil} fill="#111" />
          <circle cx={cx + pupil * 0.35} cy={cy - pupil * 0.4} r={pupil * 0.32} fill="#fff" />
        </g>
      </g>
      <ellipse className="lc-lid" cx={cx} cy={cy} rx={rx - 0.5} ry={ry - 0.5} fill={lid} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={outline} strokeWidth="3.5" />
    </g>
  )
}

/** Pink cheek that fades in when shy or happy. */
export function Blush({ cx, cy, rx = 10, ry = 6 }: { cx: number; cy: number; rx?: number; ry?: number }) {
  return <ellipse className="lc-blush" cx={cx} cy={cy} rx={rx} ry={ry} fill="#ff7d9a" />
}

/** Nervous sweat drop shown in the "error" mood. */
export function Sweat({ x, y }: { x: number; y: number }) {
  return (
    <path
      className="lc-sweat"
      d={`M${x} ${y - 11} Q ${x + 8} ${y} ${x} ${y + 6} Q ${x - 8} ${y} ${x} ${y - 11} Z`}
      fill="#9ad8ff"
      stroke="#3a7fb0"
      strokeWidth="1.8"
    />
  )
}

/** Floating "z z Z" shown in the "sleep" mood. */
export function Zzz({ x, y }: { x: number; y: number }) {
  return (
    <g className="lc-zzz" fill="#6b7a99" fontFamily="system-ui, sans-serif" fontWeight="800">
      <text className="lc-z" x={x} y={y} fontSize="16">
        z
      </text>
      <text className="lc-z" x={x + 12} y={y - 14} fontSize="21">
        z
      </text>
      <text className="lc-z" x={x + 27} y={y - 31} fontSize="27">
        Z
      </text>
    </g>
  )
}
