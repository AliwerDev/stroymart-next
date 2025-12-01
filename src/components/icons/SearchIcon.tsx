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
      <path
        d="M18.3333 18.3334L16.6666 16.6667M17.5 9.58341C17.5 13.9557 13.9555 17.5001 9.58329 17.5001C5.21104 17.5001 1.66663 13.9557 1.66663 9.58341C1.66663 5.21116 5.21104 1.66675 9.58329 1.66675C13.9555 1.66675 17.5 5.21116 17.5 9.58341Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;
