export default {
  name: 'CursorFollower',
  category: 'Experimental',
  description: 'Custom cursor overlay with trailing ring and inner dot, spring physics via useMotionValue.',
  variants: [
    { label: 'Default', props: {} },
    { label: 'Large', props: { size: 40, innerSize: 8 } },
    { label: 'Slow Lag', props: { lag: 0.5 } },
  ]
}
