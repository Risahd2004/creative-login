import { Blush, CharacterSvg, Eye, Sweat, Zzz, type CharacterProps } from './core'

const CSS = `
/* Climbs from the base (stretch 0) to the coconuts (stretch 1). */
.lc-macaque-climber {
  transform: translateY(calc(var(--stretch) * -92px));
  transition: transform 0.7s cubic-bezier(0.34, 1.3, 0.64, 1);
}

/* Little shuffle while climbing/typing. */
.lc-macaque[data-mood='watch'] .lc-macaque-wiggle {
  animation: lc-macaque-shuffle 0.5s ease-in-out infinite;
}

.lc-macaque-arm {
  transform-box: view-box;
  transform-origin: 330px 166px;
}

.lc-macaque[data-mood='idle'] .lc-macaque-arm {
  animation: lc-macaque-scratch 4s ease-in-out infinite;
}

.lc-macaque-prize {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.lc-macaque[data-full='true'] .lc-macaque-prize {
  opacity: 1;
}

.lc-macaque[data-full='true'] .lc-macaque-coconuts ellipse:nth-child(3) {
  opacity: 0;
}

.lc-macaque-fronds {
  transform-box: view-box;
  transform-origin: 380px 48px;
  animation: lc-macaque-breeze 4s ease-in-out infinite;
}

.lc-macaque-head {
  transform-box: view-box;
  transform-origin: 310px 160px;
  transition: transform 0.3s ease;
}

.lc-macaque[data-mood='shy'] .lc-macaque-head {
  transform: rotate(10deg);
}

@keyframes lc-macaque-shuffle {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

@keyframes lc-macaque-scratch {
  0%,
  70%,
  100% {
    transform: rotate(0);
  }
  78%,
  92% {
    transform: rotate(-12deg);
  }
  85% {
    transform: rotate(-4deg);
  }
}

@keyframes lc-macaque-breeze {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(2deg);
  }
}
`

const OUTLINE = '#3b2a1a'
const FUR = '#b48a5c'
const FUR_DARK = '#8a6440'
const FACE = '#ecb995'
const TRUNK = '#9c7448'
const FROND = '#3f9b48'
const FROND_DARK = '#2c7535'
const THAMBILI = '#f0a020'

/**
 * Toque macaque (endemic to Sri Lanka) climbing a coconut palm: password
 * strength moves it up toward the king coconuts (thambili).
 */
export function Macaque(props: CharacterProps) {
  return (
    <CharacterSvg {...props} name="lc-macaque" css={CSS}>
      <ellipse cx="380" cy="228" rx="90" ry="7" fill="rgba(0,0,0,0.08)" />

      {/* Palm trunk */}
      <path d="M356 232 Q 364 140 370 46 L 392 46 Q 390 140 390 232 Z" fill={TRUNK} stroke={OUTLINE} strokeWidth="4" strokeLinejoin="round" />
      <g stroke={OUTLINE} strokeWidth="2" opacity="0.35" strokeLinecap="round">
        <path d="M360 200 Q 374 196 388 200" />
        <path d="M362 168 Q 376 164 389 168" />
        <path d="M364 136 Q 377 132 389 136" />
        <path d="M366 104 Q 378 100 390 104" />
        <path d="M368 72 Q 379 68 391 72" />
      </g>

      {/* Fronds */}
      <g className="lc-macaque-fronds" stroke={OUTLINE} strokeWidth="3" strokeLinejoin="round">
        <path d="M380 46 Q 330 6 270 30 Q 330 26 380 50 Z" fill={FROND} />
        <path d="M382 46 Q 440 4 500 28 Q 440 24 384 52 Z" fill={FROND} />
        <path d="M380 48 Q 320 40 288 84 Q 334 52 382 54 Z" fill={FROND_DARK} />
        <path d="M384 48 Q 446 40 476 86 Q 430 54 384 56 Z" fill={FROND_DARK} />
        <path d="M380 44 Q 384 8 360 -8 Q 394 10 386 46 Z" fill={FROND} />
      </g>

      {/* King coconuts */}
      <g className="lc-macaque-coconuts" fill={THAMBILI} stroke={OUTLINE} strokeWidth="2.5">
        <ellipse cx="372" cy="60" rx="9" ry="11" />
        <ellipse cx="390" cy="60" rx="9" ry="11" />
        <ellipse cx="381" cy="70" rx="9" ry="11" />
      </g>

      {/* Monkey – climbs with strength */}
      <g className="lc-macaque-climber">
        <g className="lc-macaque-wiggle">
          {/* Tail */}
          <path d="M300 206 C 284 216, 280 232, 292 238" fill="none" stroke={OUTLINE} strokeWidth="9" strokeLinecap="round" />
          <path d="M300 206 C 284 216, 280 232, 292 238" fill="none" stroke={FUR} strokeWidth="4.5" strokeLinecap="round" />

          {/* Body */}
          <ellipse cx="320" cy="186" rx="28" ry="34" fill={FUR} stroke={OUTLINE} strokeWidth="4" />
          <ellipse cx="314" cy="192" rx="14" ry="20" fill={FACE} opacity="0.55" />

          {/* Legs gripping trunk */}
          <g stroke={OUTLINE} strokeWidth="4" fill={FUR}>
            <ellipse cx="338" cy="212" rx="18" ry="11" />
          </g>
          <ellipse cx="356" cy="210" rx="8" ry="6" fill={FACE} stroke={OUTLINE} strokeWidth="3" />

          {/* Arms reaching up the trunk */}
          <g className="lc-macaque-arm">
            <path d="M330 166 Q 344 150 360 140" fill="none" stroke={OUTLINE} strokeWidth="15" strokeLinecap="round" />
            <path d="M330 166 Q 344 150 360 140" fill="none" stroke={FUR} strokeWidth="8" strokeLinecap="round" />
            <circle cx="362" cy="139" r="7" fill={FACE} stroke={OUTLINE} strokeWidth="3" />
            {/* Prize: a king coconut, held at full strength */}
            <ellipse className="lc-macaque-prize" cx="366" cy="124" rx="9" ry="11" fill={THAMBILI} stroke={OUTLINE} strokeWidth="2.5" />
          </g>

          {/* Head */}
          <g className="lc-macaque-head">
            <circle cx="326" cy="138" r="9" fill={FACE} stroke={OUTLINE} strokeWidth="3" />
            <circle cx="302" cy="140" r="27" fill={FUR} stroke={OUTLINE} strokeWidth="4" />
            {/* The "toque": a cap-like whorl of hair */}
            <path d="M276 128 Q 284 98 302 106 Q 320 98 330 128 Q 318 116 302 118 Q 288 116 276 128 Z" fill={FUR_DARK} stroke={OUTLINE} strokeWidth="3" strokeLinejoin="round" />
            <path d="M302 108 L 302 118" stroke={OUTLINE} strokeWidth="2" />
            <ellipse cx="298" cy="148" rx="19" ry="17" fill={FACE} />
            <Blush cx={312} cy={156} rx={6} ry={4} />
            <Sweat x={322} y={118} />
            <Zzz x={318} y={104} />
            <Eye cx={290} cy={142} rx={7} ry={8} pupil={3.5} lid={FACE} outline={OUTLINE} />
            <Eye cx={306} cy={142} rx={7} ry={8} pupil={3.5} lid={FACE} outline={OUTLINE} />
            <g fill={OUTLINE}>
              <circle cx="296" cy="153" r="1.6" />
              <circle cx="301" cy="153" r="1.6" />
            </g>
            <path d="M290 159 Q 298 166 307 159" fill="none" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </g>
      </g>
    </CharacterSvg>
  )
}
