'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';

import HeaderNavigationMenu from 'components/Header/Navigation/Menu';

import useHeaderMenu from 'hooks/useHeaderMenu';

import './Navigation.scss';

export default function HeaderNavigation() {
  const { close, isOpen } = useHeaderMenu();

  return (
    <>
      <PopoverPrimitive.Root
        modal
        open={ isOpen }
      >
        <PopoverPrimitive.Content
          className="header-navigation"
          onEscapeKeyDown={ close }
          onFocusOutside={ close }
          onInteractOutside={ close }
          onPointerDownOutside={ close }
          side="bottom"
          sideOffset={ 0 }
        >
          <button
            aria-label="Close navigation menu"
            className="header-navigation__overlay"
            onClick={ close }
            tabIndex={ -1 }
            type="button"
          />
          <HeaderNavigationMenu className="header-navigation__menu--mobile" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>

      <HeaderNavigationMenu className="header-navigation__menu--desktop" />
    </>
  );
}
