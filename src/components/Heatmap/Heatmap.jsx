import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

// Generate 52 weeks of fake contribution data
function generateData() {
  return Array.from({ length: 364 }, (_, i) => ({
    day: i,
    value: Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 10),
  }))
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

export default function Heatmap({
  data,
  className,
}) {
  const [tooltip, setTooltip] = useState(null)
  const cellData = data ?? generateData()

  const cellSize = 11
  const gap = 2
  const step = cellSize + gap
  const weeks = Math.ceil(cellData.length / 7)

  function intensity(v) {
    if (v === 0) return 'var(--color-surface)'
    if (v <= 2) return 'color-mix(in srgb, var(--color-primary) 30%, var(--color-canvas))'
    if (v <= 5) return 'color-mix(in srgb, var(--color-primary) 55%, var(--color-canvas))'
    if (v <= 8) return 'color-mix(in srgb, var(--color-primary) 80%, var(--color-canvas))'
    return 'var(--color-primary)'
  }

  return (
    <div className={cn('relative overflow-auto', className)}>
      {/* Month labels */}
      <div className="flex gap-0 ml-8 mb-1">
        {MONTHS.map((m, i) => (
          <div key={i} className="text-[9px] text-muted" style={{ width: step * Math.round(weeks / 12) }}>{m}</div>
        ))}
      </div>

      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-[2px] pr-1">
          {DAYS.map((d, i) => (
            <div key={i} className="text-[9px] text-muted text-right" style={{ height: cellSize, lineHeight: `${cellSize}px` }}>{d}</div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex gap-[2px]" onMouseLeave={() => setTooltip(null)}>
          {Array.from({ length: weeks }, (_, w) => (
            <div key={w} className="flex flex-col gap-[2px]">
              {Array.from({ length: 7 }, (_, d) => {
                const idx = w * 7 + d
                const cell = cellData[idx]
                if (!cell) return <div key={d} style={{ width: cellSize, height: cellSize }} />
                return (
                  <motion.div
                    key={d}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      background: intensity(cell.value),
                      borderRadius: 2,
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: Math.random() * 0.5 }}
                    onMouseEnter={e => setTooltip({ value: cell.value, day: idx })}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {tooltip && (
        <div className="pointer-events-none fixed px-2 py-1 rounded-md bg-ink text-canvas text-xs z-50 shadow-xl">
          {tooltip.value} contributions
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-1 mt-2 ml-8">
        <span className="text-[9px] text-muted mr-1">Less</span>
        {[0, 2, 5, 8, 10].map(v => (
          <div key={v} style={{ width: cellSize, height: cellSize, background: intensity(v), borderRadius: 2 }} />
        ))}
        <span className="text-[9px] text-muted ml-1">More</span>
      </div>
    </div>
  )
}
