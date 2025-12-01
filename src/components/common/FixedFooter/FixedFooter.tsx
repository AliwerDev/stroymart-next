import useAppPortal from '@/hooks/useAppPortal';
import { ComponentPropsWithoutRef, memo } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

interface RFixedFooterProps extends ComponentPropsWithoutRef<'footer'> {
  className?: string;
}

const FixedFooter = (props: RFixedFooterProps) => {
  const { portalElement } = useAppPortal('main-wrapper');

  if (!portalElement) {
    return null;
  }

  const { className, children, ...computedProps } = props;

  return createPortal(
    <footer
      className={twMerge('sticky bottom-0 z-20 w-full bg-light-gray-1 px-4 md:px-6 lg:px-[30px] py-4 md:py-5 lg:py-6', className)}
      {...computedProps}
    >
      {children}
    </footer>,
    portalElement
  );
};

export default memo(FixedFooter);
