export default {
  name: 'PulseRing',
  category: 'Experimental',
  description: 'Live status indicator with multi-ring pulsing animation. Online, offline, busy, away states.',
  variants: [
    { label: 'Online', props: { status: 'online' } },
    { label: 'Busy', props: { status: 'busy' } },
    { label: 'Away', props: { status: 'away' } },
    { label: 'Offline', props: { status: 'offline' } },
    { label: 'Large', props: { status: 'online', size: 16, rings: 3 } },
    { label: 'No Label', props: { status: 'online', showLabel: false } },
  ]
}
