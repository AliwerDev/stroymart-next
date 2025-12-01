/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from '@/components/ui/Form';
import { cn, getFormErrorMessage } from '@/lib/utils';

import get from 'lodash.get';
import { ReactElement, cloneElement, isValidElement } from 'react';
import { Controller, FieldError, FieldPath, FieldValues, useFormContext } from 'react-hook-form';

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: ReactElement;
  children: ReactElement<{
    className?: string;
    error?: boolean;
    onChange?: (value: any) => void;
    disabled?: boolean;
  }>;
  className?: string;
  onFieldChange?: (value: any) => void; // Optional callback for field change
  layout?: 'vertical' | 'horizontal';
};

export function FormField<T extends FieldValues>({
  name,
  label,
  required,
  helperText,
  disabled,
  children,
  className,
  onFieldChange,
  layout = 'vertical',
}: Props<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const error = get(errors, name) as FieldError | undefined;

  return (
    <div className={cn('mb-4', className, layout === 'horizontal' && 'flex items-center gap-2')}>
      {label && (
        <Label label={label} labelRequired={required} className={cn(disabled && 'text-text-3')} />
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          isValidElement(children)
            ? cloneElement(children, {
                ...field,
                disabled,
                onChange: (value: any) => {
                  field.onChange(value);
                  if (onFieldChange) {
                    onFieldChange(value);
                  }
                  if (children.props?.onChange) {
                    children.props.onChange?.(value);
                  }
                },
                error: !!error,
                className: cn(children.props.className, error ? 'field-error' : ''),
              })
            : children
        }
      />

      {helperText && !error && helperText}

      {error && (
        <p className="mt-1 text-sm text-red-500 line-clamp-2 break-words text-ellipsis overflow-hidden max-w-full">
          {getFormErrorMessage(error)}
        </p>
      )}
    </div>
  );
}
