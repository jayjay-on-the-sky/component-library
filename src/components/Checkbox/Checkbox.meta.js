export default {
  name: 'Checkbox',
  category: 'Forms',
  description: 'Accessible checkbox with label, helper text, indeterminate, and error states.',
  variants: [
    { label: 'Unchecked', props: { label: 'Accept terms and conditions' } },
    { label: 'Checked', props: { label: 'Send me updates', checked: true } },
    { label: 'Indeterminate', props: { label: 'Select all', indeterminate: true } },
    { label: 'With helper', props: { label: 'Marketing emails', helperText: 'We send at most once per week.', checked: true } },
    { label: 'Error', props: { label: 'Required field', helperText: 'You must accept to continue.', error: true } },
  ],
}
