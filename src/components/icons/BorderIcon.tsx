import { SvgIconsCommonProps } from './SvgIcons.types';

const BorderIcon = (props: SvgIconsCommonProps) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask id="path-1-inside-1_369_8735" fill="white">
        <path d="M0 12C0 5.37258 5.37258 0 12 0H30V30H0V12Z" />
      </mask>
      <path
        d="M-2 12C-2 4.26801 4.26801 -2 12 -2H30V2H12C6.47715 2 2 6.47715 2 12H-2ZM30 30H0H30ZM-2 30V12C-2 4.26801 4.26801 -2 12 -2V2C6.47715 2 2 6.47715 2 12V30H-2ZM30 0V30V0Z"
        fill="#FF6900"
        fillOpacity="0.2"
        mask="url(#path-1-inside-1_369_8735)"
      />
    </svg>
  );
};

export default BorderIcon;
