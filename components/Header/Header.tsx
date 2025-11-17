'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import ButtonHamburger from 'components/Button/Hamburger';
import Container from 'components/Container';
import HeaderNavigation from 'components/Header/Navigation';
import Link from 'components/Link';
import Logo from 'components/Logo';

import useHeaderMenu from 'hooks/useHeaderMenu';
import useScrollPosition from 'hooks/useScrollPosition';
import refHeightToCss from 'utils/refHeightToCss';

import './Header.scss';

export default function Header() {
  const { close, isOpen, toggle } = useHeaderMenu();
  const scrollPosition = useScrollPosition();
  const pathname = usePathname();

  useEffect(
    () => {
      close();

      if ([ '/' ].includes(pathname)) {
        document.body.classList.add('header--always-scrolled');
      }
      else {
        document.body.classList.remove('header--always-scrolled');
      }

      return () => {
        document.body.classList.remove('header--always-scrolled');
      };
    },
    [ close, pathname ],
  );

  return (
    <Container
      as="header"
      className={ clsx('header', {
        'header--menu-open': isOpen,
        'header--scrolled': scrollPosition > 0,
      }) }
      ref={ refHeightToCss('header') }
    >
      <Link
        className="header__logo-link"
        href="/"
        onClick={ close }
        title="Home"
      >
        <Logo />
      </Link>

      <HeaderNavigation />

      <ButtonHamburger
        active={ isOpen }
        aria-label="Toggle menu"
        onClick={ toggle }
      />
    </Container>
  );
}
