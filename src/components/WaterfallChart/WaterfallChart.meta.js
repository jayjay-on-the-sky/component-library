export default {
  name: 'WaterfallChart',
  category: 'Charts',
  description: 'Waterfall/bridge chart for financial data. Shows cumulative effect with positive/negative bars.',
  variants: [
    { label: 'Default', props: {} },
    {
      label: 'Cash Flow', props: {
        data: [
          { label: 'Opening', value: 200, type: 'start' },
          { label: 'Sales', value: 150 },
          { label: 'Expenses', value: -90 },
          { label: 'Tax', value: -25 },
          { label: 'Closing', value: 235, type: 'total' },
        ]
      }
    },
  ]
}
