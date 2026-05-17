import { useEffect, useRef, useState, forwardRef } from 'react'
import { useInView, motion } from 'framer-motion'
import { cn } from '../../lib/utils'

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4)
}

const CountUpStat = forwardRef(function CountUpStat({
  value = 12840,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  label,
  size = 'lg',
  className,
  ...props
}, ref) {
  const [displayed, setDisplayed] = useState(0)
  const inViewRef = useRef(null)
  const isInView = useInView(inViewRef, { once: true, margin: '-50px' })
  const startTime = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!isInView) return
    startTime.current = null

    function tick(ts) {
      if (!startTime.current) startTime.current = ts
      const elapsed = ts - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutQuart(progress)
      setDisplayed(Math.round(eased * value * Math.pow(10, decimals)) / Math.pow(10, decimals))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isInView, value, duration, decimals])

  const sizeMap = {
    sm: 'text-3xl',
    md: 'text-5xl',
    lg: 'text-7xl',
    xl: 'text-8xl',
  }

  const formatted = displayed.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <div ref={ref} className={cn('flex flex-col items-center gap-2', className)} {...props}>
      <div ref={inViewRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={cn('font-black text-ink tabular-nums', sizeMap[size])}
        >
          {prefix}{formatted}{suffix}
        </motion.div>
      </div>
      {label && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm font-medium text-muted uppercase tracking-widest"
        >
          {label}
        </motion.div>
      )}
    </div>
  )
})

export default CountUpStat
