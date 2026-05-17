import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export default function SlideStatement({
  quote = 'The best way to predict\nthe future is to build it.',
  attribution,
  bg = 'dark', // dark | light | primary
  className,
}) {
  const themes = {
    dark: { bg: 'bg-ink', text: 'text-canvas', sub: 'text-white/50' },
    light: { bg: 'bg-canvas', text: 'text-ink', sub: 'text-muted' },
    primary: { bg: 'bg-primary', text: 'text-on-primary', sub: 'text-white/70' },
  }
  const t = themes[bg] ?? themes.dark

  return (
    <div
      className={cn('relative flex flex-col items-center justify-center overflow-hidden', t.bg, className)}
      style={{ width: '100%', aspectRatio: '16/9', padding: '10%' }}
    >
      {/* Decorative quote mark */}
      <div className="absolute top-8 left-12 text-[120px] font-black opacity-[0.06] leading-none select-none">"</div>

      <motion.blockquote
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn('text-center font-black leading-tight', t.text)}
        style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', whiteSpace: 'pre-line' }}
      >
        {quote}
      </motion.blockquote>

      {attribution && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={cn('mt-8 text-sm font-medium', t.sub)}
        >
          — {attribution}
        </motion.div>
      )}

      {/* Decorative lines */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {[40, 20, 12].map((w, i) => (
          <div key={i} className={cn('h-0.5 rounded-full', t.text, 'opacity-20')} style={{ width: w }} />
        ))}
      </div>
    </div>
  )
}
