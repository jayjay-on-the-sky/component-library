import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { runWorkflow, saveTheme, isConfigured } from '../lib/githubClient'

const SUGGESTIONS = [
  'Dark mode',
  'High contrast',
  'Warm earthy tones',
  'Ocean blue',
  'Minimal monochrome',
  'Fintech navy + gold',
]

export default function VariantGenerator({ theme }) {
  const [desc, setDesc] = useState('')
  const [label, setLabel] = useState('')
  const [status, setStatus] = useState('idle') // idle | waiting | done | error
  const [log, setLog] = useState([])
  const [error, setError] = useState('')
  const configured = isConfigured()

  const addLog = msg => setLog(prev => [...prev, msg])

  const activeTheme = theme?.baseTheme

  const handleGenerate = async () => {
    if (!desc.trim()) return
    setStatus('waiting')
    setLog([])
    setError('')

    const variantLabel = label.trim() || desc.trim()
    const themeName = activeTheme?.name || 'Custom'

    // Get the active token map to send as input
    const tokens = theme?.getActiveTokenMap?.() || {}
    const tokenJson = JSON.stringify(tokens)

    try {
      addLog('Dispatching variant generation workflow…')

      const { success, conclusion } = await runWorkflow(
        'generate-variant.yml',
        {
          base_tokens: tokenJson,
          variant_description: desc.trim(),
          variant_label: variantLabel,
          theme_name: themeName,
        },
        { onLog: addLog, intervalMs: 5000, timeoutMs: 120_000 }
      )

      if (success) {
        setStatus('done')
        addLog(`✓ Variant "${variantLabel}" saved to themes/`)
        setDesc('')
        setLabel('')
      } else {
        setStatus('error')
        setError(`Workflow ended with: ${conclusion}`)
      }
    } catch (e) {
      setStatus('error')
      setError(e.message)
    }
  }

  const isRunning = ['waiting', 'running'].includes(status)

  return (
    <div className="px-4 py-3 border-t border-shell-border shrink-0 bg-shell-bg/50">
      <p className="text-[11px] font-semibold text-shell-text-muted uppercase tracking-wider mb-2">
        Generate Variant
      </p>

      {!configured && (
        <p className="text-[10px] text-yellow-500/80 mb-2">
          ⚠ GitHub env vars not set
        </p>
      )}

      {/* Suggestions */}
      <div className="flex flex-wrap gap-1 mb-2">
        {SUGGESTIONS.map(s => (
          <button
            key={s}
            onClick={() => setDesc(s)}
            className="px-2 py-0.5 text-[10px] rounded-full border border-shell-border text-shell-text-muted hover:text-shell-text hover:border-shell-accent/50 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Describe the variant…"
        value={desc}
        onChange={e => setDesc(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && !isRunning && handleGenerate()}
        className="w-full px-2.5 py-1.5 text-xs bg-shell-surface border border-shell-border rounded-md text-shell-text placeholder-shell-text-muted focus:outline-none focus:border-shell-accent mb-1.5 transition-colors"
      />

      <input
        type="text"
        placeholder={`Label (default: same as description)`}
        value={label}
        onChange={e => setLabel(e.target.value)}
        className="w-full px-2.5 py-1.5 text-xs bg-shell-surface border border-shell-border rounded-md text-shell-text placeholder-shell-text-muted focus:outline-none focus:border-shell-accent mb-1.5 transition-colors"
      />

      {/* Log */}
      <AnimatePresence>
        {log.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-1.5 rounded border border-shell-border bg-shell-surface overflow-hidden"
          >
            <div className="px-2 py-1.5 max-h-24 overflow-y-auto font-mono text-[10px] text-shell-text-muted space-y-0.5">
              {log.map((l, i) => <div key={i}>{l}</div>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-[11px] text-red-400 mb-1.5">{error}</p>}

      {status === 'done' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[11px] text-green-400 mb-1.5"
        >
          ✓ Variant saved. Reload themes to see it.
        </motion.p>
      )}

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleGenerate}
        disabled={isRunning || !desc.trim() || !configured}
        className="w-full py-1.5 text-xs font-medium bg-shell-accent text-white rounded-md hover:bg-shell-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {isRunning ? (
          <span className="flex items-center justify-center gap-1.5">
            <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
            <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
            <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
          </span>
        ) : 'Generate via GitHub'}
      </motion.button>
    </div>
  )
}
