import { forwardRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * BottomSheet — modal drawer anchored to the bottom.
 * Snaps to 40%, 70%, or 100% height.
 */

const BottomSheet = forwardRef(function BottomSheet(
  {
    open = false,
    onClose,
    title,
    children,
    snapPoint = '60vh', // CSS height or 'full'
    className,
    ...props
  },
  ref
) {
  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e) => e.key === 'Escape' && onClose?.()
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            ref={ref}
            role="dialog"
            aria-modal
            aria-label={title}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0.1, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120) onClose?.()
            }}
            style={{ height: snapPoint === 'full' ? '100dvh' : snapPoint }}
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50',
              'flex flex-col bg-canvas rounded-t-2xl border-t border-hairline',
              'overflow-hidden touch-pan-y',
              className
            )}
            {...props}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2 shrink-0">
              <div className="w-10 h-1 rounded-full bg-hairline" aria-hidden />
            </div>

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-5 py-3 border-b border-hairline shrink-0">
                <h2 className="text-base font-semibold text-ink">{title}</h2>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="w-8 h-8 flex items-center justify-center rounded-full text-ink-muted hover:bg-surface-strong transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
})

export default BottomSheet
