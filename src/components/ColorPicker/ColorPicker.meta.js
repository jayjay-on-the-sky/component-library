export default {
  name: 'ColorPicker',
  category: 'Forms',
  description: 'Color picker with hex input, native color wheel, and preset swatches.',
  variants: [
    { label: 'Default', props: { value: '#6366f1' } },
    { label: 'Green', props: { value: '#22c55e' } },
    { label: 'No input', props: { value: '#ec4899', showInput: false } },
  ],
}
