import { forwardRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '../../lib/utils'

const CursorFollower = forwardRef(function CursorFollower({
  size = 24,
  innerSize = 6,
  color,
  lag = 0.15,
  className,
  ...props
}, ref) {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springX = useSpring(cursorX, { stiffness: 500 / lag, damping: 28 })
  const springY = useSpring(cursorY, { stiffness: 500 / lag, damping: 28 })

  const trailX = useSpring(cursorX, { stiffness: 150, damping: 20 })
  const trailY = useSpring(cursorY, { stiffness: 150, damping: 20 })

  useEffect(() => {
    function onMouseMove(e) {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [cursorX, cursorY])

  const c = color ?? 'var(--color-primary)'

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className={cn('fixed pointer-events-none z-[9999] rounded-full border-2', className)}
        style={{
          width: size,
          height: size,
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: c,
          opacity: 0.6,
        }}
        {...props}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          width: innerSize,
          height: innerSize,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: c,
        }}
      />
    </>
  )
})

export default CursorFollower
