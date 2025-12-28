'use client';

import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import Button from '@/components/ui/Button';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Dropdown, MenuProps } from 'antd';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import { startTransition } from 'react';

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

const LanguageSwitcher = () => {
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

  const menuItems: MenuProps['items'] = languageOptions.map((option) => ({
    key: option.code,
    label: (
      <div className="flex items-center gap-2">
        <Image
          src={option.flag}
          alt={option.name}
          width={18}
          height={18}
          className="object-cover rounded-full"
        />
        <span>{option.name}</span>
      </div>
    ),
    onClick: () => handleLanguageChange(option.code),
  }));

  return (
    <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
      <Button variant="gray">
        <Image
          src={currentLanguage?.flag || ''}
          alt={currentLanguage?.name || ''}
          width={24}
          height={24}
          className="object-cover w-6 h-4 rounded-sm"
        />
        <span className="text-text-1 md:inline hidden">{currentLanguage?.name}</span>
        <ChevronDownIcon />
      </Button>
    </Dropdown>
  );
};

export default LanguageSwitcher;
