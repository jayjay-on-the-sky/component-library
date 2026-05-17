import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from '../../lib/icons'
import { cn } from '../../lib/utils'

const MetricCard = ({ label, value, change, unit, prefix, i }) => {
  const isPos = change > 0
  const isNeg = change < 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
      className="flex flex-col gap-1 px-6 py-4 border-r border-hairline last:border-r-0 flex-1"
    >
      <p className="text-xs font-medium text-muted uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-ink">
        {prefix}<span>{value}</span>{unit && <span className="text-sm font-normal text-muted ml-1">{unit}</span>}
      </p>
      {change !== undefined && (
        <div className={cn('flex items-center gap-1 text-xs font-medium', isPos ? 'text-success' : isNeg ? 'text-error' : 'text-muted')}>
          {isPos ? <TrendingUp size={12} /> : isNeg ? <TrendingDown size={12} /> : null}
          {isPos ? '+' : ''}{change}%
          <span className="text-muted font-normal">vs last period</span>
        </div>
      )}
    </motion.div>
  )
}

const MetricsRow = React.forwardRef(({ metrics = [], className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex bg-canvas border border-hairline rounded-[var(--radius-xl)] overflow-hidden', className)}
    role="group"
    aria-label="Metrics"
    {...props}
  >
    {metrics.map((m, i) => <MetricCard key={i} {...m} i={i} />)}
  </div>
))

MetricsRow.displayName = 'MetricsRow'
export default MetricsRow
