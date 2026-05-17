import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Terminal } from '../../lib/icons'
import { cn } from '../../lib/utils'

const CodeBlock = React.forwardRef(({
  code = '',
  language = 'js',
  filename,
  showLineNumbers = false,
  copyable = true,
  className,
  ...props
}, ref) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.trim().split('\n')

  return (
    <div
      ref={ref}
      className={cn('rounded-[var(--radius-xl)] border border-hairline overflow-hidden bg-shell-bg', className)}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-shell-border bg-shell-surface">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-error opacity-70" />
            <div className="w-3 h-3 rounded-full bg-warning opacity-70" />
            <div className="w-3 h-3 rounded-full bg-success opacity-70" />
          </div>
          {filename ? (
            <span className="text-xs text-shell-text-muted font-mono ml-2">{filename}</span>
          ) : (
            <Terminal size={12} className="text-shell-text-muted ml-2" />
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-shell-text-muted font-mono uppercase">{language}</span>
          {copyable && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              aria-label="Copy code"
              className="text-shell-text-muted hover:text-shell-text transition-colors"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span key="check" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
                    <Check size={14} className="text-success" />
                  </motion.span>
                ) : (
                  <motion.span key="copy" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
                    <Copy size={14} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="px-4 py-4 text-sm text-shell-text font-mono leading-relaxed">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <span className="select-none w-8 shrink-0 text-shell-text-muted text-right mr-4">
                  {i + 1}
                </span>
              )}
              <code>{line || ' '}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
})

CodeBlock.displayName = 'CodeBlock'
export default CodeBlock
