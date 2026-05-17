export default {
  name: 'SlideCode',
  category: 'Slides',
  description: 'Split code slide: text panel left, dark syntax-highlighted code panel right with line numbers.',
  variants: [
    { label: 'Default', props: {} },
    { label: 'Highlighted Lines', props: { highlights: [1, 3, 10, 11, 12], subtitle: 'The highlighted lines do the heavy lifting.' } },
  ]
}
