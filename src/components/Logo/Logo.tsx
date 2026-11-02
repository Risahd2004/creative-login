import styles from './Logo.module.css'

interface LogoProps {
  /** Height of the mark in px. */
  size?: number
  /** Show the "Creative Login" wordmark next to the mark. */
  withText?: boolean
  className?: string
}

/**
 * Creative Login logo: a padlock with cartoon eyes.
 * The shackle lifts ("unlocks") when a parent link is hovered/focused.
 * Keep in sync with public/favicon.svg.
 */
export function Logo({ size = 36, withText = true, className }: LogoProps) {
  return (
    <span className={[styles.logo, className].filter(Boolean).join(' ')}>
      <svg
        className={styles.mark}
        width={size}
        height={size}
        viewBox="0 0 64 64"
        role="img"
        aria-label={withText ? undefined : 'Creative Login'}
        aria-hidden={withText ? true : undefined}
      >
        <path
          className={styles.shackle}
          d="M21 30 V21 a11 11 0 0 1 22 0 V30"
          fill="none"
          stroke="#20C66B"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <rect x="9" y="27" width="46" height="32" rx="13" fill="#111" />
        <circle cx="25" cy="42" r="7.5" fill="#fff" />
        <circle cx="40" cy="42" r="7.5" fill="#fff" />
        <g className={styles.pupils} fill="#111">
          <circle cx="27.5" cy="43" r="3.4" />
          <circle cx="42.5" cy="43" r="3.4" />
        </g>
        <path d="M28 52.5 Q 32.5 56 37 52.5" fill="none" stroke="#20C66B" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
      {withText && <span className={styles.text}>Creative Login</span>}
    </span>
  )
}
