import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Info, AlertCircle, CheckCircle, X } from '../../lib/icons'
import { cn } from '../../lib/utils'

const icons = {
  warning: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10' },
  danger: { icon: AlertCircle, color: 'text-error', bg: 'bg-error/10' },
  info: { icon: Info, color: 'text-primary', bg: 'bg-primary/10' },
  success: { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10' },
}

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'warning',
  loading = false,
  className,
}) => {
  const ic = icons[variant] || icons.warning
  const Icon = ic.icon

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-desc"
            className={cn(
              'relative bg-canvas border border-hairline rounded-[var(--radius-xl)] shadow-2xl w-full max-w-md p-6',
              className
            )}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted hover:text-ink transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className="flex items-start gap-4">
              <div className={cn('w-10 h-10 rounded-full flex items-center justify-center shrink-0', ic.bg)}>
                <Icon size={20} className={ic.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 id="confirm-title" className="font-semibold text-ink text-base mb-1">{title}</h2>
                {description && (
                  <p id="confirm-desc" className="text-sm text-body">{description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm rounded-[var(--radius-md)] border border-hairline text-ink hover:bg-surface transition-colors"
              >
                {cancelLabel}
              </button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onConfirm}
                disabled={loading}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-colors disabled:opacity-60',
                  variant === 'danger'
                    ? 'bg-error text-white hover:opacity-90'
                    : 'bg-primary text-on-primary hover:bg-primary-hover'
                )}
              >
                {loading ? 'Loading…' : confirmLabel}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ConfirmDialog
