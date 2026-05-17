import { DialogDemo } from './Dialog'

export default {
  name: 'Dialog',
  category: 'Overlays',
  description: 'Radix UI dialog with animated overlay, focus trap, and composable header/body/footer.',
  variants: [
    { label: 'Demo', props: {}, Component: DialogDemo },
  ],
}
