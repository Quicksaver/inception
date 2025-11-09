import clsx from 'clsx';
import { OTPInput, type RenderProps } from 'input-otp';
import { useCallback, useState } from 'react';

import FormOtpRender from 'components/Form/Otp/Render';

import './Otp.scss';

interface FormOtpProps {
  className?: string;
  groups?: number;
  inputMode?: 'decimal' | 'email' | 'numeric' | 'search' | 'tel' | 'text' | 'url';
  maxLength?: number;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  onPaste?: (otp: string) => void;
  pattern?: string;
  placeholder?: string;
  shouldAutoFocus?: boolean;
  value?: null | string;
}

export default function FormOtp({
  className = '',
  groups = 1,
  inputMode = 'numeric',
  maxLength = 6,
  onChange = () => undefined,
  onComplete = undefined,
  onPaste = () => undefined,
  pattern = undefined,
  placeholder = undefined,
  shouldAutoFocus = false,
  value = null,
}: FormOtpProps) {
  const [ otp, setOtp ] = useState<string>(value ?? '');

  const handleChange = useCallback((newValue: string) => {
    setOtp(newValue);
    onChange(newValue);

    if (onComplete && newValue.length === maxLength) {
      onComplete(newValue);
    }
  }, [ maxLength, onChange, onComplete ]);

  const pasteTransformer = useCallback((pastedText: string) => {
    onPaste(pastedText);
    return pastedText.replace(/\D/g, ''); // Remove non-digits if numeric
  }, [ onPaste ]);

  const Render = useCallback((props: RenderProps) => (
    <FormOtpRender
      groups={ groups }
      maxLength={ maxLength }
      { ...props }
    />
  ), [ groups, maxLength ]);

  return (
    <OTPInput
      autoFocus={ shouldAutoFocus }
      containerClassName={ clsx('form-otp', className) }
      inputMode={ inputMode }
      maxLength={ maxLength }
      onChange={ handleChange }
      pasteTransformer={ pasteTransformer }
      pattern={ pattern }
      placeholder={ placeholder }
      render={ Render }
      value={ value ?? otp }
    />
  );
}
