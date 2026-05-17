import { useState } from 'react'
import { motion } from 'framer-motion'

const SUGGESTIONS = [
  'Dark mode',
  'High contrast',
  'Warm earthy tones',
  'Ocean blue',
  'Minimal monochrome',
]

export default function VariantGenerator({ theme }) {
  const [label, setLabel] = useState('')
  const [desc, setDesc] = useState('')
  const { generateVariant, isLoading } = theme

  const handleGenerate = async () => {
    if (!desc.trim()) return
    await generateVariant(label || desc, desc)
    setLabel('')
    setDesc('')
  }

  return (
    <div className="px-4 py-3 border-t border-shell-border shrink-0 bg-shell-bg/50">
      <p className="text-[11px] font-semibold text-shell-text-muted uppercase tracking-wider mb-2">
        Generate Variant
      </p>

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
        onKeyDown={e => e.key === 'Enter' && handleGenerate()}
        className="w-full px-2.5 py-1.5 text-xs bg-shell-surface border border-shell-border rounded-md text-shell-text placeholder-shell-text-muted focus:outline-none focus:border-shell-accent mb-1.5 transition-colors"
      />

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleGenerate}
        disabled={isLoading || !desc.trim()}
        className="w-full py-1.5 text-xs font-medium bg-shell-accent text-white rounded-md hover:bg-shell-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-1.5">
            <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
            <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
            <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
          </span>
        ) : 'Generate'}
      </motion.button>
    </div>
  )
}
