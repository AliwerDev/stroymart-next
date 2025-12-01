'use client';

import FixedFooter from '@/components/common/FixedFooter';
import Paper from '@/components/common/Paper/Paper';
import BoxIcon from '@/components/icons/BoxIcon';
import ContactIcon from '@/components/icons/ContactIcon';
import DiscountIcon from '@/components/icons/DiscountIcon';
import LaptopIcon from '@/components/icons/LaptopIcon';
import PhoneIcon from '@/components/icons/PhoneIcon';
import StoreLocationIcon from '@/components/icons/StoreLocationIcon';
import TrashIcon from '@/components/icons/TrashIcon';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import useGetPartner from '@/hooks/endpoints/partner/useGetPartner';
import { useConfirm } from '@/hooks/useConfirm';
import { Link, useRouter } from '@/i18n/navigation';
import request from '@/lib/request';
import { getErrorMessage, getImageUrl } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

const PartnersSlugPage = () => {
  const t = useTranslations();
  const { id } = useParams();
  const router = useRouter();
  const { confirmDelete } = useConfirm();

  const { entity: partner } = useGetPartner(id as string);

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return request.post(`/partner/delete?id=${id}`);
    },
    onSuccess: () => {
      toast.success(t('SUCCESSFULLY_DELETED'));
      router.push('/dashboard/partners');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const handleDelete = async () => {
    await confirmDelete(
      async () => {
        await deleteMutation.mutateAsync(Number(id));
      },
      {
        title: t('Удалить партнера?'),
        message: t('Вы действительно хотите удалить партнера?'),
      }
    );
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Партнерлар'), href: '/dashboard/partners' },
          { label: partner?.title || '' },
        ]}
      />
      <Paper className="p-4 md:p-6 lg:p-[30px] lg:grid lg:grid-cols-2 lg:gap-[30px]">
        <div className="flex flex-col">
          <Typography variant="caption-bl-14" className="mb-2">
            {t('Логотип')}
          </Typography>
          <Image
            src={getImageUrl(partner.logo)}
            width={500}
            height={500}
            priority
            alt={partner.title}
            className="w-full h-[250px] object-contain bg-center rounded-xl border border-mid-gray-1 mb-4"
          />
          <Typography variant="caption-bl-14" className="mb-2">
            {t('Иконка')}
          </Typography>
          <Image
            src={getImageUrl(partner.icon)}
            width={500}
            height={500}
            priority
            alt={partner.title}
            className="w-full h-[250px] object-contain bg-center rounded-xl border border-mid-gray-1"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex gap-1 justify-between h-10 items-center">
            <Typography variant="caption-rg-14" className="flex gap-2 text-text-3">
              <ContactIcon />
              {t('Контактное лицо')}:
            </Typography>
            <Typography variant="caption-rg-14" className="text-text-1">
              {partner.contact_person}
            </Typography>
          </div>
          <div className="flex gap-1 justify-between h-10 items-center">
            <Typography variant="caption-rg-14" className="flex gap-2 text-text-3">
              <PhoneIcon />
              {t('Телефон')}:
            </Typography>
            <Typography variant="caption-rg-14" className="text-text-1">
              {partner.contact_phone}
            </Typography>
          </div>
          <div className="flex gap-1 justify-between h-10 items-center">
            <Typography variant="caption-rg-14" className="flex gap-2 text-text-3">
              <LaptopIcon />
              {t('Сайт LG')}:
            </Typography>
            <Typography
              as={Link}
              href={partner.referral_website}
              variant="caption-rg-14"
              className="text-text-1"
            >
              {partner.referral_website}
            </Typography>
          </div>
          <div className="flex gap-1 justify-between h-10 items-center">
            <Typography variant="caption-rg-14" className="flex gap-2 text-text-3">
              <LaptopIcon />
              {t('Cайт партнера')}:
            </Typography>
            <Typography
              as={Link}
              href={partner.website}
              variant="caption-rg-14"
              className="text-text-1"
            >
              {partner.website}
            </Typography>
          </div>
          <div className="flex gap-1 justify-between h-10 items-center">
            <Typography variant="caption-rg-14" className="flex gap-2 text-text-3">
              <BoxIcon />
              {t('Количество товаров')}:
            </Typography>
            <Typography variant="caption-rg-14" className="text-text-1">
              {partner.product_count}
            </Typography>
          </div>
          <div className="flex gap-1 justify-between h-10 items-center">
            <Typography variant="caption-rg-14" className="flex gap-2 text-text-3">
              <StoreLocationIcon />
              {t('Количество магазинов')}:
            </Typography>
            <Typography variant="caption-rg-14" className="text-text-1">
              {partner.branch_count}
            </Typography>
          </div>
          <div className="flex gap-1 justify-between h-10 items-center">
            <Typography variant="caption-rg-14" className="flex gap-2 text-text-3">
              <DiscountIcon />
              {t('Активных акций')}:
            </Typography>
            <Typography variant="caption-rg-14" className="text-text-1">
              {partner.promotion_count}
            </Typography>
          </div>
        </div>
      </Paper>
      <FixedFooter className="flex gap-2 justify-end">
        <Button variant="danger" icon={<TrashIcon />} onClick={handleDelete}>
          {t('Удалить')}
        </Button>

        <Link href={`/dashboard/partners/edit/${id}`}>
          <Button>{t('Редактировать')}</Button>
        </Link>
      </FixedFooter>
    </div>
  );
};

export default PartnersSlugPage;
