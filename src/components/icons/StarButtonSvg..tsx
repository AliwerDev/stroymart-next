import { SvgIconsCommonProps } from './SvgIcons.types';

const StarButtonSvg = (props: SvgIconsCommonProps) => {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="40" height="40" rx="12" fill="#389DD1" />
      <path
        d="M21.73 11.5101L23.49 15.0301C23.73 15.5201 24.37 15.9901 24.91 16.0801L28.1 16.6101C30.14 16.9501 30.62 18.4301 29.15 19.8901L26.67 22.3701C26.25 22.7901 26.02 23.6001 26.15 24.1801L26.86 27.2501C27.42 29.6801 26.13 30.6201 23.98 29.3501L20.99 27.5801C20.45 27.2601 19.56 27.2601 19.01 27.5801L16.02 29.3501C13.88 30.6201 12.58 29.6701 13.14 27.2501L13.85 24.1801C13.98 23.6001 13.75 22.7901 13.33 22.3701L10.85 19.8901C9.39003 18.4301 9.86003 16.9501 11.9 16.6101L15.09 16.0801C15.62 15.9901 16.26 15.5201 16.5 15.0301L18.26 11.5101C19.22 9.60014 20.78 9.60014 21.73 11.5101Z"
        fill="white"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default StarButtonSvg;
