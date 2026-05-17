export default {
  name: 'SpotlightCard',
  category: 'Experimental',
  description: 'Card where a radial gradient spotlight follows the cursor position. Zero JS overhead spotlight.',
  variants: [
    { label: 'Default', props: { title: 'Spotlight Effect', subtitle: 'Move your cursor over this card' } },
    { label: 'Green Spotlight', props: { title: 'Green Spotlight', spotlightColor: 'rgba(22,163,74,0.2)' } },
    { label: 'Orange Spotlight', props: { title: 'Warm Glow', spotlightColor: 'rgba(217,119,6,0.2)' } },
  ]
}
