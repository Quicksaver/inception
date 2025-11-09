import clsx from 'clsx';

import Link from 'components/Link';

import './Item.scss';

export default function PaginationItem({
  active,
  href,
  label,
  variant,
  ...props
}: {
  active?: boolean;
  href?: string;
  label: React.ReactNode;
  variant?: 'break' | 'next' | 'previous';
}) {
  return (
    <li className="pagination-item">
      <Link
        className={ clsx('pagination-item__link', {
          [`pagination-item__link--${variant}`]: variant,
          'pagination-item__link--active': active,
        }) }
        disabled={ !href }
        href={ href || '' }
        { ...props }
      >
        { label }
      </Link>
    </li>
  );
}
