import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import { ConfigProvider } from 'antd';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations();
  return (
    <div className="flex h-screen w-screen">
      <div
        className="flex-1 hidden md:block"
        style={{ backgroundImage: 'url(/images/auth-bg.png)', backgroundSize: 'cover' }}
      >
        <div className="flex justify-center py-10 flex-col items-center gap-5">
          <div className="justify-center text-white text-2xl font-black font-['Inter']">
            {t('СтройМагазин')}
          </div>
          <div className="inline-flex items-center gap-3 rounded-xl bg-white/5 p-3 shadow-[0_8px_16px_rgba(255,255,255,0.1)] ring-1 ring-white/5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
                fill="white"
                fill-opacity="0.8"
              />
            </svg>

            {/* Text */}
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-white">{t('Деярли етиб келдингиз!')}</p>
              <p className="text-xs text-white/80">{t('Бошлаш учун профилингизни яратинг.')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-3 md:p-6 relative">
        <div className="py-5 px-6 flex justify-between w-full absolute top-0 left-0">
          <Link href="/">
            <Image
              src="/images/logo-admin.png"
              alt="logo"
              width={150}
              className="w-auto h-10"
              height={40}
            />
          </Link>
          <LanguageSwitcher />
        </div>
        <ConfigProvider
          theme={{
            components: {
              Input: {
                colorBgBase: '#F5F5F5',
                colorBgContainer: '#F5F5F5',
                colorBorder: '#E5E7EB',
                borderRadius: 12,
                controlHeight: 48,
                colorTextPlaceholder: '#0F172A80',
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      </div>
    </div>
  );
};

export default AuthLayout;
