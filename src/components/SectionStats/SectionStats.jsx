import { forwardRef, useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * SectionStats — animated count-up metrics bar.
 * stats: [{ value: string | number, label, prefix?, suffix? }]
 */

function useCountUp(target, inView, duration = 1800) {
  const [count, setCount] = useState(0)
  const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ''))

  useEffect(() => {
    if (!inView) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out-cubic
      setCount(Math.floor(eased * numeric))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(numeric)
    }
    requestAnimationFrame(step)
  }, [inView, numeric, duration])

  return count
}

function StatItem({ value, label, prefix = '', suffix = '', index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const numeric = parseFloat(String(value).replace(/[^0-9.]/g, ''))
  const isNumeric = !isNaN(numeric)
  const count = useCountUp(numeric, inView)

  const display = isNumeric
    ? `${prefix}${count.toLocaleString()}${suffix}`
    : value

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="flex flex-col items-center gap-2 px-8 py-6"
    >
      <span className="text-5xl font-bold text-ink tabular-nums tracking-tight" style={{ letterSpacing: '-0.03em' }}>
        {display}
      </span>
      <span className="text-sm text-ink-muted font-medium text-center">{label}</span>
    </motion.div>
  )
}

const SectionStats = forwardRef(function SectionStats(
  {
    stats = [],
    eyebrow,
    dividers = true,
    className,
    ...props
  },
  ref
) {
  return (
    <section
      ref={ref}
      className={cn('py-20 px-6 bg-surface border-y border-hairline', className)}
      {...props}
    >
      <div className="max-w-6xl mx-auto">
        {eyebrow && (
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary mb-10">
            {eyebrow}
          </p>
        )}
        <div className={cn(
          'flex flex-wrap justify-center',
          dividers && 'divide-x divide-hairline'
        )}>
          {stats.map((s, i) => (
            <StatItem key={i} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
})

export default SectionStats
