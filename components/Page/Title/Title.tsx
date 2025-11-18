import type { ReactNode } from 'react';

import OrnamentText from 'components/Ornament/Text';

import './Title.scss';

export default function PageTitle({
  children = null,
}: {
  children?: ReactNode;
}) {
  return (
    <h1 className="page-title">
      <OrnamentText />
      { children }
      <OrnamentText />
    </h1>
  );
}
