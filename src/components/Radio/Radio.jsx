import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * Radio — single radio button. Compose a group with a shared `name` + `value`.
 */

const Radio = forwardRef(function Radio(
  {
    checked = false,
    disabled = false,
    label,
    helperText,
    error,
    value,
    name,
    onChange,
    className,
    id,
    ...props
  },
  ref
) {
  const inputId = id || `radio-${name}-${value}`

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'inline-flex items-start gap-3 cursor-pointer group',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <input
        ref={ref}
        id={inputId}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="sr-only"
        {...props}
      />

      {/* Visual radio ring */}
      <motion.span
        whileTap={disabled ? {} : { scale: 0.88 }}
        transition={{ duration: 0.1 }}
        className={cn(
          'shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-150',
          checked
            ? 'border-primary'
            : 'border-hairline group-hover:border-primary/60',
          error && !checked && 'border-error'
        )}
        aria-hidden
      >
        <AnimatePresence>
          {checked && (
            <motion.span
              key="dot"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="w-2.5 h-2.5 rounded-full bg-primary"
            />
          )}
        </AnimatePresence>
      </motion.span>

      {(label || helperText) && (
        <span className="flex flex-col gap-0.5 min-w-0">
          {label && <span className="text-sm text-ink leading-none">{label}</span>}
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

/**
 * RadioGroup — wrapper that provides accessible grouping.
 */
export function RadioGroup({ label, children, className }) {
  return (
    <fieldset className={cn('border-0 p-0 m-0', className)}>
      {label && (
        <legend className="text-sm font-medium text-ink mb-2">{label}</legend>
      )}
      <div className="flex flex-col gap-3">{children}</div>
    </fieldset>
  )
}

Radio.Group = RadioGroup

export default Radio
