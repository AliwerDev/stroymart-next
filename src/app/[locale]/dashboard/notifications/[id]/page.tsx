/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FixedFooter from '@/components/common/FixedFooter';
import Paper from '@/components/common/Paper/Paper';
import Show from '@/components/common/Show';
import { InfoIcon } from '@/components/icons';
import CalendarIcon from '@/components/icons/CalendarIcon';
import ClickIcon from '@/components/icons/ClickIcon';
import NotificationIcon from '@/components/icons/NotificationIcon';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Tag from '@/components/ui/Tag';
import Typography from '@/components/ui/Typography';
import useGetNotification from '@/hooks/endpoints/notification/useGetNotification';
import { Link } from '@/i18n/navigation';
import { formatDate, formatTime, getImageUrl, reformReachText } from '@/lib/utils';
import { NotificationStatusEnum } from '@/types/enums';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const PartnersSlugPage = () => {
  const t = useTranslations();
  const { id } = useParams();

  const { entity: notification } = useGetNotification(id as string);

  const statusMap: any = {
    [NotificationStatusEnum.STATUS_ACTIVE]: {
      variant: 'info',
      label: t('Активный'),
    },
    [NotificationStatusEnum.STATUS_SENT]: {
      variant: 'success',
      label: t('Отправлено'),
    },
    [NotificationStatusEnum.STATUS_SENDING]: {
      variant: 'warning',
      label: t('Отправляется'),
    },
    [NotificationStatusEnum.STATUS_FAILED]: {
      variant: 'danger',
      label: t('Неактивный'),
    },
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Уведомления'), href: '/dashboard/notifications' },
          { label: notification?.name || '' },
        ]}
      />
      <Paper className="p-4 md:p-5 lg:p-[30px] grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-[30px]">
        <Image
          src={getImageUrl(notification.file)}
          width={500}
          height={500}
          priority
          alt={notification.name}
          className="w-full h-[430px] object-contain bg-center rounded-xl border border-mid-gray-1"
        />
        <div className="flex flex-col">
          <div className="flex gap-1 flex-wrap justify-between h-10 items-center">
            <Typography variant="caption-rg-14" className="flex gap-2 items-center text-text-3">
              <NotificationIcon />
              {t('Название уведомления')}:
            </Typography>
            <Typography variant="caption-rg-14" className="text-text-1">
              {notification.name}
            </Typography>
          </div>
          {notification?.buttons?.map((button: any) => (
            <div
              className="flex gap-1 flex-wrap justify-between h-10 items-center"
              key={button?.id}
            >
              <Typography variant="caption-rg-14" className="flex gap-2 items-center text-text-3">
                <ClickIcon />
                {button?.name}:
              </Typography>
              <Typography
                as={Link}
                href={button?.url}
                variant="caption-rg-14"
                className="text-text-1 underline"
              >
                {button?.url}
              </Typography>
            </div>
          ))}

          <div className="flex gap-1 flex-wrap justify-between h-10 items-center">
            <Typography variant="caption-rg-14" className="flex gap-2 items-center text-text-3">
              <CalendarIcon />
              {t('Дата и время отправления')}:
            </Typography>
            <Typography variant="caption-rg-14" className="text-text-1">
              {formatDate(notification.send_at)} {formatTime(notification.send_at)}
            </Typography>
          </div>

          <div className="flex gap-1 flex-wrap justify-between h-10 items-center">
            <Typography variant="caption-rg-14" className="flex gap-2 items-center text-text-3">
              <InfoIcon />
              {t('Статус')}:
            </Typography>
            <Tag variant={statusMap[notification.status]?.variant}>
              {statusMap[notification.status]?.label}
            </Tag>
          </div>

          <div className="flex gap-1 flex-wrap flex-col mt-2">
            <Typography variant="caption-rg-14" className="flex gap-2 items-center text-text-3">
              {t('Описание')}:
            </Typography>
            <Typography
              variant="caption-rg-14"
              className="text-text-1 tiptap"
              dangerouslySetInnerHTML={{ __html: reformReachText(notification.description) }}
            />
          </div>
        </div>
      </Paper>

      <FixedFooter className="flex gap-2 justify-end">
        <Show when={notification?.status === NotificationStatusEnum.STATUS_ACTIVE}>
          <Link href={`/dashboard/notifications/edit/${id}`}>
            <Button>{t('Редактировать')}</Button>
          </Link>
        </Show>
      </FixedFooter>
    </div>
  );
};

export default PartnersSlugPage;
