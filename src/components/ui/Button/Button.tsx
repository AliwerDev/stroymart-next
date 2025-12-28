import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends Omit<ComponentProps<'button'>, 'prefix' | 'suffix' | 'icon'> {
  variant?: 'primary' | 'secondary' | 'gray';
  prefix?: React.ReactNode | string;
  suffix?: React.ReactNode | string;
  icon?: React.ReactNode | string;
  className?: string;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
}

const Button = ({
  icon,
  variant = 'secondary',
  fullWidth = false,
  prefix,
  suffix,
  children,
  type = 'button',
  disabled = false,
  isLoading = false,
  className = '',
  ...rest
}: ButtonProps) => {
  const buttonClasses = twMerge(
    'cursor-pointer h-10 flex items-center gap-2 hover:opacity-90',
    variant === 'secondary' &&
      'h-10 rounded-[10px] px-3 font-bold text-white flex items-center justify-center',
    variant === 'gray' && 'px-3 rounded-[10px] border text-text2 border-gray-300 bg-gray-50',

    disabled && 'opacity-50 cursor-not-allowed',
    isLoading && 'opacity-50 cursor-not-allowed',
    fullWidth && 'w-full',
    className
  );

  return (
    <button
      className={buttonClasses}
      type={type}
      disabled={disabled}
      style={
        variant === 'primary'
          ? {
              borderRadius: 12,
              background: 'linear-gradient(180deg, #74D0FF 0%, #389DD1 100%)',
              boxShadow: '0 2px 4px 0 rgba(116, 208, 255, 0.42)',
              padding: '3px',
            }
          : variant === 'secondary'
            ? {
                background: 'linear-gradient(174deg, #74D0FF 4.84%, #37A7E0 95.17%)',
                boxShadow: '0 2px 4px 0 rgba(116, 208, 255, 0.42), 0 -5px 2px 0 #57C2F8 inset',
              }
            : undefined
      }
      {...rest}
    >
      {isLoading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      )}
      {prefix}
      {icon}
      {variant === 'primary' ? (
        <span
          className="h-full w-full px-3 font-bold text-white flex items-center"
          style={{
            borderRadius: 10,
            background: 'linear-gradient(0deg, #74D0FF 0%, #389DD1 100%)',
            boxShadow: '1px 1px 5px 0 rgba(255, 255, 255, 0.10)',
          }}
        >
          {children}
        </span>
      ) : (
        children
      )}
      {suffix}
    </button>
  );
};

export default Button;
