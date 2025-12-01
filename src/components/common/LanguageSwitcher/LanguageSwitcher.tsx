'use client';

import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import { startTransition } from 'react';
import { Dropdown, DropdownItem } from '../../ui/Dropdown';

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const currentLocale = params.locale as string;

  const languageOptions: LanguageOption[] = [
    {
      code: 'uz',
      name: "O'zbek",
      flag: '/images/flags/uz.png',
    },
    {
      code: 'uzk',
      name: 'Ўзбек',
      flag: '/images/flags/uz.png',
    },
    {
      code: 'ru',
      name: 'Русский',
      flag: '/images/flags/ru.png',
    },
    {
      code: 'en',
      name: 'English',
      flag: '/images/flags/en.png',
    },
  ];

  const handleLanguageChange = async (locale: string) => {
    if (locale === currentLocale) return;

    startTransition(() => {
      // Preserve search params when changing language
      const search = searchParams.toString();
      const pathnameWithSearch = search ? `${pathname}?${search}` : pathname;

      router.replace(pathnameWithSearch, { locale });
    });
  };

  const currentLanguage = languageOptions.find((option) => option.code === currentLocale);

  return (
    <Dropdown
      onSelect={(value) => handleLanguageChange(value as string)}
      renderButton={() => (
        <div
          className={cn(
            'flex justify-between !h-10 w-full text-text-1 gap-2 rounded-md bg-white px-3 py-2 text-base md:text-sm text-left items-center',
            'md:min-w-[130px]',
            className
          )}
        >
          <div className="flex items-center gap-2">
            <Image
              src={currentLanguage?.flag || ''}
              alt={currentLanguage?.name || ''}
              width={40}
              height={40}
              className="min-h-[18px] min-w-[18px] w-[18px] h-[18px] object-cover rounded-full"
            />
            <span className="text-text-1 md:inline hidden">{currentLanguage?.name}</span>
          </div>
          <ChevronDownIcon />
        </div>
      )}
    >
      {languageOptions.map((option) => (
        <DropdownItem
          key={option.code}
          onClick={() => handleLanguageChange(option.code)}
          active={option.code === currentLocale}
        >
          <div className="flex items-center gap-2 justify-between">
            <Image
              src={option.flag}
              alt={option.name}
              width={40}
              height={40}
              className="min-h-[18px] min-w-[18px] w-[18px] h-[18px] object-cover rounded-full"
            />
            {option.name}
          </div>
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default LanguageSwitcher;
