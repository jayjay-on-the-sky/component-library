export default {
  name: 'Chip',
  category: 'Display',
  description: 'Compact interactive label with filter, input, and suggestion variants.',
  variants: [
    { label: 'Outlined', props: { label: 'Filter', variant: 'outlined' } },
    { label: 'Selected', props: { label: 'Selected', variant: 'outlined', selected: true } },
    { label: 'Filled', props: { label: 'Filled', variant: 'filled', selected: true } },
    { label: 'Dismissible', props: { label: 'React', variant: 'outlined', onDismiss: () => {} } },
  ],
}
