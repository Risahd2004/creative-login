export interface LoginCredentials {
  email: string
  password: string
}

export type LoginErrors = Partial<Record<keyof LoginCredentials, string>>

export const PASSWORD_MIN_LENGTH = 8

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateEmail(value: string): string | undefined {
  const email = value.trim()
  if (!email) return 'Please enter your email address.'
  if (!EMAIL_PATTERN.test(email)) return 'That email doesn’t look quite right.'
  return undefined
}

export function validatePassword(value: string): string | undefined {
  if (!value) return 'Please enter your password.'
  if (value.length < PASSWORD_MIN_LENGTH)
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`
  return undefined
}

export type StrengthLevel = 'none' | 'weak' | 'fair' | 'strong' | 'great'

export interface PasswordStrength {
  /** 0..1 */
  score: number
  level: StrengthLevel
  label: string
}

/**
 * Lightweight strength heuristic: length (up to 16 chars) is worth 60%,
 * character variety (lower, upper, digit, symbol) the remaining 40%.
 */
export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, level: 'none', label: '' }

  const lengthScore = Math.min(password.length, 16) / 16
  const variety = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((re) =>
    re.test(password),
  ).length
  const score = Math.min(1, lengthScore * 0.6 + (variety / 4) * 0.4)

  if (score < 0.35) return { score, level: 'weak', label: 'Weak' }
  if (score < 0.6) return { score, level: 'fair', label: 'Okay' }
  if (score < 0.85) return { score, level: 'strong', label: 'Strong' }
  return { score, level: 'great', label: 'Very strong' }
}

export function validateLogin(values: LoginCredentials): LoginErrors {
  const errors: LoginErrors = {}
  const email = validateEmail(values.email)
  const password = validatePassword(values.password)
  if (email) errors.email = email
  if (password) errors.password = password
  return errors
}
