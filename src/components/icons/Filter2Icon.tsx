import { SvgIconsCommonProps } from './SvgIcons.types';

const Filter2Icon = (props: SvgIconsCommonProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3 17H9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M18 17L21 17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M15 7L21 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 4H6V10H12V4Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 14H12V20H18V14Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
};

export default Filter2Icon;
