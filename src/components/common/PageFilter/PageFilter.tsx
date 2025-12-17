/* eslint-disable @typescript-eslint/no-explicit-any */
import usePageFilters from '@/hooks/usePageFilters';
import { DatePicker, Input, Select } from 'antd';
import Search from '../Search';

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface FilterConfig {
  type: 'select' | 'date' | 'search' | 'text';
  key: string;
  childKeys?: string[];
  placeholder: string;
  disabled?: boolean;
  options?: FilterOption[];
  hideLabel?: boolean;
  label?: string;
  icon?: React.ReactNode;
}

interface PageFilterProps {
  filterConfig: FilterConfig[];
  values?: any;
  onValuesChange?: (values: any) => void;
  onChange?: (key: string, value: any) => void;
  fillWidth?: boolean;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

const PageFilter = ({
  filterConfig,
  onChange,
  values: controlledValues,
  onValuesChange,
  fillWidth = false,
  leftContent,
  rightContent,
}: PageFilterProps) => {
  const { handleSetFilters, filters: paramValues } = usePageFilters();
  const values = controlledValues || paramValues;

  const onFilterChange = (key: string, value: any) => {
    onChange?.(key, value);
    if (!controlledValues) {
      handleSetFilters({ [key]: value });
    } else {
      onValuesChange?.({ ...values, [key]: value });
    }
  };

  const handleSelectChange = (filter: FilterConfig, value: any) => {
    onFilterChange(filter.key, value);

    if (filter.childKeys) {
      filter.childKeys.forEach((childKey) => {
        onFilterChange(childKey, undefined);
      });
    }
  };

  const renderFilter = (filter: FilterConfig) => {
    switch (filter.type) {
      case 'select':
        return (
          <Select
            value={values[filter.key]}
            onChange={(value) => handleSelectChange(filter, value)}
            placeholder={filter.placeholder}
            options={filter.options || []}
            disabled={filter.disabled}
            className="w-full"
            allowClear
          />
        );
      case 'date':
        return (
          <DatePicker
            disabled={filter.disabled}
            value={values[filter.key] || undefined}
            onChange={(value) => onFilterChange(filter.key, value)}
            placeholder={filter.placeholder}
            className="w-full"
            format="YYYY-MM-DD"
          />
        );
      case 'search':
        return (
          <Search
            value={values[filter.key] || undefined}
            onChange={(value) => onFilterChange(filter.key, value)}
            placeholder={filter.placeholder}
            className="w-full"
            queryKey={filter.key}
          />
        );
      case 'text':
        return (
          <Input
            value={values[filter.key] || ''}
            onChange={(e) => onFilterChange(filter.key, e.target.value)}
            placeholder={filter.placeholder}
            className="w-full"
            type="text"
            prefix={filter.icon}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 md:gap-4 items-center p-3 md:p-6 bg-white rounded-2xl">
      {leftContent}
      {filterConfig.map((filter) => (
        <div
          key={filter.key}
          className={fillWidth ? 'flex-1 min-w-[300px]' : 'w-full md:w-[300px]'}
        >
          {renderFilter(filter)}
        </div>
      ))}
      {rightContent}
    </div>
  );
};

export default PageFilter;
