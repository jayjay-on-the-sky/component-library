export default {
  name: 'NeonButton',
  category: 'Experimental',
  description: 'Glowing neon border button with corner accents and pulsing text. Four color variants.',
  variants: [
    { label: 'Cyan', props: { children: 'Launch', color: 'cyan' } },
    { label: 'Magenta', props: { children: 'Connect', color: 'magenta' } },
    { label: 'Green', props: { children: 'Execute', color: 'green' } },
    { label: 'Orange', props: { children: 'Override', color: 'orange' } },
    { label: 'Large', props: { children: 'Initialize', color: 'cyan', size: 'lg' } },
  ]
}
