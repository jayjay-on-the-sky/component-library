import { useEffect, useState, useRef, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

function Digit({ digit, height = 48 }) {
  return (
    <div className="relative overflow-hidden" style={{ height, width: height * 0.6 }}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={digit}
          initial={{ y: -height }}
          animate={{ y: 0 }}
          exit={{ y: height }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center font-black tabular-nums"
        >
          {digit}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const AnimatedCounter = forwardRef(function AnimatedCounter({
  value = 1337,
  size = 48,
  className,
  ...props
}, ref) {
  const [displayed, setDisplayed] = useState(0)
  const prevRef = useRef(value)

  useEffect(() => {
    const start = prevRef.current
    const end = value
    const steps = 20
    const stepDur = 600 / steps
    let step = 0

    const interval = setInterval(() => {
      step++
      const eased = 1 - Math.pow(1 - step / steps, 3)
      setDisplayed(Math.round(start + (end - start) * eased))
      if (step >= steps) {
        clearInterval(interval)
        prevRef.current = value
      }
    }, stepDur)

    return () => clearInterval(interval)
  }, [value])

  const digits = String(displayed).split('')

  return (
    <div
      ref={ref}
      className={cn('inline-flex items-center', className)}
      style={{ fontSize: size, lineHeight: 1 }}
      aria-live="polite"
      aria-label={`Counter: ${displayed}`}
      {...props}
    >
      {digits.map((d, i) => (
        <Digit key={i} digit={d} height={size} />
      ))}
    </div>
  )
})

export default AnimatedCounter
