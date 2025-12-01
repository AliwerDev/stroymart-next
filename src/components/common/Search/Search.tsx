import Input from '@/components/fields/Input';
import SearchIcon from '@/components/icons/SearchIcon';
import useSearch from '@/hooks/useSearch';
import { useTranslations } from 'next-intl';

interface SearchProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  debounce?: number;
  queryKey?: string;
  className?: string;
}

const Search = ({
  value,
  onChange,
  placeholder = 'Qidirish',
  debounce: debounceMs = 400,
  queryKey = 'search',
  className,
}: SearchProps) => {
  const t = useTranslations();
  const { handleInputChange, searchValue } = useSearch({
    value,
    onChange,
    debounce: debounceMs,
    queryKey,
  });

  return (
    <Input
      placeholder={placeholder || t('Поиск')}
      value={searchValue}
      onChange={handleInputChange}
      className={className}
      startIcon={<SearchIcon className={'text-mid-gray-1 w-6 h-6'} />}
    />
  );
};

export default Search;
