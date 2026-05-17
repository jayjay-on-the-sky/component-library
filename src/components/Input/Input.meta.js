export default {
  name: 'Input',
  category: 'Forms',
  description: 'Accessible text input with label, helper text, error, prefix/suffix, and character count.',
  variants: [
    { label: 'Default', props: { label: 'Email', placeholder: 'you@example.com' } },
    { label: 'With helper', props: { label: 'Username', placeholder: 'johndoe', helperText: 'Must be 3–20 characters' } },
    { label: 'With error', props: { label: 'Password', type: 'password', placeholder: '••••••••', error: 'Password is too short' } },
    { label: 'With prefix', props: { label: 'Website', prefix: 'https://', placeholder: 'yoursite.com' } },
    { label: 'With count', props: { label: 'Bio', placeholder: 'Tell us about yourself', maxLength: 160 } },
  ],
}
