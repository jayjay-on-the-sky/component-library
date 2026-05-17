export default {
  name: 'Timeline',
  category: 'Data Display',
  description: 'Vertical event timeline for activity logs, history, and changelogs.',
  variants: [
    {
      label: 'Default',
      props: {
        items: [
          { id: 1, title: 'Project created', description: 'The project was initialized with the default template.', timestamp: 'Jan 12', color: 'primary' },
          { id: 2, title: 'First commit', description: 'Initial commit with project structure and dependencies.', timestamp: 'Jan 13', color: 'primary' },
          { id: 3, title: 'v1.0.0 released', description: '🎉 First stable release shipped to production.', timestamp: 'Feb 1', color: 'success' },
          { id: 4, title: 'Bug reported', description: 'Critical bug found in the authentication flow.', timestamp: 'Feb 5', color: 'error' },
          { id: 5, title: 'Hotfix deployed', description: 'v1.0.1 patch deployed to fix the auth issue.', timestamp: 'Feb 6', color: 'success' },
        ],
      },
    },
  ],
}
