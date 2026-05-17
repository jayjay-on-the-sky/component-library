export default {
  name: 'Callout',
  category: 'Data Display',
  description: 'Highlighted info/warning/success/error callout block.',
  variants: [
    { label: 'Info', props: { variant: 'info', title: 'Did you know?', children: 'You can customize the theme by editing your design tokens in the CSS file.' } },
    { label: 'Warning', props: { variant: 'warning', title: 'Breaking change', children: 'This API will be deprecated in v3. Please migrate to the new interface.' } },
    { label: 'Success', props: { variant: 'success', children: 'Your changes have been saved successfully.' } },
    { label: 'Error', props: { variant: 'error', title: 'Error', children: 'Failed to load data. Please try again.', dismissible: true } },
  ],
}
