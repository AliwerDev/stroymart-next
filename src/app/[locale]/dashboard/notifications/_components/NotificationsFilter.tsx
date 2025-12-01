import PageFilter, { FilterConfig } from '@/components/common/PageFilter';
import useGetAdminList from '@/hooks/endpoints/admin/useGetAdminList';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

const NotificationsFilter = () => {
  const t = useTranslations();
  const { selectOptions: users } = useGetAdminList({ perPage: 1000 }, false);

  const filterConfig: FilterConfig[] = useMemo(() => {
    return [
      {
        type: 'select',
        key: 'sender',
        placeholder: t('Отправитель'),
        options: users,
      },
      {
        type: 'date',
        key: 'sendDate',
        placeholder: t('Дата отправки'),
      },
      {
        type: 'search',
        key: 'search',
        placeholder: t('Поиск'),
      },
    ];
  }, [users, t]);

  return <PageFilter filterConfig={filterConfig} />;
};

export default NotificationsFilter;
