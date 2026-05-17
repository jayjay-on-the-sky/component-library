import { forwardRef, useId } from 'react'
import { cn } from '../../lib/utils'

const WaveBackground = forwardRef(function WaveBackground({
  children,
  waves = 3,
  speed = 8,
  amplitude = 20,
  color,
  opacity = 0.4,
  className,
  ...props
}, ref) {
  const id = useId()

  return (
    <>
      <style>{`
        @keyframes waveDrift1 { 0%,100%{d:path("M0,40 C200,${40 - amplitude} 400,${40 + amplitude} 600,40 S1000,${40 - amplitude} 1200,40 V100 H0Z")} 50%{d:path("M0,40 C200,${40 + amplitude} 400,${40 - amplitude} 600,40 S1000,${40 + amplitude} 1200,40 V100 H0Z")} }
        @keyframes waveDrift2 { 0%,100%{d:path("M0,50 C150,${50 + amplitude} 350,${50 - amplitude} 600,50 S900,${50 + amplitude} 1200,50 V100 H0Z")} 50%{d:path("M0,50 C150,${50 - amplitude} 350,${50 + amplitude} 600,50 S900,${50 - amplitude} 1200,50 V100 H0Z")} }
        @keyframes waveDrift3 { 0%,100%{d:path("M0,60 C250,${60 - amplitude/2} 450,${60 + amplitude/2} 600,60 S950,${60 - amplitude/2} 1200,60 V100 H0Z")} 50%{d:path("M0,60 C250,${60 + amplitude/2} 450,${60 - amplitude/2} 600,60 S950,${60 + amplitude/2} 1200,60 V100 H0Z")} }
      `}</style>
      <div
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        {...props}
      >
        {children}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
          style={{ height: 80 }}
          aria-hidden="true"
        >
          {Array.from({ length: Math.min(waves, 3) }, (_, i) => (
            <path
              key={i}
              fill={color ?? 'var(--color-primary)'}
              opacity={(opacity / waves) * (waves - i)}
              style={{
                animation: `waveDrift${i + 1} ${speed + i * 2}s ease-in-out infinite`,
              }}
            />
          ))}
        </svg>
      </div>
    </>
  )
})

export default WaveBackground
