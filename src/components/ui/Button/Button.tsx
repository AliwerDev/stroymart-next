import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends Omit<ComponentProps<'button'>, 'prefix' | 'suffix' | 'icon'> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'ghost' | 'icon' | 'danger';
  size?: 'small' | 'medium' | 'large';
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
  variant = 'primary',
  fullWidth = false,
  prefix,
  suffix,
  children,
  type = 'button',
  disabled = false,
  isLoading = false,
  className = '',
  size = 'medium',
  ...rest
}: ButtonProps) => {
  const buttonClasses = twMerge(
    'cursor-pointer relative flex items-center text-bunker-800 justify-center rounded-full min-w-10 gap-2 font-semibold transition-all duration-200 ease-linear',

    size === 'small' && 'h-8 md:h-[36px] px-3 py-2 text-sm leading-5',
    size === 'medium' && 'h-10 px-4 py-3 text-base leading-[22px]',
    size === 'large' && 'h-12 px-6 py-4 text-xl leading-[30px]',

    variant === 'primary' && 'border-none bg-primary-500 text-white hover:bg-opacity-80',
    variant === 'secondary' && 'bg-gray-600 text-text-1 hover:bg-opacity-80',
    variant === 'outlined' &&
      'border-text-1 border text-text-1 hover:text-text-3 hover:border-text-3 hover:bg-opacity-80 bg-white',
    variant === 'ghost' && 'bg-transparent text-text-3 font-semibold',
    variant === 'danger' && 'bg-primary-50 text-primary-500 hover:bg-opacity-80 border-none',
    variant === 'icon' &&
      'border-text-4 border hover:bg-bunker-100 hover:bg-opacity-80 h-10 w-10 !p-0 flex items-center justify-center',

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
              boxShadow: '0px -5px 2px 0px #57C2F8 inset, 0px 2px 4px 0px #74D0FF6B',
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
      {children}
      {suffix}
    </button>
  );
};

export default Button;
