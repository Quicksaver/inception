import IconClose from 'components/Icon/Close';

import './Close.scss';

export default function ButtonClose(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      aria-label="close"
      className="close-button"
      type="button"
      { ...props }
    >
      <IconClose />
    </button>
  );
}
