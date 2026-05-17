import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const KEYFRAMES = {
  blob1: `
    @keyframes morphBlob1 {
      0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
      50% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
      75% { border-radius: 60% 40% 60% 30% / 60% 40% 30% 70%; }
    }
  `,
  blob2: `
    @keyframes morphBlob2 {
      0%,100% { border-radius: 40% 60% 60% 40% / 70% 30% 60% 40%; }
      33% { border-radius: 70% 30% 40% 60% / 40% 70% 30% 60%; }
      66% { border-radius: 30% 70% 60% 40% / 60% 40% 70% 30%; }
    }
  `,
}

const MorphingBlob = forwardRef(function MorphingBlob({
  size = 300,
  color,
  opacity = 0.6,
  speed = 8,
  variant = 1,
  className,
  style,
  ...props
}, ref) {
  const animName = `morphBlob${variant}`

  return (
    <>
      <style>{KEYFRAMES[animName] ?? KEYFRAMES.blob1}</style>
      <div
        ref={ref}
        className={cn('pointer-events-none', className)}
        style={{
          width: size,
          height: size,
          background: color ?? 'radial-gradient(circle, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 60%, var(--color-success)) 100%)',
          opacity,
          animation: `${animName} ${speed}s ease-in-out infinite`,
          filter: 'blur(20px)',
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    </>
  )
})

export default MorphingBlob
