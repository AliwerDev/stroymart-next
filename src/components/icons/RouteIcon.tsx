import { SvgIconsCommonProps } from './SvgIcons.types';

const RouteIcon = (props: SvgIconsCommonProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_14360_17821)">
        <path
          d="M15.5981 8.92863C15.4375 9.0809 15.2228 9.16602 14.9994 9.16602C14.776 9.16602 14.5613 9.0809 14.4007 8.92863C12.93 7.52576 10.959 5.95861 11.9202 3.68339C12.4399 2.4532 13.6874 1.66602 14.9994 1.66602C16.3114 1.66602 17.559 2.4532 18.0787 3.68339C19.0387 5.95574 17.0725 7.53059 15.5981 8.92863Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M15 5H15.0075"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="4.16602"
          cy="15.834"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.16667 5.83398H7.91667C6.30584 5.83398 5 6.95327 5 8.33398C5 9.7147 6.30584 10.834 7.91667 10.834H10.4167C12.0275 10.834 13.3333 11.9533 13.3333 13.334C13.3333 14.7147 12.0275 15.834 10.4167 15.834H9.16667"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_14360_17821">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RouteIcon;
