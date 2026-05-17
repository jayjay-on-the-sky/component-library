import { forwardRef, useRef, useState } from 'react'
import { cn } from '../../lib/utils'

const SpotlightCard = forwardRef(function SpotlightCard({
  children,
  title,
  subtitle,
  spotlightColor = 'color-mix(in srgb, var(--color-primary) 15%, transparent)',
  className,
  ...props
}, ref) {
  const cardRef = useRef(null)
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [active, setActive] = useState(false)

  function onMouseMove(e) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative rounded-2xl border border-hairline bg-canvas overflow-hidden cursor-default',
        className
      )}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      {...props}
    >
      {/* Spotlight radial gradient follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-2xl"
        style={{
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 60%)`,
          opacity: active ? 1 : 0,
        }}
      />

      <div className="relative z-10 p-6">
        {title && <div className="text-lg font-semibold text-ink mb-1">{title}</div>}
        {subtitle && <div className="text-sm text-muted mb-4">{subtitle}</div>}
        {children}
      </div>
    </div>
  )
})

export default SpotlightCard
