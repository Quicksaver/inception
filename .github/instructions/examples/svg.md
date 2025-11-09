# SVG

## SVG Icon Example

```tsx
import Icon from 'components/Icon';

export default function IconChevron() {
  return (
    <Icon
      className="icon-chevron"
      fill="none"
      viewBox="0 0 12 7"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.99941 6.70802L0.691406 1.40002L1.39941 0.692017L5.99941 5.29202L10.5994 0.692017L11.3074 1.40002L5.99941 6.70802Z"
        fill="currentColor"
      />
    </Icon>
  );
}
```

## Multi-Color Icon Example

```tsx
import Icon from 'components/Icon';

export default function IconLogo() {
  return (
    <Icon
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="#3B82F6"
      />
      <path
        d="M8 12l3 3 5-5"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
    </Icon>
  );
}
```

## Complex Icon with Variants Example

```tsx
import Icon from 'components/Icon';

type IconSettingsProps = {
  variant: 'primary' | 'secondary';
};

export default function IconSettings({ variant }: IconSettingsProps) {
  switch (variant) {
    case 'secondary':
      return (
        <Icon
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              d="M12 8v8"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              d="M8 12h8"
              stroke="currentColor"
              strokeWidth="3"
            />
          </g>
          <circle
            cx="12"
            cy="12"
            r="7"
            stroke="currentColor"
            strokeWidth="3"
          />
        </Icon>
      );

    case 'primary':
    default:
      return (
        <Icon
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              d="M12 8v8"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M8 12h8"
              stroke="currentColor"
              strokeWidth="2"
            />
          </g>
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="2"
          />
        </Icon>
      );
  }
}
```
