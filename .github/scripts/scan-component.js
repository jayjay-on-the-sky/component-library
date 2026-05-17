#!/usr/bin/env node
/**
 * Called by scan-component.yml GitHub Action.
 * Usage: node scan-component.js "<urlOrDescription>" "<ComponentName>" "<category>"
 */

import path from 'path'
import { callClaude, writeFile, COMPONENT_SYSTEM_PROMPT } from './claude-helpers.js'

const [, , source, componentName, category = 'Display'] = process.argv

if (!source || !componentName) {
  console.error('Usage: scan-component.js "<source>" "<ComponentName>" "[category]"')
  process.exit(1)
}

console.log(`Scanning source for: ${componentName}`)
console.log(`Source: ${source}`)

const scanSystemPrompt = `You are an expert UI reverse-engineer AND React component engineer.
Given a URL or UI description, extract the most interesting reusable component and recreate it
as a production-quality React component.

Focus on structure, spacing, states, and interactions. Simplify where needed for reusability.

${COMPONENT_SYSTEM_PROMPT}`

const userPrompt = source.startsWith('http')
  ? `Analyze this URL and extract the most compelling reusable UI component, then recreate it as "${componentName}" in category "${category}": ${source}`
  : `Recreate this UI as a React component called "${componentName}" in category "${category}": ${source}`

const text = await callClaude(scanSystemPrompt, userPrompt)

const jsxBlock = text.match(/```(?:jsx|tsx)?\n([\s\S]*?)```/)
const metaBlock = text.match(/```(?:js|javascript)?\n([\s\S]*?export default[\s\S]*?)```/)

if (!jsxBlock) {
  console.error('No JSX block found in Claude output')
  process.exit(1)
}

const jsx = jsxBlock[1].trim()
const meta = metaBlock ? metaBlock[1].trim() : `export default {
  name: '${componentName}',
  category: '${category}',
  description: 'Extracted from: ${source.slice(0, 80)}',
  variants: [{ label: 'Default', props: {} }],
}`

const dir = path.join('src', 'components', componentName)
writeFile(path.join(dir, `${componentName}.jsx`), jsx)
writeFile(path.join(dir, `${componentName}.meta.js`), meta)

console.log(`\n✅ ${componentName} extracted successfully`)
