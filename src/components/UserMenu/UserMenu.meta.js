export default {
  name: 'UserMenu',
  category: 'Dashboard',
  description: 'User avatar dropdown with account options and sign out.',
  variants: [
    {
      label: 'Default',
      props: {
        user: { name: 'James Carter', email: 'james@acme.com', plan: 'Pro' },
      },
    },
    {
      label: 'With Avatar',
      props: {
        user: {
          name: 'Sarah Lee',
          email: 'sarah@acme.com',
          avatar: 'https://i.pravatar.cc/40?img=47',
        },
      },
    },
  ],
}
