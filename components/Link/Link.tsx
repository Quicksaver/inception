'use client';

import clsx from 'clsx';
import type { Route } from 'next';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import useHeaderMenu from 'hooks/useHeaderMenu';
import getBaseUrl from 'utils/getBaseUrl';

import './Link.scss';

const getOffsetTop = (node: HTMLElement | null): number => (node
  ? node.offsetTop + getOffsetTop(node.offsetParent as HTMLElement)
  : 0);

const scrollTo = ({ behavior, fallbackToTop, node }: {
  behavior?: ScrollBehavior;
  fallbackToTop?: boolean;
  node: HTMLElement | null | string;
}) => {
  const el: HTMLElement | null = typeof node === 'string'
    ? document.getElementById(node)
    : node;

  if (el) {
    // node.scrollIntoView({
    //   behavior: 'smooth',
    //   // block: 'center',
    // });
    window.scrollTo({
      behavior: behavior || 'smooth',
      top: getOffsetTop(el) - 128,
    });
    return;
  }

  if (fallbackToTop) {
    window.scrollTo({
      behavior: behavior || 'smooth',
      top: 0,
    });
  }
};

interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  disabled?: boolean;
  href?: null | string | URL;
  scroll?: boolean | null;
}

export default function Link({
  children = null,
  className = '',
  disabled = false,
  href = null,
  scroll = null,
  ...props
}: LinkProps) {
  const pathname = usePathname();
  const { close } = useHeaderMenu();

  const hrefStr = useMemo<string>(() => String(href ?? ''), [ href ]);

  const url = useMemo(() => {
    const baseUrl = getBaseUrl();
    return hrefStr.includes(baseUrl) ? hrefStr.replace(baseUrl, '') : hrefStr;
  }, [ hrefStr ]);

  const isAbsolute = useMemo(() => /^http(s)?/.test(url), [ url ]);

  const options = useMemo(() => {
    const _options = {
      onClick: (event: React.MouseEvent) => {
        close();

        if (
          !isAbsolute
          && (
            hrefStr.startsWith('#')
            || hrefStr.startsWith(`${pathname}#`))
        ) {
          const id = hrefStr.split('#').pop();

          const el: HTMLElement | null = document.querySelector(`[name="${id}"]`) || document.querySelector(`#${id}`);
          if (el) {
            event.preventDefault();
            scrollTo({ node: el });
          }
        }
      },
    };

    return _options;
  }, [ close, hrefStr, isAbsolute, pathname ]);

  const classNames = clsx('link', className, {
    'link--disabled': disabled || !url,
  });

  if (isAbsolute) {
    return (
      <a
        className={ classNames }
        href={ url }
        rel="noopener noreferrer"
        target="_blank"
        { ...options }
        { ...props }
      >
        { children }
      </a>
    );
  }

  return (
    <NextLink
      className={ classNames }
      href={ url as Route }
      scroll={ scroll ?? true }
      { ...options }
      { ...props }
    >
      { children }
    </NextLink>
  );
}
