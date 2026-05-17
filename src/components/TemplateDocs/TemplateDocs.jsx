import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronRight, ExternalLink, BookOpen, Code2, Zap } from '../../lib/icons'
import { cn } from '../../lib/utils'

const nav = [
  { section: 'Getting Started', items: ['Introduction', 'Quick Start', 'Installation', 'Configuration'] },
  { section: 'Core Concepts', items: ['Architecture', 'Authentication', 'Data Models', 'Events'] },
  { section: 'API Reference', items: ['REST API', 'GraphQL', 'WebSockets', 'Webhooks'] },
  { section: 'Guides', items: ['Deployment', 'Scaling', 'Monitoring', 'Migration'] },
]

const codeSnippet = `import { createClient } from '@acme/sdk'

const client = createClient({
  apiKey: process.env.ACME_API_KEY,
  region: 'us-east-1',
})

// Fetch data with type safety
const data = await client.query({
  collection: 'users',
  filter: { active: true },
  limit: 100,
})`

export default function TemplateDocs({ className }) {
  const [active, setActive] = useState('Quick Start')

  return (
    <div className={cn('flex h-screen bg-canvas overflow-hidden', className)}>
      {/* Left sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-hairline flex flex-col bg-surface">
        <div className="p-4 border-b border-hairline">
          <div className="font-black text-ink mb-3">Acme Docs</div>
          <div className="flex items-center gap-2 bg-canvas border border-hairline rounded-lg px-3 py-2">
            <Search size={13} className="text-muted" />
            <input placeholder="Search..." className="flex-1 text-xs bg-transparent text-ink outline-none placeholder:text-muted" />
            <kbd className="text-[10px] text-muted border border-hairline rounded px-1">⌘K</kbd>
          </div>
        </div>
        <nav className="flex-1 overflow-auto p-3">
          {nav.map(({ section, items }) => (
            <div key={section} className="mb-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted px-2 mb-1">{section}</div>
              {items.map(item => (
                <button key={item} onClick={() => setActive(item)}
                  className={cn('w-full text-left text-xs px-3 py-2 rounded-lg transition-colors',
                    active === item ? 'bg-primary/10 text-primary font-semibold' : 'text-muted hover:text-ink hover:bg-canvas')}>
                  {item}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto px-8 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-xs text-muted mb-6">
            <span>Docs</span><ChevronRight size={12} /><span>Getting Started</span><ChevronRight size={12} />
            <span className="text-ink font-medium">{active}</span>
          </div>

          {/* Title */}
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-black text-ink mb-4">{active}</h1>
            <p className="text-muted text-lg mb-8">Get up and running in minutes with our simple integration.</p>

            {/* Info cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: BookOpen, label: '5 min read' },
                { icon: Code2, label: 'Code examples' },
                { icon: Zap, label: 'Interactive' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 rounded-lg border border-hairline p-3 bg-surface text-sm text-muted">
                  <Icon size={14} className="text-primary" /> {label}
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="prose max-w-none text-ink">
              <h2 className="text-xl font-bold mb-3">Prerequisites</h2>
              <p className="text-muted mb-6">Before you begin, make sure you have Node.js 18+ installed and an Acme account.</p>

              <h2 className="text-xl font-bold mb-3">Installation</h2>
              <div className="bg-[#0d1117] rounded-xl p-4 mb-6 font-mono text-sm text-[#e6edf3]">
                <div className="text-[#8b949e] mb-2"># Install the SDK</div>
                <div>npm install @acme/sdk</div>
              </div>

              <h2 className="text-xl font-bold mb-3">Quick example</h2>
              <div className="bg-[#0d1117] rounded-xl p-4 mb-6 font-mono text-sm text-[#e6edf3] overflow-auto">
                <pre className="text-xs leading-relaxed">{codeSnippet}</pre>
              </div>

              <div className="flex items-center gap-2 p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm text-ink">
                <span className="text-primary font-semibold">💡 Tip:</span>
                Use environment variables to keep your API keys secure.
              </div>
            </div>
          </motion.div>

          {/* Prev / Next */}
          <div className="flex items-center justify-between mt-16 pt-8 border-t border-hairline">
            <a href="#" className="flex items-center gap-2 text-sm text-muted hover:text-ink">← Introduction</a>
            <a href="#" className="flex items-center gap-2 text-sm text-muted hover:text-ink">Installation →</a>
          </div>
        </div>
      </div>

      {/* Right TOC */}
      <div className="hidden xl:block w-52 flex-shrink-0 border-l border-hairline p-6">
        <div className="text-xs font-bold uppercase tracking-widest text-muted mb-4">On this page</div>
        <div className="space-y-2">
          {['Prerequisites', 'Installation', 'Quick example', 'Next steps'].map(h => (
            <a key={h} href="#" className="block text-xs text-muted hover:text-ink transition-colors">{h}</a>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-hairline">
          <a href="#" className="flex items-center gap-1 text-xs text-muted hover:text-ink">
            <ExternalLink size={11} /> Edit on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
