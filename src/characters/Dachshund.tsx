import { Blush, CharacterSvg, Eye, Sweat, Zzz, type CharacterProps } from './core'

const CSS = `
/* Short dog spans x 0..366; full stretch adds --extra units of body. */
.lc-dog {
  --extra: 260;
}

.lc-dog-center,
.lc-dog-rear,
.lc-dog-middle,
.lc-dog-shadow {
  transition: transform 0.55s cubic-bezier(0.34, 1.4, 0.64, 1);
}

.lc-dog-center {
  transform: translateX(calc((1 - var(--stretch)) * var(--extra) / 2 * 1px));
}

.lc-dog-rear {
  transform: translateX(calc(var(--stretch) * var(--extra) * 1px));
}

/* Middle segment is 8 units wide starting at x=228. */
.lc-dog-middle {
  transform-box: view-box;
  transform-origin: 228px 0;
  transform: scaleX(calc(1 + var(--stretch) * var(--extra) / 8));
}

.lc-dog-shadow {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  transform: translateX(calc(var(--stretch) * var(--extra) / 2 * 1px))
    scaleX(calc(1 + var(--stretch) * var(--extra) / 220));
}

.lc-dog-tail {
  transform-box: fill-box;
  transform-origin: 0% 100%;
  animation: lc-dog-wag 1.6s ease-in-out infinite;
}

.lc-dog[data-full='true'] .lc-dog-tail,
.lc-dog[data-mood='happy'] .lc-dog-tail {
  animation-duration: 0.35s;
}

.lc-dog-head {
  transform-box: view-box;
  transform-origin: 140px 150px;
  transition: transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1);
}

/* Tilts its head toward the form while you type. */
.lc-dog[data-mood='watch'] .lc-dog-head {
  transform: rotate(-4deg);
}

.lc-dog[data-mood='shy'] .lc-dog-head {
  transform: rotate(6deg);
}

.lc-dog-ear {
  transform-box: fill-box;
  transform-origin: 30% 5%;
  animation: lc-dog-ear-flop 3.2s ease-in-out infinite;
}

@keyframes lc-dog-wag {
  0%,
  100% {
    transform: rotate(-6deg);
  }
  50% {
    transform: rotate(10deg);
  }
}

@keyframes lc-dog-ear-flop {
  0%,
  80%,
  100% {
    transform: rotate(0);
  }
  88% {
    transform: rotate(-7deg);
  }
}
`

const OUTLINE = '#4a2208'
const FUR = '#e2802f'
const FUR_SHADE = '#c0621c'
const FUR_LIGHT = '#f4ad6a'
/** FUR_LIGHT at 75% over FUR, pre-blended so overlapping pieces don't show seams. */
const FUR_HIGHLIGHT = '#f0a25b'
const EAR = '#7a3a12'

/**
 * Sausage dog: password strength makes the body longer.
 * Body = fixed front + horizontally-scaled middle + sliding rear.
 */
export function Dachshund(props: CharacterProps) {
  return (
    <CharacterSvg {...props} name="lc-dog" css={CSS}>
      <g className="lc-dog-center">
        <ellipse className="lc-dog-shadow" cx="222" cy="224" rx="110" ry="9" fill="rgba(0,0,0,0.08)" />

        {/* Far-side legs */}
        <g fill={FUR_SHADE} stroke={OUTLINE} strokeWidth="4" strokeLinejoin="round">
          <rect x="192" y="160" width="26" height="54" rx="12" />
          <rect className="lc-dog-rear" x="280" y="160" width="26" height="54" rx="12" />
        </g>

        {/* Tail */}
        <g className="lc-dog-rear">
          <g className="lc-dog-tail">
            <path d="M304 128 C 334 118, 354 96, 362 58" fill="none" stroke={OUTLINE} strokeWidth="17" strokeLinecap="round" />
            <path d="M304 128 C 334 118, 354 96, 362 58" fill="none" stroke={FUR} strokeWidth="9" strokeLinecap="round" />
          </g>
        </g>

        {/* Body: front (fixed) */}
        <path d="M232 92 H180 A52 52 0 0 0 180 196 H232" fill={FUR} stroke={OUTLINE} strokeWidth="4" />
        <path d="M186 104 H232 V120 H186 A8 8 0 0 1 186 104 Z" fill={FUR_HIGHLIGHT} />

        {/* Body: middle (stretches) */}
        <g className="lc-dog-middle">
          <rect x="228" y="92" width="8" height="104" fill={FUR} />
          <rect x="228" y="90" width="8" height="4" fill={OUTLINE} />
          <rect x="228" y="194" width="8" height="4" fill={OUTLINE} />
          <rect x="228" y="104" width="8" height="16" fill={FUR_HIGHLIGHT} />
        </g>

        {/* Body: rear (slides) */}
        <g className="lc-dog-rear">
          <path d="M232 92 H264 A52 52 0 0 1 264 196 H232" fill={FUR} stroke={OUTLINE} strokeWidth="4" />
          <path d="M232 104 H262 A8 8 0 0 1 262 120 H232 Z" fill={FUR_HIGHLIGHT} />
          <rect x="272" y="108" width="20" height="10" rx="5" fill={FUR_LIGHT} opacity="0.6" />
        </g>

        {/* Near-side legs + paws */}
        <g fill={FUR} stroke={OUTLINE} strokeWidth="4" strokeLinejoin="round">
          <rect x="160" y="164" width="28" height="50" rx="12" />
          <ellipse cx="168" cy="212" rx="20" ry="9" />
          <g className="lc-dog-rear">
            <rect x="246" y="164" width="28" height="50" rx="12" />
            <ellipse cx="254" cy="212" rx="20" ry="9" />
            <ellipse cx="290" cy="212" rx="17" ry="8" fill={FUR_SHADE} />
          </g>
        </g>

        {/* Head */}
        <g className="lc-dog-head">
          <g stroke={OUTLINE} strokeWidth="4" strokeLinejoin="round">
            <ellipse cx="66" cy="124" rx="50" ry="28" fill={FUR} />
            <ellipse cx="122" cy="100" rx="58" ry="54" fill={FUR} />
          </g>
          <ellipse cx="88" cy="118" rx="30" ry="22" fill={FUR} />
          <path d="M40 132 Q 64 146 96 140" fill="none" stroke={FUR_SHADE} strokeWidth="5" strokeLinecap="round" opacity="0.6" />
          <Blush cx={120} cy={110} />
          <Sweat x={106} y={40} />
          <Zzz x={150} y={32} />

          <path
            className="lc-dog-ear"
            d="M146 58 C 182 54, 196 98, 186 140 C 180 164, 152 168, 146 146 C 140 120, 132 88, 146 58 Z"
            fill={EAR}
            stroke={OUTLINE}
            strokeWidth="4"
            strokeLinejoin="round"
          />

          <Eye cx={88} cy={74} rx={16} ry={18} pupil={7} lid={FUR} outline={OUTLINE} />
          <Eye cx={124} cy={70} rx={19} ry={21} pupil={8} lid={FUR} outline={OUTLINE} />
          <g fill="none" stroke={OUTLINE} strokeWidth="4" strokeLinecap="round">
            <path d="M76 50 Q 86 44 96 48" />
            <path d="M112 42 Q 124 36 138 42" />
          </g>

          <ellipse cx="20" cy="116" rx="14" ry="11" fill="#1d1d1d" />
          <ellipse cx="15" cy="112" rx="4" ry="2.5" fill="#fff" opacity="0.6" />

          <ellipse cx="62" cy="142" rx="8" ry="9" fill="#3a1206" stroke={OUTLINE} strokeWidth="2.5" />
          <ellipse cx="62" cy="146" rx="5" ry="4" fill="#e8607a" />
        </g>
      </g>
    </CharacterSvg>
  )
}
