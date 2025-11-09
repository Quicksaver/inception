import Icon, { SubIconProps } from 'components/Icon';

export default function IconArrow({
  label = 'Arrow',
}: SubIconProps) {
  return (
    <Icon
      className="icon-arrow"
      fill="none"
      label={ label }
      viewBox="0 0 25 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.579 12.5H5.5V11.5H17.579L11.787 5.708L12.5 5L19.5 12L12.5 19L11.787 18.292L17.579 12.5Z"
        fill="currentColor"
      />
    </Icon>
  );
}
