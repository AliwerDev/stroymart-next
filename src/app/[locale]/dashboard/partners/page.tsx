/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Empty from '@/components/common/Empty';
import Show from '@/components/common/Show';
import PageHeader from '@/components/layout/PageHeader';
import { TablePagination } from '@/components/ui/Table';
import useGetPartnerList from '@/hooks/endpoints/partner/useGetPartnerList';
import { usePagination } from '@/hooks/usePagination';
import { useTranslations } from 'next-intl';
import PartnerCard from './_components/PartnerCard';

const PartnersPage = () => {
  const t = useTranslations();

  const { list, meta } = useGetPartnerList();
  const { setPage, setPageSize } = usePagination();

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          {
            label: t('Партнеры'),
            href: `/dashboard/partners/`,
          },
        ]}
        create="/dashboard/partners/create"
      />

      <Show when={list.length === 0}>
        <Empty height={280} />
      </Show>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {list.map((item: any) => (
          <PartnerCard key={item.id} partner={item} />
        ))}
      </div>

      <TablePagination meta={meta} onPageChange={setPage} onPerPageChange={setPageSize} />
    </div>
  );
};

export default PartnersPage;
