import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from '../../lib/icons'
import { cn } from '../../lib/utils'

const ToastContext = createContext(null)

const icons = {
  success: { icon: CheckCircle, color: 'text-success' },
  error: { icon: AlertCircle, color: 'text-error' },
  warning: { icon: AlertTriangle, color: 'text-warning' },
  info: { icon: Info, color: 'text-primary' },
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const toast = useCallback(({ title, description, type = 'info', duration = 4000 }) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(t => [...t, { id, title, description, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), duration)
    return id
  }, [])

  const dismiss = (id) => setToasts(t => t.filter(x => x.id !== id))

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Portal-like position */}
      <div
        className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2 max-w-sm w-full pointer-events-none"
        role="region"
        aria-label="Notifications"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map(t => {
            const { icon: Icon, color } = icons[t.type] || icons.info
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-canvas border border-hairline rounded-[var(--radius-xl)] shadow-xl px-4 py-3 flex items-start gap-3 pointer-events-auto"
              >
                <Icon size={16} className={cn('shrink-0 mt-0.5', color)} />
                <div className="flex-1 min-w-0">
                  {t.title && <p className="text-sm font-semibold text-ink">{t.title}</p>}
                  {t.description && <p className="text-xs text-body mt-0.5">{t.description}</p>}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  className="text-muted hover:text-ink transition-colors shrink-0"
                  aria-label="Dismiss"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}

// Standalone single toast for preview
const Toast = ({ title, description, type = 'info', onDismiss, className }) => {
  const { icon: Icon, color } = icons[type] || icons.info
  return (
    <div className={cn(
      'bg-canvas border border-hairline rounded-[var(--radius-xl)] shadow-xl px-4 py-3 flex items-start gap-3 max-w-sm',
      className
    )}>
      <Icon size={16} className={cn('shrink-0 mt-0.5', color)} />
      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-semibold text-ink">{title}</p>}
        {description && <p className="text-xs text-body mt-0.5">{description}</p>}
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="text-muted hover:text-ink transition-colors shrink-0" aria-label="Dismiss">
          <X size={14} />
        </button>
      )}
    </div>
  )
}

export default Toast
