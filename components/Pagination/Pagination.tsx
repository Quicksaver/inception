import clsx from 'clsx';
import { type ReactNode } from 'react';

import PaginationItem from 'components/Pagination/Item';

import './Pagination.scss';

export default function Pagination({
  breakLabel = '...',
  className,
  current,
  hrefBuilder = () => '',
  nextLabel = '>',
  pageRangeDisplayed = 2,
  previousLabel = '<',
  total,
}: {
  breakLabel?: string;
  className?: string;
  current: number;
  hrefBuilder?: (page: number) => string;
  nextLabel?: ReactNode;
  pageRangeDisplayed?: number;
  previousLabel?: ReactNode;
  total: number;
}) {
  if (!total) {
    return null;
  }

  return (
    <ul className={ clsx('pagination', className) }>
      { current > 1 && (
        <PaginationItem
          href={ hrefBuilder(current - 1) }
          label={ previousLabel }
          variant="previous"
        />
      ) }

      { current > 1 && (
        <PaginationItem
          href={ hrefBuilder(1) }
          label={ 1 }
        />
      ) }

      { current > pageRangeDisplayed + 2 && (
        <PaginationItem
          label={ breakLabel }
          variant="break"
        />
      ) }

      { Array.from({ length: pageRangeDisplayed }).map((_, index) => {
        const page = current - (pageRangeDisplayed - index);
        return page > 1 && (
          <PaginationItem
            href={ hrefBuilder(page) }
            key={ page }
            label={ page }
          />
        );
      }) }

      <PaginationItem
        active
        label={ current }
      />

      { Array.from({ length: pageRangeDisplayed }).map((_, index) => {
        const page = current + index + 1;
        return page < total && (
          <PaginationItem
            href={ hrefBuilder(page) }
            key={ page }
            label={ page }
          />
        );
      }) }

      { current < total - pageRangeDisplayed - 1 && (
        <PaginationItem
          label={ breakLabel }
          variant="break"
        />
      ) }

      { current < total && (
        <PaginationItem
          href={ hrefBuilder(total) }
          label={ total }
        />
      ) }

      { current < total && (
        <PaginationItem
          href={ hrefBuilder(current + 1) }
          label={ nextLabel }
          variant="next"
        />
      ) }
    </ul>
  );
}
