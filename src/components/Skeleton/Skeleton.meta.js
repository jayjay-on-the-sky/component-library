import Skeleton, { SkeletonCard, SkeletonText } from './Skeleton'

export default {
  name: 'Skeleton',
  category: 'Feedback',
  description: 'Shimmer loading placeholder. Presets for card, text, and custom shapes.',
  variants: [
    { label: 'Card', props: {}, Component: SkeletonCard },
    { label: 'Text', props: {}, Component: SkeletonText },
    { label: 'Block', props: { className: 'w-64 h-32' } },
    { label: 'Avatar', props: { circle: true, className: 'w-16 h-16' } },
  ],
}
