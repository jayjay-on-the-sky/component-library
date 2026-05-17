import { forwardRef, useState, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

const AccordionContext = createContext(null)

/**
 * Accordion — expandable disclosure panels.
 * Usage: <Accordion> <Accordion.Item> <Accordion.Trigger> <Accordion.Content> </Accordion>
 * type: "single" (one at a time) | "multiple"
 */

function Accordion({ children, type = 'single', defaultOpen = null, className }) {
  const [openIds, setOpenIds] = useState(
    defaultOpen ? (Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen]) : []
  )

  const toggle = (id) => {
    if (type === 'single') {
      setOpenIds(prev => prev.includes(id) ? [] : [id])
    } else {
      setOpenIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    }
  }

  return (
    <AccordionContext.Provider value={{ openIds, toggle }}>
      <div className={cn('divide-y divide-hairline border border-hairline rounded-xl overflow-hidden', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

const AccordionItem = forwardRef(function AccordionItem({ id, children, className }, ref) {
  return (
    <div ref={ref} className={cn('bg-surface', className)} data-id={id}>
      {children}
    </div>
  )
})

const AccordionTrigger = forwardRef(function AccordionTrigger({ itemId, children, className }, ref) {
  const { openIds, toggle } = useContext(AccordionContext)
  const open = openIds.includes(itemId)

  return (
    <button
      ref={ref}
      onClick={() => toggle(itemId)}
      aria-expanded={open}
      aria-controls={`accordion-content-${itemId}`}
      id={`accordion-trigger-${itemId}`}
      className={cn(
        'w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-ink',
        'hover:bg-surface-strong transition-colors duration-150 text-left',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40',
        className
      )}
    >
      <span>{children}</span>
      <motion.span
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="shrink-0 ml-4 text-ink-muted"
        aria-hidden
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.span>
    </button>
  )
})

function AccordionContent({ itemId, children, className }) {
  const { openIds } = useContext(AccordionContext)
  const open = openIds.includes(itemId)

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={`accordion-content-${itemId}`}
          role="region"
          aria-labelledby={`accordion-trigger-${itemId}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className={cn('px-5 pb-4 text-sm text-ink-muted leading-relaxed', className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

Accordion.Item = AccordionItem
Accordion.Trigger = AccordionTrigger
Accordion.Content = AccordionContent

export default Accordion
