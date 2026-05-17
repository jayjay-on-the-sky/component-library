import Radio from './Radio'

export default {
  name: 'Radio',
  category: 'Forms',
  description: 'Radio button with group support, labels, and helper text.',
  variants: [
    {
      label: 'Group',
      Component: () => (
        <Radio.Group label="Notification preference">
          <Radio name="notif" value="all" label="All notifications" checked />
          <Radio name="notif" value="mentions" label="Mentions only" helperText="Only when someone @mentions you." />
          <Radio name="notif" value="none" label="None" />
        </Radio.Group>
      ),
      props: {},
    },
    { label: 'Unchecked', props: { label: 'Option A', name: 'demo', value: 'a' } },
    { label: 'Checked', props: { label: 'Option B', name: 'demo', value: 'b', checked: true } },
  ],
}
