import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { parseDesignMd } from '../lib/designMdParser'
import VariantGenerator from './VariantGenerator'
import { loadAllThemes, isConfigured } from '../lib/githubClient'

export default function ThemePanel({ theme, onClose }) {
  const fileRef = useRef(null)
  const { themeState, loadTheme, applyVariant, resetTheme, error } = theme
  const [loadingRemote, setLoadingRemote] = useState(false)
  const [remoteError, setRemoteError] = useState('')
  const [remoteThemes, setRemoteThemes] = useState([])

  const handleLoadFromGitHub = async () => {
    setLoadingRemote(true)
    setRemoteError('')
    try {
      const themes = await loadAllThemes()
      setRemoteThemes(themes)
    } catch (e) {
      setRemoteError(e.message)
    } finally {
      setLoadingRemote(false)
    }
  }

  const applyRemoteTheme = (t) => {
    // Convert token map to a mini design.md string and load it
    const lines = Object.entries(t.tokens)
      .map(([k, v]) => `\`{colors.${k}}\` — ${v}`)
      .join('\n')
    const md = `# ${t.theme} — ${t.variant}\n\n## Colors\n\n${lines}\n`
    loadTheme(md)
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => loadTheme(ev.target.result)
    reader.readAsText(file)
  }

  const activeMap = themeState.activeId === 'base'
    ? themeState.base?.tokenMap ?? {}
    : themeState.variants.find(v => v.id === themeState.activeId)?.tokenMap ?? {}

  return (
    <motion.aside
      initial={{ x: 280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 280, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-72 shrink-0 flex flex-col border-l border-shell-border bg-shell-sidebar overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-shell-border shrink-0">
        <div>
          <h3 className="text-sm font-semibold text-shell-text">Theme</h3>
          {themeState.base && (
            <p className="text-[11px] text-shell-text-muted mt-0.5">{themeState.base.name}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-shell-text-muted hover:text-shell-text transition-colors p-1"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Load */}
      <div className="px-4 py-3 border-b border-shell-border shrink-0">
        <input ref={fileRef} type="file" accept=".md,.txt" onChange={handleFile} className="hidden"/>
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full py-2 text-xs font-medium border border-dashed border-shell-border rounded-lg text-shell-text-muted hover:text-shell-text hover:border-shell-accent transition-colors"
        >
          Load design.md
        </button>
        {error && <p className="text-[11px] text-red-400 mt-1.5">{error}</p>}

        {/* Load from GitHub */}
        {isConfigured() && (
          <div className="mt-1.5">
            <button
              onClick={handleLoadFromGitHub}
              disabled={loadingRemote}
              className="w-full py-1.5 text-[11px] font-medium border border-shell-border rounded-lg text-shell-text-muted hover:text-shell-text hover:border-shell-accent/50 transition-colors disabled:opacity-50"
            >
              {loadingRemote ? 'Loading…' : '↓ Load from GitHub'}
            </button>
            {remoteError && <p className="text-[11px] text-red-400 mt-1">{remoteError}</p>}
            {remoteThemes.length > 0 && (
              <div className="mt-1.5 space-y-1">
                {remoteThemes.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => applyRemoteTheme(t)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 text-[11px] rounded-md border border-shell-border text-shell-text-muted hover:text-shell-text hover:bg-shell-surface transition-colors"
                  >
                    <span className="font-medium">{t.theme}</span>
                    <span className="opacity-60">{t.variant}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {themeState.base && (
          <button
            onClick={resetTheme}
            className="w-full mt-1.5 py-1 text-[11px] text-shell-text-muted hover:text-red-400 transition-colors"
          >
            Reset to default
          </button>
        )}
      </div>

      {/* Variant tabs */}
      {themeState.base && (
        <div className="px-4 py-2 border-b border-shell-border shrink-0">
          <div className="flex flex-wrap gap-1">
            <VariantTab
              label="Base"
              active={themeState.activeId === 'base'}
              onClick={() => applyVariant('base')}
            />
            {themeState.variants.map(v => (
              <VariantTab
                key={v.id}
                label={v.label}
                active={themeState.activeId === v.id}
                onClick={() => applyVariant(v.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Token swatches */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {Object.keys(activeMap).length > 0 ? (
          <div className="space-y-2">
            {Object.entries(activeMap).map(([token, hex]) => (
              <div key={token} className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-full border border-white/10 shrink-0 shadow-inner"
                  style={{ backgroundColor: hex }}
                />
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-shell-text truncate">{token}</p>
                  <p className="text-[10px] text-shell-text-muted font-mono">{hex}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center gap-2 py-8">
            <div className="w-10 h-10 rounded-full bg-shell-surface flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.2" className="text-shell-text-muted"/>
                <path d="M6 9a3 3 0 006 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-shell-text-muted"/>
                <circle cx="6.5" cy="7" r="0.8" fill="currentColor" className="text-shell-text-muted"/>
                <circle cx="11.5" cy="7" r="0.8" fill="currentColor" className="text-shell-text-muted"/>
              </svg>
            </div>
            <p className="text-xs text-shell-text-muted">Load a design.md to<br/>see tokens here</p>
          </div>
        )}
      </div>

      {/* Variant generator */}
      {themeState.base && (
        <VariantGenerator theme={theme} />
      )}
    </motion.aside>
  )
}

function VariantTab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 text-[11px] rounded-full border transition-colors ${
        active
          ? 'bg-shell-accent text-white border-shell-accent'
          : 'border-shell-border text-shell-text-muted hover:text-shell-text'
      }`}
    >
      {label}
    </button>
  )
}
