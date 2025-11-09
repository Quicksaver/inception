import clsx from 'clsx';

import FormLabel from 'components/Form/Label';

import './Input.scss';

interface BaseFormInputProps {
  errors?: null | string[];
  label?: string;
  ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
}

interface InputProps extends BaseFormInputProps, React.InputHTMLAttributes<HTMLInputElement> {
  type?: Exclude<React.HTMLInputTypeAttribute, 'textarea'>;
}

interface TextareaProps extends BaseFormInputProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  type: 'textarea';
}

export default function FormInput({
  className = '',
  errors = null,
  label = '',
  name = '',
  type = 'text',
  ...props
}: InputProps | TextareaProps) {
  return (
    <FormLabel
      className={ clsx('form-input', className, {
        'form-input--errored': errors?.length,
      }) }
      errors={ errors }
      htmlFor={ name }
      label={ label }
    >
      { type === 'textarea'
        ? (
          <textarea
            className="form-input__input"
            id={ name }
            name={ name }
            { ...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>) }
          />
        )
        : (
          <input
            className="form-input__input"
            id={ name }
            name={ name }
            type={ type }
            { ...(props as React.InputHTMLAttributes<HTMLInputElement>) }
          />
        ) }
    </FormLabel>
  );
}
