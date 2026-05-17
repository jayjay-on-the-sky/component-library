#!/usr/bin/env node
/**
 * Called by generate-variant.yml GitHub Action.
 * Usage: node generate-variant.js '<tokenJson>' "<description>" "<label>" "<themeName>"
 */

import path from 'path'
import { callClaude, writeFile } from './claude-helpers.js'

const [, , tokenJson, description, label, themeName] = process.argv

if (!tokenJson || !description) {
  console.error('Usage: generate-variant.js \'<tokenJson>\' "<description>" "<label>" "<themeName>"')
  process.exit(1)
}

const baseTokens = JSON.parse(tokenJson)

console.log(`Generating "${label}" variant for theme: ${themeName}`)
console.log(`Description: ${description}`)

const systemPrompt = `You are a color system expert. Given a base color token map and a variant description,
produce a new token map that:
1. Keeps EXACTLY the same keys as the input
2. Changes hex values to match the variant description
3. Preserves role hierarchy (primary=CTA, canvas=background, ink=text)
4. Ensures WCAG AA contrast (4.5:1 minimum for text on background)
5. Keeps the palette cohesive

Output ONLY a valid JSON object — no markdown, no explanation.`

const userPrompt = `Base tokens:
${JSON.stringify(baseTokens, null, 2)}

Generate a "${description}" variant. Return only the JSON.`

const text = await callClaude(systemPrompt, userPrompt)

const jsonMatch = text.match(/\{[\s\S]*\}/)
if (!jsonMatch) {
  console.error('No JSON found in Claude output')
  process.exit(1)
}

const newTokens = JSON.parse(jsonMatch[0])

// Save as a design.md-compatible token file in /themes/
const safeThemeName = themeName.toLowerCase().replace(/\s+/g, '-')
const safeLabel = label.toLowerCase().replace(/\s+/g, '-')
const filename = `${safeThemeName}--${safeLabel}.json`

const output = JSON.stringify({
  theme: themeName,
  variant: label,
  description,
  generatedAt: new Date().toISOString(),
  tokens: newTokens,
}, null, 2)

writeFile(path.join('themes', filename), output)

console.log(`\n✅ Variant "${label}" generated: themes/${filename}`)
console.log(JSON.stringify(newTokens, null, 2))
