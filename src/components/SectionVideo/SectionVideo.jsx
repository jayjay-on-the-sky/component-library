import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X } from '../../lib/icons'
import { cn } from '../../lib/utils'

const SectionVideo = ({
  eyebrow,
  title,
  subtitle,
  videoUrl,
  thumbnailUrl,
  className,
}) => {
  const [playing, setPlaying] = useState(false)

  return (
    <section className={cn('py-20 bg-surface', className)}>
      <div className="max-w-5xl mx-auto px-6">
        {(eyebrow || title || subtitle) && (
          <div className="text-center mb-10">
            {eyebrow && <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">{eyebrow}</p>}
            {title && <h2 className="text-3xl md:text-4xl font-bold text-ink">{title}</h2>}
            {subtitle && <p className="text-body mt-3 max-w-lg mx-auto">{subtitle}</p>}
          </div>
        )}

        {/* Video thumbnail */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[var(--radius-xl)] overflow-hidden aspect-video bg-ink cursor-pointer group shadow-2xl"
          onClick={() => setPlaying(true)}
        >
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt="Video thumbnail" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/40 transition-colors" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-full bg-canvas/90 backdrop-blur-sm flex items-center justify-center shadow-xl"
            >
              <Play size={24} className="text-ink ml-1" fill="currentColor" />
            </motion.div>
          </div>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {playing && videoUrl && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
                onClick={() => setPlaying(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                className="relative w-full max-w-4xl aspect-video rounded-[var(--radius-xl)] overflow-hidden bg-ink"
              >
                <iframe
                  src={videoUrl}
                  allow="autoplay; fullscreen"
                  className="w-full h-full"
                  title="Product video"
                />
                <button
                  onClick={() => setPlaying(false)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-ink/60 flex items-center justify-center text-white hover:bg-ink/80 transition-colors"
                >
                  <X size={16} />
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default SectionVideo
