import { SvgIconsCommonProps } from './SvgIcons.types';

const SearchIcon = (props: SvgIconsCommonProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="9.21552"
        cy="9.21601"
        r="5.88495"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.6695 16.67L13.3765 13.377L16.6695 16.67Z"
        fill="currentColor"
      />
      <path
        d="M16.6695 16.67L13.3765 13.377"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;
