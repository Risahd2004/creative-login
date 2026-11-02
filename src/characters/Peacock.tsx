import type { CSSProperties } from 'react'
import { Blush, CharacterSvg, Eye, Sweat, Zzz, type CharacterProps } from './core'

const CSS = `
/* Each feather interpolates from its folded to fanned angle by --stretch. */
.lc-peacock-feather {
  transform-box: view-box;
  transform-origin: 372px 150px;
  transform: rotate(calc(var(--a0) + var(--stretch) * (var(--a1) - var(--a0))));
  transition: transform 0.6s cubic-bezier(0.34, 1.3, 0.64, 1);
}

.lc-peacock-shimmer {
  transform-box: view-box;
  transform-origin: 372px 150px;
}

.lc-peacock[data-full='true'] .lc-peacock-shimmer,
.lc-peacock[data-mood='happy'] .lc-peacock-shimmer {
  animation: lc-peacock-shimmer 0.9s ease-in-out infinite;
}

.lc-peacock-head {
  transform-box: view-box;
  transform-origin: 326px 140px;
  animation: lc-peacock-bob 2.4s ease-in-out infinite;
}

.lc-peacock[data-mood='watch'] .lc-peacock-head {
  animation: none;
  transform: rotate(-6deg);
  transition: transform 0.3s ease;
}

.lc-peacock-crest {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  animation: lc-peacock-sway 1.8s ease-in-out infinite;
}

@keyframes lc-peacock-shimmer {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(2.5deg);
  }
}

@keyframes lc-peacock-bob {
  0%,
  100% {
    transform: rotate(0deg);
  }
  40% {
    transform: rotate(-5deg);
  }
  60% {
    transform: rotate(2deg);
  }
}

@keyframes lc-peacock-sway {
  0%,
  100% {
    transform: rotate(-6deg);
  }
  50% {
    transform: rotate(6deg);
  }
}
`

const OUTLINE = '#14233f'
const BLUE = '#1f5fbf'
const BLUE_DARK = '#163f86'
const TEAL = '#1a9e8a'
const GREEN = '#2f9e4f'
const GOLD = '#e8b93a'
const WING = '#b98a4e'
const LEG = '#8b7a66'

const FEATHERS = 9
/** Folded angle (train trailing behind) → fanned angle, per feather. */
const feathers = Array.from({ length: FEATHERS }, (_, i) => ({
  folded: 2 + i * 2,
  fanned: -160 + i * (150 / (FEATHERS - 1)),
}))

/** Peacock: password strength fans the tail open. */
export function Peacock(props: CharacterProps) {
  return (
    <CharacterSvg {...props} name="lc-peacock" css={CSS}>
      <ellipse cx="380" cy="224" rx="140" ry="9" fill="rgba(0,0,0,0.08)" />

      {/* Tail feathers, pivoting at the rump (372,150) */}
      <g>
        {feathers.map((f, i) => (
          <g
            key={i}
            className="lc-peacock-feather"
            style={{ '--a0': `${f.folded}deg`, '--a1': `${f.fanned}deg` } as CSSProperties}
          >
            <g className="lc-peacock-shimmer" style={{ animationDelay: `${i * 0.12}s` }}>
              <line x1="372" y1="150" x2="522" y2="150" stroke="#7a6a3a" strokeWidth="3" />
              <ellipse cx="478" cy="150" rx="46" ry="15" fill={GREEN} stroke={OUTLINE} strokeWidth="2.5" />
              <ellipse cx="500" cy="150" rx="15" ry="12" fill={GOLD} />
              <ellipse cx="502" cy="150" rx="11" ry="9" fill={TEAL} />
              <ellipse cx="504" cy="150" rx="6" ry="5.5" fill={BLUE_DARK} />
            </g>
          </g>
        ))}
      </g>

      {/* Legs */}
      <g stroke={LEG} strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M330 184 L 326 218 M 316 220 H 336" />
        <path d="M350 184 L 352 218 M 342 220 H 362" />
      </g>

      {/* Body + wing */}
      <ellipse cx="342" cy="150" rx="50" ry="40" fill={BLUE} stroke={OUTLINE} strokeWidth="4" />
      <ellipse cx="356" cy="154" rx="34" ry="24" fill={WING} stroke={OUTLINE} strokeWidth="3" />
      <g stroke={OUTLINE} strokeWidth="2" opacity="0.4" fill="none">
        <path d="M336 150 Q 356 144 384 152" />
        <path d="M338 162 Q 358 156 384 164" />
      </g>

      {/* Neck + head (bobs) */}
      <g className="lc-peacock-head">
        <path d="M326 140 C 304 120, 294 100, 292 80" fill="none" stroke={OUTLINE} strokeWidth="36" strokeLinecap="round" />
        <path d="M326 140 C 304 120, 294 100, 292 80" fill="none" stroke={BLUE} strokeWidth="28" strokeLinecap="round" />
        <circle cx="290" cy="72" r="26" fill={BLUE} stroke={OUTLINE} strokeWidth="3.5" />

        <g className="lc-peacock-crest" stroke={OUTLINE} strokeWidth="2">
          <line x1="290" y1="48" x2="278" y2="24" />
          <line x1="292" y1="47" x2="292" y2="20" />
          <line x1="294" y1="48" x2="306" y2="24" />
          <circle cx="278" cy="23" r="5" fill={TEAL} />
          <circle cx="292" cy="19" r="5" fill={TEAL} />
          <circle cx="306" cy="23" r="5" fill={TEAL} />
        </g>

        <ellipse cx="294" cy="86" rx="10" ry="4" fill="#fff" opacity="0.9" />
        <Blush cx={304} cy={80} rx={6} ry={4} />
        <Sweat x={310} y={54} />
        <Zzz x={316} y={44} />
        <path d="M266 68 L 247 77 L 266 85 Z" fill="#c9a36a" stroke={OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
        <Eye cx={284} cy={68} rx={10} ry={11} pupil={5} lid={BLUE} outline={OUTLINE} />
      </g>
    </CharacterSvg>
  )
}
