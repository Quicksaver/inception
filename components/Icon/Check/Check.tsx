import Icon, { SubIconProps } from 'components/Icon';

export default function IconCheck({
  label = 'Check',
}: SubIconProps) {
  return (
    <Icon
      className="icon-check"
      fill="none"
      label={ label }
      viewBox="0 0 19 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 8.94444L6.17391 14L18 1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Icon>
  );
}
