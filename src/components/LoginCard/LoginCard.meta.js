export default {
  name: 'LoginCard',
  category: 'Auth',
  description: 'Login form card with Google OAuth button and password visibility toggle.',
  variants: [
    { label: 'Default', props: { onGoogleLogin: () => {}, onForgotPassword: () => {} } },
    { label: 'Loading', props: { loading: true } },
    { label: 'With error', props: { error: 'Invalid email or password. Please try again.' } },
  ],
}
