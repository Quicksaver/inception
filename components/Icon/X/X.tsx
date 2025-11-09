import Icon, { SubIconProps } from 'components/Icon';

export default function IconX({
  label = 'X',
}: SubIconProps) {
  return (
    <Icon
      className="icon-x"
      fill="none"
      label={ label }
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.901 1.15308H22.581L14.541 10.3431L24 22.8461H16.594L10.794 15.2621L4.156 22.8461H0.474L9.074 13.0161L0 1.15408H7.594L12.837 8.08608L18.901 1.15308ZM17.61 20.6441H19.649L6.486 3.24008H4.298L17.61 20.6441Z"
        fill="currentColor"
      />
    </Icon>
  );
}
