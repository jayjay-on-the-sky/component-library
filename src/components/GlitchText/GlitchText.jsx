import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const GlitchText = forwardRef(function GlitchText({
  children = 'GLITCH',
  as: Tag = 'div',
  size = 'text-4xl',
  color = 'var(--color-ink)',
  speed = 'normal',  // slow | normal | fast
  className,
  style,
  ...props
}, ref) {
  const durationMap = { slow: '4s', normal: '2s', fast: '0.8s' }
  const duration = durationMap[speed] ?? durationMap.normal

  return (
    <>
      <style>{`
        @keyframes glitch-clip-1 {
          0%,100%{clip-path:inset(0 0 95% 0)}
          20%{clip-path:inset(20% 0 60% 0)}
          40%{clip-path:inset(50% 0 30% 0)}
          60%{clip-path:inset(80% 0 5% 0)}
          80%{clip-path:inset(10% 0 80% 0)}
        }
        @keyframes glitch-clip-2 {
          0%,100%{clip-path:inset(80% 0 0 0)}
          20%{clip-path:inset(5% 0 85% 0)}
          40%{clip-path:inset(30% 0 55% 0)}
          60%{clip-path:inset(60% 0 25% 0)}
          80%{clip-path:inset(90% 0 2% 0)}
        }
        @keyframes glitch-shift-1 { 0%,100%{transform:translate(-3px,0)} 50%{transform:translate(3px,0)} }
        @keyframes glitch-shift-2 { 0%,100%{transform:translate(3px,0)} 50%{transform:translate(-3px,0)} }
      `}</style>
      <Tag
        ref={ref}
        className={cn('relative inline-block font-black tracking-wider select-none', size, className)}
        style={{ color, ...style }}
        aria-label={typeof children === 'string' ? children : undefined}
        {...props}
      >
        {/* Base text */}
        <span>{children}</span>

        {/* Glitch layer 1 (primary channel shift) */}
        <span
          aria-hidden="true"
          className="absolute inset-0 text-primary"
          style={{
            animation: `glitch-clip-1 ${duration} step-start infinite, glitch-shift-1 ${duration} step-start infinite`,
          }}
        >{children}</span>

        {/* Glitch layer 2 (error channel shift) */}
        <span
          aria-hidden="true"
          className="absolute inset-0 text-error"
          style={{
            animation: `glitch-clip-2 ${duration} step-start infinite, glitch-shift-2 ${duration} step-start infinite`,
          }}
        >{children}</span>
      </Tag>
    </>
  )
})

export default GlitchText
