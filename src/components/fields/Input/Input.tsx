'use client';

import Show from '@/components/common/Show';
import { Label } from '@/components/ui/Form';
import { cn } from '@/lib/utils';
import { InputMask } from '@react-input/mask';
import React from 'react';
import { PassportInputMask } from './PassportInputMask';

interface InputProps extends Omit<React.ComponentProps<'input'>, 'value' | 'onChange'> {
  error?: boolean;
  label?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  mask?: string;
  type?: 'text' | 'password' | 'phone' | 'time' | 'number' | 'date' | 'time' | 'pinfl';
  value?: string | number;
  onChange?: (value: string) => void;
  defaultValue?: string | number;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    endIcon,
    startIcon,
    className,
    label = '',
    type = 'text',
    error = false,
    required = false,
    disabled = false,
    value,
    onChange,
    fullWidth = false,
    ...otherProps
  } = props;

  const id = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Merge external ref with internal ref
  React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value: newValue } = e.target;

      onChange?.(newValue);
    },
    [onChange]
  );

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

  const EndIcon = React.useMemo(() => {
    if (endIcon) {
      return (
        <div className="absolute right-2 top-0 bottom-0 flex items-center justify-center">
          {endIcon}
        </div>
      );
    }
    return null;
  }, [endIcon]);

  const inputProps = {
    type: type === 'password' ? 'password' : type === 'number' ? 'number' : 'text',
    disabled,
    id: props?.id || id,
    value,
    onChange: handleInputChange,
    className: cn(
      'flex outline-none text-text-1 border border-gray-200 placeholder:text-text-4 bg-white rounded-[10px] active:border-text-1 focus:border-text-1',
      'h-11 md:h-[54px] p-2 md:p-4 text-sm md:text-base',
      error && '!text-primary-500 placeholder:text-red-400 !bg-primary-50',
      StartIcon && '!pl-10',
      EndIcon && '!pr-10',
      type === 'number' &&
        '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]',
      className,
      fullWidth && 'w-full'
    ),
    ...otherProps,
  };

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text');
    const phone = text.startsWith('+998') ? text.replace('+998', '') : text;
    e.currentTarget.value = phone;
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const phone = e.currentTarget.value;
    const key = e.key;

    if (!isNaN(Number(key)) && !phone.startsWith('+998')) {
      e.currentTarget.value = `+998 (${key}`;
      e.preventDefault();
    }
  };

  const renderInput = () => {
    switch (type) {
      case 'phone':
        return (
          <InputMask
            mask="+XXZ (__) ___ __ __"
            replacement={{ _: /\d/, X: /9/, Z: /8/ }}
            showMask={false}
            separate={false}
            placeholder="+998 (__) ___ __ __"
            onPaste={handlePhonePaste}
            {...inputProps}
            onKeyDown={handlePhoneKeyDown}
            onChange={handleInputChange}
          />
        );
      case 'date':
        return (
          <InputMask
            mask="__.__.____"
            replacement={{ _: /\d/ }}
            showMask={false}
            separate={false}
            {...inputProps}
            onChange={handleInputChange}
          />
        );
      case 'time':
        return (
          <InputMask
            mask="__:__"
            replacement={{ _: /\d/ }}
            showMask={false}
            separate={false}
            {...inputProps}
            onChange={handleInputChange}
          />
        );
      case 'pinfl':
        return <PassportInputMask {...inputProps} onChange={onChange} />;
      case 'number':
        return <input ref={inputRef} {...inputProps} type="number" />;
      default:
        return <input ref={inputRef} {...inputProps} />;
    }
  };

  return (
    <div>
      <Show when={!!label}>
        <Label
          htmlFor={props?.id || id}
          labelRequired={required}
          label={label}
          className={cn(disabled && 'cursor-not-allowed text-text-3')}
        />
      </Show>

      <div
        className={cn(
          'relative',
          error && '[&_svg_path]:stroke-red-500',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        {StartIcon}

        {renderInput()}

        {EndIcon}
      </div>
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
