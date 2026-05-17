import { forwardRef, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { cn } from '../../lib/utils'

const MagneticButton = forwardRef(function MagneticButton({
  children = 'Hover Me',
  strength = 0.4,
  className,
  ...props
}, ref) {
  const btnRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  const x = useSpring(0, { stiffness: 200, damping: 15 })
  const y = useSpring(0, { stiffness: 200, damping: 15 })

  function onMouseMove(e) {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
    setHovering(false)
  }

  return (
    <motion.button
      ref={btnRef}
      style={{ x, y }}
      className={cn(
        'relative inline-flex items-center justify-center px-6 py-3 rounded-full',
        'bg-primary text-on-primary font-semibold text-sm',
        'shadow-lg transition-shadow',
        hovering && 'shadow-xl shadow-primary/30',
        className
      )}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={onMouseLeave}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <motion.span
        animate={hovering ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.button>
  )
})

export default MagneticButton
