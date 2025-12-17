import { FolderIcon, StoreLocationIcon } from '@/components/icons';
import { useTranslations } from 'next-intl';

export type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const useSidebarMenu = () => {
  const t = useTranslations();

  const menus: NavItem[] = [
    {
      icon: <StoreLocationIcon />,
      name: t('Home'),
      path: '/management/',
    },
    {
      icon: <FolderIcon />,
      name: t('Catalog'),
      subItems: [
        { name: t('Categories'), path: '/management/catalog/categories' },
        { name: t('Filters'), path: '/management/catalog/filters' },
        { name: t('Filter groups'), path: '/management/catalog/filter-groups' },
        // { name: t('Attributes'), path: '/management/catalog/attributes' },
        // { name: t('Attribute groups'), path: '/management/catalog/attribute-groups' },
        // { name: t('Options'), path: '/management/catalog/options' },
      ],
    },
    // {
    //   icon: <ProductIcon />,
    //   name: t('Products'),
    //   subItems: [
    //     { name: t('Product confirmation'), path: '/management/products/confirmation' },
    //     { name: t('Suppliers'), path: '/management/products/suppliers' },
    //     { name: t('Manufacturers'), path: '/management/products/manufacturers' },
    //     { name: t('Filters'), path: '/management/products/filters' },
    //     { name: 'Кэшбэк', path: '/management/products/cashback' },
    //   ],
    // },
    // {
    //   icon: <ShoppingCardIcon />,
    //   name: t('Sales'),
    //   path: '/management/sales',
    // },
  ];
  return menus;
};

export default useSidebarMenu;
