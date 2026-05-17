export default {
  name: 'Spinner',
  category: 'Feedback',
  description: 'Animated loading spinner in multiple sizes.',
  variants: [
    { label: 'Small', props: { size: 'sm' } },
    { label: 'Medium', props: { size: 'md' } },
    { label: 'Large', props: { size: 'lg' } },
    { label: 'Muted', props: { size: 'md', color: 'muted' } },
  ],
}
