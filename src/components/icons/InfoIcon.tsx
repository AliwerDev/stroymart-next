import { SvgIconsCommonProps } from './SvgIcons.types';

const InfoIcon = (props: SvgIconsCommonProps) => {
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
        cx="10"
        cy="10"
        r="7.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10 9V14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="10"
        cy="6.5"
        r="0.75"
        fill="currentColor"
      />
    </svg>
  );
};

export default InfoIcon;
