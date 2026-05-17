export default {
  name: 'Slider',
  category: 'Forms',
  description: 'Accessible range slider with animated thumb, fill track, and value display.',
  variants: [
    { label: 'Default', props: { label: 'Volume', value: 60 } },
    { label: 'Low value', props: { label: 'Brightness', value: 20, showValue: true } },
    { label: 'Full', props: { label: 'Speed', value: 100 } },
    { label: 'Disabled', props: { label: 'Opacity', value: 40, disabled: true } },
  ],
}
