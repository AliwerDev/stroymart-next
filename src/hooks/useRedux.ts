import { useAppDispatch, useAppSelector } from '@/store';

// Re-export the typed hooks for easier access
export { useAppDispatch, useAppSelector };

// Custom hook for common Redux operations
export const useRedux = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;

  return {
    dispatch,
    selector,
  };
};
