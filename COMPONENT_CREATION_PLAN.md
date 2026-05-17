# Component Creation Plan

This document provides a step-by-step plan for creating new components that adhere to the Component Library's standards and contracts. Follow this plan to ensure consistency, accessibility, and theme compatibility.

## Overview

All new components must:
1. Follow the [Component Contract](./COMPONENT_CONTRACT.md)
2. Use only token classes for styling (no hardcoded colors)
3. Implement proper accessibility (ARIA, keyboard navigation)
4. Include Framer Motion micro-interactions where appropriate
5. Use Radix UI for complex interactive behaviors
6. Export with `React.forwardRef` for interactive elements
7. Utilize the `cn()` utility for class composition
8. Include comprehensive metadata in `.meta.js`

## 📋 Step-by-Step Creation Process

### Phase 1: Planning & Preparation

#### 1.1 Define Component Purpose
- [ ] Determine the component's primary function
- [ ] Identify which category it belongs to: Actions | Display | Forms | Layout | Overlays | Feedback
- [ ] Sketch basic API (props it should accept)
- [ ] Consider variants/sizes it might need

#### 1.2 Research Existing Patterns
- [ ] Examine similar components in `/src/components` for implementation patterns
- [ ] Note how they handle:
  - Token class usage
  - `forwardRef` implementation
  - Framer Motion integration
  - ARIA attributes
  - Variant systems (if applicable)
- [ ] Check `/src/lib/utils.js` for the `cn()` function signature

### Phase 2: Implementation

#### 2.1 Create Component Structure
```bash
# From project root:
mkdir -p src/components/MyNewComponent
```

#### 2.2 Create Component File (`MyNewComponent.jsx`)
Use this template as a starting point, adapting based on component type:

```jsx
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
// Add Radix UI imports if needed:
// import { RadioGroup } from '@radix-ui/react-radio-group';

const MyNewComponent = forwardRef(function MyNewComponent({
  // Define props with sensible defaults
  variant = 'primary', // or 'default' if no variants
  size = 'md',
  disabled = false,
  loading = false,
  className,
  children,
  ...props
}, ref) {
  // Calculate derived states
  const isInteractive = !disabled && !loading;
  
  // Define base classes (always present)
  const baseClasses = cn(
    'inline-flex items-center justify-center font-medium',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
    'disabled:opacity-50 disabled:pointer-events-none',
    'transition-colors duration-150'
  );

  // Define variant classes (using token classes only)
  const variantClasses = cn({
    primary: 'bg-primary text-on-primary hover:bg-primary-hover',
    secondary: 'bg-canvas text-ink border-hairline hover:bg-surface',
    // Add other variants as needed
  }[variant]);

  // Define size classes (using token-based spacing/radius)
  const sizeClasses = cn({
    sm: 'h-7 px-3 text-xs gap-1.5 rounded-[var(--radius-sm)]',
    md: 'h-9 px-4 text-sm gap-2 rounded-[var(--radius-md)]',
    lg: 'h-11 px-5 text-base gap-2.5 rounded-[var(--radius-md)]'
  }[size]);

  // Determine if we should show loading indicator
  const showLoading = loading;

  return (
    {/* Choose appropriate base element */}
    <motion.{'button' /* or 'div', 'input', etc. */}
      ref={ref}
      // Framer Motion micro-interactions
      whileTap={isInteractive ? { scale: 0.97 } : {}}
      transition={{ duration: 0.08 }}
      // Accessibility attributes
      aria-disabled={disabled}
      aria-busy={loading}
      role={/* Set appropriate role if not native button */}
      {/* Conditional rendering based on component type */}
      className={cn(
        baseClasses,
        variantClasses,
        sizeClasses,
        className // Allow external class override
      )}
      {/* Spread remaining props */}
      {...props}
    >
      {/* Loading state */}
      {showLoading && (
        <span className="flex items-center gap-1" aria-label="Loading">
          {[0, 150, 300].map(delay => (
            <span
              key={delay}
              className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </span>
      )}
      
      {/* Content */}
      {!showLoading && (
        <>
          {/* Leading icon if provided */}
          {props.icon && props.iconPosition === 'left' && (
            <span className="shrink-0">{props.icon}</span>
          )}
          
          {/* Main content */}
          {children}
          
          {/* Trailing icon if provided */}
          {props.icon && props.iconPosition === 'right' && (
            <span className="shrink-0">{props.icon}</span>
          )}
        </>
      )}
    </motion.{'button' /* or appropriate element */}
  );
});

export default MyNewComponent;
```

#### 2.3 Create Metadata File (`MyNewComponent.meta.js`)
```jsx
export default {
  name: 'MyNewComponent',
  category: 'Category', // Must be one of: Actions | Display | Forms | Layout | Overlays | Feedback
  description: 'One sentence describing the component\'s purpose.',
  variants: [
    { label: 'Default', props: {} },
    // Add meaningful variants that demonstrate different uses
    { 
      label: 'Variant Name', 
      props: { 
        variant: 'secondary', 
        size: 'lg' 
        // ...other relevant props
      } 
    },
    // For components needing wrapper context (optional)
    // { 
    //   label: 'Demo', 
    //   props: {}, 
    //   Component: DemoWrapperComponent 
    // },
  ],
};
```

#### 2.4 Add Component-Specific Logic
Depending on component type, implement:
- **State management** (useState, useReducer) for interactive components
- **Event handlers** (onClick, onChange, etc.)
- **Custom hooks** if logic is complex (place in `/src/hooks`)
- **Radix UI integration** for complex behaviors:
  ```jsx
  // Example for a toggle switch
  import { Switch } from '@radix-ui/react-switch';
  
  const MySwitch = forwardRef(({ checked, onCheckedChange, ...props }, ref) => (
    <Switch 
      ref={ref} 
      checked={checked} 
      onCheckedChange={onCheckedChange} 
      {...props} 
    />
  ));
  ```

### Phase 3: Enhancement & Polish

#### 3.1 Verify Contract Compliance
- [ ] No hardcoded hex colors (search for `#[0-9a-fA-F]{3,6}`)
- [ ] No disallowed named Tailwind colors (check for `bg-*-*`, `text-*-*` outside allowed list)
- [ ] Uses `cn()` for all dynamic class compositions
- [ ] Uses `forwardRef` for interactive elements
- [ ] Includes Framer Motion interactions where appropriate (`whileTap`, `initial`/`animate`)
- [ ] Has proper ARIA attributes
- [ ] Uses Radix UI for complex interactive behaviors
- [ ] Follows file structure: `src/components/MyNewComponent/MyNewComponent.jsx` + `.meta.js`

#### 3.2 Implement Theming Correctly
- [ ] All colors come from token classes (`bg-primary`, `text-ink`, etc.)
- [ ] For gradients/complex styles, use CSS variables from theme system:
  ```css
  /* Example - define in your design.md or token system */
  --gradient-component: linear-gradient(90deg, var(--color-primary) 0%, var(--color-success) 100%);
  ```
  ```jsx
  // Then use in component:
  style={{ backgroundImage: 'var(--gradient-component)' }}
  ```
- [ ] Motion values reference CSS variables when possible:
  ```js
  const motionDuration = getComputedStyle(document.documentElement)
    .getPropertyValue('--motion-duration-fast')
    .trim();
  ```

#### 3.3 Ensure Accessibility
- [ ] All interactive elements have accessible names (aria-label, aria-labelledby, or visible label)
- [ ] Keyboard navigation works (test with Tab/Shift+Tab, Enter/Space, Arrow keys)
- [ ] Focus rings are visible and follow WCAG 2.1 standards
- [ ] Color contrast ratios meet WCAG 2.1 AA standards (use browser dev tools to verify)
- [ ] ARIA states update correctly (aria-checked, aria-expanded, aria-disabled, etc.)
- [ ] Live regions used appropriately for dynamic content (aria-live)

#### 3.4 Add Loading/Disabled States
- [ ] Visual indication of loading state (skeleton, spinner, or opacity change)
- [ ] Disabled state is visually distinct and non-interactive
- [ ] `aria-busy` and `aria-disabled` attributes set correctly
- [ ] Pointer events disabled when appropriate (`pointer-events-none` via Tailwind)

### Phase 4: Validation & Documentation

#### 4.1 Run Contract Verification
- [ ] Manually inspect code for contract violations
- [ ] Use grep patterns from TEST_PLAN.md to verify:
  ```bash
  # Check for hardcoded colors
  grep -r "#[0-9a-fA-F]\{3,\}\b" src/components/MyNewComponent/
  
  # Check for disallowed Tailwind colors
  grep -r "\b(text-|bg-|border-)(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-(50|100|200|300|400|500|600|700|800|900|950)\b" src/components/MyNewComponent/
  ```
- [ ] Confirm `cn()` and `forwardRef` usage:
  ```bash
  grep -r "import { cn }" src/components/MyNewComponent/
  grep -r "forwardRef" src/components/MyNewComponent/
  ```

#### 4.2 Manual Testing in Dev Server
- [ ] Start dev server: `npm run dev`
- [ ] Verify component appears in library browser
- [ ] Test all variants and prop combinations
- [ ] Verify theme switching works correctly
- [ ] Test keyboard navigation and screen reader compatibility
- [ ] Check loading and disabled states
- [ ] Verify responsive behavior at different breakpoints

#### 4.3 Documentation
- [ ] Update any relevant documentation if component introduces new patterns
- [ ] Consider adding usage examples to README if component is particularly notable
- [ ] Ensure meta.js description is clear and concise

## 🧪 Verification Checklist

Before considering the component complete, verify:

### Contract Compliance
- [ ] No hardcoded hex values
- [ ] No disallowed named Tailwind colors
- [ ] Uses `cn()` utility
- [ ] Uses `forwardRef` for interactive elements
- [ ] Proper ARIA attributes
- [ ] Framer Motion micro-interactions present
- [ ] Radix UI used where appropriate
- [ ] File structure correct

### Functional
- [ ] Renders without errors
- [ ] Accepts and uses all defined props
- [ ] Variants work as expected
- [ ] ClassName prop composes correctly
- [ ] Event handlers fire appropriately
- [ ] Loading/disabled states work correctly

### Accessibility
- [ ] Keyboard navigable
- [ ] Screen reader friendly
- [ ] Sufficient color contrast
- [ ] Focus visible and logical
- [ ] ARIA states update correctly

### Theming
- [ ] Only uses token classes from contract
- [ ] Updates correctly when theme changes
- [ ] Motion respects prefers-reduced-motion
- [ ] No hardcoded values in styles

### Integration
- [ ] Appears in library browser after dev server restart
- [ ] Metadata displays correctly
- [ ] Variants panel shows all defined options
- [ ] Component exports properly (no build errors)

## 📝 Example: Creating a Simple Button Variant

If you were creating a new button variant (following existing Button pattern):

1. **Create files**: `src/components/ButtonVariant/ButtonVariant.jsx` + `.meta.js`
2. **Implement**: Copy Button.jsx, modify variant/size classes
3. **Verify**: Uses same patterns but different styling
4. **Meta**: 
   ```js
   export default {
     name: 'ButtonVariant',
     category: 'Actions',
     description: 'A button with elevated styling.',
     variants: [
       { label: 'Default', props: {} },
       { label: 'Large', props: { size: 'lg' } }
     ]
   };
   ```

## 🚫 Common Pitfalls to Avoid

- ❌ Using hardcoded colors: `bg-[#ff385c]` or `text-blue-500`
- ❌ Missing forwardRef on interactive elements
- ❌ Not using cn() for class composition
- ❌ Forgetting ARIA attributes
- ❌ Overlooking loading/disabled states
- ❌ Using named Tailwind colors outside allowed semantic set
- ❌ Not testing theme switching
- ❌ Skipping Framer Motion micro-interactions
- ❌ Incorrect file structure or naming

## 🔄 After Creation

Once your component is implemented and verified:
1. Restart dev server if not seeing changes: `npm run dev`
2. Run through TEST_PLAN.md validation steps
3. Consider adding to examples or documentation if demonstrates new patterns
4. Monitor for any contract violations in future updates

---
*This plan should be adapted based on the specific type of component being created. Always refer to the Component Contract and existing components for guidance.*