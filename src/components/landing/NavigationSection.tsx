'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { PhoneIcon, SearchIcon } from '../icons';
import BurgerIcon from '../icons/BurgerIcon';
import HeartIcon from '../icons/HeartIcon';
import ShoppingCardIcon from '../icons/ShoppingCardIcon';
import Button from '../ui/Button';

const NavigationSection = () => {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNavItem, setActiveNavItem] = useState<number | null>(null);
  const [cartCount] = useState(0);
  const [wishlistCount] = useState(0);

  const navigationItems = [
    { id: 1, label: t('Акциялар') },
    { id: 2, label: t('Дизайнерлар') },
    { id: 3, label: t('Сотувчи бўлиш') },
    { id: 4, label: t('Колкулатсия') },
    { id: 5, label: t('Алоқа') },
    { id: 6, label: t('ФАҚ') },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  const handleNavClick = (itemId: number) => {
    setActiveNavItem(itemId);
  };

  const handleCartClick = () => {
    console.log('Cart clicked');
  };

  const handleWishlistClick = () => {
    console.log('Wishlist clicked');
  };

  const handleLoginClick = () => {
    console.log('Login clicked');
  };

  const handleCatalogClick = () => {
    console.log('Catalog clicked');
  };

  return (
    <header className="container py-5! px-[76px]">
      <div className="flex items-center gap-14 w-full mb-6">
        <Link href="/" aria-label="Stroyauz home">
          <Image
            alt="Stroyauz"
            src="/images/logo.png"
            width={106}
            height={24}
            className="w-[106px]"
          />
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 flex items-center gap-3 h-10 px-3 py-2 bg-backgroundsecondary rounded-[10px] border border-strokestroke-light"
          role="search"
        >
          <SearchIcon className="w-5 h-5 shrink-0" />
          <label htmlFor="search-input" className="sr-only">
            {t('Қидирув')}
          </label>
          <input
            id="search-input"
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={t('Қидирув')}
            className="w-full text-base text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
            aria-label={t('Қидирув')}
          />
        </form>

        <div className="flex items-center gap-1.5">
          <Link href="tel:+998931231111" aria-label="Телефон +998 93 123 11 11">
            <Button variant="gray">
              <PhoneIcon className="w-5 h-5" />
              <span className="text-base font-medium text-gray-700 whitespace-nowrap">
                +998 93 123 11 11
              </span>
            </Button>
          </Link>

          <Button onClick={handleWishlistClick} variant="gray">
            <HeartIcon className="w-5 h-5" />
            {wishlistCount > 0 && <span className="sr-only">{wishlistCount} та маҳсулот</span>}
          </Button>

          <Button onClick={handleCartClick} variant="gray">
            <ShoppingCardIcon className="w-5 h-5" />
            {cartCount > 0 && <span className="sr-only">{cartCount} та маҳсулот</span>}
          </Button>

          <LanguageSwitcher />

          <Link href="/auth/seller/login">
            <Button onClick={handleLoginClick} variant="primary" aria-label={t('Тизимга кириш')}>
              {t('Тизимга кириш')}
            </Button>
          </Link>
        </div>
      </div>

      <nav className="flex items-center gap-4" aria-label="Асосий навигация">
        <Button onClick={handleCatalogClick} variant="secondary" aria-label={t('Коталог')}>
          <BurgerIcon className="w-5 h-5 text-white" />
          <span className="text-base font-bold text-white whitespace-nowrap">{t('Коталог')}</span>
        </Button>

        <ul className="flex items-center gap-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <Button
                onClick={() => handleNavClick(item.id)}
                variant="gray"
                aria-current={activeNavItem === item.id ? 'page' : undefined}
              >
                {item.label}
                {activeNavItem === item.id && (
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 rounded-full" />
                )}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default NavigationSection;
