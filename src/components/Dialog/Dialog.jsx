import * as RadixDialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { cn } from '../../lib/utils'
import Button from '../Button/Button'

export function Dialog({ trigger, title, description, children, footer }) {
  const [open, setOpen] = useState(false)

  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Trigger asChild>
        {trigger}
      </RadixDialog.Trigger>

      <AnimatePresence>
        {open && (
          <RadixDialog.Portal forceMount>
            {/* Overlay */}
            <RadixDialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              />
            </RadixDialog.Overlay>

            {/* Content */}
            <RadixDialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ duration: 0.18, type: 'spring', stiffness: 300, damping: 25 }}
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-canvas border border-hairline rounded-[var(--radius-xl)] shadow-2xl overflow-hidden focus:outline-none"
              >
                {/* Header */}
                <div className="flex items-start justify-between px-6 pt-6 pb-2">
                  <div>
                    {title && (
                      <RadixDialog.Title className="text-base font-semibold text-ink">
                        {title}
                      </RadixDialog.Title>
                    )}
                    {description && (
                      <RadixDialog.Description className="text-sm text-body mt-1">
                        {description}
                      </RadixDialog.Description>
                    )}
                  </div>
                  <RadixDialog.Close asChild>
                    <button className="ml-4 p-1 text-muted hover:text-ink rounded-md transition-colors focus-ring">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </RadixDialog.Close>
                </div>

                {/* Body */}
                {children && (
                  <div className="px-6 py-4">
                    {children}
                  </div>
                )}

                {/* Footer */}
                {footer && (
                  <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-hairline bg-surface/50">
                    {footer}
                  </div>
                )}
              </motion.div>
            </RadixDialog.Content>
          </RadixDialog.Portal>
        )}
      </AnimatePresence>
    </RadixDialog.Root>
  )
}

export function DialogDemo() {
  return (
    <Dialog
      trigger={<Button>Open Dialog</Button>}
      title="Confirm action"
      description="This action cannot be undone. Are you sure you want to continue?"
      footer={
        <>
          <Button variant="ghost" size="sm">Cancel</Button>
          <Button variant="destructive" size="sm">Delete</Button>
        </>
      }
    >
      <p className="text-sm text-body">
        You are about to permanently delete this item and all associated data.
      </p>
    </Dialog>
  )
}

export default Dialog
