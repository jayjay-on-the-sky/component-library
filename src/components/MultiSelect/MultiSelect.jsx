import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, X, Check, Search } from '../../lib/icons'
import { cn } from '../../lib/utils'

const MultiSelect = React.forwardRef(({
  options = [],
  value = [],
  onChange,
  placeholder = 'Select options…',
  searchable = true,
  maxItems,
  className,
  ...props
}, ref) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(query.toLowerCase())
  )

  const toggle = (val) => {
    if (value.includes(val)) {
      onChange?.(value.filter(v => v !== val))
    } else {
      if (maxItems && value.length >= maxItems) return
      onChange?.([...value, val])
    }
  }

  const selected = options.filter(o => value.includes(o.value))

  return (
    <div ref={containerRef} className={cn('relative', className)} {...props}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'w-full min-h-10 px-3 py-1.5 rounded-[var(--radius-md)] border bg-canvas text-left flex items-start gap-2 flex-wrap transition-all',
          open ? 'border-primary ring-2 ring-primary/20' : 'border-hairline hover:border-ink-muted'
        )}
      >
        <div className="flex-1 flex items-center flex-wrap gap-1.5 min-w-0">
          {selected.length === 0 && (
            <span className="text-sm text-muted">{placeholder}</span>
          )}
          {selected.map(opt => (
            <span
              key={opt.value}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-sm)] bg-primary/10 text-primary text-xs font-medium"
            >
              {opt.label}
              <button
                type="button"
                onClick={e => { e.stopPropagation(); toggle(opt.value) }}
                className="hover:opacity-70 transition-opacity"
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
        <ChevronDown
          size={16}
          className={cn('text-muted shrink-0 mt-1 transition-transform', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-0 right-0 mt-1.5 bg-canvas border border-hairline rounded-[var(--radius-lg)] shadow-lg overflow-hidden z-40"
            role="listbox"
            aria-multiselectable="true"
          >
            {searchable && (
              <div className="flex items-center gap-2 px-3 py-2 border-b border-hairline">
                <Search size={13} className="text-muted shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search…"
                  className="flex-1 bg-transparent text-sm text-ink placeholder:text-muted outline-none"
                />
              </div>
            )}
            <ul className="max-h-52 overflow-y-auto py-1">
              {filtered.map(opt => {
                const isSelected = value.includes(opt.value)
                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => toggle(opt.value)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-ink hover:bg-surface transition-colors"
                    >
                      <div className={cn(
                        'w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors',
                        isSelected ? 'bg-primary border-primary' : 'border-hairline'
                      )}>
                        {isSelected && <Check size={10} className="text-on-primary" strokeWidth={3} />}
                      </div>
                      {opt.label}
                    </button>
                  </li>
                )
              })}
              {filtered.length === 0 && (
                <li className="text-center text-muted text-sm py-4">No options found</li>
              )}
            </ul>
            {maxItems && (
              <div className="border-t border-hairline px-3 py-1.5 text-xs text-muted">
                {value.length}/{maxItems} selected
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

MultiSelect.displayName = 'MultiSelect'
export default MultiSelect
