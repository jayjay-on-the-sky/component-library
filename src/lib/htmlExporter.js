/**
 * htmlExporter — captures a rendered component as a self-contained HTML file.
 *
 * Strategy:
 * 1. Clone the live DOM node from PreviewCanvas
 * 2. Inline all computed styles on every element (so no external CSS needed)
 * 3. Collect the current :root CSS custom properties (active theme tokens)
 * 4. Wrap in a complete HTML document with:
 *    - Geist + JetBrains Mono from Google Fonts
 *    - Tailwind CDN (for utility classes not captured by computed styles)
 *    - Inlined :root token vars (so the component is theme-accurate)
 *    - The cloned DOM
 *
 * Output is a complete .html file that opens in any browser / Reveal.js iframe.
 *
 * Reveal.js usage:
 *   <section>
 *     <iframe src="Button-primary.html" style="width:100%;height:500px;border:none;"/>
 *   </section>
 *
 * Or paste the inner snippet directly into a slide <div>:
 *   Just grab the content inside <body> from the exported file.
 */

/**
 * Collect all :root CSS custom properties currently applied to the document.
 * Includes both the shell vars and the active theme token vars.
 */
function collectRootVars() {
  const styles = getComputedStyle(document.documentElement)
  const vars = {}

  // Walk all stylesheets to find declared custom properties
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.selectorText === ':root') {
          const text = rule.cssText
          const matches = text.matchAll(/--([\w-]+)\s*:/g)
          for (const m of matches) {
            const name = `--${m[1]}`
            const value = styles.getPropertyValue(name).trim()
            if (value) vars[name] = value
          }
        }
      }
    } catch {
      // Cross-origin stylesheets — skip
    }
  }

  // Also capture any inline overrides applied by themeApplier
  const inlineStyle = document.documentElement.style
  for (const prop of inlineStyle) {
    if (prop.startsWith('--')) {
      vars[prop] = inlineStyle.getPropertyValue(prop).trim()
    }
  }

  return vars
}

/**
 * Inline computed styles onto every element in the clone so the snapshot
 * is self-contained (independent of external CSS files).
 *
 * We only inline a curated subset of properties — inlining everything
 * produces enormous files and breaks layout (e.g. `position: static` on every div).
 */
const INLINE_PROPS = [
  'color', 'background-color', 'border-color', 'border-width', 'border-style',
  'border-radius', 'font-family', 'font-size', 'font-weight', 'line-height',
  'letter-spacing', 'text-align', 'text-decoration', 'text-transform',
  'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height',
  'display', 'flex-direction', 'align-items', 'justify-content', 'gap',
  'flex', 'flex-wrap', 'flex-shrink', 'flex-grow',
  'grid-template-columns', 'grid-template-rows', 'grid-column', 'grid-row',
  'position', 'top', 'right', 'bottom', 'left', 'z-index',
  'overflow', 'overflow-x', 'overflow-y',
  'box-shadow', 'opacity', 'transform', 'transition',
  'cursor', 'pointer-events', 'user-select',
  'white-space', 'word-break', 'text-overflow',
  'list-style', 'outline', 'outline-offset',
  'vertical-align', 'object-fit', 'object-position',
]

function inlineStyles(clone, original) {
  const cloneEls = clone.querySelectorAll('*')
  const origEls = original.querySelectorAll('*')

  cloneEls.forEach((el, i) => {
    const orig = origEls[i]
    if (!orig) return
    const computed = getComputedStyle(orig)
    const inlined = []
    for (const prop of INLINE_PROPS) {
      const val = computed.getPropertyValue(prop)
      if (val && val !== 'initial' && val !== 'normal' && val !== 'none' && val !== '0px') {
        inlined.push(`${prop}:${val}`)
      }
    }
    if (inlined.length) {
      // Merge with any existing style so we don't lose inline overrides
      const existing = el.getAttribute('style') || ''
      el.setAttribute('style', existing + ';' + inlined.join(';'))
    }
  })
}

/**
 * Main export function.
 * @param {HTMLElement} domNode - The rendered component DOM node
 * @param {string} componentName - Used in file name + HTML title
 * @param {string} variantLabel - Used in file name
 * @param {{ width?: number, height?: number, background?: string }} opts
 * @returns {{ html: string, filename: string }}
 */
export function exportAsHtml(domNode, componentName, variantLabel = 'default', opts = {}) {
  const {
    width = 1280,
    height = 720,
    background = 'var(--color-canvas, #ffffff)',
    centerContent = true,
  } = opts

  // Collect active CSS vars
  const rootVars = collectRootVars()
  const rootVarsCss = Object.entries(rootVars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n')

  // Clone the DOM
  const clone = domNode.cloneNode(true)

  // Optionally inline computed styles for max portability
  inlineStyles(clone, domNode)

  const innerHtml = clone.outerHTML

  const filename = `${componentName}-${variantLabel.toLowerCase().replace(/\s+/g, '-')}.html`

  const html = `<!DOCTYPE html>
<!--
  ${componentName} — ${variantLabel}
  Exported from CompLib · https://github.com/your-username/component-library

  ── Reveal.js usage ──────────────────────────────────────────────────────────
  Option A — iframe (recommended, live interactive):
    <section>
      <iframe src="${filename}" style="width:100%;height:500px;border:none;"/>
    </section>

  Option B — inline snippet:
    Copy the <div id="complib-root"> block below into your slide <section>.
    Also copy the <style> block into your presentation's <head>.

  Option C — 16:9 full-slide (${width}×${height}):
    This file renders at ${width}×${height} by default. Perfect for 1:1 embedding.
──────────────────────────────────────────────────────────────────────────────
-->
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${componentName} — ${variantLabel}</title>

  <!-- Fonts: Geist (UI) + JetBrains Mono (code) -->
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>

  <!-- Tailwind CDN — utility classes that weren't captured by computed styles -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary:       'var(--color-primary)',
            canvas:        'var(--color-canvas)',
            surface:       'var(--color-surface)',
            ink:           'var(--color-ink)',
            hairline:      'var(--color-hairline)',
          },
          fontFamily: {
            sans: ['Geist', 'system-ui', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
        }
      }
    }
  </script>

  <style>
    /* ── Active theme tokens (captured from CompLib at export time) ── */
    :root {
${rootVarsCss}
    }

    /* ── Reset & base ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; }

    body {
      font-family: 'Geist', system-ui, sans-serif;
      background: ${background};
      width: ${width}px;
      height: ${height}px;
      overflow: hidden;
    }

    #complib-root {
      width: 100%;
      height: 100%;
      ${centerContent ? 'display: flex; align-items: center; justify-content: center;' : ''}
      padding: 48px;
    }
  </style>
</head>
<body>
  <div id="complib-root">
    ${innerHtml}
  </div>
</body>
</html>`

  return { html, filename }
}

/**
 * Download the HTML export as a file.
 */
export function downloadHtml(domNode, componentName, variantLabel, opts) {
  const { html, filename } = exportAsHtml(domNode, componentName, variantLabel, opts)
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/**
 * Copy the full HTML string to the clipboard.
 */
export function copyHtml(domNode, componentName, variantLabel, opts) {
  const { html } = exportAsHtml(domNode, componentName, variantLabel, opts)
  return navigator.clipboard.writeText(html)
}

/**
 * Copy just the inner snippet (body content) for pasting into an existing HTML file.
 */
export function copySnippet(domNode, componentName, variantLabel) {
  const { html } = exportAsHtml(domNode, componentName, variantLabel)
  // Extract just the #complib-root content
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const root = doc.getElementById('complib-root')
  return navigator.clipboard.writeText(root ? root.innerHTML.trim() : html)
}
