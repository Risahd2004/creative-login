import type { ComponentType } from 'react'
import { BaldHead } from './BaldHead'
import type { CharacterProps } from './core'
import { Dachshund } from './Dachshund'
import { Elephant } from './Elephant'
import { Leopard } from './Leopard'
import { Macaque } from './Macaque'
import { Peacock } from './Peacock'
import { TeaGlass } from './TeaGlass'
import { TukTuk } from './TukTuk'

export type { CharacterProps, Look, Mood } from './core'

/** Password-strength messages, themed per character. */
export interface StrengthLabels {
  weak: string
  fair: string
  strong: string
  great: string
}

export interface CharacterDefinition {
  id: string
  name: string
  emoji: string
  /** Exported component name = file name in src/characters (used by the gallery). */
  componentName: string
  /** What `stretch` does for this character. */
  description: string
  /** Emoji used in the celebration burst. */
  confetti: string
  Component: ComponentType<CharacterProps>
  strengthLabels: StrengthLabels
}

export const CHARACTERS: readonly CharacterDefinition[] = [
  {
    id: 'dog',
    name: 'Sausage dog',
    emoji: '🐶',
    componentName: 'Dachshund',
    description: 'Body stretches longer as the password gets stronger.',
    confetti: '🦴',
    Component: Dachshund,
    strengthLabels: {
      weak: 'Weak: that’s just a puppy',
      fair: 'Okay: keep stretching',
      strong: 'Strong: good boy!',
      great: 'Very strong: maximum sausage!',
    },
  },
  {
    id: 'elephant',
    name: 'Perahera elephant',
    emoji: '🐘',
    componentName: 'Elephant',
    description: 'Raises its trunk and lights the Perahera lamps one by one.',
    confetti: '🌸',
    Component: Elephant,
    strengthLabels: {
      weak: 'Weak: the lamps are still dark',
      fair: 'Okay: the Perahera is starting',
      strong: 'Strong: the procession is glowing',
      great: 'Very strong: ready for the Esala Perahera!',
    },
  },
  {
    id: 'peacock',
    name: 'Peacock',
    emoji: '🦚',
    componentName: 'Peacock',
    description: 'Fans its tail feathers open.',
    confetti: '✨',
    Component: Peacock,
    strengthLabels: {
      weak: 'Weak: tail feathers still folded',
      fair: 'Okay: the feathers are opening',
      strong: 'Strong: almost a full fan',
      great: 'Very strong: full peacock display!',
    },
  },
  {
    id: 'tuktuk',
    name: 'Tuk-tuk',
    emoji: '🛺',
    componentName: 'TukTuk',
    description: 'Stretches into a tuk-tuk limousine, wheels spinning.',
    confetti: '⭐',
    Component: TukTuk,
    strengthLabels: {
      weak: 'Weak: room for one passenger',
      fair: 'Okay: fits the whole family',
      strong: 'Strong: school-trip size!',
      great: 'Very strong: tuk-tuk limousine!',
    },
  },
  {
    id: 'leopard',
    name: 'Yala leopard',
    emoji: '🐆',
    componentName: 'Leopard',
    description: 'Rosettes pop in one by one and the tail rises.',
    confetti: '🐾',
    Component: Leopard,
    strengthLabels: {
      weak: 'Weak: hardly any spots yet',
      fair: 'Okay: the spots are coming in',
      strong: 'Strong: a proper Yala leopard',
      great: 'Very strong: king of Yala!',
    },
  },
  {
    id: 'macaque',
    name: 'Toque macaque',
    emoji: '🐒',
    componentName: 'Macaque',
    description: 'Climbs the coconut tree and grabs a king coconut.',
    confetti: '🍌',
    Component: Macaque,
    strengthLabels: {
      weak: 'Weak: still at the bottom of the tree',
      fair: 'Okay: halfway up the coconut tree',
      strong: 'Strong: almost at the thambili',
      great: 'Very strong: got the king coconut!',
    },
  },
  {
    id: 'tea',
    name: 'Kade plain tea',
    emoji: '🍵',
    componentName: 'TeaGlass',
    description: 'The glass fills with tea, bubbles, then steams.',
    confetti: '🍃',
    Component: TeaGlass,
    strengthLabels: {
      weak: 'Weak: the glass is nearly empty',
      fair: 'Okay: half a glass of tea',
      strong: 'Strong: nice and strong tea',
      great: 'Very strong: perfect Ceylon tea!',
    },
  },
  {
    id: 'bald',
    name: 'Bald buddy',
    emoji: '👨‍🦲',
    componentName: 'BaldHead',
    description: 'Grows a full head of hair as the password gets stronger.',
    confetti: '✂️',
    Component: BaldHead,
    strengthLabels: {
      weak: 'Weak: still shiny and bald',
      fair: 'Okay: a little fuzz is growing',
      strong: 'Strong: nice hairstyle!',
      great: 'Very strong: legendary hair!',
    },
  },
]

export const DEFAULT_CHARACTER_ID = CHARACTERS[0].id

export function getCharacter(id: string): CharacterDefinition {
  return CHARACTERS.find((c) => c.id === id) ?? CHARACTERS[0]
}
