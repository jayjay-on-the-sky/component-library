export default {
  name: 'RotatingBadge',
  category: 'Experimental',
  description: 'Circular badge with text rotating around the edge using SVG textPath. CSS animation.',
  variants: [
    { label: 'Default', props: {} },
    { label: 'Large', props: { size: 160, text: 'OPEN TO WORK • OPEN TO WORK • ' } },
    { label: 'Fast', props: { speed: 3, text: 'NEW FEATURE • NEW FEATURE • ' } },
  ]
}
