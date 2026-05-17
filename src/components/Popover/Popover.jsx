import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

const Popover = ({
  trigger,
  children,
  placement = 'bottom',
  className,
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const placementClasses = {
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
    'bottom-start': 'top-full mt-2 left-0',
    'bottom-end': 'top-full mt-2 right-0',
  }

  const animMap = {
    bottom: { initial: { opacity: 0, y: -4 }, animate: { opacity: 1, y: 0 } },
    top: { initial: { opacity: 0, y: 4 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: 4 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: -4 }, animate: { opacity: 1, x: 0 } },
    'bottom-start': { initial: { opacity: 0, y: -4 }, animate: { opacity: 1, y: 0 } },
    'bottom-end': { initial: { opacity: 0, y: -4 }, animate: { opacity: 1, y: 0 } },
  }

  const anim = animMap[placement] || animMap.bottom

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen(o => !o)} role="button" tabIndex={0}>
        {trigger}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={anim.initial}
            animate={anim.animate}
            exit={anim.initial}
            transition={{ duration: 0.14 }}
            role="dialog"
            className={cn(
              'absolute z-50 bg-canvas border border-hairline rounded-[var(--radius-xl)] shadow-xl min-w-[200px]',
              placementClasses[placement],
              className
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Popover
