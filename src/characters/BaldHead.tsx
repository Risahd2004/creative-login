import type { CSSProperties } from 'react'
import { Blush, CharacterSvg, Eye, Sweat, Zzz, type CharacterProps } from './core'

const CSS = `
/* Each tuft grows out of the scalp with --stretch (0 = bald, 1 = full hair). */
.lc-bald-tuft {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  transform: scale(calc(0.4 + var(--stretch) * 0.6), calc(var(--stretch) * var(--h, 1)));
  transition: transform 0.6s cubic-bezier(0.34, 1.5, 0.64, 1);
}

.lc-bald-sway {
  transform-box: fill-box;
  transform-origin: 50% 100%;
}

.lc-bald[data-full='true'] .lc-bald-sway,
.lc-bald[data-mood='happy'] .lc-bald-sway {
  animation: lc-bald-sway 1.4s ease-in-out infinite;
}

/* Hairline over the scalp fades in once some hair has grown. */
.lc-bald-cap {
  opacity: calc(var(--stretch) * 2.5 - 0.5);
  transition: opacity 0.4s ease;
}

/* Bald shine fades out as hair grows. */
.lc-bald-shine {
  opacity: calc(1 - var(--stretch) * 2.5);
  transition: opacity 0.4s ease;
}

.lc-bald-sparkle {
  opacity: 0;
  transform-box: fill-box;
  transform-origin: 50% 50%;
}

.lc-bald[data-full='true'] .lc-bald-sparkle {
  animation: lc-bald-twinkle 1.2s ease-in-out infinite;
}

.lc-bald[data-full='true'] .lc-bald-sparkle:nth-of-type(2) {
  animation-delay: 0.6s;
}

.lc-bald-head {
  transform-box: view-box;
  transform-origin: 320px 226px;
  transition: transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1);
}

.lc-bald[data-mood='watch'] .lc-bald-head {
  transform: rotate(3deg);
}

.lc-bald[data-mood='shy'] .lc-bald-head {
  transform: rotate(-6deg);
}

.lc-bald-brows {
  transition: transform 0.3s ease;
}

.lc-bald[data-mood='watch'] .lc-bald-brows {
  transform: translateY(-4px);
}

@keyframes lc-bald-sway {
  0%,
  100% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(4deg);
  }
}

@keyframes lc-bald-twinkle {
  0%,
  100% {
    opacity: 0;
    transform: scale(0.4) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1) rotate(45deg);
  }
}
`

const OUTLINE = '#4a2a18'
const SKIN = '#f2c29b'
const SKIN_SHADE = '#e2a87e'
const HAIR = '#3a2416'
const HAIR_OUTLINE = '#1c0f08'

const HEAD = { cx: 320, cy: 146, rx: 78, ry: 80 }

/** Tufts around the scalp: angle on the head outline + relative height. */
const TUFTS = [
  { angle: -170, h: 0.6 },
  { angle: -150, h: 0.85 },
  { angle: -130, h: 1 },
  { angle: -110, h: 1.1 },
  { angle: -90, h: 1.15 },
  { angle: -70, h: 1.1 },
  { angle: -50, h: 1 },
  { angle: -30, h: 0.85 },
  { angle: -10, h: 0.6 },
].map(({ angle, h }) => {
  const rad = (angle * Math.PI) / 180
  return {
    x: HEAD.cx + (HEAD.rx - 6) * Math.cos(rad),
    y: HEAD.cy + (HEAD.ry - 6) * Math.sin(rad),
    rotate: angle + 90,
    h,
  }
})

/** A flame-shaped curl pointing up from (0,0). */
const TUFT_PATH = 'M -18 0 C -22 -30, -6 -40, -10 -60 C 6 -48, 20 -34, 18 0 Z'

/**
 * Bald buddy: password strength grows a full head of hair.
 */
export function BaldHead(props: CharacterProps) {
  return (
    <CharacterSvg {...props} name="lc-bald" css={CSS}>
      <ellipse cx="320" cy="230" rx="90" ry="7" fill="rgba(0,0,0,0.08)" />

      <g className="lc-bald-head">
        {/* Hair tufts (behind the head so they sprout from the scalp edge) */}
        {TUFTS.map((t, i) => (
          <g key={i} transform={`translate(${t.x} ${t.y}) rotate(${t.rotate})`}>
            <g className="lc-bald-sway" style={{ animationDelay: `${i * 0.08}s` }}>
              <path
                className="lc-bald-tuft"
                d={TUFT_PATH}
                fill={HAIR}
                stroke={HAIR_OUTLINE}
                strokeWidth="3.5"
                strokeLinejoin="round"
                style={{ '--h': t.h, transitionDelay: `${Math.abs(i - 4) * 40}ms` } as CSSProperties}
              />
            </g>
          </g>
        ))}

        {/* Ears */}
        <g fill={SKIN} stroke={OUTLINE} strokeWidth="4">
          <ellipse cx="244" cy="152" rx="14" ry="20" />
          <ellipse cx="396" cy="152" rx="14" ry="20" />
        </g>
        <g fill="none" stroke={SKIN_SHADE} strokeWidth="4" strokeLinecap="round">
          <path d="M246 142 Q 238 152 246 162" />
          <path d="M394 142 Q 402 152 394 162" />
        </g>

        {/* Head */}
        <ellipse cx={HEAD.cx} cy={HEAD.cy} rx={HEAD.rx} ry={HEAD.ry} fill={SKIN} stroke={OUTLINE} strokeWidth="4" />

        {/* Hairline cap + bald shine */}
        <path
          className="lc-bald-cap"
          d="M244 132 C 246 64, 394 64, 396 132 C 382 104, 352 94, 320 100 C 288 94, 258 104, 244 132 Z"
          fill={HAIR}
          stroke={HAIR_OUTLINE}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <g className="lc-bald-shine" fill="#fff">
          <ellipse cx="292" cy="88" rx="20" ry="8" transform="rotate(-22 292 88)" opacity="0.85" />
          <ellipse cx="318" cy="78" rx="5" ry="3" opacity="0.7" />
        </g>

        {/* Face */}
        <Blush cx={280} cy={176} rx={11} ry={6} />
        <Sweat x={372} y={96} />
        <Zzz x={392} y={64} />
        <Blush cx={360} cy={176} rx={11} ry={6} />

        <g className="lc-bald-brows" fill="none" stroke={OUTLINE} strokeWidth="4.5" strokeLinecap="round">
          <path d="M278 116 Q 292 108 306 114" />
          <path d="M334 114 Q 348 108 362 116" />
        </g>
        <Eye cx={292} cy={140} rx={13} ry={15} pupil={6} lid={SKIN} outline={OUTLINE} />
        <Eye cx={348} cy={140} rx={13} ry={15} pupil={6} lid={SKIN} outline={OUTLINE} />

        <path d="M320 150 Q 310 166 322 168" fill="none" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
        <path d="M300 186 Q 320 202 340 186" fill="none" stroke={OUTLINE} strokeWidth="4" strokeLinecap="round" />

        {/* Sparkles at full strength */}
        <g fill="#ffd34d" stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round">
          <path className="lc-bald-sparkle" d="M222 44 l5 11 l11 5 l-11 5 l-5 11 l-5 -11 l-11 -5 l11 -5 Z" />
          <path className="lc-bald-sparkle" d="M418 34 l4 9 l9 4 l-9 4 l-4 9 l-4 -9 l-9 -4 l9 -4 Z" />
        </g>
      </g>
    </CharacterSvg>
  )
}
