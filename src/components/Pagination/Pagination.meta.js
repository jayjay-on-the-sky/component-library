export default {
  name: 'Pagination',
  category: 'Navigation',
  description: 'Page navigation with ellipsis for large page counts.',
  variants: [
    { label: 'Default', props: { page: 5, totalPages: 10 } },
    { label: 'Few Pages', props: { page: 2, totalPages: 4 } },
    { label: 'Many Pages', props: { page: 7, totalPages: 20, siblingCount: 1 } },
  ],
}
