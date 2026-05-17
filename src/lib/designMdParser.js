/**
 * Parses a design.md string and extracts color tokens.
 *
 * Matches lines like:
 *   **Rausch** (`{colors.primary}` — #ff385c): ...
 *
 * Returns a flat map: { 'primary': '#ff385c', 'canvas': '#ffffff', ... }
 * Also extracts typography tokens from the hierarchy table where possible.
 */
export function parseDesignMd(mdString) {
  const tokens = {}

  // ── Color tokens ──────────────────────────────────────────────
  // Pattern: `{colors.token-name}` — #hexvalue
  const colorRegex = /`\{colors\.([\w-]+)\}`\s*[—–-]\s*(#[0-9a-fA-F]{6,8})/g
  let match
  while ((match = colorRegex.exec(mdString)) !== null) {
    tokens[match[1]] = match[2].toLowerCase()
  }

  // ── Fallback: bare hex after token name in parentheses ────────
  // Pattern: (`{colors.primary}` — #ff385c)
  const altRegex = /\(\s*`\{colors\.([\w-]+)\}`\s*[—–-]\s*(#[0-9a-fA-F]{6,8})\s*\)/g
  while ((match = altRegex.exec(mdString)) !== null) {
    if (!tokens[match[1]]) tokens[match[1]] = match[2].toLowerCase()
  }

  return tokens
}

/**
 * Extracts metadata about the design system from the Overview section.
 * Returns { name, primaryAccent, fontFamily, canvasColor }
 */
export function parseDesignMdMeta(mdString) {
  const nameMatch = mdString.match(/^#\s+(.+)$/m)
  const name = nameMatch ? nameMatch[1].replace(/design\.md/i, '').trim() : 'Custom Theme'

  const tokens = parseDesignMd(mdString)

  return {
    name,
    primaryAccent: tokens['primary'] || null,
    canvas: tokens['canvas'] || null,
    ink: tokens['ink'] || null,
    tokenCount: Object.keys(tokens).length,
  }
}
