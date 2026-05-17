/**
 * useRegistry — loads all component metadata via Vite's import.meta.glob.
 * Returns:
 *   - components: array of { name, category, description, variants, Component, source }
 *   - categories: unique sorted list of category strings
 *   - search(query): filters components by name/description
 */

import { useMemo, useState } from 'react'

// Eagerly import all meta files
const metaModules = import.meta.glob('../components/**/*.meta.js', { eager: true })
// Eagerly import all component files as modules (for live render)
const compModules = import.meta.glob('../components/**/*.jsx', { eager: true })
// Import source as raw strings (for code panel)
const rawModules = import.meta.glob('../components/**/*.jsx', { eager: true, query: '?raw', import: 'default' })

function buildRegistry() {
  return Object.entries(metaModules).map(([metaPath, metaMod]) => {
    const meta = metaMod.default

    // Derive component path from meta path: .../Button/Button.meta.js → .../Button/Button.jsx
    const compPath = metaPath.replace('.meta.js', '.jsx')
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
