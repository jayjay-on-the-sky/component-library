import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const MarqueeStrip = forwardRef(function MarqueeStrip({
  items = ['Figma', 'React', 'TypeScript', 'Tailwind', 'Framer', 'Vercel', 'Next.js', 'Vite', 'Bun', 'Turborepo'],
  speed = 30,
  reverse = false,
  gap = 48,
  className,
  renderItem,
  ...props
}, ref) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items]

  const duration = `${(items.length * 120) / speed}s`

  return (
    <>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marqueeRev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
      <div
        ref={ref}
        className={cn('overflow-hidden w-full', className)}
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        aria-label="Marquee"
        {...props}
      >
        <div
          className="flex items-center whitespace-nowrap w-max"
          style={{
            gap,
            animation: `${reverse ? 'marqueeRev' : 'marquee'} ${duration} linear infinite`,
          }}
        >
          {doubled.map((item, i) => (
            <div key={i} className="shrink-0">
              {renderItem ? renderItem(item, i % items.length) : (
                <span className="text-sm font-semibold text-muted px-4 py-2 rounded-full border border-hairline bg-surface">
                  {item}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
})

export default MarqueeStrip
