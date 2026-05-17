import Tabs from './Tabs'

const UnderlineDemo = () => (
  <Tabs defaultValue="overview" className="w-80">
    <Tabs.List variant="underline">
      <Tabs.Trigger value="overview" variant="underline">Overview</Tabs.Trigger>
      <Tabs.Trigger value="analytics" variant="underline">Analytics</Tabs.Trigger>
      <Tabs.Trigger value="settings" variant="underline">Settings</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="overview">Overview content here — charts, summaries, quick stats.</Tabs.Content>
    <Tabs.Content value="analytics">Analytics content here — graphs, trends, metrics.</Tabs.Content>
    <Tabs.Content value="settings">Settings content here — preferences, notifications.</Tabs.Content>
  </Tabs>
)

const PillDemo = () => (
  <Tabs defaultValue="all" className="w-80">
    <Tabs.List variant="pill">
      <Tabs.Trigger value="all" variant="pill">All</Tabs.Trigger>
      <Tabs.Trigger value="active" variant="pill">Active</Tabs.Trigger>
      <Tabs.Trigger value="archived" variant="pill">Archived</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="all">Showing all 128 items.</Tabs.Content>
    <Tabs.Content value="active">Showing 84 active items.</Tabs.Content>
    <Tabs.Content value="archived">Showing 44 archived items.</Tabs.Content>
  </Tabs>
)

export default {
  name: 'Tabs',
  category: 'Navigation',
  description: 'Radix UI tabs with underline and pill variants, animated indicator, full keyboard nav.',
  variants: [
    { label: 'Underline', Component: UnderlineDemo, props: {} },
    { label: 'Pill', Component: PillDemo, props: {} },
  ],
}
