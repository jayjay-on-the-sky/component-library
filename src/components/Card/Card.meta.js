import { CardBasicDemo, CardHoverDemo, CardImageDemo } from './Card'

export default {
  name: 'Card',
  category: 'Layout',
  description: 'Compound card with Header, Body, Footer, and Image sub-components. Hover lift variant.',
  variants: [
    { label: 'Basic', props: {}, Component: CardBasicDemo },
    { label: 'Hover', props: {}, Component: CardHoverDemo },
    { label: 'With Image', props: {}, Component: CardImageDemo },
  ],
}
