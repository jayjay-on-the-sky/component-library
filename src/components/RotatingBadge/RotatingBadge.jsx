import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const RotatingBadge = forwardRef(function RotatingBadge({
  text = 'AVAILABLE FOR HIRE • AVAILABLE FOR HIRE • ',
  size = 100,
  speed = 8,
  children,
  className,
  ...props
}, ref) {
  const r = size / 2 - 8
  const circumference = 2 * Math.PI * r
  const textStr = text.repeat(Math.max(1, Math.ceil(circumference / (text.length * 7))))

  return (
    <>
      <style>{`
        @keyframes rotateBadge { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
      <div
        ref={ref}
        className={cn('relative inline-flex items-center justify-center', className)}
        style={{ width: size, height: size }}
        {...props}
      >
        {/* Rotating text */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0"
          style={{ animation: `rotateBadge ${speed}s linear infinite` }}
          aria-hidden="true"
        >
          <defs>
            <path
              id={`circle-${size}`}
              d={`M ${size / 2},${size / 2} m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
            />
          </defs>
          <text fontSize={9} fill="var(--color-primary)" fontWeight="600" letterSpacing="1.5">
            <textPath href={`#circle-${size}`}>{textStr}</textPath>
          </text>
        </svg>

        {/* Center content */}
        <div className="relative z-10 flex items-center justify-center">
          {children ?? (
            <div
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary text-lg font-bold"
            >★</div>
          )}
        </div>
      </div>
    </>
  )
})

export default RotatingBadge
