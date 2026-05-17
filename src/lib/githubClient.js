/**
 * GitHub API client — triggers Actions workflows and reads/writes repo files.
 * All secrets live in env vars (VITE_GITHUB_TOKEN, VITE_GITHUB_OWNER, VITE_GITHUB_REPO).
 * The UI never calls Claude directly — all AI runs server-side in GitHub Actions.
 */

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN
const OWNER = import.meta.env.VITE_GITHUB_OWNER
const REPO  = import.meta.env.VITE_GITHUB_REPO

const BASE = `https://api.github.com/repos/${OWNER}/${REPO}`

function headers() {
  return {
    'Accept': 'application/vnd.github+json',
    'Authorization': `Bearer ${TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  }
}

async function ghFetch(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, { ...options, headers: headers() })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`GitHub API ${res.status} on ${path}: ${body}`)
  }
  return res.status === 204 ? null : res.json()
}

// ─── Workflow Dispatch ────────────────────────────────────────────────────────

/**
 * Trigger a workflow_dispatch event and return the new run ID.
 * Polls /actions/runs to find the run that was just created (by timestamp).
 */
export async function triggerWorkflow(workflowFile, inputs = {}) {
  if (!TOKEN || !OWNER || !REPO) {
    throw new Error('GitHub env vars not set. Add VITE_GITHUB_TOKEN, VITE_GITHUB_OWNER, VITE_GITHUB_REPO to .env')
  }

  const before = new Date().toISOString()

  await ghFetch(`/actions/workflows/${workflowFile}/dispatches`, {
    method: 'POST',
    body: JSON.stringify({ ref: 'main', inputs }),
  })

  // Poll until we see the new run appear (max 15s)
  for (let i = 0; i < 15; i++) {
    await sleep(1000)
    const { workflow_runs: runs } = await ghFetch(
      `/actions/workflows/${workflowFile}/runs?per_page=5&event=workflow_dispatch`
    )
    const newRun = runs.find(r => r.created_at >= before)
    if (newRun) return newRun.id
  }

  throw new Error('Timed out waiting for workflow run to appear')
}

/**
 * Poll a run until status is completed. Returns { conclusion, success }.
 * @param {number} runId
 * @param {{ onLog?: (msg:string)=>void, intervalMs?: number, timeoutMs?: number }} opts
 */
export async function pollWorkflowRun(runId, { onLog, intervalMs = 4000, timeoutMs = 300_000 } = {}) {
  const deadline = Date.now() + timeoutMs
  let lastStatus = ''

  while (Date.now() < deadline) {
    const run = await ghFetch(`/actions/runs/${runId}`)
    if (run.status !== lastStatus) {
      lastStatus = run.status
      onLog?.(`Status: ${run.status}`)
    }

    if (run.status === 'completed') {
      return { conclusion: run.conclusion, success: run.conclusion === 'success', run }
    }

    await sleep(intervalMs)
  }

  throw new Error(`Workflow run ${runId} timed out after ${timeoutMs / 1000}s`)
}

/**
 * Convenience: trigger + poll in one call.
 * @returns {{ conclusion, success, run }}
 */
export async function runWorkflow(workflowFile, inputs = {}, pollOpts = {}) {
  const runId = await triggerWorkflow(workflowFile, inputs)
  pollOpts.onLog?.(`Run #${runId} started`)
  return pollWorkflowRun(runId, pollOpts)
}

// ─── File Read / Write ────────────────────────────────────────────────────────

/**
 * Read a file from the repo. Returns decoded string content.
 */
export async function readFile(path) {
  const data = await ghFetch(`/contents/${path}`)
  return atob(data.content.replace(/\n/g, ''))
}

/**
 * Read a file and return { content: string, sha: string }.
 * sha is needed for updates.
 */
export async function readFileMeta(path) {
  const data = await ghFetch(`/contents/${path}`)
  return { content: atob(data.content.replace(/\n/g, '')), sha: data.sha }
}

/**
 * Write (create or update) a file in the repo.
 * Automatically fetches the current sha if updating an existing file.
 */
export async function writeFile(path, content, message = `chore: update ${path}`) {
  let sha
  try {
    const meta = await readFileMeta(path)
    sha = meta.sha
  } catch {
    // File doesn't exist yet — create it
  }

  await ghFetch(`/contents/${path}`, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: btoa(unescape(encodeURIComponent(content))),
      ...(sha ? { sha } : {}),
    }),
  })
}

/**
 * List files in a directory. Returns array of { name, path, type }.
 */
export async function listDirectory(path) {
  try {
    const items = await ghFetch(`/contents/${path}`)
    return Array.isArray(items) ? items : []
  } catch {
    return []
  }
}

// ─── Theme helpers ────────────────────────────────────────────────────────────

/**
 * Load all theme variant files from /themes/. Returns array of parsed JSON objects.
 */
export async function loadAllThemes() {
  const files = await listDirectory('themes')
  const jsonFiles = files.filter(f => f.name.endsWith('.json'))

  const results = await Promise.allSettled(jsonFiles.map(f => readFile(f.path)))
  return results
    .filter(r => r.status === 'fulfilled')
    .map(r => {
      try { return JSON.parse(r.value) } catch { return null }
    })
    .filter(Boolean)
}

/**
 * Save a theme variant to /themes/{themeName}--{variantLabel}.json
 */
export async function saveTheme(themeName, variantLabel, tokens, description = '') {
  const safeTheme = themeName.toLowerCase().replace(/\s+/g, '-')
  const safeLabel = variantLabel.toLowerCase().replace(/\s+/g, '-')
  const path = `themes/${safeTheme}--${safeLabel}.json`

  const content = JSON.stringify({
    theme: themeName,
    variant: variantLabel,
    description,
    savedAt: new Date().toISOString(),
    tokens,
  }, null, 2)

  await writeFile(path, content, `feat(theme): save ${themeName} / ${variantLabel}`)
}

// ─── Config check ─────────────────────────────────────────────────────────────

export function isConfigured() {
  return Boolean(TOKEN && OWNER && REPO)
}

export function getRepoUrl() {
  return `https://github.com/${OWNER}/${REPO}`
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
