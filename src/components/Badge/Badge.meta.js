export default {
  name: 'Badge',
  category: 'Display',
  description: 'Semantic label chip. Variants for status, dot indicator, live pulse, and count.',
  variants: [
    { label: 'Default', props: { children: 'Default' } },
    { label: 'Primary', props: { children: 'Primary', variant: 'primary' } },
    { label: 'Success', props: { children: 'Success', variant: 'success', dot: true } },
    { label: 'Warning', props: { children: 'Warning', variant: 'warning', dot: true } },
    { label: 'Error', props: { children: 'Error', variant: 'error', dot: true } },
    { label: 'Live', props: { children: 'Live', variant: 'error', dot: true, live: true } },
    { label: 'With count', props: { children: 'Notifications', variant: 'primary', count: 12 } },
  ],
}
