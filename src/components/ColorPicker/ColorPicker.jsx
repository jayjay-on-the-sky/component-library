import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown } from '../../lib/icons'
import { cn } from '../../lib/utils'

const PRESETS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f97316',
  '#eab308', '#22c55e', '#14b8a6', '#3b82f6', '#0ea5e9',
  '#64748b', '#1e293b', '#f8fafc', '#ffffff', '#000000',
]

const ColorPicker = React.forwardRef(({
  value = '#6366f1',
  onChange,
  showInput = true,
  presets = PRESETS,
  className,
  ...props
}, ref) => {
  const [open, setOpen] = useState(false)
  const [hex, setHex] = useState(value)

  const commit = (v) => {
    setHex(v)
    onChange?.(v)
  }

  return (
    <div ref={ref} className={cn('relative inline-block', className)} {...props}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 h-10 px-3 rounded-[var(--radius-md)] border border-hairline bg-canvas hover:bg-surface transition-colors"
      >
        <span
          className="w-5 h-5 rounded-[var(--radius-sm)] border border-hairline shrink-0"
          style={{ backgroundColor: hex }}
        />
        <span className="text-sm text-ink font-mono">{hex}</span>
        <ChevronDown size={14} className={cn('text-muted transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.13 }}
            className="absolute top-full left-0 mt-1.5 p-3 bg-canvas border border-hairline rounded-[var(--radius-xl)] shadow-lg z-40 w-56"
          >
            {/* Native color input */}
            <div className="flex items-center gap-2 mb-3">
              <input
                type="color"
                value={hex}
                onChange={e => commit(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border border-hairline"
              />
              {showInput && (
                <input
                  type="text"
                  value={hex}
                  onChange={e => {
                    if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setHex(e.target.value)
                    if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) onChange?.(e.target.value)
                  }}
                  className="flex-1 h-10 px-2 rounded-[var(--radius-md)] border border-hairline bg-surface text-sm font-mono text-ink outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                />
              )}
            </div>

            {/* Presets */}
            <p className="text-xs text-muted mb-2">Presets</p>
            <div className="grid grid-cols-5 gap-1.5">
              {presets.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => commit(c)}
                  title={c}
                  style={{ backgroundColor: c }}
                  className="w-8 h-8 rounded-[var(--radius-sm)] border border-hairline flex items-center justify-center hover:scale-110 transition-transform"
                >
                  {c === hex && <Check size={12} className="text-white drop-shadow" strokeWidth={3} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

ColorPicker.displayName = 'ColorPicker'
export default ColorPicker
