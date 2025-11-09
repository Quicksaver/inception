import Icon, { SubIconProps } from 'components/Icon';

export default function IconChevron({
  label = 'Chevron',
}: SubIconProps) {
  return (
    <Icon
      className="icon-chevron"
      fill="none"
      label={ label }
      viewBox="0 0 12 7"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.99941 6.70802L0.691406 1.40002L1.39941 0.692017L5.99941 5.29202L10.5994 0.692017L11.3074 1.40002L5.99941 6.70802Z"
        fill="currentColor"
      />
    </Icon>
  );
}
