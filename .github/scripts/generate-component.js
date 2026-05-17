#!/usr/bin/env node
/**
 * Called by generate-component.yml GitHub Action.
 * Usage: node generate-component.js "<prompt>" "<ComponentName>" "<category>"
 */

import path from 'path'
import { callClaude, writeFile, extractBlock, COMPONENT_SYSTEM_PROMPT } from './claude-helpers.js'

const [, , prompt, componentName, category = 'Display'] = process.argv

if (!prompt || !componentName) {
  console.error('Usage: generate-component.js "<prompt>" "<ComponentName>" "[category]"')
  process.exit(1)
}

console.log(`Generating component: ${componentName}`)
console.log(`Category: ${category}`)
console.log(`Prompt: ${prompt}`)

const userPrompt = `Create a React component called "${componentName}" in category "${category}".
Description: ${prompt}

Remember: only token Tailwind classes, cn(), forwardRef, Framer Motion, ARIA complete.`

const text = await callClaude(COMPONENT_SYSTEM_PROMPT, userPrompt)

// Extract the two code blocks
const jsxBlock = text.match(/```(?:jsx|tsx)?\n([\s\S]*?)```/)
const metaBlock = text.match(/```(?:js|javascript)?\n([\s\S]*?export default[\s\S]*?)```/)

if (!jsxBlock) {
  console.error('No JSX block found in Claude output')
  console.error(text)
  process.exit(1)
}

const jsx = jsxBlock[1].trim()
const meta = metaBlock ? metaBlock[1].trim() : `export default {
  name: '${componentName}',
  category: '${category}',
  description: 'Generated component.',
  variants: [{ label: 'Default', props: {} }],
}`

const dir = path.join('src', 'components', componentName)
writeFile(path.join(dir, `${componentName}.jsx`), jsx)
writeFile(path.join(dir, `${componentName}.meta.js`), meta)

console.log(`\n✅ ${componentName} generated successfully`)
