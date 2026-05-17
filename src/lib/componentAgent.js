/**
 * Agent that generates React components on demand.
 *
 * Two entry points:
 *   generateFromPrompt(prompt)  — user describes what they want
 *   generateFromScan(urlOrDesc) — agent extracts from a URL/image description
 *
 * Both return: { jsx: string, meta: string, name: string, category: string }
 * The caller is responsible for writing files (via GitHub API or local FS).
 */

import { callClaude, extractCodeBlock } from './claudeClient'

const COMPONENT_SYSTEM_PROMPT = `You are an expert React component engineer building a premium component library.
Your components must meet the quality bar of shadcn/ui, Vercel's design system, and Linear's UI.

RULES — follow all of them without exception:
1. Use ONLY these Tailwind token classes for colors:
   bg-primary, text-primary, border-primary, bg-primary-hover, bg-primary-active,
   bg-canvas, bg-surface, bg-surface-strong, text-ink, text-ink-muted, text-body,
   text-muted, border-hairline, text-on-primary, text-success, text-warning, text-error,
   bg-success, bg-warning, bg-error
   NEVER use hardcoded hex values or named Tailwind colors like blue-500 or zinc-900.

2. Use the cn() utility from '../lib/utils' for ALL className composition:
   import { cn } from '../lib/utils'

3. Use React.forwardRef on every interactive element.

4. Apply Framer Motion micro-interactions:
   - Buttons: whileTap={{ scale: 0.97 }} transition={{ duration: 0.08 }}
   - Dropdowns/Modals: initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
   - Use AnimatePresence for conditional renders

5. Use Radix UI primitives for: Dialog, Tooltip, Select, Tabs, Switch.

6. Include complete ARIA attributes (role, aria-label, aria-disabled, aria-expanded).

7. Export compound sub-components where the component has distinct regions:
   Card → Card, Card.Header, Card.Body, Card.Footer

8. Font families: font-sans (Geist) for UI text, font-mono (JetBrains Mono) for code.

9. Self-evaluate: "Does this look like something Vercel or Linear would ship?"
   If no, revise before outputting.

OUTPUT FORMAT — output exactly two fenced code blocks, nothing else:

\`\`\`jsx
// ComponentName.jsx
[full component code]
\`\`\`

\`\`\`js
// ComponentName.meta.js
export default {
  name: 'ComponentName',
  category: 'Category',
  description: 'One sentence description.',
  variants: [
    { label: 'Default', props: {} },
    { label: 'Variant Name', props: { propName: value } },
  ]
}
\`\`\``

const SCAN_SYSTEM_PROMPT = `You are an expert UI reverse-engineer. Given a description of a UI component or a URL to analyze,
extract its structure and recreate it as a React component following the same rules as below.

Focus on: the component's visual structure, spacing, states, and interactions.
Simplify where needed — the goal is a clean, reusable component, not a pixel-perfect replica.

${COMPONENT_SYSTEM_PROMPT}`

/**
 * Generate a component from a natural language prompt.
 */
export async function generateFromPrompt(userPrompt) {
  const text = await callClaude(COMPONENT_SYSTEM_PROMPT, userPrompt, { maxTokens: 3000 })
  return parseGeneratorOutput(text)
}

/**
 * Generate a component by scanning a URL or image description.
 */
export async function generateFromScan(urlOrDescription) {
  const prompt = urlOrDescription.startsWith('http')
    ? `Analyze this URL and extract the most interesting UI component from it, then recreate it: ${urlOrDescription}`
    : `Recreate this UI component based on this description: ${urlOrDescription}`

  const text = await callClaude(SCAN_SYSTEM_PROMPT, prompt, { maxTokens: 3000 })
  return parseGeneratorOutput(text)
}

function parseGeneratorOutput(text) {
  // Extract JSX block
  const jsxMatch = text.match(/```(?:jsx|tsx|js)?\n([\s\S]*?)```/)
  const metaMatch = text.match(/```(?:js|jsx)?\n([\s\S]*?export default[\s\S]*?)```/)

  const jsx = jsxMatch ? jsxMatch[1].trim() : text
  const meta = metaMatch ? metaMatch[1].trim() : ''

  // Extract component name from jsx
  const nameMatch = jsx.match(/(?:export default function|const)\s+(\w+)/)
  const name = nameMatch ? nameMatch[1] : 'GeneratedComponent'

  // Extract category from meta
  const catMatch = meta.match(/category:\s*['"](.+?)['"]/)
  const category = catMatch ? catMatch[1] : 'Generated'

  return { jsx, meta, name, category }
}
