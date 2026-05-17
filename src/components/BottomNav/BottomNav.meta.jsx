import { useState } from 'react'
import BottomNav from './BottomNav'

const HomeIcon = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 9.5L11 3l8 6.5V19a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M8 20v-8h6v8" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>
const SearchIcon = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.7"/><path d="M15.5 15.5l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
const InboxIcon = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.7"/><path d="M3 13h4l2 3h4l2-3h4" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>
const ProfileIcon = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth="1.7"/><path d="M3 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>

const ITEMS = [
  { value: 'home', label: 'Home', icon: <HomeIcon /> },
  { value: 'search', label: 'Search', icon: <SearchIcon /> },
  { value: 'inbox', label: 'Inbox', icon: <InboxIcon />, badge: 3 },
  { value: 'profile', label: 'Profile', icon: <ProfileIcon /> },
]

const Demo = () => {
  const [active, setActive] = useState('home')
  return (
    <div className="w-80 border border-hairline rounded-2xl overflow-hidden">
      <BottomNav items={ITEMS} value={active} onChange={setActive} />
    </div>
  )
}

export default {
  name: 'BottomNav',
  category: 'Navigation',
  description: 'M3 Navigation Bar for mobile with animated indicator pill, badge support, and keyboard accessibility.',
  variants: [
    { label: 'Default', Component: Demo, props: {} },
  ],
}
