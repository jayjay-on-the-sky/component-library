/**
 * Applies a token map to CSS custom properties on :root.
 *
 * The token map comes from designMdParser.parseDesignMd().
 * Each key maps to a --color-* CSS variable.
 *
 * Example: { primary: '#ff385c' } → sets --color-primary: #ff385c
 *
 * Shell chrome vars (--shell-*) are never touched — the shell stays dark.
 */
export function applyTheme(tokenMap) {
  const root = document.documentElement

  // Map known token names to CSS var names
  const varMap = {
    'primary':         '--color-primary',
    'primary-hover':   '--color-primary-hover',
    'primary-active':  '--color-primary-active',
    'primary-focus':   '--color-primary-hover',   // alias
    'primary-muted':   '--color-primary-muted',
    'primary-on-dark': '--color-primary',          // alias for dark-surface links
    'canvas':          '--color-canvas',
    'canvas-parchment':'--color-canvas',           // alias
    'canvas-soft':     '--color-surface',          // alias
    'surface':         '--color-surface',
    'surface-soft':    '--color-surface',
    'surface-strong':  '--color-surface-strong',
    'surface-card':    '--color-canvas',           // alias
    'surface-pearl':   '--color-surface',          // alias
    'ink':             '--color-ink',
    'ink-muted-80':    '--color-ink-muted',
    'body':            '--color-body',
    'body-strong':     '--color-ink',
    'muted':           '--color-muted',
    'muted-soft':      '--color-muted',
    'hairline':        '--color-hairline',
    'hairline-soft':   '--color-hairline',
    'divider-soft':    '--color-hairline',
    'on-primary':      '--color-on-primary',
    'semantic-success':'--color-success',
    'semantic-error':  '--color-error',
    'primary-error-text':'--color-error',
  }

  for (const [tokenName, hex] of Object.entries(tokenMap)) {
    const cssVar = varMap[tokenName]
    if (cssVar) {
      root.style.setProperty(cssVar, hex)
    }
  }
}

/**
 * Resets component theme tokens back to the dark default.
 */
export function resetTheme() {
  const root = document.documentElement
  const defaults = {
    '--color-primary':        '#6366f1',
    '--color-primary-hover':  '#4f46e5',
    '--color-primary-active': '#4338ca',
    '--color-primary-muted':  '#eef2ff',
    '--color-canvas':         '#ffffff',
    '--color-surface':        '#f4f4f5',
    '--color-surface-strong': '#e4e4e7',
    '--color-ink':            '#09090b',
    '--color-ink-muted':      '#3f3f46',
    '--color-body':           '#52525b',
    '--color-muted':          '#a1a1aa',
    '--color-hairline':       '#e4e4e7',
    '--color-on-primary':     '#ffffff',
    '--color-success':        '#16a34a',
    '--color-warning':        '#d97706',
    '--color-error':          '#dc2626',
  }
  for (const [k, v] of Object.entries(defaults)) {
    root.style.setProperty(k, v)
  }
}
