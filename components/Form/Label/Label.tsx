import * as Label from '@radix-ui/react-label';
import clsx from 'clsx';

import './Label.scss';

export default function FormLabel({
  children,
  className = '',
  errors = null,
  htmlFor,
  label = '',
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & {
  errors?: null | string[];
  label?: string;
}) {
  return (
    <Label.Root
      className={ clsx('form-label', className) }
      htmlFor={ htmlFor }
      { ...props }
    >
      { (!!label || !!errors?.length) && (
        <span className="form-label__label">
          { !!label && `${label}${errors?.length ? ': ' : ''}` }

          { errors?.map((error, index) => (
            <span
              className="form-label__error"
              key={ error }
            >
              { index > 0 && ', ' }
              { error }
            </span>
          )) }
        </span>
      ) }

      { children }
    </Label.Root>
  );
}
