'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDownIcon, PhoneIcon, SearchIcon } from '../icons';
import BurgerIcon from '../icons/BurgerIcon';
import HeartIcon from '../icons/HeartIcon';
import ShoppingCardIcon from '../icons/ShoppingCardIcon';

const navigationItems = [
  { id: 1, label: 'Акциялар' },
  { id: 2, label: 'Дизайнерлар' },
  { id: 3, label: 'Сотувчи бўлиш' },
  { id: 4, label: 'Колкулатсия' },
  { id: 5, label: 'Алоқа' },
  { id: 6, label: 'ФАҚ' },
];

const AppNavigation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNavItem, setActiveNavItem] = useState<number | null>(null);
  const [cartCount] = useState(0);
  const [wishlistCount] = useState(0);

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
    <header className="flex flex-col container items-start gap-6 px-[76px] !py-5 relative">
      <div className="flex items-center gap-14 w-full">
        <Link href="/" aria-label="Stroyauz home">
          <Image
            className="relative self-stretch w-[106.1px]"
            alt="Stroyauz"
            src="/images/logo.png"
            width={106}
            height={24}
          />
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="flex h-10 items-center gap-3 pl-3 pr-5 py-3 relative flex-1 grow bg-backgroundsecondary rounded-[10px] border border-solid"
          role="search"
        >
          <SearchIcon
            className="!relative !w-5 !h-5 !mt-[-2.00px] !mb-[-2.00px] !aspect-[1]"
            aria-hidden="true"
          />
          <label htmlFor="search-input" className="sr-only">
            Қидирув
          </label>
          <input
            id="search-input"
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Қидирув"
            className="w-full mt-[-5.00px] mb-[-3.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-gray-700 tracking-[-0.32px] leading-6 text-base bg-transparent outline-none"
            aria-label="Қидирув"
          />
        </form>

        <div className="inline-flex gap-1.5 flex-[0_0_auto] items-center relative">
          <a
            href="tel:+998931231111"
            className="inline-flex h-10 items-center gap-2 px-3 py-0 relative flex-[0_0_auto] bg-backgroundsecondary rounded-[10px] border border-solid border-strokestroke-light hover:bg-gray-100 transition-colors"
            aria-label="Телефон +998 93 123 11 11"
          >
            <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
              <PhoneIcon className="!relative !w-6 !h-6" aria-hidden="true" />
              <p className="relative flex items-center justify-center w-fit mt-[-1.00px] font-hayot-birja-inter-medium font-[number:var(--hayot-birja-inter-medium-font-weight)] text-gray-700 text-[length:var(--hayot-birja-inter-medium-font-size)] tracking-[var(--hayot-birja-inter-medium-letter-spacing)] leading-[var(--hayot-birja-inter-medium-line-height)] whitespace-nowrap [font-style:var(--hayot-birja-inter-medium-font-style)]">
                +998 93 123 11 11
              </p>
            </div>
          </a>

          <button
            onClick={handleWishlistClick}
            className="flex w-10 h-10 items-center justify-center gap-2 px-3 py-0 relative bg-backgroundsecondary rounded-lg border border-solid border-strokestroke-light hover:bg-gray-100 transition-colors"
            aria-label={`Севимлилар${wishlistCount > 0 ? `, ${wishlistCount} та маҳсулот` : ''}`}
            type="button"
          >
            <HeartIcon
              className="!relative !w-5 !h-5 !ml-[-2.00px] !mr-[-2.00px] !aspect-[1]"
              aria-hidden="true"
            />
            {wishlistCount > 0 && <span className="sr-only">{wishlistCount} та маҳсулот</span>}
          </button>

          <button
            onClick={handleCartClick}
            className="flex w-10 h-10 items-center justify-center gap-2 px-3 py-0 relative bg-backgroundsecondary rounded-lg border border-solid border-strokestroke-light hover:bg-gray-100 transition-colors"
            aria-label={`Савдо савати${cartCount > 0 ? `, ${cartCount} та маҳсулот` : ''}`}
            type="button"
          >
            <ShoppingCardIcon
              className="!relative !w-5 !h-5 !ml-[-2.00px] !mr-[-2.00px] !aspect-[1]"
              aria-hidden="true"
            />
            {cartCount > 0 && <span className="sr-only">{cartCount} та маҳсулот</span>}
          </button>

          <div className="inline-flex h-10 items-center gap-2 px-3 py-0 relative flex-[0_0_auto] bg-backgroundsecondary rounded-[10px] border border-solid border-strokestroke-light">
            <Image
              width={24}
              height={24}
              className="relative w-6 h-4"
              alt="Flag UZB"
              src="/images/flags/uz.png"
            />

            <button
              className="inline-flex gap-1.5 flex-[0_0_auto] items-center relative hover:opacity-80 transition-opacity"
              type="button"
              aria-label="Тилни танланг"
            >
              <span className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-textthird text-base tracking-[0] leading-6 whitespace-nowrap">
                Ўзб
              </span>

              <ChevronDownIcon
                className="!relative !w-[18px] !h-[18px] !aspect-[1]"
                aria-hidden="true"
              />
            </button>
          </div>

          <button
            onClick={handleLoginClick}
            className="inline-flex flex-col h-10 items-start gap-2.5 p-[3px] relative flex-[0_0_auto] rounded-xl overflow-hidden shadow-[0px_2px_4px_#74d0ff6b] bg-[linear-gradient(180deg,rgba(116,208,255,1)_0%,rgba(56,157,209,1)_100%)] hover:opacity-90 transition-opacity"
            type="button"
            aria-label="Тизимга кириш"
          >
            <div className="flex items-center justify-center gap-2 px-3.5 py-2 relative flex-1 self-stretch w-full grow rounded-[10px] overflow-hidden shadow-[1px_1px_5px_#ffffff1a] bg-[linear-gradient(0deg,rgba(116,208,255,1)_0%,rgba(56,157,209,1)_100%)]">
              <span className="w-fit mt-[-3.50px] [font-family:'Inter-Bold',Helvetica] font-bold text-white tracking-[0] leading-[normal] whitespace-nowrap relative text-base">
                Тизимга кириш
              </span>
            </div>
          </button>
        </div>
      </div>

      <nav
        className="flex w-[1768px] items-center justify-around gap-6 relative flex-[0_0_auto]"
        aria-label="Асосий навигация"
      >
        <div className="flex items-center gap-6 relative flex-1 grow">
          <button
            onClick={handleCatalogClick}
            className="flex flex-col w-[126px] h-12 items-start gap-2.5 p-[3px] relative rounded-xl overflow-hidden shadow-[0px_2px_4px_#74d0ff6b] bg-[linear-gradient(180deg,rgba(116,208,255,1)_0%,rgba(56,157,209,1)_100%)] hover:opacity-90 transition-opacity"
            type="button"
            aria-label="Коталог"
          >
            <div className="flex items-center justify-center gap-2 px-3.5 py-2 relative flex-1 self-stretch w-full grow rounded-[10px] overflow-hidden shadow-[1px_1px_5px_#ffffff1a] bg-[linear-gradient(0deg,rgba(116,208,255,1)_0%,rgba(56,157,209,1)_100%)]">
              <BurgerIcon className="w-5 h-5 text-white" />
              <span className="w-fit mr-[-0.50px] [font-family:'Inter-Bold',Helvetica] font-bold text-white tracking-[0] leading-[normal] whitespace-nowrap relative text-base">
                Коталог
              </span>
            </div>
          </button>

          <ul className="flex w-[1164px] items-center gap-6 relative">
            {navigationItems.map((item) => (
              <li
                key={item.id}
                className="inline-flex h-8 items-start gap-8 relative flex-[0_0_auto]"
              >
                <button
                  onClick={() => handleNavClick(item.id)}
                  className="inline-flex items-center gap-3 pt-[20.5px] pb-[21.5px] px-0 relative self-stretch flex-[0_0_auto] hover:opacity-80 transition-opacity"
                  type="button"
                  aria-current={activeNavItem === item.id ? 'page' : undefined}
                >
                  <span className="flex justify-center w-fit mt-[-18.00px] mb-[-16.00px] font-hayot-birja-inter-medium font-[number:var(--hayot-birja-inter-medium-font-weight)] text-textprimary text-[length:var(--hayot-birja-inter-medium-font-size)] tracking-[var(--hayot-birja-inter-medium-letter-spacing)] leading-[var(--hayot-birja-inter-medium-line-height)] whitespace-nowrap items-center relative [font-style:var(--hayot-birja-inter-medium-font-style)]">
                    {item.label}
                  </span>

                  <div
                    className={`absolute w-full left-0 bottom-0 h-0.5 rounded-full ${activeNavItem === item.id ? 'bg-blue-500' : ''}`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default AppNavigation;
