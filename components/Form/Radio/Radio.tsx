'use client';

import * as Label from '@radix-ui/react-label';
import * as RadioGroup from '@radix-ui/react-radio-group';
import clsx from 'clsx';

import FormLabel from 'components/Form/Label';

import './Radio.scss';

interface FormRadioOption {
  label: string;
  value: string;
}

type FormRadioProps = Omit<RadioGroup.RadioGroupProps, 'asChild'> & {
  label?: string;
  options: FormRadioOption[];
};

export default function FormRadio({
  className = '',
  disabled,
  label = '',
  name,
  options,
  orientation = 'horizontal',
  ...props
}: FormRadioProps) {
  return (
    <FormLabel
      className={ clsx('form-radio', className) }
      htmlFor={ name }
      label={ label }
    >
      <RadioGroup.Root
        aria-label={ label || undefined }
        className={ clsx('form-radio__radio', {
          'form-radio__radio--vertical': orientation === 'vertical',
        }) }
        disabled={ disabled }
        name={ name }
        orientation={ orientation }
        { ...props }
      >
        { options.map(option => {
          const optionId = `${name || 'radio'}-${option.value}`;

          return (
            <div
              className="form-radio__option"
              key={ option.value }
            >
              <RadioGroup.Item
                className="form-radio__item"
                disabled={ disabled }
                id={ optionId }
                value={ option.value }
              >
                <RadioGroup.Indicator className="form-radio__indicator" />
              </RadioGroup.Item>

              <Label.Root
                className="form-radio__label"
                htmlFor={ optionId }
              >
                { option.label }
              </Label.Root>
            </div>
          );
        }) }
      </RadioGroup.Root>
    </FormLabel>
  );
}
