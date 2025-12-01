'use client';
import { UserGroupIcon } from '@/components/icons';
import UserAddIcon from '@/components/icons/UserAddIcon';
import UserCheckIcon from '@/components/icons/UserCheckIcon';
import UserRemoveIcon from '@/components/icons/UserRemoveIcon';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import useGetActiveClient from '@/hooks/endpoints/analytics/useGetActiveClient';
import useGetCientEngagement from '@/hooks/endpoints/analytics/useGetCientEngagement';
import useGetClientCount from '@/hooks/endpoints/analytics/useGetClientCount';
import useGetPartnerStatistic from '@/hooks/endpoints/analytics/useGetPartnerStatistic';
import usePageFilters from '@/hooks/usePageFilters';
import { formatNumberWithSpaces } from '@/lib/utils';
import get from 'lodash.get';
import { useTranslations } from 'next-intl';
import AnalyticsInfoCard from './_components/AnalyticsInfoCard';
import ClientActiveChart from './_components/ClientActiveChart';
import EngagementChart from './_components/EngagementChart';
import PartnerStatisticsChart from './_components/PartnerStatisticsChart';

const AnalyticsPage = () => {
  const t = useTranslations();

  const periodOption = [
    {
      label: t('12 месяцев'),
      value: '12m',
    },
    {
      label: t('30 дней'),
      value: '30d',
    },
    {
      label: t('7 дней'),
      value: '7d',
    },
  ];

  const { filters, handleFilterChange } = usePageFilters();

  const periodActive = filters.periodActive || '12m';
  const periodEngagement = filters.periodEngagement || '12m';
  const periodPartner = filters.periodPartner || '12m';

  const handlePeriodChange = (key: string, value: string) => {
    handleFilterChange(key, value);
  };

  const { entity: clientCount, isLoading: isLoadingClientCount } = useGetClientCount();
  const { entity: activeClient } = useGetActiveClient(periodActive);
  const { entity: clientEngagement } = useGetCientEngagement(periodEngagement);
  const { entity: partnerStatistic } = useGetPartnerStatistic(periodPartner);

  const cardConfig = [
    {
      id: 1,
      title: t('Впервые запустивших бота'),
      icon: <UserAddIcon />,
      apiKey: 'total',
    },
    {
      id: 2,
      title: t('Активные пользователи'),
      icon: <UserGroupIcon />,
      apiKey: 'active',
    },
    {
      id: 3,
      title: t('Неактивных более 30 дней'),
      icon: <UserRemoveIcon />,
      apiKey: 'in_active_30',
    },
    {
      id: 4,
      title: t('Stickiness DAU / MAU × 100'),
      icon: <UserCheckIcon />,
      apiKey: 'stickness',
    },
  ];

  const cardItems = cardConfig.map((config) => ({
    ...config,
    value:
      config.apiKey === 'stickness'
        ? `${get(clientCount, config.apiKey, 0)}%`
        : formatNumberWithSpaces(get(clientCount, config.apiKey, 0)),
  }));

  return (
    <div className="space-y-5">
      <PageHeader breadcrumbs={[{ label: t('Аналитика'), href: '/dashboard/analytics' }]} />
      <AnalyticsInfoCard items={cardItems} isLoading={isLoadingClientCount} />
      <div className="bg-white rounded-[20px] p-6 h-[500px]">
        <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between">
          <Typography variant="h3-bl-24" className="text-text-1">
            {t('Активность пользователей')}
          </Typography>
          <div className="flex items-center gap-1 pt-2 md:pt-0">
            {periodOption.map((option) => (
              <Button
                key={option.value}
                variant={periodActive === option.value ? 'secondary' : 'ghost'}
                size="small"
                onClick={() => handlePeriodChange('periodActive', option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        <ClientActiveChart data={activeClient} period={periodActive} />
      </div>

      <div className="bg-white rounded-[20px] p-6 h-[500px]">
        <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between">
          <Typography variant="h3-bl-24" className="text-text-1">
            {t('Воронка вовлечения пользователей')}
          </Typography>
          <div className="flex items-center gap-1 pt-2 md:pt-0">
            {periodOption.map((option) => (
              <Button
                key={option.value}
                variant={periodEngagement === option.value ? 'secondary' : 'ghost'}
                size="small"
                onClick={() => handlePeriodChange('periodEngagement', option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        <EngagementChart data={clientEngagement} />
      </div>

      <div className="bg-white rounded-[20px] p-6 h-[500px]">
        <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between">
          <Typography variant="h3-bl-24" className="text-text-1">
            {t('Статистика по партнёрам')}
          </Typography>
          <div className="flex items-center gap-1 pt-2 md:pt-0">
            {periodOption.map((option) => (
              <Button
                key={option.value}
                variant={periodPartner === option.value ? 'secondary' : 'ghost'}
                size="small"
                onClick={() => handlePeriodChange('periodPartner', option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        <PartnerStatisticsChart data={partnerStatistic} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
