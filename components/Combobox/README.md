# Combobox Component

A reusable combobox component built with Radix UI Popover and cmdk, providing search functionality with keyboard navigation and accessibility features.

## Features

- **Search functionality** - Real-time filtering with accent normalization
- **Multi-word search** - Support for searching multiple words
- **Keyboard navigation** - Arrow keys, Enter to select, Escape to close
- **Custom filtering** - Provide your own filter function
- **Clear option** - Optional "clear" item to reset selection
- **Accessibility** - Built with Radix UI and cmdk for screen reader support
- **Customizable styling** - CSS classes for complete visual customization

## Usage

```tsx
import Combobox, { type ComboboxOption } from 'components/Combobox';

const options: ComboboxOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', disabled: true },
];

function MyComponent() {
  const [value, setValue] = useState('');

  return (
    <Combobox
      options={options}
      value={value}
      onValueChange={setValue}
      placeholder="Select a fruit..."
      enableSearch
      searchPlaceholder="Search fruits..."
      showClearOption
      clearOptionLabel="None"
      emptyMessage="No fruits found"
    />
  );
}
```

## Props

| Prop                | Type                                              | Default              | Description                          |
| ------------------- | ------------------------------------------------- | -------------------- | ------------------------------------ |
| `options`           | `ComboboxOption[]`                                | -                    | Array of selectable options          |
| `value`             | `string`                                          | `''`                 | Currently selected value             |
| `onValueChange`     | `(value: string) => void`                         | -                    | Called when selection changes        |
| `placeholder`       | `string`                                          | -                    | Placeholder text when no selection   |
| `enableSearch`      | `boolean`                                         | `false`              | Enable search input                  |
| `searchPlaceholder` | `string`                                          | `'Search...'`        | Search input placeholder             |
| `showClearOption`   | `boolean`                                         | `false`              | Show clear/reset option              |
| `clearOptionLabel`  | `string`                                          | `'Clear'`            | Label for clear option               |
| `clearOptionValue`  | `string`                                          | `'[clear]'`          | Value for clear option               |
| `emptyMessage`      | `string`                                          | `'No results found'` | Message when no options match        |
| `className`         | `string`                                          | `''`                 | CSS class for trigger element        |
| `open`              | `boolean`                                         | -                    | Control open state (controlled mode) |
| `onOpenChange`      | `(open: boolean) => void`                         | -                    | Called when open state changes       |
| `customFilter`      | `(optionValue: string, search: string) => number` | -                    | Custom filter function               |

## Styling

The component uses CSS classes with the `combobox__` prefix:

- `.combobox__trigger` - The clickable trigger element
- `.combobox__content` - The dropdown content container
- `.combobox__search-input` - The search input field
- `.combobox__item` - Individual option items
- `.combobox__empty-message` - Empty state message

## ComboboxOption Interface

```tsx
interface ComboboxOption {
  disabled?: boolean;
  label: string;
  value: string;
}
```
