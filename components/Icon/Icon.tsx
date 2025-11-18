import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import clsx from 'clsx';

import './Icon.scss';

interface IconProps extends AccessibleIcon.AccessibleIconProps, React.SVGProps<SVGSVGElement> {
  as?: React.ElementType;
  className?: string;
}

export type SubIconProps = {
  label?: string;
};

export default function Icon({
  as: Component = 'svg',
  children = null,
  className = '',
  label,
  ...props
}: IconProps) {
  return (
    <AccessibleIcon.Root label={ label }>
      <Component
        className={ clsx('icon', className) }
        { ...props }
      >
        { children }
      </Component>
    </AccessibleIcon.Root>
  );
}
