import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronRight, X } from '../../lib/icons'
import { cn } from '../../lib/utils'

const CommandPalette = ({ open, onClose, items = [], placeholder = 'Search or type a command…', className }) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items
    const q = query.toLowerCase()
    return items
      .map(group => ({
        ...group,
        commands: group.commands.filter(c =>
          c.label.toLowerCase().includes(q) || c.keywords?.some(k => k.includes(q))
        ),
      }))
      .filter(g => g.commands.length > 0)
  }, [query, items])

  const flat = filtered.flatMap(g => g.commands)

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const handleKey = useCallback((e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, flat.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && flat[activeIndex]) { flat[activeIndex].onSelect?.(); onClose?.() }
    if (e.key === 'Escape') onClose?.()
  }, [flat, activeIndex, onClose])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  let globalIndex = 0

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'relative w-full max-w-lg bg-canvas border border-hairline rounded-[var(--radius-xl)] shadow-2xl overflow-hidden',
              className
            )}
          >
            {/* Search bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-hairline">
              <Search size={16} className="text-muted shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setActiveIndex(0) }}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-ink placeholder:text-muted text-sm outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-muted hover:text-ink transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="text-center text-muted text-sm py-8">No results for "{query}"</p>
              )}
              {filtered.map((group) => (
                <div key={group.group}>
                  {group.group && (
                    <p className="px-4 py-1.5 text-xs font-semibold text-muted uppercase tracking-wider">
                      {group.group}
                    </p>
                  )}
                  {group.commands.map((cmd) => {
                    const idx = globalIndex++
                    const isActive = idx === activeIndex
                    return (
                      <motion.button
                        key={cmd.label}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => { cmd.onSelect?.(); onClose?.() }}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors',
                          isActive ? 'bg-surface text-ink' : 'text-ink-muted hover:bg-surface'
                        )}
                      >
                        {cmd.icon && <span className="text-muted shrink-0">{cmd.icon}</span>}
                        <span className="flex-1">{cmd.label}</span>
                        {cmd.shortcut && (
                          <kbd className="text-xs text-muted bg-surface border border-hairline rounded px-1.5 py-0.5">
                            {cmd.shortcut}
                          </kbd>
                        )}
                        {!cmd.shortcut && <ChevronRight size={14} className="text-muted" />}
                      </motion.button>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-hairline px-4 py-2 flex items-center gap-3 text-xs text-muted">
              <span><kbd className="font-mono">↑↓</kbd> navigate</span>
              <span><kbd className="font-mono">↵</kbd> select</span>
              <span><kbd className="font-mono">esc</kbd> close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
