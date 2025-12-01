import { SvgIconsCommonProps } from './SvgIcons.types';

const ContactIcon = (props: SvgIconsCommonProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_14085_12423)">
      <circle
        cx="9.99935"
        cy="9.99935"
        r="8.33333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M6.25 14.1673C8.19308 12.1322 11.786 12.0363 13.75 14.1673M12.0792 7.91732C12.0792 9.06791 11.1452 10.0007 9.99294 10.0007C8.84071 10.0007 7.90664 9.06791 7.90664 7.91732C7.90664 6.76672 8.84071 5.83398 9.99294 5.83398C11.1452 5.83398 12.0792 6.76672 12.0792 7.91732Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_14085_12423">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default ContactIcon;
