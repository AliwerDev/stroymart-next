/* eslint-disable @typescript-eslint/no-explicit-any */
import Show from '@/components/common/Show';
import BoxIcon from '@/components/icons/BoxIcon';
import ContactIcon from '@/components/icons/ContactIcon';
import LaptopIcon from '@/components/icons/LaptopIcon';
import PhoneIcon from '@/components/icons/PhoneIcon';
import { PaperCard } from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import { Link } from '@/i18n/navigation';
import { cn, getImageUrl } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface PartnerCardProps {
  partner: any;
  details?: boolean;
  href?: string;
}

const PartnerCard = ({
  partner,
  details = true,
  href = `/dashboard/partners/${partner.id}`,
}: PartnerCardProps) => {
  const t = useTranslations();

  return (
    <Link href={href}>
      <PaperCard
        key={partner.id}
        imgSrc={getImageUrl(partner.logo)}
        imgAlt={partner.title}
        className="py-2.5"
      >
        <div className="flex flex-col items-start justify-start px-2.5 py-2.5 space-y-1.5 w-full">
          <Typography variant="body-sm-20" className={cn(details && 'mb-2')}>
            {partner.title}
          </Typography>
          <Show when={details}>
            <div className="flex gap-1">
              <Typography variant="caption-rg-14" className="flex gap-2 text-text-3">
                <PhoneIcon />
                {t('Телефон')}:
              </Typography>
              <Typography variant="caption-rg-14" className="text-text-1">
                {partner.contact_phone}
              </Typography>
            </div>
            <div className="flex gap-1">
              <Typography variant="caption-rg-14" className="flex gap-2 text-text-3">
                <ContactIcon />
                {t('Контактное лицо')}:
              </Typography>
              <Typography variant="caption-rg-14" className="text-text-1">
                {partner.contact_person}
              </Typography>
            </div>
            <div className="flex gap-1">
              <Typography variant="caption-rg-14" className="flex gap-2 text-text-3">
                <BoxIcon />
                {t('Количество товаров')}:
              </Typography>
              <Typography variant="caption-rg-14" className="text-text-1">
                {partner.product_count}
              </Typography>
            </div>
            <div className="flex gap-1">
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
          </Show>
        </div>
      </PaperCard>
    </Link>
  );
};

export default PartnerCard;
