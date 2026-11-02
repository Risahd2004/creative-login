import { useState } from 'react'
import { CHARACTERS, type CharacterDefinition, type Mood } from '../characters/registry'
import { Logo } from '../components/Logo/Logo'
import { buildStandalone } from './buildStandalone'
import styles from './GalleryPage.module.css'

const MOODS: Mood[] = ['idle', 'watch', 'shy', 'error', 'happy', 'sleep']

// Raw source files, loaded only when someone asks for the code.
const sources = import.meta.glob<string>('../characters/*.tsx', { query: '?raw', import: 'default' })

async function loadStandalone(character: CharacterDefinition): Promise<string> {
  const loadCore = sources['../characters/core.tsx']
  const loadCharacter = sources[`../characters/${character.componentName}.tsx`]
  if (!loadCore || !loadCharacter) throw new Error(`Source not found for ${character.componentName}`)
  const [core, file] = await Promise.all([loadCore(), loadCharacter()])
  return buildStandalone(core, file, {
    componentName: character.componentName,
    displayName: character.name,
    description: character.description,
  })
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    document.execCommand('copy')
    area.remove()
  }
}

function downloadText(filename: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

function CharacterCard({ character }: { character: CharacterDefinition }) {
  const [stretch, setStretch] = useState(0.5)
  const [mood, setMood] = useState<Mood>('idle')
  const [code, setCode] = useState<string | null>(null)
  const [showCode, setShowCode] = useState(false)
  const [status, setStatus] = useState('')

  const getCode = async () => {
    if (code) return code
    const built = await loadStandalone(character)
    setCode(built)
    return built
  }

  const flashStatus = (message: string) => {
    setStatus(message)
    window.setTimeout(() => setStatus(''), 2000)
  }

  const handleCopy = async () => {
    await copyText(await getCode())
    flashStatus('Copied!')
  }

  const handleDownload = async () => {
    downloadText(`${character.componentName}.tsx`, await getCode())
    flashStatus('Downloaded')
  }

  const handleToggleCode = async () => {
    if (!showCode) await getCode()
    setShowCode((v) => !v)
  }

  const sliderId = `stretch-${character.id}`
  const { Component } = character

  return (
    <article className={styles.card} aria-labelledby={`title-${character.id}`}>
      <header className={styles.cardHeader}>
        <span className={styles.emoji} aria-hidden="true">
          {character.emoji}
        </span>
        <div>
          <h2 id={`title-${character.id}`} className={styles.cardTitle}>
            {character.name}
          </h2>
          <p className={styles.cardText}>{character.description}</p>
        </div>
      </header>

      <div className={styles.stage}>
        <Component stretch={stretch} mood={mood} look={mood === 'watch' ? { x: 0.3, y: 0.8 } : undefined} />
      </div>

      <div className={styles.controls}>
        <label htmlFor={sliderId} className={styles.controlLabel}>
          Strength <span>{Math.round(stretch * 100)}%</span>
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={100}
          value={Math.round(stretch * 100)}
          onChange={(e) => setStretch(Number(e.target.value) / 100)}
          className={styles.slider}
        />

        <div className={styles.moods} role="group" aria-label={`${character.name} mood`}>
          {MOODS.map((m) => (
            <button
              key={m}
              type="button"
              className={styles.moodButton}
              aria-pressed={mood === m}
              onClick={() => setMood(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.primary} onClick={handleCopy}>
          Copy code
        </button>
        <button type="button" className={styles.secondary} onClick={handleDownload}>
          Download .tsx
        </button>
        <button
          type="button"
          className={styles.ghost}
          onClick={handleToggleCode}
          aria-expanded={showCode}
          aria-controls={`code-${character.id}`}
        >
          {showCode ? 'Hide code' : 'View code'}
        </button>
        <span className={styles.status} role="status">
          {status}
        </span>
      </div>

      {showCode && code && (
        <pre id={`code-${character.id}`} className={styles.code} tabIndex={0}>
          <code>{code}</code>
        </pre>
      )}
    </article>
  )
}

export default function GalleryPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <nav className={styles.nav} aria-label="Site">
          <a className={styles.back} href="#/" aria-label="Creative Login home">
            <Logo size={28} />
          </a>
          <a className={styles.back} href="#/login">
            Login demo
          </a>
        </nav>
        <h1 className={styles.title}>Creative Login</h1>
        <p className={styles.subtitle}>
          Pick a character, play with it, then copy one self-contained <code>.tsx</code> file.
          It only needs React; no CSS files or extra packages.
        </p>
        <pre className={styles.usage}>
          <code>{`import { Macaque } from './Macaque'

<Macaque stretch={passwordStrength} mood="watch" look={{ x: 0, y: 1 }} />`}</code>
        </pre>
      </header>

      <div className={styles.grid}>
        {CHARACTERS.map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>
    </main>
  )
}
