import { Blush, CharacterSvg, Eye, Sweat, Zzz, type CharacterProps } from './core'

const CSS = `
/* Trunk hangs down at stretch 0 and swings up/forward to trumpet at 1. */
.lc-elephant-trunk {
  transform-box: view-box;
  transform-origin: 146px 118px;
  transform: rotate(calc(var(--stretch) * 128deg));
  transition: transform 0.6s cubic-bezier(0.34, 1.4, 0.64, 1);
}

.lc-elephant[data-full='true'] .lc-elephant-trunk {
  animation: lc-elephant-trumpet 1.4s ease-in-out infinite;
}

.lc-elephant-ear {
  transform-box: view-box;
  transform-origin: 222px 70px;
  animation: lc-elephant-flap 2.8s ease-in-out infinite;
}

.lc-elephant[data-mood='happy'] .lc-elephant-ear,
.lc-elephant[data-full='true'] .lc-elephant-ear {
  animation-duration: 0.7s;
}

.lc-elephant-tail {
  transform-box: view-box;
  transform-origin: 462px 120px;
  animation: lc-elephant-swish 2.2s ease-in-out infinite;
}

.lc-elephant-bodyBob {
  animation: lc-elephant-breathe 3.6s ease-in-out infinite;
}

.lc-elephant-glow {
  transition: opacity 0.35s ease;
}

.lc-elephant-lampCore {
  transition: fill 0.3s ease;
}

.lc-elephant-lampOn .lc-elephant-glow {
  animation: lc-elephant-flicker 1.8s ease-in-out infinite;
}

@keyframes lc-elephant-flap {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-9deg);
  }
}

@keyframes lc-elephant-swish {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(12deg);
  }
}

@keyframes lc-elephant-breathe {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1.5px);
  }
}

@keyframes lc-elephant-trumpet {
  0%,
  100% {
    transform: rotate(128deg);
  }
  50% {
    transform: rotate(138deg);
  }
}

@keyframes lc-elephant-flicker {
  0%,
  100% {
    opacity: 0.45;
  }
  50% {
    opacity: 0.2;
  }
}
`

const OUTLINE = '#2f3038'
const SKIN = '#9a9ca8'
const SKIN_DARK = '#7b7d89'
const EAR = '#8a8c98'
const EAR_INNER = '#d9a3a8'
const CLOTH = '#a3162f'
const GOLD = '#f2b632'
const LAMP_OFF = '#5e0f1f'

/** Lamp positions: along the caparison's scalloped hem, then the headdress. */
const LAMPS: Array<[number, number]> = [
  [439, 160],
  [412, 160],
  [384, 160],
  [356, 160],
  [328, 160],
  [300, 160],
  [272, 160],
  [172, 98],
]

/**
 * Perahera elephant: password strength raises the trunk and lights the
 * festival lamps on its caparison one by one.
 */
export function Elephant(props: CharacterProps) {
  const s = Math.min(1, Math.max(0, props.stretch ?? 0))

  return (
    <CharacterSvg {...props} name="lc-elephant" css={CSS}>
      <g className="lc-elephant-bodyBob">
        <ellipse cx="330" cy="224" rx="175" ry="9" fill="rgba(0,0,0,0.08)" />

        {/* Far legs */}
        <g fill={SKIN_DARK} stroke={OUTLINE} strokeWidth="4">
          <rect x="268" y="150" width="40" height="66" rx="16" />
          <rect x="410" y="150" width="40" height="66" rx="16" />
        </g>

        {/* Tail */}
        <g className="lc-elephant-tail">
          <path d="M462 120 Q 482 140 474 178" fill="none" stroke={OUTLINE} strokeWidth="10" strokeLinecap="round" />
          <path d="M462 120 Q 482 140 474 178" fill="none" stroke={SKIN} strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="474" cy="185" rx="6" ry="9" fill={OUTLINE} />
        </g>

        {/* Body */}
        <ellipse cx="345" cy="128" rx="125" ry="78" fill={SKIN} stroke={OUTLINE} strokeWidth="4" />

        {/* Near legs + toenails */}
        <g fill={SKIN} stroke={OUTLINE} strokeWidth="4">
          <rect x="236" y="156" width="46" height="62" rx="18" />
          <rect x="388" y="156" width="46" height="62" rx="18" />
        </g>
        <g fill="#f4efe6">
          <ellipse cx="248" cy="212" rx="5" ry="3.5" />
          <ellipse cx="259" cy="213" rx="5" ry="3.5" />
          <ellipse cx="270" cy="212" rx="5" ry="3.5" />
          <ellipse cx="400" cy="212" rx="5" ry="3.5" />
          <ellipse cx="411" cy="213" rx="5" ry="3.5" />
          <ellipse cx="422" cy="212" rx="5" ry="3.5" />
        </g>

        {/* Perahera caparison */}
        <path
          d="M250 92 Q 345 30 450 96 L 452 150 Q 439 168 426 152 Q 412 168 398 152 Q 384 168 370 152 Q 356 168 342 152 Q 328 168 314 152 Q 300 168 286 152 Q 272 168 258 152 Q 246 160 244 140 Z"
          fill={CLOTH}
          stroke={GOLD}
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path d="M262 128 Q 345 78 440 128" fill="none" stroke={GOLD} strokeWidth="3" />
        <g fill={GOLD}>
          <circle cx="300" cy="100" r="6" />
          <circle cx="345" cy="86" r="7" />
          <circle cx="390" cy="100" r="6" />
          <path d="M345 112 l8 10 l-8 10 l-8 -10 Z" />
        </g>

        {/* Trunk (behind head so its base is hidden) */}
        <g className="lc-elephant-trunk">
          <path d="M146 118 C 140 150, 130 180, 132 204 C 133 214, 122 220, 114 210" fill="none" stroke={OUTLINE} strokeWidth="34" strokeLinecap="round" />
          <path d="M146 118 C 140 150, 130 180, 132 204 C 133 214, 122 220, 114 210" fill="none" stroke={SKIN} strokeWidth="26" strokeLinecap="round" />
          <g stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" opacity="0.45">
            <path d="M128 156 l 20 4" />
            <path d="M125 174 l 19 3" />
            <path d="M124 192 l 18 2" />
          </g>
        </g>

        {/* Head */}
        <ellipse cx="196" cy="100" rx="64" ry="60" fill={SKIN} stroke={OUTLINE} strokeWidth="4" />
        <path d="M150 62 Q 180 40 214 48 L 196 96 Q 170 106 150 92 Z" fill={CLOTH} stroke={GOLD} strokeWidth="4" strokeLinejoin="round" />
        <circle cx="182" cy="66" r="5" fill={GOLD} />

        {/* Ear (flaps) */}
        <g className="lc-elephant-ear">
          <path d="M222 64 C 270 50, 292 110, 268 150 C 256 172, 222 168, 214 140 Z" fill={EAR} stroke={OUTLINE} strokeWidth="4" strokeLinejoin="round" />
          <path d="M230 80 C 262 74, 274 112, 258 138 C 250 152, 234 148, 230 134 Z" fill={EAR_INNER} opacity="0.6" />
        </g>

        <Eye cx={182} cy={108} rx={11} ry={13} pupil={5} lid={SKIN} outline={OUTLINE} />
        <path d="M170 90 Q 182 84 194 90" fill="none" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
        <Blush cx={204} cy={130} rx={9} ry={5} />
        <Sweat x={146} y={80} />
        <Zzz x={214} y={34} />
        <path d="M168 142 Q 180 152 194 144" fill="none" stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />

        {/* Tusk */}
        <path d="M162 140 Q 152 168 128 174 Q 148 160 152 138 Z" fill="#fffaf0" stroke={OUTLINE} strokeWidth="3" strokeLinejoin="round" />

        {/* Festival lamps: light up with strength */}
        {LAMPS.map(([cx, cy], i) => {
          const lit = s >= (i + 1) / (LAMPS.length + 1)
          return (
            <g key={i} className={lit ? 'lc-elephant-lampOn' : undefined}>
              <circle
                className="lc-elephant-glow"
                cx={cx}
                cy={cy}
                r="10"
                fill="#ffd84d"
                opacity={lit ? 0.45 : 0}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
              <circle
                className="lc-elephant-lampCore"
                cx={cx}
                cy={cy}
                r="4.5"
                fill={lit ? '#ffe680' : LAMP_OFF}
                stroke={OUTLINE}
                strokeWidth="1.5"
              />
            </g>
          )
        })}
      </g>
    </CharacterSvg>
  )
}
