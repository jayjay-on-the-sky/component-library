import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const GlassCard = forwardRef(function GlassCard({
  children,
  title,
  subtitle,
  glow = true,
  border = 'subtle',  // subtle | gradient | none
  blur = 'md',        // sm | md | lg
  className,
  ...props
}, ref) {
  const blurMap = { sm: 'backdrop-blur-sm', md: 'backdrop-blur-md', lg: 'backdrop-blur-xl' }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn('relative rounded-2xl overflow-hidden', className)}
      {...props}
    >
      {/* Gradient border */}
      {border === 'gradient' && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            padding: 1,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 50%, rgba(var(--color-primary-rgb, 99,102,241),0.4) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      {/* Glass surface */}
      <div
        className={cn(
          blurMap[blur],
          'relative h-full',
          border === 'subtle' && 'border border-white/20',
          'bg-white/10'
        )}
        style={{ borderRadius: 'inherit' }}
      >
        {/* Inner glow */}
        {glow && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 60%)',
            }}
          />
        )}

        <div className="relative z-10 p-6">
          {title && <div className="text-lg font-semibold text-ink mb-1">{title}</div>}
          {subtitle && <div className="text-sm text-muted mb-4">{subtitle}</div>}
          {children}
        </div>
      </div>
    </motion.div>
  )
})

export default GlassCard
