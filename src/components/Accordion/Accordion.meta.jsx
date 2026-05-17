import Accordion from './Accordion'

const DemoAccordion = () => (
  <Accordion defaultOpen="item-1" className="w-80">
    <Accordion.Item id="item-1">
      <Accordion.Trigger itemId="item-1">What is this component library?</Accordion.Trigger>
      <Accordion.Content itemId="item-1">
        A production-quality React component library with design token theming, Framer Motion animations, and Radix UI accessibility foundations.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item id="item-2">
      <Accordion.Trigger itemId="item-2">How does theming work?</Accordion.Trigger>
      <Accordion.Content itemId="item-2">
        Every component uses CSS custom property token classes. Load a design.md and the entire library re-skins without touching a single component.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item id="item-3">
      <Accordion.Trigger itemId="item-3">Can I add my own components?</Accordion.Trigger>
      <Accordion.Content itemId="item-3">
        Yes — use the Create or Scan modals. Claude generates production-quality components via GitHub Actions and commits them directly to the repo.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion>
)

export default {
  name: 'Accordion',
  category: 'Display',
  description: 'Expandable disclosure panels with single and multiple open modes.',
  variants: [
    { label: 'Single open', Component: DemoAccordion, props: {} },
  ],
}
