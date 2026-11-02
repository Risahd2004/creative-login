import { Blush, CharacterSvg, Eye, Sweat, Zzz, type CharacterProps } from './core'

const CSS = `
/* Short tuk-tuk spans x 92..372; full stretch adds --extra units. */
.lc-tuk {
  --extra: 230;
}

.lc-tuk-center,
.lc-tuk-rear,
.lc-tuk-middle,
.lc-tuk-shadow {
  transition: transform 0.55s cubic-bezier(0.34, 1.4, 0.64, 1);
}

.lc-tuk-center {
  transform: translateX(calc((1 - var(--stretch)) * var(--extra) / 2 * 1px));
}

.lc-tuk-rear {
  transform: translateX(calc(var(--stretch) * var(--extra) * 1px));
}

/* Middle segment is 8 units wide starting at x=240. */
.lc-tuk-middle {
  transform-box: view-box;
  transform-origin: 240px 0;
  transform: scaleX(calc(1 + var(--stretch) * var(--extra) / 8));
}

.lc-tuk-shadow {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  transform: translateX(calc(var(--stretch) * var(--extra) / 2 * 1px))
    scaleX(calc(1 + var(--stretch) * var(--extra) / 280));
}

/* Engine idle judder. */
.lc-tuk-chassis {
  animation: lc-tuk-judder 0.28s steps(2, end) infinite;
}

.lc-tuk-spin {
  transform-box: fill-box;
  transform-origin: 50% 50%;
}

.lc-tuk[data-mood='watch'] .lc-tuk-spin,
.lc-tuk[data-full='true'] .lc-tuk-spin,
.lc-tuk[data-mood='happy'] .lc-tuk-spin {
  animation: lc-tuk-spin 0.6s linear infinite;
}

.lc-tuk-puffs circle {
  opacity: 0;
}

.lc-tuk[data-full='true'] .lc-tuk-puffs circle {
  animation: lc-tuk-puff 1.2s ease-out infinite;
}

.lc-tuk[data-full='true'] .lc-tuk-puffs circle:nth-child(2) {
  animation-delay: 0.2s;
}

.lc-tuk[data-full='true'] .lc-tuk-puffs circle:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes lc-tuk-judder {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-1px);
  }
}

@keyframes lc-tuk-spin {
  to {
    transform: rotate(-360deg);
  }
}

@keyframes lc-tuk-puff {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.6);
  }
  30% {
    opacity: 0.9;
  }
  100% {
    opacity: 0;
    transform: translate(24px, -14px) scale(1.4);
  }
}
`

const OUTLINE = '#2a0d10'
const RED = '#d7263d'
const RED_DARK = '#a3172b'
const YELLOW = '#ffcc29'
const ROOF = '#1f1f24'
const GLASS = '#bfe6ff'
const INTERIOR = '#5a1620'

function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#1d1d1d" stroke={OUTLINE} strokeWidth="3" />
      <circle cx={cx} cy={cy} r={r * 0.5} fill="#c9ccd3" stroke={OUTLINE} strokeWidth="2" />
      <g className="lc-tuk-spin" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round">
        <line x1={cx - r * 0.45} y1={cy} x2={cx + r * 0.45} y2={cy} />
        <line x1={cx} y1={cy - r * 0.45} x2={cx} y2={cy + r * 0.45} />
      </g>
      <circle cx={cx} cy={cy} r="3" fill={OUTLINE} />
    </g>
  )
}

/**
 * Sri Lankan three-wheeler: password strength stretches it into a limo.
 * Same fixed-front / scaled-middle / sliding-rear construction as the dog.
 */
export function TukTuk(props: CharacterProps) {
  return (
    <CharacterSvg {...props} name="lc-tuk" css={CSS}>
      <g className="lc-tuk-center">
        <ellipse className="lc-tuk-shadow" cx="232" cy="224" rx="140" ry="9" fill="rgba(0,0,0,0.08)" />

        {/* Exhaust puffs (full strength) */}
        <g className="lc-tuk-rear">
          <g className="lc-tuk-puffs" fill="#d9d9d9">
            <circle cx="384" cy="184" r="7" />
            <circle cx="398" cy="178" r="9" />
            <circle cx="414" cy="170" r="11" />
          </g>
        </g>

        <g className="lc-tuk-chassis">
          {/* ---------- Front (fixed) ---------- */}
          <path d="M244 34 H160 Q 136 34 132 58 H244" fill={ROOF} stroke={OUTLINE} strokeWidth="4" />
          <rect x="204" y="58" width="40" height="54" fill={INTERIOR} />
          <path d="M132 60 L 116 112 H 204 V 60 Z" fill={GLASS} stroke={OUTLINE} strokeWidth="3" strokeLinejoin="round" />
          <path d="M146 66 L 140 86" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
          <rect x="200" y="58" width="12" height="56" fill={RED_DARK} stroke={OUTLINE} strokeWidth="3" />
          <path d="M244 110 H116 Q 92 110 92 140 Q 92 188 120 188 H244" fill={RED} stroke={OUTLINE} strokeWidth="4" />
          <path d="M244 140 H93 Q 93 146 94 152 H244 Z" fill={YELLOW} />

          {/* ---------- Middle (stretches) ---------- */}
          <g className="lc-tuk-middle">
            <rect x="240" y="34" width="8" height="24" fill={ROOF} />
            <rect x="240" y="32" width="8" height="4" fill={OUTLINE} />
            <rect x="240" y="56" width="8" height="4" fill={OUTLINE} />
            <rect x="240" y="60" width="8" height="50" fill={INTERIOR} />
            <rect x="240" y="110" width="8" height="78" fill={RED} />
            <rect x="240" y="108" width="8" height="4" fill={OUTLINE} />
            <rect x="240" y="186" width="8" height="4" fill={OUTLINE} />
            <rect x="240" y="140" width="8" height="12" fill={YELLOW} />
          </g>

          {/* ---------- Rear (slides) ---------- */}
          <g className="lc-tuk-rear">
            <path d="M244 34 H352 Q 368 34 368 50 V 58 H244" fill={ROOF} stroke={OUTLINE} strokeWidth="4" />
            <rect x="244" y="60" width="96" height="50" fill={INTERIOR} />
            <path d="M262 108 V 88 Q 262 78 274 78 H 330 V 108 Z" fill="#7a2230" />
            <rect x="338" y="58" width="12" height="54" fill={RED_DARK} stroke={OUTLINE} strokeWidth="3" />
            <rect x="350" y="58" width="16" height="54" fill={RED} stroke={OUTLINE} strokeWidth="3" />
            <path d="M244 110 H350 Q 372 110 372 140 V 168 Q 372 188 350 188 H244" fill={RED} stroke={OUTLINE} strokeWidth="4" />
            <path d="M244 140 H371 V 152 H244 Z" fill={YELLOW} />
            <rect x="366" y="118" width="7" height="14" rx="2" fill="#ff8a1f" stroke={OUTLINE} strokeWidth="2" />
            <path d="M296 196 A 30 30 0 0 1 350 196" fill="none" stroke={RED_DARK} strokeWidth="6" />
            <Wheel cx={322} cy={198} r={24} />
          </g>

          {/* Face */}
          <Eye cx={146} cy={88} rx={12} ry={14} pupil={5.5} lid={ROOF} outline={OUTLINE} />
          <Eye cx={178} cy={88} rx={13} ry={15} pupil={6} lid={ROOF} outline={OUTLINE} />
          <Blush cx={150} cy={124} rx={9} ry={5} />
          <Sweat x={196} y={72} />
          <Zzz x={200} y={28} />
          <circle cx="102" cy="126" r="9" fill="#fff3b0" stroke={OUTLINE} strokeWidth="3" />
          <path d="M104 160 Q 120 176 142 164" fill="none" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />

          {/* Front wheel */}
          <path d="M102 196 A 28 28 0 0 1 154 196" fill="none" stroke={RED_DARK} strokeWidth="6" />
          <Wheel cx={128} cy={198} r={22} />
        </g>
      </g>
    </CharacterSvg>
  )
}
