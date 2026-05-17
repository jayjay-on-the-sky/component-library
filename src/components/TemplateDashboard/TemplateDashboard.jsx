import { motion } from 'framer-motion'
import { BarChart2, Users, DollarSign, TrendingUp, Home, Settings, Bell, Search, MoreHorizontal } from '../../lib/icons'
import { cn } from '../../lib/utils'

const metrics = [
  { label: 'Total Revenue', value: '$84,230', change: '+12.5%', positive: true, icon: DollarSign },
  { label: 'Active Users', value: '12,840', change: '+8.2%', positive: true, icon: Users },
  { label: 'Conversion', value: '3.24%', change: '-0.4%', positive: false, icon: TrendingUp },
  { label: 'Avg. Session', value: '4m 32s', change: '+22s', positive: true, icon: BarChart2 },
]

const rows = [
  { name: 'Acme Corp', plan: 'Enterprise', mrr: '$12,000', status: 'Active' },
  { name: 'Globex Inc', plan: 'Pro', mrr: '$490', status: 'Active' },
  { name: 'Initech Ltd', plan: 'Pro', mrr: '$490', status: 'Churned' },
  { name: 'Umbrella Co', plan: 'Enterprise', mrr: '$8,500', status: 'Active' },
  { name: 'Stark Industries', plan: 'Starter', mrr: '$0', status: 'Trial' },
]

const navItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: Users, label: 'Customers' },
  { icon: DollarSign, label: 'Revenue' },
  { icon: BarChart2, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
]

export default function TemplateDashboard({ className }) {
  return (
    <div className={cn('flex h-screen bg-surface overflow-hidden text-ink', className)}>
      {/* Sidebar */}
      <div className="w-56 flex-shrink-0 bg-canvas border-r border-hairline flex flex-col py-4">
        <div className="px-4 mb-6 font-black text-lg text-ink">Acme</div>
        <nav className="flex-1 px-2 space-y-0.5">
          {navItems.map(({ icon: Icon, label, active }) => (
            <div key={label}
              className={cn('flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors',
                active ? 'bg-primary/10 text-primary' : 'text-muted hover:bg-surface hover:text-ink')}>
              <Icon size={16} /> {label}
            </div>
          ))}
        </nav>
        <div className="px-4 pt-4 border-t border-hairline">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">JD</div>
            <div>
              <div className="text-xs font-semibold text-ink">Jane Doe</div>
              <div className="text-[10px] text-muted">Admin</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="h-14 border-b border-hairline bg-canvas flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2 bg-surface rounded-lg px-3 py-1.5 text-sm text-muted w-56">
            <Search size={14} /> Search...
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-muted hover:text-ink">
              <Bell size={18} />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-error" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">JD</div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-xl font-black text-ink">Good morning, Jane</h1>
            <p className="text-sm text-muted">Here's what's happening with your business today.</p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-canvas rounded-xl border border-hairline p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-muted">{m.label}</span>
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <m.icon size={14} />
                  </div>
                </div>
                <div className="text-xl font-black text-ink">{m.value}</div>
                <div className={cn('text-xs font-medium mt-1', m.positive ? 'text-success' : 'text-error')}>
                  {m.change} vs last month
                </div>
              </motion.div>
            ))}
          </div>

          {/* Minibar charts row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-canvas rounded-xl border border-hairline p-5">
              <div className="text-sm font-semibold text-ink mb-4">Revenue (30d)</div>
              <div className="flex items-end gap-1 h-20">
                {[40,65,55,80,70,90,75,95,85,100,88,96].map((h, i) => (
                  <motion.div key={i} className="flex-1 rounded-t-sm bg-primary/70"
                    style={{ height: `${h}%` }}
                    initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                    transition={{ delay: i * 0.04, ease: [0.16,1,0.3,1] }}
                  />
                ))}
              </div>
            </div>
            <div className="bg-canvas rounded-xl border border-hairline p-5">
              <div className="text-sm font-semibold text-ink mb-4">User signups (30d)</div>
              <div className="flex items-end gap-1 h-20">
                {[30,45,38,60,52,75,66,82,74,90,81,95].map((h, i) => (
                  <motion.div key={i} className="flex-1 rounded-t-sm bg-success/70"
                    style={{ height: `${h}%` }}
                    initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                    transition={{ delay: i * 0.04, ease: [0.16,1,0.3,1] }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-canvas rounded-xl border border-hairline overflow-hidden">
            <div className="px-5 py-4 border-b border-hairline flex items-center justify-between">
              <div className="text-sm font-semibold text-ink">Recent Customers</div>
              <button className="text-muted hover:text-ink"><MoreHorizontal size={16} /></button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-hairline">
                  {['Customer', 'Plan', 'MRR', 'Status'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-medium text-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-hairline last:border-0 hover:bg-surface transition-colors">
                    <td className="px-5 py-3 font-medium text-ink">{r.name}</td>
                    <td className="px-5 py-3 text-muted">{r.plan}</td>
                    <td className="px-5 py-3 font-semibold text-ink">{r.mrr}</td>
                    <td className="px-5 py-3">
                      <span className={cn('px-2 py-0.5 rounded-full text-xs font-semibold',
                        r.status === 'Active' ? 'bg-success/10 text-success' :
                        r.status === 'Churned' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning')}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
