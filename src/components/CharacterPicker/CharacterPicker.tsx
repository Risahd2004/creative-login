import { useRef, type KeyboardEvent } from 'react'
import { CHARACTERS } from '../../characters/registry'
import styles from './CharacterPicker.module.css'

interface CharacterPickerProps {
  value: string
  onChange: (id: string) => void
}

/** Accessible radio group (roving tabindex, arrow-key navigation). */
export function CharacterPicker({ value, onChange }: CharacterPickerProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([])

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    }
    let next: number | undefined
    if (event.key in keys) next = (index + keys[event.key] + CHARACTERS.length) % CHARACTERS.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = CHARACTERS.length - 1
    if (next === undefined) return

    event.preventDefault()
    onChange(CHARACTERS[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div className={styles.picker} role="radiogroup" aria-label="Choose your buddy">
      {CHARACTERS.map((c, i) => {
        const selected = c.id === value
        return (
          <button
            key={c.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={c.name}
            title={c.name}
            tabIndex={selected ? 0 : -1}
            className={styles.option}
            onClick={() => onChange(c.id)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          >
            <span aria-hidden="true">{c.emoji}</span>
          </button>
        )
      })}
    </div>
  )
}
