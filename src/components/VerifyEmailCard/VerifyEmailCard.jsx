import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, RefreshCw, ArrowLeft } from '../../lib/icons'
import { cn } from '../../lib/utils'
import OTPInput from '../OTPInput/OTPInput'

const VerifyEmailCard = React.forwardRef(({
  email = 'you@example.com',
  onVerify,
  onResend,
  onBack,
  loading = false,
  error,
  className,
  ...props
}, ref) => {
  const [code, setCode] = useState('')
  const [resent, setResent] = useState(false)

  const handleResend = async () => {
    await onResend?.()
    setResent(true)
    setTimeout(() => setResent(false), 5000)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('w-full max-w-sm bg-canvas border border-hairline rounded-[var(--radius-xl)] p-8 shadow-sm', className)}
      {...props}
    >
      {onBack && (
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors mb-6">
          <ArrowLeft size={14} /> Back
        </button>
      )}

      <div className="flex justify-center mb-5">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Mail size={26} />
        </div>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-ink mb-1">Check your email</h1>
        <p className="text-sm text-muted">
          We sent a 6-digit code to <strong className="text-ink font-medium">{email}</strong>
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <OTPInput length={6} value={code} onChange={setCode} error={!!error} />

        {error && (
          <p className="text-xs text-error">{error}</p>
        )}

        {resent && (
          <p className="text-xs text-success">Code resent! Check your inbox.</p>
        )}

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onVerify?.(code)}
          disabled={code.length < 6 || loading}
          className="w-full h-10 rounded-[var(--radius-md)] bg-primary text-on-primary text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-60"
        >
          {loading ? 'Verifying…' : 'Verify email'}
        </motion.button>

        <button
          type="button"
          onClick={handleResend}
          className="flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors"
        >
          <RefreshCw size={13} /> Resend code
        </button>
      </div>
    </motion.div>
  )
})

VerifyEmailCard.displayName = 'VerifyEmailCard'
export default VerifyEmailCard
