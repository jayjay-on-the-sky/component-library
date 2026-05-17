/**
 * useRegistry — loads all component metadata via Vite's import.meta.glob.
 * Returns:
 *   - components: array of { name, category, description, variants, Component, source }
 *   - categories: unique sorted list of category strings
 *   - search(query): filters components by name/description
 *
 * Meta files:
 *   - *.meta.js  — plain JS, no JSX (simple components)
 *   - *.meta.jsx — contains JSX (demo wrappers, compound previews)
 * Both are eagerly imported and merged into the same registry.
 */

import { useMemo, useState } from 'react'

// ── Meta discovery: both .meta.js and .meta.jsx ────────────────────────────
const metaModulesJs  = import.meta.glob('../components/**/*.meta.js',  { eager: true })
const metaModulesJsx = import.meta.glob('../components/**/*.meta.jsx', { eager: true })

// ── Component modules (for live render) ───────────────────────────────────
const compModules = import.meta.glob('../components/**/*.jsx', { eager: true })

// ── Raw source strings (for code panel) ───────────────────────────────────
const rawModules = import.meta.glob('../components/**/*.jsx', {
  eager: true,
  query: '?raw',
  import: 'default',
})

// Merge both meta glob maps
const allMetaModules = { ...metaModulesJs, ...metaModulesJsx }

function buildRegistry() {
  return Object.entries(allMetaModules).map(([metaPath, metaMod]) => {
    const meta = metaMod.default

    // Resolve the matching .jsx component file
    // handles both .meta.js → .jsx and .meta.jsx → .jsx
    const compPath = metaPath.replace(/\.meta\.(js|jsx)$/, '.jsx')
    const compMod = compModules[compPath]
    const Component = compMod?.default ?? null
    const source = rawModules[compPath] ?? ''

    return {
      ...meta,
      Component,
      source,
      id: meta.name.toLowerCase().replace(/\s+/g, '-'),
    }
  }).sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name))
}

export function useRegistry() {
  const [query, setQuery] = useState('')

  const allComponents = useMemo(() => buildRegistry(), [])

  const categories = useMemo(() =>
    [...new Set(allComponents.map(c => c.category))].sort(),
    [allComponents]
  )

  const components = useMemo(() => {
    if (!query.trim()) return allComponents
    const q = query.toLowerCase()
    return allComponents.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.description?.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
    )
  }, [allComponents, query])

  return { components, categories, query, setQuery, total: allComponents.length }
}
