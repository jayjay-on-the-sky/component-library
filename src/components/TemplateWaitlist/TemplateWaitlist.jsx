import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Twitter, Github } from '../../lib/icons'
import { cn } from '../../lib/utils'

function useCountdown(target) {
  const now = new Date()
  const then = new Date(target)
  const diff = Math.max(0, then - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const mins = Math.floor((diff / (1000 * 60)) % 60)
  const secs = Math.floor((diff / 1000) % 60)
  return { days, hours, mins, secs }
}

function CountdownBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-xl bg-surface border border-hairline flex items-center justify-center text-3xl font-black text-ink tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-[10px] text-muted mt-1 uppercase tracking-widest">{label}</div>
    </div>
  )
}

export default function TemplateWaitlist({ className }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { days, hours, mins, secs } = useCountdown('2026-09-01')

  return (
    <div className={cn('min-h-screen bg-canvas flex flex-col', className)}>
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, var(--color-primary), transparent)', filter: 'blur(60px)' }} />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--color-success), transparent)', filter: 'blur(80px)' }} />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Coming Soon
        </motion.div>

        {/* Logo / Brand */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h1 className="text-6xl md:text-8xl font-black text-ink tracking-tighter mb-4">
            Nova<span style={{ color: 'var(--color-primary)' }}>.</span>
          </h1>
          <p className="text-xl text-muted max-w-md mx-auto mb-12">
            The next generation of design tooling. We're almost ready.
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex items-center gap-4 mb-12">
          <CountdownBox value={days} label="Days" />
          <div className="text-2xl font-black text-muted">:</div>
          <CountdownBox value={hours} label="Hours" />
          <div className="text-2xl font-black text-muted">:</div>
          <CountdownBox value={mins} label="Mins" />
          <div className="text-2xl font-black text-muted">:</div>
          <CountdownBox value={secs} label="Secs" />
        </motion.div>

        {/* Email form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div key="form" exit={{ opacity: 0, scale: 0.95 }} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 px-4 py-3 rounded-full border border-hairline bg-surface text-ink text-sm outline-none focus:border-primary transition-colors"
                />
                <button
                  onClick={() => submitted || setSubmitted(true)}
                  className="px-5 py-3 rounded-full bg-primary text-on-primary text-sm font-semibold flex items-center gap-1.5"
                >
                  Join <ArrowRight size={14} />
                </button>
              </motion.div>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 text-success font-semibold">
                <Check size={18} /> You're on the list!
              </motion.div>
            )}
          </AnimatePresence>
          <p className="text-xs text-muted mt-3">Join 2,400+ people already waiting. No spam, ever.</p>
        </motion.div>

        {/* Social */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="flex items-center gap-4 mt-12">
          <a href="#" className="text-muted hover:text-ink transition-colors"><Twitter size={18} /></a>
          <a href="#" className="text-muted hover:text-ink transition-colors"><Github size={18} /></a>
        </motion.div>
      </div>
    </div>
  )
}
