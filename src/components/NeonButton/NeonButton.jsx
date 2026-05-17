import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const colorMap = {
  cyan: {
    text: '#00ffff',
    glow: 'rgba(0,255,255,0.5)',
    border: '#00ffff',
    bg: 'rgba(0,255,255,0.05)',
  },
  magenta: {
    text: '#ff00ff',
    glow: 'rgba(255,0,255,0.5)',
    border: '#ff00ff',
    bg: 'rgba(255,0,255,0.05)',
  },
  green: {
    text: '#00ff88',
    glow: 'rgba(0,255,136,0.5)',
    border: '#00ff88',
    bg: 'rgba(0,255,136,0.05)',
  },
  orange: {
    text: '#ff6600',
    glow: 'rgba(255,102,0,0.5)',
    border: '#ff6600',
    bg: 'rgba(255,102,0,0.05)',
  },
}

const NeonButton = forwardRef(function NeonButton({
  children = 'Neon Button',
  color = 'cyan',
  size = 'md',
  className,
  ...props
}, ref) {
  const c = colorMap[color] ?? colorMap.cyan
  const sizeMap = { sm: 'px-4 py-1.5 text-sm', md: 'px-6 py-2.5 text-base', lg: 'px-8 py-3.5 text-lg' }

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'relative inline-flex items-center justify-center font-semibold tracking-wider uppercase rounded-sm transition-all',
        sizeMap[size],
        className
      )}
      style={{
        color: c.text,
        background: c.bg,
        border: `1px solid ${c.border}`,
        boxShadow: `0 0 8px ${c.glow}, inset 0 0 8px ${c.glow}`,
        textShadow: `0 0 8px ${c.text}`,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.1em',
      }}
      {...props}
    >
      <motion.span
        animate={{ opacity: [1, 0.85, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.span>

      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: c.text }} />
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r" style={{ borderColor: c.text }} />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l" style={{ borderColor: c.text }} />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: c.text }} />
    </motion.button>
  )
})

export default NeonButton
