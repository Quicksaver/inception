# SCSS

## BEM Naming Patterns

### ✅ Correct BEM naming

```scss
.dialog {
  /* Block */
}
.dialog__container {
  /* Element (not .dialog-container) */
}
.dialog__header {
  /* Element (not .dialog-header) */
}
.dialog__header-title {
  /* Nested element (not .dialog__header__title) */
}
.dialog--active {
  /* Modifier */
}
```

### ❌ Common mistakes

```scss
.dialog-container {
  /* Wrong: should be dialog__container */
}
.dialog__header__title {
  /* Wrong: should be dialog__header-title */
}
```

## Component Styling Pattern

```scss
.button {
  --button-padding-x: 32px;
  --button-padding-y: 12px;

  display: inline-flex;
  padding: var(--button-padding-y) var(--button-padding-x);

  &[data-state='on'] {
    background-color: var(--color-primary);
  }
}
```

## Sub-elements (Single Level) Pattern

```scss
.button__icon {
  height: 24px;
}
```

## Sub-sub-elements (Multiple Levels Allowed) Pattern

```scss
.button__icon-wrapper {
  display: flex;

  .icon {
    width: 16px;
  }

  .button--disabled & {
    opacity: 0.8;
  }
}
```

## CSS Custom Properties Naming Patterns

```scss
// components/Button/Button.scss
.button {
  --button-color: var(--color-secondary);
  --button-background: var(--color-primary);

  color: var(--button-color);
  background-color: var(--button-background);
}

.button--primary {
  --button-color: var(--color-primary);
  --button-background: var(--color-secondary);
}

// components/Main/Sub/Item/Item.scss
.main-sub-item {
  --main-sub-item-background: var(--color-primary);
  --main-sub-item-border: var(--color-gray);
}

.main-sub-item--active {
  --main-sub-item-background: var(--color-gray);
}
```

## Style Import in Component Pattern

```tsx
// components/Button/Button.tsx
import { useState } from 'react';
import clsx from 'clsx';

import Button from 'components/Button';

import './Button.scss';
```

## Mixins Pattern

```scss
@use 'scss/alpha' as *; /* For @include alpha(...) */
@use 'scss/breakpoint' as *; /* For @include breakpoint(...) */
```

## CSS Custom Properties Pattern

Use global CSS custom properties directly.

```scss
/* ❌ don't @import or @use these */
// @use 'scss/colors' as *; /* Color variables */
// @use 'scss/fonts' as *; /* Font size variables */

.item {
  color: var(--color-secondary);
  font-size: var(--font-size-label);
  font-family: var(--font-main); /* ❌ don't set if main font */
  font-family: var(--font-monospace); /* ✅ set if not main font */
}
```
