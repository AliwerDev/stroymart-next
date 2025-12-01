import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import { useLogout } from '@/hooks/useLogout';
import { useSidebar } from '@/hooks/useSidebar';
import { Link } from '@/i18n/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import BellIcon from '../icons/BellIcon';
import LogoutIcon from '../icons/LogoutIcon';
import SidebarOpenIcon from '../icons/SidebarOpenIcon';
import Button from '../ui/Button';
import { DropdownItem } from '../ui/Dropdown';
import Typography from '../ui/Typography';

const AppHeader = () => {
  const { data: session } = useSession();
  const t = useTranslations();
  const { logout } = useLogout();
  const { toggleSidebarMobile } = useSidebar();

  return (
    <div className="border-b border-gray-50 bg-white">

      {/* Main Header */}
      <div className="flex items-center justify-between md:justify-end h-[64px] md:h-[72px] px-5 md:px-10">
        <SidebarOpenIcon className=" text-text-1 cursor-pointer md:hidden" onClick={() => toggleSidebarMobile()} />

        <div className="flex items-center gap-4">
          <Link href="/dashboard/chat">
            <Button variant="icon" className="w-10 h-10" icon={<BellIcon className="text-mid-gray-3 w-5 h-5" />} />
          </Link>

          <LanguageSwitcher className="!bg-light-gray-1" />
          <Dropdown
            renderButton={() => (
              <div className="flex gap-3 items-center cursor-pointer">
                <div className="w-10 h-10 rounded-full border border-primary-500 flex items-center justify-center">
                  <Image
                    src="/images/avatar.png"
                    alt="location"
                    width={40}
                    height={40}
                    className="w-8 !h-8 object-cover rounded-full overflow-hidden"
                  />
                </div>
                <div className="hidden flex-col gap-0.5 md:flex">
                  <Typography variant="caption-bl-14">{session?.fullname}</Typography>
                  <Typography variant="footnote-sm-12">Admin</Typography>
                </div>
              </div>
            )}
          >
            <DropdownItem variant="danger" icon={<LogoutIcon />} onClick={() => logout()}>
              {t('Выход')}
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
