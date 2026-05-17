import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock } from '../../lib/icons'
import { cn } from '../../lib/utils'

const PostCard = ({ title, excerpt, category, date, readTime, author, image, href, featured, i }) => (
  <motion.article
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.06 }}
    className={cn(
      'group bg-canvas border border-hairline rounded-[var(--radius-xl)] overflow-hidden hover:border-primary/30 transition-colors',
      featured && 'md:col-span-2'
    )}
  >
    {image && (
      <div className={cn('overflow-hidden bg-surface', featured ? 'h-56' : 'h-40')}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    )}
    <div className="p-6">
      {category && (
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">{category}</span>
      )}
      <h3 className={cn('font-bold text-ink mt-2 group-hover:text-primary transition-colors', featured ? 'text-xl' : 'text-base')}>
        {title}
      </h3>
      {excerpt && <p className="text-sm text-body mt-2 line-clamp-3">{excerpt}</p>}

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3 text-xs text-muted">
          {date && (
            <span className="flex items-center gap-1"><Calendar size={11} />{date}</span>
          )}
          {readTime && (
            <span className="flex items-center gap-1"><Clock size={11} />{readTime}</span>
          )}
        </div>
        <a href={href || '#'} className="flex items-center gap-1 text-xs font-medium text-primary hover:gap-2 transition-all">
          Read <ArrowRight size={13} />
        </a>
      </div>
    </div>
  </motion.article>
)

const SectionBlog = ({
  eyebrow = 'Blog',
  title = 'Latest articles',
  subtitle,
  posts = [],
  className,
}) => (
  <section className={cn('py-20 bg-canvas', className)}>
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex items-end justify-between mb-12">
        <div>
          {eyebrow && <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">{eyebrow}</p>}
          <h2 className="text-3xl font-bold text-ink">{title}</h2>
          {subtitle && <p className="text-body mt-2">{subtitle}</p>}
        </div>
        <a href="#" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-3 transition-all">
          View all <ArrowRight size={15} />
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <PostCard key={i} {...post} i={i} />
        ))}
      </div>
    </div>
  </section>
)

export default SectionBlog
