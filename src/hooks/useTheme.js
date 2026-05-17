/**
 * useTheme — subscribes to the theme store and exposes:
 *   - themeState: { base, variants, activeId }
 *   - loadTheme(mdString): parse design.md and apply
 *   - applyVariant(id): switch active variant
 *   - generateVariant(label, description): call variantAgent and store result
 *   - resetTheme(): clear back to defaults
 *   - isLoading: boolean during async operations
 *   - error: string | null
 */

import { useState, useEffect, useCallback } from 'react'
import { parseDesignMd, parseDesignMdMeta } from '../lib/designMdParser'
import { applyTheme, resetTheme as resetCssVars } from '../lib/themeApplier'
import { generateVariant as agentGenerateVariant } from '../lib/variantAgent'
import {
  getThemeState,
  subscribe,
  setBaseTheme,
  addVariant,
  setActiveTheme,
  removeVariant,
  getActiveTokenMap,
  clearTheme,
} from '../lib/themeStore'

export function useTheme() {
  const [themeState, setThemeState] = useState(getThemeState)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => subscribe(setThemeState), [])

  // Apply active token map whenever activeId or variants change
  useEffect(() => {
    const map = getActiveTokenMap()
    if (Object.keys(map).length > 0) applyTheme(map)
  }, [themeState.activeId, themeState.variants.length])

  const loadTheme = useCallback((mdString) => {
    setError(null)
    const tokenMap = parseDesignMd(mdString)
    const meta = parseDesignMdMeta(mdString)
    if (Object.keys(tokenMap).length === 0) {
      setError('No color tokens found in this design.md. Check the format.')
      return
    }
    setBaseTheme(meta.name, tokenMap, meta)
    applyTheme(tokenMap)
  }, [])

  const applyVariant = useCallback((id) => {
    setActiveTheme(id)
  }, [])

  const generateVariant = useCallback(async (label, description) => {
    setIsLoading(true)
    setError(null)
    try {
      const baseMap = themeState.base?.tokenMap ?? {}
      if (Object.keys(baseMap).length === 0) throw new Error('Load a base theme first.')
      const newMap = await agentGenerateVariant(baseMap, description)
      const meta = parseDesignMdMeta('')
      addVariant(label, newMap, meta)
      applyTheme(newMap)
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }, [themeState.base])

  const resetTheme = useCallback(() => {
    clearTheme()
    resetCssVars()
    setError(null)
  }, [])

  const deleteVariant = useCallback((id) => {
    removeVariant(id)
  }, [])

  return {
    themeState,
    isLoading,
    error,
    loadTheme,
    applyVariant,
    generateVariant,
    resetTheme,
    deleteVariant,
  }
}
