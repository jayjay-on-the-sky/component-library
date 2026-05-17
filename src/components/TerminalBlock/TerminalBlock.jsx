import { useState, useEffect, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

const TerminalBlock = forwardRef(function TerminalBlock({
  lines = [
    '$ npm install @acme/ui',
    '✓ Resolved 42 packages',
    '✓ Fetched 42 packages',
    '✓ Linked 42 packages',
    '',
    '$ npm run dev',
    '',
    '  ▲ Next.js 15.2.1',
    '  - Local: http://localhost:3000',
    '  ✓ Ready in 842ms',
  ],
  title = 'Terminal',
  speed = 40,
  loop = false,
  className,
  ...props
}, ref) {
  const [displayed, setDisplayed] = useState([])
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    if (lineIdx >= lines.length) {
      if (loop) {
        const t = setTimeout(() => {
          setDisplayed([])
          setLineIdx(0)
          setCharIdx(0)
        }, 2000)
        return () => clearTimeout(t)
      }
      return
    }

    const currentLine = lines[lineIdx]

    if (charIdx <= currentLine.length) {
      const t = setTimeout(() => {
        if (charIdx === 0 && displayed.length <= lineIdx) {
          setDisplayed(prev => [...prev, ''])
        }
        setDisplayed(prev => {
          const next = [...prev]
          next[lineIdx] = currentLine.slice(0, charIdx)
          return next
        })
        setCharIdx(c => c + 1)
      }, currentLine === '' ? 50 : speed)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setLineIdx(l => l + 1)
        setCharIdx(0)
      }, currentLine === '' ? 20 : 100)
      return () => clearTimeout(t)
    }
  }, [lineIdx, charIdx, lines, speed, loop, displayed.length])

  const isTyping = lineIdx < lines.length

  return (
    <div
      ref={ref}
      className={cn('rounded-xl overflow-hidden font-mono text-sm shadow-2xl', className)}
      {...props}
    >
      {/* Title bar */}
      <div className="bg-[#1e1e1e] px-4 py-3 flex items-center gap-2 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 text-center text-xs text-white/40">{title}</div>
      </div>

      {/* Content */}
      <div className="bg-[#0d1117] text-[#e6edf3] p-4 min-h-[160px]">
        {displayed.map((line, i) => {
          const isCmd = line.startsWith('$')
          const isSuccess = line.startsWith('✓') || line.startsWith('  ✓')
          const isInfo = line.startsWith('  ▲') || line.startsWith('  -')

          return (
            <div key={i} className={cn(
              'leading-6',
              isCmd && 'text-[#79c0ff]',
              isSuccess && 'text-[#3fb950]',
              isInfo && 'text-[#8b949e]',
            )}>
              {line}
              {i === lineIdx && isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-[#e6edf3] ml-0.5 align-middle"
                />
              )}
            </div>
          )
        })}
        {!isTyping && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-[#e6edf3] align-middle"
          />
        )}
      </div>
    </div>
  )
})

export default TerminalBlock
