import { SvgIconsCommonProps } from './SvgIcons.types';

const ExitIcon = (props: SvgIconsCommonProps) => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.95891 4.29289C5.34943 3.90237 5.9826 3.90237 6.37312 4.29289L8.66602 6.58579L10.9589 4.29289C11.3494 3.90237 11.9826 3.90237 12.3731 4.29289C12.7636 4.68342 12.7636 5.31658 12.3731 5.70711L10.0802 8L12.3731 10.2929C12.7636 10.6834 12.7636 11.3166 12.3731 11.7071C11.9826 12.0976 11.3494 12.0976 10.9589 11.7071L8.66602 9.41421L6.37312 11.7071C5.9826 12.0976 5.34943 12.0976 4.95891 11.7071C4.56838 11.3166 4.56838 10.6834 4.95891 10.2929L7.2518 8L4.95891 5.70711C4.56838 5.31658 4.56838 4.68342 4.95891 4.29289Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ExitIcon;
