import Paper from '@/components/common/Paper/Paper';
import Link2Icon from '@/components/icons/Link2Icon';
import LinkIcon from '@/components/icons/LinkIcon';
import LocationIcon from '@/components/icons/LocationIcon';
import PhoneIcon from '@/components/icons/PhoneIcon';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import { getYandexLocationLink } from '@/lib/utils';
import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */
const StoreCard = ({ store }: { store: any }) => {
  return (
    <Paper className="p-3 md:p-4 border border-mid-gray-1 hover:border-text-1 transition-all duration-200">
      <div className="space-y-2 mb-3">
        <Typography variant="subtitle-sm-16">{store.name}</Typography>
        <Typography variant="caption-sm-14" color="text-3" className="flex gap-2 items-center">
          <PhoneIcon className="min-w-5 h-5" />
          {store.phone}
        </Typography>
        <Typography variant="caption-sm-14" color="text-3" className="flex gap-2 items-center">
          <LocationIcon className="min-w-5 h-5" />
          {store.address}
        </Typography>
      </div>

      <Link href={getYandexLocationLink(store.latitude, store.longitude)} target="_blank">
        <Button
          variant="secondary"
          icon={<LinkIcon />}
          fullWidth
          suffix={<Link2Icon className="text-primary-500 w-6 h-6" />}
        >
          <Typography variant="caption-sm-14" className="w-full flex-1 truncate text-left">
            {store.address}
          </Typography>
        </Button>
      </Link>
    </Paper>
  );
};

export default StoreCard;
