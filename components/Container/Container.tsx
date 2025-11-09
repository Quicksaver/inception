import clsx from 'clsx';

import ImageBackground from 'components/Image/Background';

import './Container.scss';

interface ContainerProps extends React.ComponentProps<React.ElementType> {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  src?: string;
}

export default function Container({
  as: Component = 'div',
  children,
  className = '',
  src = '',
  ...props
}: ContainerProps) {
  const classNames = clsx('container', className);

  if (!src) {
    return (
      <Component
        className={ classNames }
        { ...props }
      >
        { children }
      </Component>
    );
  }

  return (
    <ImageBackground
      as={ Component }
      className={ classNames }
      src={ src }
      { ...props }
    >
      { children }
    </ImageBackground>
  );
}
