'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  checked?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { className, disabled = false, ...otherProps } = props;

  const id = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Merge external ref with internal ref
  React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);

  return (
    <div className="flex items-center cursor-pointer">
      <input
        ref={inputRef}
        type="checkbox"
        id={props?.id || id}
        disabled={disabled}
        className={cn(
          'rounded cursor-pointer border border-text-4 disabled:cursor-not-allowed disabled:opacity-50',
          'accent-primary-500 w-4 h-4 border-primary-500',
          className
        )}
        {...otherProps}
      />
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
