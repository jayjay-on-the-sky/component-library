import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Loader2 } from '../../lib/icons'
import { cn } from '../../lib/utils'

const SearchBar = React.forwardRef(({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search…',
  loading = false,
  suggestions = [],
  size = 'md',
  className,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)

  const sizeClasses = {
    sm: 'h-8 text-xs px-3',
    md: 'h-10 text-sm px-4',
    lg: 'h-12 text-base px-5',
  }

  const showSuggestions = focused && suggestions.length > 0

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'flex items-center gap-2 rounded-[var(--radius-pill)] border bg-canvas transition-all',
          focused ? 'border-primary ring-2 ring-primary/20' : 'border-hairline',
          sizeClasses[size]
        )}
      >
        {loading ? (
          <Loader2 size={15} className="text-muted animate-spin shrink-0" />
        ) : (
          <Search size={15} className="text-muted shrink-0" />
        )}
        <input
          ref={ref || inputRef}
          type="search"
          value={value}
          onChange={e => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onKeyDown={e => e.key === 'Enter' && onSubmit?.(value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-ink placeholder:text-muted outline-none min-w-0"
          {...props}
        />
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              type="button"
              onClick={() => { onChange?.(''); inputRef.current?.focus() }}
              className="text-muted hover:text-ink transition-colors shrink-0"
            >
              <X size={14} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showSuggestions && (
          <motion.ul
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-0 right-0 mt-1.5 bg-canvas border border-hairline rounded-[var(--radius-lg)] shadow-lg overflow-hidden z-40 py-1"
            role="listbox"
          >
            {suggestions.map((s, i) => (
              <li key={i}>
                <button
                  type="button"
                  role="option"
                  onClick={() => { onChange?.(s); setFocused(false) }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-ink-muted hover:bg-surface hover:text-ink transition-colors text-left"
                >
                  <Search size={13} className="text-muted shrink-0" />
                  {s}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
})

SearchBar.displayName = 'SearchBar'
export default SearchBar
