'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
interface InputProps extends React.ComponentProps<'textarea'> {
  error?: boolean;
  label?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  mask?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, InputProps>((props, ref) => {
  const {
    startIcon,
    className,
    label = '',
    error = false,
    required = false,
    disabled = false,
    ...otherProps
  } = props;

  const id = React.useId();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Merge external ref with internal ref
  React.useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement, []);

  const StartIcon = React.useMemo(() => {
    if (startIcon) {
      return (
        <div className="absolute left-2 top-0 bottom-0 flex items-center justify-center">
          {startIcon}
        </div>
      );
    }
    return null;
  }, [startIcon]);

  const inputProps = {
    disabled,
    id: props?.id || id,
    className: cn(
      'flex w-full outline-none text-text-1 border border-gray-200 bg-white p-4 rounded-[10px] active:border-text-1 focus:border-text-1 resize-none custom-scrollbar',
      error && '!text-primary-500 placeholder:text-red-400 !bg-primary-50',
      StartIcon && 'pl-10',
      className
    ),
    ...otherProps,
  };

  return (
    <div>
      <label
        htmlFor={props?.id || id}
        className={cn(
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          error && 'text-primary-500'
        )}
      >
        <span className={cn(required ? 'inline-block text-primary-500' : 'hidden')}>*</span> {label}
      </label>
      <div
        className={cn(
          'relative',
          error && '[&_svg_path]:stroke-red-500',
          disabled && 'cursor-not-allowed'
        )}
      >
        {StartIcon}
        <textarea ref={textareaRef} {...inputProps} />
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
