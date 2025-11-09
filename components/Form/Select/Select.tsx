'use client';

import clsx from 'clsx';
import { type ComponentType, useState } from 'react';

import Combobox, {
  type ComboboxOption,
  type ComboboxProps,
} from 'components/Combobox';
import FormLabel from 'components/Form/Label';

interface FormSelectProps extends Omit<ComboboxProps, 'onChange' | 'placeholder' | 'value'> {
  className?: string;
  Icon?: ComponentType;
  isClearable?: boolean;
  isSearchable?: boolean;
  label?: string;
  name: string;
  options?: ComboboxOption[];
  placeholder?: string;
}

export default function FormSelect({
  className = '',
  Icon = undefined,
  isClearable = false,
  isSearchable = true,
  label = '',
  name,
  options = [],
  placeholder = 'Select an option',
  ...props
}: FormSelectProps) {
  const [ value, setValue ] = useState(options.find(option => option.default)?.value || '');

  return (
    <FormLabel
      className={ clsx('form-select', className) }
      htmlFor={ name }
      label={ label }
    >
      <Combobox
        className="form-select__combobox"
        enableSearch={ isSearchable }
        Icon={ Icon }
        onChange={ setValue }
        options={ options }
        placeholder={ placeholder }
        searchPlaceholder="Search..."
        showClearOption={ isClearable }
        value={ value }
        { ...props }
      />
      { /* Hidden input for form compatibility */ }
      <input
        name={ name }
        type="hidden"
        value={ value }
      />
    </FormLabel>
  );
}
