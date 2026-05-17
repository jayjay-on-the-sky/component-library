export default {
  name: 'MarqueeStrip',
  category: 'Experimental',
  description: 'Infinite horizontal scroll strip of items. CSS animation, fade edges, reverse direction support.',
  variants: [
    { label: 'Default', props: {} },
    { label: 'Reverse', props: { reverse: true, items: ['Design', 'Build', 'Ship', 'Iterate', 'Launch', 'Grow', 'Scale'] } },
    { label: 'Fast', props: { speed: 60 } },
  ]
}
