import { useState } from 'react'
import { getCharacter, type Mood } from '../characters/registry'
import { Burst } from '../components/Burst/Burst'
import { CharacterPicker } from '../components/CharacterPicker/CharacterPicker'
import { Logo } from '../components/Logo/Logo'
import { getPasswordStrength } from '../features/auth/validation'
import styles from './HomePage.module.css'

const PURPOSES = [
  {
    icon: '😊',
    title: 'Friendlier login & sign-up',
    text: 'Turns a boring form into a small moment of fun, so people enjoy the first screen of your app instead of rushing past it.',
  },
  {
    icon: '🔐',
    title: 'Nudges stronger passwords',
    text: 'The character grows, fills up or lights up as the password gets stronger, giving playful visual feedback instead of only red error text.',
  },
  {
    icon: '👀',
    title: 'Clear, friendly feedback',
    text: 'It watches while you type, closes its eyes when the password is shown, shakes when login fails and celebrates when it succeeds.',
  },
  {
    icon: '🧩',
    title: 'Easy for developers',
    text: 'Each character is one self-contained React file: no CSS files, no extra packages. Accessible and respects reduced motion.',
  },
]

const USE_CASES = [
  'Login pages',
  'Sign-up forms',
  'Password reset screens',
  'Onboarding flows',
  'Portfolio & hackathon projects',
  'Learning UI animation',
]

const STEPS = [
  { title: 'Pick a character', text: 'Browse the gallery and play with strength and moods.' },
  { title: 'Copy one file', text: 'Click “Copy code” or download the .tsx file.' },
  { title: 'Connect it', text: 'Pass your password strength as stretch (0 to 1) and set the mood.' },
]

interface HomePageProps {
  loginHref: string
  galleryHref: string
}

export function HomePage({ loginHref, galleryHref }: HomePageProps) {
  const [characterId, setCharacterId] = useState('macaque')
  const [text, setText] = useState('')
  const [focused, setFocused] = useState(false)
  const [burstTick, setBurstTick] = useState(0)

  const character = getCharacter(characterId)
  const strength = getPasswordStrength(text)
  const mood: Mood = focused ? 'watch' : 'idle'
  const look = focused ? { x: -0.7 + (Math.min(text.length, 28) / 28) * 1.6, y: 0.9 } : undefined

  const handleChange = (value: string) => {
    const wasGreat = strength.level === 'great'
    setText(value)
    if (!wasGreat && getPasswordStrength(value).level === 'great') setBurstTick((t) => t + 1)
  }

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <a className={styles.brand} href="#/" aria-label="Creative Login home">
          <Logo size={38} />
        </a>
        <nav className={styles.topnav} aria-label="Main">
          <a href={loginHref}>Login demo</a>
          <a href={galleryHref}>Gallery</a>
        </nav>
      </header>

      <main>
      {/* ---------- Hero ---------- */}
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroText}>
          <h1 id="home-title" className={styles.title}>
            Creative Login
          </h1>
          <p className={styles.tagline}>Login forms with characters that react while you type.</p>
          <p className={styles.lead}>
            Creative Login is a collection of animated characters for login, sign-up and password
            pages. They make the first screen of your app feel friendly, and they encourage people
            to choose stronger passwords.
          </p>
          <div className={styles.ctas}>
            <a className={styles.primary} href={loginHref}>
              Try the login demo
            </a>
            <a className={styles.secondary} href={galleryHref}>
              Get a character
            </a>
          </div>
        </div>

        <div className={styles.demo}>
          <div className={styles.demoPicker}>
            <CharacterPicker value={character.id} onChange={setCharacterId} />
          </div>
          <div className={styles.demoStage}>
            <character.Component stretch={strength.score} mood={mood} look={look} />
            <Burst emoji={character.confetti} tick={burstTick} />
          </div>
          <label htmlFor="demo-input" className={styles.demoLabel}>
            Try typing a password
          </label>
          <input
            id="demo-input"
            className={styles.demoInput}
            type="text"
            autoComplete="off"
            spellCheck={false}
            placeholder="e.g. Kandy#2026-Tea"
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-describedby="demo-hint demo-note"
          />
          <p
            id="demo-hint"
            className={`${styles.demoHint} ${strength.level !== 'none' ? styles[strength.level] : ''}`}
            aria-live="polite"
          >
            {strength.level === 'none' ? ' ' : character.strengthLabels[strength.level]}
          </p>
          <p id="demo-note" className={styles.demoNote}>
            Just a demo: nothing you type is saved or sent anywhere.
          </p>
        </div>
      </section>

      {/* ---------- Purpose ---------- */}
      <section className={styles.section} aria-labelledby="purpose-title">
        <h2 id="purpose-title" className={styles.sectionTitle}>
          What is it for?
        </h2>
        <div className={styles.cards}>
          {PURPOSES.map((p) => (
            <article key={p.title} className={styles.card}>
              <span className={styles.cardIcon} aria-hidden="true">
                {p.icon}
              </span>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardText}>{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Use cases ---------- */}
      <section className={styles.section} aria-labelledby="usecases-title">
        <h2 id="usecases-title" className={styles.sectionTitle}>
          Where can you use it?
        </h2>
        <ul className={styles.chips}>
          {USE_CASES.map((u) => (
            <li key={u} className={styles.chip}>
              {u}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- How it works ---------- */}
      <section className={styles.section} aria-labelledby="how-title">
        <h2 id="how-title" className={styles.sectionTitle}>
          How it works
        </h2>
        <ol className={styles.steps}>
          {STEPS.map((s, i) => (
            <li key={s.title} className={styles.step}>
              <span className={styles.stepNumber} aria-hidden="true">
                {i + 1}
              </span>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardText}>{s.text}</p>
            </li>
          ))}
        </ol>
        <pre className={styles.code}>
          <code>{`import { Macaque } from './Macaque'

<Macaque stretch={passwordStrength} mood="watch" />`}</code>
        </pre>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className={styles.final} aria-labelledby="final-title">
        <h2 id="final-title" className={styles.sectionTitle}>
          Make your login page smile
        </h2>
        <div className={styles.ctas}>
          <a className={styles.primary} href={loginHref}>
            Try the login demo
          </a>
          <a className={styles.secondary} href={galleryHref}>
            Browse all characters
          </a>
        </div>
      </section>

      </main>

      <footer className={styles.footer}>
        <Logo size={22} withText={false} />
        <span>Creative Login · Made with React &amp; SVG</span>
      </footer>
    </div>
  )
}
