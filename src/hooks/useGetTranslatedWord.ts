import { useLocale } from 'next-intl';

const useGetTranslatedWord = () => {
  const locale = useLocale();

  const getWord = (record: Record<string, string>, key: string) => {
    switch (locale) {
      case 'uz':
        return record?.[`${key}_uz`];
      case 'ru':
        return record?.[`${key}_ru`];
      case 'uzk':
        return record?.[`${key}_uzk`];
      case 'en':
        return record?.[`${key}_en`];
      default:
        return record?.[`${key}_uz`];
    }
  };

  return {
    getWord,
  };
};

export default useGetTranslatedWord;
