import clsx from 'clsx';
import { type SlotProps } from 'input-otp';

import './Slot.scss';

export default function FormOtpSlot({
  char,
  hasFakeCaret,
  isActive,
  placeholderChar,
}: SlotProps) {
  return (
    <div
      className={ clsx('form-otp-slot', {
        'form-otp-slot--active': isActive,
      }) }
    >
      <div className="form-otp-slot__content">
        { char ?? placeholderChar }
      </div>
      { hasFakeCaret && <div className="form-otp-slot__caret" /> }
    </div>
  );
}
