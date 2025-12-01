import { SvgIconsCommonProps } from './SvgIcons.types';

const PlusIcon = (props: SvgIconsCommonProps) => {
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
        d="M10.9984 13H4.99805V11H10.9984V5H12.9985V11H18.9988V13H12.9985V19H10.9984V13Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default PlusIcon;
