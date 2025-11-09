'use client';

import * as Checkbox from '@radix-ui/react-checkbox';
import * as Label from '@radix-ui/react-label';
import clsx from 'clsx';

import IconCheck from 'components/Icon/Check';

import './Checkbox.scss';

type FormCheckboxProps = Checkbox.CheckboxProps & {
  label?: string;
};

export default function FormCheckbox({
  checked = undefined,
  className = '',
  id = '',
  label = '',
  name = '',
  value = undefined,
  ...props
}: FormCheckboxProps) {
  const inputId = id || name;

  return (
    <div
      className={ clsx('form-checkbox', className) }
    >
      <Checkbox.Root
        checked={ checked }
        className="form-checkbox__checkbox"
        id={ inputId }
        name={ name }
        value={ typeof value === 'string' ? value : undefined }
        { ...props }
      >
        <Checkbox.Indicator forceMount>
          { checked === 'indeterminate'
            ? (
              <span
                aria-hidden
                className="form-checkbox__dash"
              />
            )
            : <IconCheck /> }
        </Checkbox.Indicator>
      </Checkbox.Root>

      { !!label && (
        <Label.Root
          className="form-checkbox__label"
          htmlFor={ inputId }
        >
          { label }
        </Label.Root>
      ) }
    </div>
  );
}
