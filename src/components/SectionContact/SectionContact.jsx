import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Loader2, Send } from '../../lib/icons'
import { cn } from '../../lib/utils'

const SectionContact = ({
  title = "Get in touch",
  subtitle = "Have a question or want to work together? Fill out the form and we'll get back to you within 24 hours.",
  email,
  phone,
  address,
  onSubmit,
  className,
}) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await onSubmit?.(form)
    setLoading(false)
    setSent(true)
  }

  return (
    <section className={cn('py-20 bg-surface', className)}>
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
        {/* Left */}
        <div>
          <h2 className="text-3xl font-bold text-ink mb-4">{title}</h2>
          <p className="text-body leading-relaxed">{subtitle}</p>

          <ul className="flex flex-col gap-4 mt-8">
            {email && (
              <li className="flex items-center gap-3 text-sm text-ink">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail size={15} />
                </div>
                {email}
              </li>
            )}
            {phone && (
              <li className="flex items-center gap-3 text-sm text-ink">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone size={15} />
                </div>
                {phone}
              </li>
            )}
            {address && (
              <li className="flex items-center gap-3 text-sm text-ink">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={15} />
                </div>
                {address}
              </li>
            )}
          </ul>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-canvas border border-hairline rounded-[var(--radius-xl)] p-6"
        >
          {sent ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center text-success mx-auto mb-4">
                <Send size={20} />
              </div>
              <h3 className="font-semibold text-ink">Message sent!</h3>
              <p className="text-sm text-muted mt-1">We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                  className="h-10 px-3 rounded-[var(--radius-md)] border border-hairline bg-canvas text-sm text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Jane Smith"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                  className="h-10 px-3 rounded-[var(--radius-md)] border border-hairline bg-canvas text-sm text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="jane@company.com"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  required
                  rows={4}
                  className="px-3 py-2.5 rounded-[var(--radius-md)] border border-hairline bg-canvas text-sm text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Tell us what you need…"
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="h-10 w-full rounded-[var(--radius-md)] bg-primary text-on-primary text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 size={15} className="animate-spin" />}
                {loading ? 'Sending…' : 'Send message'}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default SectionContact
