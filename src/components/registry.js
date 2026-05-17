/**
 * Auto-discovers all components via Vite's import.meta.glob.
 * Used by useRegistry hook — do not import directly in components.
 *
 * Each meta file exports a default object:
 * { name, category, description, variants: [{ label, props, Component? }] }
 *
 * If a variant has a `Component` prop, PreviewCanvas renders that instead
 * of the default exported component — useful for demo wrappers.
 *
 * Meta files can be .meta.js (no JSX) or .meta.jsx (contains JSX).
 * Both are auto-discovered by the glob patterns in useRegistry.js.
 */

// This file is intentionally thin — all logic lives in useRegistry.js.
// It exists as the documented entry point for the registry pattern.
export const REGISTRY_GLOB_JS  = '../components/**/*.meta.js'
export const REGISTRY_GLOB_JSX = '../components/**/*.meta.jsx'
