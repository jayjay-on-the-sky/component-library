import React from 'react'
import { Users, DollarSign, Activity, TrendingUp } from '../../lib/icons'

export default {
  name: 'KPICard',
  category: 'Dashboard',
  description: 'Key performance indicator card with trend indicator.',
  variants: [
    {
      label: 'Revenue',
      props: {
        title: 'Total Revenue',
        value: '$48,295',
        change: 12.4,
        changeLabel: 'vs last month',
        icon: <DollarSign size={16} />,
      },
    },
    {
      label: 'Users',
      props: {
        title: 'Active Users',
        value: '24,819',
        change: -3.2,
        changeLabel: 'vs last week',
        icon: <Users size={16} />,
      },
    },
    {
      label: 'Uptime',
      props: {
        title: 'Uptime',
        value: '99.98%',
        change: '+0.02%',
        changeLabel: 'vs last month',
        icon: <Activity size={16} />,
      },
    },
    {
      label: 'Loading',
      props: {
        title: 'Total Revenue',
        value: '—',
        loading: true,
        icon: <TrendingUp size={16} />,
      },
    },
  ],
}
