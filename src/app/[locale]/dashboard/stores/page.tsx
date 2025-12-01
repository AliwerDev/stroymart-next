/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Empty from '@/components/common/Empty';
import Show from '@/components/common/Show';
import PageHeader from '@/components/layout/PageHeader';
import { TablePagination } from '@/components/ui/Table';
import useGetPartnerList from '@/hooks/endpoints/partner/useGetPartnerList';
import { usePagination } from '@/hooks/usePagination';
import { useTranslations } from 'next-intl';
import PartnerCard from '../partners/_components/PartnerCard';

const PartnersPage = () => {
  const t = useTranslations();
  const { list: partners, meta } = useGetPartnerList();

  const { setPage, setPageSize } = usePagination();

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          {
            label: t('Магазины'),
            href: `/dashboard/stores/`,
          },
        ]}
      />

      <Show when={partners.length === 0}>
        <Empty text={t('Магазины не найдены')} height={280} />
      </Show>

      <Show when={partners.length > 0}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {partners.map((item: any) => (
            <PartnerCard
              details={false}
              href={`/dashboard/stores/${item.id}`}
              key={item.id}
              partner={item}
            />
          ))}
        </div>
        <TablePagination meta={meta} onPageChange={setPage} onPerPageChange={setPageSize} />
      </Show>
    </div>
  );
};

export default PartnersPage;
