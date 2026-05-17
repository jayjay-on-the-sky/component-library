import Avatar, { AvatarGroupDemo } from './Avatar'

export default {
  name: 'Avatar',
  category: 'Display',
  description: 'User avatar with image fallback, status dot, sizes, and stacked group variant.',
  variants: [
    { label: 'Initials', props: { initials: 'JD', size: 'lg' } },
    { label: 'Online', props: { initials: 'AK', status: 'online', size: 'lg' } },
    { label: 'Away', props: { initials: 'MJ', status: 'away', size: 'lg' } },
    { label: 'Busy', props: { initials: 'TR', status: 'busy', size: 'lg' } },
    { label: 'Group', props: {}, Component: AvatarGroupDemo },
  ],
}
