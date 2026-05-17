export default {
  name: 'ScrollProgress',
  category: 'Experimental',
  description: 'Thin scroll progress bar fixed at the top or bottom of the viewport. Glow effect.',
  variants: [
    { label: 'Default', props: {} },
    { label: 'Bottom', props: { position: 'bottom', height: 4 } },
    { label: 'Thick', props: { height: 6 } },
  ]
}
