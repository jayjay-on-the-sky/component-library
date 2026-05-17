export default {
  name: 'HoverCard',
  category: 'Experimental',
  description: 'Card with info panel that slides up on hover. Image zooms, overlay reveals with AnimatePresence.',
  variants: [
    { label: 'Default', props: { title: 'Spatial Computing', description: 'The next frontier of human-computer interaction is here.', tag: 'Featured' } },
    { label: 'Green', props: { title: 'Sustainability', description: 'Building carbon-neutral infrastructure for a greener future.', gradient: 'from-success/60 to-surface' } },
    { label: 'Orange', props: { title: 'Performance', description: 'Sub-millisecond response times with edge computing.', gradient: 'from-warning/60 to-surface' } },
  ]
}
