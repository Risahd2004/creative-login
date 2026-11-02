import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import {
  DEFAULT_CHARACTER_ID,
  getCharacter,
  type Look,
  type Mood,
} from '../../characters/registry'
import { Burst } from '../../components/Burst/Burst'
import { CharacterPicker } from '../../components/CharacterPicker/CharacterPicker'
import { TextField } from '../../components/TextField/TextField'
import {
  getPasswordStrength,
  validateEmail,
  validateLogin,
  validatePassword,
  type LoginCredentials,
  type LoginErrors,
} from './validation'
import styles from './LoginPage.module.css'

type Field = keyof LoginCredentials

const validators: Record<Field, (value: string) => string | undefined> = {
  email: validateEmail,
  password: validatePassword,
}

const CHARACTER_STORAGE_KEY = 'login.character'
/** Character dozes off after this long without any activity. */
const SLEEP_AFTER_MS = 15000

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function readStoredCharacter(): string {
  try {
    return localStorage.getItem(CHARACTER_STORAGE_KEY) ?? DEFAULT_CHARACTER_ID
  } catch {
    return DEFAULT_CHARACTER_ID
  }
}

/** Characters glance from the start of the input toward the caret as you type. */
function lookAtText(length: number): Look {
  return { x: -0.7 + (Math.min(length, 28) / 28) * 1.6, y: 0.9 }
}

export interface LoginPageProps {
  /**
   * Called with validated credentials. Throw (or reject) with an Error to
   * show its message on the form. Wire this to your auth API.
   */
  onLogin: (credentials: LoginCredentials) => Promise<void>
  forgotPasswordHref?: string
  signUpHref?: string
  /** Optional link to the character gallery. */
  galleryHref?: string
  /** Optional link back to the home page. */
  homeHref?: string
}

export function LoginPage({
  onLogin,
  forgotPasswordHref = '#forgot-password',
  signUpHref = '#sign-up',
  galleryHref,
  homeHref,
}: LoginPageProps) {
  const [values, setValues] = useState<LoginCredentials>({ email: '', password: '' })
  const [errors, setErrors] = useState<LoginErrors>({})
  const [touched, setTouched] = useState<Record<Field, boolean>>({
    email: false,
    password: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  // ----- Character state -----
  const [characterId, setCharacterId] = useState(readStoredCharacter)
  const [focused, setFocused] = useState<Field | null>(null)
  const [passwordRevealed, setPasswordRevealed] = useState(false)
  const [flash, setFlash] = useState<'error' | 'happy' | null>(null)
  const flashTimer = useRef<number | undefined>(undefined)
  const flashFrame = useRef<number | undefined>(undefined)

  const illustrationRef = useRef<HTMLDivElement>(null)
  const [pointerLook, setPointerLook] = useState<Look>({ x: 0, y: 0 })
  const [asleep, setAsleep] = useState(false)
  const [burstTick, setBurstTick] = useState(0)

  useEffect(
    () => () => {
      window.clearTimeout(flashTimer.current)
      window.cancelAnimationFrame(flashFrame.current ?? 0)
    },
    [],
  )

  // Eyes follow the mouse; any activity wakes the character, inactivity puts it to sleep.
  useEffect(() => {
    let frame = 0
    let sleepTimer = 0
    const resetSleep = () => {
      setAsleep(false)
      window.clearTimeout(sleepTimer)
      sleepTimer = window.setTimeout(() => setAsleep(true), SLEEP_AFTER_MS)
    }
    const onPointerMove = (event: PointerEvent) => {
      resetSleep()
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = illustrationRef.current?.getBoundingClientRect()
        if (!rect) return
        const x = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
        const y = (event.clientY - (rect.top + rect.height / 2)) / rect.height
        setPointerLook({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) })
      })
    }
    const events = ['keydown', 'pointerdown', 'focusin', 'scroll'] as const
    window.addEventListener('pointermove', onPointerMove)
    events.forEach((e) => window.addEventListener(e, resetSleep))
    resetSleep()
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(sleepTimer)
      window.removeEventListener('pointermove', onPointerMove)
      events.forEach((e) => window.removeEventListener(e, resetSleep))
    }
  }, [])

  /** Tiny squash-and-stretch on every keystroke. */
  const squash = () => {
    if (prefersReducedMotion()) return
    illustrationRef.current?.animate(
      [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(1.025, 0.97) translateY(2px)' },
        { transform: 'scale(1, 1)' },
      ],
      { duration: 180, easing: 'ease-out' },
    )
  }

  /** Play a one-off reaction; restarts the animation if already playing. */
  const playFlash = (kind: 'error' | 'happy', duration: number) => {
    window.clearTimeout(flashTimer.current)
    window.cancelAnimationFrame(flashFrame.current ?? 0)
    setFlash(null)
    flashFrame.current = window.requestAnimationFrame(() => {
      setFlash(kind)
      flashTimer.current = window.setTimeout(() => setFlash(null), duration)
    })
  }

  const selectCharacter = (id: string) => {
    setCharacterId(id)
    try {
      localStorage.setItem(CHARACTER_STORAGE_KEY, id)
    } catch {
      // Storage unavailable (private mode etc.) – selection still works for this visit.
    }
  }

  const setFieldError = (field: Field, value: string) =>
    setErrors((prev) => ({ ...prev, [field]: validators[field](value) }))

  const handleChange = (field: Field) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setValues((prev) => ({ ...prev, [field]: value }))
    setFormError(null)
    squash()
    if (touched[field]) setFieldError(field, value)
  }

  const handleFocus = (field: Field) => () => setFocused(field)

  const handleBlur = (field: Field) => () => {
    setFocused((current) => (current === field ? null : current))
    // Don't nag about an untouched empty field when the user just tabs past it.
    if (!values[field] && !touched[field]) return
    setTouched((prev) => ({ ...prev, [field]: true }))
    setFieldError(field, values[field])
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return

    const nextErrors = validateLogin(values)
    setErrors(nextErrors)
    setTouched({ email: true, password: true })

    if (nextErrors.email || nextErrors.password) {
      playFlash('error', 650)
      return (nextErrors.email ? emailRef : passwordRef).current?.focus()
    }

    setSubmitting(true)
    setFormError(null)
    try {
      await onLogin({ email: values.email.trim(), password: values.password })
      playFlash('happy', 1600)
      setBurstTick((t) => t + 1)
    } catch (err) {
      playFlash('error', 650)
      setFormError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const strength = getPasswordStrength(values.password)

  // Celebrate the moment the password first reaches "great".
  const prevLevel = useRef(strength.level)
  useEffect(() => {
    if (strength.level === 'great' && prevLevel.current !== 'great') setBurstTick((t) => t + 1)
    prevLevel.current = strength.level
  }, [strength.level])

  const character = getCharacter(characterId)
  const mood: Mood =
    flash ??
    (focused === 'password' && passwordRevealed
      ? 'shy'
      : focused
        ? 'watch'
        : asleep
          ? 'sleep'
          : 'idle')
  const look: Look = focused ? lookAtText(values[focused].length) : pointerLook

  const isValid = (field: Field) => touched[field] && !errors[field] && values[field] !== ''

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <div className={styles.pickerRow}>
          <CharacterPicker value={character.id} onChange={selectCharacter} />
        </div>

        <header className={styles.header}>
          <h1 id="login-title" className={styles.title}>
            Welcome Back!
          </h1>
          <p className={styles.subtitle}>Good to see you again.</p>
        </header>

        <div ref={illustrationRef} className={styles.illustration} data-mood={mood}>
          <div key={character.id} className={styles.actor}>
            <character.Component stretch={strength.score} mood={mood} look={look} />
          </div>
          <Burst emoji={character.confetti} tick={burstTick} />
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <TextField
            ref={emailRef}
            label="Email"
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            value={values.email}
            onChange={handleChange('email')}
            onFocus={handleFocus('email')}
            onBlur={handleBlur('email')}
            error={errors.email}
            valid={isValid('email')}
          />

          <div className={styles.passwordGroup}>
            <TextField
              ref={passwordRef}
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              required
              value={values.password}
              onChange={handleChange('password')}
              onFocus={handleFocus('password')}
              onBlur={handleBlur('password')}
              onRevealChange={setPasswordRevealed}
              error={errors.password}
              valid={isValid('password')}
              hint={
                strength.level !== 'none' ? (
                  <span className={`${styles.strength} ${styles[strength.level]}`}>
                    {character.strengthLabels[strength.level]}
                  </span>
                ) : (
                  ''
                )
              }
            />
            <a className={styles.forgot} href={forgotPasswordHref}>
              Forgot Password?
            </a>
          </div>

          {formError && (
            <p className={styles.formError} role="alert">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className={styles.submit}
            disabled={submitting}
            aria-busy={submitting}
          >
            {submitting ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Logging in…
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className={styles.signup}>
          Don’t have an account?{' '}
          <a className={styles.signupLink} href={signUpHref}>
            Sign Up
          </a>
        </p>

        {(homeHref || galleryHref) && (
          <p className={styles.galleryLink}>
            {homeHref && <a href={homeHref}>← Home</a>}
            {homeHref && galleryHref && <span aria-hidden="true"> · </span>}
            {galleryHref && <a href={galleryHref}>Browse all characters &amp; get the code →</a>}
          </p>
        )}
      </section>
    </main>
  )
}
