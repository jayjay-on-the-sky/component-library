import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

const HoverCard = forwardRef(function HoverCard({
  title = 'Card Title',
  description = 'Hover to reveal more details about this item.',
  tag,
  gradient = 'from-primary/60 to-surface',
  className,
  ...props
}, ref) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative rounded-2xl overflow-hidden cursor-pointer border border-hairline',
        'bg-canvas',
        className
      )}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      {...props}
    >
      {/* Image/gradient area */}
      <div className={cn('h-52 bg-gradient-to-br', gradient, 'relative overflow-hidden')}>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={hovered ? { scale: 1.08 } : { scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Abstract decorative element */}
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30" />
          <div className="absolute w-10 h-10 rounded-full bg-white/30" style={{ transform: 'translate(12px, -12px)' }} />
        </motion.div>

        {tag && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-semibold">
            {tag}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-ink mb-1">{title}</h3>
        <p className="text-sm text-muted line-clamp-2">{description}</p>
      </div>

      {/* Slide-up reveal panel */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-primary text-on-primary p-5"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-semibold mb-1">{title}</div>
            <div className="text-sm opacity-80">{description}</div>
            <div className="mt-3 flex items-center gap-1 text-sm font-semibold">
              Learn more <span>→</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
})

export default HoverCard
