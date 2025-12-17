/* eslint-disable @typescript-eslint/no-explicit-any */
import get from 'lodash.get';
import { useLocale } from 'next-intl';

const useGetTranslatedWord = () => {
  const locale = useLocale();

  const getWord = (record: any, key: string) => {
    switch (locale) {
      case 'uz':
        return get(record, [key, 'uzl']);
      case 'ru':
        return get(record, [key, 'ru']);
      case 'uzk':
        return get(record, [key, 'uzc']);
      default:
        return get(record, [key, 'uzl']);
    }
  };

  return getWord;
};

export default useGetTranslatedWord;
