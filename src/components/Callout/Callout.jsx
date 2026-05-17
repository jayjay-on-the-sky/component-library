import React from 'react'
import { Info, AlertTriangle, CheckCircle, AlertCircle, X } from '../../lib/icons'
import { cn } from '../../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const variants = {
  info: { icon: Info, bg: 'bg-primary/8', border: 'border-primary/20', icon_color: 'text-primary', title_color: 'text-primary' },
  warning: { icon: AlertTriangle, bg: 'bg-warning/8', border: 'border-warning/20', icon_color: 'text-warning', title_color: 'text-warning' },
  success: { icon: CheckCircle, bg: 'bg-success/8', border: 'border-success/20', icon_color: 'text-success', title_color: 'text-success' },
  error: { icon: AlertCircle, bg: 'bg-error/8', border: 'border-error/20', icon_color: 'text-error', title_color: 'text-error' },
}

const Callout = React.forwardRef(({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  icon: CustomIcon,
  className,
  ...props
}, ref) => {
  const [visible, setVisible] = React.useState(true)
  const v = variants[variant] || variants.info
  const Icon = CustomIcon || v.icon

  const dismiss = () => {
    setVisible(false)
    onDismiss?.()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          role="note"
          className={cn(
            'flex gap-3 p-4 rounded-[var(--radius-lg)] border',
            v.bg, v.border,
            className
          )}
          {...props}
        >
          <Icon size={16} className={cn('shrink-0 mt-0.5', v.icon_color)} />
          <div className="flex-1 min-w-0">
            {title && (
              <p className={cn('text-sm font-semibold mb-0.5', v.title_color)}>{title}</p>
            )}
            <div className="text-sm text-body">{children}</div>
          </div>
          {dismissible && (
            <button onClick={dismiss} className="text-muted hover:text-ink transition-colors shrink-0">
              <X size={14} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
})

Callout.displayName = 'Callout'
export default Callout
