import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { runWorkflow, isConfigured, getRepoUrl } from '../lib/githubClient'

const EXAMPLES = [
  'A pill badge with a count and semantic colors',
  'A notification toast with icon and dismiss',
  'A stat card with a trend indicator',
  'A segmented control with 3 options',
  'A step indicator / progress wizard',
]

const CATEGORIES = ['Display', 'Forms', 'Navigation', 'Feedback', 'Layout', 'Sections']

function toPascalCase(str) {
  return str
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('')
}

export default function CreateModal({ onClose }) {
  const [prompt, setPrompt] = useState('')
  const [componentName, setComponentName] = useState('')
  const [category, setCategory] = useState('Display')
  const [status, setStatus] = useState('idle') // idle | waiting | running | done | error
  const [log, setLog] = useState([])
  const [error, setError] = useState('')
  const configured = isConfigured()

  const addLog = msg => setLog(prev => [...prev, msg])

  const derivedName = componentName || toPascalCase(prompt)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setStatus('waiting')
    setLog([])
    setError('')

    try {
      addLog('Dispatching GitHub Actions workflow…')
      const { success, conclusion } = await runWorkflow(
        'generate-component.yml',
        {
          prompt: prompt.trim(),
          component_name: derivedName || 'MyComponent',
          category,
        },
        { onLog: addLog, intervalMs: 5000, timeoutMs: 180_000 }
      )

      if (success) {
        setStatus('done')
        addLog(`✓ ${derivedName} committed to repo`)
      } else {
        setStatus('error')
        setError(`Workflow ended with: ${conclusion}`)
      }
    } catch (e) {
      setStatus('error')
      setError(e.message)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.18 }}
        className="relative w-full max-w-xl bg-shell-sidebar border border-shell-border rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-shell-border">
          <div>
            <h2 className="text-sm font-semibold text-shell-text">Create Component</h2>
            <p className="text-[11px] text-shell-text-muted mt-0.5">
              Describe what you want — Claude builds it via GitHub Actions
            </p>
          </div>
          <button onClick={onClose} className="text-shell-text-muted hover:text-shell-text p-1 transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-3">
          {!configured && (
            <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-3 py-2 text-[11px] text-yellow-400">
              ⚠ GitHub env vars not set. Add VITE_GITHUB_TOKEN, VITE_GITHUB_OWNER, VITE_GITHUB_REPO to .env
            </div>
          )}

          {/* Suggestion chips */}
          <div className="flex flex-wrap gap-1.5">
            {EXAMPLES.map(ex => (
              <button
                key={ex}
                onClick={() => setPrompt(ex)}
                className="px-2.5 py-1 text-[11px] rounded-full border border-shell-border text-shell-text-muted hover:text-shell-text hover:border-shell-accent/50 transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>

          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && e.metaKey && handleGenerate()}
            placeholder="Describe the component you want… (⌘↵ to generate)"
            rows={3}
            className="w-full px-3 py-2.5 text-sm bg-shell-surface border border-shell-border rounded-lg text-shell-text placeholder-shell-text-muted focus:outline-none focus:border-shell-accent resize-none transition-colors"
          />

          {/* Name + category row */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={`Component name (${derivedName || 'auto'})`}
              value={componentName}
              onChange={e => setComponentName(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-shell-surface border border-shell-border rounded-lg text-shell-text placeholder-shell-text-muted focus:outline-none focus:border-shell-accent transition-colors"
            />
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="px-3 py-2 text-xs bg-shell-surface border border-shell-border rounded-lg text-shell-text focus:outline-none focus:border-shell-accent transition-colors"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Log output */}
          <AnimatePresence>
            {log.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-lg border border-shell-border bg-shell-surface overflow-hidden"
              >
                <div className="px-3 py-2 space-y-1 max-h-32 overflow-y-auto font-mono text-[11px] text-shell-text-muted">
                  {log.map((l, i) => <div key={i}>{l}</div>)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && <p className="text-xs text-red-400">{error}</p>}

          {status === 'done' && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-green-500/20 bg-green-500/5 px-3 py-2.5"
            >
              <p className="text-xs font-medium text-green-400 mb-1">
                ✓ {derivedName} committed to repository
              </p>
              <p className="text-[11px] text-shell-text-muted">
                Vercel will redeploy automatically. Reload the app in ~30s to see your new component.
              </p>
              <a
                href={`${getRepoUrl()}/actions`}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-1 text-[11px] text-shell-accent hover:underline"
              >
                View run on GitHub →
              </a>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-shell-border bg-shell-bg/30">
          <button onClick={onClose} className="px-3 py-1.5 text-xs text-shell-text-muted hover:text-shell-text transition-colors">
            Cancel
          </button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleGenerate}
            disabled={status === 'waiting' || status === 'running' || !prompt.trim() || !configured}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-medium bg-shell-accent text-white rounded-md hover:bg-shell-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'waiting' || status === 'running' ? (
              <>
                <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
              </>
            ) : 'Generate via GitHub'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
