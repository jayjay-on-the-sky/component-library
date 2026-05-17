export default {
  name: 'Stepper',
  category: 'Navigation',
  description: 'Step-by-step progress indicator for multi-step flows.',
  variants: [
    {
      label: 'Horizontal',
      props: {
        current: 1,
        orientation: 'horizontal',
        steps: [
          { label: 'Account', description: 'Your details' },
          { label: 'Profile', description: 'Set up profile' },
          { label: 'Review', description: 'Confirm info' },
        ],
      },
    },
    {
      label: 'Vertical',
      props: {
        current: 2,
        orientation: 'vertical',
        steps: [
          { label: 'Order placed', description: 'We received your order' },
          { label: 'Processing', description: 'Preparing your items' },
          { label: 'Shipped', description: 'On the way' },
          { label: 'Delivered' },
        ],
      },
    },
  ],
}
