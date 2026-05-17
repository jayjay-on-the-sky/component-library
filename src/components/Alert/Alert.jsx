import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * Alert / Banner — inline contextual message.
 * Variants: info | success | warning | error | neutral
 */

const variantConfig = {
  info: {
    classes: 'bg-primary/8 border-primary/20 text-primary',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M8 7v4M8 5.5V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  success: {
    classes: 'bg-success/8 border-success/20 text-success',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  warning: {
    classes: 'bg-warning/8 border-warning/20 text-warning',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2L14.5 13H1.5L8 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M8 6v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  error: {
    classes: 'bg-error/8 border-error/20 text-error',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  neutral: {
    classes: 'bg-surface border-hairline text-ink',
    icon: null,
  },
}

const Alert = forwardRef(function Alert(
  {
    variant = 'info',
    title,
    children,
    dismissible = false,
    onDismiss,
    action,
    onAction,
    className,
    ...props
  },
  ref
) {
  const config = variantConfig[variant]

  return (
    <motion.div
      ref={ref}
      role="alert"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
      className={cn(
        'flex gap-3 rounded-xl border p-4',
        config.classes,
        className
      )}
      {...props}
    >
      {/* Icon */}
      {config.icon && (
        <span className="mt-0.5 shrink-0">{config.icon}</span>
      )}

      {/* Body */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-sm font-semibold leading-snug mb-0.5">{title}</p>
        )}
        {children && (
          <div className="text-sm opacity-85 leading-relaxed">{children}</div>
        )}
        {action && (
          <button
            onClick={onAction}
            className="mt-2 text-xs font-semibold underline-offset-2 hover:underline transition-colors"
          >
            {action}
          </button>
        )}
      </div>

      {/* Dismiss */}
      {dismissible && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className="shrink-0 mt-0.5 opacity-60 hover:opacity-100 transition-opacity"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </motion.div>
  )
})

export default Alert
