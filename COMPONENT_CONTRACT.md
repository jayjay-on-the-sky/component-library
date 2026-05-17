# Component Contract

Every component in this library follows a strict contract that makes it
automatically compatible with any design.md theme. Read this before building
or adding a component.

---

## The One Rule

> A component must **never** use a hardcoded hex value or a named Tailwind
> color (e.g. `blue-500`, `zinc-900`, `#ff385c`).
> It must **only** use the token Tailwind classes listed below.

When this rule is followed, swapping a design.md theme re-skins the entire
library with zero component code changes.

---

## Token Class Reference

| Tailwind class | CSS variable | Role |
|---|---|---|
| `bg-primary` | `--color-primary` | Primary CTA background |
| `bg-primary-hover` | `--color-primary-hover` | Primary CTA hover |
| `bg-primary-active` | `--color-primary-active` | Primary CTA press |
| `bg-primary-muted` | `--color-primary-muted` | Tinted primary fill |
| `text-primary` | `--color-primary` | Primary text/link |
| `text-on-primary` | `--color-on-primary` | Text on primary bg |
| `bg-canvas` | `--color-canvas` | Page/card background |
| `bg-surface` | `--color-surface` | Subtle fill |
| `bg-surface-strong` | `--color-surface-strong` | Stronger fill |
| `text-ink` | `--color-ink` | Primary text |
| `text-ink-muted` | `--color-ink-muted` | Secondary text |
| `text-body` | `--color-body` | Body text |
| `text-muted` | `--color-muted` | Tertiary / helper text |
| `border-hairline` | `--color-hairline` | Default border |
| `text-success` / `bg-success` | `--color-success` | Success semantic |
| `text-warning` / `bg-warning` | `--color-warning` | Warning semantic |
| `text-error` / `bg-error` | `--color-error` | Error semantic |

---

## Code Standards

### Always use `cn()` for class composition
```jsx
import { cn } from '../../lib/utils'

className={cn('base-classes', condition && 'conditional-class', className)}
```

### Always use `React.forwardRef` on interactive elements
```jsx
const Button = forwardRef(function Button({ ...props }, ref) {
  return <button ref={ref} {...props} />
})
```

### Always add Framer Motion micro-interactions
```jsx
import { motion } from 'framer-motion'

// Buttons
<motion.button whileTap={{ scale: 0.97 }} transition={{ duration: 0.08 }}>

// Appearing elements
<motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
```

### Always include ARIA attributes
```jsx
<button
  role="switch"
  aria-checked={checked}
  aria-disabled={disabled}
  aria-label="Toggle dark mode"
>
```

### Use Radix UI for complex interactive components
- Dialog, Modal → `@radix-ui/react-dialog`
- Tooltip → `@radix-ui/react-tooltip`
- Select dropdown → `@radix-ui/react-select`
- Tabs → `@radix-ui/react-tabs`
- Switch → `@radix-ui/react-switch`

---

## File Structure

Every component lives in its own folder:

```
src/components/
└── ComponentName/
    ├── ComponentName.jsx       ← the component (exported as default)
    └── ComponentName.meta.js   ← metadata for the library browser
```

### meta.js shape
```js
export default {
  name: 'ComponentName',
  category: 'Category',       // Actions | Display | Forms | Layout | Overlays | Feedback
  description: 'One sentence.',
  variants: [
    { label: 'Default', props: {} },
    { label: 'Variant Name', props: { propName: value } },
    // For demo wrappers (when the component needs a container to render well):
    { label: 'Demo', props: {}, Component: DemoWrapperComponent },
  ],
}
```

---

## Adding a New Component

1. Create `src/components/MyComponent/MyComponent.jsx`
2. Create `src/components/MyComponent/MyComponent.meta.js`
3. The registry auto-discovers it — no manual registration needed
4. Restart the dev server; it appears in the sidebar immediately

---

## Using Components in Other Projects

Components are theme-ready out of the box. To use them:

1. Copy the component file into your project
2. Ensure your project has the same CSS custom properties defined (or load a design.md)
3. Install the same peer dependencies (`framer-motion`, relevant Radix UI packages)
4. Import and use — it will pick up whatever `--color-*` variables your project defines

---

## Design.md Compatibility

A design.md file from the `generate-design-md` skill produces color tokens in the format:
```
`{colors.primary}` — #ff385c
```

The `designMdParser.js` library reads these and maps them to CSS custom properties.
The `themeApplier.js` library writes them to `:root`.

Components that follow this contract re-skin automatically when a design.md is loaded.

---

## What NOT to do

```jsx
// ❌ Never hardcode hex values
<div className="bg-[#ff385c]">

// ❌ Never use named Tailwind colors
<div className="bg-blue-500 text-zinc-900">

// ❌ Never skip forwardRef on interactive elements
function Button({ onClick }) {
  return <button onClick={onClick} />
}

// ❌ Never use inline styles for theme-able properties
<div style={{ backgroundColor: '#ff385c' }}>
```

```jsx
// ✅ Correct
<div className="bg-primary text-on-primary">

// ✅ Correct — token class via cn()
className={cn('bg-canvas border border-hairline', isActive && 'border-primary')}

// ✅ Correct — forwardRef
const Button = forwardRef(function Button(props, ref) {
  return <button ref={ref} {...props} />
})
```
