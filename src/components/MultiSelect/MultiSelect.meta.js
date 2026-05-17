export default {
  name: 'MultiSelect',
  category: 'Forms',
  description: 'Multi-value dropdown select with search and chip display.',
  variants: [
    {
      label: 'Default',
      props: {
        value: ['react', 'typescript'],
        options: [
          { label: 'React', value: 'react' },
          { label: 'TypeScript', value: 'typescript' },
          { label: 'Vue', value: 'vue' },
          { label: 'Svelte', value: 'svelte' },
          { label: 'Angular', value: 'angular' },
        ],
      },
    },
    {
      label: 'Max 3 items',
      props: {
        maxItems: 3,
        value: [],
        options: [
          { label: 'Design', value: 'design' },
          { label: 'Engineering', value: 'eng' },
          { label: 'Marketing', value: 'mkt' },
          { label: 'Product', value: 'product' },
        ],
      },
    },
  ],
}
