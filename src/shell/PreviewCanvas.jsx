import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'
import CodePanel from './CodePanel'
import ExportPanel from './ExportPanel'

export default function PreviewCanvas({ component, theme }) {
  const [activeVariant, setActiveVariant] = useState(0)
  const [showCode, setShowCode] = useState(false)
  const previewRef = useRef(null)

  if (!component) {
    return (
      <div className="flex-1 flex items-center justify-center text-shell-text-muted text-sm">
        Select a component from the sidebar
      </div>
    )
  }

  const variant = component.variants?.[activeVariant] ?? { label: 'Default', props: {} }
  const { Component } = component

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Canvas header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-shell-border bg-shell-bg shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-shell-text">{component.name}</h2>
          <p className="text-xs text-shell-text-muted hidden md:block">{component.description}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Variant tabs */}
          {component.variants?.length > 1 && (
            <div className="flex items-center gap-1 bg-shell-surface border border-shell-border rounded-md p-0.5">
              {component.variants.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setActiveVariant(i)}
                  className={cn(
                    'px-2.5 py-1 text-xs rounded transition-colors',
                    i === activeVariant
                      ? 'bg-shell-bg text-shell-text shadow-sm'
                      : 'text-shell-text-muted hover:text-shell-text'
                  )}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}

          {/* Code toggle */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowCode(v => !v)}
            className={cn(
              'px-2.5 py-1.5 text-xs rounded-md transition-colors',
              showCode
                ? 'bg-shell-surface text-shell-text border border-shell-border'
                : 'text-shell-text-muted hover:text-shell-text hover:bg-shell-surface'
            )}
          >
            {'</>'}
          </motion.button>

          {/* Export */}
          <ExportPanel previewRef={previewRef} componentName={component.name} />
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div
          ref={previewRef}
          className="preview-grid flex-1 flex items-center justify-center p-12 overflow-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${component.id}-${activeVariant}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.15 }}
            >
              {/* Variant can supply its own Component (demo wrapper) or use the default */}
              {(() => {
                const RenderComponent = variant.Component ?? Component
                return RenderComponent ? (
                  <RenderComponent {...(variant.props ?? {})} />
                ) : (
                  <div className="text-sm text-shell-text-muted italic">
                    Component could not be loaded
                  </div>
                )
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Code panel */}
        <AnimatePresence>
          {showCode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 280, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-shell-border"
            >
              <CodePanel source={component.source} componentName={component.name} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
