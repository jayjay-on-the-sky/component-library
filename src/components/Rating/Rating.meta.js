export default {
  name: 'Rating',
  category: 'Forms',
  description: 'Star rating component, interactive or read-only.',
  variants: [
    { label: 'Default', props: { value: 3, max: 5 } },
    { label: 'Read Only', props: { value: 4, readOnly: true, showLabel: true } },
    { label: 'Large', props: { value: 2, max: 5, size: 28, showLabel: true } },
  ],
}
