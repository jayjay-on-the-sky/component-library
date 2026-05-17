# Component Library Test Plan

This document contains various test cases in markdown format that can be used to verify the correctness of the component library. These tests focus on contract compliance, functionality, accessibility, and visual correctness.

## Table of Contents
1. [Contract Compliance Tests](#contract-compliance-tests)
2. [Functional Tests](#functional-tests)
3. [Accessibility Tests](#accessibility-tests)
4. [Visual/Regression Tests](#visualregression-tests)
5. [Theme System Tests](#themesystem-tests)
6. [Performance Tests](#performancetests)

---

## Contract Compliance Tests

These tests verify that components adhere to the [Component Contract](./COMPONENT_CONTRACT.md).

### Test CC-1: No Hardcoded Hex Colors
**Objective**: Ensure no component uses hardcoded hex color values (e.g., `#ff385c`).

**Test Procedure**:
1. Search all `.jsx` files in `/src/components` for hex color patterns
2. Verify no matches found for:
   - `#[0-9a-fA-F]{3}\b` (3-digit hex)
   - `#[0-9a-fA-F]{6}\b` (6-digit hex)
   - `rgba?\([0-9,]+\s*[0-9.]+\)` (rgb()/rgba() with numbers)
3. Exceptions allowed:
   - In SVG `fill` attributes when using `currentColor` (tested separately)
   - In CSS comments or documentation
   - In test/mock data

**Expected Result**: Zero violations found

**Pass/Fail Criteria**: 
- PASS: No hardcoded hex colors found
- FAIL: Any hardcoded hex color found

**Files to Test**: All component `.jsx` files

### Test CC-2: No Named Tailwind Colors
**Objective**: Ensure no component uses named Tailwind colors outside the allowed token list.

**Test Procedure**:
1. Search for Tailwind color classes: `(text-|bg-|border-)(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-(50|100|200|300|400|500|600|700|800|900|950)`
2. Verify matches are ONLY for allowed semantic colors:
   - `text-success`/`bg-success`
   - `text-warning`/`bg-warning` 
   - `text-error`/`bg-error`
3. All other named Tailwind colors should be flagged

**Expected Result**: Only semantic color classes found

**Pass/Fail Criteria**:
- PASS: Only allowed named Tailwind colors used
- FAIL: Disallowed named Tailwind colors found

### Test CC-3: Proper Use of cn() Utility
**Objective**: Verify `cn()` is used for class composition.

**Test Procedure**:
1. For each component file:
   - Check if `className` prop is used
   - If `className` is used dynamically (with conditionals or variables), verify it's wrapped in `cn()`
   - Static class names (without conditionals) may be used directly

**Expected Result**: All dynamic class compositions use `cn()`

**Pass/Fail Criteria**:
- PASS: All dynamic class compositions use `cn()`
- FAIL: Any dynamic class composition not using `cn()`

### Test CC-4: forwardRef on Interactive Elements
**Objective**: Ensure interactive components use `React.forwardRef`.

**Test Procedure**:
1. Identify interactive components (buttons, inputs, selects, etc.)
2. Verify each uses `React.forwardRef` or `forwardRef` from 'react'
3. Check that the ref is properly passed to the underlying DOM element

**Expected Result**: All interactive components use forwardRef

**Pass/Fail Criteria**:
- PASS: All interactive components use forwardRef
- FAIL: Any interactive component missing forwardRef

### Test CC-5: Framer Motion Micro-interactions
**Objective**: Verify interactive elements have Framer Motion interactions.

**Test Procedure**:
1. For button-like components:
   - Check for `motion.` prefix on the main element
   - Verify `whileTap`, `hover`, or similar Framer Motion props
2. For appearing elements:
   - Check for `initial` and `animate` props with opacity/scale/y transformations

**Expected Result**: Interactive components have micro-interactions

**Pass/Fail Criteria**:
- PASS: Appropriate Framer Motion usage found
- FAIL: Missing micro-interactions where expected

### Test CC-6: ARIA Attributes
**Objective**: Verify interactive components have proper ARIA attributes.

**Test Procedure**:
1. For each interactive component:
   - Check for appropriate `role` attributes
   - Verify `aria-label`, `aria-labelledby`, or `aria-describedby` where needed
   - Check for state attributes (`aria-checked`, `aria-expanded`, `aria-disabled`, etc.)
   - Verify `aria-busy` for loading states

**Expected Result**: All interactive components have appropriate ARIA attributes

**Pass/Fail Criteria**:
- PASS: ARIA attributes present where required
- FAIL: Missing ARIA attributes

### Test CC-7: Radix UI for Complex Components
**Objective**: Verify complex interactive components use Radix UI primitives.

**Test Procedure**:
1. Identify components that should use Radix UI:
   - Dialog/Modal → `@radix-ui/react-dialog`
   - Tooltip → `@radix-ui/react-tooltip`
   - Select dropdown → `@radix-ui/react-select`
   - Tabs → `@radix-ui/react-tabs`
   - Switch → `@radix-ui/react-switch`
2. Verify imports and usage

**Expected Result**: Complex components use appropriate Radix UI primitives

**Pass/Fail Criteria**:
- PASS: Radix UI used where appropriate
- FAIL: Missing Radix UI usage for complex components

---

## Functional Tests

### Test F-1: Component Rendering
**Objective**: Verify components render without errors.

**Test Procedure**:
1. Import each component in isolation
2. Render with default props
3. Check for runtime errors or warnings

**Expected Result**: All components render successfully

**Pass/Fail Criteria**:
- PASS: Component mounts and renders without errors
- FAIL: Component throws error during render

### Test F-2: Props Validation
**Objective**: Verify components handle props correctly.

**Test Procedure**:
1. Test each component with:
   - Default props
   - All valid prop combinations
   - Invalid prop types (should handle gracefully or warn)
   - Missing required props (if any)
2. Verify behavior matches expectations

**Expected Result**: Components respond appropriately to prop changes

**Pass/Fail Criteria**:
- PASS: Component behaves correctly with all prop variations
- FAIL: Component breaks or behaves unexpectedly with certain props

### Test F-3: Event Handling
**Objective**: Verify interactive components fire events correctly.

**Test Procedure**:
1. For each interactive component:
   - Simulate user interactions (click, change, keypress, etc.)
   - Verify appropriate event handlers are called
   - Check that event data is correct
2. Test disabled state prevents interactions

**Expected Result**: Events fire correctly with proper data

**Pass/Fail Criteria**:
- PASS: Events fire as expected
- FAIL: Events don't fire or fire incorrectly

### Test F-4: Children Prop Handling
**Objective**: Verify components properly handle children.

**Test Procedure**:
1. Test components that accept children:
   - With various children types (elements, text, fragments)
   - With no children
   - With nested components
2. Verify children are rendered in correct location

**Expected Result**: Children rendered correctly

**Pass/Fail Criteria**:
- PASS: Children handled correctly
- FAIL: Children missing, duplicated, or misplaced

### Test F-5: ClassName Prop Composition
**Objective**: Verify className prop works with internal classes.

**Test Procedure**:
1. Pass various className values to components
2. Verify internal classes and passed classes are correctly composed
3. Test with `cn()` utility patterns

**Expected Result**: Class names compose correctly

**Pass/Fail Criteria**:
- PASS: className prop combines correctly with internal classes
- FAIL: class override or missing classes

---

## Accessibility Tests

### Test A-1: Keyboard Navigation
**Objective**: Verify all interactive components are keyboard accessible.

**Test Procedure**:
1. Tab through each interactive component
2. Verify:
   - Focus is visible and logical
   - All actions可 via keyboard (Enter/Space for buttons, Arrow keys for selects, etc.)
   - No keyboard traps

**Expected Result**: Full keyboard accessibility

**Pass/Fail Criteria**:
- PASS: All interactive elements accessible via keyboard
- FAIL: Any interactive element not keyboard accessible

### Test A-2: Screen Reader Compatibility
**Objective**: Verify components work with screen readers.

**Test Procedure**:
1. Test with screen reader (or axe/core equivalent):
   - Check for proper labeling
   - Verify announced purpose and state
   - Ensure live regions work for dynamic content

**Expected Result**: Screen readers can understand and interact with components

**Pass/Fail Criteria**:
- PASS: No screen reader accessibility issues
- FAIL: Screen reader accessibility issues found

### Test A-3: Color Contrast
**Objective**: Verify sufficient color contrast for text and UI elements.

**Test Procedure**:
1. Use contrast checking tool (or axe/core):
   - Verify text-to-background contrast ≥ 4.5:1 (AA) or 3:1 (large text)
   - Verify UI component contrast ≥ 3:1
2. Test in both light and dark themes if applicable

**Expected Result**: Sufficient color contrast

**Pass/Fail Criteria**:
- PASS: All text and UI elements meet contrast requirements
- FAIL: Any element fails contrast requirements

### Test A-4: Focus Management
**Objective**: Verify proper focus handling in interactive components.

**Test Procedure**:
1. For components that manage focus (dialogs, menus, etc.):
   - Verify focus traps when appropriate
   - Verify focus returns to trigger after close
   - Verify initial focus is set correctly

**Expected Result**: Proper focus management

**Pass/Fail Criteria**:
- PASS: Focus handled correctly
- FAIL: Focus management issues

---

## Visual/Regression Tests

### Test V-1: Snapshot Testing
**Objective**: Verify component rendering matches expected output.

**Test Procedure**:
1. Render each component with various prop combinations
2. Capture snapshot of rendered output
3. Compare against baseline snapshots

**Expected Result**: No unexpected changes in rendering

**Pass/Fail Criteria**:
- PASS: Rendering matches snapshots (or approved changes)
- FAIL: Unexpected rendering differences

### Test V-2: Responsive Behavior
**Objective**: Verify components behave correctly at different screen sizes.

**Test Procedure**:
1. Test components at various viewport widths:
   - Mobile (< 640px)
   - Tablet (640px - 1024px)
   - Desktop (> 1024px)
2. Verify layout, interactions, and readability

**Expected Result**: Components adapt appropriately to screen size

**Pass/Fail Criteria**:
- PASS: Components work correctly at all tested breakpoints
- FAIL: Components break or become unusable at certain sizes

### Test V-3: Animation Performance
**Objective**: Verify animations perform smoothly.

**Test Procedure**:
1. Test Framer Motion animations:
   - Check for jank or dropped frames
   - Verify animation completes smoothly
   - Test with reduced motion preferences

**Expected Result**: Smooth, performant animations

**Pass/Fail Criteria**:
- PASS: Animations run smoothly at 60fps
- FAIL: Noticeable animation performance issues

---

## Theme System Tests

### Test T-1: Token Class Mapping
**Objective**: Verify token classes map to correct CSS variables.

**Test Procedure**:
1. Apply each token class to a test element
2. Inspect computed styles to verify correct CSS variable usage
3. Test with various themes loaded

**Expected Result**: Token classes resolve to correct theme values

**Pass/Fail Criteria**:
- PASS: All token classes map correctly
- FAIL: Any token class maps to wrong variable or undefined

### Test T-2: Theme Switching
**Objective**: Verify components update when theme changes.

**Test Procedure**:
1. Load a theme (design.md file)
2. Render components
3. Switch to different theme
4. Verify colors update immediately

**Expected Result**: Components re-skin when theme changes

**Pass/Fail Criteria**:
- PASS: Colors update correctly when theme changes
- FAIL: Colors don't update or update incorrectly

### Test T-3: Custom Property Fallbacks
**Objective**: Verify components handle missing CSS variables gracefully.

**Test Procedure**:
1. Remove or override CSS variables
2. Verify components don't break and use sensible fallbacks

**Expected Result**: Graceful degradation when variables missing

**Pass/Fail Criteria**:
- PASS: Components don't crash when variables missing
- FAIL: Components break or show errors when variables missing

---

## Performance Tests

### Test P-1: Bundle Impact
**Objective**: Verify components don't excessively increase bundle size.

**Test Procedure**:
1. Import component in isolation
2. Measure approximate bundle contribution
3. Compare against similar components

**Expected Result**: Reasonable bundle size impact

**Pass/Fail Criteria**:
- PASS: Bundle impact within reasonable bounds
- FAIL: Component significantly increases bundle size

### Test P-2: Render Performance
**Objective**: Verify components render efficiently.

**Test Procedure**:
1. Render component many times (e.g., 1000 instances)
2. Measure render time
3. Check for unnecessary re-renders

**Expected Result**: Efficient rendering with minimal re-renders

**Pass/Fail Criteria**:
- PASS: Acceptable render performance
- FAIL: Excessive render time or unnecessary re-renders

### Test P-3: Memory Leaks
**Objective**: Verify components don't cause memory leaks.

**Test Procedure**:
1. Mount and unmount component repeatedly
2. Monitor memory usage
3. Check for growing memory consumption

**Expected Result**: No memory leaks

**Pass/Fail Criteria**:
- PASS: Memory usage stable over mount/unmount cycles
- FAIL: Memory usage continuously increases

---

## Test Execution Guidelines

### How to Run These Tests
1. **Manual Verification**: Most tests can be performed manually by inspecting code and testing in browser
2. **Automated Tools**: Use linting tools, accessibility checkers (axe), and visual regression tools where applicable
3. **Custom Scripts**: Consider creating scripts to automate:
   - Hex color/Tailwind color detection (`grep` patterns)
   - forwardRef usage detection
   - cn() usage verification

### Test Prioritization
1. **High Priority**: Contract Compliance Tests (CC-1 through CC-7)
2. **Medium Priority**: Functional Tests (F-1 through F-5) and Accessibility Tests (A-1 through A-4)
3. **Lower Priority**: Visual/Regression, Theme System, and Performance Tests

### Reporting Results
For each test, record:
- Test ID
- Component(s) tested
- Pass/Fail status
- Detailed failure description (if applicable)
- Screenshots or code snippets (for visual tests)
- Date tested
- Tester (human or agent)

---
*This test plan should be updated as new components are added or existing components are modified.*