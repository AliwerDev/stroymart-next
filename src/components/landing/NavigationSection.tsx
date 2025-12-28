'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDownIcon, PhoneIcon, SearchIcon } from '../icons';
import BurgerIcon from '../icons/BurgerIcon';
import HeartIcon from '../icons/HeartIcon';
import ShoppingCardIcon from '../icons/ShoppingCardIcon';

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
          <SearchIcon className="w-5 h-5 shrink-0" aria-hidden="true" />
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
          <a
            href="tel:+998931231111"
            className="flex items-center gap-2 h-10 px-3 bg-backgroundsecondary rounded-[10px] border border-strokestroke-light hover:bg-gray-100 transition-colors"
            aria-label="Телефон +998 93 123 11 11"
          >
            <PhoneIcon className="w-6 h-6 shrink-0" aria-hidden="true" />
            <span className="text-base font-medium text-gray-700 whitespace-nowrap">
              +998 93 123 11 11
            </span>
          </a>

          <button
            onClick={handleWishlistClick}
            className="flex items-center justify-center w-10 h-10 bg-backgroundsecondary rounded-lg border border-strokestroke-light hover:bg-gray-100 transition-colors"
            aria-label={`${t('Севимлилар')}${wishlistCount > 0 ? `, ${wishlistCount} та маҳсулот` : ''}`}
            type="button"
          >
            <HeartIcon className="w-5 h-5" aria-hidden="true" />
            {wishlistCount > 0 && <span className="sr-only">{wishlistCount} та маҳсулот</span>}
          </button>

          <button
            onClick={handleCartClick}
            className="flex items-center justify-center w-10 h-10 bg-backgroundsecondary rounded-lg border border-strokestroke-light hover:bg-gray-100 transition-colors"
            aria-label={`${t('Савдо савати')}${cartCount > 0 ? `, ${cartCount} та маҳсулот` : ''}`}
            type="button"
          >
            <ShoppingCardIcon className="w-5 h-5" aria-hidden="true" />
            {cartCount > 0 && <span className="sr-only">{cartCount} та маҳсулот</span>}
          </button>

          <div className="flex items-center gap-2 h-10 px-3 bg-backgroundsecondary rounded-[10px] border border-strokestroke-light">
            <Image
              width={24}
              height={16}
              className="w-6 h-4"
              alt="Flag UZB"
              src="/images/flags/uz.png"
            />
            <button
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              type="button"
              aria-label={t('Тилни танланг')}
            >
              <span className="text-base font-medium text-textthird whitespace-nowrap">Ўзб</span>
              <ChevronDownIcon className="w-[18px] h-[18px]" aria-hidden="true" />
            </button>
          </div>

          <button
            onClick={handleLoginClick}
            className="h-10 px-4 py-2 rounded-xl overflow-hidden bg-primary hover:opacity-90 transition-opacity shadow-[0px_2px_4px_rgba(116,208,255,0.42)]"
            type="button"
            aria-label={t('Тизимга кириш')}
          >
            <span className="text-base font-bold text-white whitespace-nowrap">
              {t('Тизимга кириш')}
            </span>
          </button>
        </div>
      </div>

      <nav className="flex items-center gap-6" aria-label="Асосий навигация">
        <button
          onClick={handleCatalogClick}
          className="flex items-center justify-center gap-2 w-[126px] h-12 px-4 py-2 rounded-xl overflow-hidden bg-primary hover:opacity-90 transition-opacity shadow-[0px_2px_4px_rgba(116,208,255,0.42)]"
          type="button"
          aria-label={t('Коталог')}
        >
          <BurgerIcon className="w-5 h-5 text-white" />
          <span className="text-base font-bold text-white whitespace-nowrap">{t('Коталог')}</span>
        </button>

        <ul className="flex items-center gap-6">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className="relative py-2 text-base font-medium text-textprimary hover:opacity-80 transition-opacity"
                type="button"
                aria-current={activeNavItem === item.id ? 'page' : undefined}
              >
                {item.label}
                {activeNavItem === item.id && (
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 rounded-full" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default NavigationSection;
