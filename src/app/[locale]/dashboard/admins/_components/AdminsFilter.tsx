import PageFilter, { FilterConfig } from '@/components/common/PageFilter';

const AdminsFilter = () => {
  const filterConfig: FilterConfig[] = [
    // {
    //   type: 'select',
    //   key: 'region',
    //   placeholder: 'Region',
    //   options: regions,
    // },
    {
      type: 'search',
      key: 'search',
      placeholder: 'Qidirish',
    },
  ];

  return <PageFilter filterConfig={filterConfig} />;
};

export default AdminsFilter;
