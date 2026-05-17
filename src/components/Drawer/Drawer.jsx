import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from '../../lib/icons'
import { cn } from '../../lib/utils'

const Drawer = ({
  open,
  onClose,
  side = 'right',
  title,
  children,
  width = 360,
  className,
}) => {
  const variants = {
    right: { hidden: { x: '100%' }, visible: { x: 0 } },
    left: { hidden: { x: '-100%' }, visible: { x: 0 } },
    bottom: { hidden: { y: '100%' }, visible: { y: 0 } },
    top: { hidden: { y: '-100%' }, visible: { y: 0 } },
  }

  const positionClasses = {
    right: 'right-0 top-0 h-full',
    left: 'left-0 top-0 h-full',
    bottom: 'bottom-0 left-0 w-full rounded-t-2xl',
    top: 'top-0 left-0 w-full rounded-b-2xl',
  }

  const v = variants[side]

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={v.hidden}
            animate={v.visible}
            exit={v.hidden}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            style={side === 'right' || side === 'left' ? { width } : {}}
            className={cn(
              'absolute bg-canvas border-hairline shadow-2xl flex flex-col',
              side === 'right' && 'border-l',
              side === 'left' && 'border-r',
              side === 'bottom' && 'border-t max-h-[90vh]',
              side === 'top' && 'border-b max-h-[90vh]',
              positionClasses[side],
              className
            )}
          >
            {/* Header */}
            {(title || onClose) && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-hairline shrink-0">
                {title && <h2 className="font-semibold text-ink">{title}</h2>}
                <button
                  onClick={onClose}
                  aria-label="Close drawer"
                  className="ml-auto text-muted hover:text-ink transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Drawer
