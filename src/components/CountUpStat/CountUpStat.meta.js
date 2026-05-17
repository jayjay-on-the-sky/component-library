export default {
  name: 'CountUpStat',
  category: 'Experimental',
  description: 'Large number that counts up on scroll into view using requestAnimationFrame with easing.',
  variants: [
    { label: 'Default', props: { value: 12840, label: 'Happy Customers' } },
    { label: 'Percentage', props: { value: 99.9, suffix: '%', decimals: 1, label: 'Uptime SLA', size: 'xl' } },
    { label: 'Currency', props: { value: 2400000, prefix: '$', label: 'ARR', size: 'lg' } },
    { label: 'Small', props: { value: 48, suffix: 'ms', label: 'Avg. Response', size: 'md' } },
  ]
}
