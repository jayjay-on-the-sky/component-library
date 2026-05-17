import { useState } from 'react'
import { motion } from 'framer-motion'
import { generateFromPrompt } from '../lib/componentAgent'

const EXAMPLES = [
  'A pill badge with a count and semantic colors',
  'A notification toast with icon and dismiss',
  'A progress bar with animated fill',
  'A stat card with a trend indicator',
  'A segmented control with 3 options',
]

export default function CreateModal({ onClose }) {
  const [prompt, setPrompt] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setStatus('loading')
    setError('')
    try {
      const res = await generateFromPrompt(prompt)
      setResult(res)
      setStatus('done')
    } catch (e) {
      setError(e.message)
      setStatus('error')
    }
  }

  const handleCopyJsx = () => {
    navigator.clipboard.writeText(result.jsx)
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
            <p className="text-[11px] text-shell-text-muted mt-0.5">Describe what you want — Claude will build it</p>
          </div>
          <button onClick={onClose} className="text-shell-text-muted hover:text-shell-text p-1 transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {/* Suggestions */}
          <div className="flex flex-wrap gap-1.5 mb-3">
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
            placeholder="Describe the component you want…"
            rows={3}
            className="w-full px-3 py-2.5 text-sm bg-shell-surface border border-shell-border rounded-lg text-shell-text placeholder-shell-text-muted focus:outline-none focus:border-shell-accent resize-none transition-colors"
          />

          {error && (
            <p className="text-xs text-red-400 mt-2">{error}</p>
          )}

          {/* Result preview */}
          {status === 'done' && result && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 rounded-lg border border-green-500/20 bg-green-500/5 p-3"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-green-400">
                  ✓ {result.name} generated
                </span>
                <button
                  onClick={handleCopyJsx}
                  className="text-[11px] text-shell-text-muted hover:text-shell-text transition-colors"
                >
                  Copy JSX
                </button>
              </div>
              <p className="text-[11px] text-shell-text-muted">
                Category: {result.category} · Reload the page to see it in the sidebar.
              </p>
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
            disabled={status === 'loading' || !prompt.trim()}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-medium bg-shell-accent text-white rounded-md hover:bg-shell-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'loading' ? (
              <>
                <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
              </>
            ) : 'Generate'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
