import { SvgIconsCommonProps } from './SvgIcons.types';

const TrashIcon = (props: SvgIconsCommonProps) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.9509 17.5031H7.04602C6.06585 17.5031 5.25094 16.7485 5.17576 15.7712L4.37109 5.31055H15.6258L14.8211 15.7712C14.7459 16.7485 13.931 17.5031 12.9509 17.5031V17.5031Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.669 5.30942H3.33008"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.65469 2.49609H12.3441C12.8621 2.49609 13.282 2.916 13.282 3.43398V5.30977H6.7168V3.43398C6.7168 2.916 7.1367 2.49609 7.65469 2.49609Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6395 9.06055V13.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.35825 9.06055V13.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TrashIcon;
