import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * SectionTeam — team member grid with avatar, name, role, and social links.
 * members: [{ name, role, bio?, avatar?, links?: [{ icon, href, label }] }]
 */

function MemberCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-hairline bg-surface hover:shadow-md transition-shadow duration-200"
    >
      {/* Avatar */}
      <div className="relative">
        {member.avatar ? (
          <img
            src={member.avatar}
            alt={member.name}
            className="w-20 h-20 rounded-full object-cover ring-2 ring-hairline"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center ring-2 ring-hairline">
            <span className="text-2xl font-bold text-primary">{member.name.charAt(0)}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <p className="text-base font-semibold text-ink">{member.name}</p>
        <p className="text-sm text-primary font-medium mt-0.5">{member.role}</p>
        {member.bio && (
          <p className="text-xs text-ink-muted mt-2 leading-relaxed line-clamp-3">{member.bio}</p>
        )}
      </div>

      {/* Social links */}
      {member.links && member.links.length > 0 && (
        <div className="flex items-center gap-2">
          {member.links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              aria-label={link.label}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full text-ink-muted hover:text-ink hover:bg-surface-strong transition-colors"
            >
              {link.icon}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  )
}

const SectionTeam = forwardRef(function SectionTeam(
  {
    eyebrow,
    title = 'Meet the team',
    subtitle,
    members = [],
    columns = 4,
    className,
    ...props
  },
  ref
) {
  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section ref={ref} className={cn('py-24 px-6 bg-canvas', className)} {...props}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">{eyebrow}</span>
          )}
          <h2 className="text-4xl font-bold text-ink tracking-tight" style={{ letterSpacing: '-0.025em' }}>{title}</h2>
          {subtitle && <p className="mt-4 text-lg text-ink-muted leading-relaxed">{subtitle}</p>}
        </motion.div>

        <div className={cn('grid grid-cols-1 gap-5', gridCols[columns])}>
          {members.map((member, i) => (
            <MemberCard key={i} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
})

export default SectionTeam
