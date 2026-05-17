/**
 * Generates a color palette variant from an existing token map.
 *
 * Takes the active token map + a plain-English description of the variant
 * and returns a new token map with the same keys but different hex values.
 *
 * The agent preserves the role hierarchy (primary stays primary,
 * canvas stays the background, ink stays the text color) while
 * shifting the palette in the described direction.
 */

import { callClaude } from './claudeClient'

const VARIANT_SYSTEM_PROMPT = `You are a color system expert specializing in design token variants.

Given a base color token map and a variant description, produce a new token map that:
1. Keeps EXACTLY the same token keys as the input
2. Changes the hex values to match the variant description
3. Preserves color role hierarchy: primary stays the CTA color, canvas stays the background, ink stays readable on canvas
4. Ensures sufficient contrast (WCAG AA minimum: 4.5:1 for text on background)
5. Keeps the palette cohesive — all colors should feel like they belong together

Output ONLY a JSON object with the same keys as the input and new hex values. No explanation, no markdown, just the JSON.

Example output:
{
  "primary": "#e53e3e",
  "canvas": "#1a1a2e",
  "ink": "#e2e8f0",
  ...
}`

export async function generateVariant(baseTokenMap, variantDescription) {
  const tokenJson = JSON.stringify(baseTokenMap, null, 2)

  const userPrompt = `Base token map:
${tokenJson}

Generate a "${variantDescription}" variant of this color system.
Return only the JSON token map with the same keys and new hex values.`

  const text = await callClaude(VARIANT_SYSTEM_PROMPT, userPrompt, { maxTokens: 1000 })

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Variant agent did not return valid JSON')

  return JSON.parse(jsonMatch[0])
}
