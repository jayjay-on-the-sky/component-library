import { forwardRef, useRef } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { cn } from '../../lib/utils'

const TiltCard = forwardRef(function TiltCard({
  children,
  title,
  subtitle,
  icon,
  tiltMax = 20,
  glare = true,
  className,
  ...props
}, ref) {
  const cardRef = useRef(null)

  const rotX = useSpring(0, { stiffness: 400, damping: 30 })
  const rotY = useSpring(0, { stiffness: 400, damping: 30 })
  const glareX = useSpring(50, { stiffness: 200, damping: 20 })
  const glareY = useSpring(50, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    rotX.set((0.5 - y) * tiltMax)
    rotY.set((x - 0.5) * tiltMax)
    glareX.set(x * 100)
    glareY.set(y * 100)
  }

  const handleMouseLeave = () => {
    rotX.set(0); rotY.set(0)
    glareX.set(50); glareY.set(50)
  }

  return (
    <div style={{ perspective: 800 }}>
      <motion.div
        ref={cardRef}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        className={cn(
          'relative rounded-2xl bg-canvas border border-hairline shadow-2xl overflow-hidden',
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Glare layer */}
        {glare && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
            }}
          />
        )}

        <div className="relative z-10 p-6">
          {icon && (
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4" style={{ transform: 'translateZ(20px)' }}>
              {icon}
            </div>
          )}
          {title && <div className="text-lg font-semibold text-ink mb-1">{title}</div>}
          {subtitle && <div className="text-sm text-muted mb-3">{subtitle}</div>}
          {children}
        </div>
      </motion.div>
    </div>
  )
})

export default TiltCard
