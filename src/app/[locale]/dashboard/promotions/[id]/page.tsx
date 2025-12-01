/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FixedFooter from '@/components/common/FixedFooter';
import Paper from '@/components/common/Paper/Paper';
import BoxIcon from '@/components/icons/BoxIcon';
import CalendarIcon from '@/components/icons/CalendarIcon';
import Discount2Icon from '@/components/icons/Discount2Icon';
import LaptopIcon from '@/components/icons/LaptopIcon';
import RouteIcon from '@/components/icons/RouteIcon';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Tag from '@/components/ui/Tag';
import Typography from '@/components/ui/Typography';
import useGetPromotion from '@/hooks/endpoints/promotion/useGetPromotion';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { Link } from '@/i18n/navigation';
import { formatDate, formatTime, getImageUrl } from '@/lib/utils';
import { PromotionStatusEnum } from '@/types/enums';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const PartnersSlugPage = () => {
  const { getWord } = useGetTranslatedWord();
  const t = useTranslations();
  const { id } = useParams();

  const { entity: promotion } = useGetPromotion(id as string);

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Акции'), href: '/dashboard/promotions' },
          { label: promotion?.name || '' },
        ]}
      />
      <Paper className="p-4 md:p-5 lg:p-[30px] grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-[30px]">
        <Image
          src={getImageUrl(promotion.file)}
          width={500}
          height={500}
          priority
          alt={promotion.name}
          className="w-full h-[430px] object-contain bg-center rounded-xl border border-mid-gray-1"
        />
        <div className="flex flex-col">
          <div className="flex gap-1 flex-wrap justify-between h-10 items-center">
            <Typography variant="caption-rg-14" className="flex gap-2 items-center text-text-3">
              <Discount2Icon />
              {t('Название акции')}:
            </Typography>
            <Typography variant="caption-rg-14" className="text-text-1">
              {promotion.name}
            </Typography>
          </div>
          <div className="flex gap-1 flex-wrap justify-between h-10 items-center">
            <Typography variant="caption-rg-14" className="flex gap-2 items-center text-text-3">
              <CalendarIcon />
              {t('Период дни')}:
            </Typography>
            <Typography variant="caption-rg-14" className="text-text-1">
              {formatDate(promotion.begin_date)} - {formatDate(promotion.end_date)}
            </Typography>
          </div>
          <div className="flex gap-1 flex-wrap justify-between h-10 items-center">
            <Typography variant="caption-rg-14" className="flex gap-2 items-center text-text-3">
              <CalendarIcon />
              {t('Период время')}:
            </Typography>
            <Typography variant="caption-rg-14" className="text-text-1">
              {formatTime(promotion.begin_date)} - {formatTime(promotion.end_date)}
            </Typography>
          </div>
          <div className="flex gap-1 flex-wrap justify-between h-10 items-center">
            <Typography variant="caption-rg-14" className="flex gap-2 items-center text-text-3">
              <LaptopIcon />
              {t('Ссылка')}:
            </Typography>
            <Typography
              as={Link}
              href={promotion.referral_link}
              variant="caption-rg-14"
              className="text-text-1"
            >
              {promotion.referral_link}
            </Typography>
          </div>
          <div className="flex gap-1 flex-wrap justify-between h-10 items-center">
            <Typography variant="caption-rg-14" className="flex gap-2 items-center text-text-3">
              <BoxIcon />
              {t('Статус')}:
            </Typography>
            {promotion.status === PromotionStatusEnum.STATUS_ACTIVE ? (
              <Tag variant="success">{t('Активный')}</Tag>
            ) : (
              <Tag variant="danger">{t('Неактивный')}</Tag>
            )}
          </div>
          <div className="flex flex-col gap-1 min-h-10">
            <Typography variant="caption-rg-14" className="flex gap-2 items-center text-text-3">
              <RouteIcon />
              {t('Регионы')}:
            </Typography>
            <Typography variant="caption-rg-14" className="text-text-1">
              {promotion.regions?.map((region: any) => getWord(region, 'title')).join(', ')}
            </Typography>
          </div>
          <div className="flex gap-1 flex-col mt-2">
            <Typography variant="caption-rg-14" className="flex gap-2 items-center text-text-3">
              {t('Описание')}:
            </Typography>
            <Typography variant="caption-rg-14" className="text-text-1">
              {promotion.description}
            </Typography>
          </div>
        </div>
      </Paper>
      <FixedFooter className="flex gap-2 items-center justify-end">
        <Link href={`/dashboard/promotions/edit/${id}`}>
          <Button>{t('Редактировать')}</Button>
        </Link>
      </FixedFooter>
    </div>
  );
};

export default PartnersSlugPage;
