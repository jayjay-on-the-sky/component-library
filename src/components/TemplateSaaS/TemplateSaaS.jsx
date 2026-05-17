import { motion } from 'framer-motion'
import { Check, Zap, Shield, Globe, ArrowRight, Star } from '../../lib/icons'
import { cn } from '../../lib/utils'

const features = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Built on the edge with sub-100ms response times globally.' },
  { icon: Shield, title: 'Enterprise Security', desc: 'SOC2 Type II certified. GDPR compliant. End-to-end encryption.' },
  { icon: Globe, title: 'Global CDN', desc: 'Deployed across 300+ edge nodes for minimal latency anywhere.' },
]

const plans = [
  { name: 'Starter', price: '$0', features: ['5 projects', '1GB storage', 'Community support'], cta: 'Start free' },
  { name: 'Pro', price: '$49', features: ['Unlimited projects', '100GB storage', 'Priority support', 'Custom domains', 'Analytics'], cta: 'Get Pro', highlighted: true },
  { name: 'Enterprise', price: 'Custom', features: ['Everything in Pro', 'SSO / SAML', 'SLA guarantee', 'Dedicated support'], cta: 'Contact us' },
]

const stats = [
  { value: '50K+', label: 'Developers' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '2.4M+', label: 'Deploys / month' },
  { value: '<50ms', label: 'Avg response' },
]

export default function TemplateSaaS({ className }) {
  return (
    <div className={cn('min-h-screen bg-canvas font-sans', className)}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-hairline bg-canvas/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="font-bold text-lg text-ink">Acme Cloud</div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted">
            {['Product', 'Pricing', 'Docs', 'Blog'].map(l => (
              <a key={l} href="#" className="hover:text-ink transition-colors">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-sm text-muted hover:text-ink">Sign in</a>
            <a href="#" className="px-4 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold">Get started</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -20%, var(--color-primary), transparent)', opacity: 0.07 }} />
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-hairline bg-surface text-xs font-medium text-muted mb-6">
            <Star size={12} className="text-warning" /> New: AI-powered deployments
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-ink tracking-tight mb-6">
            Deploy at the <br />
            <span style={{ backgroundImage: 'linear-gradient(135deg, var(--color-primary), var(--color-success))', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>speed of thought</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted mb-10 max-w-2xl mx-auto">
            The platform built for modern teams. Ship faster, scale smarter, sleep better.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#" className="px-6 py-3 rounded-full bg-primary text-on-primary font-semibold flex items-center justify-center gap-2">
              Start building free <ArrowRight size={16} />
            </a>
            <a href="#" className="px-6 py-3 rounded-full border border-hairline text-ink font-semibold">View demo</a>
          </motion.div>
        </div>

        {/* Mock dashboard */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-16 rounded-2xl border border-hairline shadow-2xl overflow-hidden">
          <div className="bg-surface px-4 py-3 flex items-center gap-2 border-b border-hairline">
            <div className="flex gap-1.5">{['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}</div>
            <div className="flex-1 text-center text-xs text-muted">app.acmecloud.io</div>
          </div>
          <div className="bg-canvas p-6 grid grid-cols-3 gap-4">
            {stats.map(s => (
              <div key={s.label} className="rounded-xl border border-hairline p-4 bg-surface">
                <div className="text-2xl font-black text-ink">{s.value}</div>
                <div className="text-xs text-muted mt-1">{s.label}</div>
              </div>
            ))}
            <div className="rounded-xl border border-hairline p-4 bg-surface flex items-center justify-between">
              <div><div className="text-sm font-semibold text-ink">All systems</div><div className="text-xs text-success">Operational</div></div>
              <div className="w-3 h-3 rounded-full bg-success" style={{ boxShadow: '0 0 8px var(--color-success)' }} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-ink mb-4">Everything you need</h2>
            <p className="text-muted max-w-xl mx-auto">A complete platform from development to production.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-hairline bg-canvas p-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <f.icon size={20} />
                </div>
                <h3 className="font-semibold text-ink mb-2">{f.title}</h3>
                <p className="text-sm text-muted">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-ink mb-4">Simple pricing</h2>
            <p className="text-muted">No hidden fees. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p, i) => (
              <div key={i}
                className={cn('rounded-2xl border p-6 relative', p.highlighted ? 'border-primary bg-primary/5' : 'border-hairline bg-canvas')}>
                {p.highlighted && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-semibold">Most Popular</div>}
                <div className="text-sm font-medium text-muted mb-2">{p.name}</div>
                <div className="text-4xl font-black text-ink mb-1">{p.price}</div>
                <div className="text-xs text-muted mb-6">{p.price !== 'Custom' ? '/month' : 'Talk to sales'}</div>
                <ul className="space-y-2 mb-8">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink">
                      <Check size={14} className="text-success shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <a href="#"
                  className={cn('block text-center px-4 py-2.5 rounded-full text-sm font-semibold',
                    p.highlighted ? 'bg-primary text-on-primary' : 'border border-hairline text-ink')}>
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-primary text-on-primary">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">Start building today</h2>
          <p className="opacity-80 mb-8">Join 50,000+ developers shipping with Acme Cloud.</p>
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-on-primary text-primary font-semibold">
            Get started free <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  )
}
