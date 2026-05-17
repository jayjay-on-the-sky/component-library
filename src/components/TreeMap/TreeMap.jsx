import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_DATA = [
  { label: 'React', value: 42 },
  { label: 'Vue', value: 28 },
  { label: 'Angular', value: 20 },
  { label: 'Svelte', value: 14 },
  { label: 'Solid', value: 10 },
  { label: 'Ember', value: 6 },
  { label: 'Backbone', value: 4 },
  { label: 'Alpine', value: 3 },
]

// Simple squarified treemap layout
function layout(items, x, y, w, h) {
  const total = items.reduce((s, d) => s + d.value, 0)
  const result = []
  let remaining = [...items]
  let cx = x, cy = y, cw = w, ch = h

  while (remaining.length > 0) {
    const isHoriz = cw >= ch
    const longSide = isHoriz ? cw : ch
    const shortSide = isHoriz ? ch : cw
    const remTotal = remaining.reduce((s, d) => s + d.value, 0)

    let row = []
    let rowTotal = 0
    let worstRatio = Infinity

    for (let i = 0; i < remaining.length; i++) {
      const candidate = [...row, remaining[i]]
      const candTotal = rowTotal + remaining[i].value
      const rowLen = (candTotal / remTotal) * longSide

      let maxR = 0, minR = Infinity
      for (const item of candidate) {
        const itemShort = (item.value / candTotal) * shortSide
        const ratio = Math.max(rowLen / itemShort, itemShort / rowLen)
        maxR = Math.max(maxR, ratio)
        minR = Math.min(minR, ratio)
      }

      if (candidate.length === 1 || maxR < worstRatio) {
        row = candidate
        rowTotal = candTotal
        worstRatio = maxR
      } else break
    }

    const rowLen = (rowTotal / remTotal) * longSide
    let pos = isHoriz ? cy : cx

    for (const item of row) {
      const len = (item.value / rowTotal) * shortSide
      result.push({
        ...item,
        x: isHoriz ? cx : pos,
        y: isHoriz ? pos : cy,
        w: isHoriz ? rowLen : len,
        h: isHoriz ? len : rowLen,
      })
      pos += len
    }

    if (isHoriz) { cx += rowLen; cw -= rowLen }
    else { cy += rowLen; ch -= rowLen }
    remaining = remaining.slice(row.length)
  }

  return result
}

const PALETTE = [
  'var(--color-primary)', 'var(--color-success)', 'var(--color-warning)',
  'var(--color-error)', 'color-mix(in srgb, var(--color-primary) 60%, var(--color-success))',
  'color-mix(in srgb, var(--color-primary) 40%, var(--color-error))',
  'color-mix(in srgb, var(--color-success) 60%, var(--color-warning))',
  'color-mix(in srgb, var(--color-warning) 70%, var(--color-error))',
]

export default function TreeMap({
  data = DEFAULT_DATA,
  width = 400,
  height = 260,
  className,
}) {
  const [tooltip, setTooltip] = useState(null)
  const pad = 2
  const rects = layout(data, pad, pad, width - pad * 2, height - pad * 2)

  return (
    <div className={cn('relative w-full', className)}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }} role="img" aria-label="Treemap"
        onMouseLeave={() => setTooltip(null)}>
        {rects.map((r, i) => (
          <g key={i} onMouseEnter={() => setTooltip(r)}>
            <motion.rect
              x={r.x + 1} y={r.y + 1}
              width={Math.max(r.w - 2, 0)}
              height={Math.max(r.h - 2, 0)}
              rx={4}
              fill={PALETTE[i % PALETTE.length]}
              fillOpacity={tooltip?.label === r.label ? 0.95 : 0.75}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              style={{ cursor: 'pointer', transformOrigin: `${r.x + r.w / 2}px ${r.y + r.h / 2}px` }}
            />
            {r.w > 48 && r.h > 28 && (
              <text
                x={r.x + r.w / 2} y={r.y + r.h / 2}
                textAnchor="middle" dominantBaseline="central"
                fontSize={Math.min(12, r.w / 5)}
                fill="white"
                fontWeight="600"
                pointerEvents="none"
              >{r.label}</text>
            )}
            {r.w > 48 && r.h > 44 && (
              <text
                x={r.x + r.w / 2} y={r.y + r.h / 2 + 14}
                textAnchor="middle" dominantBaseline="central"
                fontSize={Math.min(10, r.w / 6)}
                fill="rgba(255,255,255,0.75)"
                pointerEvents="none"
              >{r.value}</text>
            )}
          </g>
        ))}
      </svg>

      {tooltip && (
        <div className="pointer-events-none absolute bottom-2 left-2 px-2.5 py-1.5 rounded-lg bg-ink text-canvas text-xs font-medium shadow-xl z-10">
          {tooltip.label}: <span className="font-bold">{tooltip.value}</span>
        </div>
      )}
    </div>
  )
}
