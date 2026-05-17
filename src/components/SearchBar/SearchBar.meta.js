export default {
  name: 'SearchBar',
  category: 'Forms',
  description: 'Pill-shaped search input with suggestions dropdown and clear button.',
  variants: [
    { label: 'Default', props: { value: '', placeholder: 'Search anything…' } },
    { label: 'With value', props: { value: 'design system', placeholder: 'Search anything…' } },
    { label: 'Loading', props: { value: 'comp', loading: true, placeholder: 'Search anything…' } },
    { label: 'With suggestions', props: { value: 'c', placeholder: 'Search…', suggestions: ['components', 'color tokens', 'changelog'] } },
  ],
}
