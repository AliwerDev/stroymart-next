import { BarChartIcon } from '@/components/icons';
import AgreementIcon from '@/components/icons/AgreementIcon';
import BoxIcon from '@/components/icons/BoxIcon';
import ChatIcon from '@/components/icons/ChatIcon';
import Discount2Icon from '@/components/icons/Discount2Icon';
import Filter2Icon from '@/components/icons/Filter2Icon';
import HotPriceIcon from '@/components/icons/HotPriceIcon';
import NotificationIcon from '@/components/icons/NotificationIcon';
import ProductIcon from '@/components/icons/ProductIcon';
import QuestionIcon from '@/components/icons/QuestionIcon';
import StoreIcon from '@/components/icons/StoreIcon';
import UserGroupIcon from '@/components/icons/UserGroupIcon';
import { useTranslations } from 'next-intl';

export type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
};

const useSidebarMenu = () => {
  const t = useTranslations();

  const menus: NavItem[] = [
    {
      name: t('Главная'),
      icon: <BarChartIcon />,
      path: '/dashboard/analytics',
    },
    {
      name: t('Чат поддержки'),
      icon: <ChatIcon />,
      path: '/dashboard/chat',
    },
    {
      name: t('Партнеры'),
      icon: <AgreementIcon />,
      path: '/dashboard/partners',
    },
    {
      name: t('Магазины'),
      icon: <StoreIcon />,
      path: '/dashboard/stores',
    },
    {
      name: t('Новинки'),
      icon: <HotPriceIcon />,
      path: '/dashboard/new-products',
    },
    {
      name: t('Акции'),
      icon: <Discount2Icon />,
      path: '/dashboard/promotions',
    },
    {
      name: t('Админы'),
      icon: <UserGroupIcon />,
      path: '/dashboard/admins',
    },
    {
      name: t('Товары'),
      icon: <ProductIcon />,
      path: '/dashboard/products',
    },
    {
      name: t('Уведомления'),
      icon: <NotificationIcon />,
      path: '/dashboard/notifications',
    },
    {
      name: t('Категории'),
      icon: <BoxIcon className="w-6 h-6" />,
      path: '/dashboard/categories',
    },
    {
      name: t('Характеристики'),
      icon: <Filter2Icon />,
      path: '/dashboard/properties',
    },
    {
      name: t('FAQ'),
      icon: <QuestionIcon className="w-6 h-6" />,
      path: '/dashboard/faqs',
    },
  ];
  return menus;
};

export default useSidebarMenu;
