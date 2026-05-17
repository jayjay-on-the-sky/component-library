import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../../lib/utils'

// Exhaustive gap lookup — dynamic class names are not safe in Tailwind v4
const GAP = {
  '0': 'gap-0', '1': 'gap-1', '2': 'gap-2', '3': 'gap-3',
  '4': 'gap-4', '5': 'gap-5', '6': 'gap-6', '7': 'gap-7',
  '8': 'gap-8', '10': 'gap-10', '12': 'gap-12', '14': 'gap-14',
  '16': 'gap-16', '20': 'gap-20', '24': 'gap-24', '32': 'gap-32',
}

const DIRECTION = {
  column: 'flex-col',
  row: 'flex-row',
}

const ALIGN = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
}

const Stack = forwardRef(function Stack({
  children,
  direction = 'column',
  spacing = '4',
  align = 'start',
  animate = false,
  className,
  ...props
}, ref) {
  return (
    <motion.div
      ref={ref}
      layout={animate}
      initial={animate ? { opacity: 0, y: 8 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'flex',
        DIRECTION[direction] ?? DIRECTION.column,
        ALIGN[align] ?? ALIGN.start,
        GAP[spacing] ?? 'gap-4',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
})

Stack.displayName = 'Stack'
export default Stack
