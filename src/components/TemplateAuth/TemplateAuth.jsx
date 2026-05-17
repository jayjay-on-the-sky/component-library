import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Github, Chrome } from '../../lib/icons'
import { cn } from '../../lib/utils'

export default function TemplateAuth({
  mode = 'login', // login | signup
  className,
}) {
  const [showPass, setShowPass] = useState(false)
  const isLogin = mode === 'login'

  return (
    <div className={cn('min-h-screen grid md:grid-cols-2 bg-canvas', className)}>
      {/* Left — brand panel */}
      <div className="hidden md:flex flex-col bg-ink text-canvas p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 30% 70%, rgba(99,102,241,0.3), transparent 70%)' }} />

        <div className="relative font-bold text-xl">Acme</div>

        <div className="relative flex-1 flex flex-col justify-center">
          <blockquote className="text-3xl font-black leading-tight mb-6">
            "The best development experience we've ever had."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20" />
            <div>
              <div className="font-semibold text-sm">Sarah Chen</div>
              <div className="text-xs text-white/50">CTO at Fintech Co.</div>
            </div>
          </div>
        </div>

        <div className="relative text-xs text-white/30">© 2026 Acme Inc.</div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-ink mb-2">{isLogin ? 'Welcome back' : 'Create account'}</h1>
            <p className="text-sm text-muted">{isLogin ? "Don't have an account? " : 'Already have an account? '}
              <a href="#" className="text-primary font-medium">{isLogin ? 'Sign up' : 'Sign in'}</a>
            </p>
          </div>

          {/* OAuth */}
          <div className="flex flex-col gap-2 mb-6">
            {[
              { icon: Github, label: 'Continue with GitHub' },
              { icon: Chrome, label: 'Continue with Google' },
            ].map(({ icon: Icon, label }) => (
              <button key={label}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-hairline bg-surface text-sm font-medium text-ink hover:bg-canvas transition-colors">
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-hairline" />
            <span className="text-xs text-muted">or continue with email</span>
            <div className="flex-1 h-px bg-hairline" />
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            {!isLogin && (
              <div>
                <label className="block text-xs font-medium text-ink mb-1.5">Full name</label>
                <input type="text" placeholder="Jane Smith"
                  className="w-full px-3 py-2.5 rounded-xl border border-hairline bg-surface text-sm text-ink outline-none focus:border-primary transition-colors" />
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-ink mb-1.5">Email</label>
              <input type="email" placeholder="jane@company.com"
                className="w-full px-3 py-2.5 rounded-xl border border-hairline bg-surface text-sm text-ink outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-ink">Password</label>
                {isLogin && <a href="#" className="text-xs text-primary">Forgot password?</a>}
              </div>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} placeholder="••••••••"
                  className="w-full px-3 py-2.5 pr-10 rounded-xl border border-hairline bg-surface text-sm text-ink outline-none focus:border-primary transition-colors" />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                  onClick={() => setShowPass(v => !v)}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <motion.button type="submit" whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl bg-primary text-on-primary font-semibold text-sm">
              {isLogin ? 'Sign in' : 'Create account'}
            </motion.button>
          </form>

          {!isLogin && (
            <p className="text-xs text-muted text-center mt-4">
              By creating an account you agree to our <a href="#" className="text-primary">Terms</a> and <a href="#" className="text-primary">Privacy</a>.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
