import React from 'react'
import { GitPullRequest, Bell, UserPlus } from '../../lib/icons'

export default {
  name: 'NotificationItem',
  category: 'Dashboard',
  description: 'Single notification row with avatar/icon, content and unread state.',
  variants: [
    {
      label: 'Unread',
      props: {
        unread: true,
        icon: <GitPullRequest size={15} />,
        iconBg: 'bg-primary/10',
        iconColor: 'text-primary',
        title: 'PR #142 merged',
        description: 'james merged your pull request "feat: add dark mode support"',
        timestamp: '2 min ago',
      },
    },
    {
      label: 'Read',
      props: {
        unread: false,
        icon: <UserPlus size={15} />,
        iconBg: 'bg-success/10',
        iconColor: 'text-success',
        title: 'New team member',
        description: 'sarah joined your workspace',
        timestamp: '1 hour ago',
      },
    },
    {
      label: 'System',
      props: {
        icon: <Bell size={15} />,
        iconBg: 'bg-warning/10',
        iconColor: 'text-warning',
        title: 'Scheduled maintenance',
        description: 'The service will be unavailable on Sunday 3–4 AM UTC.',
        timestamp: 'Yesterday',
      },
    },
  ],
}
