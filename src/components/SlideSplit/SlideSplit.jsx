import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export default function SlideSplit({
  label = 'Chapter 01',
  title = 'Understanding the\nProblem Space',
  body = 'Before we build solutions, we need to deeply understand the problem. Most products fail not because of poor execution, but because they solve the wrong problem.',
  bullets,
  imageSlot,
  imagePosition = 'right', // right | left
  className,
}) {
  const textContent = (
    <div className="flex flex-col justify-center h-full px-14">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
        <div className="text-xs font-bold uppercase tracking-widest text-primary mb-4">{label}</div>
        <h2 className="text-4xl font-black text-ink leading-tight mb-5" style={{ whiteSpace: 'pre-line' }}>{title}</h2>
        <p className="text-muted text-base mb-6">{body}</p>
        {bullets && (
          <ul className="space-y-2">
            {bullets.map((b, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-3 text-sm text-ink">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {b}
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  )

  const visualContent = (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-surface"
    >
      {imageSlot ?? (
        <div className="flex flex-col items-center gap-4 opacity-30">
          <div className="w-32 h-32 rounded-2xl border-4 border-primary/40" />
          <div className="w-20 h-3 rounded-full bg-primary/40" />
          <div className="w-28 h-2 rounded-full bg-muted/40" />
        </div>
      )}
    </motion.div>
  )

  return (
    <div
      className={cn('relative bg-canvas overflow-hidden grid', className)}
      style={{ width: '100%', aspectRatio: '16/9', gridTemplateColumns: '1fr 1fr' }}
    >
      {imagePosition === 'right' ? (
        <>{textContent}{visualContent}</>
      ) : (
        <>{visualContent}{textContent}</>
      )}
    </div>
  )
}
