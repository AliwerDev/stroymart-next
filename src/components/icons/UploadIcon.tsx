import { SvgIconsCommonProps } from './SvgIcons.types';

const UploadIcon = (props: SvgIconsCommonProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 4.50021L12 14.5002M12 4.50021L9 7.50043M12 4.50021L15 7.50043"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M20 16.5L19 19.5H5L4 16.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
};

export default UploadIcon;
