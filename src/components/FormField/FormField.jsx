import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, CheckCircle } from '../../lib/icons'
import { cn } from '../../lib/utils'

const FormField = React.forwardRef(({
  label,
  htmlFor,
  error,
  hint,
  success,
  required = false,
  optional = false,
  children,
  className,
  ...props
}, ref) => {
  const status = error ? 'error' : success ? 'success' : 'default'

  return (
    <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...props}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="flex items-center gap-1.5 text-sm font-medium text-ink"
        >
          {label}
          {required && <span className="text-error text-xs">*</span>}
          {optional && <span className="text-muted text-xs font-normal">(optional)</span>}
        </label>
      )}

      {children}

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1.5 text-xs text-error"
            role="alert"
          >
            <AlertCircle size={12} />
            {error}
          </motion.p>
        )}
        {!error && success && (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1.5 text-xs text-success"
          >
            <CheckCircle size={12} />
            {success}
          </motion.p>
        )}
        {!error && !success && hint && (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted"
          >
            {hint}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
})

FormField.displayName = 'FormField'
export default FormField
