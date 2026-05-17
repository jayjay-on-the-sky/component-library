export default {
  name: 'AnimatedCounter',
  category: 'Experimental',
  description: 'Slot-machine digit flip counter. Each digit animates independently with AnimatePresence.',
  variants: [
    { label: 'Default', props: { value: 1337 } },
    { label: 'Large', props: { value: 42069, size: 64 } },
    { label: 'Small', props: { value: 99, size: 32 } },
  ]
}
