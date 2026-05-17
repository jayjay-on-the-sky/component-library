export default {
  name: 'MagneticButton',
  category: 'Experimental',
  description: 'Button that follows cursor position with spring physics. Framer Motion useSpring for smooth movement.',
  variants: [
    { label: 'Default', props: { children: 'Magnetic Button' } },
    { label: 'Strong', props: { children: 'Strong Pull', strength: 0.7 } },
    { label: 'Subtle', props: { children: 'Subtle Shift', strength: 0.2 } },
  ]
}
