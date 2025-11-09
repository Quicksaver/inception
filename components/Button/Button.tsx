import clsx from 'clsx';

import Link from 'components/Link';

import './Button.scss';

interface ButtonElementProps {
  active?: boolean;
  href?: null | string | URL;
  theme?: 'gold' | 'grey' | 'grey-outline' | 'link' | 'none' | 'outline' | 'primary';
}

type ButtonProps = ButtonElementProps
  & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
  & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  active = false,
  children = null,
  className = '',
  href = null,
  theme = 'primary',
  ...props
}: ButtonProps) {
  const classes = clsx('button', className, {
    [`button--${theme}`]: theme,
    'button--active': active,
  });

  if (!href) {
    return (
      <button
        className={ classes }
        type="button"
        { ...props }
      >
        { children }
      </button>
    );
  }

  return (
    <Link
      className={ classes }
      href={ href }
      { ...props }
    >
      { children }
    </Link>
  );
}
