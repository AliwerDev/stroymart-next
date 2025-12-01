import { SvgIconsCommonProps } from './SvgIcons.types';

const WarningIcon = (props: SvgIconsCommonProps) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_14809_21226)">
        <path
          d="M12.8327 7.00065C12.8327 3.77899 10.221 1.16732 6.99935 1.16732C3.77769 1.16732 1.16602 3.77899 1.16602 7.00065C1.16602 10.2223 3.77769 12.834 6.99935 12.834C10.221 12.834 12.8327 10.2223 12.8327 7.00065Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M7.00065 5.83464H7.75065V5.08464H7.00065V5.83464ZM7.00065 5.83464H6.25065V9.91797H7.00065H7.75065V5.83464H7.00065ZM5.83398 5.83464V6.58464H7.00065V5.83464V5.08464H5.83398V5.83464ZM7.00065 3.79297H6.25065V4.66797H7.00065H7.75065V3.79297H7.00065Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_14809_21226">
          <rect width="14" height="14" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default WarningIcon;
