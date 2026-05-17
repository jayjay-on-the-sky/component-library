import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_CODE = `import { createAgent } from '@acme/ai'

const agent = createAgent({
  model: 'claude-sonnet-4-5',
  tools: [searchWeb, readFile, writeCode],
  memory: true,
})

// Run the agent with a task
const result = await agent.run({
  task: 'Analyze the codebase and suggest improvements',
  maxIterations: 10,
})

console.log(result.summary)
// → "Found 12 optimization opportunities..."`

const tokenize = (line) => {
  const tokens = []
  const patterns = [
    { re: /(\/\/.*$)/g, cls: 'text-[#8b949e]' },
    { re: /('.*?'|".*?"|`.*?`)/g, cls: 'text-[#a5d6ff]' },
    { re: /\b(import|from|const|await|async|true|false|return)\b/g, cls: 'text-[#ff7b72]' },
    { re: /\b(createAgent|createClient|run|log)\b/g, cls: 'text-[#d2a8ff]' },
    { re: /\b\d+\b/g, cls: 'text-[#79c0ff]' },
  ]
  return line
}

export default function SlideCode({
  title = 'Simple API. Powerful results.',
  subtitle = 'Five lines to production-ready AI.',
  code = DEFAULT_CODE,
  filename = 'agent.ts',
  highlights,
  className,
}) {
  const lines = code.split('\n')

  return (
    <div
      className={cn('relative bg-canvas overflow-hidden flex', className)}
      style={{ width: '100%', aspectRatio: '16/9' }}
    >
      {/* Left text panel */}
      <div className="w-2/5 flex flex-col justify-center p-12 border-r border-hairline">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-3xl font-black text-ink mb-3">{title}</h2>
          <p className="text-muted">{subtitle}</p>
          <div className="mt-6 space-y-2">
            {['Zero boilerplate', 'Type-safe by default', 'Works with any LLM'].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-2 text-sm text-ink">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {f}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right code panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1 flex flex-col bg-[#0d1117]"
      >
        {/* File tab */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-white/10">
          <div className="flex gap-1.5">
            {['#ff5f57', '#febc2e', '#28c840'].map(c => (
              <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <span className="text-xs text-white/40 ml-2">{filename}</span>
        </div>

        {/* Code */}
        <div className="flex-1 overflow-auto p-6 font-mono text-sm">
          {lines.map((line, i) => {
            const isHighlighted = highlights?.includes(i + 1)
            return (
              <div key={i} className={cn('flex gap-4 leading-7 rounded px-2',
                isHighlighted && 'bg-primary/10')}>
                <span className="text-white/20 select-none w-6 text-right shrink-0">{i + 1}</span>
                <span className={cn(
                  line.startsWith('//') || line.includes('→') ? 'text-[#8b949e]' :
                  line.includes("'") || line.includes('"') || line.includes('`') ? 'text-[#a5d6ff]' :
                  'text-[#e6edf3]'
                )}>{line || ' '}</span>
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
