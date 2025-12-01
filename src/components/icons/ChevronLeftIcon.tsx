import { SvgIconsCommonProps } from './SvgIcons.types';

const ChevronLeftIcon = (props: SvgIconsCommonProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.21978 12.6662C9.01806 12.6669 8.82687 12.5762 8.69978 12.4195L5.47978 8.41955C5.27757 8.17355 5.27757 7.81888 5.47978 7.57288L8.81312 3.57288C9.04876 3.28938 9.46961 3.25057 9.75312 3.48621C10.0366 3.72186 10.0754 4.14271 9.83978 4.42621L6.85978 7.99955L9.73978 11.5729C9.90625 11.7727 9.94132 12.0511 9.82961 12.2859C9.71791 12.5208 9.47983 12.6693 9.21978 12.6662Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ChevronLeftIcon;
