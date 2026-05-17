const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const EditIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default {
  name: 'FAB',
  category: 'Actions',
  description: 'Floating Action Button in M3 style with primary and surface variants, sizes, and extended label mode.',
  variants: [
    { label: 'Primary', props: { icon: <PlusIcon />, label: 'Create' } },
    { label: 'Extended', props: { icon: <EditIcon />, label: 'Compose', extended: true } },
    { label: 'Surface', props: { icon: <PlusIcon />, label: 'Add', variant: 'surface' } },
    { label: 'Small', props: { icon: <PlusIcon />, label: 'Add', size: 'sm' } },
    { label: 'Large', props: { icon: <PlusIcon />, label: 'Add', size: 'lg' } },
  ],
}
