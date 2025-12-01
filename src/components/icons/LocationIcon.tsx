import { SvgIconsCommonProps } from './SvgIcons.types';

const LocationIcon = (props: SvgIconsCommonProps) => {
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
        d="M12.9173 9.16667C12.9173 10.7775 11.6115 12.0833 10.0007 12.0833C8.38982 12.0833 7.08398 10.7775 7.08398 9.16667C7.08398 7.55584 8.38982 6.25 10.0007 6.25C11.6115 6.25 12.9173 7.55584 12.9173 9.16667Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M17.5 9.16601C17.5 14.9993 10 18.3327 10 18.3327C10 18.3327 2.5 14.9993 2.5 9.16601C2.5 5.02388 5.85786 1.66602 10 1.66602C14.1421 1.66602 17.5 5.02388 17.5 9.16601Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default LocationIcon;
