/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Empty from '@/components/common/Empty';
import Paper from '@/components/common/Paper/Paper';
import Show from '@/components/common/Show';
import PageHeader from '@/components/layout/PageHeader';
import { TablePagination } from '@/components/ui/Table';
import useGetPartner from '@/hooks/endpoints/partner/useGetPartner';
import useGetStoreList from '@/hooks/endpoints/store/useGetStoreList';
import { usePagination } from '@/hooks/usePagination';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import StoreCard from '../_components/StoreCard';
import StoresMap from '../_components/StoresMap';
import StorsFilter from '../_components/StorsFilter';

const PartnersSlugPage = () => {
  const t = useTranslations();
  const { partnerId } = useParams();
  const { setPage, setPageSize } = usePagination();
  const { list: stores, meta } = useGetStoreList(partnerId as string);
  const { entity: partner } = useGetPartner(partnerId as string);

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Магазины'), href: '/dashboard/stores' },
          { label: partner?.title || '' },
        ]}
      />
      <Paper>
        <StorsFilter />
        <div className="px-4 md:px-6 lg:px-[30px] space-y-5">
          <StoresMap stores={stores} />
          <Show when={!stores.length}>
            <Empty height={200} text={t('Магазины не найдены')} />
          </Show>

          <Show when={stores.length > 0}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
              {stores.map((item: any) => (
                <StoreCard key={item.id} store={item} />
              ))}
            </div>

            <TablePagination meta={meta} onPageChange={setPage} onPerPageChange={setPageSize} />
          </Show>
        </div>
      </Paper>
    </div>
  );
};

export default PartnersSlugPage;
