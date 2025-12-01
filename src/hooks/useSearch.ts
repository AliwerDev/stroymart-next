/* eslint-disable react-hooks/exhaustive-deps */
import debounce from 'lodash.debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseSearchOptions {
  value?: string;
  onChange?: (value: string) => void;
  debounce?: number;
  queryKey?: string;
}

const useSearch = ({
  value,
  onChange,
  debounce: debounceMs = 500,
  queryKey = 'search',
}: UseSearchOptions) => {
  const searchParams = useSearchParams();
  const searchParamsValue = searchParams.get(queryKey);
  const router = useRouter();

  // Initialize searchValue with URL params first, then fallback to prop value
  const [searchValue, setSearchValue] = useState(searchParamsValue || value || '');
  const [active, setActive] = useState(false);

  // Store debounced functions in refs
  const debouncedUrlUpdateRef = useRef<ReturnType<typeof debounce> | null>(null);
  const debouncedOnChangeRef = useRef<ReturnType<typeof debounce> | null>(null);

  // Create debounced function for URL updates
  const debouncedUrlUpdate = useCallback(
    (searchTerm: string) => {
      if (debouncedUrlUpdateRef.current) {
        debouncedUrlUpdateRef.current.cancel();
      }
      debouncedUrlUpdateRef.current = debounce((term: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(queryKey, term);
        router.replace(`?${newSearchParams.toString()}`);
      }, debounceMs);
      debouncedUrlUpdateRef.current(searchTerm);
    },
    [searchParams, queryKey, debounceMs, router]
  );

  // Create debounced function for onChange callback
  const debouncedOnChange = useCallback(
    (searchTerm: string) => {
      if (debouncedOnChangeRef.current) {
        debouncedOnChangeRef.current.cancel();
      }
      debouncedOnChangeRef.current = debounce((term: string) => {
        onChange?.(term);
      }, debounceMs);
      debouncedOnChangeRef.current(searchTerm);
    },
    [onChange, debounceMs]
  );

  // Handle input change
  const handleInputChange = useCallback(
    (newValue: string) => {
      setSearchValue(newValue);

      // Update URL with debounce
      debouncedUrlUpdate(newValue);

      // Call onChange with debounce
      debouncedOnChange(newValue);
    },
    [debouncedUrlUpdate, debouncedOnChange]
  );

  // Handle focus/blur
  const handleFocus = useCallback(() => setActive(true), []);
  const handleBlur = useCallback(() => setActive(false), []);

  // Sync with URL search params on mount and when URL changes
  useEffect(() => {
    if (searchParamsValue !== null) {
      setSearchValue(searchParamsValue);
      onChange?.(searchParamsValue);
    }
  }, []);

  // Sync with external value changes
  useEffect(() => {
    setSearchValue(value || '');
  }, [value]);

  return {
    searchValue,
    active,
    handleInputChange,
    handleFocus,
    handleBlur,
  };
};

export default useSearch;
