import { SvgIconsCommonProps } from './SvgIcons.types';

const ProductIcon = (props: SvgIconsCommonProps) => {
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
        d="M2 22V8H22V22H2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2 8L5 2L19 2.00001L22 8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8V2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 12H15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
};

export default ProductIcon;
