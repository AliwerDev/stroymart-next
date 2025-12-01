'use client';

import CheckboxIcon from '@/components/icons/CheckboxIcon';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import ExitIcon from '@/components/icons/ExitIcon';
import Typography from '@/components/ui/Typography';
import { cn } from '@/lib/utils';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

/**
 * Represents a single option in the select dropdown
 * @template ValueType - The type of the option value (defaults to string)
 */
export type SelectOption<ValueType = string | number> = {
  /** Display text for the option */
  label: string;
  /** Value associated with the option */
  value: ValueType;
  /** Whether the option is disabled and cannot be selected */
  disabled?: boolean;
};

/**
 * Base props interface for the Select component
 * @template ValueType - The type of the option values
 */
interface BaseSelectProps<ValueType> {
  /** Array of options to display in the dropdown */
  options: Array<SelectOption<ValueType>>;
  /** Currently selected value(s). For single select: single value or null. For multiple select: array of values */
  value?: ValueType | ValueType[] | null;
  /** Callback fired when selection changes */
  onChange?: (value: ValueType | ValueType[] | null) => void;
  /** Placeholder text shown when no option is selected */
  placeholder?: string;
  /** Label text displayed above the select */
  label?: string;
  /** Whether to show error styling */
  error?: boolean;
  /** Whether the field is required (shows red asterisk) */
  required?: boolean;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Icon to display at the start of the select button */
  startIcon?: React.ReactNode;
  /** Icon to display at the end of the select button (replaces default chevron) */
  endIcon?: React.ReactNode;
  /** Whether to show a clear button when an option is selected */
  clearable?: boolean;
  /** Additional CSS classes for the select button */
  className?: string;
  /** Additional CSS classes for the dropdown options container */
  optionsClassName?: string;
  /** Whether to allow multiple selections */
  multiple?: boolean;
  /** Position of the dropdown */
  popoverPosition?: 'bottom start' | 'bottom end' | 'top start' | 'top end';

  emptyText?: string;

  /** Whether to show a loading state */
  isLoading?: boolean;
}

/**
 * Complete props interface for the Select component
 * Extends BaseSelectProps and HTML button props, excluding conflicting props
 * @template ValueType - The type of the option values (defaults to string | number)
 */
export type SelectProps<ValueType = string | number> = BaseSelectProps<ValueType> &
  Omit<React.ComponentProps<'button'>, 'value' | 'onChange' | 'disabled'>;

/**
 * A customizable select/dropdown component built with Headless UI
 *
 * Features:
 * - Single and multiple selection modes
 * - Customizable icons (start, end, clear)
 * - Error state styling
 * - Disabled state
 * - Clearable selection
 * - Keyboard navigation
 * - Accessible by default
 *
 * @template ValueType - The type of the option values
 * @param props - Select component props
 * @param ref - Forwarded ref to the select button
 *
 * @example
 * ```tsx
 * // Single select
 * <Select
 *   options={[
 *     { label: 'Option 1', value: '1' },
 *     { label: 'Option 2', value: '2' }
 *   ]}
 *   value={selectedValue}
 *   onChange={setSelectedValue}
 *   placeholder="Choose an option"
 * />
 *
 * // Multiple select
 * <Select
 *   multiple
 *   options={options}
 *   value={selectedValues}
 *   onChange={setSelectedValues}
 *   clearable
 * />
 * ```
 */
export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(function Select(props, ref) {
  const {
    options = [],
    value = null,
    onChange,
    isLoading,
    placeholder,
    label = '',
    error = false,
    required = false,
    disabled = false,
    startIcon,
    endIcon,
    clearable = true,
    className,
    optionsClassName,
    id: idProp,
    multiple = false,
    popoverPosition = 'bottom start',
    emptyText,
    ...buttonProps
  } = props as SelectProps<string | number>;

  const t = useTranslations();

  // Generate unique ID for accessibility if not provided
  const generatedId = React.useId();
  const id = idProp || generatedId;

  /**
   * Computes the currently selected option(s) based on the value prop
   * Handles both single and multiple selection modes
   */
  const selectedOptions = React.useMemo(() => {
    if (multiple) {
      // For multiple select: filter options that match the selected values
      const values = Array.isArray(value) ? value : [];
      return options.filter((opt) => values.includes(opt.value));
    } else {
      // For single select: find the option that matches the selected value
      const singleValue = Array.isArray(value) ? null : value;
      return options.find((opt) => opt.value === singleValue) ?? null;
    }
  }, [options, value, multiple]);

  // Determine if icons are present for proper spacing
  const hasStartIcon = Boolean(startIcon);
  const hasEndIcon = Boolean(endIcon);

  /**
   * Renders the start icon with proper positioning
   * Only renders if startIcon is provided
   */
  const StartIcon = React.useMemo(() => {
    if (!startIcon) return null;
    return (
      <div className="absolute left-2 top-0 bottom-0 flex items-center justify-center">
        {startIcon}
      </div>
    );
  }, [startIcon]);

  /**
   * Renders the default chevron icon
   * Changes color based on error state
   */
  const Chevron = React.useMemo(() => {
    return (
      <ChevronDownIcon
        className={cn('text-bunker-800', error && 'text-primary-500')}
        width={20}
        height={20}
      />
    );
  }, [error]);

  /**
   * Renders the clear button when clearable is true and there's a selection
   * Positioned to the right of the select button
   */
  const ClearButton = React.useMemo(() => {
    if (!clearable || disabled) return null;

    // Check if there's a selection to clear
    const hasSelection = multiple
      ? Array.isArray(selectedOptions) && selectedOptions.length > 0
      : selectedOptions !== null;

    if (!hasSelection) return null;

    return (
      <button
        type="button"
        aria-label="Clear selection"
        className="absolute right-7 top-0 bottom-0 flex items-center justify-center text-bunker-600 hover:text-primary-500 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onChange?.(multiple ? [] : null);
        }}
      >
        <ExitIcon className="w-4 h-4" />
      </button>
    );
  }, [clearable, selectedOptions, disabled, onChange, multiple]);

  /**
   * Handles option selection changes
   * Converts the selected option(s) to the appropriate value format
   */
  const handleOptionChange = React.useCallback(
    (option: SelectOption<string | number> | SelectOption<string | number>[] | null) => {
      if (Array.isArray(option)) {
        // Multiple selection: extract values from option objects
        onChange?.(option.map((opt) => opt.value));
      } else {
        // Single selection: extract value from option object or return null
        onChange?.(option?.value ?? null);
      }
    },
    [onChange]
  );

  /**
   * Determines if a specific option is currently selected
   * Handles both single and multiple selection modes
   */
  const isOptionSelected = React.useCallback(
    (option: SelectOption<string | number>) => {
      if (multiple) {
        const values = Array.isArray(value) ? value : [];
        return values.includes(option.value);
      } else {
        const singleValue = Array.isArray(value) ? null : value;
        return singleValue === option.value;
      }
    },
    [multiple, value]
  );

  /**
   * Renders the display text for the selected option(s)
   * Shows placeholder when nothing is selected
   * For multiple select, shows selected items as tags
   */
  const renderSelectedDisplay = () => {
    if (multiple) {
      const selectedArray = Array.isArray(selectedOptions) ? selectedOptions : [];
      if (selectedArray.length === 0) {
        return (
          <span
            className={cn(
              'flex-1 text-text-4 text-sm text-left font-normal',
              error && 'text-red-400'
            )}
          >
            {placeholder}
          </span>
        );
      }

      // Display selected items as tags
      return (
        <span className="flex-1 text-text-1 text-sm text-left font-normal flex gap-1 flex-wrap">
          {selectedArray.map((item) => (
            <span
              key={item.value}
              className="bg-light-gray-1 w-[31%] rounded-sm p-1 runcate flex items-center justify-between gap-1 cursor-pointer"
            >
              <Typography variant="subtitle-rg-16" color="text-3" className="truncate">
                {item.label}
              </Typography>
              <ExitIcon
                onClick={() => {
                  handleOptionChange(selectedArray.filter((opt) => opt.value !== item.value));
                }}
                className="w-4 h-4 text-primary-500 min-w-4"
              />
            </span>
          ))}
        </span>
      );
    } else {
      const singleOption = selectedOptions as SelectOption | null;
      if (singleOption) {
        return (
          <span className="flex-1 text-text-1 text-sm text-left font-normal truncate">
            {singleOption.label}
          </span>
        );
      } else {
        return (
          <span
            className={cn(
              'flex-1 text-text-4 text-sm text-left font-normal truncate',
              error && 'text-red-400'
            )}
          >
            {placeholder}
          </span>
        );
      }
    }
  };

  return (
    <div>
      {/* Label with required indicator */}
      <label
        htmlFor={id}
        className={cn(
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          error && 'text-primary-500'
        )}
      >
        <span className={cn(required ? 'inline-block text-primary-500' : 'hidden')}>*</span> {label}
      </label>

      {/* Headless UI Listbox for accessible dropdown functionality */}
      <Listbox
        value={selectedOptions}
        onChange={handleOptionChange}
        disabled={disabled}
        multiple={multiple}
        ref={ref}
      >
        <div
          className={cn(
            'relative',
            error && '[&_svg_path]:stroke-red-500',
            disabled && 'cursor-not-allowed'
          )}
        >
          {/* Start icon positioned absolutely */}
          {StartIcon}

          {/* Main select button */}
          <ListboxButton
            id={id}
            {...buttonProps}
            className={cn(
              'flex items-center justify-start text-text-1 border w-full border-mid-gray-1 bg-white rounded-[10px]',
              'h-11 md:h-[54px] px-3',
              error && '!text-primary-500 !bg-primary-50',
              hasStartIcon && 'pl-10',
              (hasEndIcon || clearable) && 'pr-10',
              multiple && 'py-2 !h-fit min-h-11 md:min-h-[54px] items-center',
              className
            )}
          >
            {/* Display selected option(s) or placeholder */}
            {renderSelectedDisplay()}

            {/* Clear button for removing selection */}
            {ClearButton}

            {/* End icon (custom or default chevron) */}
            <div className="absolute right-2 top-0 bottom-0 flex items-center justify-center">
              {endIcon ?? Chevron}
            </div>
          </ListboxButton>

          {/* Dropdown options container */}
          <ListboxOptions
            anchor={popoverPosition}
            className={cn(
              'mt-2 w-[var(--button-width)] z-[999999] rounded-[10px] border border-gray-300 bg-white shadow-lg focus:outline-none',
              optionsClassName
            )}
          >
            {/* Render each option */}
            {isLoading ? (
              <div className="text-text-3 min-h-32 flex justify-center items-center">
                {t('Загрузка')}
              </div>
            ) : options.length === 0 ? (
              <div className="text-text-3 min-h-32 flex justify-center items-center">
                {emptyText ?? t('Нет данных')}
              </div>
            ) : (
              options.map((option) => (
                <ListboxOption
                  key={(option.value as unknown as string) ?? option.label}
                  value={option}
                  disabled={option.disabled}
                  className={(state) =>
                    cn(
                      'cursor-pointer select-none px-3 py-2.5 text-text-1 transition-colors',
                      state.active && 'bg-gray-100',
                      state.selected && 'bg-brand-50 text-brand-500',
                      option.disabled && 'opacity-50 cursor-not-allowed'
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    {multiple && (
                      <CheckboxIcon checked={isOptionSelected(option)} className="text-brand-500" />
                    )}
                    <Typography variant="caption-rg-14">{option.label}</Typography>
                  </div>
                </ListboxOption>
              ))
            )}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
});

// Set display name for React DevTools
Select.displayName = 'Select';

export default Select;
