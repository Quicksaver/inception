---
applyTo: '**'
---

# Development Instructions

## File Structure

```
app/                  # Next.js App Router routes
components/           # UI components
hooks/                # Custom React hooks
utils/                # Helper functions
scss/                 # Global styles, variables, mixins
types/                # TypeScript type definitions
```

## Component Architecture

### Structure Pattern

```
components/ComponentName/
  ComponentName.tsx          # Main component (`export default ComponentName`)
  ComponentName.scss  # Component styles
  index.ts                   # Re-export: `export { default } from './ComponentName'`
  types.ts                   # Component types (if shared)
  SubComponent/              # Sub-components (unlimited nesting)
    SubComponent.tsx         # Sub-component (`export default ComponentNameSubComponent`)
    SubComponent.scss # Sub-component styles
```

### Naming Rules

- **Component:** PascalCase from directory path
  - _components/Main/Main.tsx_ → `Main`
  - _components/Main/Sub/Item.tsx_ → `MainSubItem`
- **Imports:** Always use absolute paths, prefer clean `index.ts` re-exports

### Available Primitives

- `Button`, `Link` - All interactive elements
- `Input`, `DatePicker`, `Combobox` - Form controls
- `Modal`, `Popover`, `Tooltip` - Overlays
- `Icon` - SVG icons (children as SVG content)

## Styling Rules

### Class Name Rules

- **Block:** `.component-name`
- **Element:** `.component-name__element` (single `__` level)
- **Modifier:** `.component-name--modifier`
- **Nested:** `.component-name__element-detail` (not `__element__detail`)

### ✅ Correct Usage

- `className="dialog__header"` (string literals)
- `clsx('base', { 'base--active': isActive })` (composition)
- `--component-name-property` (custom properties)

### ❌ Common Mistakes

- `className={styles['dialog__header']}` (avoid bracket notation)
- `--property` (missing component prefix)
- `.component__element__subelement` (too many `__` levels)

### Media Breakpoints

Defined at _scss/breakpoint.scss_.

### Type Definitions Decision Tree

- **Component-specific, not shared** → Same file, not exported
- **Shared with sub-components** → Component `types.ts`, exported
- **Global, frequently used** → `types/` directory, re-export from `types/index.ts`

## Assets

### Asset Type Decision Tree

- **Raster images** (photos, complex graphics) → PNG/JPG/WEBP with `sizes` prop
- **Simple icons** (monochromatic) → SVG with `currentColor`
- **Complex icons** (multi-color, variants) → SVG with specific colors

### Images

- **Location:** Component `assets/` folder (global: `content/assets/`)
- **Import:** `import pngExample from './assets/example.png'`
- **Usage:** `<Image src={pngExample} sizes={sizes} alt="..." />`
- **`sizes` prop:** Required for raster images, omit for SVG

### SVG Icons

- **Location:** `components/Icon/Add/` (`export default IconAdd`)
- **Pattern:** Wrap in `<Icon>`, use `currentColor` for monochromatic icons, remove `height`/`width`
- **Usage:** `import IconAdd from 'components/Icon/Add'`

## Environment

### Package Manager

- Use `yarn` if yarn.lock present

### Development Commands

- **Dev server:** Assume http://localhost:3000 running, fallback to `yarn dev`
- **Dependencies:** `yarn add [package]` (or `yarn workspace [name] add [package]` for workspaces)

### ✅ Linting Workflow

1. `ESLint: Fix all auto-fixable problems`
2. `Stylelint: Fix all auto-fixable problems`
3. `php-cs-fixer: fix this file`
4. `Format Document`
5. Manual fixes

### ❌ Common Troubleshooting

- **`import/no-extraneous-dependencies` after install** → Run `Restart ESLint Server`
- **Manual fixes before VS Code commands** → Always use commands first

### Client Components

Add `'use client'` directive for:

### ✅ Requires 'use client'

- `useState`, `useEffect`, or any React hooks
- Event handlers (`onClick`, `onSubmit`)
- Browser APIs (`localStorage`, `window`)
- Zustand-based hooks

### ❌ Server Components (no directive needed)

- Static content and layouts
- Data fetching with `fetch()`
- Server-only operations

## Convex

### Schema

- Always define in `convex/schema.ts`
- Use `v` validators for type safety

### Public vs Internal Functions

- **Public**: `query`, `mutation`, `action` (exposed to Internet)
- **Internal**: `internalQuery`, `internalMutation`, `internalAction` (private)
- **Always include validators**: `args` and `returns` for all functions

### Function References & Calling

- Use `api.filename.functionName` for public functions
- Use `internal.filename.functionName` for internal functions
- Call with `ctx.runQuery()`, `ctx.runMutation()`, `ctx.runAction()`

### Index Guidelines

- Include all index fields in name: `by_field1_and_field2`
- Query fields in same order as index definition
- System fields: `_id: v.id(tableName)`, `_creationTime: v.number()`

### Query Guidelines

- Use `withIndex()` instead of `filter()` for performance
- Use `.unique()` for single document queries
- Use `.order("asc"|"desc")` for sorting (defaults to ascending `_creationTime`)

## TypeScript Guidelines

- Use `Id<"tableName">` for document IDs
- Use `Doc<"tableName">` for document types
- Define strict Record types: `Record<Id<"users">, string>`
- Use `as const` for literal types
- **TypeScript Circularity Workaround**: when calling functions in same file, use type annotation

## Examples

_.github/instructions/examples/_ contains detailed implementation patterns. Contents:

### _.github/instructions/examples/components.md_

- Button Implementation Example
- Component Export Pattern
- Props Interface Pattern
- Composite Class Names Pattern
- Import Patterns - prefer import from index.ts
- Single Hook With Related Exports Pattern
- Utils Patterns
  - Single Function
  - Namespace Approach

### _.github/instructions/examples/convex.md_

- Required Function Syntax Pattern
- HTTP Endpoints Pattern
- Validators Pattern
  - Array Validator
  - Object Validator
  - Discriminated Union
  - Always Use v.null() for null Returns
- Function Registration & Calling Pattern
- Schema Patterns
  - Tables with Relations
- Query Patterns
  - Basic Query
  - Pagination
  - Full-Text Search
  - Basic Query with Index
  - Search index
- Mutations
- Type Reference
- Actions with Node.js Runtime
- File Storage Operations
  - Get File URL (Returns null if Not Found)
  - Query File Metadata from System Table
- Scheduled Functions
- Type Definitions for Complex Returns
  - Discriminated Unions
  - Arrays of Complex Objects
- TypeScript Circularity Workaround
- Cron Jobs

### _.github/instructions/examples/scss.md_

- BEM Naming Patterns
  - ✅ Correct BEM naming
  - ❌ Common mistakes
- Component Styling Pattern
- Sub-elements (Single Level) Pattern
- Sub-sub-elements (Multiple Levels Allowed) Pattern
- CSS Custom Properties Naming Patterns
- Style Import in Component Pattern
- Mixins Pattern
- CSS Custom Properties Pattern

### _.github/instructions/examples/images.md_

- Statically Imported Image Example with Responsive Behavior (`sizes`)
- Common Size Patterns
  - Full-width responsive
  - Card/thumbnail
  - Fixed size

### _.github/instructions/examples/svg.md_

- SVG Icon Example
- Multi-Color Icon Example
- Complex Icon with Variants Example
