import { FolderIcon, StoreLocationIcon, UserGroupIcon } from '@/components/icons';
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
      path: '/dashboard',
    },
    {
      icon: <FolderIcon />,
      name: t('Catalog'),
      subItems: [
        { name: t('Categories'), path: '/dashboard/catalog/categories' },
        { name: t('Filters'), path: '/dashboard/catalog/filters' },
        { name: t('Products'), path: '/dashboard/catalog/products' },
        { name: t('Attribute groups'), path: '/dashboard/catalog/attribute-groups' },
        { name: t('Attributes'), path: '/dashboard/catalog/attributes' },
        // { name: t('Options'), path: '/dashboard/catalog/options' },
      ],
    },
    {
      icon: <UserGroupIcon />,
      name: t('Users'),
      subItems: [{ name: t('Sellers'), path: '/dashboard/users/sellers' }],
    },
    // {
    //   icon: <ProductIcon />,
    //   name: t('Products'),
    //   subItems: [
    //     { name: t('Product confirmation'), path: '/dashboard/products/confirmation' },
    //     { name: t('Suppliers'), path: '/dashboard/products/suppliers' },
    //     { name: t('Manufacturers'), path: '/dashboard/products/manufacturers' },
    //     { name: t('Filte rs'), path: '/dashboard/products/filters' },
    //     { name: 'Кэшбэк', path: '/dashboard/products/cashback' },
    //   ],
    // },
    // {
    //   icon: <ShoppingCardIcon />,
    //   name: t('Sales'),
    //   path: '/dashboard/sales',
    // },
  ];
  return menus;
};

export default useSidebarMenu;
