export default {
  name: 'VerifyEmailCard',
  category: 'Auth',
  description: 'Email verification card with OTP input and resend button.',
  variants: [
    { label: 'Default', props: { email: 'jane@acme.com' } },
    { label: 'Error', props: { email: 'jane@acme.com', error: 'Invalid code. Please try again.' } },
  ],
}
