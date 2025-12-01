'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  error?: boolean;
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary';
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    className,
    label = '',
    description,
    error = false,
    required = false,
    disabled = false,
    size = 'md',
    variant = 'default',
    ...otherProps
  } = props;

  const id = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Merge external ref with internal ref
  React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const variantClasses = {
    default: 'accent-bunker-600 border-bunker-300',
    primary: 'accent-red-500 border-bunker-300',
  };

  return (
    <div className="space-x-3">
      <div className="flex items-center justify-between px-3 py-2 rounded-md bg-bunker-50">
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={props?.id || id}
                className={cn(
                  'text-sm font-medium leading-6',
                  disabled
                    ? 'cursor-not-allowed text-bunker-400'
                    : 'cursor-pointer text-bunker-400 text-sm font-normal',
                  error && 'text-red-600'
                )}
              >
                {required && <span className="text-red-500">*</span>} {label}
              </label>
            )}
            {description && (
              <p
                className={cn(
                  'text-xs text-bunker-500 mt-1',
                  error && 'text-red-500',
                  disabled && 'text-bunker-400'
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
        <input
          ref={inputRef}
          type="checkbox"
          id={props?.id || id}
          disabled={disabled}
          className={cn(
            'rounded border text-primary-600 disabled:cursor-not-allowed disabled:opacity-50',
            sizeClasses[size],
            variantClasses[variant],
            error && 'border-red-500 text-red-600 focus:ring-red-500',
            className
          )}
          {...otherProps}
        />
      </div>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
