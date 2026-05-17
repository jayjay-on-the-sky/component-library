import { forwardRef, useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { cn } from '../../lib/utils'

const ScrollProgress = forwardRef(function ScrollProgress({
  height = 3,
  color,
  position = 'top', // top | bottom
  className,
  ...props
}, ref) {
  const [progress, setProgress] = useState(0)
  const smoothProgress = useSpring(0, { stiffness: 200, damping: 30 })

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      const pct = docH > 0 ? (scrollY / docH) * 100 : 0
      setProgress(pct)
      smoothProgress.set(pct)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [smoothProgress])

  return (
    <motion.div
      ref={ref}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        'fixed left-0 z-[9999]',
        position === 'top' ? 'top-0' : 'bottom-0',
        className
      )}
      style={{
        width: `${progress}%`,
        height,
        background: color ?? 'var(--color-primary)',
        boxShadow: `0 0 8px ${color ?? 'var(--color-primary)'}`,
        transition: 'width 0.1s ease',
      }}
      {...props}
    />
  )
})

export default ScrollProgress
