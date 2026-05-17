import { forwardRef, useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

const Input = forwardRef(function Input(
  {
    label,
    helperText,
    error,
    prefix,
    suffix,
    maxLength,
    className,
    ...props
  },
  ref
) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState(props.defaultValue ?? '')
  const id = useId()

  const handleChange = (e) => {
    setValue(e.target.value)
    props.onChange?.(e)
  }

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-ink-muted">
          {label}
        </label>
      )}

      <div
        className={cn(
          'flex items-center gap-2 px-3 rounded-[var(--radius-md)] border bg-canvas transition-all duration-150',
          focused && !error
            ? 'border-primary ring-2 ring-primary/20'
            : error
            ? 'border-error ring-2 ring-error/20'
            : 'border-hairline hover:border-ink-muted/40'
        )}
      >
        {prefix && <span className="text-sm text-muted shrink-0">{prefix}</span>}

        <input
          ref={ref}
          id={id}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          maxLength={maxLength}
          className="flex-1 py-2.5 text-sm text-ink bg-transparent outline-none placeholder:text-muted min-w-0"
          {...props}
        />

        {suffix && <span className="text-sm text-muted shrink-0">{suffix}</span>}

        {maxLength && (
          <span className="text-[11px] text-muted shrink-0 tabular-nums">
            {value.length}/{maxLength}
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {(error || helperText) && (
          <motion.p
            key={error ? 'error' : 'helper'}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            id={error ? `${id}-error` : `${id}-helper`}
            className={cn('text-[11px]', error ? 'text-error' : 'text-muted')}
          >
            {error || helperText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
})

export default Input
