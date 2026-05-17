/**
 * Claude API client for component generation and variant creation.
 * Uses the Anthropic SDK via a server-side proxy pattern for the browser.
 *
 * In dev: calls /api/claude (proxied by Vite to avoid CORS)
 * Env var: VITE_ANTHROPIC_API_KEY
 *
 * Note: Exposing API keys in the browser is acceptable for a local dev tool.
 * For production, route through a backend.
 */

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY

/**
 * Low-level call to Claude claude-sonnet-4-5 with a system + user prompt.
 * Returns the assistant text response.
 */
export async function callClaude(systemPrompt, userPrompt, { model = 'claude-sonnet-4-5', maxTokens = 4096 } = {}) {
  if (!API_KEY) throw new Error('VITE_ANTHROPIC_API_KEY is not set. Add it to your .env file.')

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-allow-browser': 'true',
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
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

/**
 * Extracts a fenced code block from Claude's response.
 * Handles ```jsx, ```js, ```tsx, and bare ```.
 */
export function extractCodeBlock(text, lang = '') {
  const pattern = lang
    ? new RegExp(`\`\`\`(?:${lang}|jsx|tsx|js)?\\n([\\s\\S]*?)\`\`\``, 'i')
    : /```(?:\w+)?\n([\s\S]*?)```/
  const match = text.match(pattern)
  return match ? match[1].trim() : text.trim()
}
