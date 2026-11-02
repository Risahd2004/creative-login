import { useId } from 'react'
import { Blush, CharacterSvg, Eye, Sweat, Zzz, type CharacterProps } from './core'

const CSS = `
/* Tea level: empty at stretch 0, full at 1 (tea top travels 140 units). */
.lc-tea-level {
  transform: translateY(calc((1 - var(--stretch)) * 140px));
  transition: transform 0.7s cubic-bezier(0.34, 1.2, 0.64, 1);
}

.lc-tea-surface {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  animation: lc-tea-slosh 2.4s ease-in-out infinite;
}

.lc-tea-bubbles circle {
  opacity: 0;
}

.lc-tea[data-mood='watch'] .lc-tea-bubbles circle,
.lc-tea[data-full='true'] .lc-tea-bubbles circle {
  animation: lc-tea-bubble 1.6s ease-in infinite;
}

.lc-tea-bubbles circle:nth-child(2) {
  animation-delay: 0.5s;
}

.lc-tea-bubbles circle:nth-child(3) {
  animation-delay: 1s;
}

@keyframes lc-tea-bubble {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  20% {
    opacity: 0.9;
  }
  100% {
    opacity: 0;
    transform: translateY(-120px);
  }
}

.lc-tea-steam {
  opacity: 0;
  transition: opacity 0.4s ease;
}

.lc-tea[data-full='true'] .lc-tea-steam {
  opacity: 1;
}

.lc-tea[data-full='true'] .lc-tea-wisp {
  animation: lc-tea-rise 1.8s ease-in-out infinite;
}

.lc-tea[data-full='true'] .lc-tea-wisp:nth-child(2) {
  animation-delay: 0.3s;
}

.lc-tea[data-full='true'] .lc-tea-wisp:nth-child(3) {
  animation-delay: 0.6s;
}

.lc-tea-face {
  animation: lc-tea-bob 3s ease-in-out infinite;
}

.lc-tea-leaf {
  transform-box: fill-box;
  transform-origin: 0% 100%;
  animation: lc-tea-sway 3.4s ease-in-out infinite;
}

@keyframes lc-tea-slosh {
  0%,
  100% {
    transform: scaleY(1) rotate(0deg);
  }
  50% {
    transform: scaleY(0.6) rotate(-1.5deg);
  }
}

@keyframes lc-tea-rise {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  40% {
    opacity: 0.9;
  }
  100% {
    opacity: 0;
    transform: translateY(-12px);
  }
}

@keyframes lc-tea-bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

@keyframes lc-tea-sway {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-6deg);
  }
}
`

const OUTLINE = '#3a2416'
const GLASS = '#eef6f8'
const TEA = '#b8733a'
const TEA_TOP = '#d39a64'

const GLASS_PATH = 'M248 52 L 392 52 L 376 206 Q 374 220 360 220 L 280 220 Q 266 220 264 206 Z'

/**
 * A glass of kade plain tea: password strength fills the glass; it steams
 * when the password is very strong.
 */
export function TeaGlass(props: CharacterProps) {
  const clipId = `tea-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`

  return (
    <CharacterSvg {...props} name="lc-tea" css={CSS}>
      <defs>
        <clipPath id={clipId}>
          <path d={GLASS_PATH} />
        </clipPath>
      </defs>

      {/* Saucer */}
      <ellipse cx="320" cy="222" rx="110" ry="12" fill="#f6f1e7" stroke={OUTLINE} strokeWidth="4" />

      {/* Steam */}
      <g className="lc-tea-steam" fill="none" stroke="#c9c9c9" strokeWidth="6" strokeLinecap="round">
        <path className="lc-tea-wisp" d="M292 40 Q 282 24 292 10 Q 302 -4 292 -18" />
        <path className="lc-tea-wisp" d="M320 40 Q 310 24 320 10 Q 330 -4 320 -18" />
        <path className="lc-tea-wisp" d="M348 40 Q 338 24 348 10 Q 358 -4 348 -18" />
      </g>

      {/* Glass + tea */}
      <path d={GLASS_PATH} fill={GLASS} />
      <g clipPath={`url(#${clipId})`}>
        <g className="lc-tea-level">
          <rect x="240" y="72" width="160" height="160" fill={TEA} />
          <ellipse className="lc-tea-surface" cx="320" cy="72" rx="80" ry="6" fill={TEA_TOP} />
          {/* Bubbles rise while you type */}
          <g className="lc-tea-bubbles" fill="#e7b98c">
            <circle cx="296" cy="200" r="3.5" />
            <circle cx="330" cy="206" r="2.5" />
            <circle cx="350" cy="198" r="3" />
          </g>
        </g>
      </g>
      <path d="M262 64 L 276 200" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity="0.7" />
      <path d={GLASS_PATH} fill="none" stroke={OUTLINE} strokeWidth="4" strokeLinejoin="round" />
      <ellipse cx="320" cy="52" rx="72" ry="6" fill="none" stroke={OUTLINE} strokeWidth="3" />

      {/* Face */}
      <g className="lc-tea-face">
        <Eye cx={300} cy={118} rx={12} ry={14} pupil={5.5} lid={GLASS} outline={OUTLINE} />
        <Eye cx={340} cy={118} rx={12} ry={14} pupil={5.5} lid={GLASS} outline={OUTLINE} />
        <Blush cx={286} cy={142} rx={8} ry={5} />
        <Sweat x={362} y={92} />
        <Zzz x={372} y={40} />
        <Blush cx={354} cy={142} rx={8} ry={5} />
        <path d="M308 146 Q 320 156 332 146" fill="none" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
      </g>

      {/* Tea leaf garnish on the saucer */}
      <g className="lc-tea-leaf">
        <path d="M410 214 Q 428 190 450 200 Q 432 222 410 214 Z" fill="#4c9a3f" stroke={OUTLINE} strokeWidth="2.5" />
        <path d="M412 213 Q 430 204 448 201" fill="none" stroke={OUTLINE} strokeWidth="1.5" opacity="0.6" />
      </g>
    </CharacterSvg>
  )
}
