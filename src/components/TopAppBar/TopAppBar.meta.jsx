const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M13.5 13.5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)
const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="5" r="1.2" fill="currentColor"/>
    <circle cx="10" cy="10" r="1.2" fill="currentColor"/>
    <circle cx="10" cy="15" r="1.2" fill="currentColor"/>
  </svg>
)

export default {
  name: 'TopAppBar',
  category: 'Navigation',
  description: 'M3-style top navigation bar in small, center-aligned, medium, and large variants.',
  variants: [
    {
      label: 'Small',
      props: {
        title: 'Inbox',
        variant: 'small',
        leadingIcon: <BackIcon />,
        trailingActions: [{ icon: <SearchIcon />, label: 'Search' }, { icon: <MoreIcon />, label: 'More' }],
      },
    },
    {
      label: 'Center aligned',
      props: {
        title: 'Messages',
        variant: 'center-aligned',
        leadingIcon: <BackIcon />,
        trailingActions: [{ icon: <MoreIcon />, label: 'More' }],
      },
    },
    {
      label: 'Medium',
      props: {
        title: 'Component Library',
        variant: 'medium',
        subtitle: 'Browse, preview, and manage your UI components',
        leadingIcon: <BackIcon />,
        trailingActions: [{ icon: <SearchIcon />, label: 'Search' }],
      },
    },
    {
      label: 'Large',
      props: {
        title: 'Design System',
        variant: 'large',
        leadingIcon: <BackIcon />,
        trailingActions: [{ icon: <SearchIcon />, label: 'Search' }, { icon: <MoreIcon />, label: 'More' }],
      },
    },
  ],
}
