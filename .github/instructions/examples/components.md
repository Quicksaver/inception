# Components

## Button Implementation Example

```tsx
// components/Button/Button.tsx
import * as Primitive from '@radix-ui/react-primitive';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'link';
  active?: boolean;
  asChild?: boolean;
}

export default function Button({
  active = false,
  children = null,
  className = '',
  variant = 'primary',
  asChild = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? Primitive.Slot : 'button';

  return (
    <Component
      className={clsx(styles.button, styles[`button--${variant}`], { [styles['button--active']]: active }, className)}
      {...props}
    >
      {children}
    </Component>
  );
}
```

## Component Export Pattern

```ts
// components/Button/index.ts
export { default } from './Button';
```

## Props Interface Pattern

```tsx
interface SelectProps extends Omit<React.ComponentProps<typeof Select.Root>, 'value' | 'onValueChange'> {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  options: { value: string; label: string; disabled?: boolean }[];
}

interface DialogProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
```

## Composite Class Names Pattern

```tsx
clsx('fixed-name', comingFromProp, comingFromVariable, {
  'fixed-name--specific': someCondition,
  [`fixed-name--${dynamicValue}`]: dynamicValue,
  [`fixed-name--${anotherDynamicValue}`]: anotherCondition,
});
```

## Import Patterns - prefer import from index.ts

```tsx
// import HeaderNavigationItem from 'components/Header/Navigation/Item/Item';
import HeaderNavigationItem from 'components/Header/Navigation/Item';
import Link from 'components/Link';
import { useAuth } from 'hooks/useAuth';
```

## Single Hook With Related Exports Pattern

```ts
// hooks/useAuth.ts
export default function useAuth() {
  /* ... */
}
export function getAuth() {
  /* ... */
} // Additional exports allowed
export type AuthState = {
  /* ... */
}; // Related types
```

## Utils Patterns

### Single Function

```ts
// utils/formatDate.ts
export default function formatDate(date: Date): string {
  /* ... */
}
```

### Namespace Approach

```ts
// utils/date.ts
export function short(date: Date) {
  /* ... */
}
export function long(date: Date) {
  /* ... */
}
export const TIMEZONES = {
  /* ... */
};
```
