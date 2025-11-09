import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { Command } from 'cmdk';
import {
  type ComponentType,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

import IconChevron from 'components/Icon/Chevron';
import IconSearch from 'components/Icon/Search';

import useModal from 'hooks/useModal';

import './Combobox.scss';

export interface ComboboxOption {
  default?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  label: string;
  value: string;
}

export interface ComboboxProps {
  className?: string;
  clearOptionLabel?: string;
  clearOptionValue?: string;
  customFilter?: (optionValue: string, search: string) => number;
  emptyMessage?: string;
  enableSearch?: boolean;
  Icon?: ComponentType;
  onChange: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  options?: ComboboxOption[];
  placeholder: string;
  searchPlaceholder?: string;
  showClearOption?: boolean;
  showOnlyIconInSelected?: boolean;
  value?: string;
}

function replaceAccentCharacters(str: string) {
  const accents = [
    { base: 'a', letters: /[àáâãä]/g },
    { base: 'e', letters: /[èéêë]/g },
    { base: 'i', letters: /[ìíîï]/g },
    { base: 'o', letters: /[òóôõö]/g },
    { base: 'u', letters: /[ùúûü]/g },
    { base: 'c', letters: /[ç]/g },
  ];

  accents.forEach(({ base, letters }) => {
    str = str.replace(letters, base);
  });

  return str;
}

// Default filter function that handles accent normalization and multi-word search
function defaultFilterFunction(optionValue: string, search: string) {
  if (!search) {
    return 1;
  }

  const normalizedSearch = replaceAccentCharacters(search.toLowerCase());
  const normalizedOption = replaceAccentCharacters(optionValue.toLowerCase());

  // Support multi-word search
  const searchWords = normalizedSearch.split(' ').filter(word => word.length > 0);

  // All search words must be found in the option
  const matchesAll = searchWords.every(word => normalizedOption.includes(word));

  return matchesAll ? 1 : 0;
}

export default function Combobox({
  className = '',
  clearOptionLabel = 'Clear',
  clearOptionValue = '[clear]',
  customFilter = undefined,
  emptyMessage = 'No results found',
  enableSearch = false,
  Icon = undefined,
  onChange,
  onOpenChange = undefined,
  open: controlledOpen = undefined,
  options = [],
  placeholder,
  searchPlaceholder = 'Search...',
  showClearOption = false,
  showOnlyIconInSelected = false,
  value = '',
}: ComboboxProps) {
  const [ internalOpen, setInternalOpen ] = useState(false);

  // Use controlled or uncontrolled state
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  }, [ isControlled, onOpenChange ]);

  const handleValueChange = useCallback((chosen: string) => {
    onChange(chosen);

    // Close the popover after selection
    handleOpenChange(false);
  }, [ handleOpenChange, onChange ]);

  const displayValue = useMemo(
    () => {
      const selectedOption = options.find(option => option.value === value) || options.find(option => option.default);
      return selectedOption
        ? (
          <>
            { !!selectedOption.icon && (
              <div className="combobox__item-icon">
                { selectedOption.icon }
              </div>
            ) }
            { (!selectedOption.icon || !showOnlyIconInSelected) && selectedOption.label }
          </>
        )
        : placeholder;
    },
    [ options, placeholder, showOnlyIconInSelected, value ],
  );

  // Are we rendering inside a modal?
  const modal = useModal();

  return (
    <Popover.Root
      onOpenChange={ handleOpenChange }
      open={ open }
    >
      <Popover.Trigger
        className={ clsx('combobox__trigger', className, {
          'combobox__trigger--icon': !!Icon,
          'combobox__trigger--selected': value !== '' && value !== clearOptionValue,
        }) }
      >
        { !!Icon && (
          <div className="combobox__icon">
            <Icon />
          </div>
        ) }
        <span className="combobox__value">
          { displayValue }
        </span>
        <div className={ clsx('combobox__chevron', { 'combobox__chevron--open': open }) }>
          <IconChevron />
        </div>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          className={ clsx('combobox__content', {
            'combobox__content--in-modal': !!modal,
            'combobox__content--search': enableSearch,
          }) }
          side="bottom"
          sideOffset={ -1 }
        >
          <Command
            filter={ enableSearch
              ? (customFilter || defaultFilterFunction)
              : undefined }
            shouldFilter={ enableSearch }
          >
            <div className="combobox__search-wrapper">
              <IconSearch />
              <Command.Input
                className="combobox__search-input"
                placeholder={ searchPlaceholder }
              />
            </div>

            <Command.List className="combobox__list">
              <Command.Empty className="combobox__empty-message">
                { emptyMessage }
              </Command.Empty>

              <Command.Group>
                { showClearOption && (
                  <Command.Item
                    className="combobox__item combobox__item--clear"
                    onSelect={ () => handleValueChange(clearOptionValue) }
                    value={ clearOptionValue }
                  >
                    { clearOptionLabel }
                  </Command.Item>
                ) }

                { options.map(option => (
                  <Command.Item
                    className={ clsx('combobox__item', {
                      'combobox__item--disabled': option.disabled,
                    }) }
                    disabled={ option.disabled }
                    key={ option.value }
                    onSelect={ () => handleValueChange(option.value) }
                    value={ option.label }
                  >
                    { !!option.icon && (
                      <div className="combobox__item-icon">
                        { option.icon }
                      </div>
                    ) }
                    <span className="combobox__item-label">
                      { option.label }
                    </span>
                  </Command.Item>
                )) }
              </Command.Group>
            </Command.List>
          </Command>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
