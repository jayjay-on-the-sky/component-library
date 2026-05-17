import { motion } from 'framer-motion'
import { ArrowRight } from '../../lib/icons'
import { cn } from '../../lib/utils'

export default function SlideCallToAction({
  eyebrow = 'Get Started Today',
  title = "Let's build\ntogether.",
  cta = 'Start your free trial',
  url = 'acme.io/start',
  email = 'hello@acme.io',
  dark = true,
  className,
}) {
  return (
    <div
      className={cn('relative overflow-hidden flex flex-col items-center justify-center', dark ? 'bg-ink text-canvas' : 'bg-canvas text-ink', className)}
      style={{ width: '100%', aspectRatio: '16/9' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, color-mix(in srgb, var(--color-primary) 20%, transparent), transparent)' }} />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative flex items-center gap-20 px-16">
        {/* Left: text */}
        <div className="flex-1">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-4">{eyebrow}</div>
            <h2 className="font-black mb-6" style={{ fontSize: '3.5rem', lineHeight: 1.1, whiteSpace: 'pre-line' }}>{title}</h2>
            <a href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary font-semibold text-base">
              {cta} <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-px self-stretch opacity-20" style={{ background: dark ? 'white' : 'var(--color-ink)' }} />

        {/* Right: QR + contact */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-4">
          {/* QR placeholder */}
          <div className="w-32 h-32 bg-white rounded-xl p-2 flex items-center justify-center">
            <div className="w-full h-full grid grid-cols-5 gap-0.5">
              {Array.from({ length: 25 }, (_, i) => (
                <div key={i} className={cn('rounded-[1px]', Math.random() > 0.4 ? 'bg-ink' : 'bg-transparent')} />
              ))}
            </div>
          </div>
          <div className="text-center">
            <div className={cn('text-sm font-semibold mb-0.5', dark ? 'text-white/80' : 'text-ink')}>{url}</div>
            <div className={cn('text-xs', dark ? 'text-white/40' : 'text-muted')}>{email}</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
