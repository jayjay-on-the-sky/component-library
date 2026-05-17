export default {
  name: 'MetricsRow',
  category: 'Dashboard',
  description: 'Horizontal metrics strip for dashboard summary statistics.',
  variants: [
    {
      label: 'Default',
      props: {
        metrics: [
          { label: 'Total Revenue', value: '48,295', prefix: '$', change: 12.4 },
          { label: 'Active Users', value: '24,819', change: -3.2 },
          { label: 'Conversion Rate', value: '3.6', unit: '%', change: 0.8 },
          { label: 'Avg. Session', value: '4:32', unit: 'min', change: 5.1 },
        ],
      },
    },
  ],
}
