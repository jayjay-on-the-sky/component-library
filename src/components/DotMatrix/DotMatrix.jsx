import { forwardRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DotMatrix = forwardRef(function DotMatrix({
  cols = 12,
  rows = 8,
  dotSize = 6,
  gap = 10,
  animate = true,
  waveSpeed = 0.8,
  className,
  ...props
}, ref) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!animate) return
    const id = setInterval(() => setTick(t => t + 1), 100)
    return () => clearInterval(id)
  }, [animate])

  return (
    <div
      ref={ref}
      className={cn('inline-grid', className)}
      style={{ gridTemplateColumns: `repeat(${cols}, ${dotSize}px)`, gap }}
      aria-hidden="true"
      {...props}
    >
      {Array.from({ length: rows * cols }, (_, idx) => {
        const col = idx % cols
        const row = Math.floor(idx / cols)
        const wave = Math.sin((col + row + tick * waveSpeed) * 0.6) * 0.5 + 0.5

        return (
          <motion.div
            key={idx}
            className="rounded-full"
            style={{
              width: dotSize,
              height: dotSize,
              background: 'var(--color-primary)',
              opacity: animate ? wave : 0.3 + (col / cols) * 0.7,
              scale: animate ? 0.6 + wave * 0.4 : 1,
            }}
          />
        )
      })}
    </div>
  )
})

export default DotMatrix
