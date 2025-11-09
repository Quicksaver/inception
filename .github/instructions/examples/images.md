# Images

## Statically Imported Image Example with Responsive Behavior (`sizes`)

```tsx
import pngExample from './assets/example.png';

// First condition to hit top-to-bottom applies size.
// Keep out of render cycle, or memoized.
const sizes = [
  { condition: 'until-small', size: '100vw' },
  { condition: 'max-width: 900px', size: '50vw' },
  { condition: 'only-large', size: '33.3vw' },
  { condition: 'tablet', size: '25vw' },
  { size: '770px' },
];

export default function Example() {
  return (
    <Image
      alt="Example"
      sizes={sizes}
      src={pngExample}
    />
  );
}
```

## Common Size Patterns

### Full-width responsive

```tsx
const sizes = [{ condition: 'until-small', size: '100vw' }, { size: '1200px' }];
```

### Card/thumbnail

```tsx
const sizes = [{ condition: 'until-small', size: '50vw' }, { size: '300px' }];
```

### Fixed size

```tsx
const sizes = '48px';
```
