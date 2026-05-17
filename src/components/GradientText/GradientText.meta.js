export default {
  name: 'GradientText',
  category: 'Experimental',
  description: 'Animated shimmer gradient text. Multiple presets, configurable element tag.',
  variants: [
    { label: 'Aurora', props: { children: 'Aurora Gradient', preset: 'aurora', size: 'text-4xl' } },
    { label: 'Fire', props: { children: 'Fire Gradient', preset: 'fire', size: 'text-4xl' } },
    { label: 'Ocean', props: { children: 'Ocean Gradient', preset: 'ocean', size: 'text-4xl' } },
    { label: 'Neon', props: { children: 'Neon Glow', preset: 'neon', size: 'text-4xl' } },
    { label: 'Static', props: { children: 'No Animation', preset: 'forest', animate: false, size: 'text-4xl' } },
  ]
}
