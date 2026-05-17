export default {
  name: 'Toggle',
  category: 'Forms',
  description: 'Animated switch toggle with label, disabled state, and spring animation.',
  variants: [
    { label: 'Off', props: { defaultChecked: false } },
    { label: 'On', props: { defaultChecked: true } },
    { label: 'With label', props: { defaultChecked: true, label: 'Enable notifications' } },
    { label: 'Label left', props: { defaultChecked: false, label: 'Dark mode', labelPosition: 'left' } },
    { label: 'Disabled', props: { defaultChecked: true, label: 'Locked setting', disabled: true } },
  ],
}
