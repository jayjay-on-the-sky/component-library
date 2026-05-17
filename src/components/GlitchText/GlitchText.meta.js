export default {
  name: 'GlitchText',
  category: 'Experimental',
  description: 'Text with CSS RGB-shift glitch animation. Two layered pseudo-elements with clip-path animation.',
  variants: [
    { label: 'Default', props: { children: 'SYSTEM ERROR', size: 'text-4xl' } },
    { label: 'Fast', props: { children: 'BREACH', speed: 'fast', size: 'text-5xl' } },
    { label: 'Slow', props: { children: 'CORRUPTED', speed: 'slow', size: 'text-3xl' } },
  ]
}
