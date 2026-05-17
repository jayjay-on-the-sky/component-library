import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const presets = {
  aurora: 'linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f64f59 50%, #c471ed 75%, #667eea 100%)',
  fire: 'linear-gradient(90deg, #f7971e 0%, #ffd200 25%, #f7971e 75%, #ff4e00 100%)',
  ocean: 'linear-gradient(90deg, #2193b0 0%, #6dd5ed 50%, #2193b0 100%)',
  forest: 'linear-gradient(90deg, #11998e 0%, #38ef7d 50%, #11998e 100%)',
  neon: 'linear-gradient(90deg, #00f5a0 0%, #00d9f5 50%, #00f5a0 100%)',
  primary: 'linear-gradient(90deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 60%, var(--color-success)) 100%)',
}

const GradientText = forwardRef(function GradientText({
  children = 'Gradient Text',
  preset = 'aurora',
  animate = true,
  size,
  as: Tag = 'span',
  className,
  style,
  ...props
}, ref) {
  const gradient = presets[preset] ?? presets.aurora

  return (
    <Tag
      ref={ref}
      className={cn('font-bold inline-block', size, className)}
      style={{
        backgroundImage: gradient,
        backgroundSize: animate ? '200% auto' : 'auto',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        animation: animate ? 'gradientShimmer 4s linear infinite' : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
      {animate && (
        <style>{`
          @keyframes gradientShimmer {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
        `}</style>
      )}
    </Tag>
  )
})

export default GradientText
