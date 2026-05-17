import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from '../../lib/icons'
import { cn } from '../../lib/utils'

const plans = [
  {
    name: 'Free', monthly: 0, annual: 0, color: 'border-hairline',
    features: { 'Projects': '3', 'Storage': '1 GB', 'Team members': '1', 'Analytics': false, 'Custom domain': false, 'Priority support': false, 'SSO': false },
  },
  {
    name: 'Pro', monthly: 49, annual: 39, color: 'border-primary', popular: true,
    features: { 'Projects': 'Unlimited', 'Storage': '100 GB', 'Team members': '10', 'Analytics': true, 'Custom domain': true, 'Priority support': true, 'SSO': false },
  },
  {
    name: 'Enterprise', monthly: null, annual: null, color: 'border-hairline',
    features: { 'Projects': 'Unlimited', 'Storage': 'Unlimited', 'Team members': 'Unlimited', 'Analytics': true, 'Custom domain': true, 'Priority support': true, 'SSO': true },
  },
]

const featureKeys = ['Projects', 'Storage', 'Team members', 'Analytics', 'Custom domain', 'Priority support', 'SSO']

const faqs = [
  { q: 'Can I change plans later?', a: 'Yes, upgrade or downgrade at any time. Changes take effect immediately.' },
  { q: 'Is there a free trial?', a: 'Pro comes with a 14-day free trial. No credit card required.' },
  { q: 'What payment methods do you accept?', a: 'All major credit cards, ACH, and wire transfer for Enterprise.' },
  { q: 'Can I cancel anytime?', a: 'Absolutely. Cancel at any time, no questions asked.' },
]

export default function TemplatePricing({ className }) {
  const [annual, setAnnual] = useState(true)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className={cn('min-h-screen bg-canvas', className)}>
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-ink mb-4">Simple, transparent pricing</h1>
          <p className="text-muted mb-8">No hidden fees. No surprises. Start free.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3">
            <span className={cn('text-sm font-medium', !annual ? 'text-ink' : 'text-muted')}>Monthly</span>
            <button
              onClick={() => setAnnual(a => !a)}
              className={cn('relative w-12 h-6 rounded-full transition-colors', annual ? 'bg-primary' : 'bg-surface-strong')}
            >
              <motion.div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow"
                animate={{ x: annual ? 24 : 0 }} />
            </button>
            <span className={cn('text-sm font-medium', annual ? 'text-ink' : 'text-muted')}>
              Annual <span className="text-xs text-success font-semibold ml-1">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {plans.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn('rounded-2xl border-2 p-6 relative', p.color, p.popular && 'bg-primary/5')}>
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-semibold">
                  Most popular
                </div>
              )}
              <div className="text-sm font-semibold text-muted mb-1">{p.name}</div>
              <div className="mb-6">
                {p.monthly === null ? (
                  <div className="text-4xl font-black text-ink">Custom</div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-ink">${annual ? p.annual : p.monthly}</span>
                    <span className="text-muted text-sm">/mo</span>
                  </div>
                )}
              </div>
              <a href="#"
                className={cn('block text-center py-2.5 rounded-xl text-sm font-semibold mb-6',
                  p.popular ? 'bg-primary text-on-primary' : 'border border-hairline text-ink')}>
                {p.name === 'Free' ? 'Start free' : p.name === 'Enterprise' ? 'Contact sales' : 'Get started'}
              </a>
              <ul className="space-y-2.5">
                {featureKeys.map(k => {
                  const val = p.features[k]
                  return (
                    <li key={k} className="flex items-center gap-2.5 text-sm">
                      {val === true ? <Check size={14} className="text-success shrink-0" /> :
                        val === false ? <X size={14} className="text-muted shrink-0" /> :
                          <Check size={14} className="text-success shrink-0" />}
                      <span className={val === false ? 'text-muted' : 'text-ink'}>
                        {typeof val === 'string' ? `${k}: ${val}` : k}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-ink mb-8 text-center">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="border border-hairline rounded-xl overflow-hidden">
                <button className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-ink text-left"
                  onClick={() => setOpenFaq(o => o === i ? null : i)}>
                  {f.q}
                  <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} className="text-muted">↓</motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0 }}
                  className="overflow-hidden">
                  <div className="px-5 pb-4 text-sm text-muted">{f.a}</div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
