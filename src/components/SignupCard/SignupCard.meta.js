export default {
  name: 'SignupCard',
  category: 'Auth',
  description: 'Sign up form card with password strength meter and Google OAuth.',
  variants: [
    { label: 'Default', props: { onGoogleLogin: () => {} } },
    { label: 'Loading', props: { loading: true } },
    { label: 'With error', props: { error: 'An account with this email already exists.' } },
  ],
}
