export default {
  name: 'TreeMap',
  category: 'Charts',
  description: 'Proportional rectangle treemap with squarified layout algorithm, animated reveal, hover tooltips.',
  variants: [
    { label: 'Default', props: {} },
    {
      label: 'Budget Allocation', props: {
        data: [
          { label: 'Engineering', value: 55 }, { label: 'Sales', value: 30 },
          { label: 'Marketing', value: 25 }, { label: 'HR', value: 15 },
          { label: 'Legal', value: 8 }, { label: 'IT', value: 12 },
        ]
      }
    },
  ]
}
