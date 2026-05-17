export default {
  name: 'Button',
  category: 'Actions',
  description: 'Primary interactive element. 4 variants, 3 sizes, icon support, loading state.',
  variants: [
    { label: 'Primary', props: { children: 'Click me', variant: 'primary' } },
    { label: 'Secondary', props: { children: 'Secondary', variant: 'secondary' } },
    { label: 'Ghost', props: { children: 'Ghost', variant: 'ghost' } },
    { label: 'Destructive', props: { children: 'Delete', variant: 'destructive' } },
    { label: 'Loading', props: { children: 'Saving', loading: true } },
    { label: 'Disabled', props: { children: 'Disabled', disabled: true } },
    { label: 'Small', props: { children: 'Small', size: 'sm' } },
    { label: 'Large', props: { children: 'Large button', size: 'lg' } },
  ],
}
