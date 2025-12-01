import { SvgIconsCommonProps } from './SvgIcons.types';

const DiscountIcon = (props: SvgIconsCommonProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_14085_15653)">
        <path
          d="M9.99609 7.5H10.0086M9.99918 12.5H10.0117"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
        <path
          d="M6.66602 10H13.3327"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle
          cx="1.25"
          cy="1.25"
          r="1.25"
          transform="matrix(1 0 0 -1 13.334 6.66797)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.3327 10.0013V1.66798H9.99934L1.66602 10.0013L9.99937 18.3346L18.3327 10.0013Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_14085_15653">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DiscountIcon;
