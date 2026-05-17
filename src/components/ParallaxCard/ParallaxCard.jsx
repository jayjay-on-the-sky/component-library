import { forwardRef, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { cn } from '../../lib/utils'

const ParallaxCard = forwardRef(function ParallaxCard({
  children,
  title,
  subtitle,
  image,
  intensity = 15,
  shine = true,
  className,
  ...props
}, ref) {
  const cardRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  const rotX = useSpring(0, { stiffness: 300, damping: 30 })
  const rotY = useSpring(0, { stiffness: 300, damping: 30 })
  const shineX = useSpring(50, { stiffness: 200, damping: 20 })
  const shineY = useSpring(50, { stiffness: 200, damping: 20 })

  function onMouseMove(e) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    rotX.set((0.5 - y) * intensity)
    rotY.set((x - 0.5) * intensity)
    shineX.set(x * 100)
    shineY.set(y * 100)
  }

  function onMouseLeave() {
    rotX.set(0)
    rotY.set(0)
    shineX.set(50)
    shineY.set(50)
    setHovering(false)
  }

  return (
    <div
      ref={ref}
      className={cn('perspective-[1000px] inline-block', className)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        className="relative rounded-2xl overflow-hidden bg-canvas border border-hairline shadow-xl cursor-pointer"
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {image && (
          <div className="h-48 overflow-hidden">
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              style={{ scale: hovering ? 1.05 : 1, transition: 'scale 0.3s' }}
            />
          </div>
        )}

        {!image && (
          <div className="h-36 bg-gradient-to-br from-primary/20 to-surface flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30" />
          </div>
        )}

        <div className="p-5">
          {title && <div className="font-semibold text-ink mb-1">{title}</div>}
          {subtitle && <div className="text-sm text-muted">{subtitle}</div>}
          {children}
        </div>

        {/* Shine overlay */}
        {shine && hovering && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  )
})

export default ParallaxCard
