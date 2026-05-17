import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star, ArrowRight, Search } from '../../lib/icons'
import { cn } from '../../lib/utils'

const products = [
  { name: 'Arc Desk Lamp', price: '$189', badge: 'New', rating: 4.8, reviews: 234 },
  { name: 'Merino Hoodie', price: '$149', badge: 'Best Seller', rating: 4.9, reviews: 1820 },
  { name: 'Ceramic Mug Set', price: '$64', badge: null, rating: 4.7, reviews: 456 },
  { name: 'Linen Tote', price: '$89', badge: 'Low Stock', rating: 4.6, reviews: 189 },
  { name: 'Walnut Tray', price: '$124', badge: null, rating: 4.8, reviews: 312 },
  { name: 'Cashmere Throw', price: '$299', badge: 'Sale', rating: 4.9, reviews: 678 },
]

const categories = ['All', 'Home', 'Clothing', 'Accessories', 'Kitchen']

export default function TemplateEcommerce({ className }) {
  return (
    <div className={cn('min-h-screen bg-canvas', className)}>
      {/* Nav */}
      <nav className="border-b border-hairline sticky top-0 bg-canvas/90 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="font-black text-ink text-lg">Calm</div>
          <div className="flex items-center gap-2 bg-surface border border-hairline rounded-full px-4 py-2 w-56">
            <Search size={13} className="text-muted" />
            <span className="text-sm text-muted">Search products...</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted hover:text-ink">Account</a>
            <a href="#" className="relative text-ink">
              <ShoppingCart size={20} />
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-on-primary text-[9px] font-bold flex items-center justify-center">3</div>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero banner */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-gradient-to-r from-primary/10 to-surface border border-hairline p-12 flex items-center justify-between overflow-hidden relative">
          <div>
            <div className="text-sm font-medium text-primary mb-2">New Arrivals</div>
            <h1 className="text-4xl font-black text-ink mb-4">Spring Collection<br /><span className="text-muted">2026</span></h1>
            <p className="text-muted mb-6 max-w-md">Thoughtfully designed objects for the way you live. Sustainable materials, timeless forms.</p>
            <a href="#" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary text-sm font-semibold w-fit">
              Shop now <ArrowRight size={14} />
            </a>
          </div>
          <div className="hidden md:block text-[120px] opacity-10 font-black">🌿</div>
        </motion.div>
      </section>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-6 pb-6 flex gap-2 overflow-auto">
        {categories.map((c, i) => (
          <button key={c} className={cn('px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap',
            i === 0 ? 'bg-primary text-on-primary' : 'bg-surface border border-hairline text-muted hover:text-ink')}>
            {c}
          </button>
        ))}
      </div>

      {/* Products */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {products.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="group cursor-pointer">
              <div className="relative aspect-square rounded-2xl bg-surface overflow-hidden mb-3">
                <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">📦</div>
                {p.badge && (
                  <div className={cn('absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white',
                    p.badge === 'Sale' ? 'bg-error' : p.badge === 'Low Stock' ? 'bg-warning' : 'bg-primary')}>
                    {p.badge}
                  </div>
                )}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-canvas/80 backdrop-blur-sm flex items-center justify-center text-muted hover:text-error transition-colors">
                  <Heart size={14} />
                </button>
                <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full py-2 rounded-xl bg-ink text-canvas text-xs font-semibold flex items-center justify-center gap-2">
                    <ShoppingCart size={13} /> Add to cart
                  </button>
                </div>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-semibold text-ink">{p.name}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={11} className="text-warning fill-warning" />
                    <span className="text-xs text-muted">{p.rating} ({p.reviews})</span>
                  </div>
                </div>
                <div className="text-sm font-bold text-ink">{p.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
