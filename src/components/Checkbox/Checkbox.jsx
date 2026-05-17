import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * Checkbox — accessible checkbox with indeterminate support, label, and helper text.
 */

const Checkbox = forwardRef(function Checkbox(
  {
    checked = false,
    indeterminate = false,
    disabled = false,
    label,
    helperText,
    error,
    onChange,
    className,
    id,
    ...props
  },
  ref
) {
  const inputId = id || `checkbox-${Math.random().toString(36).slice(2, 7)}`

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'inline-flex items-start gap-3 cursor-pointer group',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      {/* Hidden native input */}
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        aria-checked={indeterminate ? 'mixed' : checked}
        className="sr-only"
        {...props}
      />

      {/* Visual checkbox */}
      <motion.span
        whileTap={disabled ? {} : { scale: 0.88 }}
        transition={{ duration: 0.1 }}
        className={cn(
          'shrink-0 mt-0.5 w-5 h-5 rounded-[5px] border-2 flex items-center justify-center transition-colors duration-150',
          'focus-within:ring-2 focus-within:ring-primary/40',
          checked || indeterminate
            ? 'bg-primary border-primary'
            : 'bg-transparent border-hairline group-hover:border-primary/60',
          error && !(checked || indeterminate) && 'border-error'
        )}
        aria-hidden
      >
        <AnimatePresence mode="wait">
          {indeterminate ? (
            <motion.svg
              key="dash"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.12 }}
              width="10" height="2" viewBox="0 0 10 2" fill="none"
            >
              <path d="M1 1h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </motion.svg>
          ) : checked ? (
            <motion.svg
              key="check"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.12 }}
              width="11" height="9" viewBox="0 0 11 9" fill="none"
            >
              <path d="M1 4.5l3 3L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          ) : null}
        </AnimatePresence>
      </motion.span>

      {/* Label + helper */}
      {(label || helperText) && (
        <span className="flex flex-col gap-0.5 min-w-0">
          {label && (
            <span className="text-sm text-ink leading-none">{label}</span>
          )}
          {helperText && (
            <span className={cn('text-xs', error ? 'text-error' : 'text-ink-muted')}>
              {helperText}
            </span>
          )}
        </span>
      )}
    </label>
  )
})

export default Checkbox
