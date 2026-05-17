import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star } from '../../lib/icons'
import { cn } from '../../lib/utils'

const ProductCard = React.forwardRef(({
  image,
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  badge,
  onAddToCart,
  onWishlist,
  className,
  ...props
}, ref) => {
  const [wishlisted, setWishlisted] = useState(false)
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : null

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -2 }}
      className={cn(
        'group bg-canvas border border-hairline rounded-[var(--radius-xl)] overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Image */}
      <div className="relative aspect-square bg-surface overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted">
            <ShoppingCart size={32} />
          </div>
        )}

        {/* Badge */}
        {badge && (
          <span className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full bg-primary text-on-primary">
            {badge}
          </span>
        )}
        {discount && !badge && (
          <span className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full bg-error text-white">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => { setWishlisted(w => !w); onWishlist?.(!wishlisted) }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={cn(
            'absolute top-3 right-3 w-8 h-8 rounded-full bg-canvas/80 backdrop-blur-sm flex items-center justify-center transition-colors',
            wishlisted ? 'text-error' : 'text-muted hover:text-error'
          )}
        >
          <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
        </motion.button>

        {/* Quick add (hover reveal) */}
        <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onAddToCart}
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-on-primary text-sm font-semibold"
          >
            <ShoppingCart size={15} />
            Add to cart
          </motion.button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-ink leading-snug line-clamp-2">{name}</h3>

        {rating !== undefined && (
          <div className="flex items-center gap-1 mt-1.5">
            <Star size={12} fill="currentColor" className="text-warning" />
            <span className="text-xs font-medium text-ink">{rating}</span>
            {reviewCount && <span className="text-xs text-muted">({reviewCount})</span>}
          </div>
        )}

        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-base font-bold text-ink">${price}</span>
          {originalPrice && (
            <span className="text-sm text-muted line-through">${originalPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
})

ProductCard.displayName = 'ProductCard'
export default ProductCard
