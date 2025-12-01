import { SvgIconsCommonProps } from './SvgIcons.types';

const PencilIcon = (props: SvgIconsCommonProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.41018 13.0167L13.0152 4.41172C13.3402 4.08672 13.8677 4.08672 14.1927 4.41172L15.5893 5.80839C15.9143 6.13339 15.9143 6.66089 15.5893 6.98589L6.98352 15.5901C6.82768 15.7467 6.61602 15.8342 6.39518 15.8342H4.16602V13.6051C4.16602 13.3842 4.25352 13.1726 4.41018 13.0167Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.459 5.9668L14.034 8.5418"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PencilIcon;
