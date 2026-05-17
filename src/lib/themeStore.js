/**
 * In-memory theme store.
 * Holds the base theme + any generated variants.
 * Variant tabs in ThemePanel read from here.
 *
 * This is a simple pub/sub store — no external state library needed.
 */

const listeners = new Set()

let state = {
  /** { name, tokenMap, meta } */
  base: null,
  /** Array of { id, label, tokenMap, meta } */
  variants: [],
  /** id of the active variant, or 'base' */
  activeId: 'base',
}

export function getThemeState() {
  return { ...state }
}

export function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

function notify() {
  listeners.forEach(fn => fn({ ...state }))
}

export function setBaseTheme(name, tokenMap, meta = {}) {
  state = { ...state, base: { name, tokenMap, meta }, variants: [], activeId: 'base' }
  notify()
}

export function addVariant(label, tokenMap, meta = {}) {
  const id = `variant-${Date.now()}`
  state = {
    ...state,
    variants: [...state.variants, { id, label, tokenMap, meta }],
    activeId: id,
  }
  notify()
  return id
}

export function setActiveTheme(id) {
  state = { ...state, activeId: id }
  notify()
}

export function removeVariant(id) {
  state = {
    ...state,
    variants: state.variants.filter(v => v.id !== id),
    activeId: state.activeId === id ? 'base' : state.activeId,
  }
  notify()
}

export function getActiveTokenMap() {
  if (state.activeId === 'base') return state.base?.tokenMap ?? {}
  const v = state.variants.find(v => v.id === state.activeId)
  return v?.tokenMap ?? state.base?.tokenMap ?? {}
}

export function clearTheme() {
  state = { base: null, variants: [], activeId: 'base' }
  notify()
}
