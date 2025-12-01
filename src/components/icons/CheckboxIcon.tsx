import { SvgIconsCommonProps } from './SvgIcons.types';

interface CheckboxIconProps extends SvgIconsCommonProps {
  checked?: boolean;
}

const CheckboxIcon: React.FC<CheckboxIconProps> = ({ checked = false, ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="2"
        y="2"
        width="12"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill={checked ? 'currentColor' : 'none'}
      />
      {checked && (
        <path
          d="M6 8L8 10L10 6"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
};

export default CheckboxIcon;
