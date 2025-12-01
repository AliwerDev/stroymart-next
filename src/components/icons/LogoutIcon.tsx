import { ComponentPropsWithoutRef } from 'react';

const LogoutIcon = (props: ComponentPropsWithoutRef<'svg'>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M10 3L4 6L4 18L10 21" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M20 12H10M20 12L16.9998 9M20 12L16.9998 15"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default LogoutIcon;
