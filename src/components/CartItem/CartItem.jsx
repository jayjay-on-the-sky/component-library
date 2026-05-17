import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus } from '../../lib/icons'
import { cn } from '../../lib/utils'

const CartItem = React.forwardRef(({
  image,
  name,
  variant,
  price,
  quantity: initialQty = 1,
  onQuantityChange,
  onRemove,
  className,
  ...props
}, ref) => {
  const [qty, setQty] = useState(initialQty)

  const setQuantity = (next) => {
    const val = Math.max(1, next)
    setQty(val)
    onQuantityChange?.(val)
  }

  return (
    <motion.div
      ref={ref}
      layout
      exit={{ opacity: 0, height: 0 }}
      className={cn('flex items-center gap-4 py-4', className)}
      {...props}
    >
      {/* Image */}
      <div className="w-16 h-16 rounded-[var(--radius-md)] bg-surface overflow-hidden shrink-0">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-surface" />
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ink truncate">{name}</p>
        {variant && <p className="text-xs text-muted mt-0.5">{variant}</p>}
        <p className="text-sm font-semibold text-ink mt-1">${(price * qty).toFixed(2)}</p>
      </div>

      {/* Qty */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => setQuantity(qty - 1)}
          aria-label="Decrease quantity"
          className="w-7 h-7 rounded-full border border-hairline flex items-center justify-center text-muted hover:border-ink hover:text-ink transition-colors"
        >
          <Minus size={12} />
        </button>
        <span className="w-5 text-center text-sm font-medium text-ink">{qty}</span>
        <button
          onClick={() => setQuantity(qty + 1)}
          aria-label="Increase quantity"
          className="w-7 h-7 rounded-full border border-hairline flex items-center justify-center text-muted hover:border-ink hover:text-ink transition-colors"
        >
          <Plus size={12} />
        </button>
      </div>

      {/* Remove */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={onRemove}
        aria-label="Remove item"
        className="text-muted hover:text-error transition-colors shrink-0"
      >
        <Trash2 size={15} />
      </motion.button>
    </motion.div>
  )
})

CartItem.displayName = 'CartItem'
export default CartItem
