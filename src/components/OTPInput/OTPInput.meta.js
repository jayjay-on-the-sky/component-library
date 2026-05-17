export default {
  name: 'OTPInput',
  category: 'Forms',
  description: 'One-time password / verification code input with paste support.',
  variants: [
    { label: '6-digit', props: { length: 6, value: '123' } },
    { label: '4-digit', props: { length: 4, value: '' } },
    { label: 'Error state', props: { length: 6, value: '123456', error: true } },
  ],
}
