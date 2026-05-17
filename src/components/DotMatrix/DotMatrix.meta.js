export default {
  name: 'DotMatrix',
  category: 'Experimental',
  description: 'Animated dot matrix display with wave pattern. Each dot pulses based on a sine wave.',
  variants: [
    { label: 'Default', props: {} },
    { label: 'Large Grid', props: { cols: 20, rows: 12, dotSize: 5, gap: 8 } },
    { label: 'Static', props: { animate: false } },
  ]
}
