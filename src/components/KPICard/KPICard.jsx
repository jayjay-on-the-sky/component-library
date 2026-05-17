import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from '../../lib/icons'
import { cn } from '../../lib/utils'

const KPICard = React.forwardRef(({
  title,
  value,
  change,
  changeLabel,
  icon,
  sparkline,
  loading = false,
  className,
  ...props
}, ref) => {
  const isPositive = typeof change === 'number' ? change >= 0 : change?.startsWith('+')
  const isNegative = typeof change === 'number' ? change < 0 : change?.startsWith('-')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-canvas border border-hairline rounded-[var(--radius-xl)] p-5 flex flex-col gap-3',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted">{title}</span>
        {icon && (
          <div className="w-8 h-8 rounded-[var(--radius-md)] bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </div>

      {loading ? (
        <div className="h-8 w-24 rounded bg-surface animate-pulse" />
      ) : (
        <div className="text-2xl font-bold text-ink tracking-tight">{value}</div>
      )}

      <div className="flex items-center justify-between">
        {change !== undefined && (
          <div className={cn(
            'flex items-center gap-1 text-xs font-medium',
            isPositive ? 'text-success' : isNegative ? 'text-error' : 'text-muted'
          )}>
            {isPositive ? <TrendingUp size={13} /> : isNegative ? <TrendingDown size={13} /> : null}
            <span>{typeof change === 'number' ? `${change > 0 ? '+' : ''}${change}%` : change}</span>
            {changeLabel && <span className="text-muted font-normal">{changeLabel}</span>}
          </div>
        )}
        {sparkline && <div className="ml-auto">{sparkline}</div>}
      </div>
    </motion.div>
  )
})

KPICard.displayName = 'KPICard'
export default KPICard
