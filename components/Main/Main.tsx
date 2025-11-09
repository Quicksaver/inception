import clsx from 'clsx';

import './Main.scss';

interface MainProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Main({
  children = null,
  className = '',
}: MainProps) {
  return (
    <main
      className={ clsx('main', className) }
    >
      { children }
    </main>
  );
}
