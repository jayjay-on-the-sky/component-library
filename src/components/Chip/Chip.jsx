import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * Chip — compact interactive label with optional icon, avatar, and dismiss.
 * Variants: filled | outlined | elevated
 * Types: filter (toggle) | input (dismissible) | suggestion (action)
 */

const Chip = forwardRef(function Chip(
  {
    label,
    variant = 'outlined',
    selected = false,
    disabled = false,
    leadingIcon,
    avatar,
    onDismiss,
    onClick,
    className,
    ...props
  },
  ref
) {
  const base =
    'inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'

  const variants = {
    filled: selected
      ? 'bg-primary text-on-primary'
      : 'bg-surface-strong text-ink hover:bg-surface-strong/80',
    outlined: selected
      ? 'bg-primary/10 text-primary border border-primary'
      : 'bg-transparent text-ink border border-hairline hover:bg-surface',
    elevated: selected
      ? 'bg-primary text-on-primary shadow-md'
      : 'bg-surface text-ink shadow-sm hover:shadow-md',
  }

  return (
    <motion.button
      ref={ref}
      role="checkbox"
      aria-checked={selected}
      aria-disabled={disabled}
      aria-label={label}
      whileTap={disabled ? {} : { scale: 0.95 }}
      transition={{ duration: 0.08 }}
      onClick={disabled ? undefined : onClick}
      className={cn(base, variants[variant], disabled && 'opacity-40 cursor-not-allowed', className)}
      {...props}
    >
      {/* Avatar */}
      {avatar && (
        <span className="w-5 h-5 rounded-full overflow-hidden shrink-0 -ml-1">
          <img src={avatar} alt="" className="w-full h-full object-cover" />
        </span>
      )}

      {/* Leading icon */}
      {!avatar && leadingIcon && (
        <span className="shrink-0 w-4 h-4 flex items-center justify-center">
          {leadingIcon}
        </span>
      )}

      {/* Selected checkmark (filter chips) */}
      {selected && !leadingIcon && !avatar && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="shrink-0 w-4 h-4 flex items-center justify-center"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.span>
      )}

      <span className="truncate max-w-32">{label}</span>

      {/* Dismiss button */}
      {onDismiss && (
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => { e.stopPropagation(); onDismiss() }}
          aria-label={`Remove ${label}`}
          className="shrink-0 w-4 h-4 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors -mr-1"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </motion.button>
      )}
    </motion.button>
  )
})

export default Chip
