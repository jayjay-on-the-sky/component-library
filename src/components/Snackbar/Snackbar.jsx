import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * Snackbar / Toast — brief notification at the bottom of the screen.
 * Variants: default | success | warning | error | info
 */

const icons = {
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill="currentColor" fillOpacity=".15"/>
      <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill="currentColor" fillOpacity=".15"/>
      <path d="M8 5v3.5M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L14.5 13H1.5L8 2z" fill="currentColor" fillOpacity=".15" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M8 6v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill="currentColor" fillOpacity=".15"/>
      <path d="M8 7v4M8 5.5V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
}

const variantStyles = {
  default: 'bg-surface text-ink border-hairline',
  success: 'bg-success/10 text-success border-success/20',
  error: 'bg-error/10 text-error border-error/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  info: 'bg-primary/10 text-primary border-primary/20',
}

const Snackbar = forwardRef(function Snackbar(
  {
    open = true,
    message,
    description,
    variant = 'default',
    action,
    onAction,
    onClose,
    position = 'bottom-center', // bottom-center | bottom-left | bottom-right | top-center
    className,
    ...props
  },
  ref
) {
  const positions = {
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-6 right-6',
    'top-center': 'top-6 left-1/2 -translate-x-1/2',
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          role="alert"
          aria-live="polite"
          aria-atomic
          initial={{ opacity: 0, y: position.startsWith('top') ? -16 : 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: position.startsWith('top') ? -16 : 16, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'fixed z-[100] flex items-start gap-3 px-4 py-3 rounded-xl border shadow-xl',
            'min-w-[280px] max-w-sm backdrop-blur-sm',
            positions[position],
            variantStyles[variant],
            className
          )}
          {...props}
        >
          {/* Icon */}
          {variant !== 'default' && (
            <span className="mt-0.5 shrink-0">{icons[variant]}</span>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-snug">{message}</p>
            {description && (
              <p className="text-xs mt-0.5 opacity-75">{description}</p>
            )}
          </div>

          {/* Action / Close */}
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            {action && (
              <button
                onClick={onAction}
                className="text-xs font-semibold underline-offset-2 hover:underline transition-colors"
              >
                {action}
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                aria-label="Dismiss"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

export default Snackbar
