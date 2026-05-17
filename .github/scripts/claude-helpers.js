// Shared helpers for all GitHub Actions scripts.
// Runs in Node.js 20 inside GitHub Actions — no bundler.

import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

const API_KEY = process.env.ANTHROPIC_API_KEY
if (!API_KEY) {
  console.error('ANTHROPIC_API_KEY is not set')
  process.exit(1)
}

/** Call Claude claude-sonnet-4-5 and return the text response */
export async function callClaude(systemPrompt, userPrompt) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Claude API error ${res.status}: ${err}`)
  }

  const data = await res.json()
  return data.content[0].text
}

/** Write a file, creating parent directories as needed */
export function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`✓ Written: ${filePath}`)
}

/** Extract a fenced code block from Claude output */
export function extractBlock(text, lang = '') {
  const pattern = lang
    ? new RegExp(`\`\`\`(?:${lang}|jsx|tsx|js)?\\n([\\s\\S]*?)\`\`\``, 'i')
    : /```(?:\w+)?\n([\s\S]*?)```/
  const m = text.match(pattern)
  return m ? m[1].trim() : text.trim()
}

export const COMPONENT_SYSTEM_PROMPT = `You are an expert React component engineer building a premium component library.
Your components must match the quality of shadcn/ui, Vercel's design system, and Linear's UI.

STRICT RULES — all must be followed:

1. Use ONLY these Tailwind token classes for ALL colors. Never hardcode hex or use named Tailwind colors:
   bg-primary, text-primary, border-primary
   bg-primary-hover, bg-primary-active, bg-primary-muted, text-on-primary
   bg-canvas, bg-surface, bg-surface-strong
   text-ink, text-ink-muted, text-body, text-muted
   border-hairline
   text-success, bg-success, text-warning, bg-warning, text-error, bg-error

2. Use cn() from '../../lib/utils' for all className composition.

3. Use React.forwardRef on every interactive element.

4. Apply Framer Motion:
   - Buttons/interactive: whileTap={{ scale: 0.97 }} transition={{ duration: 0.08 }}
   - Appearing elements: initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
   - Use AnimatePresence for conditional mounts

5. Use Radix UI for: Dialog, Tooltip, Select, Tabs, Switch — never hand-roll these.

6. Include complete ARIA (role, aria-label, aria-disabled, aria-expanded, aria-controls).

7. Export compound sub-components for components with distinct regions.

8. Font: font-sans (Geist) for UI, font-mono (JetBrains Mono) for code.

9. Self-check: "Would Vercel or Linear ship this?" If no, revise.

OUTPUT — exactly two fenced code blocks, nothing else:

\`\`\`jsx
// ComponentName.jsx
[full component code]
\`\`\`

\`\`\`js
// ComponentName.meta.js
export default {
  name: 'ComponentName',
  category: 'Category',
  description: 'One sentence.',
  variants: [{ label: 'Default', props: {} }, ...]
}
\`\`\``
