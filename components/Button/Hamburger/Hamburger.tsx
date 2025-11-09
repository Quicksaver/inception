'use client';

import clsx from 'clsx';

import './Hamburger.scss';

interface HeaderMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export default function HeaderMenuButton({
  active = false,
  ...props
}: HeaderMenuButtonProps) {
  return (
    <button
      className={ clsx('button-hamburger', {
        'button-hamburger--active': active,
      }) }
      type="button"
      { ...props }
    >
      <div className="button-hamburger__icon">
        <span />
      </div>
    </button>
  );
}
