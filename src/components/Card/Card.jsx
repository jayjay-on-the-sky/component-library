import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

function Card({ children, hover = false, className, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: '0 8px 24px color-mix(in srgb, var(--color-ink) 8%, transparent)' } : {}}
      transition={{ duration: 0.15 }}
      className={cn(
        'bg-canvas border border-hairline rounded-[var(--radius-lg)] overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

function Header({ children, className }) {
  return (
    <div className={cn('px-5 pt-5 pb-3', className)}>
      {children}
    </div>
  )
}

function Body({ children, className }) {
  return (
    <div className={cn('px-5 py-3 text-sm text-body leading-relaxed', className)}>
      {children}
    </div>
  )
}

function Footer({ children, className }) {
  return (
    <div className={cn('px-5 py-3 border-t border-hairline bg-surface/50 flex items-center gap-3', className)}>
      {children}
    </div>
  )
}

function Image({ src, alt, aspectRatio = '16/9' }) {
  return (
    <div className="overflow-hidden" style={{ aspectRatio }}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  )
}

Card.Header = Header
Card.Body = Body
Card.Footer = Footer
Card.Image = Image

// ── Demo renders (used by meta variants) ──────────────────────

export function CardBasicDemo() {
  return (
    <Card className="w-72">
      <Card.Header>
        <h3 className="text-sm font-semibold text-ink">Card Title</h3>
        <p className="text-xs text-muted mt-0.5">Card subtitle or metadata</p>
      </Card.Header>
      <Card.Body>
        This is the card body. It holds the main content and adapts to
        whatever you put inside it.
      </Card.Body>
      <Card.Footer>
        <span className="text-xs text-muted flex-1">Updated just now</span>
        <button className="text-xs font-medium text-primary">View →</button>
      </Card.Footer>
    </Card>
  )
}

export function CardHoverDemo() {
  return (
    <Card hover className="w-72">
      <Card.Header>
        <h3 className="text-sm font-semibold text-ink">Hoverable Card</h3>
      </Card.Header>
      <Card.Body>Hover over me to see the lift effect.</Card.Body>
    </Card>
  )
}

export function CardImageDemo() {
  return (
    <Card className="w-72">
      <Card.Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
        alt="Mountain landscape"
      />
      <Card.Header>
        <h3 className="text-sm font-semibold text-ink">Mountain Vista</h3>
      </Card.Header>
      <Card.Body>A card with a full-bleed image at the top.</Card.Body>
    </Card>
  )
}

export default Card
