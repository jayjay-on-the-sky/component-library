import React from 'react'
import { GitCommitHorizontal, UserPlus, Star, AlertCircle } from '../../lib/icons'

export default {
  name: 'ActivityFeed',
  category: 'Dashboard',
  description: 'Vertical activity/event timeline with icons and timestamps.',
  variants: [
    {
      label: 'Default',
      props: {
        items: [
          { id: 1, icon: <GitCommitHorizontal size={14} />, content: <><strong>james</strong> pushed 3 commits to <em>main</em></>, timestamp: '2 min ago' },
          { id: 2, icon: <UserPlus size={14} />, content: <><strong>sarah</strong> was added to the team</>, timestamp: '1 hour ago' },
          { id: 3, icon: <Star size={14} />, iconColor: 'text-warning', content: <><strong>component-library</strong> was starred by <strong>alex</strong></>, timestamp: '3 hours ago' },
          { id: 4, icon: <AlertCircle size={14} />, iconColor: 'text-error', content: <>Build failed on branch <em>feature/new-ui</em></>, timestamp: 'Yesterday' },
        ],
      },
    },
  ],
}
