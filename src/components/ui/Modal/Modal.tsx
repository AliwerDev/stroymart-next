'use client';
import { cn, isNumber } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import Typography from '../Typography';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean; // New prop to control close button visibility
  isFullscreen?: boolean; // Default to false for backwards compatibility
  width?: string | number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  bodyClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  title,
  showCloseButton = true, // Default to true for backwards compatibility
  isFullscreen = false,
  width = 'max-w-xl',
  prefix,
  suffix,
  bodyClassName,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto p-3">
      {!isFullscreen && (
        <div className="bg-gray-950/40 fixed inset-0 h-full w-full" onClick={onClose}></div>
      )}
      <div
        ref={modalRef}
        className={`no-scrollbar relative max-h-[95vh] min-h-40 w-full overflow-y-auto rounded-2xl bg-white dark:bg-gray-900 ${className} ${!isNumber(width) ? width : ''}`}
        style={isNumber(width) ? { maxWidth: `${width}px` } : {}}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="border-bunker-100 modal-header flex items-center justify-between gap-4 border-b p-5">
            {prefix}
            <Typography variant="h3-bl-24">{title}</Typography>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="bg-bunker-50 cursor-pointer text-bunker-950 hover:bg-bunker-100 flex h-9.5 w-9.5 items-center justify-center rounded-full transition-colors sm:h-11 sm:w-11"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            )}
            {suffix}
          </div>
        )}
        <div className={cn('modal-content p-6', bodyClassName)}>{children}</div>
      </div>
    </div>
  );
};
