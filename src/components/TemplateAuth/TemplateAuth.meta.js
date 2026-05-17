export default {
  name: 'TemplateAuth',
  category: 'Templates',
  description: 'Split-screen auth layout. Brand panel left, form right. OAuth buttons, password toggle.',
  variants: [
    { label: 'Login', props: { mode: 'login' } },
    { label: 'Signup', props: { mode: 'signup' } },
  ]
}
