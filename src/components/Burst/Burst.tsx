import type { CSSProperties } from 'react'
import styles from './Burst.module.css'

interface BurstProps {
  /** Emoji to throw. */
  emoji: string
  /** Increment to play the burst again; 0 renders nothing. */
  tick: number
  count?: number
}

/** One-shot emoji confetti burst (decorative). */
export function Burst({ emoji, tick, count = 14 }: BurstProps) {
  if (tick === 0) return null

  return (
    <div key={tick} className={styles.burst} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const angle = (360 / count) * i + ((i * 37) % 20) - 10
        const distance = 90 + ((i * 53) % 70)
        return (
          <span
            key={i}
            className={styles.piece}
            style={
              {
                '--angle': `${angle}deg`,
                '--distance': `${distance}px`,
                '--spin': `${(i % 2 ? 1 : -1) * (90 + i * 20)}deg`,
                animationDelay: `${(i % 4) * 30}ms`,
              } as CSSProperties
            }
          >
            {emoji}
          </span>
        )
      })}
    </div>
  )
}
