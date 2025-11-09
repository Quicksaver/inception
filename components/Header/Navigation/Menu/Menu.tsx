'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import Link from 'components/Link';

import useSiteSettings from 'hooks/useSiteSettings';
import features from 'utils/features';

import './Menu.scss';

export default function HeaderNavigation({
  className = '',
}: {
  className?: string;
}) {
  const { headerNavigation } = useSiteSettings();

  const pathname = usePathname();

  const filteredItems = useMemo(() => {
    return headerNavigation
      ?.filter(({ featureFlag }) => {
        if (featureFlag && !features[featureFlag as keyof typeof features]) {
          return false;
        }

        return true;
      });
  }, [ headerNavigation ]);

  return (
    <nav className={ clsx('header-navigation-menu', className) }>
      <menu>
        { filteredItems?.map(({ exact, label, path }) => (
          <li
            className={ clsx('header-navigation-menu__item', {
              'header-navigation-menu__item--active': exact ? pathname === path : pathname.startsWith(path),
            }) }
            key={ label }
          >
            <Link
              className="header-navigation-menu__link"
              href={ path }
            >
              { label }
            </Link>
          </li>
        )) }
      </menu>
    </nav>
  );
}
