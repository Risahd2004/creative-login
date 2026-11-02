/**
 * Combines `core.tsx` with one character file into a single self-contained
 * .tsx file (React is its only dependency) that can be pasted into any
 * React + TypeScript project.
 */

const REACT_IMPORT = /^import\s+(type\s+)?\{([^}]*)\}\s+from\s+'react'\s*;?\s*$/gm
const CORE_IMPORT = /^import\s+[^\n]*from\s+'\.\/core'\s*;?\s*\n/gm

function collectReactImports(source: string, into: Set<string>): string {
  return source.replace(REACT_IMPORT, (_line, typeOnly: string | undefined, names: string) => {
    for (const raw of names.split(',')) {
      const name = raw.trim()
      if (!name) continue
      into.add(typeOnly && !name.startsWith('type ') ? `type ${name}` : name)
    }
    return ''
  })
}

const sortImports = (a: string, b: string) =>
  a.replace(/^type /, '').localeCompare(b.replace(/^type /, ''))

export interface StandaloneOptions {
  componentName: string
  displayName: string
  description: string
}

export function buildStandalone(
  coreSource: string,
  characterSource: string,
  { componentName, displayName, description }: StandaloneOptions,
): string {
  const reactImports = new Set<string>()
  const core = collectReactImports(coreSource, reactImports).trim()
  const character = collectReactImports(characterSource, reactImports)
    .replace(CORE_IMPORT, '')
    .trim()

  const header = `/**
 * ${displayName} – animated login character from Creative Login (single-file, React only)
 * ${description}
 *
 * Usage:
 *   import { ${componentName} } from './${componentName}'
 *
 *   <${componentName}
 *     stretch={0.6}               // 0..1, e.g. password strength
 *     mood="watch"                // idle | watch | shy | error | happy | sleep
 *     look={{ x: 0.3, y: 0.8 }}   // eye direction, each axis -1..1
 *   />
 *
 * Decorative only (aria-hidden). Respects prefers-reduced-motion.
 */`

  const importLine = reactImports.size
    ? `import { ${[...reactImports].sort(sortImports).join(', ')} } from 'react'\n\n`
    : ''

  return `${header}\n${importLine}${core}\n\n// ---------------------------------------------------------------------------\n// ${displayName}\n// ---------------------------------------------------------------------------\n\n${character}\n`
}
