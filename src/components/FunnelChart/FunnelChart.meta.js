export default {
  name: 'FunnelChart',
  category: 'Charts',
  description: 'Conversion funnel visualization with drop-off rates, animated bar fill, and hover states.',
  variants: [
    { label: 'Default', props: {} },
    {
      label: 'Sales Pipeline', props: {
        data: [
          { label: 'Leads', value: 5000 },
          { label: 'Qualified', value: 2200 },
          { label: 'Proposal', value: 900 },
          { label: 'Negotiation', value: 320 },
          { label: 'Closed', value: 110 },
        ]
      }
    },
  ]
}
