import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Minimal syntax highlighter — applies token classes via regex substitution.
 * No external dep; good enough for JSX display.
 */
function highlight(code) {
  return code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // strings
    .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
      '<span class="token-string">$1</span>')
    // comments
    .replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
      '<span class="token-comment">$1</span>')
    // keywords
    .replace(/\b(import|export|default|from|const|let|var|function|return|if|else|for|while|class|new|typeof|instanceof|null|undefined|true|false|async|await)\b/g,
      '<span class="token-keyword">$1</span>')
    // JSX tags
    .replace(/&lt;(\/?[\w.]+)/g, '&lt;<span class="token-tag">$1</span>')
    // numbers
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="token-number">$1</span>')
}

export default function CodePanel({ source, componentName }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(source)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] font-mono text-xs">
      {/* Code header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 shrink-0">
        <span className="text-[11px] text-white/40">{componentName}.jsx</span>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded bg-white/5 text-white/50 hover:text-white/80 hover:bg-white/10 transition-colors"
        >
          {copied ? (
            <>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1.5 5.5l3 3 5-5.5" stroke="#4ade80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <rect x="3.5" y="1" width="6.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M1 3.5v6.5h6.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Copy
            </>
          )}
        </motion.button>
      </div>

      {/* Code body */}
      <div className="flex-1 overflow-auto p-4">
        <pre
          className="text-[12px] leading-relaxed text-[#d4d4d4] whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: highlight(source) }}
        />
      </div>
    </div>
  )
}
