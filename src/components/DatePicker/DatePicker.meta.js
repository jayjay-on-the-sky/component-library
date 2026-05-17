export default {
  name: 'DatePicker',
  category: 'Forms',
  description: 'Calendar date picker with month navigation and clear button.',
  variants: [
    { label: 'Empty', props: { placeholder: 'Select a date' } },
    { label: 'With value', props: { value: '2025-05-17', placeholder: 'Select a date' } },
  ],
}
