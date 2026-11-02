import { Blush, CharacterSvg, Eye, Sweat, Zzz, type CharacterProps } from './core'

const CSS = `
/* Tail droops at stretch 0 and curls up over the back at 1. */
.lc-leopard-tail {
  transform-box: view-box;
  transform-origin: 450px 120px;
  transform: rotate(calc(var(--stretch) * -150deg));
  transition: transform 0.6s cubic-bezier(0.34, 1.4, 0.64, 1);
}

.lc-leopard[data-full='true'] .lc-leopard-tail {
  animation: lc-leopard-flick 1s ease-in-out infinite;
}

.lc-leopard-rosette,
.lc-leopard-rosetteOn {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  transition:
    transform 0.35s cubic-bezier(0.34, 1.8, 0.64, 1),
    opacity 0.25s ease;
}

.lc-leopard-rosette {
  opacity: 0;
  transform: scale(0.2);
}

.lc-leopard-rosetteOn {
  opacity: 1;
  transform: scale(1);
}

.lc-leopard-head {
  transform-box: view-box;
  transform-origin: 230px 140px;
  transition: transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1);
}

.lc-leopard[data-mood='watch'] .lc-leopard-head {
  transform: rotate(-5deg);
}

.lc-leopard[data-mood='shy'] .lc-leopard-head {
  transform: rotate(7deg);
}

.lc-leopard-breathe {
  animation: lc-leopard-breathe 3.4s ease-in-out infinite;
}

@keyframes lc-leopard-flick {
  0%,
  100% {
    transform: rotate(-150deg);
  }
  50% {
    transform: rotate(-138deg);
  }
}

@keyframes lc-leopard-breathe {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1.5px);
  }
}
`

const OUTLINE = '#3a2410'
const FUR = '#e8a83e'
const FUR_SHADE = '#c98a2a'
const BELLY = '#f7e2b5'
const ROSETTE_FILL = '#d38f2a'

/** Rosette positions on the body, in the order they appear. */
const ROSETTES: Array<[number, number]> = [
  [290, 112],
  [330, 100],
  [372, 104],
  [412, 114],
  [310, 136],
  [352, 128],
  [394, 136],
  [262, 132],
  [434, 136],
  [372, 152],
]

/**
 * Sri Lankan leopard (Panthera pardus kotiya): password strength fills in its
 * rosettes and raises its tail.
 */
export function Leopard(props: CharacterProps) {
  const s = Math.min(1, Math.max(0, props.stretch ?? 0))

  return (
    <CharacterSvg {...props} name="lc-leopard" css={CSS}>
      <g className="lc-leopard-breathe">
        <ellipse cx="330" cy="224" rx="160" ry="9" fill="rgba(0,0,0,0.08)" />

        {/* Far legs */}
        <g fill={FUR_SHADE} stroke={OUTLINE} strokeWidth="4">
          <rect x="250" y="150" width="26" height="66" rx="12" />
          <rect x="404" y="150" width="26" height="66" rx="12" />
        </g>

        {/* Tail: droops when weak, curls up when strong */}
        <g className="lc-leopard-tail">
          <path d="M450 120 C 480 140, 488 180, 476 214" fill="none" stroke={OUTLINE} strokeWidth="18" strokeLinecap="round" />
          <path d="M450 120 C 480 140, 488 180, 476 214" fill="none" stroke={FUR} strokeWidth="11" strokeLinecap="round" />
          <circle cx="476" cy="214" r="6" fill={OUTLINE} />
          <g fill={OUTLINE}>
            <circle cx="474" cy="160" r="3" />
            <circle cx="480" cy="186" r="3" />
          </g>
        </g>

        {/* Body */}
        <ellipse cx="345" cy="128" rx="112" ry="46" fill={FUR} stroke={OUTLINE} strokeWidth="4" />
        <ellipse cx="340" cy="158" rx="78" ry="12" fill={BELLY} />

        {/* Rosettes appear with strength */}
        {ROSETTES.map(([cx, cy], i) => {
          const shown = s >= (i + 1) / (ROSETTES.length + 1)
          return (
            <g key={i} className={shown ? 'lc-leopard-rosetteOn' : 'lc-leopard-rosette'}>
              <circle cx={cx} cy={cy} r="7" fill={ROSETTE_FILL} stroke={OUTLINE} strokeWidth="3.5" strokeDasharray="9 4" />
            </g>
          )
        })}

        {/* Near legs + paws */}
        <g fill={FUR} stroke={OUTLINE} strokeWidth="4">
          <rect x="226" y="150" width="30" height="66" rx="13" />
          <rect x="380" y="150" width="30" height="66" rx="13" />
          <ellipse cx="238" cy="214" rx="20" ry="8" />
          <ellipse cx="392" cy="214" rx="20" ry="8" />
        </g>

        {/* Head */}
        <g className="lc-leopard-head">
          {/* Ears */}
          <g stroke={OUTLINE} strokeWidth="4" strokeLinejoin="round">
            <path d="M190 72 L 196 44 L 218 60 Z" fill={FUR} />
            <path d="M226 60 L 248 44 L 250 74 Z" fill={FUR} />
          </g>
          <path d="M197 66 L 199 52 L 210 61 Z" fill={OUTLINE} opacity="0.55" />
          <path d="M234 61 L 244 53 L 245 68 Z" fill={OUTLINE} opacity="0.55" />

          <circle cx="218" cy="100" r="44" fill={FUR} stroke={OUTLINE} strokeWidth="4" />
          <ellipse cx="190" cy="118" rx="26" ry="19" fill={BELLY} />
          <g fill={OUTLINE}>
            <circle cx="232" cy="70" r="3" />
            <circle cx="244" cy="80" r="2.5" />
            <circle cx="220" cy="66" r="2.5" />
            <circle cx="250" cy="100" r="3" />
            <circle cx="246" cy="118" r="2.5" />
          </g>
          <Blush cx={228} cy={122} rx={8} ry={5} />
          <Sweat x={252} y={76} />
          <Zzz x={262} y={50} />

          <Eye cx={196} cy={94} rx={10} ry={11} pupil={5} lid={FUR} outline={OUTLINE} />
          <Eye cx={226} cy={92} rx={11} ry={12} pupil={5.5} lid={FUR} outline={OUTLINE} />

          {/* Nose, mouth, whiskers */}
          <path d="M168 108 Q 176 104 182 110 Q 176 118 168 108 Z" fill="#b5545c" stroke={OUTLINE} strokeWidth="2" />
          <path d="M176 116 Q 174 126 182 128 Q 188 128 190 122" fill="none" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <g stroke={OUTLINE} strokeWidth="1.8" strokeLinecap="round" opacity="0.7">
            <path d="M184 120 L 158 116" />
            <path d="M184 124 L 160 128" />
          </g>
        </g>
      </g>
    </CharacterSvg>
  )
}
