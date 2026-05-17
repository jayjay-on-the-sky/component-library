export default {
  name: 'MorphingBlob',
  category: 'Experimental',
  description: 'CSS-animated organic blob shape with blur. Use as background decoration element.',
  variants: [
    { label: 'Default', props: { size: 200 } },
    { label: 'Variant 2', props: { size: 200, variant: 2 } },
    { label: 'Small Fast', props: { size: 120, speed: 4 } },
    { label: 'Large', props: { size: 280, opacity: 0.4 } },
  ]
}
