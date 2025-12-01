import { cn } from '@/lib/utils';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import React, { ReactNode, useEffect, useState } from 'react';
import DropdownItem from './DropdownItem';

interface DropdownProps {
  options?: string[];
  onSelect?: (value: string) => void;
  renderButton?: (props: { selected: string | null; isOpen: boolean }) => ReactNode;
  children?: ReactNode;
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end';
  active?: boolean;
  className?: string;
  popoverClassName?: string;
  value?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  onSelect,
  renderButton,
  children,
  placement = 'bottom-start',
  active = undefined,
  popoverClassName,
  className,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      if (active !== undefined) {
        setIsOpen(active);
      } else {
        setIsOpen(open);
      }
    },
    placement,
    middleware: [offset(4), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onSelect?.(option);
  };

  useEffect(() => {
    if (active !== undefined) {
      setIsOpen(active);
    }
  }, [active]);

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  return (
    <div className={cn('relative inline-block text-left', className)}>
      <div ref={refs.setReference} {...getReferenceProps()} className="cursor-pointer">
        {renderButton ? (
          renderButton({ selected, isOpen })
        ) : (
          <button className="inline-flex justify-between w-40 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-50">
            {selected || 'Select'}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M19 9l-7 7-7-7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={{
              boxShadow:
                '0px 3px 6px 0px #0000001A, 0px 10px 10px 0px #00000017, 0px 41px 16px 0px #00000003',
              ...floatingStyles,
            }}
            {...getFloatingProps()}
            className={cn('z-50 bg-white rounded-xl min-w-[10rem] py-1', popoverClassName)}
          >
            {children
              ? children
              : options.map((option, idx) => (
                  <DropdownItem key={idx} onClick={() => handleSelect(option)}>
                    {option}
                  </DropdownItem>
                ))}
          </div>
        </FloatingPortal>
      )}
    </div>
  );
};

export default Dropdown;
