import { forwardRef, useId } from 'react'
import { cn } from '../../lib/utils'

const GridPattern = forwardRef(function GridPattern({
  size = 32,
  strokeWidth = 0.5,
  opacity = 0.5,
  variant = 'grid', // grid | dots | cross
  fade = true,
  className,
  style,
  ...props
}, ref) {
  const id = useId()

  const patternEl = variant === 'dots' ? (
    <circle cx={size / 2} cy={size / 2} r={1} fill="var(--color-hairline)" />
  ) : variant === 'cross' ? (
    <>
      <line x1={size / 2} y1={2} x2={size / 2} y2={size - 2} stroke="var(--color-hairline)" strokeWidth={strokeWidth} />
      <line x1={2} y1={size / 2} x2={size - 2} y2={size / 2} stroke="var(--color-hairline)" strokeWidth={strokeWidth} />
    </>
  ) : (
    <>
      <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke="var(--color-hairline)" strokeWidth={strokeWidth} />
    </>
  )

  return (
    <div
      ref={ref}
      className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}
      style={{ opacity, ...style }}
      aria-hidden="true"
      {...props}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
            {patternEl}
          </pattern>
          {fade && (
            <radialGradient id={`${id}-fade`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          )}
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
        {fade && (
          <rect width="100%" height="100%" fill={`url(#${id}-fade)`} style={{ mixBlendMode: 'multiply' }} />
        )}
      </svg>
    </div>
  )
})

export default GridPattern
