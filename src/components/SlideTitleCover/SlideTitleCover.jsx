import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export default function SlideTitleCover({
  title = 'The Future of\nWork is Here',
  subtitle = 'How distributed teams are redefining productivity in the age of AI',
  speaker = 'Jane Doe',
  role = 'CEO, Acme Inc.',
  date = 'May 2026',
  event = 'Future of Work Summit',
  theme = 'dark', // dark | light | gradient
  className,
}) {
  const isDark = theme === 'dark'
  const isGrad = theme === 'gradient'

  return (
    <div
      className={cn(
        'relative overflow-hidden flex flex-col',
        isDark ? 'bg-ink text-canvas' : isGrad ? 'text-canvas' : 'bg-canvas text-ink',
        className
      )}
      style={{
        width: '100%',
        aspectRatio: '16/9',
        background: isGrad
          ? 'linear-gradient(135deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 40%, #000) 100%)'
          : undefined,
      }}
    >
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(var(--color-canvas) 1px, transparent 1px), linear-gradient(90deg, var(--color-canvas) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Decorative blob */}
      <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.3), transparent 70%)' }} />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)' }} />

      {/* Content */}
      <div className="relative flex flex-col justify-between h-full p-16">
        {/* Top: event */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <span className="text-sm font-medium opacity-60">{event}</span>
        </motion.div>

        {/* Center: title */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-black leading-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', whiteSpace: 'pre-line' }}
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg opacity-70 max-w-xl"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Bottom: speaker */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/30 border-2 border-primary/50" />
            <div>
              <div className="font-semibold">{speaker}</div>
              <div className="text-sm opacity-60">{role}</div>
            </div>
          </div>
          <div className="text-sm opacity-40">{date}</div>
        </motion.div>
      </div>
    </div>
  )
}
