import { forwardRef, useId, useState, type InputHTMLAttributes, type ReactNode } from 'react'
import styles from './TextField.module.css'

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string
  /** Error message; when set the field is marked invalid. */
  error?: string
  /** Show the green "valid" state (border + check). */
  valid?: boolean
  /** Helper content shown below the field when there is no error. */
  hint?: ReactNode
  /** Notified when the password visibility toggle changes. */
  onRevealChange?: (revealed: boolean) => void
  id?: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, valid = false, hint, onRevealChange, id, type = 'text', className, ...inputProps },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`
  const hintId = `${inputId}-hint`
  const showHint = !error && hint !== undefined
  const describedBy = error ? messageId : showHint && hint ? hintId : undefined
  const isPassword = type === 'password'
  const [revealed, setRevealed] = useState(false)

  const state = error ? styles.invalid : valid ? styles.valid : ''

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>

      <div className={`${styles.control} ${state}`}>
        <input
          ref={ref}
          id={inputId}
          type={isPassword && revealed ? 'text' : type}
          className={styles.input}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...inputProps}
        />

        {valid && !error && (
          <span className={styles.check} aria-hidden="true">
            <svg viewBox="0 0 20 20" width="20" height="20">
              <circle cx="10" cy="10" r="10" fill="currentColor" />
              <path
                d="M5.8 10.4l2.7 2.7 5.7-6"
                fill="none"
                stroke="#fff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}

        {isPassword && (
          <button
            type="button"
            className={styles.toggle}
            onClick={() => {
              const next = !revealed
              setRevealed(next)
              onRevealChange?.(next)
            }}
            aria-label={revealed ? 'Hide password' : 'Show password'}
            aria-pressed={revealed}
            aria-controls={inputId}
          >
            {revealed ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {showHint && (
        <div id={hintId} className={styles.hint} aria-live="polite">
          {hint}
        </div>
      )}

      {error && (
        <p id={messageId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  )
})

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        d="M10.6 5.1A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.1M6.6 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7a10 10 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
